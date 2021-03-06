class BookingSerializer < ActiveModel::Serializer
  attributes :id, :title, :status, :profile_id, :status, :duration, :weekends
  %w[start end].each do |identifier|
    attribute :"parsed_#{identifier}_date", key: :"#{identifier}Date"
    attribute :"parsed_#{identifier}_time", key: :"#{identifier}Time"
  end

  attribute :duration_in_hours, key: :durationInHours
end
