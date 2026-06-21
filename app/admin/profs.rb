ActiveAdmin.register Prof do
  permit_params :first_name, :last_name, :subject, :school_id, :title, :bio,
                :education, :research_interests, :personal_website,
                :department_id, :major_id, :publications

  index do
    selectable_column
    id_column
    column :first_name
    column :last_name
    column :subject
    column :school
    column :department
    column :major
    column :created_at
    actions
  end

  filter :first_name
  filter :last_name
  filter :subject
  filter :school
  filter :department
  filter :major
  filter :created_at

  form do |f|
    f.inputs do
      f.input :first_name
      f.input :last_name
      f.input :subject
      f.input :school
      f.input :department
      f.input :major
      f.input :title
      f.input :bio, as: :text
      f.input :education, as: :text
      f.input :research_interests, as: :text
      f.input :publications, as: :text
      f.input :personal_website
    end
    f.actions
  end
end
