class ExecuteOnContestantInstanceJob < ApplicationJob
  def perform(request_result_id)
    begin
      request_result = InstanceCommandExecuteRequestResult.includes(:contestant_instance, :instance_command_execute_request).find(request_result_id)

      team_id = request_result.contestant_instance.team_id
      instance_ip = request_result.contestant_instance.public_ipv4_address
      command = request_result.instance_command_execute_request.command

      result = nil
      Net::SSH.start(instance_ip, 'isucon-admin', :keys => [private_key_path], :config => false) do |ssh|
        result = ssh.exec!(request.command)
      end

      Rails.logger.info "ExecuteOnContestantInstanceJob: team_id=#{team_id} instance_ip=#{instance_ip} command=#{command} result=#{result}"
      request_result.update!(
        output: result,
        exit_code: result.exitstatus,
        finished_at: Time.now,
      )
    rescue => e
      Rails.logger.error "ExecuteOnContestantInstanceJob: team_id=#{team_id} instance_ip=#{instance_ip} command=#{command} error=#{e.inspect}"
      request_result.update!(
        output: e.message,
        exit_code: -1,
        finished_at: Time.now,
      )
    end
  end

  private def private_key_path
    Rails.application.config.x.isucon_admin_ssh_private_key_path
  end
end
