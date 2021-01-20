class NotePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def create?
    user.manager && user.find_connection(record.profile.user)
  end
end
