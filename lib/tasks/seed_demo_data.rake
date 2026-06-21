namespace :seed do
  desc 'Generate 50+ anonymous demo reviews for existing professors'
  task demo_data: :environment do
    puts 'Generating anonymous demo reviews...'

    # Chinese review templates for variety
    REVIEWS_CN = [
      { body: '老师非常负责，每次课后都会耐心答疑。课程内容安排合理，节奏把控得很好。推荐选课。', quality: 5, difficulty: 3, tags: %w[反馈及时 关心学生 评分标准清晰] },
      { body: '讲课风格比较独特，有时候会偏题讲一些行业趣事，但整体收获还是挺大的。作业量适中。', quality: 4, difficulty: 3, tags: %w[课堂有趣 偏重讲授 课后可沟通] },
      { body: '要求很严格，但确实能学到东西。期末考试覆盖了整个学期的重点，需要认真准备。', quality: 4, difficulty: 5, tags: %w[评分严格 考试较难 有启发性] },
      { body: '上课很幽默，课堂氛围轻松。但作业有点多，每周都要交reading response。', quality: 4, difficulty: 3, tags: %w[课堂有趣 阅读量大 重视课堂参与] },
      { body: '学术水平很高，对学生也比较关心，但是给分比较保守，不容易拿A。', quality: 3, difficulty: 4, tags: %w[受人尊重 评分严格 课后可沟通] },
      { body: '非常热情的老师，对学生很有耐心。课程设计实用性强，对之后的研究很有帮助。', quality: 5, difficulty: 2, tags: %w[关心学生 有启发性 反馈及时] },
      { body: '讲课速度偏快，需要课前预习才能跟上。但讲得很透彻，逻辑清晰。', quality: 4, difficulty: 4, tags: %w[偏重讲授 有启发性 考试较难] },
      { body: '非常随和的老师，课程内容不算难，主要以讨论为主。适合对这方面感兴趣的同学。', quality: 3, difficulty: 2, tags: %w[重视课堂参与 课后可沟通 课堂有趣] },
      { body: '学术要求很高，每周都有paper要看。但收获确实大，对学术写作帮助很大。', quality: 4, difficulty: 5, tags: %w[阅读量大 作业较多 有启发性] },
      { body: '上课中规中矩，PPT讲得比较细致。考试内容基本都在PPT和作业里出过。', quality: 3, difficulty: 3, tags: %w[评分标准清晰 偏重讲授] },
      { body: '老师人很好但讲课有点无聊。如果有自学的习惯问题不大，想靠听课拿高分比较难。', quality: 2, difficulty: 3, tags: %w[偏重讲授 课后可沟通] },
      { body: 'experimental research方向的大牛，跟着他做research能学到很多。课程内容前沿。', quality: 5, difficulty: 4, tags: %w[有启发性 受人尊重 有小组项目] },
    ].freeze

    REVIEWS_EN = [
      { body: 'Great professor! Very knowledgeable and always willing to help during office hours. The course was well-structured and I learned a lot.', quality: 5, difficulty: 3, tags: %w[反馈及时 受人尊重] },
      { body: 'Pretty good lectures, but the exams were harder than expected. Make sure to study the practice problems carefully.', quality: 4, difficulty: 4, tags: %w[考试较难 评分标准清晰] },
      { body: 'Took this class as an elective and really enjoyed it. The professor is passionate about the subject and it shows in lectures.', quality: 5, difficulty: 2, tags: %w[课堂有趣 有启发性] },
    ].freeze

    ALL_TAGS = %w[反馈及时 受人尊重 作业较多 课后可沟通 阅读量大 重视课堂参与 有启发性 评分标准清晰 课堂有趣 讲课精彩 偏重讲授 关心学生 有加分机会 评分严格 考试较难 有小组项目].freeze

    grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', '', '']

    profs = Prof.includes(:school).all.to_a
    if profs.empty?
      puts 'ERROR: No professors found. Run db:seed first.'
      exit 1
    end

    # Clear existing non-seed reviews (reviews created by demo_user or without authors)
    deleted = ProfReview.where(author_id: nil).delete_all
    puts "Cleared #{deleted} old anonymous reviews"

    total = 0
    profs.each do |prof|
      # Each prof gets 2-5 reviews
      num = rand(2..5)
      num.times do |i|
        is_cn = rand < 0.7 # 70% Chinese reviews
        templates = is_cn ? REVIEWS_CN : REVIEWS_EN
        template = templates.sample

        review = ProfReview.new(
          prof_id: prof.id,
          body: template[:body],
          quality: template[:quality] + rand(-1..1),
          difficulty: template[:difficulty] + rand(-1..1),
          klass: "COURSE#{rand(100..499)}",
          grade: grades.sample,
          tag1: template[:tags][0] || ALL_TAGS.sample,
          tag2: template[:tags][1] || ALL_TAGS.sample,
          tag3: template[:tags][2] || ALL_TAGS.sample,
          take_again: [true, true, true, false].sample,
          for_credit: [true, true, false].sample,
          txt_book: [true, false].sample,
          attendance: [true, false].sample,
          personality_and_attitude: rand(2..5),
          academic_and_ability: rand(2..5),
          resources_and_platform: rand(2..5),
          status: 'approved',
          flagged: false
        )

        review.quality = [[review.quality, 1].max, 5].min
        review.difficulty = [[review.difficulty, 1].max, 5].min

        review.save!
        total += 1
      end
      puts "  #{prof.first_name} #{prof.last_name}: +#{num} reviews"
    end

    puts ''
    puts "Done! Generated #{total} anonymous reviews across #{profs.count} professors."
    puts "Total reviews in DB: #{ProfReview.count}"
  end
end
