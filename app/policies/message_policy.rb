class MessagePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    [record.conversation.manager.user, record.conversation.profile.user].include?(user)
  end
end
