class JobApplication < ApplicationRecord
  belongs_to :job
  belongs_to :profile

  validates :job, uniqueness: { scope: :profile }
end
