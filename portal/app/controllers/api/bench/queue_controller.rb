require 'isuxportal/services/bench/receiving_pb'
require 'isuxportal/services/bench/receiving_services_pb'
class Api::Bench::QueueController < Api::Bench::ApplicationController
  before_action :validate_token

  pb :receive, Isuxportal::Proto::Services::Bench::ReceiveBenchmarkJobRequest
  def receive
    loop do
      # TODO: dedicated benchmarkers and shared benchmarkers
      scope = BenchmarkJob.where(status: :pending).order(id: :asc)
      scope = scope.where(team_id: pb.team_id) if pb.team_id > 0
      scope = scope.where(instance_name: pb.instance_name) if pb.instance_name.present?

      ApplicationRecord.transaction do
        job = scope.first
        if job
          job.lock!
          next unless job.pending?
          job.start!(pb.instance_name)

          instances = ContestantInstance.where(team_id: job.team_id).order(number: :asc).index_by(&:number)
          all_addresses = (1..3).map{|number| instances[number]&.public_ipv4_address || ''}

          return render protobuf: Isuxportal::Proto::Services::Bench::ReceiveBenchmarkJobResponse.new(
            job_handle: Isuxportal::Proto::Services::Bench::ReceiveBenchmarkJobResponse::JobHandle.new(
              job_id: job.id,
              handle: job.handle,
              target_ipv4_address: job.target.public_ipv4_address, # TODO: Switch between public and private
              description_human: "", # TODO:
              all_ipv4_addresses: all_addresses,
              extra_command_args: job.post_validation ? ['--only-post-validation'] : [],
            ),
          )
        else
          return render protobuf: Isuxportal::Proto::Services::Bench::ReceiveBenchmarkJobResponse.new(
            job_handle: nil,
          )
        end
      end
    end
  end

  pb :cancel_owned, Isuxportal::Proto::Services::Bench::CancelOwnedBenchmarkJobRequest
  def cancel_owned
    ApplicationRecord.transaction do
      BenchmarkJob.where(status: :running, instance_name: pb.instance_name).each do |job|
        job.error!
      end
    end

    render protobuf: Isuxportal::Proto::Services::Bench::CancelOwnedBenchmarkJobResponse.new()
  end

  private def validate_token
    unless Rack::Utils.secure_compare(pb.token, Rails.application.config.x.bench_auth.token)
      raise Api::ApplicationController::Error::Unauthorized
    end
  end
end
