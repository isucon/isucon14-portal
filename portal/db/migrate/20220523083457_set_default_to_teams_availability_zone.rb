class SetDefaultToTeamsAvailabilityZone < ActiveRecord::Migration[6.1]
  def change
    change_column_default :teams, :availability_zone, 'ap-northeast-1'
  end
end
