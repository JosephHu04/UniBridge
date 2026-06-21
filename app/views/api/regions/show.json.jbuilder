json.set! @region.id do
  json.extract! @region, :id, :name
  json.schools do
    @region.schools.each do |school|
      json.set! school.id do
        json.extract! school, :id, :name, :state, :city
      end
    end
  end
end
