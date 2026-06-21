class AddPublicationsToProfs < ActiveRecord::Migration[5.2]
  def change
    add_column :profs, :publications, :text
  end
end
