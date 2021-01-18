class Conversation < ApplicationRecord
  belongs_to :manager
  belongs_to :profile
end
