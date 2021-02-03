class JobPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    true
  end

  def new?
    user_present_and_manager?
  end

  def create?
    user_present_and_manager?
  end

  def edit?
    user_present_and_manager? && record.manager == user.manager
  end

  def update?
    user_present_and_manager? && record.manager == user.manager
  end

  private

  def user_present_and_manager?
    user.present? && user.manager?
  end
end
