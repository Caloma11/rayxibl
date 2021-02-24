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

  def cancel?
    is_booker? && still_pending?
  end

  def accept_or_reject?
    still_pending? && is_freelancer?
  end

  private

  def is_booker?
    user.manager? && record.manager == user.manager
  end

  def before_start?
    Date.today < record.start_date
  end

  def still_pending?
    record.pending?
  end

  def is_freelancer?
    record.profile == user.profile
  end
end
