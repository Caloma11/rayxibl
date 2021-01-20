class BookingAttachmentsController < ApplicationController
  require 'open-uri'

  def download
    @attachment = ActiveStorage::Attachment.find(params[:id])
    authorize(@attachment, policy_class: BookingAttachmentPolicy)

    if @attachment
      data = URI.open(@attachment.service_url).read
      send_data(data, disposition: "attachment", filename: @attachment.blob.filename.to_s, type: @attachment.blob.content_type)
    end
  end
end
