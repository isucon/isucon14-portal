class RenameEnqueuedByColumnInBenchmarkJobs < ActiveRecord::Migration[6.1]
  def change
    rename_column :benchmark_jobs, :enqueued_by, :enqueued_by_id
  end
end
