class ProfileAttachmentsController < ApplicationController
  require 'open-uri'

  before_action :set_profile_attachment, except: [:create]

  def download
    data = URI.open(@profile_attachment.attachment.service_url).read
    send_data data, disposition: 'attachment', filename: @profile_attachment.title, type: @profile_attachment.attachment.blob.content_type
  end

  def create
    @profile = Profile.find(params[:profile_id])
    @profile_attachment = ProfileAttachment.new(profile_attachment_params)
    @profile_attachment.profile = @profile
    @profile_attachment.save!
    @is_link = @profile_attachment.url.present?
    authorize @profile_attachment
    respond_to do |format|
      format.js
    end
  end

  def update
    if @profile_attachment.update(update_profile_attachment_params)
      @is_link = @profile_attachment.url.present?
      respond_to do |format|
        format.html { redirect_to profile_path(@profile_attachment.profile) }
        format.js
      end
    else
      render 'profiles/show'
    end
  end

  def destroy
    @profile_attachment.destroy
    respond_to do |format|
      format.html { redirect_to profile_path(@profile_attachment.profile) }
      format.js
    end
  end

  private

  def set_profile_attachment
    @profile_attachment = ProfileAttachment.find(params[:id])
    authorize @profile_attachment
  end

  def profile_attachment_params
    params.require(:profile_attachment).permit(:title, :url, :attachment)
  end

  def update_profile_attachment_params
    params.require(:profile_attachment).permit(:title, :url)
  end

end
