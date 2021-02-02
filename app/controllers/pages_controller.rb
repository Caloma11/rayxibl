class PagesController < ApplicationController
  def home
  end

  def dashboard
    if current_user.manager?
      @network = current_user.manager.network
      @booked_profiles = current_user.manager.booked_profiles
      @bookings = current_user.manager.bookings
    else
      @clients = current_user.profile.managers
    end
  end

  def schedule
  end
end
