class Api::ProfsController < ApplicationController
    before_action :set_prof, only: [:show]

    def index
        if params[:onlyProfs] == 'true'
            @profs = Prof.all
            render 'api/profs/only_profs'
            return
        end

        query = params[:profQuery].to_s.strip
        school_name = params[:schoolName]

        base = Prof.includes(:prof_reviews, :school)

        # Filter by school
        if school_name.present? && school_name != 'all schools'
            school = School.find_by(name: school_name)
            base = base.where(school_id: school&.id)
        end

        if query.blank?
            @profs = base.all
            @schools = School.all.includes(:profs)
            render :index
            return
        end

        # Search each word against first_name OR last_name
        words = query.split
        pattern = "%#{words.shift.downcase}%"
        scope = base.where('lower(first_name) LIKE ? OR lower(last_name) LIKE ?', pattern, pattern)
        words.each do |word|
          pattern = "%#{word.downcase}%"
          scope = scope.or(base.where('lower(first_name) LIKE ? OR lower(last_name) LIKE ?', pattern, pattern))
        end

        @profs = scope.distinct
        @schools = School.all.includes(:profs)
        render :index
    end

    def show
    end

    def update
        render json: ['导师资料修改功能已关闭'], status: :forbidden
    end

    def create
        errors = []
        school = School.find_by(name: prof_params[:school_name])
        errors << 'School not found' if !school
        errors << 'First name cannot be blank' if prof_params[:first_name] == ""
        errors << 'Last name cannot be blank' if prof_params[:last_name] == ""
        errors << 'Department cannot be blank' if prof_params[:subject] == ""
        if errors.length == 0
            @prof = Prof.create(first_name: prof_params[:first_name], last_name: prof_params[:last_name], subject: prof_params[:subject], school_id: school.id)
            render :show
        else
            render json: errors, status: :unprocessable_entity
        end
    end

    private

    def set_prof
        @prof = Prof.find(params[:id])
    rescue
        render json: ['Prof not found'], status: :not_found
    end

    def prof_params
        params.require(:prof).permit(:first_name, :last_name, :subject, :school_name, :id)
    end
end