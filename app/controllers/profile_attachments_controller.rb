class ProfileAttachmentsController < ApplicationController
  require 'open-uri'

  before_action :set_profile_attachment, only: :download

  def download
    data = URI.open(@profile_attachment.attachment.service_url).read
    send_data data, disposition: 'attachment', filename: profile_attachment.title, type: @profile_attachment.attachment.blob.content_type
  end

  private

  def set_profile_attachment
    @profile_attachment = ProfileAttachment.find(params[:id])
    authorize @profile_attachment
  end

end
