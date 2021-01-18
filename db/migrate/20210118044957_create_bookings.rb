class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.references :manager, null: false, foreign_key: true
      t.references :profile, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.time :start_time
      t.time :end_time
      t.integer :duration
      t.datetime :start_date
      t.datetime :end_date
      t.boolean :billable
      t.integer :price
      t.integer :total_price
      t.integer :price_type #enum

      t.timestamps
    end
  end
end
