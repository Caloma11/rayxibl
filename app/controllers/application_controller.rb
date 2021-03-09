class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!, except: %i[home]
  before_action :redirect_unless_completed

  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  include Pundit
  include NavbarLinks

  def get_rates
    # @rates ||= ExchangeRate.new(current_user).call
    0
  end

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    path_to_redirect = user_signed_in? ? dashboard_path : root_path
    redirect_to(path_to_redirect)
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[role])
    devise_parameter_sanitizer.permit(:accept_invitation, keys: %i[role])
    devise_parameter_sanitizer.permit(:account_update, keys: [])
  end

  def after_sign_in_path_for(resource)
    if resource.manager? && !resource.manager
      new_manager_path
    elsif resource.freelancer? && !resource.profile
      new_profile_path
    else
      dashboard_path
    end
  end

  def default_url_options
    { host: ENV["DOMAIN"] || "localhost:3000" }
  end

  private

  def redirect_unless_completed
    return if params[:action] == "mail" || params[:controller].match?(/custom/)
    return unless user_signed_in? && is_not_onboarding
    if current_user.manager? && !current_user.manager
      redirect_to new_manager_path
    elsif current_user.freelancer? && !current_user.profile
      redirect_to new_profile_path
    end
  end

  def skip_pundit?
    devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
  end

  def is_not_onboarding
    !(params[:action] == "new" && params[:controller] == "managers") &&
    !(params[:action] == "new" && params[:controller] == "profiles") &&
    !(params[:action] == "create" && params[:controller] == "profiles") &&
    !(params[:action] == "create" && params[:controller] == "managers")
  end
end
