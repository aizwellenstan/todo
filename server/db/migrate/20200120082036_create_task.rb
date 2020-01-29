class CreateTask < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :text
      t.string :start_time
      t.string :end_time
      t.string :level
      t.string :status
      t.string :tags
    end
  end
end
