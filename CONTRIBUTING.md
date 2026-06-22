# 🤝 Contributing to UniBridge

Thank you for your interest in contributing! UniBridge is a platform built by and for international students — every contribution helps make higher education more transparent.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/UniBridge.git
   cd UniBridge
   ```
3. **Set up the development environment**:
   ```bash
   bin/setup
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/my-feature
   ```

## Development Workflow

### Backend (Rails API)

- Ruby >= 2.5.1, < 3.0
- PostgreSQL
- Run tests: `bundle exec rspec`
- Start server: `bin/rails server`

### Frontend (React + Redux)

- Node.js >= 12
- Compile: `npx webpack --mode=development`
- Watch mode: `npm start`

### Code Style

- **Ruby**: Follow community conventions — 2-space indentation, snake_case for variables/methods, CamelCase for classes
- **JavaScript/React**: 2-space indentation, camelCase for variables, PascalCase for components
- **Commit messages**: Use clear, descriptive messages (中文或英文均可). Prefix with `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, etc.

## What We Need Help With

| Area | Priority | Description |
|------|----------|-------------|
| 🌍 **Data** | High | Adding more universities, professors, and QS ranking data |
| 🎨 **UI/UX** | Medium | Improving mobile responsiveness, accessibility (a11y), dark mode |
| 🧪 **Testing** | High | Expanding RSpec test coverage, adding frontend tests |
| 🌐 **i18n** | Medium | Adding English translations alongside Chinese |
| 🔒 **Security** | Medium | Security audits, input validation improvements |
| 📖 **Docs** | Low | Translations, tutorials, API documentation |

## Pull Request Process

1. Ensure your code passes existing tests (`bundle exec rspec`)
2. Update the README if your change affects setup or usage
3. Write a clear PR description — what problem does it solve? How was it tested?
4. Link related issues using `#issue-number`

## Need Help?

- Open a [GitHub Issue](https://github.com/JosephHu04/UniBridge/issues) for bugs, feature requests, or questions
- For security vulnerabilities, please email the maintainer directly (do not open a public issue)

---

**Together we can make graduate school selection more transparent for students worldwide.** 🌏
