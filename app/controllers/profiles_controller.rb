class ProfilesController < ApplicationController
  before_action :set_profile, only: [:show, :edit, :update]
  skip_before_action :authenticate_user!, only: [:show]

  def index
    redirect_to dashboard_path if current_user.freelancer?

    if params[:network]
      skip_policy_scope
      profile = Profile
    else
      profile = policy_scope(Profile)
    end

    unless params[:ob].present? && params[:ob] == "t"
      @profiles = ProfileFilter.new(profile, params, current_user).call
      @jobs = current_user.manager.jobs
    else
      @profiles = Profile.none
      @jobs = Job.none
    end

    respond_to do |format|
      format.html
      format.js
    end
  end

  def show
    @ratings = @profile.ratings
    if current_user
      @connection = current_user.find_connection(@profile.user)
      @notes = current_user.manager.notes_of(@profile).includes([:manager]) if current_user.manager?
      @my_rating = @ratings.find_by(manager: current_user.manager, profile: @profile)
    end
    @links = @profile.profile_attachments.where.not(url: nil)
    @documents = @profile.profile_attachments.where(url: nil)

    @previous_page = request.referer || ""

    respond_to do |format|
      format.html
      format.js
    end
  end

  def new
    @profile = Profile.find_by(id: params[:profile_id]) || Profile.new
    @links = @profile.profile_attachments.where.not(url: nil)
    @documents = @profile.profile_attachments.where(url: nil)
    @profile.destroy if params[:step] == "step_one"
    authorize @profile
  end

  def create
    # STEP ONE
    if params[:step] == "step_one"
      @profile = Profile.new(step_one_profile_params)
      authorize @profile
      @profile.user = current_user
      if @profile.save
        # Update user
        current_user.update(user_params[:profile_user])
        redirect_to new_profile_path(step: "step_two", profile_id: @profile.id)
      else
        render 'new'
      end
    else # STEP TWO
      @profile = Profile.find(params[:profile_id])
      authorize @profile
      @profile.update(step_two_profile_params)
      if @profile.save(context: :step_two)
        redirect_to profile_path(@profile)
      else #Re-render step two
        @links = @profile.profile_attachments.where.not(url: nil)
        @documents = @profile.profile_attachments.where(url: nil)
        render 'new'
      end
    end
  end

  def edit
    @links = @profile.profile_attachments.where.not(url: nil)
    @documents = @profile.profile_attachments.where(url: nil)
  end

  def update
    if @profile.update(profile_params)
      current_user.update(user_params[:profile_user])
      redirect_to profile_path(@profile)
    else
      render 'edit'
    end
  end

  private

  def set_profile
    @profile = Profile.find(params[:id])
    authorize @profile
  end

  def step_one_profile_params
    params.require(:profile).permit(:profession, :location, :expertise, :skill_list)
  end

  def step_two_profile_params
    params.require(:profile).permit(:overview).reject{|_, v| v.blank?}
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
