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

    if params[:profession] != ""
      @bookings = @bookings.joins(:profile).where("profiles.profession ILIKE :profession", profession: "%#{params[:profession]}%")
    end

    @bookings
  end
end
