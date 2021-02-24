class UsersController < ApplicationController
  def destroy
    authorize current_user
    if current_user.destroy
      flash[:alert] = "Your account has been successfully deleted."
      redirect_to root_path
    end
  end
end
