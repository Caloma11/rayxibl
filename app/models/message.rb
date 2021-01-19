class Message < ApplicationRecord
  belongs_to :booking, optional: true
  belongs_to :user
  belongs_to :conversation

  # Message#content needs to exist if there is no `booking`
  validates :content, presence: true, if: Proc.new { |msg| msg.booking.nil? }
end
