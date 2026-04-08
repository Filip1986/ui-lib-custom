# Documentation Map

Quick reference guide to navigate the UI Components Library documentation.

---

## 📚 Documentation Structure

```
docs/
├── README.md                          # Main documentation index
├── getting-started/                   # Quick start guides
│   ├── QUICK_START.md                # 5-minute getting started
│   ├── LAYOUT_QUICK_START.md         # Layout primitives guide
│   └── TEST_GUIDE.md                 # Testing guide
├── guides/                            # How-to guides
│   ├── INTEGRATION_EXAMPLE.md        # Real-world integration
│   ├── PUBLISHING_GUIDE.md           # npm publishing
│   ├── VERSION_MANAGEMENT.md         # Version control
│   ├── ACCESSIBILITY_TESTING.md      # Accessibility testing guide
│   └── ...
├── reference/                         # Technical reference
│   ├── README.md                     # Reference index
│   ├── components/                   # Component docs
│   │   ├── README.md                 # Components index
│   │   ├── BADGE.md                  # Badge API reference
│   │   └── BADGE_IMPLEMENTATION.md   # Badge implementation
│   ├── systems/                      # System docs
│   │   ├── README.md                 # Systems index
│   │   ├── DESIGN_TOKENS.md          # Design token reference
│   │   ├── ACCESSIBILITY.md          # Accessibility guide
│   │   ├── PERFORMANCE.md            # Performance guide
│   │   ├── LAYOUT_SYSTEM.md          # Layout API reference
│   │   ├── THEMING.md                # Theming guide
│   │   └── LAYOUT_IMPLEMENTATION.md  # Layout implementation
│   └── project/                      # Project docs
│       ├── README.md                 # Project index
│       ├── PROJECT_SUMMARY.md        # Project overview
│       ├── UPDATE_LOG.md             # Version history
│       └── VERIFICATION_CHECKLIST.md # QA checklist
└── architecture/                      # Architecture docs
    └── ARCHITECTURE.md               # System architecture
```

---

## 🎯 Quick Navigation

### 🚀 I want to get started quickly

→ [docs/getting-started/QUICK_START.md](docs/getting-started/QUICK_START.md)

### 📦 I want to use a specific component

→ [docs/reference/components/](docs/reference/components/)

- [Badge](docs/reference/components/BADGE.md)
- [Accordion](docs/reference/components/ACCORDION.md)
- [Button](docs/reference/components/BUTTON.md)
- [Card](docs/reference/components/CARD.md)
- [Input](docs/reference/components/INPUT.md)
- [SelectButton](docs/reference/components/SELECTBUTTON.md)
- [Tabs](docs/reference/components/TABS.md)
- Checkbox (API only)
- Icon (API only)
- Icon Button (API only)
- Select (missing)
- Layout primitives (missing)

### 🎨 I want to understand the design system

→ [docs/reference/systems/DESIGN_TOKENS.md](docs/reference/systems/DESIGN_TOKENS.md)
→ [docs/reference/systems/ACCESSIBILITY.md](docs/reference/systems/ACCESSIBILITY.md)
→ [docs/reference/systems/PERFORMANCE.md](docs/reference/systems/PERFORMANCE.md)

### 📐 I want to build layouts

→ [docs/reference/systems/LAYOUT_SYSTEM.md](docs/reference/systems/LAYOUT_SYSTEM.md)

### 🎨 I want to style my components

→ [docs/reference/systems/THEMING.md](docs/reference/systems/THEMING.md)

### 🏗️ I want to create a new component

1. [COMPONENT_CREATION_GUIDE.md](COMPONENT_CREATION_GUIDE.md) - End-to-end component creation workflow
2. [docs/reference/systems/DESIGN_TOKENS.md](docs/reference/systems/DESIGN_TOKENS.md) - Use design tokens
3. [docs/reference/components/BADGE_IMPLEMENTATION.md](docs/reference/components/BADGE_IMPLEMENTATION.md) - See example implementation
4. [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md) - Follow architecture

### 📊 I want project information

→ [docs/reference/project/PROJECT_SUMMARY.md](docs/reference/project/PROJECT_SUMMARY.md)

### 📖 I want to publish the library

→ [docs/guides/PUBLISHING_GUIDE.md](docs/guides/PUBLISHING_GUIDE.md)

### ♿ I want to test accessibility

→ [docs/guides/ACCESSIBILITY_TESTING.md](docs/guides/ACCESSIBILITY_TESTING.md)

---

## 📁 Documentation Categories

### Getting Started

**Path:** `docs/getting-started/`

**Purpose:** Quick start guides for new users

**Contains:**

- Quick start guides
- Testing guides
- Setup instructions

---

### Guides

**Path:** `docs/guides/`

**Purpose:** Step-by-step how-to guides

**Contains:**

- Integration examples
- Publishing guides
- Version management
- Accessibility testing guide
- Best practices

---

### Reference

**Path:** `docs/reference/`

**Purpose:** Complete technical reference

**Organized into:**

#### Components (`docs/reference/components/`)

- Individual component API docs
- Implementation details
- Real-world examples

