# Systems Documentation

System-level documentation for design systems, architectural patterns, and cross-cutting concerns.

---

## 🎨 Available Systems

### CSS Architecture & Theming

**File:** [CSS_ARCHITECTURE.md](CSS_ARCHITECTURE.md)

**Status:** ✅ Refactored 2026-05-23

**Includes:**

- Token hierarchy (universal → light/dark → component → variant)
- Globally registered scale tokens (radius, spacing, font-size, shadows)
- Density system (`data-density` attribute)
- Dark mode architecture and known parallel systems
- Competitive comparison vs PrimeNG and Angular Material
- CSS variable naming convention and component SCSS pattern
- Anti-patterns reference
- Remaining debt and roadmap

**Use for:** Understanding how the theming system works, how to override it, and where it is heading

---

### Design Token System

**File:** [DESIGN_TOKENS.md](DESIGN_TOKENS.md)

**Status:** ✅ Complete

**Includes:**

- 177+ design tokens across 8 categories
- Color palettes (primary, secondary, success, danger, warning, info, neutral)
- Spacing tokens (0-20 scale)
- Typography tokens (font sizes, weights, line heights)
- Border tokens (radius, width)
- Shadow tokens (elevation system)
- Transition tokens (duration, timing)
- Z-index tokens (stacking context)

**Use for:** Consistent styling across all components

---

### Layout System

**Files:**

- [LAYOUT_SYSTEM.md](LAYOUT_SYSTEM.md) - Complete API reference
- [LAYOUT_IMPLEMENTATION.md](LAYOUT_IMPLEMENTATION.md) - Implementation details

**Status:** ✅ Complete

**Includes:**

- Stack component (vertical/horizontal layouts)
- Inline component (wrapping inline layouts)
- Grid component (CSS Grid with columns)
- Container component (centered max-width)

**Use for:** Building layouts without ad-hoc CSS

---

### Theming System

**File:** [THEMING.md](THEMING.md)

**Status:** ✅ Complete

**Includes:**

- Light/dark presets via CSS variables
- `data-theme` switching guidance
- Brand override example with `--uilib-*` vars
- Key variable groups: page/surface, topbar, buttons, badges, cards, layout spacing/containers

**Use for:** Runtime theme switching and brand customization without code changes

---

### Accessibility System

**File:** [ACCESSIBILITY.md](ACCESSIBILITY.md)

**Status:** ✅ Complete

**Includes:**

- WCAG 2.1 AA principles
- Per-component accessibility expectations
- Keyboard and screen reader guidance
- Testing checklist and tooling pointers

**Use for:** Ensuring accessible usage and QA across components

---

### Performance System

**File:** [PERFORMANCE.md](PERFORMANCE.md)

**Status:** ✅ Complete

**Includes:**

- Bundle size guidance and tracking
- Runtime performance characteristics
- Consumer best practices

**Use for:** Tracking and optimizing size and runtime behavior

---

## 📋 What Goes Here

The **systems** folder contains documentation for:

### ✅ DO Include:

- Design systems (tokens, themes)
- Architectural patterns (layout systems)
- Shared utilities and helpers
- Cross-cutting concerns
- System-wide configurations

### ❌ DON'T Include:

- Individual component docs (use `components/` folder)
- Project-level docs (use `project/` folder)
- Getting started guides (use `getting-started/` folder)
- How-to guides (use `guides/` folder)

---

## 🎯 System Documentation Standards

Each system should have:

### 1. Main Documentation (`SYSTEM_NAME.md`)

**Purpose:** Complete reference for the system

**Should include:**

- System overview and purpose
- Complete API/token reference
- Usage examples
- Best practices
- Type safety information
- Migration guides

### 2. Implementation Details (optional: `SYSTEM_NAME_IMPLEMENTATION.md`)

**Purpose:** Technical implementation notes

**Should include:**

- Architecture decisions
- Performance characteristics
- Integration notes
- Build/test status
- Future enhancements

---

## 🔗 Related Documentation

- **Components:** [../components/README.md](../components/README.md)
- **Project Docs:** [../project/README.md](../project/README.md)
- **Getting Started:** [../../getting-started/QUICK_START.md](../../getting-started/QUICK_START.md)

---

## 📊 Systems Overview

| System        | Description               | Tokens/Components    | Status      |
| ------------- | ------------------------- | -------------------- | ----------- |
| Design Tokens | Consistent styling values | 177+ tokens          | ✅ Complete |
| Layout        | Layout primitives         | 4 components         | ✅ Complete |
| Accessibility | WCAG/ARIA guidance        | Components + testing | ✅ Complete |
| Performance   | Size/runtime guidance     | Components + builds  | ✅ Complete |

---

## ✍️ Adding New Systems

When documenting a new system:

1. Create `SYSTEM_NAME.md` with complete reference
2. Create `SYSTEM_NAME_IMPLEMENTATION.md` if needed
3. Update this README with system entry
4. Update [../README.md](../README.md) with links
5. Ensure cross-references are correct

---

**← Back to:** [Reference Index](../README.md) | [Main Documentation](../../README.md)
