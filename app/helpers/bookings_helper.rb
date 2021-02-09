module BookingsHelper
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
