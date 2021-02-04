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
    is_booker? && before_start?
  end

  def update?
    is_booker? && before_start?
  end

  private

  def is_booker?
    user.manager? && record.manager == user.manager
  end

  def before_start?
    Date.today < record.start_date
  end
end
