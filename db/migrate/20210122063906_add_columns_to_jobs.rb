class AddColumnsToJobs < ActiveRecord::Migration[6.0]
  def change
    add_column :jobs, :title, :string
    add_column :jobs, :experience_level, :integer
    add_column :jobs, :start_date, :datetime
    add_column :jobs, :end_date, :datetime
    add_column :jobs, :duration, :integer
    add_column :jobs, :start_time, :time
    add_column :jobs, :end_time, :time
    add_column :jobs, :price_type, :integer
  end
end
