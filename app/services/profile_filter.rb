class ProfileFilter
  attr_reader :params, :profile, :current_user, :profile_params

  def initialize(profile, params, current_user)
    @profile = profile
    @params = params
    @current_user = current_user
    @profile_params = params[:profile]
  end

  def call
    if params[:network]
      @profiles = current_user.manager.network.includes(:ratings, user: [:manager, avatar_attachment: :blob])
    elsif params[:job_id]
      @profiles = profile
                    .joins(job_applications: :job)
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob ])
                    .where(job_applications: { job_id: params[:job_id] })
    elsif profile_params
      @profiles = profile.includes(:ratings, user: [:manager, avatar_attachment: :blob])

      filter_via_button
    else
      @profiles = profile.includes(:connections, :ratings, user: [:manager, avatar_attachment: :blob]).where(connections: { profile_id: nil })
    end
  end

  private

  def filter_via_button
    if profile_params[:name] != ""
      @profiles = profile
                    .joins(:user)
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .where("users.first_name ILIKE :name OR users.last_name ILIKE :name", name: "%#{profile_params[:name]}%")
    end

    if profile_params[:profession] != ""
      @profiles = profile
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .where("profession ILIKE :profession", profession: "%#{profile_params[:profession]}%")
    end

    if profile_params[:skills] != [""]
      skills = profile_params[:skills].reject(&:blank?)
      @profiles = profile
              .includes(:ratings, user: [:manager, avatar_attachment: :blob])
              .tagged_with(skills, any: true)
    end

    if profile_params[:location] != ""
      @profiles = profile
                    .includes(:ratings, user: [:manager, avatar_attachment: :blob])
                    .where("location ILIKE :location", location: "%#{profile_params[:location]}%")
    end

    if profile_params[:expertise] != [""]
      expertises = profile_params[:expertise].reject(&:blank?)
      @profiles = profile
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
      @profiles = profile.joins(job_applications: :job).where(job_applications: { jobs: { id: job_ids } })
    end
  end
end
