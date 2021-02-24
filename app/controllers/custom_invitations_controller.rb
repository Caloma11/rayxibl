class CustomInvitationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  skip_after_action :verify_authorized, only: [:create]

  # Homepage create
  def create
    if User.find_by(email: params[:resource][:email])
      flash[:alert] = "Email is already in use."
      redirect_to root_path
      return false
    end

    user = User.invite!(email: params[:resource][:email]) do |u|
      u.skip_invitation = true if Rails.env.production?
    end
    if user.valid?
      SendgridMailer::Onboarding.new(user).call if Rails.env.production?
      redirect_to mail_path(i: "t")
    else
      flash[:alert] = "Email is not valid"
      redirect_to root_path
    end
  end

  def new
    authorize :invite, policy_class: CustomInvitationPolicy
  end
end

