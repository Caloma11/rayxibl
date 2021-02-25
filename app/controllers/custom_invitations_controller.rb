require 'csv'
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

  def csv_create
    authorize :invite, policy_class: CustomInvitationPolicy
    @file = params[:bulk_invitation][:csv_file]
    if @file.content_type.match?(/csv|comma|separated/)
      if File.exist?(@file.tempfile)
        emails_array  = []
        CSV.foreach(@file.tempfile) do |row|
          emails_array << row.select { |col_value| col_value && col_value.match?(URI::MailTo::EMAIL_REGEXP) }
        end
        emails_array.flatten!
        emails_array.each { |email| InviteFreelancerJob.perform_later(email, current_user) }
        flash[:notice] = "Invitations succesfully sent"
      end
    else
      flash[:alert] = "Please provide a CSV"
    end
    redirect_to new_invitation_path
  end
end

