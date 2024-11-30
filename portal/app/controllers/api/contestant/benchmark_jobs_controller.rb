require 'isuxportal/services/contestant/benchmark_pb'

class Api::Contestant::BenchmarkJobsController < Api::Contestant::ApplicationController
  pb :index, Isuxportal::Proto::Services::Contestant::ListBenchmarkJobsQuery
  def index
    @benchmark_jobs = BenchmarkJob.normal.where(team: current_team).order(id: :desc).joins_score

    status = params[:status]
    if status.present?
      status_uppper_symbol = Isuxportal::Proto::Resources::BenchmarkJob::Status.lookup(status.to_i)
      raise Api::ApplicationController::Error::BadRequest.new("Invalid status") if status_uppper_symbol.nil?

      @benchmark_jobs = @benchmark_jobs.where(status: status_uppper_symbol.to_s.downcase.to_sym)
    end

    @benchmark_jobs = @benchmark_jobs.limit(params[:limit].to_i) if params[:limit].present? && params[:limit].to_i != 0

    render protobuf: Isuxportal::Proto::Services::Contestant::ListBenchmarkJobsResponse.new(
      jobs: @benchmark_jobs.map do |job|
        job.to_pb(admin: false, team: false)
      end,
    )
  end

  pb :show, Isuxportal::Proto::Services::Contestant::GetBenchmarkJobQuery
  def show
    @benchmark_job = BenchmarkJob.normal.where(team: current_team).find(params[:id])

    render protobuf: Isuxportal::Proto::Services::Contestant::GetBenchmarkJobResponse.new(
      job: @benchmark_job.to_pb(admin: false, detail: true)
    )
  end

  pb :create, Isuxportal::Proto::Services::Contestant::EnqueueBenchmarkJobRequest
  def create
    @benchmark_job = BenchmarkJob.create!(
      team: current_team,
      instance_name: current_team.availability_zone,
      target: ContestantInstance.find_by!(team: current_team, id: pb.target_id),
      enqueued_by: current_contestant,
    )
    render protobuf: Isuxportal::Proto::Services::Contestant::EnqueueBenchmarkJobResponse.new(
      job: @benchmark_job.to_pb(admin: false, detail: true)
    )
  end
end
