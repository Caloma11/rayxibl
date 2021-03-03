class ChangeTotalPriceToFloatOnBookings < ActiveRecord::Migration[6.0]
  def change
    change_column :bookings, :total_price, :decimal
  end
end
