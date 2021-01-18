class PagesController < ApplicationController
  before_action :authenticate_user!, only: %i[dashboard]

  def home
  end

  def dashboard
    if current_user.manager?
      @network = current_user.manager.network
    else
      @clients = current_user.profile.managers
    end
  end
end
