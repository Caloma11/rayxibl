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

  def other_person(user)
    @other_person ||= user == manager.user ? profile.user : manager.user
  end

  def last_message
    messages&.order(:created_at)&.last
  end
end
