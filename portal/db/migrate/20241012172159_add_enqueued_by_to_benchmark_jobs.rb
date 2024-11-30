class AddEnqueuedByToBenchmarkJobs < ActiveRecord::Migration[6.1]
  def change
    add_column :benchmark_jobs, :enqueued_by, :integer
  end
end
