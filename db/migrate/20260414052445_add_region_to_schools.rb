class AddRegionToSchools < ActiveRecord::Migration[5.2]
  def change
    add_reference :schools, :region, foreign_key: true
  end
end
