class Job < ApplicationRecord
  belongs_to :manager
  has_many :job_applications
end
