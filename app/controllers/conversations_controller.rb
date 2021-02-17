class ConversationsController < ApplicationController
  def index
    skip_policy_scope
    if current_user.manager?
      @conversations = current_user.manager.conversations.joins(:profile).includes(profile: [user: { avatar_attachment: :blob }])
      @jobs = current_user.manager.jobs

      if params[:network]
        @conversations = @conversations.where(profile_id: current_user.manager.network.pluck(:id)).by_latest_message
      else
        @conversations = @conversations.by_latest_message
      end
    else
      @conversations = current_user.profile.conversations.includes(profile: [user: { avatar_attachment: :blob }])
      @jobs = current_user.profile.jobs

      if params[:network]
        @conversations = @conversations.where(manager_id: current_user.profile.managers.pluck(:id)).by_latest_message
      else
        @conversations = @conversations.by_latest_message
      end
    end

    profile_params = params[:profile]

    if profile_params
      @conversations = ConversationFilter.new(@conversations, profile_params, current_user).call
    end

    respond_to do |format|
      format.html
      format.js
    end
  end

  def show
    @conversation = Conversation.includes(messages: [:user, { booking: [:attachments_attachments, :profile, :manager] }]).find(params[:id])
    if params[:booking_id]
      @booking = Booking.find(params[:booking_id])
    end
    authorize @conversation
    @other_person = @conversation.other_person(current_user)
    @conversation.messages.unread.update_all(read: true)
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
