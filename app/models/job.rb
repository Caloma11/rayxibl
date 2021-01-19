class Job < ApplicationRecord
  acts_as_taggable_on :skills

  belongs_to :manager
  has_many :job_applications

  validates :location, :profession, :expertise, :description, :rate, :expiration_date, presence: true

  scope :active, -> { where("expiration_date > :today", today: Date.today) }
end
