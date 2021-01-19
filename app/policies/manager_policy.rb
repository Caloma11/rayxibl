class ManagerPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    user.manager? && record == user.manager
  end

  def create?
    user && !user.manager && !user.profile
  end
end
