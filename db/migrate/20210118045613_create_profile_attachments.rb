class CreateProfileAttachments < ActiveRecord::Migration[6.0]
  def change
    create_table :profile_attachments do |t|
      t.references :profile, null: false, foreign_key: true
      t.string :title
      t.string :url

      t.timestamps
    end
  end
end
