class BookingsController < ApplicationController
  before_action :set_profile, only: :new
  before_action :set_booking, only: [:show, :edit, :update, :cancel, :accept_or_reject]



  skip_before_action :authenticate_user!, only: [:redirect, :callback, :new_calendar_event]
  skip_after_action :verify_authorized, only: [:redirect, :callback, :new_calendar_event]

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
      @archived_bookings = current_user.manager.bookings.where(status: [2, 3])
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
    @booking = Booking.new
    @booking.profile = @profile
    authorize @booking
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.manager = current_user.manager
    @profile = Profile.find(params[:profile_id])
    @booking.profile = @profile
    authorize @booking
    if @booking.save
      redirect_to bookings_path
    else
      render 'new'
    end
  end

  def show
    authorize @booking
    render 'edit'
  end

  def edit
    authorize @booking
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
    else
      render "conversations/show"
    end
  end

  def cancel
    authorize @booking
    if @booking.canceled!
      flash[:notice] = "Booking with #{@booking.profile.display_name} has been cancelled."
      redirect_to bookings_path
    end
  end

  # Add to booking to google calendar

  def redirect
    client = Signet::OAuth2::Client.new(client_options)

    client.additional_parameters = { id: 9}
    # client.redirect_uri = "#{client.redirect_uri}?booking_id=#{params[:id]}"
    redirect_to(client.authorization_uri.to_s, id: params[:id])
  end

  def callback
    binding.pry
    client = Signet::OAuth2::Client.new(client_options)
    client.code = params[:code]

    response = client.fetch_access_token!

    session[:authorization] = response

    client.update!(session[:authorization])

    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = client

    today = Date.today

    event = Google::Apis::CalendarV3::Event.new({
      start: Google::Apis::CalendarV3::EventDateTime.new(date: today),
      end: Google::Apis::CalendarV3::EventDateTime.new(date: today + 1),
      summary: 'Tomar no cu'
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
    @profile = Profile.find(params[:profile_id])
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
      access_token: params[:code],
      booking_id: params[:id]
    }
  end

  # def calendar_add
  #   client = Google::Apis::CalendarV3::CalendarService.new
  #   client_id = Rails.application.credentials.google_calendar[:client_id]
  #   authorizer = Google::Auth::UserAuthorizer.new client_id,  Google::Apis::CalendarV3::AUTH_CALENDAR_READONLY, token_store



  #   # return unless (current_user.present? && current_user.access_token.present? && current_user.refresh_token.present?)
  #     secrets = Google::APIClient::ClientSecrets.new({
  #       "web" => {
  #         # "access_token" => current_user.access_token,
  #         # "refresh_token" => current_user.refresh_token,
  #         "client_id" => ENV["GOOGLE_API_KEY"],
  #         "client_secret" => ENV["GOOGLE_API_SECRET"]
  #       }
  #     })

  #     begin
  #       client.authorization = secrets.to_authorization
  #       client.authorization.grant_type = "refresh_token"

  #       if !current_user.present?
  #         client.authorization.refresh!
  #         current_user.update_attributes(
  #           access_token: client.authorization.access_token,
  #           refresh_token: client.authorization.refresh_token,
  #           expires_at: client.authorization.expires_at.to_i
  #         )
  #       end
  #     rescue => e
  #       flash[:error] = 'Your token has been expired. Please login again with google.'
  #       redirect_to :back
  #     end
  #     client.insert_event('primary', event)
  # end

end


