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
      flash[:notice] = @booking.accepted? ? "Booking request accepted." : "Booking request rejected."

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
end


