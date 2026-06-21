json.departments do
  @departments.each do |dept|
    json.set! dept.id do
      json.extract! dept, :id, :name, :school_id
      json.school_name dept.school&.name
      json.major_ids dept.majors.pluck(:id)
    end
  end
end
