class JobApplicationsController < ApplicationController
  def create
    @job = Job.find(params[:job_id])
    @job_application = JobApplication.new(job_application_params)
    @job_application.job = @job

    authorize @job_application

    if @job_application.save
      redirect_to job_path(@job)
    else
      render "jobs/show"
    end
  end

  private

  def job_application_params
    params.require(:job_application).permit(:profile_id)
  end
end
