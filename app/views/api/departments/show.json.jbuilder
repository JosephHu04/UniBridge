json.set! @department.id do
  json.extract! @department, :id, :name, :school_id
  json.school_name @department.school&.name
  json.majors do
    @department.majors.each do |major|
      json.set! major.id do
        json.extract! major, :id, :name
      end
    end
  end
end
