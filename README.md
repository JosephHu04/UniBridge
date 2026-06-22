<div align="center">
  <h1>🎓 UniBridge</h1>
  <h3>全球留学生真实就读体验选导平台</h3>
  <p><strong>International Student Professor & School Review Platform</strong></p>

  <p>
    <a href="https://github.com/JosephHu04/UniBridge/stargazers"><img src="https://img.shields.io/github/stars/JosephHu04/UniBridge?style=for-the-badge&color=yellow" alt="Stars"></a>
    <a href="https://github.com/JosephHu04/UniBridge/network/members"><img src="https://img.shields.io/github/forks/JosephHu04/UniBridge?style=for-the-badge&color=blue" alt="Forks"></a>
    <a href="https://github.com/JosephHu04/UniBridge/issues"><img src="https://img.shields.io/github/issues/JosephHu04/UniBridge?style=for-the-badge&color=red" alt="Issues"></a>
    <a href="https://github.com/JosephHu04/UniBridge/blob/main/LICENSE"><img src="https://img.shields.io/github/license/JosephHu04/UniBridge?style=for-the-badge" alt="License"></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Ruby-2.6.10-CC342D?style=flat-square&logo=ruby&logoColor=white" alt="Ruby">
    <img src="https://img.shields.io/badge/Rails-5.2-CC0000?style=flat-square&logo=ruby-on-rails&logoColor=white" alt="Rails">
    <img src="https://img.shields.io/badge/React-17-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Redux-4-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux">
    <img src="https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/Webpack-5-8DD6F9?style=flat-square&logo=webpack&logoColor=black" alt="Webpack">
  </p>

  <p>
    <strong>中文</strong> | 
    <a href="#english">English</a>
  </p>
</div>

---

## 📖 关于本项目 | About

**UniBridge** 是一个面向中国留学生群体的导师与院校评价平台，灵感来源于 Rate My Professors，并在此基础上进行了本地化重构与功能扩展。

平台覆盖全球 **8 个地区**、**100+ 所 QS 排名院校**，支持多维度的导师与院校评价，致力于打破留学信息差，帮助学生找到最适合自己的研究生导师。

> **UniBridge** is a professor & school review platform built for international students. Inspired by Rate My Professors, it adds localization, QS rankings, and multi-dimensional rating systems covering 8 regions and 100+ QS-ranked universities worldwide.

## ✨ 核心功能 | Features

| 模块 Module | 功能 Feature |
|-------------|--------------|
| 🏆 **QS 排名** | 内置 2025 年 QS Top 100 全球院校完整排名，支持按地区/校名实时检索 |
| 👨‍🏫 **导师评价** | 3 维度雷达图评分（人品与态度、学术与能力、资源与平台）+ 课程标签 + 选课建议 |
| 🏫 **院校评价** | 10 维度院校评分（口碑、位置、设施、机会、安全等）+ 学校综合分 |
| 🌍 **学术层级** | 地区 → 院校 → 学院 → 专业，完整学术导航树 |
| 📌 **收藏系统** | 收藏心仪导师，一键查看收藏列表 |
| 👍 **点赞/踩** | 对评价进行有用/无用投票，社区自治内容质量 |
| 🛡️ **管理后台** | ActiveAdmin 内容审核、评价管理、用户管理 |
| 🔐 **认证系统** | 用户注册/登录/注销 + BCrypt session token 认证 |

## 🖼️ 界面预览 | Screenshots

<!-- 添加您的截图 -->
<!-- Add your screenshots here -->
<p align="center">
  <em>📸 Screenshots coming soon — PRs welcome!</em>
</p>

