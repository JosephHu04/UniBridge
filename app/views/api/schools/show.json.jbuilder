json.schools do
    json.set! @school.id do
        json.extract! @school, :id, :name, :state, :city, :website
        json.qs_ranking @school.qs_ranking
        json.qs_year @school.qs_year
        json.ranking_badge @school.ranking_badge
    end
end