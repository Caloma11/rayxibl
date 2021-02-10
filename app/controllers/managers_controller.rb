class ManagersController < ApplicationController
  def index
    @managers = policy_scope(Manager)
      .joins(company: { connections: :profile })
      .includes([:company, { user: [:avatar_attachment] }])
      .where(connections: { profile_id: current_user.profile.id })

    if params[:manager]
      @managers = ManagerFilter.new(@managers, params[:manager], current_user).call
    end

    respond_to do |format|
      format.html
      format.js
    end
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
    current_user.update(manager_params[:user_attributes])
    @manager.user = current_user
    if @manager.save
      redirect_to manager_path(@manager)
    else
      render 'new'
    end
  end

  private

  def manager_params
    params.require(:manager).permit(:job_title, :company_id, company_attributes: {}, user_attributes: {})
  end
end
