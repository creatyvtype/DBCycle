class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_hash
      t.time :best_time
      t.string :img
      t.string :handle
    end
  end
end
