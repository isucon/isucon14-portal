class SetDefaultToTeamsAvailabilityZone < ActiveRecord::Migration[6.1]
  def change
    change_column_default :teams, :availability_zone, 'apne1-az2'
  end
end
