class BookingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    record.manager == user.manager || record.profile == user.profile
  end

  def create?
    user.manager? && user.find_connection(record.profile.user)
  end

  def edit?
    is_booker?
  end

  def update?
    is_booker?
  end

  private

  def is_booker?
    user.manager? && record.manager == user.manager
  end
end
