class ConversationsController < ApplicationController
  def index
    skip_policy_scope
    if current_user.manager?
      if params[:network]
        @conversations = current_user.manager.conversations.includes(:messages, profile: [user: :avatar_attachment]).where(profile_id: current_user.manager.network.pluck(:id)).by_latest_message
      else
        @conversations = current_user.manager.conversations.includes(:messages, profile: [user: :avatar_attachment]).by_latest_message
      end
    else
      if params[:network]
        @conversations = current_user.profile.conversations.includes(:messages, profile: [user: :avatar_attachment]).where(manager_id: current_user.profile.managers.pluck(:id)).by_latest_message
      else
        @conversations = current_user.profile.conversations.includes(:messages, profile: [user: :avatar_attachment]).by_latest_message
      end
    end
  end

  def show
    @conversation = Conversation.includes(messages: [:user]).find(params[:id])
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
