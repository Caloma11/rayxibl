class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[mail]

  def home
  end

  def dashboard
    if current_user.manager?
      @network = current_user.manager.network
      @booked_profiles = current_user.manager.booked_profiles
      @bookings = current_user.manager.bookings
      @jobs = current_user.manager.company.jobs.includes(:company, :manager).limit(3)
    else
      @clients = current_user.profile.managers
      @bookings = current_user.profile.bookings
    end
  end

  def schedule
  end

  def mail
  end
end
