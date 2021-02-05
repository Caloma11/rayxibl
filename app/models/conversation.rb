class Conversation < ApplicationRecord
  belongs_to :manager
  belongs_to :profile
  has_many :messages, dependent: :destroy

  validates :manager, uniqueness: { scope: :profile }

  # TODO: Find a way to do with only 1 scope that doesn't remove `Conversation` without messages
  scope :by_latest_message, -> {
    joins(:messages)
    .includes([:messages, profile: { user: :avatar_attachment }])
    .order("messages.created_at")
    .distinct
  }
  scope :with_no_messages, -> {
    left_outer_joins(:messages)
     .includes([:messages, profile: { user: :avatar_attachment }])
     .distinct
  }

  def other_person(user)
    @other_person ||= user == manager.user ? profile.user : manager.user
  end
end
