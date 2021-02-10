module BookingsHelper
  def prefilled_message(booking)
    "Hi #{booking.profile.user.first_name}, regarding the booking #{booking.title} on the #{booking.start_date.strftime("%d %b")} - #{booking.end_date.strftime("%d %b")}"
  end
end
