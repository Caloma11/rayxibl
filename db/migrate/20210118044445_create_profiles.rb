class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :profession
      t.string :location
      t.string :overview

      t.timestamps
    end
  end
end
