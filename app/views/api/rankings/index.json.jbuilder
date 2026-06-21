json.rankings do
  json.array! @schools do |school|
    json.extract! school, :id, :name, :state, :city, :website, :qs_ranking, :qs_year
    json.region_name school.region&.name
    json.region_id school.region_id
  end
end
json.meta do
  json.total @schools.count
  json.year params[:year] || 2025
end
