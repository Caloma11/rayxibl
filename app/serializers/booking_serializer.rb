class BookingSerializer < ActiveModel::Serializer
  attributes :id, :title, :status
  %w[start end].each do |identifier|
    attribute :"parsed_#{identifier}_date", key: :"#{identifier}_date"
    attribute :"parsed_#{identifier}_time", key: :"#{identifier}_time"
  end
end
