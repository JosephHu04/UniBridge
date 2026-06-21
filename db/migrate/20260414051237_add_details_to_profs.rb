class AddDetailsToProfs < ActiveRecord::Migration[5.2]
  def change
    add_column :profs, :title, :string
    add_column :profs, :bio, :text
    add_column :profs, :education, :text
    add_column :profs, :research_interests, :text
    add_column :profs, :personal_website, :string
  end
end
