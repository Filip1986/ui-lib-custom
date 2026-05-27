# Tag

**Selector:** `ui-lib-tag`
**Entry point:** `import { Tag } from 'ui-lib-custom/tag'`

---

## Overview

Tag — compact label for status, category, or classification. Supports a text label, an optional leading icon, severity-based colouring, three sizes (sm / md / lg), and three design variants (material / bootstrap / minimal). Use the `rounded` input to control border-radius independently of variant.

## API

### Inputs

| Name          | Type                | Default         | Description                                                                                      |
| ------------- | ------------------- | --------------- | ------------------------------------------------------------------------------------------------ |
| `dismissible` | `boolean`           | `false`         | When true, a remove button is rendered at the end of the tag.                                    |
| `icon`        | `string | null`     | `null`          | CSS class string for a leading PrimeIcons icon (e.g. "pi pi-check").                             |
| `removeIcon`  | `string`            | `'pi pi-times'` | CSS class for the remove icon (defaults to "pi pi-times").                                       |
| `rounded`     | `boolean`           | `false`         | When true, the tag uses fully rounded (pill) corners regardless of variant. Defaults to `false`. |
| `severity`    | `TagSeverity`       | `'primary'`     | Severity colour — maps to a predefined palette. Defaults to `'primary'`.                         |
| `size`        | `TagSize`           | `'md'`          | Size of the tag. Defaults to `'md'`.                                                             |
| `styleClass`  | `string | null`     | `null`          | Additional CSS classes to attach to the host element.                                            |
| `value`       | `string | null`     | `null`          | Text displayed inside the tag.                                                                   |
| `variant`     | `TagVariant | null` | `null`          | Visual variant — inherits from ThemeConfigService when not set.                                  |

### Outputs

| Name      | Type         | Description                                |
| --------- | ------------ | ------------------------------------------ |
| `removed` | `MouseEvent` | Emitted when the remove button is clicked. |

## Content Projection

| Selector    | Notes |
| ----------- | ----- |
| _(default)_ | —     |

## Theming

| CSS Variable                           | Default                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| `--uilib-tag-bg-contrast`              | `var(--uilib-surface-900, #111827)`                                           |
| `--uilib-tag-bg-danger`                | `var(--uilib-color-danger, #ef4444)`                                          |
| `--uilib-tag-bg-info`                  | `var(--uilib-color-info, #3b82f6)`                                            |
| `--uilib-tag-bg-primary`               | `var(--uilib-color-primary, #6366f1)`                                         |
| `--uilib-tag-bg-secondary`             | `var(--uilib-surface-400, #9ca3af)`                                           |
| `--uilib-tag-bg-success`               | `var(--uilib-color-success, #22c55e)`                                         |
| `--uilib-tag-bg-warn`                  | `var(--uilib-color-warn, #f59e0b)`                                            |
| `--uilib-tag-border-radius`            | `var(--uilib-radius-sm, 0.375rem)`                                            |
| `--uilib-tag-color-contrast`           | `#ffffff`                                                                     |
| `--uilib-tag-color-danger`             | `#ffffff`                                                                     |
| `--uilib-tag-color-info`               | `#ffffff`                                                                     |
| `--uilib-tag-color-primary`            | `#ffffff`                                                                     |
| `--uilib-tag-color-secondary`          | `#ffffff`                                                                     |
| `--uilib-tag-color-success`            | `#ffffff`                                                                     |
| `--uilib-tag-color-warn`               | `#ffffff`                                                                     |
| `--uilib-tag-font-size`                | `0.75rem`                                                                     |
| `--uilib-tag-font-size-lg`             | `0.875rem`                                                                    |
| `--uilib-tag-font-size-sm`             | `0.6875rem`                                                                   |
| `--uilib-tag-font-weight`              | `700`                                                                         |
| `--uilib-tag-gap`                      | `0.3rem`                                                                      |
| `--uilib-tag-letter-spacing`           | `0.025em`                                                                     |
| `--uilib-tag-line-height`              | `1`                                                                           |
| `--uilib-tag-padding-x`                | `0.5rem`                                                                      |
| `--uilib-tag-padding-x-lg`             | `0.75rem`                                                                     |
| `--uilib-tag-padding-x-sm`             | `0.375rem`                                                                    |
| `--uilib-tag-padding-y`                | `0.25rem`                                                                     |
| `--uilib-tag-padding-y-lg`             | `0.375rem`                                                                    |
| `--uilib-tag-padding-y-sm`             | `0.125rem`                                                                    |
| `--uilib-tag-remove-button-bg`         | `transparent`                                                                 |
| `--uilib-tag-remove-button-bg-hover`   | `rgba(255, 255, 255, 0.2)`                                                    |
| `--uilib-tag-remove-button-color`      | `currentColor`                                                                |
| `--uilib-tag-remove-button-size`       | `1.25em`                                                                      |
| `--uilib-tag-remove-button-transition` | `background-color 0.15s ease`                                                 |
| `--uilib-tag-transition`               | `var( --uilib-transition-base, background-color 0.2s ease, color 0.2s ease )` |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                     |
| -------------------------------------------------------------------- |
| basic tags should have no axe violations                             |
| dismiss button icon should be aria-hidden                            |
| dismiss button should be keyboard focusable                          |
| dismiss button should include tag value in aria-label                |
| dismissible tag host should expose role=                             |
| dismissible tag should have no axe violations                        |
| icon tag should have no axe violations                               |
| leading icon should be aria-hidden                                   |
| should apply minimal variant class                                   |
| should apply variant class when provided                             |
| should have role=                                                    |
| should include tag value in remove button aria-label                 |
| should mark icon as aria-hidden                                      |
| should mark remove icon as aria-hidden                               |
| should remove aria-label when value is null                          |
| should render remove button with default aria-label when dismissible |
| should set aria-label from value                                     |
| should switch host role to group when dismissible is true            |
| tag host should expose role=                                         |
| tag host should set aria-label from value                            |

## Usage Examples

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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#tag)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/tag/README.md)

