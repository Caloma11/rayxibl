class ManagerFilter
  attr_reader :managers, :params, :current_user

  def initialize(managers, params, current_user)
    @managers = managers
    @params = params
    @current_user = current_user
  end

  def call
    if params[:name]
      @managers = @managers.joins(:company, :user).where("users.first_name ILIKE :name OR users.last_name ILIKE :name OR companies.name ILIKE :name", name: "%#{params[:name]}%")
    end

    @managers
  end
end
