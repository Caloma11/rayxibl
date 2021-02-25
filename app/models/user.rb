class User < ApplicationRecord
  include Users::Constants

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_one_attached :avatar
  # Manager side
  has_one :manager
  has_one :company, through: :manager

  # Freelancer side
  has_one :profile

  enum role: ROLES

  before_destroy :cleanup

  validates :preferred_currency, presence: true, inclusion: { in: CURRENCIES }

  def display_name
    "#{first_name} #{last_name}"
  end

  def find_connection(user)
    Connection.find_by(company: user.manager&.company, profile: self.profile) ||
    Connection.find_by(company: self.manager&.company, profile: user.profile) ||
    false
  end

  def conversation_with(other)
    if manager?
      Conversation.find_by(manager: manager, profile: other.profile)
    else
      Conversation.find_by(manager: other.manager, profile: profile)
    end
  end

  def cleanup
    if freelancer?
      profile&.ratings&.destroy_all
      profile&.job_applications&.destroy_all
      profile&.notes&.destroy_all
      Message.where(user: self)&.destroy_all
      profile&.bookings&.destroy_all
      profile&.conversations&.destroy_all
      profile&.connections&.destroy_all
      profile&.destroy
    elsif manager?
      # Safe navigation for seed cleanup purposes
      manager&.jobs&.destroy_all
      manager&.company&.connections&.destroy_all
      manager&.bookings&.destroy_all
      manager&.conversations&.destroy_all
      manager&.notes&.destroy_all
      manager&.ratings&.destroy_all
      manager&.company&.destroy
    end
  end
end
