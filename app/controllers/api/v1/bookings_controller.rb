class Api::V1::BookingsController < Api::V1::BaseController
  def create
    @booking = Booking.new(booking_params)
    @booking.price_type = params[:booking][:price_type].to_i
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
      :profile_id, attachments: []
    )
  end

  def render_error
    render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
  end
end
