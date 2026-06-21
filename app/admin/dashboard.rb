ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "概述" do
          ul do
            li "教授数量: #{Prof.count}"
            li "评价数量: #{ProfReview.count}"
            li "用户数量: #{User.count}"
            li "院校数量: #{School.count}"
            li "地区数量: #{Region.count}"
          end
        end
      end

      column do
        panel "待处理审核" do
          pending = ProfReview.where(status: 'pending_moderation').count
          flagged = ProfReview.where(flagged: true).count
          ul do
            li "待审核评价: #{pending}"
            li "被举报评价: #{flagged}"
          end
          if pending + flagged == 0
            para "暂无待处理内容", class: "blank_slate"
          end
        end
      end
    end

    columns do
      column do
        panel "最新评价" do
          table_for ProfReview.order(created_at: :desc).limit(10) do
            column(:prof) { |r| link_to "#{r.prof.first_name} #{r.prof.last_name}", admin_prof_path(r.prof) if r.prof }
            column(:author) { |r| link_to r.author.email, admin_user_path(r.author) if r.author }
            column(:body) { |r| truncate(r.body, length: 40) }
            column(:quality)
            column(:status)
            column(:created_at)
          end
        end
      end

      column do
        panel "最新用户" do
          table_for User.order(created_at: :desc).limit(10) do
            column(:email)
            column(:first_name)
            column(:is_verified)
            column(:created_at)
          end
        end
      end
    end
  end
end
