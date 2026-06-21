class Api::ProfReviewsController < ApplicationController
    before_action :set_prof_review, only: [:update, :destroy, :show]

    def show
    end

    def index
        @prof = Prof.includes(:prof_reviews, :likes).find(params[:profId])
        @prof_save = ProfSave.find_by({saver_id: params[:userId], prof_saved_id: params[:profId]})
        @school = @prof.school
    end
    
    def create
        @prof_review = ProfReview.new(prof_review_params)

        if @prof_review.save
            render :show
        else
            render json: @prof_review.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        return head :unauthorized unless logged_in? && @prof_review.author_id == current_user.id
        if @prof_review.update(prof_review_params)
            render :show
        else
            render json: @prof_review.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        return head :unauthorized unless logged_in? && @prof_review.author_id == current_user.id
        @prof_review.destroy
        head :no_content
    end

    private

    def set_prof_review
        @prof_review = ProfReview.find(params[:id])
    rescue
        render json: ['Prof Review not found'], status: :not_found
    end

    def prof_review_params
        params.require(:profReview).permit(:body, :klass, :grade, :quality,
        :difficulty, :take_again, :for_credit, :txt_book, :attendance, :tag1,
        :tag2, :tag3, :prof_id, :author_id, :id, :updated_at,
        :personality_and_attitude, :academic_and_ability, :resources_and_platform,
        :proof_image)
    end
end