ActiveAdmin.register User do
  permit_params :email, :first_name, :grad_yr, :school_id, :prof_id,
                :is_verified, :id_proof_url

  index do
    selectable_column
    id_column
    column :email
    column :first_name
    column :school
    column :prof_id
    column :is_verified
    column :created_at
    actions
  end

  filter :email
  filter :first_name
  filter :school
  filter :is_verified
  filter :created_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :first_name
      f.input :grad_yr
      f.input :school
      f.input :prof_id, label: 'Prof ID (if user is a professor)'
      f.input :is_verified
      f.input :id_proof_url
    end
    f.actions
  end
end
