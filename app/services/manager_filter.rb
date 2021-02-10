class ManagerFilter
  attr_reader :managers, :params, :current_user

  NAME_QUERY = "users.first_name ILIKE :name OR users.last_name ILIKE :name OR companies.name ILIKE :name"

  def initialize(managers, params, current_user)
    @managers = managers
    @params = params
    @current_user = current_user
  end

  def call
    if params[:name]
      @managers = @managers
                    .joins(:company, :user)
                    .where(NAME_QUERY, name: "%#{params[:name]}%")
    end

    if params[:job_title]
      @managers = @managers.where("job_title ILIKE :title", title: "%#{params[:job_title]}%")
    end

    @managers
  end
end
