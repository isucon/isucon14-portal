class CreateInstanceCommandExecuteRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :instance_command_execute_requests do |t|
      t.text :command
      t.timestamps
    end
  end
end
