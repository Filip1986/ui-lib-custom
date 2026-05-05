# Chip

A compact inline element representing an attribute, tag, or dismissible item.
Supports an optional leading icon or image, a removable close button, three sizes, and three design variants.

## Import

```typescript
import { Chip } from 'ui-lib-custom/chip';
```

## Selector

```html
<ui-lib-chip />
```

## Inputs

| Input        | Type                                         | Default         | Description |
|--------------|----------------------------------------------|-----------------|-------------|
| `label`      | `string \| null`                             | `null`          | Text displayed inside the chip. |
| `icon`       | `string \| null`                             | `null`          | CSS class for a leading icon (e.g. `"pi pi-user"`). Ignored when `image` is also set. |
| `image`      | `string \| null`                             | `null`          | URL of a circular thumbnail image rendered at the start of the chip. |
| `imageAlt`   | `string`                                     | `"Chip"`        | Alt text for the chip image. |
| `removable`  | `boolean`                                    | `false`         | When true, a close button is rendered. |
| `removeIcon` | `string`                                     | `"pi pi-times"` | CSS class for the remove button icon. |
| `size`       | `"sm" \| "md" \| "lg"`                       | `"md"`          | Size of the chip. |
| `variant`    | `"material" \| "bootstrap" \| "minimal" \| null` | `null`      | Design variant. Inherits from `ThemeConfigService` when `null`. |
| `styleClass` | `string \| null`                             | `null`          | Additional CSS classes applied to the host element. |

## Outputs

| Output     | Type                        | Description |
|------------|-----------------------------|-------------|
| `removed` | `OutputEmitterRef<MouseEvent>` | Emitted when the remove button is clicked. The chip does not auto-hide — manage visibility in the parent. |

## Content projection

Default `<ng-content>` slot is available for fully custom chip content when neither `label`, `icon`, nor `image` is set.

## Usage examples

### Basic label

```html
<ui-lib-chip label="Angular" />
```

### With icon

```html
<ui-lib-chip label="Verified" icon="pi pi-check-circle" />
```

### With image

```html
<ui-lib-chip label="Amy" image="/assets/amy.png" imageAlt="Amy Elsner" />
```

### Removable chip

```html
<ui-lib-chip
  label="Angular"
  [removable]="true"
  (removed)="remove()"
/>
```

### Custom size and variant

```html
<ui-lib-chip label="Tag" size="sm" variant="minimal" />
<ui-lib-chip label="Tag" size="lg" variant="bootstrap" />
```

## CSS variables

| Variable | Description |
|----------|-------------|
| `--uilib-chip-bg` | Chip background colour |
| `--uilib-chip-color` | Chip text colour |
| `--uilib-chip-border` | Chip border shorthand |
| `--uilib-chip-border-radius` | Chip border radius |
| `--uilib-chip-padding-y` | Vertical padding |
| `--uilib-chip-padding-x` | Horizontal padding |
| `--uilib-chip-gap` | Gap between icon/image/label/button |
| `--uilib-chip-font-size` | Font size |
| `--uilib-chip-font-weight` | Font weight |
| `--uilib-chip-image-size` | Circular image diameter |
| `--uilib-chip-remove-bg-hover` | Remove button hover background |

## Accessibility

- Host element has `role="option"` and `[attr.aria-label]` bound to the `label` input.
- The remove button receives an auto-generated `aria-label`: `"Remove {label}"` or `"Remove"` when no label is set.
- The remove button icon has `aria-hidden="true"` so screen readers skip it.
- The remove button is keyboard-focusable with a visible `:focus-visible` ring.
