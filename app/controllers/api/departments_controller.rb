class Api::DepartmentsController < ApplicationController
  def index
    @departments = if params[:school_id]
                     Department.where(school_id: params[:school_id]).includes(:majors)
                   else
                     Department.all.includes(:majors, :school)
                   end
    render :index
  end

  def show
    @department = Department.includes(:majors, :school).find(params[:id])
    render :show
  rescue
    render json: ['Department not found'], status: :not_found
  end
end
