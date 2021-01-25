class JobApplicationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    user.present? && !record.job.profiles.include?(user.profile)
  end
end
