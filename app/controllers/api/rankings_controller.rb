class Api::RankingsController < ApplicationController
  def index
    @schools = School.ranked_in_year(params[:year] || 2025).includes(:region)

    if params[:region].present?
      region = Region.find_by(name: params[:region])
      @schools = @schools.where(region_id: region.id) if region
    end

    if params[:search].present?
      @schools = @schools.where('lower(schools.name) LIKE ?', "%#{params[:search].downcase}%")
    end

    @schools = @schools.limit(params[:limit] || 100)
    render :index
  end

  def show
    @school = School.find(params[:id])
    render :show
  rescue
    render json: ['School not found'], status: :not_found
  end
end
