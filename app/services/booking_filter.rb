class BookingFilter
  attr_reader :bookings, :params, :current_user

  def initialize(bookings, params, current_user)
    @bookings = bookings
    @params = params
    @current_user = current_user
  end

  def call
    if params[:title] != ""
      @bookings = @bookings.where("title ILIKE :title", title: "%#{params[:title]}%")
    end

    @bookings
  end
end
