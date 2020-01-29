class AddBodyToTask < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :body, :string
  end
end
