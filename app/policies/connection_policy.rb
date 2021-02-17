class ConnectionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    user.manager?
  end

  def ajax_create?
    create?
  end

  def destroy?
    record.company == user.manager.company
  end

  def destroy_as_fl?
    record.profile.user == user
  end
end
