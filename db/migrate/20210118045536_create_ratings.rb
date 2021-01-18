class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings do |t|
      t.references :profile, null: false, foreign_key: true
      t.references :manager, null: false, foreign_key: true
      t.integer :value

      t.timestamps
    end
  end
end
