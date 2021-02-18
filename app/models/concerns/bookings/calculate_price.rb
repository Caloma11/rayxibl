module Bookings
  module CalculatePrice
    def calculate_duration
      return duration if duration

      ((end_time - start_time) / 1.hour).round
    end

    def determine_total_price
      return unless billable
      # fixed price
      if ["fixed price", 2].include? price_type
        self.total_price = price
        return
      end

      date_diff = (end_date - start_date).to_i / 86400
      if date_diff.zero?
        date_diff = 1
      else
        date_diff += 1
      end
      dur = calculate_duration

      # per hour
      if Booking.price_types[price_type] == 0
        self.total_price = dur * price * date_diff
      # per day
      elsif Booking.price_types[price_type] == 1
        # TODO: May need to be changed
        self.total_price = dur * price
      end
    end
  end
end
