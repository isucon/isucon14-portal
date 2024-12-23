class Api::EnvChecksController < Api::ApplicationController
  skip_before_action :require_staff_when_always_required
  skip_before_action :verify_authenticity_token
  before_action :require_valid_checker_token

  TEST_AMI_IDS = Rails.application.config.x.test_ami_id.nil? ? [] : [Rails.application.config.x.test_ami_id]
  CONTEST_AMI_IDS = [Rails.application.config.x.qualify_ami_id]

  def create
    team_id = @payload[:team_id]
    name = params[:name]
    public_ip_address = params[:ip_address]
    passed = params[:passed]
    previous_check = EnvCheck.where(team_id: team_id, name: name).last
    @env_check = EnvCheck.new(
      team_id: team_id,
      name: name,
      ip_address: public_ip_address,
      passed: passed,
      message: params[:message],
      admin_message: params[:admin_message],
      raw_data: params[:raw_data],
    )
    @env_check.save!

    if name.start_with?("contest")
      if name != "contest-unknown"
        nameNum = name.delete_prefix("contest").to_i
        instance = ContestantInstance.find_or_initialize_by(
          team_id: team_id,
          number: nameNum,
        )

        if !instance.public_ipv4_address.nil? && instance.public_ipv4_address != public_ip_address
          SlackWebhookJob.perform_later(text: ":face_with_monocle: *Updated server IP:* <https://#{Rails.application.config.x.public_url_host}/admin/teams/#{team_id}|team_id=#{team_id}> name=#{name}")
        end

        unless Contest.contest_end?
          instance.update!(
            cloud_id: "contest-#{team_id}-#{nameNum}", # dummy
            status: Isuxportal::Proto::Resources::ContestantInstance::Status::RUNNING,
            private_ipv4_address: "192.168.0.1#{nameNum}",
            public_ipv4_address: public_ip_address,
          )
        end
      end

      if !passed && (previous_check.nil? || previous_check.passed || (previous_check.created_at+5.minute) < Time.now)
        SlackWebhookJob.perform_later(text: ":shocked_face_with_exploding_head: *Checker failed:* <https://#{Rails.application.config.x.public_url_host}/admin/teams/#{team_id}|team_id=#{team_id}> name=#{name}")
      end
    end
  end

  def info
    team = Team.find(@payload[:team_id])

    ami_ids = case params[:name]
      when "test-boot", "test-ssh"
        TEST_AMI_IDS
      when "contest"
        CONTEST_AMI_IDS
      else
        return render status: :bad_request, body: "unknown name param"
      end

    az_id = team.availability_zone

    render json: {
      ami_id: ami_ids.first || "",
      ami_ids: ami_ids,
      az_id: az_id,
    }
  end

  def ssh_public_keys
    team_id = @payload[:team_id]

    result = []
    SshPublicKey.order(contestant_id: :asc, id: :asc).includes(:contestant).where(contestant: Contestant.where(team_id: team_id)).each do |key|
      result << "#{key.public_key} #{key.contestant.id}@#{key.contestant.github_login}"
    end
    render plain: "#{result.join(?\n)}\n"
  end

  private def require_valid_checker_token
    token = params[:token]
    team_id = params[:team_id]
    if !token.blank?
      @payload = CheckerToken.verify(token)
      return render status: :unauthorized, body: "invalid token" unless @payload
    elsif !team_id.blank?
      # tokenがない場合は以前のsignature認証
      expected_signature = OpenSSL::HMAC.hexdigest('sha384', Rails.application.config.x.ssh_key_api.secret, team_id.to_s)
      unless Rack::Utils.secure_compare(expected_signature, params[:signature])
        return render status: :bad_request, body: "invalid signature"
      end
      @payload = {team_id: team_id.to_i}
    else
      return render status: :bad_request, body: "request not have token or signature" unless token
    end
  end
end
