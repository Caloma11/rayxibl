class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.references :manager, null: false, foreign_key: true
      t.references :profile, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
