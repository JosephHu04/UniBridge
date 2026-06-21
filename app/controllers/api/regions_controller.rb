class Api::RegionsController < ApplicationController
  def index
    @regions = Region.all.includes(:schools)
    render :index
  end

  def show
    @region = Region.includes(:schools).find(params[:id])
    render :show
  rescue
    render json: ['Region not found'], status: :not_found
  end
end
