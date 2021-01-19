class Rating < ApplicationRecord
  belongs_to :profile
  belongs_to :manager

  validates :value, presence: true, inclusion: { in: 0..5 }
end
