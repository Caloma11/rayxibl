class CreateJobApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :job_applications do |t|
      t.references :job, null: false, foreign_key: true
      t.references :profile, null: false, foreign_key: true
      t.integer :status #enum

      t.timestamps
    end
  end
end
