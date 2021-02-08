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
    if user&.profile
      !record.overview && record.user == user
    else
      user && !user.manager
    end
  end

  def update?
    user && record.user == user
  end
end
