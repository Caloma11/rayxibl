class ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    user.present? && [record.manager.user, record.profile.user].include?(user)
  end

  def create?
    if user.manager?
      !Conversation.find_by(manager: user.manager, profile: record.profile)
    else
      !Conversation.find_by(manager: record.manager, profile: user.profile)
    end
  end
end
