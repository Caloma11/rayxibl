class Rating < ApplicationRecord
  belongs_to :profile
  belongs_to :manager
end
