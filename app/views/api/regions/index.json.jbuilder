json.regions do
  @regions.each do |region|
    json.set! region.id do
      json.extract! region, :id, :name
      json.school_ids region.schools.pluck(:id)
    end
  end
end
