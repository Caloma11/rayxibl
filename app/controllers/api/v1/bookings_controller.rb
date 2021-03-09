class Api::V1::BookingsController < Api::V1::BaseController
  def create
    @booking = Booking.new(booking_params)
    price_type = params[:booking][:price_type].to_i
    @booking.price_type = price_type if price_type != -1
    @booking.manager = current_user.manager

    authorize @booking

    if @booking.save
      render json: @booking
    else
      render_error
    end
  end

  private

  def booking_params
    params.require(:booking).permit(
      :title, :description, :start_date,
      :end_date, :duration, :start_time,
      :end_time, :billable, :price,
      :weekends, :profile_id,
      attachments: []
    )
  end

  def render_error
    render json: { errors: @booking.errors }
  end
end
