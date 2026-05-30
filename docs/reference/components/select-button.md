# Select Button

**Selector:** `ui-lib-select-button`
**Entry point:** `import { SelectButton } from 'ui-lib-custom/select-button'`

---

## Overview

Segmented select component that supports single or multiple selection modes.

## API

### Inputs

| Name             | Type                                             | Default                | Description |
| ---------------- | ------------------------------------------------ | ---------------------- | ----------- |
| `allowEmpty`     | `boolean`                                        | `false`                | —           |
| `ariaLabel`      | `string | null`                                  | `null`                 | —           |
| `ariaLabelledBy` | `string | null`                                  | `null`                 | —           |
| `disabled`       | `boolean`                                        | `false`                | —           |
| `fluid`          | `boolean`                                        | `false`                | —           |
| `invalid`        | `boolean`                                        | `false`                | —           |
| `multiple`       | `boolean`                                        | `false`                | —           |
| `optionDisabled` | `string`                                         | `'disabled'`           | —           |
| `optionLabel`    | `string`                                         | `'label'`              | —           |
| `options`        | `SelectButtonOption[]`                           | `[]`                   | —           |
| `optionValue`    | `string`                                         | `'value'`              | —           |
| `size`           | `SelectButtonSize`                               | `SHARED_DEFAULTS.Size` | —           |
| `value`          | `SelectButtonValue | SelectButtonValue[] | null` | `null`                 | —           |
| `variant`        | `SelectButtonVariant | null`                     | `null`                 | —           |

### Outputs

| Name              | Type                                             | Description |
| ----------------- | ------------------------------------------------ | ----------- |
| `selectionChange` | `SelectButtonChangeEvent`                        | —           |
| `valueChange`     | `SelectButtonValue | SelectButtonValue[] | null` | —           |

## Content Projection

_none_

## Theming

