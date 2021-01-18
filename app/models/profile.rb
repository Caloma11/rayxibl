class Profile < ApplicationRecord
  belongs_to :user
  has_many :connections
  has_many :companies, through: :connections
  # Grabs a list of clients
  has_many :managers, through: :companies
  has_many :ratings
  has_many :conversations

  def average_rating
    ratings.pluck(:value).sum.to_f / ratings.size
  end
end
