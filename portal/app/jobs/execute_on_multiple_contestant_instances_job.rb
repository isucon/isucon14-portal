class ExecuteOnMultipleContestantInstancesJob < ApplicationJob
  def perform(team_ids, command)
    request = InstanceCommandExecuteRequest.create!(command: command)

    now = Time.current
    contestant_instances = ContestantInstance.where(team_id: team_ids).order(team_id: :asc)
    InstanceCommandExecuteRequestResult.insert_all!(
      contestant_instances.map do |ci|
        {
          instance_command_execute_request_id: request.id,
          contestant_instance_id: ci.id,
          created_at: now,
          updated_at: now,
        }
      end
    )
    InstanceCommandExecuteRequestResult.includes(:contestant_instance).where(instance_command_execute_request_id: request.id).each do |result|
      Rails.logger.info "ExecuteOnMultipleContestantInstancesJob: team_id=#{result.contestant_instance.team_id} instance_ip=#{result.contestant_instance.public_ipv4_address} command=#{command}"
      ExecuteOnContestantInstanceJob.perform_later(result.id)
    end
  end
end
