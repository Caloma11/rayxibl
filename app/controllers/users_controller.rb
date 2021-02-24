class UsersController < ApplicationController
  def destroy
    authorize current_user
    if current_user.destroy
      flash[:alert] = "Your account has been successfully deleted."
      redirect_to root_path
    end
  end

  def edit_password
    @user = current_user
    authorize @user
  end

  def update_password
    authorize current_user

    if current_user.update(edit_password_params)
      flash[:notice] = "Password successfully updated."
      sign_in current_user, bypass: true
      redirect_to settings_path
    end
  end

  private

  def edit_password_params
    params.require(:user).permit(:password)
  end
end
