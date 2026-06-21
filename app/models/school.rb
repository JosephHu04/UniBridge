class School < ApplicationRecord
    validates :name, :state, :city, :website, presence: :true
    validates :name, :website, uniqueness: true

    belongs_to :region, optional: true
    has_many :departments

    has_many :profs,
        foreign_key: :school_id,
        class_name: :Prof

    has_many :school_ratings,
        foreign_key: :school_id,
        class_name: :SchoolRating

    has_many :prof_reviews,
        through: :profs,
        source: :prof_reviews

    has_many :school_rating_likes,
        through: :school_ratings,
        source: :school_rating_likes

    scope :by_ranking, -> { where.not(qs_ranking: nil).order(:qs_ranking) }
    scope :ranked_in_year, ->(year) { where(qs_year: year).where.not(qs_ranking: nil).order(:qs_ranking) }

    def ranked?
        qs_ranking.present?
    end

    def ranking_badge
        return nil unless ranked?
        "QS##{qs_ranking} (#{qs_year})"
    end
end