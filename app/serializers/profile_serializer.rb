class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :profession, :location
  attribute :display_name, key: :displayName
end
