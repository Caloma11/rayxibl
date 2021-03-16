class PasswordsController < Devise::PasswordsController
  skip_before_action :authenticate_user!
  prepend_before_action :require_no_authentication

  protected
  def after_sending_reset_password_instructions_path_for(resource_name)
    mail_path(pr: true)
  end
end
