class CreateJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :jobs do |t|
      t.references :manager, null: false, foreign_key: true
      t.string :location
      t.string :profession
      t.string :expertise
      t.text :description
      t.string :rate
      t.datetime :expiration_date

      t.timestamps
    end
  end
end
