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
  has_many :bookings
  has_many :job_applications
  # [BE CAREFUL]: Not scoped to a specific manager
  has_many :notes

  enum expertise: EXPERTISES

  validates :profession, :location, :overview, presence: true

  after_create :connect_with_inviter

  def average_rating
    return 0 if ratings.size.zero?
    (ratings.pluck(:value).sum.to_f / ratings.size.to_f).round
  end

  private

  def connect_with_inviter
    return unless user.invited_by
    Connection.create!(profile: self, company: user.invited_by.company)
  end
end
