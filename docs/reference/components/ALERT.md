# Alert Component

## Overview

A status alert banner with optional dismiss action, designed for concise system messages. Uses standalone + OnPush + signals and inherits the global variant theme.

**Import**
```typescript
import { Alert } from 'ui-lib-custom';
```

**Location:** `projects/ui-lib-custom/src/lib/alert/alert.ts`

---

## Features

- ✅ Variant-aware styling (material, bootstrap, minimal).
- 🎨 CSS variable theming with design-token fallbacks.
- ♿ Severity-aware live region semantics (`role="alert"` for error/warning, `role="status"` for success/info).
- 🧩 Optional dismiss action with a native button.

---

## Basic Usage

```html
<ui-lib-alert severity="success">Profile saved successfully.</ui-lib-alert>
```

Dismissible:
```html
<ui-lib-alert severity="warning" [dismissible]="true" (dismissed)="onDismiss()">
  Your session will expire soon.
</ui-lib-alert>
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `severity` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Status tone used for icon and emphasis. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant (falls back to global variant). |
| `dismissible` | `boolean` | `false` | Shows a dismiss icon and enables the output. |
| `dismissLabel` | `string \| null` | `null` | Optional i18n label for the dismiss button (`Dismiss alert` fallback). |

### Outputs

| Output | Type | Description |
| --- | --- | --- |
| `dismissed` | `void` | Emitted when the dismiss button is clicked. |

---

## Theming & CSS Variables

| Variable | Purpose |
| --- | --- |
| `--uilib-alert-bg` | Alert background override (internal). |
| `--uilib-alert-fg` | Alert foreground override (internal). |
| `--uilib-inline-sm` | Icon/content gap (fallback for inline spacing). |
| `--uilib-inline-md` | Alert padding (fallback for inline spacing). |
| `--uilib-radius-md` | Border radius. |
| `--uilib-surface` | Base surface color. |
| `--uilib-color-primary-50` | Bootstrap variant background tone. |
| `--uilib-border` | Minimal border color. |
| `--uilib-surface-dark-2` | Dark mode background. |
| `--uilib-text-dark-primary` | Dark mode text color. |

### Theme Override Example

```scss
[data-theme='brand-x'] {
  --uilib-alert-bg: #0f172a;
  --uilib-alert-fg: #e2e8f0;
}
```

---

## Accessibility

- Uses severity-based live region roles:
  - `error`/`warning` → `role="alert"` + `aria-live="assertive"`
  - `success`/`info` → `role="status"` + `aria-live="polite"`
- Host sets `aria-atomic="true"` so updates are announced as complete messages.
- Dismiss button always has an accessible name (`dismissLabel` or `Dismiss alert` fallback).
- Severity and close icons are decorative (`aria-hidden="true"`).

---

## Real-World Example

```html
<ui-lib-alert severity="error" [dismissible]="true" (dismissed)="retry()">
  We could not save your changes. Please try again.
</ui-lib-alert>
```
