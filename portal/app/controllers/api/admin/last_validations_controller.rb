require 'isuxportal/services/admin/last_validations_pb'

class Api::Admin::LastValidationsController < Api::Admin::ApplicationController
  pb :trigger_env_check, Isuxportal::Proto::Services::Admin::TriggerEnvCheckRequest
  def trigger_env_check
    team_ids = pb.team_ids.empty? ? Team.active.pluck(:id) : pb.team_ids.to_a

    ExecuteOnMultipleContestantInstancesJob.perform_later(
      team_ids,
      "sudo systemctl start envcheck",
    )

    render protobuf: Isuxportal::Proto::Services::Admin::TriggerEnvCheckResponse.new()
  end

  pb :trigger_instance_restart, Isuxportal::Proto::Services::Admin::TriggerInstanceRestartRequest
  def trigger_instance_restart
    team_ids = pb.team_ids.empty? ? Team.active.pluck(:id) : pb.team_ids.to_a

    # TODO: リブートが終わらなかったらどうする？
    ExecuteOnMultipleContestantInstancesJob.perform_later(
      team_ids,
      "sudo reboot",
    )

    render protobuf: Isuxportal::Proto::Services::Admin::TriggerInstanceRestartResponse.new()
  end

  pb :trigger_benchmarks, Isuxportal::Proto::Services::Admin::TriggerBenchmarksRequest
  def trigger_benchmarks
    team_ids = pb.team_ids.empty? ? Team.active.pluck(:id) : pb.team_ids.to_a

    team_ids.each do |team_id|
      last_benchmark_job = BenchmarkJob.where(team_id: team_id).order(id: :desc).limit(1).first;
      next unless last_benchmark_job;
      next if last_benchmark_job.benchmark_result.passed;

      BenchmarkJob.create!(team_id: team_id, target_id: last_benchmark_job.target_id, instance_name: last_benchmark_job.instance_name)
    end

    render protobuf: Isuxportal::Proto::Services::Admin::TriggerBenchmarksResponse.new()
  end
end
