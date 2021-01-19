class ConnectionsController < ApplicationController
  before_action :set_connection, only: :destroy

  def create
    @profile = Profile.find(params[:profile_id])
    @company = current_user.manager.company
    @connection = Connection.new(profile: @profile, company: @company)
    authorize @connection
    if @connection.save
      redirect_to profile_path(@profile)
    else
      binding.pry
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
