# Contributing to UI Components Library

Thank you for your interest in contributing to the UI Components Library! This guide will help you get started.

## 📁 Project Structure

```
ui-lib2/
├── README.md                    # Main project README with API reference
├── docs/                        # 📚 All documentation lives here
│   ├── README.md               # Documentation index
│   ├── getting-started/        # Getting started guides
│   ├── guides/                 # How-to guides and tutorials
│   ├── reference/              # Technical reference documentation
│   └── architecture/           # Architecture and design docs
├── projects/
│   ├── ui-components/          # The library source code
│   └── demo/                   # Demo application
└── ...
```

## 🔧 Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ui-lib2/ui-lib2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the demo application**
   ```bash
   npm start
   # or
   ng serve demo
   ```
   Visit http://localhost:4200 to see the demo

4. **Build the library**
   ```bash
   ng build ui-components
   ```

## 🧪 Testing

Run tests for the library:
```bash
ng test ui-components
```

Run tests for a specific component:
```bash
ng test ui-components --include='**/button.spec.ts'
```

## 📝 Adding Documentation

### Where to Add Documentation

Choose the appropriate location based on content type:

- **Getting Started Docs** → `docs/getting-started/`
  - Quick start guides
  - Installation instructions
  - First-time user guides

- **Guides & Tutorials** → `docs/guides/`
  - How-to guides
  - Integration examples
  - Best practices
  - Publishing guides

- **Reference Documentation** → `docs/reference/`
  - API documentation
  - Technical specifications
  - Checklists and summaries

- **Architecture Documentation** → `docs/architecture/`
  - System design
  - Architecture diagrams
  - Component structure
  - Development workflows

### Documentation Guidelines

1. **Use clear, descriptive titles**
2. **Include practical examples**
3. **Add code snippets where helpful**
4. **Keep language simple and concise**
5. **Update the docs index** (`docs/README.md`) when adding new documentation
6. **Use markdown features**:
   - Headers for structure
   - Code blocks with syntax highlighting
   - Tables for structured data
   - Lists for steps or features
   - Emojis for visual appeal (sparingly)

### Template for New Documentation

```markdown
# [Document Title]

Brief introduction explaining what this document covers.

## Overview

More detailed explanation of the topic.

## [Main Section]

Content here with examples:

\`\`\`typescript
// Code example
import { Button } from 'ui-components';
\`\`\`

## [Additional Sections]

Additional content...

## See Also

- [Related Doc 1](./related-doc-1.md)
- [Related Doc 2](./related-doc-2.md)
```

## 🎨 Adding New Components

When adding a new component:

1. **Create component folder** in `projects/ui-components/src/lib/`
   ```
   new-component/
   ├── new-component.ts        # Component logic
   ├── new-component.html      # Template
   ├── new-component.scss      # Styles
   └── new-component.spec.ts   # Tests
   ```

2. **Export from public API** in `projects/ui-components/src/public-api.ts`
   ```typescript
   export * from './lib/new-component/new-component';
   ```

3. **Add to demo app** in `projects/demo/src/app/app.html`

4. **Update documentation**:
   - Add component API to main `README.md`
   - Add usage examples
   - Update relevant guides

5. **Write tests** in the `.spec.ts` file

6. **Build and verify**
   ```bash
   ng build ui-components
   ng serve demo
   ```

## 🎯 Component Development Guidelines

### Variants
Each component should support these variants:
- `material` - Material Design style
- `bootstrap` - Bootstrap-inspired style
- `minimal` - Minimal/clean style

### Styling
- Use `:host` selector for component wrapper
- Use CSS custom properties for themeable values
- Keep variant styles isolated using classes
- Ensure responsive design

### TypeScript
- Use strict typing
- Export interfaces for component inputs
- Add JSDoc comments for public APIs

### Accessibility
- Include proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Follow WCAG 2.1 guidelines

## 🚀 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   ng test ui-components
   ng build ui-components
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```
   
   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Test updates
   - `chore:` - Build/tooling changes

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Include screenshots if applicable

## 📋 Checklist Before Submitting

- [ ] Code builds without errors
- [ ] Tests pass
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] Code follows project style
- [ ] Commit messages follow conventions
- [ ] No console errors in demo app

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Keep discussions professional

## 💡 Need Help?

- Check the [documentation](docs/README.md)
- Review [existing issues](../../issues)
- Look at [merged pull requests](../../pulls?q=is%3Apr+is%3Amerged)

## 📧 Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- Questions about contributing

---

Thank you for contributing! 🎉
