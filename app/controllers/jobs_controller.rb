class JobsController < ApplicationController
  def index
    @jobs = policy_scope(Job)

    if params[:manager_id]
      @jobs = @jobs.where(manager_id: params[:manager_id])
    end
  end

  def show
    @job = Job.find(params[:id])
    authorize @job
  end
end
