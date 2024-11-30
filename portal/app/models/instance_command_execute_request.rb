require 'isuxportal/resources/instance_command_execute_request_pb'

class InstanceCommandExecuteRequest < ApplicationRecord
  validates :command, presence: true

  has_many :instance_command_execute_request_results, dependent: :destroy

  scope :finished, -> { where.not(finished_at: nil) }

  def to_pb
    Isuxportal::Proto::Resources::InstanceCommandExecuteRequest.new(
      id: id,
      command: command,
      created_at: created_at.to_time,
      total_target_count: instance_command_execute_request_results.count,
      total_finished_count: instance_command_execute_request_results.finished.count,
    )
  end
end
