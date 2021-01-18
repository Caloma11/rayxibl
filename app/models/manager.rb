class Manager < ApplicationRecord
  belongs_to :company
  belongs_to :user
  has_many :bookings
  # Grab all the freelancer's profiles that a manager booked
  has_many :booked_profiles, through: :bookings, class_name: "Profile", source: :profile
  has_many :conversations
  # Reminder: Not scoped to a specific profile
  has_many :notes
end
