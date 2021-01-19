class ConfirmationsController < Devise::ConfirmationsController

  private

  def after_confirmation_path_for(resource_name, resource)
    sign_in(resource)
    if resource.manager?
      new_manager_path
    else
      new_profile_path
    end
  end
end
