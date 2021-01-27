class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :avatar, :profession
  attribute :display_name, key: :displayName
end
