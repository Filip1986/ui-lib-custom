# Divider

A visual separator that divides content horizontally or vertically. Supports solid, dashed, and dotted lines, optional projected label/icon content, flexible alignment, and three design variants.

---

## Import

```typescript
import { Divider } from 'ui-lib-custom/divider';
```

## Selector

`ui-lib-divider`

---

## Inputs

| Input         | Type                                                         | Default        | Description                                                                                                                            |
| ------------- | ------------------------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'`                                 | `'horizontal'` | Direction of the divider line.                                                                                                         |
| `type`        | `'solid' \| 'dashed' \| 'dotted'`                            | `'solid'`      | Visual style of the divider line.                                                                                                      |
| `align`       | `'left' \| 'center' \| 'right' \| 'top' \| 'bottom' \| null` | `null`         | Position of projected content. Horizontal: `left`/`center`/`right`. Vertical: `top`/`center`/`bottom`. Resolves to `center` when null. |
| `variant`     | `'material' \| 'bootstrap' \| 'minimal' \| null`             | `null`         | Design variant; inherits from `ThemeConfigService` when null.                                                                          |
| `styleClass`  | `string \| null`                                             | `null`         | Additional CSS classes applied to the host element.                                                                                    |
| `ariaLabel`   | `string \| null`                                             | `null`         | Accessible name for meaningful/labeled dividers. Empty strings are ignored.                                                            |
| `decorative`  | `boolean`                                                    | `false`        | Marks the divider as decorative-only and sets `aria-hidden="true"` when no `ariaLabel` is set.                                         |

---

## Content Projection

Project any content (text, icons, chips) between the divider lines:

```html
<ui-lib-divider>OR</ui-lib-divider>
<ui-lib-divider><span class="pi pi-star"></span></ui-lib-divider>
```

When no content is projected, the divider renders as a clean, uninterrupted line.

---

## Usage Examples

### Basic horizontal divider

```html
<ui-lib-divider />
```

### With label

```html
<ui-lib-divider>OR</ui-lib-divider>
```

### Alignment

```html
<ui-lib-divider align="left">Section A</ui-lib-divider>
<ui-lib-divider align="center">Center</ui-lib-divider>
<ui-lib-divider align="right">End</ui-lib-divider>
```

### Line types

```html
<ui-lib-divider type="solid" />
<ui-lib-divider type="dashed" />
<ui-lib-divider type="dotted" />
```

### Vertical divider

```html
<div style="display:flex; align-items:stretch;">
  <div>Left content</div>
  <ui-lib-divider orientation="vertical" />
  <div>Right content</div>
</div>
```

### Vertical with label

```html
<ui-lib-divider orientation="vertical" align="center">OR</ui-lib-divider>
```

### Specific design variant

```html
<ui-lib-divider variant="bootstrap">Bootstrap</ui-lib-divider> <ui-lib-divider variant="minimal" />
```

---

## CSS Custom Properties

| Property                              | Default                    | Description                      |
| ------------------------------------- | -------------------------- | -------------------------------- |
| `--uilib-divider-color`               | `var(--uilib-surface-300)` | Line colour                      |
| `--uilib-divider-thickness`           | `1px`                      | Line thickness                   |
| `--uilib-divider-border-style`        | `solid`                    | Line style (driven by `type`)    |
| `--uilib-divider-margin-v`            | `1rem`                     | Top/bottom margin (horizontal)   |
| `--uilib-divider-margin-h`            | `1rem`                     | Left/right margin (vertical)     |
| `--uilib-divider-content-padding`     | `0.5rem`                   | Padding around projected content |
| `--uilib-divider-content-font-size`   | `0.875rem`                 | Font size of projected content   |
| `--uilib-divider-content-color`       | `var(--uilib-color-text)`  | Text colour of projected content |
| `--uilib-divider-vertical-min-height` | `5rem`                     | Minimum height for vertical mode |

---

## Accessibility

### ARIA behavior

| Scenario                               | Role        | `aria-orientation`    | `aria-hidden` | `aria-label`         |
| -------------------------------------- | ----------- | --------------------- | ------------- | -------------------- |
| Default divider                        | `separator` | `horizontal`          | _none_        | _none_               |
| Vertical divider                       | `separator` | `vertical`            | _none_        | _none_               |
| Decorative divider (`decorative=true`) | `separator` | follows `orientation` | `true`        | _none_               |
| Labeled divider (`ariaLabel` set)      | `separator` | follows `orientation` | _none_        | value of `ariaLabel` |

### Keyboard behavior

Divider is non-interactive and not focusable by default:

| Key               | Behavior      |
| ----------------- | ------------- |
| `Tab`             | Skips divider |
| `Enter` / `Space` | No action     |

### Accessibility notes

- Host element always uses `role="separator"`.
- `aria-orientation` reflects `orientation` (`horizontal`/`vertical`).
- Decorative usage is supported through `decorative`.
- For meaningful divider text/icons, provide `ariaLabel`.
