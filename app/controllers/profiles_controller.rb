class ProfilesController < ApplicationController
  def index
    if params[:network]
      skip_policy_scope
      @profiles = current_user.manager.network.includes(user: [:avatar_attachment])
    else
      @profiles = policy_scope(Profile).includes(user: [:avatar_attachment])
    end
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

      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:profession, :location, :overview, :expertise)
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
