require 'isuxportal/services/admin/last_validations_pb'

class Api::Admin::InstanceCommandExecuteRequestsController < Api::Admin::ApplicationController
  pb :index, Isuxportal::Proto::Services::Admin::ListInstanceCommandExecuteRequestsRequest
  def index
    render protobuf: Isuxportal::Proto::Services::Admin::ListInstanceCommandExecuteRequestsResponse.new(
      requests: InstanceCommandExecuteRequest.all.order(id: :desc).map do |request|
        request.to_pb
      end,
    )
  end

  pb :show, Isuxportal::Proto::Services::Admin::GetInstanceCommandExecuteRequestRequest
  def show
    render protobuf: Isuxportal::Proto::Services::Admin::GetInstanceCommandExecuteRequestResponse.new(
      results: InstanceCommandExecuteRequestResult.includes(:contestant_instance).where(instance_command_execute_request_id: params[:id]).map do |result|
        result.to_pb
      end,
    )
  end

  pb :output, Isuxportal::Proto::Services::Admin::GetInstanceCommandExecuteRequestOutputRequest
  def output
    render protobuf: Isuxportal::Proto::Services::Admin::GetInstanceCommandExecuteRequestOutputResponse.new(
      output: InstanceCommandExecuteRequestResult.find(params[:id])&.output,
    )
  end
end
