require 'isuxportal/resources/env_check_pb'

class EnvCheck < ApplicationRecord
  belongs_to :team

  validates :name, presence: true
  validates :team_id, presence: true
  validates :passed, inclusion: [true, false]
  validates :message, presence: true
  validates :raw_data, presence: true

  scope :of_team, ->(team) { where(team: team) }

  scope :test_boot, -> { where(name: 'test-boot') }
  scope :test_ssh_passed, -> { where(name: 'test-ssh', passed: true) }

  def self.status(team_id)
    if Rails.application.config.x.test_ami_id.nil?
      Isuxportal::Proto::Resources::EnvCheckStatus::PREPARING
    elsif self.of_team(team_id).test_ssh_passed.exists?
      Isuxportal::Proto::Resources::EnvCheckStatus::DONE
    elsif self.of_team(team_id).test_boot.last&.ip_address.present?
      Isuxportal::Proto::Resources::EnvCheckStatus::CREATED_INSTANCE
    else
      Isuxportal::Proto::Resources::EnvCheckStatus::NOT_STARTED
    end
  end

  def to_pb()
    Isuxportal::Proto::Resources::EnvCheck.new(
      id: id,
      team_id: team_id,
      name: name,
      ip_address: ip_address,
      passed: passed,
      message: message,
      admin_message: admin_message,
      raw_data: raw_data,
      created_at: created_at.to_time,
      updated_at: updated_at.to_time,
    )
  end
end
