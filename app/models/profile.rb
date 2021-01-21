class Profile < ApplicationRecord
  include Profiles::Constants

  acts_as_taggable_on :skills

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

  enum expertise: EXPERTISES

  validates :profession, :location, :overview, presence: true

  def average_rating
    return 0 if ratings.size.zero?

    ratings.count(:value).to_f / ratings.size
  end
end
