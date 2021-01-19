class Note < ApplicationRecord
  belongs_to :manager
  belongs_to :profile

  validates :content, presence: true
end
