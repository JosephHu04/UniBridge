class Api::SchoolRatingLikesController < ApplicationController
    before_action :set_school_rating_like, only: [:destroy]

    def create
        return head :unauthorized unless logged_in? && school_rating_like_params[:liker_id].to_i == current_user.id
        @school_rating_like = SchoolRatingLike.new(school_rating_like_params)
        if @school_rating_like.save
            render :show
        else
            render json: @school_rating_like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        return head :unauthorized unless logged_in? && @school_rating_like.liker_id == current_user.id
        @school_rating_like.destroy
        head :no_content
    end

    private

    def set_school_rating_like
        @school_rating_like = SchoolRatingLike.find(params[:id])
    rescue
        render json: ['SchoolRatingLike not found'], status: :not_found
    end

    def school_rating_like_params
        params.require(:schoolRatingLike).permit(:like_type, :liker_id, :school_rating_id)
    end
end