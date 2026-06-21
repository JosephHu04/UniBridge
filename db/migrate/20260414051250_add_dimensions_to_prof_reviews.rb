class AddDimensionsToProfReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :prof_reviews, :personality_and_attitude, :integer
    add_column :prof_reviews, :academic_and_ability, :integer
    add_column :prof_reviews, :resources_and_platform, :integer
    add_column :prof_reviews, :proof_image_url, :string
    add_column :prof_reviews, :status, :string
    add_column :prof_reviews, :flagged, :boolean
  end
end
