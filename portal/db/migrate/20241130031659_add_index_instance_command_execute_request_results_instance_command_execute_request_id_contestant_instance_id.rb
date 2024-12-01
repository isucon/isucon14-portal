class AddIndexInstanceCommandExecuteRequestResultsInstanceCommandExecuteRequestIdContestantInstanceId < ActiveRecord::Migration[6.1]
  def change
    add_index :instance_command_execute_request_results, [:instance_command_execute_request_id, :contestant_instance_id], unique: true, name: "index_command_execute_results_on_request_id_and_ci_id"
  end
end
