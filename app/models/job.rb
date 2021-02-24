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
  has_many :job_applications, dependent: :destroy
  has_many :profiles, through: :job_applications
  has_many_attached :attachments

  validates :location, :profession, :expertise, :description, :rate, :expiration_date, :start_date, :end_date, presence: true

  scope :active, -> { where("expiration_date > :today", today: Date.today) }
  scope :outside_connections, ->(profile) { where.not(manager_id: profile.managers.pluck(:id)) }

  def full_timestamp
    return unless (start_date && end_date && start_time && end_time)
    "#{start_date.strftime("%d %b")} - #{end_date.strftime("%d %b")}, #{start_time.strftime("%H:%M")} - #{end_time.strftime("%H:%M")}"
  end
end
