class Job < ApplicationRecord
  belongs_to :manager
  has_many :job_applications

  validates :location, :profession, :expertise, :description, :rate, :expiration_date, presence: true
end
