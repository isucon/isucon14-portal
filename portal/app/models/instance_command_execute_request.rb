class InstanceCommandExecuteRequest < ApplicationRecord
  validates :command, presence: true

  has_many :instance_command_execute_request_results, dependent: :destroy
end
