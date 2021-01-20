class ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    user.present? && [record.manager.user, record.profile.user].include?(user)
  end
end
