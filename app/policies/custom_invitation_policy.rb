class CustomInvitationPolicy < ApplicationPolicy
  def new?
    user && user.manager?
  end
end
