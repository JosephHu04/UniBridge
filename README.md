<div align="center">
  <h1>🎓 UniBridge</h1>
  <p><strong>全球留学生真实就读体验选导平台</strong></p>
  <p>打破信息差 · 拒绝水军 · 寻找最适合你的研究生导师</p>

  <p>
    <img src="https://img.shields.io/badge/Ruby-2.6.10-CC342D?logo=ruby" alt="Ruby">
    <img src="https://img.shields.io/badge/Rails-5.2-CC0000?logo=ruby-on-rails" alt="Rails">
    <img src="https://img.shields.io/badge/React-17-61DAFB?logo=react" alt="React">
    <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/license-ISC-blue.svg" alt="License">
  </p>
</div>

---

## 关于

UniBridge 是一个面向中国留学生群体的导师与院校评价平台，灵感来自 Rate My Professors，在此基础上进行了本地化重构与功能扩展。平台覆盖全球 8 个地区、100+ 所 QS 排名院校，支持多维度的导师与院校评价。

## 核心功能

| 模块 | 功能 |
|------|------|
| 🏆 **QS 排名** | 内置 2025 年 QS Top 100 全球院校完整排名，支持按地区/校名实时检索 |
| 👨‍🏫 **导师评价** | 3 维度雷达图评分（人品与态度、学术与能力、资源与平台）+ 课程标签 + 选课建议 |
| 🏫 **院校评价** | 10 维度院校评分（口碑、位置、设施、机会、安全等）+ 学校综合分 |
| 🌍 **学术层级** | 地区 → 院校 → 学院 → 专业，完整学术导航树 |
| 📌 **收藏系统** | 收藏心仪导师，一键查看收藏列表 |
| 👍 **点赞/踩** | 对评价进行有用/无用投票 |
| 🛡️ **管理后台** | ActiveAdmin 内容审核、评价管理、用户管理 |

## 技术架构

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  React 17 · Redux 4 · React Router 5 · Recharts     │
│  Webpack 5 · Babel · SCSS                           │
├─────────────────────────────────────────────────────┤
│                  API Layer                           │
│  Rails 5.2 API · JBuilder · BCrypt (session token)  │
│  CSRF Protection · Controller Authorization         │
├─────────────────────────────────────────────────────┤
│                    Data                              │
│  PostgreSQL · ActiveStorage · ActiveAdmin            │
│  Devise (admin) · RSpec                              │
└─────────────────────────────────────────────────────┘
```

## 快速开始

### 环境要求
- Ruby >= 2.5.1, < 3.0
- PostgreSQL
- Node.js >= 12

### 一键安装

```bash
git clone <repo-url>
cd Uni\ bridge
bin/setup        # 安装依赖 → 建库 → seed → 生成demo数据 → 导入QS排名 → 编译前端
bin/rails server # 启动 → http://localhost:3000
```

> 如需重建数据库：`RESET_DB=true bin/setup`

### 手动安装

```bash
bundle install                          # Ruby 依赖
npm install --legacy-peer-deps         # JS 依赖
bin/rails db:create db:migrate db:seed  # 数据库 + 种子数据
bin/rails seed:demo_data               # 生成匿名 demo 评价
bin/rails import:qs_2025               # 导入 QS 排名
npx webpack --mode=development         # 编译前端
bin/rails server                        # 启动
```

### 管理后台

```
URL:   http://localhost:3000/admin
Email: admin@example.com
Pass:  password
```

## API 总览

> 所有接口返回 JSON，`*` 标记的接口需要登录且验证身份

### 院校 & 排名

| Method | Endpoint | 说明 |
|--------|----------|------|
| `GET` | `/api/schools` | 所有院校 |
| `GET` | `/api/schools?schoolQuery=哈佛` | 搜索（支持名称/地区） |
| `POST` | `/api/schools` | 创建院校 |
| `GET` | `/api/rankings` | QS 排名列表 |
| `GET` | `/api/rankings?region=欧洲&limit=20` | 按地区过滤 |

### 导师 & 评价

| Method | Endpoint | 说明 |
|--------|----------|------|
| `GET` | `/api/profs?profQuery=Smith&schoolName=Harvard` | 搜索导师 |
| `POST` | `/api/profs` | 创建导师 |
| `GET` | `/api/prof_reviews?profId=1` | 导师评价列表 |
| `POST*` | `/api/prof_reviews` | 写评价 |
| `PATCH*` | `/api/prof_reviews/:id` | 编辑（仅作者） |
| `DELETE*` | `/api/prof_reviews/:id` | 删除（仅作者） |

### 地区 / 学院 / 专业

| Method | Endpoint | 说明 |
|--------|----------|------|
| `GET` | `/api/regions` | 全部地区 |
| `GET` | `/api/departments?school_id=1` | 学院列表 |
| `GET` | `/api/majors?department_id=1` | 专业列表 |

### 互动 & 认证

| Method | Endpoint | 说明 |
|--------|----------|------|
| `POST*` | `/api/likes` | 点赞/踩 |
| `POST*` | `/api/prof_saves` | 收藏导师 |
| `POST` | `/api/users` | 注册 |
| `DELETE*` | `/api/users/:id` | 注销（仅本人） |
| `POST` | `/api/session` | 登录 |
| `DELETE` | `/api/session` | 登出 |

## 项目结构

```
├── app/
│   ├── admin/           ActiveAdmin 管理面板
│   ├── controllers/     API 控制器
│   ├── models/          ActiveRecord 模型
│   └── views/           JBuilder 视图 + Layout
├── frontend/
│   ├── actions/         Redux actions
│   ├── components/      React 组件（37 个）
│   ├── reducers/        Redux reducers
│   ├── store/           Store 配置
│   └── util/            API 工具 + 路由守卫
├── config/              Rails 配置
├── db/                  迁移 + Schema
├── lib/tasks/           Rake 任务
│   ├── import_qs_2025.rake       QS 排名导入
│   └── seed_demo_data.rake       匿名 demo 数据
└── spec/                RSpec 测试
```

## 命令速查

```bash
bin/rails server              # 启动开发服务器
bin/rails console             # Rails 控制台
bin/rails db:migrate          # 运行迁移
bin/rails import:qs_2025      # 导入 QS 排名
bin/rails seed:demo_data      # 生成 demo 评价
npx webpack --mode=development # 编译前端
bundle exec rspec             # 运行测试
```

## License

ISC

---

<div align="center">
  <p>Built with Ruby on Rails + React/Redux</p>
</div>
