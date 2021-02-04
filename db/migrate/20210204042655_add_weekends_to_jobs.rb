class AddWeekendsToJobs < ActiveRecord::Migration[6.0]
  def change
    add_column :jobs, :weekends, :boolean, default: false
  end
end
