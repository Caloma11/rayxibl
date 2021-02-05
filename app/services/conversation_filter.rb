class ConversationFilter
  attr_reader :conversations, :params, :current_user

  def initialize(conversations, params, current_user)
    @conversations = conversations
    @params = params
    @current_user = current_user
  end

  def call
    if params[:clear] == "true"
      filter_with_clear!

      return @conversations
    end

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

    filter_via_job_applications!

    @conversations
  end

  private

  def filter_with_clear!
    if current_user.manager?
      @conversations = current_user.manager.conversations.includes(:messages, profile: [user: { avatar_attachment: :blob }]).by_latest_message
    else
      @conversations = current_user.profile.conversations.includes(:messages, profile: [user: { avatar_attachment: :blob }]).by_latest_message
    end
  end

  def filter_via_job_applications!
    job_ids = params[:job_id].split(",")

    if job_ids.length.positive?
      @conversations = @conversations.joins(profile: [job_applications: :job]).where("jobs.id IN (?)", job_ids)
    end
  end
end
