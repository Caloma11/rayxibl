class ConnectionsController < ApplicationController
  before_action :set_connection, only: :destroy

  def create
    @profile = Profile.find(params[:profile_id])
    @company = current_user.manager.company
    @connection = Connection.new(profile: @profile, company: @company)
    authorize @connection
    if @connection.save
      last_url = Rails.application.routes.recognize_path(request.referrer)
      flash[:notice] = "You have added #{@profile.user.display_name} to your network!"
      if last_url[:action] == "index" && last_url[:controller] == "profiles"
        redirect_to profiles_path
      else
        redirect_to profile_path(@profile)
      end
    else
      render 'profiles/show'
    end
  end

  def destroy
    @connection.destroy
    redirect_to profile_path(@connection.profile)
  end

  private

  def set_connection
    @connection = Connection.find(params[:id])
    authorize @connection
  end

end
