class ExecuteOnMultipleContestantInstancesJob < ApplicationJob
  def perform(team_ids, command)
    request = InstanceCommandExecuteRequest.create!(command: command)

    contestant_instances = ContestantInstance.where(team_id: team_ids).order(team_id: :asc)
    InstanceCommandExecuteRequestResult.insert_all!(
      contestant_instances.map do |ci|
        {
          instance_command_execute_request_id: request.id,
          contestant_instance_id: ci.id,
        }
      end
    )
    InstanceCommandExecuteRequestResult.includes(:contestant_instance).where(instance_command_execute_request_id: request.id).each do |result|
      Rails.logger.info "ExecuteOnMultipleContestantInstancesJob: team_id=#{result.contestant_instance.team_id} instance_ip=#{result.contestant_instance.public_ipv4_address} command=#{command}"
      ExecuteOnContestantInstanceJob.perform_now(result.id)
    end
  end
end
