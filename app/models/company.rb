class Company < ApplicationRecord
  has_one_attached :logo
  has_many :managers, dependent: :destroy
  has_many :jobs, through: :managers
  has_many :job_applications, through: :jobs
  has_many :notes, through: :managers
  has_many :connections
  has_many :profiles, through: :connections

  validates :name, presence: true
end
