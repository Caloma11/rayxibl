class JobApplication < ApplicationRecord
  include JobApplications::Constants

  belongs_to :job
  belongs_to :profile

  enum status: STATUSES
end
