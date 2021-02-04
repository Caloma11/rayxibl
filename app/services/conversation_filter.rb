class ConversationFilter
  attr_reader :conversations, :params, :current_user

  def initialize(conversations, params, current_user)
    @conversations = conversations
    @params = params
    @current_user = current_user
  end

  def call
    if params[:name] != ""
      @conversations = @conversations.where("users.first_name ILIKE :name OR users.last_name ILIKE :name", name: "%#{params[:name]}%")
    end

    if params[:profession] != ""
      @conversations = @conversations.where("profiles.profession ILIKE :profession", profession: "%#{params[:profession]}%")
    end

    if params[:skills] != [""]
      skills = params[:skills].reject(&:blank?)
      @conversations = @conversations.includes(profile: { user: [avatar_attachment: :blob] }).joins(profile: :skills).where("tags.name IN (:skills)", skills: skills.join(","))
    end

    if params[:location] != ""
      @conversations = @conversations.where("profiles.location ILIKE :location", location: "%#{params[:location]}%")
    end

    if params[:expertise] != [""]
      expertises = params[:expertise].reject(&:blank?)
      @conversations = @conversations.where("profiles.expertise IN (?)", expertises.join(","))
    end

    @conversations
  end
end
