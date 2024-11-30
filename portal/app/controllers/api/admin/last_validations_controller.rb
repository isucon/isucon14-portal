require 'isuxportal/services/admin/last_validations_pb'

class Api::Admin::LastValidationsController < Api::Admin::ApplicationController
  pb :trigger_env_check, Isuxportal::Proto::Services::Admin::TriggerEnvCheckRequest
  def trigger_env_check
    team_ids = Team.active.pluck(:id)

    ExecuteOnMultipleContestantInstancesJob.perform_later(
      team_ids,
      "sudo systemctl start isucon-env-checker",
    )

    render protobuf: Isuxportal::Proto::Services::Admin::TriggerEnvCheckResponse.new()
  end
end
