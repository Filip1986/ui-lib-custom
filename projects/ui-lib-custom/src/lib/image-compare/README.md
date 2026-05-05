# ImageCompare

**Selector:** `ui-lib-image-compare`
**Package:** `ui-lib-custom/image-compare`
**Content projection:** no — none; images are provided via `leftImage` / `rightImage` inputs

> `value` is a `model()` signal (two-way bindable via `[(value)]`) representing the divider position as a percentage (0–100). Clicking anywhere on the container also repositions the divider — not just dragging the handle.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `leftImage` | `string` | `''` | URL of the left (before) image |
| `leftAlt` | `string` | `''` | Accessible alt text for the left image |
| `rightImage` | `string` | `''` | URL of the right (after) image |
| `rightAlt` | `string` | `''` | Accessible alt text for the right image |
| `value` | `number` | `50` | Two-way bindable via `[(value)]`; divider position as a percentage (0–100) |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `disabled` | `boolean` | `false` | Prevents pointer and keyboard interaction |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |
| `ariaLabel` | `string` | `'Compare images'` | Accessible label for the slider handle |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `slideStart` | `number` | Emitted when the user starts dragging; payload is the current percentage value |
| `slideEnd` | `number` | Emitted when the user releases the handle; payload is the final percentage value |

## Usage

```html
<!-- basic before/after comparison -->
<ui-lib-image-compare
  leftImage="/before.jpg"
  leftAlt="Before"
  rightImage="/after.jpg"
  rightAlt="After"
/>

<!-- two-way binding to track position -->
<ui-lib-image-compare
  leftImage="/before.jpg"
  rightImage="/after.jpg"
  [(value)]="sliderPosition"
  (slideEnd)="onSlideEnd($event)"
/>
```
