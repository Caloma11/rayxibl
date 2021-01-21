class Users::InvitationsController < Devise::InvitationsController

  # After an invitation is created and sent, the inviter will be redirected here
  def after_invite_path_for(inviter, invitee)
    flash[:notice] = "Invitation succesfully sent."
    dashboard_path
  end

  # After an invitation is accepted, the invitee will be redirected here
  def after_accept_path_for(resource)
    case resource.role
    when 'freelancer'
      new_profile_path
    when 'manager'
      new_manager_path
    end
  end

  def new
    self.resource = resource_class.new
    render :new
  end

  # POST /resource/invitation
  def create
    # Custom attributes for different types of invitations
    if params[:inviter] == "freelancer" && params[:invitee] == "manager"
      self.resource = invite_resource { |u| u.role = "manager" }
    elsif params[:inviter] == "manager" && params[:invitee] == "freelancer"
      self.resource = invite_resource { |u| u.role = "freelancer" }
    elsif params[:inviter] == "manager" && params[:invitee] == "manager"
      self.resource = invite_resource { |u| u.role = "manager" }
    else
      self.resource = invite_resource
    end

    # Standard code from gem
    resource_invited = resource.errors.empty?

    yield resource if block_given?


    if resource_invited
      if is_flashing_format? && self.resource.invitation_sent_at
        set_flash_message :notice, :send_instructions, email: self.resource.email
      end
      if self.method(:after_invite_path_for).arity == 1
        respond_with resource, location: after_invite_path_for(current_inviter)
      else
        respond_with resource, location: after_invite_path_for(current_inviter, resource)
      end
    else
      respond_with_navigational(resource) { render :new }
    end
  end
end

