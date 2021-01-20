class ProfileAttachment < ApplicationRecord
  belongs_to :profile
  has_one_attached :attachment

  validates :title, presence: true
  validates :url, presence: true, unless: Proc.new { |pa| pa.attachment.attached? }

end
