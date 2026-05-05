# Tag

A compact label component for displaying status, severity, or classification badges.

## Package path

```typescript
import { Tag } from 'ui-lib-custom/tag';
```

## Selector

`ui-lib-tag`

## Inputs

| Input        | Type                                                                            | Default     | Description                                                        |
|--------------|---------------------------------------------------------------------------------|-------------|--------------------------------------------------------------------|
| `value`      | `string \| null`                                                                | `null`      | Text label rendered inside the tag.                                |
| `icon`       | `string \| null`                                                                | `null`      | PrimeIcons CSS class (e.g. `"pi pi-check"`) for a leading icon.   |
| `severity`   | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warn' \| 'danger' \| 'contrast'` | `'primary'` | Colour palette for the tag.                              |
| `rounded`    | `boolean`                                                                       | `false`     | When `true`, applies fully rounded (pill) corners.                 |
| `size`       | `'sm' \| 'md' \| 'lg'`                                                          | `'md'`      | Size of the tag.                                                   |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null`                               | `null`      | Design variant; inherits from `ThemeConfigService` when `null`.    |
| `styleClass` | `string \| null`                                                                | `null`      | Additional CSS classes added to the host element.                  |

## Outputs

None.

## Content projection

Arbitrary content can be projected directly into the tag via `<ng-content />` — useful for embedding custom templates alongside or instead of `value`.

## CSS variables

All tokens follow the pattern `--uilib-tag-{property}[-{severity}]`.

| Variable                         | Default                   | Description                          |
|----------------------------------|---------------------------|--------------------------------------|
| `--uilib-tag-bg-primary`         | `var(--uilib-color-primary, #6366f1)` | Background for primary severity |
| `--uilib-tag-color-primary`      | `#ffffff`                 | Text colour for primary severity     |
| `--uilib-tag-bg-success`         | `var(--uilib-color-success, #22c55e)` | Background for success severity |
| `--uilib-tag-color-success`      | `#ffffff`                 | Text colour for success severity     |
| `--uilib-tag-bg-danger`          | `var(--uilib-color-danger, #ef4444)`  | Background for danger severity  |
| `--uilib-tag-color-danger`       | `#ffffff`                 | Text colour for danger severity      |
| `--uilib-tag-border-radius`      | `var(--uilib-radius-sm, 0.375rem)` | Border radius                   |
| `--uilib-tag-padding-y`          | `0.25rem`                 | Vertical padding (md size)           |
| `--uilib-tag-padding-x`          | `0.5rem`                  | Horizontal padding (md size)         |
| `--uilib-tag-font-size`          | `0.75rem`                 | Font size (md size)                  |
| `--uilib-tag-font-weight`        | `700`                     | Font weight                          |

## Accessibility

- `role="status"` is applied to the host element.
- `aria-label` is set to the `value` input when provided.
- Icons are marked `aria-hidden="true"` as they are decorative.

## Minimal usage example

```html
<!-- Basic tag -->
<ui-lib-tag value="New" />

<!-- Severity variants -->
<ui-lib-tag value="Success" severity="success" />
<ui-lib-tag value="Warning" severity="warn" />
<ui-lib-tag value="Error" severity="danger" />

<!-- With icon -->
<ui-lib-tag value="Angular" icon="pi pi-bolt" severity="info" />

<!-- Rounded pill -->
<ui-lib-tag value="Active" severity="success" [rounded]="true" />

<!-- Size variants -->
<ui-lib-tag value="Small" size="sm" />
<ui-lib-tag value="Large" size="lg" severity="danger" />

<!-- Design variant override -->
<ui-lib-tag value="Bootstrap" severity="primary" variant="bootstrap" />
<ui-lib-tag value="Minimal" severity="success" variant="minimal" />
```

