class ProfilesController < ApplicationController
  before_action :set_profile, only: :show

  def index
    redirect_to dashboard_path if current_user.freelancer?

    if params[:network]
      skip_policy_scope
      @profiles = current_user.manager.network.includes(:ratings, user: [:manager, avatar_attachment: :blob])
    elsif params[:job_id]
      @profiles = policy_scope(Profile)
                    .joins(job_applications: :job)
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob ])
                    .where(job_applications: { job_id: params[:job_id] })
    else
      @profiles = policy_scope(Profile).includes(:ratings, user: [:manager, avatar_attachment: :blob])
    end

    respond_to do |format|
      format.html
      format.js
    end
  end

  def show
    @connection = current_user.find_connection(@profile.user)
    @notes = current_user.manager.notes_of(@profile).includes([:manager]) if current_user.manager?

    @links = @profile.profile_attachments.where.not(url: nil)
    @documents = @profile.profile_attachments.where(url: nil)
  end

  def new
    @profile = Profile.new
    authorize @profile
  end

  def create
    @profile = Profile.new(profile_params)
    authorize @profile
    @profile.user = current_user

    if @profile.save

      # Create attachments
      attachment_params.each do |ap|
        profile_attachment = ProfileAttachment.new(ap)
        profile_attachment.profile = @profile
        profile_attachment.save!
      end

      # Update user
      current_user.update(user_params[:profile_user])

      redirect_to profile_path(@profile)
    else
      render 'new'
    end
  end

  private

  def set_profile
    @profile = Profile.includes(:profile_attachments, user: [:avatar_attachment]).find(params[:id])
    authorize @profile
  end

  def profile_params
    params.require(:profile).permit(:profession, :location, :overview, :expertise, :skill_list)
  end

  def link_params
    params.require(:profile).permit(profile_links: [:title, :url])
  end

  def document_params
    params.require(:profile).permit(profile_documents: [:title, :attachment])
  end

  def attachment_params
    [*link_params[:profile_links], *document_params[:profile_documents]]
  end

  def user_params
    params.require(:profile).permit(profile_user: [:first_name, :last_name, :avatar])
  end

end
