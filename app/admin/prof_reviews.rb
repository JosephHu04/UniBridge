ActiveAdmin.register ProfReview do
  permit_params :body, :quality, :difficulty, :klass, :grade,
                :tag1, :tag2, :tag3,
                :take_again, :for_credit, :txt_book, :attendance,
                :author_id, :prof_id,
                :personality_and_attitude, :academic_and_ability, :resources_and_platform,
                :proof_image_url, :status, :flagged

  index do
    selectable_column
    id_column
    column :prof
    column :author
    column :body do |review|
      truncate(review.body, length: 60)
    end
    column :quality
    column :difficulty
    column :status
    column :flagged
    column :created_at
    actions
  end

  filter :prof
  filter :author
  filter :quality
  filter :difficulty
  filter :status, as: :select, collection: ['approved', 'pending_moderation', 'rejected']
  filter :flagged
  filter :created_at

  form do |f|
    f.inputs 'Review Content' do
      f.input :prof
      f.input :author
      f.input :body
      f.input :quality
      f.input :difficulty
      f.input :klass
      f.input :grade
      f.input :tag1
      f.input :tag2
      f.input :tag3
      f.input :take_again
      f.input :for_credit
      f.input :txt_book
      f.input :attendance
    end
    f.inputs 'Dimension Scores' do
      f.input :personality_and_attitude
      f.input :academic_and_ability
      f.input :resources_and_platform
    end
    f.inputs 'Moderation' do
      f.input :status, as: :select, collection: ['approved', 'pending_moderation', 'rejected']
      f.input :flagged
      f.input :proof_image_url
    end
    f.actions
  end
end
