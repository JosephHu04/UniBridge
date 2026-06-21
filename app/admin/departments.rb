ActiveAdmin.register Department do
  permit_params :name, :school_id

  index do
    selectable_column
    id_column
    column :name
    column :school
    column :created_at
    actions
  end

  filter :name
  filter :school
  filter :created_at

  form do |f|
    f.inputs do
      f.input :name
      f.input :school
    end
    f.actions
  end
end
