class Api::SchoolRatingsController < ApplicationController
    before_action :set_school_rating, only: [:show, :destroy]

    def index
        @school = School.includes(:profs, :prof_reviews, :school_ratings, :school_rating_likes).find(params[:schoolId])
        render :index
    end

    def show
        render :show
    end

    def create
        @school_rating = SchoolRating.new(school_rating_params)

        if @school_rating.save
            render :show
        else
            render json: @school_rating.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @school_rating.destroy
        head :no_content
    end

    private

    def set_school_rating
        @school_rating = SchoolRating.find(params[:id])
    rescue
        render json: ['School rating not found'], status: :not_found
    end

    def school_rating_params
        params.require(:schoolRating).permit(:reputation, :location, :internet, :food, :opportunities, :facilities, :clubs, :social, :happiness, :safety, :comment, :school_id)
    end
end