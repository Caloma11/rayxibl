class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def destroy?
    user.present?
  end

  def edit_password?
    user.present?
  end

  def update_password?
    user.present?
  end

  def update?
    user.present?
  end
end
