class Message < ApplicationRecord
  belongs_to :booking, optional: true
  belongs_to :user
  belongs_to :conversation, touch: true

  after_create :broadcast

  # Message#content needs to exist if there is no `booking`
  validates :content, presence: true, if: Proc.new { |msg| msg.booking.nil? }

  scope :unread, -> { where(read: false) }

  private

  def broadcast
    ConversationChannel.broadcast_to(
        conversation,
        partial: ApplicationController.render(partial: "messages/message", locals: { message: self, user_is_author: false }),
        sender_id: user.id
      )
  end
end
