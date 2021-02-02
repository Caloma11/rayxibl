class Manager < ApplicationRecord
  belongs_to :company
  belongs_to :user
  has_many :bookings
  # Grab all the freelancer's profiles that a manager booked
  has_many :booked_profiles, through: :bookings, class_name: "Profile", source: :profile
  has_many :conversations
  has_many :jobs
  has_many :job_applications, through: :jobs
  has_many :notes
  has_many :network, through: :company, source: :profiles, class_name: "Profile"

  validates :job_title, presence: true

  accepts_nested_attributes_for :company
  accepts_nested_attributes_for :user

  scope :except_me, ->(my_id) { joins(:company).where.not(id: my_id) }

  after_create :connect_with_inviter

  def notes_of(profile)
    return Note.none unless profile
    company.notes.where(profile: profile)
  end

  private

  def connect_with_inviter
    return unless user.invited_by&.profile
    Connection.create!(profile: user.invited_by.profile, company: company)
  end

end