## 🏗️ 技术架构 | Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  React 17 · Redux 4 · React Router 5 · Recharts     │
│  Webpack 5 · Babel · SCSS · Lodash                  │
├─────────────────────────────────────────────────────┤
│                  API Layer                           │
│  Rails 5.2 API · JBuilder · BCrypt (session token)  │
│  CSRF Protection · Controller Authorization         │
├─────────────────────────────────────────────────────┤
│                    Data                              │
│  PostgreSQL · ActiveStorage · ActiveAdmin            │
│  Devise (admin) · RSpec · Aliyun OSS                │
└─────────────────────────────────────────────────────┘
```

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites

| 依赖 | 版本要求 |
|------|----------|
| Ruby | >= 2.5.1, < 3.0 |
| PostgreSQL | >= 12 |
| Node.js | >= 12 |
| npm | >= 6.14 |

### 一键安装 | One-Command Setup

```bash
git clone https://github.com/JosephHu04/UniBridge.git
cd UniBridge
bin/setup        # 安装依赖 → 建库 → seed → 生成demo数据 → 导入QS排名 → 编译前端
bin/rails server # 启动 → http://localhost:3000
```

> 💡 如需重建数据库：`RESET_DB=true bin/setup`

### 手动安装 | Manual Setup

```bash
# 1. Ruby 依赖
bundle install

# 2. JS 依赖
npm install --legacy-peer-deps

# 3. 数据库 + 种子数据
bin/rails db:create db:migrate db:seed

# 4. 生成匿名 demo 评价
bin/rails seed:demo_data

# 5. 导入 QS 2025 排名
bin/rails import:qs_2025

# 6. 编译前端
npx webpack --mode=development

# 7. 启动服务器
bin/rails server
```

### 管理后台 | Admin Panel

```
URL:   http://localhost:3000/admin
Email: admin@example.com
Pass:  password
```

## 📡 API 总览 | API Reference

> 所有接口返回 JSON，`*` 标记的接口需要登录且验证身份

### 院校 & 排名 | Schools & Rankings

| Method | Endpoint | 说明 |
|--------|----------|------|
| `GET` | `/api/schools` | 所有院校列表 |
| `GET` | `/api/schools?schoolQuery=哈佛` | 搜索（支持名称/地区） |
| `POST` | `/api/schools` | 创建院校 |
| `GET` | `/api/rankings` | QS 排名列表 |
| `GET` | `/api/rankings?region=欧洲&limit=20` | 按地区过滤 |

### 导师 & 评价 | Professors & Reviews

| Method | Endpoint | 说明 |
|--------|----------|------|
| `GET` | `/api/profs?profQuery=Smith&schoolName=Harvard` | 搜索导师 |
| `POST` | `/api/profs` | 创建导师 |
| `GET` | `/api/prof_reviews?profId=1` | 导师评价列表 |
| `POST*` | `/api/prof_reviews` | 写评价 |
| `PATCH*` | `/api/prof_reviews/:id` | 编辑（仅作者） |
| `DELETE*` | `/api/prof_reviews/:id` | 删除（仅作者） |

### 地区 / 学院 / 专业 | Regions / Departments / Majors

| Method | Endpoint | 说明 |
|--------|----------|------|
| `GET` | `/api/regions` | 全部地区 |
| `GET` | `/api/departments?school_id=1` | 学院列表 |
| `GET` | `/api/majors?department_id=1` | 专业列表 |

### 互动 & 认证 | Interactions & Auth

| Method | Endpoint | 说明 |
|--------|----------|------|
| `POST*` | `/api/likes` | 点赞/踩 |
| `POST*` | `/api/prof_saves` | 收藏导师 |
| `POST` | `/api/users` | 注册 |
| `DELETE*` | `/api/users/:id` | 注销（仅本人） |
| `POST` | `/api/session` | 登录 |
| `DELETE` | `/api/session` | 登出 |

## 📁 项目结构 | Project Structure

```
├── app/
│   ├── admin/           ActiveAdmin 管理面板
│   ├── controllers/     API 控制器 (regions, schools, profs, reviews...)
│   ├── models/          ActiveRecord 模型 (13 models)
│   └── views/           JBuilder 视图 + Layout
├── frontend/
│   ├── actions/         Redux actions
│   ├── components/      React 组件 (37+)
│   │   ├── profs/       导师搜索 & 详情
│   │   ├── schools/     院校搜索 & 详情
│   │   ├── rankings/    QS 排名页面
│   │   └── session/     登录/注册
│   ├── reducers/        Redux reducers
│   ├── store/           Store 配置
│   └── util/            API 工具 + 路由守卫
├── config/              Rails 配置
├── db/                  迁移 + Schema + Seeds
│   ├── migrate/         数据库迁移文件
│   ├── schema.rb        数据库结构
│   └── seeds.rb         初始化数据
├── lib/tasks/           Rake 任务
│   ├── import_qs_2025.rake       QS 排名导入
│   └── seed_demo_data.rake       匿名 demo 数据
├── spec/                RSpec 测试
├── docs/                项目文档
├── .github/             Issue/PR 模板
└── public/              静态资源
```

## 🧰 命令速查 | Commands

```bash
# 开发
bin/rails server              # 启动开发服务器 http://localhost:3000
bin/rails console             # Rails 控制台
npx webpack --watch           # 前端热编译

