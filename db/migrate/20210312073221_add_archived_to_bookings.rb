class AddArchivedToBookings < ActiveRecord::Migration[6.0]
  def change
    add_column :bookings, :archived, :boolean, default: false
  end

  def up
    Booking.canceled.each do |b|
      b.archived = true;
      b.save!
    end
  end
end
