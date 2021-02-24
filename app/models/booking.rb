class Booking < ApplicationRecord
  include Bookings::Constants
  include Bookings::CalculatePrice

  belongs_to :manager
  belongs_to :profile
  has_one :message, dependent: :destroy
  has_many_attached :attachments

  validates :title, :description, :start_date, :end_date, presence: true
  validates :price, :price_type, presence: true, if: -> { self.billable }

  enum price_type: PRICE_TYPES
  enum status: STATUSES

  scope :today_and_after, -> { where("start_date >= ?", Date.today) }

  before_create :determine_total_price
  after_create :create_widget

  %w[start end].each do |identifier|
    define_method :"parsed_#{identifier}_date" do
      send(:"#{identifier}_date")&.strftime("%Y-%m-%d")
    end

    define_method :"parsed_#{identifier}_time" do
      send(:"#{identifier}_time")&.strftime("%H:%M")
    end
  end

  def number_of_days
    (end_date - start_date).to_i / 86400
  end

  def full_date_time
    dates = "#{start_date.strftime("%d %b")} - #{end_date.strftime("%d %b")}"

    if duration
      "#{dates}, #{duration} hours"
    else
      "#{dates}, #{parsed_start_time} - #{parsed_end_time}"
    end
  end

  def short_date_time
    if duration
      "#{duration} hours"
    else
      "#{parsed_start_time} - #{parsed_end_time}"
    end
  end

  private

  def create_widget
    return if message

    convo = Conversation.first_or_create(company: manager.company, profile: profile)

    convo.messages.create!(booking: self, user: manager.user)
  end
end