# 数据库
bin/rails db:migrate          # 运行迁移
bin/rails db:seed             # 导入种子数据
RESET_DB=true bin/setup       # 完全重建数据库

# 数据导入
bin/rails import:qs_2025      # 导入 QS 2025 排名
bin/rails seed:demo_data      # 生成匿名 demo 评价

# 测试
bundle exec rspec             # 运行全部测试
bundle exec rspec spec/models # 运行模型测试
```

## 🗺️ 路线图 | Roadmap

- [ ] 🌐 英文界面 i18n 国际化
- [ ] 📱 PWA 支持 & 移动端适配
- [ ] 🔍 Elasticsearch 全文搜索
- [ ] 📊 数据可视化看板
- [ ] 🔗 OAuth (Google/GitHub/微信) 登录
- [ ] 🧪 前端测试 (Jest + React Testing Library)
- [ ] 🐳 Docker 一键部署
- [ ] 🌙 暗色模式

## 🤝 贡献 | Contributing

我们欢迎所有形式的贡献！无论是提交 bug、建议新功能、还是贡献代码。

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### 贡献者 | Contributors

<a href="https://github.com/JosephHu04/UniBridge/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=JosephHu04/UniBridge" alt="Contributors" />
</a>

## 📄 许可证 | License

本项目采用 [ISC License](./LICENSE)。

---

<div align="center" id="english">
  <h2>🌏 English</h2>
</div>

**UniBridge** is a full-stack professor and school review platform designed for international students, particularly Chinese students applying to graduate programs abroad. It was inspired by Rate My Professors and rebuilt with localization, QS World University Rankings integration, and multi-dimensional rating systems.

### Why UniBridge?

Choosing a graduate advisor is one of the most consequential decisions in an academic career — yet most students rely on fragmented information, rumors, or luck. UniBridge solves this by:

- 📊 **Structured Data**: 3-dimension professor reviews + 10-dimension school reviews
- 🌍 **Global Coverage**: 8 regions, 100+ QS-ranked universities
- 🛡️ **Community Governance**: Upvote/downvote reviews to surface quality content
- 🎓 **Built by Students, for Students**: 100% open source, community-driven

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 17, Redux 4, React Router 5, Recharts, Webpack 5, SCSS |
| Backend | Ruby on Rails 5.2 (API mode), JBuilder, BCrypt |
| Database | PostgreSQL, ActiveStorage |
| Admin | ActiveAdmin + Devise |
| Testing | RSpec |

---

<div align="center">
  <p>
    <sub>Built with ❤️ by the UniBridge community</sub>
  </p>
  <p>
    <sub>⭐ Star us on GitHub — it helps more students discover this project!</sub>
  </p>
</div>
