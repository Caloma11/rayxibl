class Booking < ApplicationRecord
  include Bookings::Constants

  belongs_to :manager
  belongs_to :profile
  has_many_attached :attachments

  validates :title, :description, presence: true
  validates :price, :price_type, presence: true, if: -> { self.billable }

  enum price_type: PRICE_TYPES
  enum status: STATUSES

  %w[start end].each do |identifier|
    define_method :"parsed_#{identifier}_date" do
      send(:"#{identifier}_date")&.strftime("%Y-%m-%d")
    end

    define_method :"parsed_#{identifier}_time" do
      send(:"#{identifier}_time")&.strftime("%H:%M")
    end
  end
end
