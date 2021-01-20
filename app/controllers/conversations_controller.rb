class ConversationsController < ApplicationController
  def index
    skip_policy_scope
    @conversations = current_user.manager? ? current_user.manager.conversations.by_latest_message : current_user.profile.conversations.by_latest_message
  end

  def show
    @conversation = Conversation.find(params[:id])
    authorize @conversation
    @other_person = @conversation.other_person(current_user)
    @message = Message.new
  end

  def create
    @conversation = Conversation.new(conversation_params)
    @manager = current_user.manager
    @conversation.manager = @manager
    authorize @conversation

    if @conversation.save
      redirect_to conversation_path(@conversation)
    else
      render "profiles/index"
    end
  end

  private

  def conversation_params
    params.require(:conversation).permit(:profile_id)
  end
end
