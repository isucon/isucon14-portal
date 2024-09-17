class AddIsInPersonToContestants < ActiveRecord::Migration[6.1]
  def change
    add_column :contestants, :in_person,:boolean
  end
end
