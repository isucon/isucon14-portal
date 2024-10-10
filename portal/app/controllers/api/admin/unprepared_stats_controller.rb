require 'isuxportal/services/admin/unprepared_stats_pb'

class Api::Admin::UnpreparedStatsController < Api::Admin::ApplicationController
  pb :ssh_key, Isuxportal::Proto::Services::Admin::GetSSHKeyStatsQuery
  def ssh_key
    items = []
    Team.active.includes(members: :ssh_public_keys).find_in_batches do |batch|
      batch.each do |team|
        members_wo_ssh_keys = team.members.select{ |c| c.ssh_public_keys.empty? }.map(&:id)
        unless members_wo_ssh_keys.empty?
          items << Isuxportal::Proto::Services::Admin::GetSSHKeyStatsResponse::SSHKeyUnregisteredTeam.new(
            team: team.to_pb(members: true, member_detail: true),
            unregistered_member_ids: members_wo_ssh_keys,
          )
        end
      end
    end

    render protobuf: Isuxportal::Proto::Services::Admin::GetSSHKeyStatsResponse.new(
      items: items,
    )
  end

  pb :discord, Isuxportal::Proto::Services::Admin::GetDiscordStatsQuery
  def discord
    items = []
    Team.active.includes(:members).find_in_batches do |batch|
      batch.each do |team|
        members_not_guild_member = team.members.select{ |c| !c.is_discord_guild_member }.map(&:id)
        unless members_not_guild_member.empty?
          items << Isuxportal::Proto::Services::Admin::GetDiscordStatsResponse::DiscordNotJoinedTeam.new(
            team: team.to_pb(members: true, member_detail: true),
            not_joined_member_ids: members_not_guild_member,
          )
        end
      end
    end

    render protobuf: Isuxportal::Proto::Services::Admin::GetDiscordStatsResponse.new(
      items: items,
    )
  end

  pb :env_check, Isuxportal::Proto::Services::Admin::GetEnvCheckStatsQuery
  def env_check
    items = []
    Team.active.find_in_batches do |batch|
      batch.each do |team|
        unless EnvCheck.of_team(team).test_ssh_passed.exists?
          items << team.to_pb
        end
      end
    end

    render protobuf: Isuxportal::Proto::Services::Admin::GetEnvCheckStatsResponse.new(
      items: items,
    )
  end
end
