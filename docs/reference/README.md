# Reference Documentation

Complete API reference and technical documentation for the UI Components Library.

---

## 📁 Directory Structure

### 📦 Components (`components/`)
Individual component documentation with complete API references, examples, and implementation details.

- **[Badge Component](components/BADGE.md)** - Badge/tag component for labels and status
  - API reference, variants, colors, sizes
  - Real-world examples
  - Implementation details: [BADGE_IMPLEMENTATION.md](components/BADGE_IMPLEMENTATION.md)
- **[Button Component](components/BUTTON.md)** - Button component reference
  - Variants, appearances, sizes
  - Icons, badges, loading
  - Implementation details: [BUTTON_IMPLEMENTATION.md](components/BUTTON_IMPLEMENTATION.md)
- **[Card Component](components/CARD.md)** - Card component reference
  - Variants, elevations, slots
  - Implementation details: [CARD_IMPLEMENTATION.md](components/CARD_IMPLEMENTATION.md)
- **[Input Component](components/INPUT.md)** - Input component reference
  - Floating labels, validation states
  - Implementation details: [INPUT_IMPLEMENTATION.md](components/INPUT_IMPLEMENTATION.md)
- **[SelectButton Component](components/SELECTBUTTON.md)** - SelectButton component reference
  - Variants, sizes, templates
  - Implementation details: [SELECTBUTTON_IMPLEMENTATION.md](components/SELECTBUTTON_IMPLEMENTATION.md)
- **[Tabs Component](components/TABS.md)** - Tabs component reference
  - Variants, lazy loading, navigation mode
  - Implementation details: [TABS_IMPLEMENTATION.md](components/TABS_IMPLEMENTATION.md)

---

### 🎨 Systems (`systems/`)
System-level documentation for design systems and architectural patterns.

- **[Design Token System](systems/DESIGN_TOKENS.md)** - Complete design token reference
  - Color palettes (177+ tokens)
  - Spacing, sizing, typography
  - Border, shadow, transition tokens
  - Type-safe usage guide

- **[Layout System](systems/LAYOUT_SYSTEM.md)** - Layout primitives documentation
  - Stack, Inline, Grid, Container APIs
  - Composition patterns
  - Performance benefits
  - Implementation details: [LAYOUT_IMPLEMENTATION.md](systems/LAYOUT_IMPLEMENTATION.md)

- **[Theming Guide](systems/THEMING.md)** – Light/Dark presets, CSS vars, brand overrides

---

### 📋 Project (`project/`)
Project-level documentation, changelogs, and verification tools.

- **[Project Summary](project/PROJECT_SUMMARY.md)** - Complete project overview
  - What was built
  - Component features
  - Project structure
  - Current status

- **[Update Log](project/UPDATE_LOG.md)** - Version history and upgrades
  - Angular 21 upgrade
  - PrimeNG updates
  - Breaking changes

- **[Verification Checklist](project/VERIFICATION_CHECKLIST.md)** - Quality assurance
  - Feature verification
  - Testing checklist
  - Documentation validation

---

## 📚 Quick Links by Topic

### 🎯 For Component Usage
Start here if you want to use existing components:
1. [Design Tokens](systems/DESIGN_TOKENS.md) - Understand the token system
2. [Layout System](systems/LAYOUT_SYSTEM.md) - Learn layout primitives
3. [Components Index](components/README.md) - Full component list

### 🏗️ For Development
Start here if you're developing new components:
1. [Design Tokens](systems/DESIGN_TOKENS.md) - Use consistent values
2. [Layout Implementation](systems/LAYOUT_IMPLEMENTATION.md) - Architecture patterns
3. [Badge Implementation](components/BADGE_IMPLEMENTATION.md) - Example implementation

### 📊 For Project Management
Start here for project overview and status:
1. [Project Summary](project/PROJECT_SUMMARY.md) - Overall status
2. [Update Log](project/UPDATE_LOG.md) - Version history
3. [Verification Checklist](project/VERIFICATION_CHECKLIST.md) - Quality checks

---

## 🔍 Documentation Index

### Components
| Component | API Docs | Implementation | Status |
|-----------|----------|----------------|--------|
| Badge | [BADGE.md](components/BADGE.md) | [BADGE_IMPLEMENTATION.md](components/BADGE_IMPLEMENTATION.md) | ✅ Complete |
| Button | [BUTTON.md](components/BUTTON.md) | [BUTTON_IMPLEMENTATION.md](components/BUTTON_IMPLEMENTATION.md) | ✅ Complete |
| Card | [CARD.md](components/CARD.md) | [CARD_IMPLEMENTATION.md](components/CARD_IMPLEMENTATION.md) | ✅ Complete |
| Input | [INPUT.md](components/INPUT.md) | [INPUT_IMPLEMENTATION.md](components/INPUT_IMPLEMENTATION.md) | ✅ Complete |
| SelectButton | [SELECTBUTTON.md](components/SELECTBUTTON.md) | [SELECTBUTTON_IMPLEMENTATION.md](components/SELECTBUTTON_IMPLEMENTATION.md) | ✅ Complete |
| Tabs | [TABS.md](components/TABS.md) | [TABS_IMPLEMENTATION.md](components/TABS_IMPLEMENTATION.md) | ✅ Complete |
| Checkbox | [CHECKBOX.md](components/CHECKBOX.md) | - | ⚠️ API only |
| Icon | [ICON.md](components/ICON.md) | - | ⚠️ API only |
| Icon Button | [ICON_BUTTON.md](components/ICON_BUTTON.md) | - | ⚠️ API only |
| Select | - | - | ❌ Missing |
| Layout | - | - | ❌ Missing |

### Systems
| System | Documentation | Implementation | Status |
|--------|---------------|----------------|--------|
| Design Tokens | [DESIGN_TOKENS.md](systems/DESIGN_TOKENS.md) | - | ✅ Complete |
| Layout | [LAYOUT_SYSTEM.md](systems/LAYOUT_SYSTEM.md) | [LAYOUT_IMPLEMENTATION.md](systems/LAYOUT_IMPLEMENTATION.md) | ✅ Complete |

---

## 📖 Documentation Standards

Each component should have two types of documentation:

### 1. **API Reference** (`components/COMPONENT_NAME.md`)
User-facing documentation:
- Overview and features
- Complete API reference
- Usage examples
- Real-world use cases
- Best practices

### 2. **Implementation Details** (`components/COMPONENT_NAME_IMPLEMENTATION.md`)
Developer-facing documentation:
- Architecture decisions
- Performance characteristics
- Build and test status
- Integration notes
- Future enhancements

---

## 🎯 Organization Principles

### Components Folder
- One file per component
- User-focused documentation
- API reference and examples

### Systems Folder
- Cross-cutting concerns
- Design systems
- Architectural patterns
- Shared utilities

### Project Folder
- Project-level information
- Not component-specific
- Changelogs and summaries
- Quality assurance

---

## 🔄 Navigation

- **← Back:** [Main Documentation](../README.md)
- **→ Getting Started:** [Quick Start](../getting-started/QUICK_START.md)
- **→ Guides:** [Integration Examples](../guides/INTEGRATION_EXAMPLE.md)

---

## 📝 Contributing

When adding new documentation:

1. **Components** - Add both API docs and implementation details
2. **Systems** - Document architectural patterns
3. **Project** - Update project summary and changelogs

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.
