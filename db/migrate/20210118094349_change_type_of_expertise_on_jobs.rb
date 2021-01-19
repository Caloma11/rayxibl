class ChangeTypeOfExpertiseOnJobs < ActiveRecord::Migration[6.0]
  def change
    remove_column :jobs, :expertise
    add_column :jobs, :expertise, :integer
  end
end
