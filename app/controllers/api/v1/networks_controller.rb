class Api::V1::NetworksController < ApplicationController
  def index
    @networks = policy_scope(current_user.manager.network.includes(:bookings, user: [avatar_attachment: :blob]))

    filter_via_profile!
    filter_via_booking!

    render json: @networks, each_serializer: ProfileSerializer
  end

  private

  def filter_via_booking!
    return unless params[:booking]

    booking_params = JSON.parse(params[:booking]).deep_symbolize_keys

    if booking_params
      if booking_params[:status]
        status = booking_params[:status] == "3" ? [0, 1, 2] : booking_params[:status].to_i
        @networks = @networks.joins(:bookings).where(bookings: { status: status })
      end

      if booking_params[:id].length.positive?
        @networks = @networks.joins(:bookings).where(bookings: {id: booking_params[:id].map(&:to_i) })
      end
    end
  end

  def filter_via_profile!
    return unless params[:profile]

    profile_params = JSON.parse(params[:profile]).deep_symbolize_keys

    if profile_params
      if profile_params[:name] != ""
        @networks = @networks.joins(:user).where("users.first_name ILIKE :name OR users.last_name ILIKE :name", name: "%#{profile_params[:name]}%")
      end

      if profile_params[:profession] != ""
        @networks = @networks.where("profession ILIKE :profession", profession: "%#{profile_params[:profession]}%")
      end

      if profile_params[:skills] != ""
        skill_list = profile_params[:skills].split(",").map(&:strip)
        @networks = @networks.tagged_with(skill_list, any: true)
      end

      if profile_params[:location] != ""
        @networks = @networks.where("location ILIKE :location", location: "%#{profile_params[:location]}%")
      end

      if profile_params[:expertise] != ""
        @networks = @networks.where(expertise: profile_params[:expertise].to_i)
      end
    end
  end
end
