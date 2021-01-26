class RemoveExperienceLevelFromJobs < ActiveRecord::Migration[6.0]
  def change
    remove_column :jobs, :experience_level, :integer
  end
end
