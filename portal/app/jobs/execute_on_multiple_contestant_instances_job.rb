class ExecuteOnMultipleContestantInstancesJob < ApplicationJob
  def perform(team_ids, command)
    ContestantInstance.where(team_id: team_ids).order(team_id: :asc).each do |ci|
      Rails.logger.info "ExecuteOnMultipleContestantInstancesJob: team_id=#{ci.team_id} instance_ip=#{ci.public_ipv4_address}"
      ExecuteOnContestantInstanceJob.perform_now(ci.team_id, ci.public_ipv4_address, command)
    end
  end
end
