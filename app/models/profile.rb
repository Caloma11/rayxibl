class Profile < ApplicationRecord
  belongs_to :user
  has_many :connections
  has_many :companies, through: :connections
  # Grabs a list of clients
  has_many :managers, through: :companies
  has_many :ratings
  has_many :conversations
  has_many :profile_attachments
  # [BE CAREFUL]: Not scoped to a specific manager
  has_many :notes

  def average_rating
    ratings.pluck(:value).sum.to_f / ratings.size
  end
end