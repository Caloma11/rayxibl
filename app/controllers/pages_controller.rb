class PagesController < ApplicationController
  def home
  end

  def dashboard
    if current_user.manager?
      @network = current_user.manager.network
    else
      @clients = current_user.profile.managers
    end
  end

  def schedule
  end
end
