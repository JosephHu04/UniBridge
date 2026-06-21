json.majors do
  @majors.each do |major|
    json.set! major.id do
      json.extract! major, :id, :name, :department_id
      json.department_name major.department&.name
    end
  end
end
