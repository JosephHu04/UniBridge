class ProfReview < ApplicationRecord
    GRADES = [  
        'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 
        'C', 'C-', 'D+', 'D', 'D-', 'F', 
        'Drop / Withdrawal', 'Incomplete', 'Not sure yet', 
        'Rather not say', 'Audit / No grade', 'Select', ""
    ]

    TAGS = [
        "", 'GIVES GOOD FEEDBACK', 'RESPECTED', 'LOTS OF HOMEWORK', 
        'ACCESSIBLE OUTSIDE OF CLASS', 'GET READY TO READ', 
        'PARTICIPATION MATTERS', "SKIP CLASS? YOU WON'T PASS.", 
        "INSPIRATIONAL", "GRADED BY FEW THINGS", "TEST HEAVY", 
        "GROUP PROJECTS", "CLEAR GRADING CRITERIA", "HILARIOUS", 
        "BEWARE OF POP QUIZZES", "AMAZING LECTURES", "LECTURE HEAVY",
        "CARING", "EXTRA CREDIT", "SO MANY PAPERS", "TOUGH GRADER", nil,
      'TESTS ARE TOUGH',
      # Chinese tag labels used by the localized frontend
      '反馈及时', '受人尊重', '作业较多', '课后可沟通', '阅读量大',
      '重视课堂参与', '逃课容易挂科', '有启发性', '成绩评定维度少', '考试占比高',
      '有小组项目', '评分标准清晰', '课堂有趣', '突击测验较多', '讲课精彩', '偏重讲授',
      '关心学生', '有加分机会', '论文任务多', '评分严格', '考试较难'
    ]

    has_one_attached :proof_image
    validates :body, presence: true, length: { maximum: 350 }
    validates :quality, :difficulty, inclusion: (1..5).to_a
    validates :personality_and_attitude, :academic_and_ability, :resources_and_platform, inclusion: (1..5).to_a, allow_nil: true
    validates :klass, :prof_id, presence: true
    validates :prof_id, presence: true
    validates :grade, inclusion: GRADES
    validates :tag1, :tag2, :tag3, inclusion: TAGS
    validates :take_again, :for_credit, :txt_book, inclusion: [true, false, nil]
    validates :attendance, inclusion: [nil, true, false]

    before_save :evaluate_flag_status

    def evaluate_flag_status
      # If scores are extremely low, flag for manual review
      if personality_and_attitude == 1 || academic_and_ability == 1 || resources_and_platform == 1
        self.flagged = true
        self.status = "pending_moderation"
      else
        self.status ||= "approved"
        self.flagged ||= false
      end
    end

    belongs_to :author,
        optional: true,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :prof,
        foreign_key: :prof_id,
        class_name: :Prof

    has_many :likes,
        foreign_key: :review_id,
        class_name: :Like
end