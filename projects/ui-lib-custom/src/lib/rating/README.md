# Rating

**Selector:** `ui-lib-rating`
**Package:** `ui-lib-custom/rating`
**Content projection:** yes — custom icon templates via named `<ng-template>` references: `#onicon` (filled star), `#officon` (empty star), `#cancelicon` (cancel button icon)

> `value` is a `model()` signal — use `[(value)]` for two-way binding. The component implements `ControlValueAccessor` for `ngModel` and reactive forms. Clicking the already-selected star deselects it (toggles off). Keyboard: arrow keys change value, digit keys 1–9 jump directly, Delete/Backspace clears (when `cancel` is true).

## ARIA Pattern

The Rating component implements **Pattern A: radiogroup** for interactive use.

- **Interactive mode** (`readonly=false`): The host element has `role="radiogroup"` and each star has `role="radio"` with `aria-checked`, `aria-label="N of M"`, `aria-posinset`, and `aria-setsize`. A roving `tabindex` keeps the selected star (or first star when nothing is selected) in the natural tab order.
- **Read-only mode** (`readonly=true`): The host element changes to `role="img"` with a self-contained `aria-label` of `"Rating: N out of M stars"`. All star elements are marked `aria-hidden="true"` because the host conveys all information. The cancel button is not rendered.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `number \| null` | `null` | Current rating. Two-way bindable via `[(value)]` or `ngModel`. |
| `stars` | `number` | `5` | Number of star icons to render. |
| `cancel` | `boolean` | `true` | Shows a clear/cancel button and enables Delete/Backspace keyboard clearing. Hidden automatically in read-only mode. |
| `disabled` | `boolean` | `false` | Disables the component. Also controlled via CVA `setDisabledState`. |
| `readonly` | `boolean` | `false` | Visible but not interactive. Changes host role to `"img"` with a descriptive aria-label. |
| `autofocus` | `boolean` | `false` | Focuses the first star after first render. |
| `ariaLabel` | `string` | `'Rating'` | Accessible label for the radiogroup element (interactive mode only). |
| `ariaLabelledby` | `string \| null` | `null` | Overrides `ariaLabel` when set (interactive mode only). |
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

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowUp` | Increase rating by 1 (capped at `stars`) |
| `ArrowLeft` / `ArrowDown` | Decrease rating by 1 (floor is 1) |
| `Delete` / `Backspace` | Clear rating (only when `cancel` is `true`) |
| `1`–`9` | Set rating to that digit (if within `stars` range) |

## Accessibility

The component uses **Pattern A: radiogroup** (ARIA 1.1 radio group pattern).

```html
<!-- Interactive: host is radiogroup, each star is a radio -->
<ui-lib-rating ariaLabel="Product rating" [(value)]="rating" />

<!-- Read-only: host becomes role="img" with descriptive aria-label -->
<ui-lib-rating [readonly]="true" [value]="4" [cancel]="false" />
<!-- Renders as: <ui-lib-rating role="img" aria-label="Rating: 4 out of 5 stars"> -->
```

Screen reader behaviour:
- Interactive: announced as "Rating group. 3 of 5, radio, 3 of 5" (varies by AT).
- Read-only: announced as "Rating: 3 out of 5 stars, image".

## ControlValueAccessor

The component implements `ControlValueAccessor`, enabling integration with Angular reactive forms and `ngModel`.

```html
<!-- ngModel -->
<ui-lib-rating [(ngModel)]="rating" />

<!-- Reactive form -->
<ui-lib-rating [formControl]="ratingControl" />
```

`setDisabledState` is supported: the form group's `disable()` / `enable()` calls propagate to the component.

## Usage

```html
<!-- Basic five-star rating with ngModel -->
<ui-lib-rating [(ngModel)]="rating" />

<!-- Ten stars, no cancel button, reactive form -->
<ui-lib-rating [stars]="10" [cancel]="false" [formControl]="ratingControl" (change)="onRate($event)" />

<!-- Read-only display (role="img") -->
<ui-lib-rating [readonly]="true" [cancel]="false" [value]="averageRating" />

<!-- Custom icon templates -->
<ui-lib-rating [(ngModel)]="rating">
  <ng-template #onicon>❤️</ng-template>
  <ng-template #officon>🤍</ng-template>
</ui-lib-rating>
```

