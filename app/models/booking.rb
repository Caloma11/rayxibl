class Booking < ApplicationRecord
  include Bookings::Constants
  include Bookings::CalculatePrice

  belongs_to :manager
  belongs_to :profile
  has_one :message, dependent: :destroy
  has_many_attached :attachments

  validates :title, :description, :start_date, :end_date, presence: true
  validates :price, :price_type, presence: true, if: -> { self.billable }
  validates :price, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true

  validate :end_time_after_start_time

  enum price_type: PRICE_TYPES
  enum status: STATUSES

  scope :today_and_after, -> { where("start_date >= ?", Date.today) }
  scope :archived, -> { where(archived: true) }
  scope :active, -> { where(status: [0, 1, 2], archived: false) }

  before_save :determine_total_price
  after_create :create_widget

  before_update :ensure_unique_duration
  before_update :archive!, if: -> { [3, "canceled"].include? status }

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
      "#{duration} hours / day"
    else
      "#{parsed_start_time} - #{parsed_end_time}"
    end
  end

  def pricing_text
    return "-" unless price
    if [0, "per hour"].include? price_type
      "#{price * 8} per day"
    elsif [1, "per day"].include? price_type
      "#{price} per day"
    elsif [2, "fixed price"].include? price_type
      price
    end
  end

  def duration_in_hours
    if duration
      duration
    else
      ((end_time - start_time) / 1.hour).round
    end
  end

  def parsed_short_time
    "#{start_time&.strftime("%H:%M")} - #{end_time&.strftime("%H:%M")}"
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

    convo = Conversation.find_or_initialize_by(manager: manager, profile: profile)

    convo.save! unless convo.persisted?

    convo.messages.create!(booking: self, user: manager.user)
  end

  def archive!
    self.archived = true
  end
end
