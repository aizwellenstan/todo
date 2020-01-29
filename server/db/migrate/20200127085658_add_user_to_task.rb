class AddUserToTask < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :username, :string
  end
end
