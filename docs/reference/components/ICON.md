# Icon Component

## Overview

A unified icon wrapper powered by Ng Icons with semantic names, variant-aware library selection, and token-aligned sizing. Supports interactive usage with keyboard activation when `clickable` is enabled.

**Import**
```typescript
import { Icon } from 'ui-lib-custom/icon';
```

**Location:** `projects/ui-lib-custom/src/lib/icon/icon.ts`

---

## Features

- ✅ Semantic icon names with variant-based library resolution.
- 🎨 CSS variable theming for color and size.
- ♿ Accessible interactive mode with keyboard activation.
- 🧩 Optional explicit library override.

---

## Basic Usage

```html
<ui-lib-icon name="search" />
```

Variant-aware:
```html
<ui-lib-icon name="menu" variant="material" />
```

Interactive icon:
```html
<ui-lib-icon name="close" [clickable]="true" ariaLabel="Close" (click)="onClose()" />
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string \| SemanticIcon` | required | Semantic or concrete icon name. |
| `size` | `IconSize` | `'md'` | Icon size (`xs`-`2xl`). |
| `color` | `string \| null` | `null` | CSS color value (falls back to currentColor). |
| `library` | `IconLibrary \| null` | `null` | Force a specific library. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Resolve icon based on component variant. |
| `clickable` | `boolean` | `false` | Adds interactive affordance and keyboard handling. |
| `semantic` | `boolean` | `false` | Force treating `name` as semantic. |
| `ariaLabel` | `string \| null` | `null` | Accessible label for interactive use. |

### Outputs

None. Use `(click)` when `clickable` is true.

---

## Theming & CSS Variables

| Variable | Purpose |
| --- | --- |
| `--uilib-icon-color` | Base icon color (falls back to currentColor). |
| `--uilib-icon-transition` | Transition used for hover/interaction. |
| `--uilib-icon-size-xs` | Extra-small size. |
| `--uilib-icon-size-sm` | Small size. |
| `--uilib-icon-size-md` | Medium size. |
| `--uilib-icon-size-lg` | Large size. |
| `--uilib-icon-size-xl` | Extra-large size. |
| `--uilib-icon-size-2xl` | 2x large size. |

### Theme Override Example

```scss
[data-theme='brand-x'] {
  --uilib-icon-color: #38bdf8;
}
```

---

## Accessibility

- When `clickable` is true, the icon renders as an interactive element with `role="button"` and `tabindex="0"`.
- Space/Enter triggers click in interactive mode.
- Provide `ariaLabel` for icon-only actions.

---

## Real-World Example

```html
<ui-lib-icon name="settings" size="lg" />
<ui-lib-icon name="close" [clickable]="true" ariaLabel="Dismiss" (click)="dismiss()" />
```
