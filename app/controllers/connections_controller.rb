class ConnectionsController < ApplicationController
  before_action :set_connection, only: [:destroy, :destroy_as_fl]

  def create
    @profile = Profile.find(params[:profile_id])
    @company = current_user.manager.company
    @connection = Connection.new(profile: @profile, company: @company)
    authorize @connection
    if @connection.save
      last_url = Rails.application.routes.recognize_path(request.referrer)
      flash[:notice] = "You have added #{@profile.user.display_name} to your network!"
      if last_url[:action] == "index" && last_url[:controller] == "profiles"
        respond_to do |format|
          format.js
        end
      elsif last_url[:action] == "show" && last_url[:controller] == "conversations"
        @conversation = Conversation.find_by(manager: current_user.manager, profile: @profile)
        redirect_to conversation_path(@conversation, anchor: "message-#{@conversation.messages&.last&.id}")
      else
        redirect_to profile_path(@profile)
      end
    else
      render 'profiles/show'
    end
  end

  def ajax_create
    @profile = Profile.find(params[:profile_id])
    @company = current_user.manager.company
    @connection = Connection.new(profile: @profile, company: @company)
    authorize @connection
    if @connection.save
      respond_to do |format|
        format.js
      end
    else
      render 'profiles/show'
    end
  end

  def destroy
    @profile = @connection.profile
    @connection.destroy
    flash[:notice] = "You have removed #{@connection.profile.user.display_name} from your network."
    respond_to do |format|
      format.html { redirect_to profile_path(@connection.profile) }
      format.js
    end
  end

  def destroy_as_fl
    @connection.destroy
    flash[:notice] = "You have been removed from #{@connection.company.name}'s network"
    redirect_to managers_path
  end

  private

  def set_connection
    @connection = Connection.find(params[:id])
    authorize @connection
  end

end
