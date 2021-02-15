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
    redirect_to edit_manager_path(@manager)
  end

  def edit
    @manager = Manager.find(params[:id])
    authorize @manager
  end

  def update
    @manager = Manager.find(params[:id])
    authorize @manager
    if @manager.update(edit_manager_params)
      current_user.update(user_params[:user_attributes]) if user_params.present?
      @manager.company.update(company_params[:company_attributes]) if company_params.present?
      flash[:notice] = "Manager profile succesfully updated."
      redirect_to edit_manager_path(@manager)
    else
      binding.pry

      render 'edit'
    end
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
      redirect_to dashboard_path(@manager)
    else
      render 'new'
    end
  end

  private

  def manager_params
    params.require(:manager).permit(:job_title, :company_id, company_attributes: {}, user_attributes: {})
  end

  def user_params
    params.require(:manager).permit(user_attributes: {})
  end

  def edit_manager_params
    params.require(:manager).permit(:job_title)
  end

  def company_params
    params.require(:manager).permit(company_attributes: {})
  end
end
