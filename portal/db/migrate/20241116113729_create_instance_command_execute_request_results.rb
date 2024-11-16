class CreateInstanceCommandExecuteRequestResults < ActiveRecord::Migration[6.1]
  def change
    create_table :instance_command_execute_request_results, primary_key: [:instance_command_execute_request_id, :contestant_instance_id] do |t|
      t.integer :instance_command_execute_request_id, null: false
      t.integer :contestant_instance_id, null: false
      t.text :output
      t.integer :exit_code
      t.datetime :finished_at, precision: 6
      t.timestamps
    end
  end
end
