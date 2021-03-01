class InviteFreelancerJob < ApplicationJob
  queue_as :default

  def perform(email, inviter)
    invitee = User.invite!(email: email) do |u|
      u.role = "freelancer"
      u.invited_by = inviter
      u.skip_invitation = true # if Rails.env.production?
    end

    if invitee.profile || invitee.manager
      raise Exception.new "User already exists"
    elsif invitee.valid?
      SendgridMailer::Onboarding.new(invitee).call # if Rails.env.production?
    else
      raise Exception.new invitee.errors.messages
    end
  end
end
