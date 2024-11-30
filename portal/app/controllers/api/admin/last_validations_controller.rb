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

  pb :trigger_instance_restart, Isuxportal::Proto::Services::Admin::TriggerInstanceRestartRequest
  def trigger_instance_restart
    team_ids = Team.active.pluck(:id)

    # TODO: リブートが終わらなかったらどうする？
    ExecuteOnMultipleContestantInstancesJob.perform_later(
      team_ids,
      "sudo reboot",
    )

    render protobuf: Isuxportal::Proto::Services::Admin::TriggerInstanceRestartResponse.new()
  end
end
