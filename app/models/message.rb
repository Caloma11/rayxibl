class Message < ApplicationRecord
  belongs_to :booking, optional: true
  belongs_to :user
  belongs_to :conversation, touch: true

  after_create :broadcast

  # Message#content needs to exist if there is no `booking`
  validates :content, presence: true, if: Proc.new { |msg| msg.booking.nil? }

  scope :unread, -> { where(read: false) }

  class << self
    def unread_user_scoped_count(current_user)
      data = {
        manager_id: current_user.manager&.id,
        profile_id: current_user.profile&.id
      }

      joins(:conversation)
        .where(
          "conversations.manager_id = :manager_id OR conversations.profile_id = :profile_id", data
        )
        .unread
        .count
    end
  end

  def timestamp
    if created_at.today?
      created_at.strftime "%I:%M %p"
    elsif (Date.today - created_at.to_date).to_i == 1
      "Yesterday"
    else
      created_at.strftime "%d/%m/%Y"
    end
  end

  def notify_new_message(current_user)
    ActionCable.server.broadcast("user_#{current_user.id}_new_messages", count: self.class.unread_user_scoped_count(current_user))
  end

  private

  def broadcast
    ConversationChannel.broadcast_to(
        conversation,
        partial: ApplicationController.render(partial: "messages/message", locals: { message: self, user_is_author: false }),
        sender_id: user.id
      )
  end
end
