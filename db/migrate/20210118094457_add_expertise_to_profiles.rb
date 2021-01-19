class AddExpertiseToProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :profiles, :expertise, :integer
  end
end
