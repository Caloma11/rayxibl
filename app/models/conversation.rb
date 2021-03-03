class Conversation < ApplicationRecord
  belongs_to :manager
  belongs_to :profile
  has_many :messages, dependent: :destroy

  validates :manager, uniqueness: { scope: :profile }

  scope :by_latest_message, -> {
    joins(:messages)
    .includes([profile: { user: :avatar_attachment }])
    .order("conversations.updated_at DESC")
    .distinct
  }

  scope :by_message_count, -> {
    sort_by { |convo| 0 <=> convo.messages.count}
  }


  scope :by_latest_message_with_empty, -> {
    joins("FULL JOIN messages m on m.conversation_id = conversations.id")
    .includes([profile: { user: :avatar_attachment }])
    .order("conversations.updated_at DESC")
    .distinct
  }

  def other_person(user)
    @other_person ||= user == manager.user ? profile.user : manager.user
  end

  def last_message
    messages&.order(:created_at)&.last
  end
end
