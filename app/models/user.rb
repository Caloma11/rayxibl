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
end
