# Rating

A star-rating component that lets users select a numeric score from 1 to N via click or keyboard.  
Implements `ControlValueAccessor` for seamless `ngModel` and reactive-form integration.

---

## Import

```ts
import { Rating } from 'ui-lib-custom/rating';
import type { RatingChangeEvent, RatingVariant, RatingSize } from 'ui-lib-custom/rating';
```

---

## Basic usage

```html
<ui-lib-rating [(ngModel)]="score" />
```

```ts
score: number | null = null;
```

---

## Two-way model binding

```html
<!-- ngModel -->
<ui-lib-rating [(ngModel)]="score" />

<!-- model() signal via [(value)] -->
<ui-lib-rating [(value)]="score" />
```

---

## Reactive forms

```html
<form [formGroup]="form">
  <ui-lib-rating formControlName="quality" />
</form>
```

```ts
form = new FormGroup({
  quality: new FormControl<number | null>(null),
});
```

---

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `stars` | `number` | `5` | Number of star icons to render. |
| `cancel` | `boolean` | `true` | When `true`, a clear/cancel button is rendered before the stars. |
| `disabled` | `boolean` | `false` | Disables the component entirely. |
| `readonly` | `boolean` | `false` | Makes the component visible but non-interactive. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual design variant; falls back to `ThemeConfigService` when `null`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls the star icon size. |
| `ariaLabel` | `string` | `'Rating'` | Accessible label for the `radiogroup` host element. |
| `ariaLabelledby` | `string \| null` | `null` | Explicit `aria-labelledby` override; takes priority over `ariaLabel`. |
| `iconOnClass` | `string \| null` | `null` | Extra CSS class applied to the icon element of a filled star. |
| `iconOffClass` | `string \| null` | `null` | Extra CSS class applied to the icon element of an empty star. |
| `iconCancelClass` | `string \| null` | `null` | Extra CSS class applied to the cancel icon element. |

---

## Outputs

| Output | Type | Description |
|---|---|---|
| `change` | `RatingChangeEvent` | Emitted when the value changes (including clears). |

### RatingChangeEvent

```ts
interface RatingChangeEvent {
  /** New rating value; null when the rating was cleared. */
  value: number | null;
  /** Original DOM event that triggered the change. */
  originalEvent: Event;
}
```

---

## Model signal

| Signal | Type | Description |
|---|---|---|
| `value` | `ModelSignal<number \| null>` | Current rating value. Supports `[(value)]` two-way binding. |

---

## Keyboard navigation

The host element carries `role="radiogroup"`. Individual stars carry `role="radio"` with a roving `tabindex`.

| Key | Action |
|---|---|
| `ArrowRight` / `ArrowUp` | Increase rating by 1 (capped at `stars`) |
| `ArrowLeft` / `ArrowDown` | Decrease rating by 1 (floor is 1) |
| `Delete` / `Backspace` | Clear rating (only when `cancel` is `true`) |
| `1`–`9` | Set rating to that digit (if within `stars` range) |

---

## Variants

```html
<ui-lib-rating variant="material" [ngModel]="4" [readonly]="true" [cancel]="false" />
<ui-lib-rating variant="bootstrap" [ngModel]="4" [readonly]="true" [cancel]="false" />
<ui-lib-rating variant="minimal"   [ngModel]="4" [readonly]="true" [cancel]="false" />
```

---

## Sizes

```html
<ui-lib-rating size="sm" />
<ui-lib-rating size="md" />
<ui-lib-rating size="lg" />
```

---

## Custom star count

```html
<!-- 10-star scale -->
<ui-lib-rating [stars]="10" [(ngModel)]="score" />
```

---

## Readonly and disabled states

```html
<!-- Read-only: visible, cursor default, no interaction -->
<ui-lib-rating [readonly]="true" [(ngModel)]="score" />

<!-- Disabled: opacity 0.6, pointer-events none -->
<ui-lib-rating [disabled]="true" [(ngModel)]="score" />
```

---

## Handling the change event

```html
<ui-lib-rating [(ngModel)]="score" (change)="onRatingChange($event)" />
```

```ts
onRatingChange(event: RatingChangeEvent): void {
  console.log('New value:', event.value);
}
```

---

## CSS custom properties (theming tokens)

| Property | Default | Description |
|---|---|---|
| `--uilib-rating-star-on-color` | `var(--uilib-color-primary-500, #f59e0b)` | Filled star colour |
| `--uilib-rating-star-off-color` | `var(--uilib-color-neutral-300, #d1d5db)` | Empty star colour |
| `--uilib-rating-star-hover-color` | `var(--uilib-color-primary-400, #fbbf24)` | Hover preview colour |
| `--uilib-rating-cancel-color` | `var(--uilib-color-neutral-400, #9ca3af)` | Cancel icon colour |
| `--uilib-rating-cancel-hover-color` | `var(--uilib-color-danger-500, #ef4444)` | Cancel hover colour |
| `--uilib-rating-gap` | `0.25rem` | Gap between stars and cancel button |
| `--uilib-rating-star-size-sm` | `1rem` | Star size – sm |
| `--uilib-rating-star-size-md` | `1.5rem` | Star size – md |
| `--uilib-rating-star-size-lg` | `2rem` | Star size – lg |
| `--uilib-rating-focus-shadow` | `0 0 0 2px color-mix(…)` | Focus ring shadow |

Override for custom themes:

```css
ui-lib-rating {
  --uilib-rating-star-on-color: #e53935;
  --uilib-rating-star-hover-color: #ef9a9a;
}
```

---

## Accessibility

- Host element: `role="radiogroup"`, `aria-label` / `aria-labelledby` exposed as inputs.
- Each star: `role="radio"`, `aria-checked`, `aria-label="N of M"`, `aria-posinset`, `aria-setsize`.
- Cancel button: `role="button"`, `aria-label="Clear rating"`, keyboard-activatable via `Enter`/`Space`.
- Disabled state propagated from parent form control via `ControlValueAccessor.setDisabledState`.
- Roving `tabindex` keeps focus management compliant with ARIA radio-group pattern.

---

## Live demo

`http://localhost:4200/rating`

## Source

`projects/ui-lib-custom/src/lib/rating/`

