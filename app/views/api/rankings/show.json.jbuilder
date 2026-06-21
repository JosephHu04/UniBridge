json.extract! @school, :id, :name, :state, :city, :website, :qs_ranking, :qs_year
json.region_name @school.region&.name
json.ranking_badge @school.ranking_badge
