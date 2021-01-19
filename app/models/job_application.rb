class JobApplication < ApplicationRecord
  include JobApplications::Constants

  belongs_to :job
  belongs_to :profile

  validates :job, uniqueness: { scope: :profile }
  enum status: STATUSES
end
