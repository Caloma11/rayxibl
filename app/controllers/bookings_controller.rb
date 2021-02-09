class BookingsController < ApplicationController
  before_action :set_profile, only: :new
  before_action :set_booking, only: [:show, :edit, :update, :cancel]

  def index
    if current_user.manager?
      @bookings = policy_scope(current_user.manager.bookings).includes(profile: [user: { avatar_attachment: :blob }])
    else
      @bookings = policy_scope(current_user.profile.bookings)
    end

    if params[:status]
      status = params[:status] == "-1" ? (0..2).to_a : params[:status].to_i
      @bookings = @bookings.where(status: status)
    end

    if params[:booking]
      @bookings = BookingFilter.new(@bookings, params[:booking], current_user).call
    end

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
    # CALCULATE TOTAL_PRICE HERE
    if @booking.save
      redirect_to booking_path(@booking)
    else
      render 'new'
    end
  end

  def show
    authorize @booking
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

  def cancel
    authorize @booking
    if @booking.rejected!
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


