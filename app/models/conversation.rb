class Conversation < ApplicationRecord
  belongs_to :manager
  belongs_to :profile
  has_many :messages, dependent: :destroy

  validates :manager, uniqueness: { scope: :profile }

  scope :by_latest_message, -> {
    joins("FULL JOIN messages m ON m.conversation_id = conversations.id")
    .includes([:messages, profile: { user: :avatar_attachment }])
    .order("messages.created_at DESC")
    .distinct
  }

  def other_person(user)
    @other_person ||= user == manager.user ? profile.user : manager.user
  end

  def last_message
    messages&.order(:created_at)&.last
  end
end
