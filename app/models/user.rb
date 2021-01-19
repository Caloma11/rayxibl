class User < ApplicationRecord
  include Users::Constants

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_one_attached :avatar
  # Manager side
  has_one :manager
  has_one :company, through: :manager

  # Freelancer side
  has_one :profile

  enum role: ROLES

  def display_name
    "#{first_name} #{last_name}"
  end

  def find_connection(user)
    Connection.find_by(company: user.manager&.company, profile: self.profile) ||
    Connection.find_by(company: self.manager&.company, profile: user.profile) ||
    false
  end
end
