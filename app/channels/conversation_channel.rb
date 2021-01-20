class ConversationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    conversation = Conversation.find(params[:id])
    stream_for conversation
  end
end
