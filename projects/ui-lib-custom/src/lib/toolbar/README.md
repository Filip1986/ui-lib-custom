# Toolbar

A horizontal container component with start, center, and end content projection slots. Similar to PrimeNG's Toolbar, it provides a flexible layout for action bars, navigation bars, and page headers.

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

---

## Accessibility

- The host element has `role="toolbar"` applied automatically.
- Provide `ariaLabel` when multiple toolbars appear on the same page so screen readers can distinguish them.
- Ensure interactive elements inside the toolbar are keyboard-accessible.
- Follow WAI-ARIA Toolbar Pattern: arrow keys should navigate between toolbar items when custom keyboard management is needed.

