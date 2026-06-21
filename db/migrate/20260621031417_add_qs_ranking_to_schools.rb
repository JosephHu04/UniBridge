class AddQsRankingToSchools < ActiveRecord::Migration[5.2]
  def change
    add_column :schools, :qs_ranking, :integer
    add_column :schools, :qs_year, :integer
  end
end
