class BookingSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :title, :status, :start_time, :end_time
end
