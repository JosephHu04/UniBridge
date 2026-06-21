ActiveAdmin.register Major do
  permit_params :name, :department_id

  index do
    selectable_column
    id_column
    column :name
    column :department
    column :created_at
    actions
  end

  filter :name
  filter :department
  filter :created_at

  form do |f|
    f.inputs do
      f.input :name
      f.input :department
    end
    f.actions
  end
end
