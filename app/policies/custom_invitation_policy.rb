class CustomInvitationPolicy < ApplicationPolicy
  def new?
    user && user.manager?
  end

  def create?
    new?
  end

  def resend?
    new?
  end
end
