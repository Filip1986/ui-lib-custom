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
| `ariaLabel`  | `string \| null`                             | `null`   | Accessible label. Falls back to `"Toolbar"` when omitted. |
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

### ARIA attributes

| Element | Attribute | Value |
|---------|-----------|-------|
| `ui-lib-toolbar` host | `role` | `toolbar` |
| `ui-lib-toolbar` host | `aria-label` | `ariaLabel` input, falling back to `"Toolbar"` |
| `ui-lib-toolbar` host | `aria-orientation` | `horizontal` |
| `ui-lib-toolbar` host | `id` | Auto-generated `ui-lib-toolbar-*` instance id |
| Projected interactive items | `tabindex` | Managed with roving tabindex (`0` for active item, `-1` for the rest) |

### Keyboard support

| Key | Behavior |
|-----|----------|
| `Tab` / `Shift+Tab` | Enters or exits the toolbar using the currently active item |
| `ArrowRight` / `ArrowDown` | Moves focus to the next enabled toolbar item |
| `ArrowLeft` / `ArrowUp` | Moves focus to the previous enabled toolbar item |
| `Home` | Moves focus to the first enabled toolbar item |
| `End` | Moves focus to the last enabled toolbar item |

### Accessibility notes

- The host element applies the WAI-ARIA toolbar pattern automatically, including roving tabindex for projected interactive controls.
- Text-entry controls such as `input`, `textarea`, and `select` keep their native arrow-key behavior; toolbar navigation does not override their caret or option handling.
- Provide a custom `ariaLabel` whenever multiple toolbars appear on the same page so each landmark is announced distinctly.
- Decorative icons inside projected controls should use `aria-hidden="true"`.
- Icon-only projected buttons must provide their own accessible name (for example `aria-label="More formatting"`).
- Toolbar focus indicators use `:focus-visible`, and toolbar motion is disabled when `prefers-reduced-motion: reduce` is enabled.
