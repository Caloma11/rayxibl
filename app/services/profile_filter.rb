class ProfileFilter
  attr_reader :params, :profile, :current_user, :profile_params

  def initialize(profile, params, current_user, session_filters)
    @profile = profile
    @params = params
    @current_user = current_user
    @profile_params = params[:profile] || session_filters&.deep_transform_keys(&:to_sym)
    @using_session = !params[:profile] && session_filters
  end

  def call
    if params[:all] && !@using_session
      @profiles = profile
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .where.not(id: current_user.manager.network.pluck(:id))
    elsif params[:job_id]
      @profiles = profile
      .joins(job_applications: :job)
      .includes(:ratings, user: [:manager, avatar_attachment: :blob ])
      .where(job_applications: { job_id: params[:job_id] })
    elsif profile_params
      if params[:all]
        @profiles = profile
                      .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                      .where.not(id: current_user.manager.network.pluck(:id))
      else
        @profiles = profile.includes(:ratings, user: [:manager, avatar_attachment: :blob])
      end

      filter_via_button
    elsif params[:ids]
      ids = params[:ids].map(&:to_i)
      @profiles = profile.where(id: ids)
    else
      @profiles = current_user.manager.network.includes(:ratings, user: [:manager, avatar_attachment: :blob])
    end
  end

  private

  def filter_via_button
    if profile_params[:name] != ""
      @profiles = @profiles
                    .joins(:user)
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .where("users.first_name ILIKE :name OR users.last_name ILIKE :name", name: "%#{profile_params[:name]}%")
    end

    if profile_params[:profession] != [""]
      profession = profile_params[:profession].reject(&:blank?)
      @profiles = @profiles
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .where("profession ILIKE ANY (array[:profession])", profession: profession)
    end

    if profile_params[:skills] != [""] && profile_params[:skills] != ""
      skills = profile_params[:skills].reject(&:blank?)
      @profiles = @profiles
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .tagged_with(skills, any: true)
    end

    if profile_params[:location] != ""
      @profiles = @profiles
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .where("location ILIKE :location", location: "%#{profile_params[:location]}%")
    end

    if profile_params[:expertise] != [""] && profile_params[:expertise] != ""
      expertises = profile_params[:expertise].reject(&:blank?)
      @profiles = @profiles
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .where(expertise: expertises)
    end

    filter_via_job_application

    if profile_params[:clear] == "true"
      @profiles = profile.includes(:ratings, user: [:manager, avatar_attachment: :blob])
    end

    @profiles
  end

  def filter_via_job_application
    job_ids = profile_params[:job_id].split(",")

    if job_ids.length.positive?
      @profiles = @profiles.joins(job_applications: :job).where(job_applications: { jobs: { id: job_ids } })
    end
  end

end
