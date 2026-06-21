if @schools.length != 0
    json.schools do
        @schools.each do |school|
            json.set! school.id do
                json.extract! school, :id, :name, :state, :city
                json.qs_ranking school.qs_ranking
                json.qs_year school.qs_year
            end
        end
    end
else
    json.schools ({})
end