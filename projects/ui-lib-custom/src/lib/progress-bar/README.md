# ProgressBar

A horizontal bar component that visualises progress or loading state.

## Package path

```ts
import { ProgressBar } from 'ui-lib-custom/progress-bar';
```

## Selector

```html
<ui-lib-progress-bar />
```

## Inputs

| Input             | Type                                             | Default         | Description                                                                                                 |
| ----------------- | ------------------------------------------------ | --------------- | ----------------------------------------------------------------------------------------------------------- |
| `value`           | `number`                                         | `0`             | Progress value from 0 to 100 (clamped automatically).                                                       |
| `mode`            | `'determinate' \| 'indeterminate'`               | `'determinate'` | Display mode.                                                                                               |
| `showValue`       | `boolean`                                        | `true`          | Whether to show the percentage label inside the fill.                                                       |
| `label`           | `string \| null`                                 | `null`          | Custom label text; overrides the computed percentage string.                                                |
| `size`            | `'sm' \| 'md' \| 'lg'`                           | `'md'`          | Bar height size token.                                                                                      |
| `variant`         | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`          | Design variant; inherits from `ThemeConfigService` when `null`.                                             |
| `color`           | `string \| null`                                 | `null`          | Custom CSS color applied directly to the fill (overrides CSS var).                                          |
| `styleClass`      | `string \| null`                                 | `null`          | Additional CSS classes added to the host element.                                                           |
| `ariaLabel`       | `string \| null`                                 | `null`          | Accessible label for the bar. Auto-set to `"Loading"` in indeterminate mode when not provided.              |
| `ariaLabelledBy`  | `string \| null`                                 | `null`          | ID of an external element that labels this bar (`aria-labelledby`).                                         |
| `ariaValueText`   | `string \| null`                                 | `null`          | Human-readable value text for screen readers. Overrides the default (`"75%"` / `"Loading…"`). Use for i18n. |
| `completionLabel` | `string \| null`                                 | `null`          | Message announced via a polite live region when value reaches 100%. Defaults to `"Complete"`.               |

## Outputs

None.

## Accessibility

### ARIA attributes

| Attribute         | Determinate                | Indeterminate              |
| ----------------- | -------------------------- | -------------------------- |
| `role`            | `progressbar`              | `progressbar`              |
| `aria-valuemin`   | `0`                        | `0`                        |
| `aria-valuemax`   | `100`                      | `100`                      |
| `aria-valuenow`   | clamped numeric value      | **absent** (not `"0"`)     |
| `aria-valuetext`  | `"75%"` (or i18n override) | `"Loading…"` (or override) |
| `aria-label`      | value of `ariaLabel` input | `"Loading"` (or override)  |
| `aria-labelledby` | value of `ariaLabelledBy`  | value of `ariaLabelledBy`  |
| `aria-busy`       | absent                     | `"true"`                   |

> **Why `aria-valuenow` must be absent in indeterminate mode:** Screen readers interpret the
> _absence_ of `aria-valuenow` as "progress unknown". Setting it to any value — including `0` —
> would announce a specific percentage, which is misleading.

### Completion announcement

When `value` reaches `100` a `<span aria-live="polite" aria-atomic="true">` is injected into
the DOM. Screen readers announce its content once the value stabilises. Provide a localised
string via `completionLabel` if your app is not in English.

### i18n note

Both `ariaValueText` and `completionLabel` accept arbitrary strings, allowing full localisation:

```html
<!-- German example -->
<ui-lib-progress-bar
  [value]="progress"
  ariaValueText="{{ progress }} Prozent"
  completionLabel="Fertig"
/>
```

## Usage examples

### Determinate

```html
<ui-lib-progress-bar [value]="uploadProgress" />
```

### Indeterminate

```html
<!-- aria-label defaults to "Loading" automatically -->
<ui-lib-progress-bar mode="indeterminate" />

<!-- Custom label for screen readers -->
<ui-lib-progress-bar mode="indeterminate" ariaLabel="Saving your changes" />
```

### With external label

```html
<p id="progress-heading">Upload progress</p>
<ui-lib-progress-bar [value]="progress" ariaLabelledBy="progress-heading" />
```

### Custom colour and label

```html
<ui-lib-progress-bar [value]="60" color="#10b981" label="Syncing…" />
```

### Custom label template

Use `#labelTemplate` for rich label content. The slot receives `{ $implicit: number, value: number, displayLabel: string }`.

```html
<ui-lib-progress-bar [value]="progress">
  <ng-template #labelTemplate let-value="value" let-label="displayLabel">
    <strong>{{ label }}</strong> — step {{ step }} of {{ total }}
  </ng-template>
</ui-lib-progress-bar>
```

### Sizes

```html
<ui-lib-progress-bar [value]="40" size="sm" />
<ui-lib-progress-bar [value]="40" size="md" />
<ui-lib-progress-bar [value]="40" size="lg" />
```

### Variants

```html
<ui-lib-progress-bar [value]="70" variant="material" />
<ui-lib-progress-bar [value]="70" variant="bootstrap" />
<ui-lib-progress-bar [value]="70" variant="minimal" />
```

## Content projection

| Slot             | Template context                                             | Description                                                                                                                                                            |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `#labelTemplate` | `{ $implicit: number, value: number, displayLabel: string }` | Custom content rendered inside the fill bar in place of the default percentage / `label` text. Only rendered when `showValue` is `true` and `mode` is `'determinate'`. |

## CSS custom properties

| Property                                       | Default                                                      | Description                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `--uilib-progress-bar-height`                  | `1.25rem`                                                    | Bar height (md).                                                                |
| `--uilib-progress-bar-height-sm`               | `0.625rem`                                                   | Bar height (sm).                                                                |
| `--uilib-progress-bar-height-lg`               | `1.75rem`                                                    | Bar height (lg).                                                                |
| `--uilib-progress-bar-border-radius`           | `var(--uilib-radius-full, 9999px)`                           | Track and fill border radius.                                                   |
| `--uilib-progress-bar-track-bg`                | `var(--uilib-surface-200, #e5e7eb)`                          | Track background colour.                                                        |
| `--uilib-progress-bar-fill-bg`                 | `var(--uilib-color-primary, #6366f1)`                        | Fill background colour.                                                         |
| `--uilib-progress-bar-label-color`             | `#fff`                                                       | Label text colour.                                                              |
| `--uilib-progress-bar-label-font-size`         | `0.75rem`                                                    | Label font size.                                                                |
| `--uilib-progress-bar-transition`              | `width 0.4s ease`                                            | Fill width transition; zeroed by `prefers-reduced-motion`                       |
| `--uilib-progress-bar-shadow`                  | `none`                                                       | Track box shadow (material variant adds inset elevation).                       |
| `--uilib-progress-bar-indeterminate-animation` | `uilib-progress-bar-indeterminate 1.6s infinite ease-in-out` | Indeterminate oscillation animation; set to `none` by `prefers-reduced-motion`. |
