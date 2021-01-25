class Job < ApplicationRecord
  include Bookings::Constants
  include Profiles::Constants

  acts_as_taggable_on :skills

  enum price_type: PRICE_TYPES
  enum expertise: EXPERTISES

  belongs_to :manager
  has_one :company, through: :manager
  has_many :job_applications
  has_many_attached :attachments

  validates :location, :profession, :expertise, :description, :rate, :expiration_date, presence: true

  scope :active, -> { where("expiration_date > :today", today: Date.today) }
end
