class JobsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show]

  def index
    skip_policy_scope

    if current_user.freelancer?
      @jobs = Job.outside_connections(current_user.profile)
    else
      @jobs = current_user.manager.jobs
    end

    if params[:applied] == "true"
      @jobs = @jobs.joins(:job_applications).where("job_applications.profile_id = :id", id: current_user.profile.id)
    end

    if current_user.manager?
      @jobs = @jobs.includes(manager: { user: { avatar_attachment: :blob } })
    else
      @jobs = @jobs.includes(:manager).active
    end


    if params[:manager_id]
      @jobs = @jobs.where(manager_id: params[:manager_id])
    end

    if params[:status] == "0"
      @jobs = @jobs.live
    elsif params[:status] == "1"
      @jobs = @jobs.archived
    end


    if params[:job]
      @jobs = JobFilter.new(@jobs, params[:job], current_user).call
    end

    @filter_count = params[:job]&.permit!
                                &.to_h
                                &.filter { |k, _| k != "clear" }
                                &.filter { |k, v| v != "" }
                                &.filter { |k, v| v != [""] }
                                &.keys
                                &.count

    respond_to do |format|
      format.html
      format.js
    end
  end

  def show
    @job = Job.find(params[:id])
    authorize @job
  end

  def new
    @job = Job.new
    recognized = Rails.application.routes.recognize_path(request.referrer)

    @last_url = if recognized[:controller] == "pages"
                  dashboard_path
                elsif recognized[:controller] == "profiles"
                  profiles_path
                else
                  profiles_path
                end

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

  def archive
    @job = Job.find(params[:job_id])
    authorize @job
    if @job.archived!
      flash[:notice] = "Job successfully archived."
      redirect_to job_path(@job)
    else
      flash[:alert] = "Something went wrong. Please try again!"
      render "jobs/show"
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
