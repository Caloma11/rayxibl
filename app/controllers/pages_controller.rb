class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[mail]

  def home
    redirect_to dashboard_path if user_signed_in?
  end

  def dashboard
    if current_user.manager?
      @network = current_user.manager.network
      @booked_profiles = current_user.manager.booked_profiles
      @today_booked_profiles = @booked_profiles.has_bookings_today
      @bookings = current_user.manager.bookings
      @company = current_user.manager.company
      @jobs = @company.jobs.includes(:manager).limit(3)
      @bookings_count = @bookings.count
      @jobs_count = @jobs.count
    else
      @clients = current_user.profile.managers
      @bookings = current_user.profile.bookings
    end
  end

  def schedule
  end

  def mail
    data = Rails.application.routes.recognize_path(request.referrer)
    redirect_to root_path if data[:controller] != "registrations" && data[:action] != "new" && params[:i] != "t"
  end

  def settings
  end
end
