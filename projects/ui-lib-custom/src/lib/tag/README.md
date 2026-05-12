# Tag

A compact label component for displaying status, severity, or classification badges.

## Package path

```typescript
import { Tag } from 'ui-lib-custom/tag';
```

## Selector

`ui-lib-tag`

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| null` | `null` | Text label rendered inside the tag. |
| `icon` | `string \| null` | `null` | PrimeIcons CSS class (e.g. `"pi pi-check"`) for a leading icon. |
| `severity` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warn' \| 'danger' \| 'contrast'` | `'primary'` | Colour palette for the tag. |
| `rounded` | `boolean` | `false` | When `true`, applies fully rounded (pill) corners. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the tag. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Design variant; inherits from `ThemeConfigService` when `null`. |
| `styleClass` | `string \| null` | `null` | Additional CSS classes added to the host element. |
| `dismissible` | `boolean` | `false` | Shows an inline remove button at the end of the tag. |
| `removeIcon` | `string` | `'pi pi-times'` | CSS class for the dismiss button icon. |

## Outputs

| Output | Type | Description |
|---|---|---|
| `removed` | `OutputEmitterRef<MouseEvent>` | Emitted when the dismiss button is clicked. The tag is not auto-removed; hide it from the parent. |

## Content projection

Arbitrary content can be projected directly into the tag via `<ng-content />`.

## CSS custom properties

| Variable | Default | Description |
|---|---|---|
| `--uilib-tag-bg-primary` | `var(--uilib-color-primary, #6366f1)` | Background for primary severity |
| `--uilib-tag-color-primary` | `#ffffff` | Text colour for primary severity |
| `--uilib-tag-bg-success` | `var(--uilib-color-success, #22c55e)` | Background for success severity |
| `--uilib-tag-color-success` | `#ffffff` | Text colour for success severity |
| `--uilib-tag-bg-danger` | `var(--uilib-color-danger, #ef4444)` | Background for danger severity |
| `--uilib-tag-color-danger` | `#ffffff` | Text colour for danger severity |
| `--uilib-tag-border-radius` | `var(--uilib-radius-sm, 0.375rem)` | Border radius |
| `--uilib-tag-padding-y` | `0.25rem` | Vertical padding (md size) |
| `--uilib-tag-padding-x` | `0.5rem` | Horizontal padding (md size) |
| `--uilib-tag-font-size` | `0.75rem` | Font size (md size) |
| `--uilib-tag-font-weight` | `700` | Font weight |
| `--uilib-tag-remove-button-size` | `1.25em` | Dismiss button size |
| `--uilib-tag-remove-button-bg-hover` | `rgba(255, 255, 255, 0.2)` | Dismiss button hover background |
| `--uilib-tag-remove-button-transition` | `background-color 0.15s ease` | Dismiss button transition |

## Accessibility

### ARIA attributes

| Attribute | Element | Value | Notes |
|---|---|---|---|
| `id` | Host | `ui-lib-tag-{n}` | Auto-generated and unique per instance. |
| `role` | Host | `status` or `group` | `status` by default; `group` when `dismissible` is true. |
| `aria-label` | Host | `value` | Omitted when `value` is null. |
| `aria-hidden` | Leading icon | `true` | Decorative icon is hidden from assistive tech. |
| `aria-label` | Dismiss button | `Remove {value} tag` / `Remove tag` | Generated from `value`; always present when dismissible. |
| `aria-hidden` | Dismiss button icon | `true` | Decorative icon is hidden from assistive tech. |

### Keyboard interaction

| Key | Target | Action |
|---|---|---|
| `Tab` | Dismiss button | Moves focus to the button when `dismissible` is true. |
| `Enter` / `Space` | Dismiss button | Activates the native button and emits `removed`. |

### Notes

- All interactive dismiss controls use `:focus-visible` styles.
- Decorative icons are always marked with `aria-hidden="true"`.
- Transitions are disabled under `@media (prefers-reduced-motion: reduce)`.

## Usage examples

```html
<!-- Basic tag -->
<ui-lib-tag value="New" />

<!-- With icon -->
<ui-lib-tag value="Angular" icon="pi pi-bolt" severity="info" />

<!-- Dismissible -->
<ui-lib-tag
  value="Python"
  [dismissible]="true"
  (removed)="removeTag()"
/>
```
