class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :profession, :location
  attribute :display_name, key: :displayName
  has_many :bookings, each_serializer: BookingSerializer
end
