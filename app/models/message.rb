class Message < ApplicationRecord
  belongs_to :booking
  belongs_to :user
  belongs_to :conversation
end
