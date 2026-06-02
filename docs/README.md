# 📚 UI Components Library - Documentation

Welcome to the UI Components Library documentation! This documentation is organized to help you find what you need quickly.

> 🌟 **New here?** Start with the **[Vision — why this library exists and where it's going](VISION.md)**.

## 📖 Documentation Structure

```
docs/
├── VISION.md            # Project vision, philosophy, and long-term goals
├── getting-started/     # Start here if you're new
├── guides/              # How-to guides and examples
├── research/            # Research notes and parity investigations
├── reference/           # API reference and technical details
└── architecture/        # System design and architecture
```

---

## 🚀 Getting Started

**New to the library? Start here:**

- **[Quick Start Guide](getting-started/QUICK_START.md)** - Get up and running in 5 minutes
  - View the demo application
  - Use the library in your projects
  - Common commands and workflows

- **[Testing Guide](getting-started/TEST_GUIDE.md)** - Test the library in a new project
  - Step-by-step testing instructions
  - Integration examples
  - Troubleshooting tips

---

## 📘 Guides

**Learn how to use and publish the library:**

- **[Integration Examples](guides/INTEGRATION_EXAMPLE.md)** - Real-world usage examples
  - Complete dashboard implementation
  - Event handling patterns
  - Styling integration
  - Best practices

- **[Publishing Guide](guides/PUBLISHING_GUIDE.md)** - Distribution and publishing
  - Publish to npm
  - Authentication setup (2FA/tokens)
  - Troubleshooting common errors

- **[Version Management](guides/VERSION_MANAGEMENT.md)** - Versioning and releases
  - Semantic versioning guide
  - Where to update version numbers
  - Publishing new versions
  - Pre-release versions
  - Version rollback strategies
  - Local development with npm link
  - Git-based distribution
  - Continuous development workflow

- **[Accessibility Testing Guide](guides/ACCESSIBILITY_TESTING.md)** - Manual and automated a11y checks
  - Tools and libraries for testing
  - Common accessibility issues
  - Fixing accessibility bugs

- **[Bundle Size Tracking](guides/BUNDLE_SIZE_TRACKING.md)** - Size budgets and CI guidance
  - Manual size checks
  - CI integration examples

- **[Storybook Guide](guides/STORYBOOK.md)** - Component development with Storybook
- **[Theming Guide](guides/THEMING_GUIDE.md)** - CSS variables, presets, and runtime customization
- **[Theme Editor Google Fonts](guides/THEME_EDITOR_GOOGLE_FONTS.md)** - Loading fonts in the demo editor
- **[Internationalisation Guide](guides/I18N_GUIDE.md)** - Localising strings, RTL, and the full translation-key catalogue

Storybook scripts set `NODE_ENV` via `cross-env` to avoid DefinePlugin warnings about conflicting values. If you update `package.json`, run `npm install` so `cross-env` is available.

```bash
npm run storybook
npm run build-storybook
```

---

## 📋 Reference

**Technical documentation and API reference:**

- **[Reference Documentation Index](reference/README.md)** - Organized technical documentation
- **[Documentation Status Tracker](DOC_STATUS.md)** - Authoritative status of component docs

#### 🎨 Design Systems
- **[Design Token System](reference/systems/DESIGN_TOKENS.md)** - Complete design token reference
  - Color palettes and semantic colors
  - Spacing and sizing tokens
  - Typography system
  - Border, shadow, and transition tokens
  - Type-safe token usage
  - Best practices and migration guide

- **[Layout System](reference/systems/LAYOUT_SYSTEM.md)** - Layout primitives documentation
  - Stack, Inline, Grid, Container APIs
  - Design tokens reference
  - Performance benefits
  - Composition patterns
  - Implementation: [LAYOUT_IMPLEMENTATION.md](reference/systems/LAYOUT_IMPLEMENTATION.md)

- **[Accessibility Guide](reference/systems/ACCESSIBILITY.md)** - WCAG 2.1 AA guidance and testing
- **[Performance Guide](reference/systems/PERFORMANCE.md)** - Bundle size and runtime guidance

#### 📦 Component Reference
- **[Badge Component](reference/components/BADGE.md)** - Badge/Tag component reference
  - Complete API documentation
  - Variants, colors, and sizes
  - Real-world examples
  - Performance characteristics
  - Implementation: [BADGE_IMPLEMENTATION.md](architecture/BADGE_IMPLEMENTATION.md)
- **[Button Component](reference/components/BUTTON.md)** - Button component reference
  - Variants, appearances, and sizes
  - Icons, badges, and loading states
  - Implementation: [BUTTON_IMPLEMENTATION.md](architecture/BUTTON_IMPLEMENTATION.md)
- **[Card Component](reference/components/CARD.md)** - Card component reference
  - Variants, elevations, and slots
  - Implementation: [CARD_IMPLEMENTATION.md](architecture/CARD_IMPLEMENTATION.md)
- **[Input Component](reference/components/INPUT.md)** - Input component reference
  - Floating labels and validation states
  - Form integration
  - Implementation: [INPUT_IMPLEMENTATION.md](architecture/INPUT_IMPLEMENTATION.md)
- **[SelectButton Component](reference/components/select-button.md)** - SelectButton component reference
  - Variants and sizes
  - Form integration and templates
  - Implementation: [SELECTBUTTON_IMPLEMENTATION.md](architecture/SELECTBUTTON_IMPLEMENTATION.md)
- **[Tabs Component](reference/components/TABS.md)** - Tabs component reference
  - Variants, lazy loading, navigation mode
  - Implementation: [TABS_IMPLEMENTATION.md](architecture/TABS_IMPLEMENTATION.md)
- **[Select Component](reference/components/SELECT.md)** - Select/combobox component reference
- **[Alert Component](reference/components/ALERT.md)** - Alert/status banner reference
- **[Layout Primitives](reference/components/LAYOUT.md)** - Stack/Inline/Grid/Container reference
- **[Dialog Component](reference/components/DIALOG.md)** - Dialog/overlay component reference
  - Implementation: [DIALOG_IMPLEMENTATION.md](implementation/DIALOG_IMPLEMENTATION.md)

#### 📋 Project Documentation
- **[Project Summary](reference/project/PROJECT_SUMMARY.md)** - Complete project overview
  - What was built
  - Component features
  - Project structure
  - Current status

- **[Update Log](reference/project/UPDATE_LOG.md)** - Version history
  - Angular 21 upgrade details
  - Breaking changes
  - Migration guide

- **[Verification Checklist](reference/project/VERIFICATION_CHECKLIST.md)** - Quality assurance
  - Feature verification
  - Testing checklist
  - Documentation validation

- **[API Reference](../README.md)** - Component API documentation
  - Button component API
  - Card component API
  - Props and configuration options
  - TypeScript interfaces

---

## 🌟 Vision & Strategy

**Understand the why behind the library and the path to launch:**

- **[Vision](VISION.md)** — Philosophy, strategic positioning, emotional design goals, and long-term roadmap
- **[Roadmap](ROADMAP.md)** — Phase-by-phase path from current hardening → Public Beta → v1.0 GA
- **[Launch Strategy](LAUNCH_STRATEGY.md)** — The sequenced build-in-public → seed → announce path
- **[Competitive Strategy](COMPETITIVE_STRATEGY.md)** — When and how to publish benchmark claims publicly (execute after Phase 3)
- **[Component Inventory Audit](COMPONENT_INVENTORY_AUDIT.md)** — Gap analysis across Angular Material, PrimeNG, Ng-Zorro, Ng-Bootstrap, shadcn/ui, Radix UI — what to add, what to exclude, what this library does that nobody else does

---

## 🏗️ Architecture

**Understand the system design:**

- **[Architecture Documentation](architecture/ARCHITECTURE.md)** - System architecture
  - Architecture diagrams
  - Component structure
  - Workflow diagrams
  - File dependencies
  - Development and distribution flow

---

---

## 🤖 AI Prompts & Quality System

Ready-to-use prompts and the scoring infrastructure for working with AI on this library:

- **[Component Definition of Done](../../platform/docs/guides/component-definition-of-done.md)** — **canonical ship gate** (lives in `platform`; this repo is legacy)
- **[Component Evolution Prompts](prompts/COMPONENT_EVOLUTION_PROMPTS.md)** — master prompt, 6-phase workflow (Architecture → DX → A11y → Performance → Composability → Emotional Polish)
- **[Scoring Criteria](SCORING_CRITERIA.md)** — 180+ binary checkboxes across 12 categories; port target: `platform/docs/standards/component-quality/`
- **[Component Quality Scores](COMPONENT_SCORES.md)** — the live scoreboard; scores for all 105 components, updated after each evolution session
- **[Competitive Benchmarks](COMPETITIVE_BENCHMARKS.md)** — per-component parity tables vs Angular Material, PrimeNG, Radix UI, Ark UI — evidence for Category 11 scores

---

## 🎯 Quick Navigation

### By Task

| I want to...                    | Go to...                                                              |
|---------------------------------|-----------------------------------------------------------------------|
| **Understand the why**          | [Vision](VISION.md)                                                   |
| **Get started quickly**         | [Quick Start Guide](getting-started/QUICK_START.md)                   |
| **Test in a new project**       | [Testing Guide](getting-started/TEST_GUIDE.md)                        |
| **See real-world examples**     | [Integration Examples](guides/INTEGRATION_EXAMPLE.md)                 |
| **Publish the library**         | [Publishing Guide](guides/PUBLISHING_GUIDE.md)                        |
| **Learn the component APIs**    | [API Reference](../README.md)                                         |
| **Understand the architecture** | [Architecture Docs](architecture/ARCHITECTURE.md)                     |
| **Get a project overview**      | [Project Summary](reference/project/PROJECT_SUMMARY.md)               |
| **See version upgrade history** | [Update Log](reference/project/UPDATE_LOG.md)                         |
| **Verify everything works**     | [Verification Checklist](reference/project/VERIFICATION_CHECKLIST.md) |
| **Ship a component (quality gate)** | [platform: component-definition-of-done.md](../../platform/docs/guides/component-definition-of-done.md) |
| **Understand Dialog internals** | [Dialog Implementation](implementation/DIALOG_IMPLEMENTATION.md)      |

### By Role

**👨‍💻 Developer (Using the Library)**
1. [Quick Start Guide](getting-started/QUICK_START.md) - How to use in your projects
2. [Theming Guide](guides/THEMING_GUIDE.md) - Customize variant, colors, shape, density
3. [API Reference](../README.md) - Component APIs and props
4. [Integration Examples](guides/INTEGRATION_EXAMPLE.md) - Real-world examples

**🚀 Contributor (Developing the Library)**
1. [Vision](VISION.md) - Understand the goals and philosophy
2. [Component Definition of Done (platform)](../../platform/docs/guides/component-definition-of-done.md) - Ship gate before marking any component complete
3. [Component Creation Guide](../COMPONENT_CREATION_GUIDE.md) - End-to-end workflow for new components
4. [Architecture Documentation](architecture/ARCHITECTURE.md) - System design
5. [Project Summary](reference/project/PROJECT_SUMMARY.md) - What's been built
6. [Update Log](reference/project/UPDATE_LOG.md) - Version history and upgrades
7. [Verification Checklist](reference/project/VERIFICATION_CHECKLIST.md) - Testing checklist

**📦 Publisher (Distributing the Library)**
1. [Publishing Guide](guides/PUBLISHING_GUIDE.md) - How to publish
2. [Verification Checklist](reference/project/VERIFICATION_CHECKLIST.md) - Pre-publish checks

---

## 🔄 Documentation Maintenance

This documentation is organized to scale with the project:

- **Add new getting-started docs** → `docs/getting-started/`
- **Add new guides or tutorials** → `docs/guides/`
- **Add API/reference docs** → `docs/reference/`
- **Add architecture docs** → `docs/architecture/`
- **Add research docs** → `docs/research/`

Keep the main [README.md](../README.md) focused on API reference and usage examples.

---

## 📝 Contributing to Docs

When adding documentation:

1. **Choose the right location** based on the content type
2. **Update this index** with links to new documentation
3. **Use clear, descriptive titles** for easy navigation
4. **Include practical examples** where applicable
5. **Keep docs up-to-date** with code changes

---

## 🆘 Need Help?

- Check the [Quick Start Guide](getting-started/QUICK_START.md) first
- Review the [API Reference](../README.md) for component details
- See [Integration Examples](guides/INTEGRATION_EXAMPLE.md) for usage patterns
- Consult the [Architecture Docs](architecture/ARCHITECTURE.md) for system design

---

**Happy coding! 🎉**
