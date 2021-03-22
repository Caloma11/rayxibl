module Bookings
  module Constants
    PRICE_TYPES = ["per hour", "per day", "fixed price"]
    STATUSES = ["pending", "accepted", "rejected", "canceled"]
    TIME_LIST = Array.new(24).fill(0).map.with_index do |e, i|
      hour = e + i

      hour > 9 ? "#{hour}:00" : "0#{hour}:00"
    end
  end
end

###
# STATUSES Explanation:
# pending => Default value
# accepted => When Freelancer accepts a booking
# rejected => When Freelancer rejects a booking
# canceleed => When Manager changes their mind
###
