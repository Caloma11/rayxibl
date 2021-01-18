class Message < ApplicationRecord
  belongs_to :booking, optional: true
  belongs_to :user
  belongs_to :conversation
end
