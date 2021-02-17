class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_#{params[:user_id]}_new_messages"
  end
end
