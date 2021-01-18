class ProfilesController < ApplicationController
  def new
    @profile = Profile.new
    authorize @profile
  end

  def create
    @profile = Profile.new(profile_params)
    authorize @profile
    @profile.user = current_user

    binding.pry

    if @profile.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:profession, :location, :overview, :expertise)
  end

  def links_params
    params.require(:profile).permit(profile_links: [:title, :url])
  end

  def documents_params
    params.require(:profile).permit(profile_documents: [:title, :attachment])
  end

  def user_params
    params.require(:profile).permit(profile_user: [:first_name, :last_name, :avatar])
  end

end
