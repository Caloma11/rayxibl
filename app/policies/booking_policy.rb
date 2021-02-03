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
end
