class Job < ApplicationRecord
  acts_as_taggable_on :skills

  belongs_to :manager
  has_one :company, through: :manager
  has_many :job_applications
  has_many_attached :attachments

  validates :location, :profession, :expertise, :description, :rate, :expiration_date, presence: true

  scope :active, -> { where("expiration_date > :today", today: Date.today) }
end
