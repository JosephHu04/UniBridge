class AddDepartmentAndMajorToProfs < ActiveRecord::Migration[5.2]
  def change
    add_reference :profs, :department, foreign_key: true
    add_reference :profs, :major, foreign_key: true
  end
end
