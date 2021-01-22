class RemoveTitleFromJobs < ActiveRecord::Migration[6.0]
  def change
    remove_column :jobs, :title, :string
  end
end
