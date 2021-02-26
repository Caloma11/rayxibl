class Users::InvitationsController < Devise::InvitationsController
  skip_before_action :redirect_unless_completed

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
    authorize :invite, policy_class: CustomInvitationPolicy
    @email = params[:user][:email]
    @invitee = params[:invitee]
    # Resend logic
    if params[:r] == "t"
      @user = User.find_by(email: @email)
      if (@email && !@user&.manager && !@user&.profile)
        @user.destroy
        @resent = true
      end
    end

    @email = "" if !@email.match?(URI::MailTo::EMAIL_REGEXP)
    return false if @email == ""

    # Custom attributes for different types of invitations
    if params[:inviter] == "freelancer" && params[:invitee] == "manager"
      self.resource = invite_resource do |u|
        u.email = @email
        u.role = "manager"
        u.skip_invitation = true if Rails.env.production?
      end
    elsif params[:inviter] == "manager" && params[:invitee] == "freelancer"
      self.resource = invite_resource do |u|
        u.email = @email
        u.role = "freelancer"
        u.skip_invitation = true if Rails.env.production?
      end
      SendgridMailer::FreelancerInvite.new(current_user, resource).call if Rails.env.production?
    elsif params[:inviter] == "manager" && params[:invitee] == "manager"
      self.resource = invite_resource do |u|
        u.email = @email
        u.role = "manager"
        u.skip_invitation = true if Rails.env.production?
      end
      SendgridMailer::CompanyInvite.new(current_user, resource).call if Rails.env.production?
    else
      self.resource = invite_resource
    end

    resource_invited = resource.errors.empty?

    yield resource if block_given?
    @email = "" unless resource_invited

    respond_to do |format|
      format.html
      format.js
    end
  end
end

