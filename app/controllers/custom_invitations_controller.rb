class CustomInvitationsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized

  def create
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
end
