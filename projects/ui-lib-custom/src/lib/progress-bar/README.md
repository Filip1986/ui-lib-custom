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

| Input        | Type                                      | Default           | Description                                                         |
|--------------|-------------------------------------------|-------------------|---------------------------------------------------------------------|
| `value`      | `number`                                  | `0`               | Progress value from 0 to 100 (clamped automatically).              |
| `mode`       | `'determinate' \| 'indeterminate'`        | `'determinate'`   | Display mode.                                                       |
| `showValue`  | `boolean`                                 | `true`            | Whether to show the percentage label inside the fill.              |
| `label`      | `string \| null`                          | `null`            | Custom label text; overrides the computed percentage string.        |
| `size`       | `'sm' \| 'md' \| 'lg'`                   | `'md'`            | Bar height size token.                                              |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Design variant; inherits from `ThemeConfigService` when `null`.    |
| `color`      | `string \| null`                          | `null`            | Custom CSS color applied directly to the fill (overrides CSS var). |
| `styleClass` | `string \| null`                          | `null`            | Additional CSS classes added to the host element.                  |

## Outputs

None.

## Accessibility

- The host element carries `role="progressbar"`, `aria-valuemin="0"`, and `aria-valuemax="100"`.
- In determinate mode `aria-valuenow` is set to the clamped value.
- In indeterminate mode `aria-valuenow` is omitted, `aria-busy="true"` is set, and `aria-label="Loading"` provides a screen-reader description.

## Usage examples

### Determinate

```html
<ui-lib-progress-bar [value]="uploadProgress" />
```

### Indeterminate

```html
<ui-lib-progress-bar mode="indeterminate" />
```

### Custom colour and label

```html
<ui-lib-progress-bar [value]="60" color="#10b981" label="Syncing…" />
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

## CSS custom properties

| Property                              | Default                         | Description                    |
|---------------------------------------|---------------------------------|--------------------------------|
| `--uilib-progress-bar-height`         | `1.25rem`                       | Bar height (md).               |
| `--uilib-progress-bar-height-sm`      | `0.625rem`                      | Bar height (sm).               |
| `--uilib-progress-bar-height-lg`      | `1.75rem`                       | Bar height (lg).               |
| `--uilib-progress-bar-border-radius`  | `var(--uilib-radius-full)`      | Track and fill border radius.  |
| `--uilib-progress-bar-track-bg`       | `var(--uilib-surface-200)`      | Track background colour.       |
| `--uilib-progress-bar-fill-bg`        | `var(--uilib-color-primary)`    | Fill background colour.        |
| `--uilib-progress-bar-label-color`    | `#fff`                          | Label text colour.             |
| `--uilib-progress-bar-label-font-size`| `0.75rem`                       | Label font size.               |
| `--uilib-progress-bar-transition`     | `width 0.4s ease`               | Fill width transition.         |
