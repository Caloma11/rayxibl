module Bookings
  module Constants
    PRICE_TYPES = ["per hour", "per day", "fixed price"]
    STATUSES = ["pending", "accepted", "rejected", "canceled"]
  end
end

###
# STATUSES Explanation:
# pending => Default value
# accepted => When Freelancer accepts a booking
# rejected => When Freelancer rejects a booking
# canceleed => When Manager changes their mind
###
