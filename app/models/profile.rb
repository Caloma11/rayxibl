class Profile < ApplicationRecord
  include Profiles::Constants

  acts_as_taggable_on :skills

  belongs_to :user
  has_many :connections, dependent: :destroy
  has_many :companies, through: :connections
  # Grabs a list of clients
  has_many :managers, through: :companies
  has_many :ratings
  has_many :conversations
  has_many :profile_attachments, dependent: :destroy
  has_many :bookings, -> { order(Arel.sql("end_date - start_date DESC")) }
  has_many :job_applications
  has_many :jobs, through: :job_applications
  # [BE CAREFUL]: Not scoped to a specific manager
  has_many :notes

  scope :has_bookings_today, -> { joins(:bookings).where("bookings.start_date = ?", Date.today) }

  delegate :display_name, to: :user

  enum expertise: EXPERTISES

  validates :profession, :location, presence: true

  validates :overview, presence: true, on: :step_two

  after_create :connect_with_inviter

  def has_applied_for?(job)
    job_applications.find_by(job: job, profile: self)
  end

  def average_rating
    return 0 if ratings.size.zero?
    (ratings.pluck(:value).sum.to_f / ratings.size.to_f).round
  end

  def avatar
    if user.avatar.attached?
      user.avatar.service_url
    else
      "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg"
    end
  end

  private

  def connect_with_inviter
    return unless user.invited_by
    Connection.create!(profile: self, company: user.invited_by.company)
  end
end
