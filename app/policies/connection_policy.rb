class ConnectionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    user.manager?
  end

  def destroy?
    record.company == user.manager.company
  end
end