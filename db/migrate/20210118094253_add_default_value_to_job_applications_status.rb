class AddDefaultValueToJobApplicationsStatus < ActiveRecord::Migration[6.0]
  def change
    change_column :job_applications, :status, :integer, default: 0
  end
end
