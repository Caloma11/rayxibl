class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :profession, :location
  attribute :name, key: :displayName
  attribute :bookings

  def bookings
    object.bookings.where(manager_id: @instance_options[:manager_id]).map do |booking|
      BookingSerializer.new(booking, scope: scope, root: false)
    end
  end

  def name
    object.display_name.length >= 19 ? "#{object.user.shortened_display_name}." : object.display_name
  end
end
