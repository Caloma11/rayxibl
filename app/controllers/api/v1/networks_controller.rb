class Api::V1::NetworksController < ApplicationController
  def index
    binding.pry
    @networks = policy_scope(current_user.manager.network)
    render json: @networks
  end
end
