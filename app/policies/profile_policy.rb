class ProfilePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    true
  end

  def create?
    user && !user.manager && !user.profile
  end

  def update?
    user && record.user == user
  end
end
