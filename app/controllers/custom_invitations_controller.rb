class CustomInvitationsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_after_action :verify_authorized

  def create
    user = User.invite!(email: params[:resource][:email])
    if user.valid?
      redirect_to mail_path(i: "t")
    else
      flash[:alert] = "Email is not valid"
      redirect_to root_path
    end
  end
end
