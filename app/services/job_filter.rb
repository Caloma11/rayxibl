class JobFilter
  attr_reader :params, :current_user

  def initialize(jobs, params, current_user)
    @jobs = jobs
    @params = params
    @current_user = current_user
  end

  def call
    if params[:title] != ""
      @jobs = @jobs.where("profession ILIKE :title", title: "%#{params[:title]}%")
    end

    if params[:location] != ""
      @jobs = @jobs.where("location ILIKE :location", location: "%#{params[:location]}%")
    end

    if params[:expertise] != [""]
      expertises = params[:expertise].reject(&:blank?)

      @jobs = @jobs.where(expertise: expertises)
    end

    if params[:clear] == "true"
      if current_user.manager?
        @jobs = @jobs.includes(manager: { user: { avatar_attachment: :blob } }).active
      else
        @jobs = @jobs.includes(:manager).active
      end
    end

    @jobs
  end
end
