class ManagersController < ApplicationController

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
    params.require(:manager).permit(:job_title, company_attributes: {})
  end

end
