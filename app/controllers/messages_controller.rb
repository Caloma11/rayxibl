class MessagesController < ApplicationController
  def create
    @conversation = Conversation.find(params[:conversation_id])
    @message = Message.new(message_params)
    @message.conversation = @conversation
    @message.user = current_user
    authorize @message

    if @message.save
      if current_user == @conversation.manager.user
        @message.notify_new_message(@conversation.profile.user)
      else
        @message.notify_new_message(@conversation.manager.user)
      end
      redirect_to conversation_path(@conversation, anchor: "message-#{@message.id}")
    else
      render "conversations/show"
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
