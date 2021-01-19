class ProfilePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    user && !user.manager && !user.profile
  end
end
