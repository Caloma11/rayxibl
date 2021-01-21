class ConversationsController < ApplicationController
  def index
    skip_policy_scope
    @conversations = current_user.manager? ? current_user.manager.conversations.by_latest_message : current_user.profile.conversations.by_latest_message
  end

  def show
    @conversation = Conversation.includes(messages: [:user]).find(params[:id])
    authorize @conversation
    @other_person = @conversation.other_person(current_user)
    @message = Message.new
  end
end
