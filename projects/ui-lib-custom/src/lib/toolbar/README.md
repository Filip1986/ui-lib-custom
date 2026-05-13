# Toolbar

A horizontal container component with start, center, and end content projection slots. Similar to PrimeNG's Toolbar, it provides a flexible layout for action bars, navigation bars, and page headers.

Implements the [WAI-ARIA Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) with roving tabindex keyboard navigation.

---

## Import

```typescript
import { Toolbar } from 'ui-lib-custom/toolbar';
import type { ToolbarVariant, ToolbarSize } from 'ui-lib-custom/toolbar';
```

**Package path:** `ui-lib-custom/toolbar`

---

## Selector

```html
<ui-lib-toolbar>...</ui-lib-toolbar>
```

---

## Inputs

| Input        | Type                                         | Default  | Description                                                              |
|--------------|----------------------------------------------|----------|--------------------------------------------------------------------------|
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Design variant. Inherits from `ThemeConfigService` when `null`.          |
| `size`       | `'sm' \| 'md' \| 'lg'`                      | `'md'`   | Controls toolbar height and padding.                                     |
| `ariaLabel`  | `string \| null`                             | `null`   | Accessible label. Recommended when multiple toolbars appear on one page. |
| `styleClass` | `string \| null`                             | `null`   | Additional CSS classes added to the host element.                        |

---

## Content Projection Slots

| Selector            | Position         | Description                          |
|---------------------|------------------|--------------------------------------|
| `[uiToolbarStart]`  | Leading (left)   | Actions/items at the start of the toolbar. |
| `[uiToolbarCenter]` | Center           | Items centered in the toolbar.       |
| `[uiToolbarEnd]`    | Trailing (right) | Actions/items at the end of the toolbar.   |

---

## ARIA Attributes

| Attribute     | Element | Value                               | Notes                                                        |
|---------------|---------|-------------------------------------|--------------------------------------------------------------|
| `role`        | Host    | `"toolbar"`                         | Applied automatically.                                       |
| `aria-label`  | Host    | Value of the `ariaLabel` input      | Omitted when `ariaLabel` is `null`.                          |
| `id`          | Host    | `ui-lib-toolbar-{n}`                | Unique per-instance, generated at construction time.         |
| `tabindex`    | Items   | `"0"` (active) / `"-1"` (inactive) | Managed automatically via roving tabindex after first render. |

---

## Keyboard Interaction

| Key          | Behaviour                                         |
|--------------|---------------------------------------------------|
| `ArrowRight` | Move focus to the next interactive item.          |
| `ArrowDown`  | Same as `ArrowRight` (vertical axis alias).       |
| `ArrowLeft`  | Move focus to the previous interactive item.      |
| `ArrowUp`    | Same as `ArrowLeft` (vertical axis alias).        |
| `Home`       | Move focus to the first interactive item.         |
| `End`        | Move focus to the last interactive item.          |
| `Tab`        | Exit the toolbar (standard browser behaviour).    |

Focus wraps at both ends: `ArrowRight` from the last item moves to the first, and `ArrowLeft` from the first moves to the last.

---

## CSS Custom Properties

| Token                           | Default                          | Description                   |
|---------------------------------|----------------------------------|-------------------------------|
| `--uilib-toolbar-background`    | `var(--uilib-surface-0)`         | Background fill               |
| `--uilib-toolbar-border-color`  | `var(--uilib-surface-200)`       | Border color                  |
| `--uilib-toolbar-border-width`  | `1px`                            | Border width                  |
| `--uilib-toolbar-border-radius` | `var(--uilib-radius-md)`         | Corner radius                 |
| `--uilib-toolbar-padding-x`     | `1rem`                           | Horizontal padding            |
| `--uilib-toolbar-padding-y`     | `0.5rem`                         | Vertical padding               |
| `--uilib-toolbar-min-height`    | `3rem`                           | Minimum toolbar height        |
| `--uilib-toolbar-gap`           | `0.5rem`                         | Gap between items in a group  |
| `--uilib-toolbar-shadow`        | `none`                           | Box shadow (material only)    |
| `--uilib-toolbar-color`         | `var(--uilib-color-text)`        | Text color                    |
| `--uilib-toolbar-font-family`   | `var(--uilib-font-ui)`           | Font family                   |

---

## Usage

### Basic

```html
<ui-lib-toolbar>
  <div uiToolbarStart>
    <button type="button">New</button>
    <button type="button">Open</button>
  </div>
</ui-lib-toolbar>
```

### Start and End

```html
<ui-lib-toolbar>
  <div uiToolbarStart>
    <button type="button">Cut</button>
    <button type="button">Copy</button>
    <button type="button">Paste</button>
  </div>
  <div uiToolbarEnd>
    <button type="button">Undo</button>
    <button type="button">Redo</button>
  </div>
</ui-lib-toolbar>
```

### All Three Slots

```html
<ui-lib-toolbar>
  <div uiToolbarStart>
    <button type="button">← Back</button>
  </div>
  <div uiToolbarCenter>
    <strong>Page Title</strong>
  </div>
  <div uiToolbarEnd>
    <button type="button">Settings</button>
  </div>
</ui-lib-toolbar>
```

### Variant and Size

```html
<ui-lib-toolbar variant="material" size="lg">
  <div uiToolbarStart>
    <button type="button">Action</button>
  </div>
</ui-lib-toolbar>
```

### With Accessible Label

```html
<ui-lib-toolbar ariaLabel="Document editing toolbar">
  <div uiToolbarStart>
    <button type="button">Bold</button>
    <button type="button">Italic</button>
  </div>
</ui-lib-toolbar>
```

### Icon-Only Buttons (mandatory `aria-label`)

```html
<ui-lib-toolbar ariaLabel="Formatting toolbar">
  <div uiToolbarStart>
    <button type="button" aria-label="Bold">
      <span aria-hidden="true" class="pi pi-bold"></span>
    </button>
    <button type="button" aria-label="Italic">
      <span aria-hidden="true" class="pi pi-italic"></span>
    </button>
  </div>
</ui-lib-toolbar>
```

---

## Accessibility

### Overview

The Toolbar implements the [WAI-ARIA Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/):

- The host element automatically receives `role="toolbar"`.
- Provide `ariaLabel` whenever more than one toolbar appears on the same page so screen readers can distinguish them.
- Arrow keys navigate between interactive elements inside the toolbar; `Tab` exits it entirely.
- Roving tabindex is initialised after the first render: the first focusable item gets `tabindex="0"`, all others get `tabindex="-1"`. This keeps a single tab stop in the toolbar while enabling arrow-key navigation.
- Clicking any toolbar item also updates the roving tabindex so the position is preserved for the next arrow-key navigation.

### Icon-Only Buttons

Every icon-only button **must** have an `aria-label` attribute describing its action. All decorative icons (e.g., `<span class="pi …">`) must carry `aria-hidden="true"` so assistive technology ignores the icon and reads only the button label.

### Focus Visibility

A 2 px outline ring is rendered on `:focus-visible` for all interactive elements inside the toolbar so keyboard users always have a visible focus indicator.

### Reduced Motion

All transitions and animations inside the toolbar are disabled when the user has `prefers-reduced-motion: reduce` set.

