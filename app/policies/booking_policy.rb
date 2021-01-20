class BookingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def show?
    record.manager = user.manager
  end

  def create?
    user.manager? && user.find_connection(record.profile.user)
  end
end
