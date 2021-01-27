class Api::V1::NetworksController < ApplicationController
  def index
    @networks = policy_scope(current_user.manager.network.includes(:bookings, user: [avatar_attachment: :blob]))
    render json: @networks, each_serializer: ProfileSerializer
  end
end
