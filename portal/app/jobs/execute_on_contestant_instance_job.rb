class ExecuteOnContestantInstanceJob < ApplicationJob
  def perform(team_id, instance_ip, command)
    # TODO: use :key_data if it's more easier to use
    Net::SSH.start(instance_ip, 'isucon-admin', :key => [private_key_path], :config => false) do |ssh|
      result = ssh.exec!(command)
      Rails.logger.info "ExecuteOnContestantInstanceJob: team_id=#{team_id} instance_ip=#{instance_ip} command=#{command} result=#{result}"
    end
  end

  private def private_key_path
    Rails.application.config.x.isucon_admin_ssh_private_key_path
  end
end
