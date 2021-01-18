class Booking < ApplicationRecord
  belongs_to :manager
  belongs_to :profile
  has_many_attached :attachments
end
