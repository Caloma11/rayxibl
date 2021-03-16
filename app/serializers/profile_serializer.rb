class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :profession, :location
  attribute :display_name, key: :displayName
  attribute :bookings

  def bookings
    object.bookings.where(manager_id: @instance_options[:manager_id]).map do |booking|
      BookingSerializer.new(booking, scope: scope, root: false)
    end
  end
end
