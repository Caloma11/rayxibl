class ProfileAttachment < ApplicationRecord
  belongs_to :profile
  has_one_attached :attachment
end