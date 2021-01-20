class ConversationsController < ApplicationController
  def index
    skip_policy_scope
    @conversations = current_user.manager? ? current_user.manager.conversations : current_user.profile.conversations
  end

  def show
    @conversation = Conversation.find(params[:id])
    authorize @conversation
    @other_person = @conversation.other_person(current_user)
    @message = Message.new
  end
end
