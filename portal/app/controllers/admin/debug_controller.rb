class Admin::DebugController < Admin::ApplicationController
  skip_before_action :require_staff, only: %i(long_running_check)

  def slack
    SlackWebhookJob.perform_later(text: "test test test")
    render plain: 'slacktown'
  end

  def sync_all_ssh_key
    SyncSshKeysOfAllContestantsJob.perform_later(github_login.fetch('token'))
    render plain: 'enqueued'
  end

  def sync_all_discord_stats
    SyncDiscordMemberStateOfAllContestantJob.perform_later()
    render plain: 'enqueued'
  end

  def long_running_check
    LongRunningCheckJob.perform_later
    render plain: 'enqueud'
  end
end
