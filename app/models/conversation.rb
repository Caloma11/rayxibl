class Conversation < ApplicationRecord
  belongs_to :manager
  belongs_to :profile
  has_many :messages

  validates :manager, uniqueness: { scope: :profile }

  scope :by_latest_message, -> {
    joins(:messages)
    .includes([:messages, profile: { user: :avatar_attachment }])
    .order("messages.created_at")
    .distinct
  }

  def other_person(user)
    @other_person ||= user == manager.user ? profile.user : manager.user
  end
end
