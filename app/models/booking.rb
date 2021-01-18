class Booking < ApplicationRecord
  include Bookings::Constants

  belongs_to :manager
  belongs_to :profile
  has_many_attached :attachments

  enum price_type: PRICE_TYPES
end
