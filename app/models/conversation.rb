class Conversation < ApplicationRecord
  belongs_to :manager
  belongs_to :profile
  has_many :messages

  validates :manager, uniqueness: { scope: :profile }

  def other_person(user)
    @other_person ||= user == manager.user ? profile.user : manager.user
  end
end
