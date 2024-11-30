class AddPostValidationToBenchmarkJobs < ActiveRecord::Migration[6.1]
  def change
    add_column :benchmark_jobs, :post_validation, :boolean, default: false
  end
end
