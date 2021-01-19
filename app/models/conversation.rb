class Conversation < ApplicationRecord
  belongs_to :manager
  belongs_to :profile

  validates :manager, uniqueness: { scope: :profile }
end
