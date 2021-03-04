class ConversationsController < ApplicationController
  before_action :get_rates, only: %i[show]

  def index
    skip_policy_scope
    if current_user.manager?
      @conversations = current_user.manager.conversations.joins(:profile).includes(profile: [user: { avatar_attachment: :blob }])
      @jobs = current_user.manager.jobs

      if params[:network]
        @conversations = @conversations.where(profile_id: current_user.manager.network.pluck(:id)).by_latest_message_with_empty
      else
        @conversations = @conversations.by_latest_message
      end
    else
      @conversations = current_user.profile.conversations.includes(profile: [user: { avatar_attachment: :blob }])
      @jobs = current_user.profile.jobs

      if params[:network]
        @conversations = @conversations.where(manager_id: current_user.profile.managers.pluck(:id)).by_latest_message_with_empty
      else
        @conversations = @conversations.by_latest_message
      end
    end

    profile_params = params[:profile]

    if profile_params
      @conversations = ConversationFilter.new(@conversations, profile_params, current_user).call
    end

    @unread_messages_count = @conversations&.map { |convo| convo.messages.unread.count }&.sum

    @conversations = @conversations.by_message_count

    @filter_count = params[:profile]&.permit!
                                      &.to_h
                                      &.filter { |k, _| k != "clear" }
                                      &.filter { |k, v| v != "" }
                                      &.filter { |k, v| v != [""] }
                                      &.keys
                                      &.count

    respond_to do |format|
      format.html
      format.js
    end
  end

  def show
    @conversation = Conversation.find(params[:id])
    authorize @conversation
    @other_person = @conversation.other_person(current_user)

    timestamp = params.try(:[], :conversation).try(:[], :timestamp)
    @messages = @conversation.messages.includes(:user, { booking: [:attachments_attachments, :profile, :manager] }).order(created_at: :DESC)

    if timestamp
      @messages = @messages.where("created_at < ?", timestamp.to_date).limit(10)
    else
      @messages = @messages.limit(10)
    end

    unless timestamp
      @conversation.messages.where.not(user: current_user).unread.update_all(read: true)
    end

    @messages = @messages.reverse
    @message = Message.new

    if params[:booking_id]
      @booking = Booking.find(params[:booking_id])
    end

    respond_to do |format|
      format.html
      format.js
    end
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
