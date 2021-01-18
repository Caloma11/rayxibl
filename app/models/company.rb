class Company < ApplicationRecord
  has_many :managers
  has_many :connections
  has_many :profiles, through: :connections
end