#### Systems (`docs/reference/systems/`)

- Design token system
- Layout system
- Theming guide
- Cross-cutting concerns

#### Project (`docs/reference/project/`)

- Project summaries
- Changelogs
- Quality checklists

---

### Architecture

**Path:** `docs/architecture/`

**Purpose:** System design and architecture

**Contains:**

- Architecture overview
- Design principles
- Technical decisions

---

## 🔍 Finding What You Need

### By Role

#### 👨‍💻 Developer (using the library)

1. [Quick Start](docs/getting-started/QUICK_START.md)
2. [Design Tokens](docs/reference/systems/DESIGN_TOKENS.md)
3. [Component Reference](docs/reference/components/)

#### 🏗️ Contributor (building components)

1. [COMPONENT_CREATION_GUIDE.md](COMPONENT_CREATION_GUIDE.md)
2. [Architecture](docs/architecture/ARCHITECTURE.md)
3. [Design Tokens](docs/reference/systems/DESIGN_TOKENS.md)
4. [Badge Implementation](docs/reference/components/BADGE_IMPLEMENTATION.md) (example)

#### 📦 Publisher (releasing the library)

1. [Publishing Guide](docs/guides/PUBLISHING_GUIDE.md)
2. [Version Management](docs/guides/VERSION_MANAGEMENT.md)
3. [Update Log](docs/reference/project/UPDATE_LOG.md)

#### 🎯 Project Manager

1. [Project Summary](docs/reference/project/PROJECT_SUMMARY.md)
2. [Verification Checklist](docs/reference/project/VERIFICATION_CHECKLIST.md)
3. [Update Log](docs/reference/project/UPDATE_LOG.md)

---

### By Topic

#### Design System

- [Design Tokens](docs/reference/systems/DESIGN_TOKENS.md) - Color, spacing, typography
- [Layout System](docs/reference/systems/LAYOUT_SYSTEM.md) - Layout primitives
- [Accessibility Guide](docs/reference/systems/ACCESSIBILITY.md) - WCAG/ARIA guidance and testing
- [Performance Guide](docs/reference/systems/PERFORMANCE.md) - Bundle size and runtime guidance

#### Components

- [Badge](docs/reference/components/BADGE.md) - Badge API
- [Components Index](docs/reference/components/README.md) - All components

#### Performance

- [Badge Implementation](docs/reference/components/BADGE_IMPLEMENTATION.md) - Performance details
- [Layout Implementation](docs/reference/systems/LAYOUT_IMPLEMENTATION.md) - Architecture

#### Integration

- [Integration Examples](docs/guides/INTEGRATION_EXAMPLE.md) - Real-world usage
- [Quick Start](docs/getting-started/QUICK_START.md) - Getting started
- [Accessibility Testing Guide](docs/guides/ACCESSIBILITY_TESTING.md) - Manual and automated checks

---

## 📊 Documentation Status

| Component | API Docs | Implementation | Status |
| --- | --- | --- | --- |
| Badge | ✅ | ✅ | Complete |
| Button | ✅ | ✅ | Complete |
| Card | ✅ | ✅ | Complete |
| Accordion | ✅ | ✅ | Complete |
| Tabs | ✅ | ✅ | Complete |
| Input | ✅ | ✅ | Complete |
| SelectButton | ✅ | ✅ | Complete |
| Checkbox | ✅ | ❌ | API only |
| Icon | ✅ | ❌ | API only |
| Icon Button | ✅ | ❌ | API only |
| Select | ❌ | ❌ | Missing |
| Layout | ❌ | ❌ | Missing |

---

## 🎯 Documentation Principles

### Organization

- **By category** - Components, Systems, Project
- **By audience** - Users vs Contributors
- **By purpose** - Reference vs Guides

### Standards

- **Complete** - Cover all features and use cases
- **Clear** - Easy to understand and follow
- **Current** - Keep up to date with changes
- **Consistent** - Follow same structure and format

### Cross-references

- Link between related docs
- Provide navigation aids
- Include "back to" links

---

## ✍️ Contributing to Documentation

When adding documentation:

1. **Choose the right folder**
   - Components → `docs/reference/components/`
   - Systems → `docs/reference/systems/`
   - Project → `docs/reference/project/`
   - Guides → `docs/guides/`

2. **Follow the structure**
   - Use README files for indexes
   - Maintain consistent formatting
   - Include navigation links

3. **Update all indexes**
   - Category README
   - Reference README
   - Main docs README
   - This documentation map

4. **Cross-reference**
   - Link to related docs
   - Provide context
   - Help users navigate

---

## 🔗 Quick Links

- **Main Docs:** [docs/README.md](docs/README.md)
- **Reference Index:** [docs/reference/README.md](docs/reference/README.md)
- **Components:** [docs/reference/components/README.md](docs/reference/components/README.md)
- **Systems:** [docs/reference/systems/README.md](docs/reference/systems/README.md)
- **Project:** [docs/reference/project/README.md](docs/reference/project/README.md)

---

**Need help?** Check [docs/README.md](docs/README.md) for complete documentation index.
