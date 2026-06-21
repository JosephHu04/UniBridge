class Api::MajorsController < ApplicationController
  def index
    @majors = if params[:department_id]
                 Major.where(department_id: params[:department_id])
               elsif params[:school_id]
                 Major.joins(:department).where(departments: { school_id: params[:school_id] })
               else
                 Major.all.includes(:department)
               end
    render :index
  end

  def show
    @major = Major.includes(:department).find(params[:id])
    render :show
  rescue
    render json: ['Major not found'], status: :not_found
  end
end
