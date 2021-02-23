class CustomInvitationPolicy < ApplicationPolicy
  def new?
    user && user.manager?
  end

  def ajax_create?
    new?
  end
end
