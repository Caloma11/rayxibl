class BookingsController < ApplicationController
  before_action :set_profile, only: :new
  before_action :set_booking, only: :show

  def new
    @booking = Booking.new
    @booking.profile = @profile
    authorize @booking
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.manager = current_user.manager
    @booking.profile = Profile.find(params[:profile_id])
    authorize @booking
    # CALCULTATE TOTAL_PRICE HERE
    if @booking.save
      redirect_to booking_path(@booking)
    else
      render 'new'
    end
  end

  def show
    authorize @booking
  end

  private

  def set_booking
    @booking = Booking.includes(attachments_attachments: :blob).find(params[:id])
  end

  def set_profile
    @profile = Profile.find(params[:profile_id])
  end

  def booking_params
    params.require(:booking).permit(:title,
                                     :description,
                                     :start_time,
                                     :end_time,
                                     :duration,
                                     :start_date,
                                     :end_date,
                                     :billable,
                                     :price,
                                     :price_type,
                                     attachments: []
                                    )
  end
end


