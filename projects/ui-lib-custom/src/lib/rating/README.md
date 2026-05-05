# Rating

**Selector:** `ui-lib-rating`
**Package:** `ui-lib-custom/rating`
**Content projection:** yes — custom icon templates via named `<ng-template>` references: `#onicon` (filled star), `#officon` (empty star), `#cancelicon` (cancel button icon)

> `value` is a `model()` signal — use `[(value)]` for two-way binding. The component implements `ControlValueAccessor` for `ngModel` and reactive forms. Clicking the already-selected star deselects it (toggles off). Keyboard: arrow keys change value, digit keys 1–9 jump directly, Delete/Backspace clears (when `cancel` is true).

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `number \| null` | `null` | Current rating. Two-way bindable via `[(value)]` or `ngModel`. |
| `stars` | `number` | `5` | Number of star icons to render. |
| `cancel` | `boolean` | `true` | Shows a clear/cancel button and enables Delete/Backspace keyboard clearing. |
| `disabled` | `boolean` | `false` | Disables the component. Also controlled via CVA `setDisabledState`. |
| `readonly` | `boolean` | `false` | Visible but not interactive. |
| `autofocus` | `boolean` | `false` | Focuses the first star after first render. |
| `ariaLabel` | `string` | `'Rating'` | Accessible label for the radiogroup element. |
| `ariaLabelledby` | `string \| null` | `null` | Overrides `ariaLabel` when set. |
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

## Usage

```html
<!-- basic five-star rating with ngModel -->
<ui-lib-rating [(ngModel)]="rating" />

<!-- ten stars, no cancel button, reactive form -->
<ui-lib-rating [stars]="10" [cancel]="false" [formControl]="ratingControl" (change)="onRate($event)" />
```
