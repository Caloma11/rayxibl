class CustomInvitationPolicy < ApplicationPolicy
  def new?
    user && user.manager?
  end

  def create?
    new?
  end

  def csv_create?
    new?
  end
end
