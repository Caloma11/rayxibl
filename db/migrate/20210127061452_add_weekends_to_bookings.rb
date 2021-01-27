class AddWeekendsToBookings < ActiveRecord::Migration[6.0]
  def change
    add_column :bookings, :weekends, :boolean, default: false
  end
end
