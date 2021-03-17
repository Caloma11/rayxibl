class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[policy mail]

  def home
    redirect_to dashboard_path if user_signed_in?
  end

  def dashboard
    if current_user.manager?
      @manager = current_user.manager
      @network = @manager.network
      @today_booked_profiles = @manager.booked_profiles.has_bookings_today
      @bookings = @manager.bookings.today_and_after.active
      @company = @manager.company
      @jobs = @company.jobs.includes(:manager).active.limit(3)
      @bookings_count = @bookings.count
      @jobs_count = @jobs.count
    else
      @clients = current_user.profile.managers
      @bookings = current_user.profile.bookings.today_and_after.active
      @bookings_count = @bookings.count
    end
  end

  def schedule
  end

  def mail
    data = Rails.application.routes.recognize_path(request.referrer)
    redirect_to root_path if data[:controller] != "registrations" && data[:action] != "new" && params[:i] != "t"
  end

  def settings
    @emails = current_user&.invitations&.where('id NOT IN (SELECT DISTINCT(user_id) FROM profiles)').where('id NOT IN (SELECT DISTINCT(user_id) FROM managers)').pluck(:email) || []
  end

  def policy
  end
end
