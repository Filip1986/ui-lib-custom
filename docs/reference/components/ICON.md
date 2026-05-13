# Icon Component

## Overview

A unified icon wrapper powered by Ng Icons with semantic names, variant-aware library selection, and text-relative sizing. By default the icon is decorative (`aria-hidden="true"`); when `ariaLabel` is provided it becomes an informative image with `role="img"`.

**Import**
```typescript
import { Icon } from 'ui-lib-custom/icon';
```

**Location:** `projects/ui-lib-custom/src/lib/icon/icon.ts`

---

## Features

- ✅ Semantic icon names with variant-based library resolution.
- 🎨 CSS variable theming for color.
- ♿ Decorative-by-default accessibility with informative mode via `ariaLabel`.
- 🧩 Optional explicit library override.
- ⚡ Inline SVG rendering with no per-icon network request.

---

## Basic Usage

```html
<ui-lib-icon name="search" />
```

Variant-aware:
```html
<ui-lib-icon name="menu" variant="material" />
```

Informative standalone icon:
```html
<ui-lib-icon name="alert-circle" ariaLabel="Warning" />
```

Icon-only actions should use a button component so the button owns the accessible name:

```html
<ui-lib-icon-button icon="close" ariaLabel="Close dialog" />
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string \| SemanticIcon` | required | Semantic or concrete icon name. |
| `size` | `IconSize` | `'md'` | Icon size (`xs`-`2xl`) resolved to `em` units so it scales with surrounding text. |
| `color` | `string \| null` | `null` | CSS color value (falls back to currentColor). |
| `library` | `IconLibrary \| null` | `null` | Force a specific library. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Resolve icon based on component variant. |
| `semantic` | `boolean` | `false` | Force treating `name` as semantic. |
| `ariaLabel` | `string \| null` | `null` | Makes the icon informative by setting `aria-label`, `role="img"`, and removing `aria-hidden`. |

### Outputs

None.

---

## Theming & CSS Variables

| Variable | Purpose |
| --- | --- |
| `--uilib-icon-color` | Base icon color (falls back to currentColor). |
| `--uilib-icon-transition` | Transition used for hover/interaction. |

### Theme Override Example

```scss
[data-theme='brand-x'] {
  --uilib-icon-color: #38bdf8;
}
```

---

## Accessibility

- Default icons are decorative: `aria-hidden="true"` and `tabindex="-1"`.
- When `ariaLabel` is provided, the host becomes the accessible image with `role="img"` and the inner glyph remains hidden from assistive technology.
- Never rely on the icon `name` as accessible text.
- Use `ui-lib-button` or `ui-lib-icon-button` for clickable actions.

## Size Tokens

| Token | Rendered size |
| --- | --- |
| `xs` | `0.75em` |
| `sm` | `0.875em` |
| `md` | `1em` |
| `lg` | `1.25em` |
| `xl` | `1.5em` |
| `2xl` | `2em` |

## Performance

- `ui-lib-icon` renders through the inlined `<ng-icon>` component.
- Registered icon SVGs are bundled ahead of time, so rendering an icon does not trigger a network request.

---

## Real-World Example

```html
<ui-lib-icon name="settings" size="lg" />
<ui-lib-icon name="info" ariaLabel="Additional information" />
```
