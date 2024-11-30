require 'isuxportal/resources/instance_command_execute_request_pb'

class InstanceCommandExecuteRequestResult < ApplicationRecord
  belongs_to :instance_command_execute_request
  belongs_to :contestant_instance

  scope :finished, -> { where.not(finished_at: nil) }

  def to_pb
    Isuxportal::Proto::Resources::InstanceCommandExecuteRequestResult.new(
      id: id,
      target: contestant_instance.to_pb,
      exit_code: exit_code,
      finished_at: finished_at.to_time,
    )
  end
end
