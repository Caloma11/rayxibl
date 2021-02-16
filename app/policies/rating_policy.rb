class RatingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    user.manager.booked_profiles.include?(record.profile)
  end

  def update?
    true
  end
end
