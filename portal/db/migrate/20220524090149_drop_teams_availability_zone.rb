class DropTeamsAvailabilityZone < ActiveRecord::Migration[6.1]
  def change
    remove_column :teams, :availability_zone
  end
end
