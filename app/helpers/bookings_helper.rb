module BookingsHelper
  def prefilled_message(booking)
    "Hi #{booking.profile.user.first_name}, regarding the booking #{booking.title} on the #{booking.start_date.strftime("%d %b")} - #{booking.end_date.strftime("%d %b")}"
  end

  def week(day)
    if Date.today.beginning_of_week == day
      "This week"
    elsif (Date.today + 1.week).beginning_of_week == day
      "Next week"
    else
      "#{day.strftime("%d %b")} - #{day.end_of_week.strftime("%d %b")}"
    end
  end
end
