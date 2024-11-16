require 'isuxportal/services/admin/last_validations_pb'

class Api::Admin::InstanceCommandExecuteRequestsController < Api::Admin::ApplicationController
  pb :index, Isuxportal::Proto::Services::Admin::ListInstanceCommandExecuteRequestsRequest
  def index
    render protobuf: Isuxportal::Proto::Services::Admin::ListInstanceCommandExecuteRequestsResponse.new(
      requests: InstanceCommandExecuteRequest.map do |request|
        request.to_pb
      end,
    )
  end

  pb :show, Isuxportal::Proto::Services::Admin::GetInstanceCommandExecuteRequestRequest
  def show
    render protobuf: Isuxportal::Proto::Services::Admin::GetInstanceCommandExecuteRequestResponse.new(
      results: InstanceCommandExecuteRequestResult.include(:contestant_instance).find(params[:request_id]).map do |result|
        result.to_pb
      end,
    )
  end
end
