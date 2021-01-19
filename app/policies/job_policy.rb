class JobPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.active
    end
  end

  def show?
    true
  end
end
