class ProfileAttachmentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def download?
    true
  end

  def create?
    record.profile.user == user
  end

  def destroy?
    create?
  end

end
