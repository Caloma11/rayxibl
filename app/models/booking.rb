class Booking < ApplicationRecord
  include Bookings::Constants
  include Bookings::CalculatePrice

  belongs_to :manager
  belongs_to :profile
  has_one :message, dependent: :destroy
  has_many_attached :attachments

  validates :title, :description, :start_date, :end_date, presence: true
  validates :price, :price_type, presence: true, if: -> { self.billable }
  validates :price, numericality: { only_integer: true, greater_than: 0 }

  validate :end_time_after_start_time

  enum price_type: PRICE_TYPES
  enum status: STATUSES

  scope :today_and_after, -> { where("start_date >= ?", Date.today) }
  scope :active, -> { where(status: [0, 1]) }

  before_save :determine_total_price
  after_create :create_widget

  before_update :ensure_unique_duration

  %w[start end].each do |identifier|
    define_method :"parsed_#{identifier}_date" do
      send(:"#{identifier}_date")&.strftime("%Y-%m-%d")
    end

    define_method :"parsed_#{identifier}_time" do
      send(:"#{identifier}_time")&.strftime("%H:%M")
    end
  end

  def converted_total_price(rate)
    return unless rate && total_price
    (rate * total_price).to_i
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

  def ensure_unique_duration
    if will_save_change_to_duration?
      self.start_time = nil
      self.end_time = nil
    elsif will_save_change_to_start_time? || will_save_change_to_end_time?
      self.duration = nil
    end
  end

  def end_time_after_start_time
    return unless start_time && end_time
    if start_time > end_time
      errors.add(:start_time, 'Must be after end time')
      errors.add(:end_time, 'Must be before start time')
    end
  end

  def create_widget
    return if message

    convo = Conversation.first_or_create(company: manager.company, profile: profile)

    convo.messages.create!(booking: self, user: manager.user)
  end
end
