class JobsController < ApplicationController
  def index
    @jobs = policy_scope(Job)

    if params[:manager_id]
      @jobs = @jobs.where(manager_id: params[:manager_id])
    end

    if params[:status] == "0"
      @jobs = @jobs.live
    elsif params[:status] == "1"
      @jobs = @jobs.archived
    end
  end

  def show
    @job = Job.find(params[:id])
    authorize @job
  end

  def new
    @job = Job.new
    authorize @job
  end

  def create
    @job = Job.new(job_params)
    @job.manager = current_user.manager

    authorize @job

    if @job.save
      redirect_to job_path(@job)
    else
      render :new
    end
  end

  def edit
    @job = Job.find(params[:id])
    authorize @job
  end

  def update
    @job = Job.find(params[:id])
    authorize @job

    if @job.update(job_params)
      redirect_to job_path(@job)
    else
      render :edit
    end
  end

  private

  def job_params
    params.require(:job).permit(
      :title, :description,
      :skill_list, :expertise,
      :location, :start_time, :end_time,
      :start_date, :end_date, :rate,
      :profession, :expiration_date,
      :duration, :weekends,
      :price_type, attachments: []
    )
  end
end
