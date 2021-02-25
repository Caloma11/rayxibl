class JobPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.freelancer?
        scope.outside_connections(user.profile)
      else
        scope
      end
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
    user_present_and_manager? && is_owner?
  end

  def update?
    user_present_and_manager? && is_owner?
  end

  def archive?
    user_present_and_manager? && is_owner?
  end

  private

  def is_owner?
    record.manager == user.manager
  end

  def user_present_and_manager?
    user.present? && user.manager?
  end
end
