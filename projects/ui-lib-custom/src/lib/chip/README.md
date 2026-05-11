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

| Input          | Type                                             | Default         | Description |
|----------------|--------------------------------------------------|-----------------|-------------|
| `label`        | `string \| null`                                 | `null`          | Text displayed inside the chip. |
| `icon`         | `string \| null`                                 | `null`          | CSS class for a leading icon (e.g. `"pi pi-user"`). Ignored when `image` is also set. |
| `image`        | `string \| null`                                 | `null`          | URL of a circular thumbnail image rendered at the start of the chip. |
| `imageAlt`     | `string`                                         | `"Chip"`        | Alt text for the chip image. |
| `removable`    | `boolean`                                        | `false`         | When true, a close button is rendered. |
| `removeIcon`   | `string`                                         | `"pi pi-times"` | CSS class for the remove button icon. |
| `selectable`   | `boolean`                                        | `false`         | When true, the chip is keyboard-focusable and can be toggled. |
| `selected`     | `boolean`                                        | `false`         | Selected state for selectable chips. Pair with `(selectedChange)`. |
| `size`         | `"sm" \| "md" \| "lg"`                           | `"md"`          | Size of the chip. |
| `variant`      | `"material" \| "bootstrap" \| "minimal" \| null` | `null`          | Design variant. Inherits from `ThemeConfigService` when `null`. |
| `styleClass`   | `string \| null`                                 | `null`          | Additional CSS classes applied to the host element. |

## Outputs

| Output          | Type                          | Description |
|-----------------|-------------------------------|-------------|
| `removed`       | `OutputEmitterRef<MouseEvent>` | Emitted when the remove button is clicked. The chip does not auto-hide — manage visibility in the parent. |
| `selectedChange`| `OutputEmitterRef<boolean>`   | Emitted when a selectable chip is toggled; provides the new selected value. |

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

### Selectable chip (toggle)

```html
<ui-lib-chip
  label="Angular"
  [selectable]="true"
  [selected]="isSelected"
  (selectedChange)="isSelected = $event"
/>
```

### Custom size and variant

```html
<ui-lib-chip label="Tag" size="sm" variant="minimal" />
<ui-lib-chip label="Tag" size="lg" variant="bootstrap" />
```

## CSS variables

| Variable                      | Description                              |
|-------------------------------|------------------------------------------|
| `--uilib-chip-bg`             | Chip background colour                   |
| `--uilib-chip-color`          | Chip text colour                         |
| `--uilib-chip-border`         | Chip border shorthand                    |
| `--uilib-chip-border-radius`  | Chip border radius                       |
| `--uilib-chip-padding-y`      | Vertical padding                         |
| `--uilib-chip-padding-x`      | Horizontal padding                       |
| `--uilib-chip-gap`            | Gap between icon/image/label/button      |
| `--uilib-chip-font-size`      | Font size                                |
| `--uilib-chip-font-weight`    | Font weight                              |
| `--uilib-chip-image-size`     | Circular image diameter                  |
| `--uilib-chip-remove-bg-hover`| Remove button hover background           |
| `--uilib-chip-transition`     | Transition shorthand (respects `prefers-reduced-motion`) |

## Accessibility

### ARIA attributes

| Attribute       | Element       | Value                                     | Notes |
|-----------------|---------------|-------------------------------------------|-------|
| `role`          | Host          | `option` or `group`                       | `option` for non-removable chips (listbox option). `group` for removable chips (to allow a nested button). |
| `aria-label`    | Host          | Value of `label` input                    | Omitted when `label` is `null`. |
| `aria-selected` | Host          | `"true"` / `"false"`                      | Only present when `[selectable]="true"`. |
| `tabindex`      | Host          | `"0"`                                     | Only present when `[selectable]="true"`. |
| `id`            | Host          | Auto-generated (`ui-lib-chip-{n}`)        | Unique per instance; stable for the lifetime of the component. |
| `aria-label`    | Remove button | `"Remove {label}"` or `"Remove"`          | Auto-generated from the `label` input. |
| `aria-hidden`   | Leading icon  | `"true"`                                  | Decorative icon hidden from screen readers. |
| `aria-hidden`   | Remove button icon | `"true"`                             | Decorative icon hidden from screen readers. |
| `alt`           | Image         | Value of `imageAlt` input                 | Defaults to `"Chip"`. Provide a meaningful description. |

### Keyboard interaction

| Key       | Target         | Action |
|-----------|----------------|--------|
| `Space`   | Selectable chip | Toggles the selected state (emits `selectedChange`). |
| `Enter`   | Selectable chip | Toggles the selected state (emits `selectedChange`). |
| `Tab`     | Selectable chip | Moves focus to/from the chip (standard tab order). |
| `Space` / `Enter` | Remove button | Activates the remove button (browser default). |

### Screen reader notes

- Wrap chips in a container with `role="listbox"` and `aria-label` so screen readers announce the collection correctly.
- The `label` input provides the accessible name via `aria-label` on the host; when using the default content projection slot, also set `aria-label` manually on the parent or the chip itself via `styleClass`.
- `imageAlt` should be a meaningful description of the avatar or thumbnail; avoid using `"Chip"` (the default) for real user images.
- All transitions respect `prefers-reduced-motion: reduce`.

