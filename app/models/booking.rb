class Booking < ApplicationRecord
  include Bookings::Constants

  belongs_to :manager
  belongs_to :profile
  has_many_attached :attachments

  validates :title, :description, :price, :price_type, presence: true
  enum price_type: PRICE_TYPES
  enum status: STATUSES
end
