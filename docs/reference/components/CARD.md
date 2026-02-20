# Card Component

## Overview

A flexible card container with optional header and footer slots, elevation levels, and variant styling. Designed for standalone use with OnPush change detection and CSS-variable theming.

**Import**
```typescript
import { Card } from 'ui-lib-custom/card';
```

**Location:** `projects/ui-lib-custom/src/lib/card/card.ts`

---

## Features

- ✅ Signal-powered inputs for reactive updates.
- 🎨 CSS variable theming with design-token fallbacks.
- ♿ Accessible content structure via semantic projection.
- 🧪 Unit-tested for slot projection and class application.
- 🎛️ Variants: material, bootstrap, minimal.
- 🧩 Header/footer slots, subtitle, icons, and close action.

---

## Usage
```typescript
import { Card } from 'ui-lib-custom/card';

@Component({
  standalone: true,
  imports: [Card],
  template: `
    <ui-lib-card>
      <div card-header>Title</div>
      Body content
      <div card-footer>Actions</div>
    </ui-lib-card>
  `
})
export class Example {}
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `CardVariant` | `'material'` | Visual style. |
| `elevation` | `CardElevation` | `'medium'` | Shadow intensity. |
| `bordered` | `boolean` | `false` | Adds a border. |
| `hoverable` | `boolean` | `false` | Adds hover shadow and lift. |
| `showHeader` | `boolean \| null` | `null` | Force header visibility (default shows if slot exists). |
| `showFooter` | `boolean \| null` | `null` | Force footer visibility (default shows if slot exists). |
| `shadow` | `string \| null` | `null` | Overrides shadow CSS vars. |
| `headerBg` | `string \| null` | `null` | Overrides header background CSS var. |
| `footerBg` | `string \| null` | `null` | Overrides footer background CSS var. |
| `headerIcon` | `SemanticIcon \| string \| null` | `null` | Optional icon shown in header. |
| `closable` | `boolean` | `false` | Shows a close icon and emits `closed`. |
| `subtitle` | `string \| null` | `null` | Optional subtitle under header slot. |

### Outputs

| Output | Type | Description |
| --- | --- | --- |
| `closed` | `void` | Emitted when the close icon is clicked. |

### Types
```typescript
type CardVariant = 'material' | 'bootstrap' | 'minimal';
type CardElevation = 'none' | 'low' | 'medium' | 'high';
```

---

## Content Projection Slots

Cards project content using attribute selectors:

```html
<ui-lib-card>
  <div card-header>Title</div>
  <p>Content goes here</p>
  <div card-footer>Actions</div>
</ui-lib-card>
```

| Slot | Selector | Purpose |
| --- | --- | --- |
| Header | `[card-header]` | Title/header area (optional). |
| Body | default slot | Main content. |
| Footer | `[card-footer]` | Actions or metadata (optional). |

---

## Theming & CSS Variables

| Variable | Purpose |
| --- | --- |
| `--uilib-card-bg` | Card background. |
| `--uilib-card-text-color` | Card text color. |
| `--uilib-card-border` | Card border color. |
| `--uilib-card-border-width` | Border width. |
| `--uilib-card-radius` | Card radius. |
| `--uilib-card-header-padding` | Header padding. |
| `--uilib-card-body-padding` | Body padding. |
| `--uilib-card-footer-padding` | Footer padding. |
| `--uilib-card-header-bg` | Header background. |
| `--uilib-card-footer-bg` | Footer background. |
| `--uilib-card-shadow` | Base shadow. |
| `--uilib-card-shadow-hover` | Hover shadow. |
| `--uilib-card-shadow-none` | No shadow. |
| `--uilib-card-shadow-low` | Low shadow. |
| `--uilib-card-shadow-medium` | Medium shadow. |
| `--uilib-card-shadow-high` | High shadow. |

---

## Examples

### Basic Usage
```html
<ui-lib-card>
  <div card-header>Card Title</div>
  <p>Cards can host arbitrary content and actions.</p>
  <div card-footer>Footer actions</div>
</ui-lib-card>
```

### Variant + Elevation
```html
<ui-lib-card variant="bootstrap" elevation="high" [bordered]="true">
  <div card-header>Bootstrap Card</div>
  Content
</ui-lib-card>
```

### Hoverable Minimal
```html
<ui-lib-card variant="minimal" [hoverable]="true">
  <div card-header>Minimal</div>
  Hover me
</ui-lib-card>
```

### Header Icon + Close
```html
<ui-lib-card [headerIcon]="'info'" [closable]="true" (closed)="onClose()">
  <div card-header>Info</div>
  Closable card body
</ui-lib-card>
```

---

## Scoped Theming

Override the theme for a specific card and its children:

```html
<!-- Dark card in light page -->
<ui-lib-card theme="dark">
  <p>This card uses dark theme</p>
  <ui-lib-button>Also dark</ui-lib-button>
</ui-lib-card>

<!-- Custom colors -->
<ui-lib-card [theme]="{ colors: { primary: '#ff5722' } }">
  <ui-lib-button color="primary">Orange button</ui-lib-button>
</ui-lib-card>

<!-- Full preset -->
<ui-lib-card [theme]="{ preset: customPreset }">
  Fully customized
</ui-lib-card>
```

---

## Accessibility

### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Focus interactive elements inside the card |

### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| n/a | Card is a container; apply ARIA to child controls |

### Focus Management
- Card does not trap focus.
- Focus indicators belong to child controls.

### Screen Reader Behavior
- Use headings in header slots for clear structure.
- Close icon should have an accessible label via surrounding context.

### Known Issues & Solutions
- Avoid using a bare icon as the only affordance for close; pair with text or aria label.

---

## Best Practices

**Do:**
- Keep header content concise and use the subtitle for secondary text.
- Use `elevation` and `bordered` consistently within a page.
- Use `hoverable` only when the card is interactive.

**Don’t:**
- Put critical actions only inside the header icon without additional labels.
- Mix multiple variants in the same list of cards without a clear reason.

---

## Related

- `docs/reference/components/BUTTON.md`
- `docs/reference/components/ICON.md`
- `docs/reference/components/ACCORDION.md`
