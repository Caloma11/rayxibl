class Api::V1::NetworksController < ApplicationController
  def index
    @networks = policy_scope(current_user.manager.network.includes(:bookings, user: [avatar_attachment: :blob]))

    filter!

    render json: @networks, each_serializer: ProfileSerializer
  end

  private

  def filter!
    return unless params[:profile]

    profile_params = JSON.parse(params[:profile]).deep_symbolize_keys

    if profile_params
      if profile_params[:name]
        @networks = @networks.joins(:user).where("users.first_name ILIKE :name OR users.last_name ILIKE :name", name: "%#{profile_params[:name]}%")
      end

      if profile_params[:profession]
        @networks = @networks.where("profession ILIKE :profession", profession: "%#{profile_params[:profession]}%")
      end
    end
  end
end
