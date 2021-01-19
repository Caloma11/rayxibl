class ManagersController < ApplicationController
  def index
    @managers = policy_scope(Manager)
      .joins(company: { connections: :profile })
      .includes([:company, :user])
      .where(connections: { profile_id: current_user.profile.id })
  end
end
