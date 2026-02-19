# Components Reference

Individual component documentation with complete API references and implementation details.

---

## 📦 Available Components

### Badge
**Files:**
- [BADGE.md](BADGE.md) - Complete API reference and usage guide
- [BADGE_IMPLEMENTATION.md](BADGE_IMPLEMENTATION.md) - Implementation details and architecture

**Status:** ✅ Complete

**Quick Links:**
- [Live Demo](http://localhost:4200/badges)
- [Source Code](../../projects/ui-lib-custom/src/lib/badge/)

---

### Accordion
**Files:**
- [ACCORDION.md](ACCORDION.md) - Complete API reference and usage guide
- [ACCORDION_IMPLEMENTATION.md](ACCORDION_IMPLEMENTATION.md) - Implementation details and architecture

**Status:** ✅ Complete

**Quick Links:**
- [Live Demo](http://localhost:4200/accordion)
- [Source Code](../../projects/ui-lib-custom/src/lib/accordion/)

---

### Button
**Files:**
- [BUTTON.md](BUTTON.md) - Complete API reference and usage guide
- [BUTTON_IMPLEMENTATION.md](BUTTON_IMPLEMENTATION.md) - Implementation details and architecture

**Status:** ✅ Complete

**Quick Links:**
- [Live Demo](http://localhost:4200/buttons)
- [Source Code](../../projects/ui-lib-custom/src/lib/button/)

---

### Card
**Files:**
- [CARD.md](CARD.md) - API reference and usage guide
- [CARD_IMPLEMENTATION.md](CARD_IMPLEMENTATION.md) - Implementation details and architecture

**Status:** ✅ Complete

**Quick Links:**
- [Live Demo](http://localhost:4200/cards)
- [Source Code](../../projects/ui-lib-custom/src/lib/card/)

---

### Checkbox
**Files:**
- [CHECKBOX.md](CHECKBOX.md) - API reference and usage guide
- _Implementation doc pending_

**Status:** ⚠️ API only

**Quick Links:**
- [Source Code](../../projects/ui-lib-custom/src/lib/checkbox/)

---

### Icon
**Files:**
- [ICON.md](ICON.md) - API reference and usage guide
- _Implementation doc pending_

**Status:** ⚠️ API only

**Quick Links:**
- [Source Code](../../projects/ui-lib-custom/src/lib/icon/)

---

### Icon Button
**Files:**
- [ICON_BUTTON.md](ICON_BUTTON.md) - API reference and usage guide
- _Implementation doc pending_

**Status:** ⚠️ API only

**Quick Links:**
- [Source Code](../../projects/ui-lib-custom/src/lib/icon-button/)

---

### Input
**Files:**
- [INPUT.md](INPUT.md) - API reference and usage guide
- [INPUT_IMPLEMENTATION.md](INPUT_IMPLEMENTATION.md) - Implementation details and architecture

**Status:** ✅ Complete

**Quick Links:**
- [Live Demo](http://localhost:4200/inputs)
- [Source Code](../../projects/ui-lib-custom/src/lib/input/)

---

### Select
**Files:**
- _Docs pending_

**Status:** ❌ Missing

**Quick Links:**
- [Source Code](../../projects/ui-lib-custom/src/lib/select/)

---

### SelectButton
**Files:**
- [SELECTBUTTON.md](SELECTBUTTON.md) - Complete API reference and usage guide
- [SELECTBUTTON_IMPLEMENTATION.md](SELECTBUTTON_IMPLEMENTATION.md) - Implementation details and architecture

**Status:** ✅ Complete

**Quick Links:**
- [Live Demo](http://localhost:4200/select-buttons)
- [Source Code](../../projects/ui-lib-custom/src/lib/select-button/)

---

### Tabs
**Files:**
- [TABS.md](TABS.md) - API reference and usage guide
- [TABS_IMPLEMENTATION.md](TABS_IMPLEMENTATION.md) - Implementation details and architecture

**Status:** ✅ Complete

**Quick Links:**
- [Source Code](../../projects/ui-lib-custom/src/lib/tabs/)

---

### Layout
**Files:**
- _Docs pending (Stack/Inline/Grid/Container)_

**Status:** ❌ Missing

**Quick Links:**
- [Source Code](../../projects/ui-lib-custom/src/lib/layout/)

---

## 📋 Documentation Structure

Each component should have two documentation files:

### 1. API Reference (`COMPONENT_NAME.md`)
**Purpose:** User-facing documentation

**Should include:**
- Component overview and features
- Complete API reference (inputs, outputs, types)
- Usage examples (basic and advanced)
- Real-world use cases
- Composition examples
- Best practices and anti-patterns
- Browser support and accessibility

### 2. Implementation Details (`COMPONENT_NAME_IMPLEMENTATION.md`)
**Purpose:** Developer-facing documentation

**Should include:**
- Architecture decisions and principles followed
- Performance characteristics (bundle size, runtime)
- Build and test status
- Integration notes
- File structure and statistics
- Comparison with similar components
- Future enhancements

---

## 🎯 Quick Reference

| Component | Description | Variants | Colors | Sizes | Status |
|-----------|-------------|----------|--------|-------|--------|
| Badge | Labels, status, counts | 3 | 7 | 3 | ✅ Complete |
| Button | Action buttons | 3 | 5 | 3 | ✅ Complete |
| Card | Content container | 3 | - | - | ✅ Complete |
| Accordion | Expandable panels | 3 | - | 3 | ✅ Complete |
| SelectButton | Segmented selection control | 3 | - | 3 | ✅ Complete |
| Checkbox | Form control | 3 | - | 3 | ⚠️ API only |
| Icon | Icon rendering | - | - | 6 | ⚠️ API only |
| Icon Button | Icon-only button | 3 | 5 | 3 | ⚠️ API only |
| Input | Form control | 3 | - | - | ✅ Complete |
| Select | Dropdown select | 3 | - | - | ❌ Missing |
| Tabs | Navigation | 3 | - | - | ✅ Complete |
| Layout | Stack/Inline/Grid/Container | - | - | - | ❌ Missing |

---

## 🔗 Related Documentation

- **Design Tokens:** [../systems/DESIGN_TOKENS.md](../systems/DESIGN_TOKENS.md)
- **Layout System:** [../systems/LAYOUT_SYSTEM.md](../systems/LAYOUT_SYSTEM.md)
- **Project Summary:** [../project/PROJECT_SUMMARY.md](../project/PROJECT_SUMMARY.md)

---

## ✍️ Adding New Components

When documenting a new component:

1. Create `COMPONENT_NAME.md` with API reference
2. Create `COMPONENT_NAME_IMPLEMENTATION.md` with implementation details
3. Update this README with component entry
4. Update [../README.md](../README.md) with links
5. Update [../../README.md](../../README.md) if needed

---

**← Back to:** [Reference Index](../README.md) | [Main Documentation](../../README.md)
