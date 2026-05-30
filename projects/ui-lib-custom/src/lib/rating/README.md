# Rating

**Selector:** `ui-lib-rating`
**Package:** `ui-lib-custom/rating`
**Content projection:** yes — custom icon templates via named `<ng-template>` references: `#onicon` (filled star), `#officon` (empty star), `#cancelicon` (cancel button icon)

> `value` is a `model()` signal — use `[(value)]` for two-way binding. The component implements `ControlValueAccessor` for `ngModel` and reactive forms. Clicking the already-selected star deselects it (toggles off). Keyboard: arrow keys change value, digit keys 1–9 jump directly, Delete/Backspace clears (when `cancel` is true).

## ARIA Pattern — Pattern A: radiogroup (chosen)

This component uses **Pattern A (radiogroup)** for interactive mode:

- The host element carries `role="radiogroup"` and `aria-label` / `aria-labelledby`.
- Each star renders as `role="radio"` with `aria-checked` and a human-readable `aria-label` (`"1 star out of 5"`, `"2 stars out of 5"`, …).
- Focus is managed with a roving `tabindex`: the active star has `tabindex="0"`; all others have `tabindex="-1"`. When no value is selected, the first star holds `tabindex="0"`.
- Arrow keys both move focus and immediately commit the new value.

### Read-only mode

When `readonly="true"` the component switches to a **read-only display role**:

- The host carries `role="img"` and a descriptive `aria-label` (e.g. `"Rating: 3 out of 5 stars"`).
- All star elements are rendered as decorative spans with `aria-hidden="true"`.
- No interactive elements (buttons, tabindex, event handlers) are present.
- The cancel button is never shown in read-only mode.

### Why Pattern A (not Pattern B: slider)?

Pattern A maps naturally to the discrete 1-to-N integer selection semantics of a star rating. `role=radiogroup` communicates "choose exactly one option from a set", which is more accurate than `role=slider` for this use case. Each option has a meaningful label ("3 stars"), making the choice self-describing.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `number \| null` | `null` | Current rating. Two-way bindable via `[(value)]` or `ngModel`. |
| `stars` | `number` | `5` | Number of star icons to render. |
| `cancel` | `boolean` | `true` | Shows a clear/cancel button and enables Delete/Backspace keyboard clearing. |
| `disabled` | `boolean` | `false` | Disables the component. Also controlled via CVA `setDisabledState`. |
| `readonly` | `boolean` | `false` | Visible but not interactive. Changes role to `"img"`. |
| `autofocus` | `boolean` | `false` | Focuses the first star after first render. |
| `ariaLabel` | `string \| null` | `null` | Accessible label for the radiogroup element. If omitted, the component falls back to `"Rating"` and logs a DEV-mode warning unless `ariaLabelledby` is provided. Overridden with descriptive text in read-only mode. |
| `ariaLabelledby` | `string \| null` | `null` | Overrides `ariaLabel` when set. Ignored in read-only mode. |
| `iconOnClass` | `string \| null` | `null` | Extra CSS class on filled star icons. |
| `iconOnStyle` | `Record<string, string> \| null` | `null` | Inline styles on filled star icons. |
| `iconOffClass` | `string \| null` | `null` | Extra CSS class on empty star icons. |
| `iconOffStyle` | `Record<string, string> \| null` | `null` | Inline styles on empty star icons. |
| `iconCancelClass` | `string \| null` | `null` | Extra CSS class on the cancel icon. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme when null. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component density. |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `change` | `RatingChangeEvent` | Emitted on every value change, including clears. Value is `number \| null`. |
| `rate` | `RatingRateEvent` | Emitted only when a star is selected (value is always a positive integer). |
| `cleared` | `Event` | Emitted when the rating is cleared via cancel button, toggle-deselect, or Delete key. |
| `focus` | `FocusEvent` | Emitted when any star receives focus. |
| `blur` | `FocusEvent` | Emitted when any star loses focus. |

## Keyboard navigation

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowUp` | Increase rating by one (max = `stars`). |
| `ArrowLeft` / `ArrowDown` | Decrease rating by one (min = 1). |
| `Delete` / `Backspace` | Clear rating (only when `cancel` is true). |
| `1`–`9` | Set rating directly to that digit (if within `stars` range). |

## ControlValueAccessor

The component implements `ControlValueAccessor` and works with `ngModel` and reactive forms:

```html
<!-- ngModel -->
<ui-lib-rating [(ngModel)]="rating" />

<!-- Reactive form -->
<ui-lib-rating [formControl]="ratingControl" />
```

Programmatic disable via `FormControl.disable()` is propagated through `setDisabledState`.

## Accessible naming guidance

Provide either `ariaLabel` or `ariaLabelledby` whenever no visible label exists. In DEV mode the component warns when both are omitted in interactive mode, even though it still falls back to `"Rating"` so the widget remains named for assistive technologies.

## Usage

```html
<!-- basic five-star rating with ngModel -->
<ui-lib-rating [(ngModel)]="rating" />

<!-- ten stars, no cancel button, reactive form -->
<ui-lib-rating [stars]="10" [cancel]="false" [formControl]="ratingControl" (ratingChange)="onRate($event)" />

<!-- read-only display (role="img", aria-label describes the value) -->
<ui-lib-rating [readonly]="true" [(ngModel)]="rating" />
```

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--uilib-rating-star-on-color` | `var(--uilib-color-primary-500, #f59e0b)` | Filled star color |
| `--uilib-rating-star-off-color` | `var(--uilib-color-neutral-300, #d1d5db)` | Empty star color |
| `--uilib-rating-star-hover-color` | `var(--uilib-color-primary-400, #fbbf24)` | Star color on hover |
| `--uilib-rating-cancel-color` | `var(--uilib-color-neutral-400, #9ca3af)` | Cancel button color |
| `--uilib-rating-cancel-hover-color` | `var(--uilib-color-danger-500, #ef4444)` | Cancel button hover color |
| `--uilib-rating-gap` | `0.25rem` | Gap between stars |
| `--uilib-rating-focus-shadow` | `0 0 0 2px color-mix(…primary-500… 40%, transparent)` | Focus ring box-shadow |
| `--uilib-rating-star-transition` | `color 0.15s ease, transform 0.1s ease` | Star hover/color transition; set to `none` when `prefers-reduced-motion: reduce` |
| `--uilib-rating-cancel-transition` | `color 0.15s ease, transform 0.1s ease` | Cancel hover/color transition; set to `none` when `prefers-reduced-motion: reduce` |
