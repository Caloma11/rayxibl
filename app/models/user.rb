class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Manager side
  has_one :manager
  has_one :company, through: :manager

  # Freelancer side
  has_one :profile
end
