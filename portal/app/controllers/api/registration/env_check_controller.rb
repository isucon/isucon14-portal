require 'isuxportal/resources/env_check_pb'
require 'isuxportal/services/registration/env_check_pb'

class Api::Registration::EnvCheckController < Api::Registration::ApplicationController
  def show
    raise ActiveRecord::RecordNotFound unless current_contestant

    template = CloudFormation.test_template(current_team)
    status = EnvCheck.status(current_team)
    instance_ip = EnvCheck.of_team(current_team).test_boot.last&.ip_address

    render protobuf: Isuxportal::Proto::Services::Registration::GetEnvCheckInformationResponse.new(
      template: template,
      status: status,
      instance_ip: instance_ip,
    )
  end
end
