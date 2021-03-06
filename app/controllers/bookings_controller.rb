class BookingsController < ApplicationController
  before_action :set_profile, only: :new
  before_action :set_booking, only: [:show, :edit, :update, :cancel, :accept_or_reject]

  def index
    if current_user.manager?
      @bookings = policy_scope(current_user.manager.bookings)
                    .includes(profile: [user: { avatar_attachment: :blob }])
                    .today_and_after
                    .active
    else
      @bookings = policy_scope(current_user.profile.bookings)
                    .includes(:manager, :profile)
                    .today_and_after
                    .active
    end

    if params[:status]
      status = params[:status] == "-1" ? (0..2).to_a : params[:status].to_i
      @bookings = @bookings.where(status: status)
    end

    if params[:booking]
      @bookings = BookingFilter.new(@bookings, params[:booking], current_user).call
    end

    @bookings = @bookings.group_by { |booking| booking.start_date.beginning_of_week }.sort_by { |day| day }.to_h
    if current_user.manager?
      @archived_bookings = current_user.manager.bookings.archived

      if params[:status]
        status = params[:status] == "-1" ? (0..3).to_a : params[:status].to_i
        @archived_bookings = @archived_bookings.where(status: status)
      end
    end


    @filter_count = params[:booking]&.permit!
                                      &.to_h
                                      &.filter { |k, _| k != "clear" }
                                      &.filter { |k, v| v != "" }
                                      &.filter { |k, v| v != [""] }
                                      &.keys
                                      &.count

    respond_to do |format|
      format.html
      format.js
    end
  end

  def new
    @reassign = params[:reassign] == "true"
    @select = params[:select] == "true"
    if params[:parent_id]
      @parent_booking = Booking.find(params[:parent_id])
    end
    @booking = Booking.new
    @booking.profile = @profile
    @network = current_user.manager.network
    if @profile.persisted?
      @conversation = current_user.conversation_with(@profile.user)
    end
    recognized = Rails.application.routes.recognize_path(request.referrer)
    if recognized[:controller] == "profiles" && recognized[:action] == "show"
      @last_url =  profile_path(@profile)
    elsif recognized[:controller] == "pages" || !@profile.persisted?
      @last_url = dashboard_path
    elsif recognized[:controller] == "profiles" && recognized[:action] == "index"
      @last_url = profiles_path
    elsif current_user.manager? && @profile && @conversation
      @last_url = conversation_path(@conversation)
    else
      @last_url = dashboard_path
    end
    authorize @booking
  end

  def create
    @reassign = params[:reassign] == "true"
    @booking = Booking.new(booking_params)
    @booking.manager = current_user.manager
    @select = params[:select] == "true"
    # If has Query params[:select], Manager will choose from Dropdown list of Freelancers
    if @select
      @profile = Profile.new
    else
      set_profile
      @booking.profile = @profile
    end

    authorize @booking

    if @booking.save
      if @reassign && params[:parent_id]
        @parent_booking = Booking.find(params[:parent_id])
        @parent_booking.canceled!

        # This will find the Convo between Manager & original booking's Freelancer
        @conversation = Conversation.find_by(manager: current_user.manager, profile: @parent_booking.profile)

        # This path is specifically (and currently only) used for re-assigning bookings
        redirect_to new_conversation_message_path(@conversation, parent_booking_id: @booking.id)
        return
      end

      redirect_to bookings_path
    else
      @network = current_user.manager.network
      render 'new'
    end
  end

  def show
    authorize @booking

    recognized = Rails.application.routes.recognize_path(request.referrer)
    @last_url = if recognized[:controller] == "bookings" && recognized[:action] == "index"
      bookings_path
    else
      schedule_path
    end

    render 'edit'
  end

  def edit
    authorize @booking

    recognized = Rails.application.routes.recognize_path(request.referrer)

    @last_url = if recognized[:controller] == "bookings" && recognized[:action] == "index"
                  bookings_path
                else
                  schedule_path
                end
  end

  def update
    authorize @booking
    if @booking.update(booking_params)
      redirect_to booking_path(@booking)
    else
      render :edit
    end
  end

  def accept_or_reject
    authorize @booking

    if @booking.update(status: params[:booking][:status].to_i)
      last_url = Rails.application.routes.recognize_path(request.referrer)
      redirect_to last_url
      flash[:notice] = @booking.accepted? ? "Booking request accepted." : "Booking request rejected."

    else
      render "conversations/show"
    end
  end

  def cancel
    authorize @booking
    if @booking.canceled!
      flash[:alert] = "Booking with #{@booking.profile.display_name} has been cancelled."
      redirect_to bookings_path
    end
  end

  # Add booking to google calendar

  def redirect
    authorize Booking.find(params[:id])
    client = Signet::OAuth2::Client.new(client_options)
    redirect_to("#{client.authorization_uri.to_s}&state=#{params[:id]}")
  end

  def callback
    booking = Booking.find(params[:state])
    authorize booking
    client = Signet::OAuth2::Client.new(client_options)
    client.code = params[:code]
    response = client.fetch_access_token!

    session[:authorization] = response

    client.update!(session[:authorization])

    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = client


    event = Google::Apis::CalendarV3::Event.new({
      start: Google::Apis::CalendarV3::EventDateTime.new(date: Date.parse(booking.start_date.to_s)),
      end: Google::Apis::CalendarV3::EventDateTime.new(date: Date.parse(booking.end_date.to_s)),
      summary: booking.title,
      description: booking.description + "\n - booked by #{booking.manager.user.display_name}. \n For more information visit https://www.flxibl.io/bookings/#{booking.id}"
    })

    service.insert_event('primary', event)

    flash[:notice] = "Event succesfully added"

    redirect_to root_path
  end


  private

  def set_booking
    @booking = Booking.includes(attachments_attachments: :blob).find(params[:id])
  end

  def set_profile
    @profile = Profile.find_by_id(params[:profile_id]) || Profile.new
  end

  def booking_params
   sanitized_params = params.require(:booking).permit(:title,
                                     :description,
                                     :start_time,
                                     :end_time,
                                     :duration,
                                     :start_date,
                                     :end_date,
                                     :price,
                                     :price_type,
                                     :weekends,
                                     :profile_id,
                                     :billable,
                                     attachments: [],
                                     billable: []
                                    )
   if sanitized_params[:billable].present?
    sanitized_params[:billable] = true
   end
   sanitized_params
  end


  def client_options
    {
      client_id: Rails.application.credentials.google_calendar[:client_id],
      client_secret: Rails.application.credentials.google_calendar[:client_secret],
      authorization_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_credential_uri: 'https://accounts.google.com/o/oauth2/token',
      scope: Google::Apis::CalendarV3::AUTH_CALENDAR,
      redirect_uri: callback_url,
      access_token: params[:code]
    }
  end

end


