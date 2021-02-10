class Booking < ApplicationRecord
  include Bookings::Constants
  include Bookings::CalculatePrice

  belongs_to :manager
  belongs_to :profile
  has_many_attached :attachments

  validates :title, :description, presence: true
  validates :price, :price_type, presence: true, if: -> { self.billable }

  enum price_type: PRICE_TYPES
  enum status: STATUSES

  before_create :determine_total_price

  %w[start end].each do |identifier|
    define_method :"parsed_#{identifier}_date" do
      send(:"#{identifier}_date")&.strftime("%Y-%m-%d")
    end

    define_method :"parsed_#{identifier}_time" do
      send(:"#{identifier}_time")&.strftime("%H:%M")
    end
  end

  def full_date_time
    dates = "#{start_date.strftime("%d %b")} - #{end_date.strftime("%d %b")}"

    if duration
      "#{dates}, #{duration} hours"
    else
      "#{dates}, #{parsed_start_time} - #{parsed_end_time}"
    end
  end
end
