class ManagersController < ApplicationController
  def index
    @managers = policy_scope(Manager)
      .joins(company: { connections: :profile })
      .includes([:company, :user])
      .where(connections: { profile_id: current_user.profile.id })
  end

  def show
    @manager = current_user.manager
    authorize @manager
  end

  def new
    @manager = Manager.new
    authorize @manager
  end

  def create
    @manager = Manager.new(manager_params)
    authorize @manager
    @manager.user = current_user
    if @manager.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def manager_params
    params.require(:manager).permit(:job_title, :company_id, company_attributes: {})
  end
end
