class JobApplicationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    user.present? && !record.job.profiles.include?(user.profile) && record.job.manager.user.find_connection(user) == false
  end
end
