class Job < ApplicationRecord
  include Bookings::Constants
  include Profiles::Constants
  include Jobs::Constants

  acts_as_taggable_on :skills

  enum price_type: PRICE_TYPES
  enum expertise: EXPERTISES
  enum status: STATUSES

  belongs_to :manager
  has_one :company, through: :manager
  has_many :job_applications
  has_many :profiles, through: :job_applications
  has_many_attached :attachments

  validates :location, :profession, :expertise, :description, :rate, :expiration_date, presence: true

  scope :active, -> { where("expiration_date > :today", today: Date.today) }

  def full_timestamp
    "#{start_date.strftime("%d %b")} - #{end_date.strftime("%d %b")}, #{start_time.strftime("%H:%M")} - #{end_time.strftime("%H:%M")}"
  end
end
