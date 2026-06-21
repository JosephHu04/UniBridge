json.profs do
    json.set! @prof.id do
        json.extract! @prof, :id, :first_name, :last_name, :subject, :school_id, :title, :bio, :education, :research_interests, :publications, :personal_website
        
        json.department_name @prof.department ? @prof.department.name : nil
        json.major_name @prof.major ? @prof.major.name : nil
    end
end