| CSS Variable                                      | Default                                                                                                                                                 |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--uilib-select-button-bg-resolved`               | `var(--uilib-select-button-bg, var(--uilib-surface-100))`                                                                                               |
| `--uilib-select-button-bootstrap-bg`              | `var(--uilib-surface-dark-2)`                                                                                                                           |
| `--uilib-select-button-bootstrap-border`          | `var(--uilib-border-dark)`                                                                                                                              |
| `--uilib-select-button-bootstrap-hover-bg`        | `var(--uilib-surface-dark-3)`                                                                                                                           |
| `--uilib-select-button-bootstrap-selected-bg`     | `var(--uilib-color-primary-dark)`                                                                                                                       |
| `--uilib-select-button-bootstrap-selected-fg`     | `var(--uilib-color-neutral-950, #0b1220)`                                                                                                               |
| `--uilib-select-button-border-radius-resolved`    | `var( --uilib-select-button-border-radius, var(--uilib-shape-base, 6px) )`                                                                              |
| `--uilib-select-button-border-resolved`           | `var(--uilib-select-button-border, var(--uilib-border))`                                                                                                |
| `--uilib-select-button-disabled-opacity-resolved` | `var( --uilib-select-button-disabled-opacity, 0.6 )`                                                                                                    |
| `--uilib-select-button-fg`                        | `var(--uilib-text-dark-primary)`                                                                                                                        |
| `--uilib-select-button-font-size-resolved`        | `var(--uilib-select-button-medium-font-size, 1rem)`                                                                                                     |
| `--uilib-select-button-gap-resolved`              | `var(--uilib-select-button-gap, 0)`                                                                                                                     |
| `--uilib-select-button-hover-bg-resolved`         | `var( --uilib-select-button-hover-bg, var(--uilib-surface-200) )`                                                                                       |
| `--uilib-select-button-invalid-border`            | `var(--uilib-color-danger-600)`                                                                                                                         |
| `--uilib-select-button-invalid-border-resolved`   | `var( --uilib-select-button-invalid-border, var(--uilib-color-danger-600) )`                                                                            |
| `--uilib-select-button-material-bg`               | `var(--uilib-surface-dark-2)`                                                                                                                           |
| `--uilib-select-button-material-border`           | `var(--uilib-border-dark)`                                                                                                                              |
| `--uilib-select-button-material-hover-bg`         | `var(--uilib-surface-dark-3)`                                                                                                                           |
| `--uilib-select-button-material-selected-bg`      | `var(--uilib-color-primary-dark)`                                                                                                                       |
| `--uilib-select-button-material-selected-fg`      | `var(--uilib-color-neutral-950, #0b1220)`                                                                                                               |
| `--uilib-select-button-min-height-resolved`       | `var(--uilib-select-button-medium-min-height, 2.5rem)`                                                                                                  |
| `--uilib-select-button-minimal-bg`                | `transparent`                                                                                                                                           |
| `--uilib-select-button-minimal-border`            | `transparent`                                                                                                                                           |
| `--uilib-select-button-minimal-hover-bg`          | `color-mix( in srgb, var(--uilib-text-dark-primary) 6%, transparent )`                                                                                  |
| `--uilib-select-button-minimal-selected-bg`       | `color-mix( in srgb, var(--uilib-text-dark-primary) 10%, transparent )`                                                                                 |
| `--uilib-select-button-minimal-selected-fg`       | `var(--uilib-text-dark-primary)`                                                                                                                        |
| `--uilib-select-button-padding-resolved`          | `calc( var(--uilib-select-button-padding-y-base) * var(--uilib-density, 1) ) calc(var(--uilib-select-button-padding-x-base) * var(--uilib-density, 1))` |
| `--uilib-select-button-padding-x-base`            | `1rem`                                                                                                                                                  |
| `--uilib-select-button-padding-y-base`            | `0.625rem`                                                                                                                                              |
| `--uilib-select-button-selected-bg-resolved`      | `var( --uilib-select-button-selected-bg, var(--uilib-color-primary-500) )`                                                                              |
| `--uilib-select-button-selected-fg-resolved`      | `var( --uilib-select-button-selected-fg, var(--uilib-color-neutral-50) )`                                                                               |
| `--uilib-select-button-shadow-resolved`           | `var(--uilib-select-button-shadow, none)`                                                                                                               |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                          |
| ------------------------------------------------------------------------- |
| applies aria-disabled when disabled                                       |
| applies aria-invalid and invalid class when invalid                       |
| applies dark theme variables                                              |
| aria-labelledby applied when set                                          |
| aria-pressed reflects selection state                                     |
| bootstrap variant applies correct classes                                 |
| commits focused option on Enter                                           |
| disabled option button has aria-disabled=                                 |
| enabled options do not have aria-disabled                                 |
| first enabled option gets tabindex=                                       |
| has role=                                                                 |
| host receives aria-label when ariaLabel is provided                       |
| host receives aria-labelledby when ariaLabelledBy is provided             |
| keeps focus unset when all options are disabled and ArrowRight is pressed |
| keeps focus unset when all options are disabled and End is pressed        |
| keyboard navigation (Space) toggles selection                             |
| marks control as touched on focusout                                      |
| material variant applies correct classes                                  |
| minimal variant applies correct classes                                   |
| moves focus backwards with ArrowLeft                                      |
| moves focus to start/end with Home/End                                    |
| moves focus with arrow keys                                               |
| multi-select mode: host has role=                                         |
| multi-select: each button has role=                                       |
| multi-select: selected buttons have aria-checked=                         |
| selected option has tabindex=                                             |
| single-select mode: host has role=                                        |
| single-select: each button has role=                                      |
| single-select: selected button has aria-checked=                          |
| tabIndexFor returns 0 for active option                                   |
| when ariaLabelledBy is set, aria-label is null                            |

## Usage Examples

```html
<!-- minimal example -->
<ui-lib-select-button [options]="sizeOptions" ariaLabel="Size" [(ngModel)]="selectedSize" />

<!-- custom item template, multiple selection -->
<ui-lib-select-button [options]="tagOptions" [multiple]="true" ariaLabel="Formatting" [(ngModel)]="selectedTags">
  <ng-template #item let-option>{{ option.label }}</ng-template>
</ui-lib-select-button>

<!-- external label -->
<label id="view-label">View mode</label>
<ui-lib-select-button [options]="viewOptions" ariaLabelledBy="view-label" [(ngModel)]="viewMode" />
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#select-button)
- [Demo page](/components/select-button)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/select-button/README.md)

