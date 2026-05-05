# FloatLabel

**Selector:** `uilib-float-label`
**Package:** `ui-lib-custom/float-label`
**Content projection:** yes — project your `<input>` (or other form control) and `<label>` as direct children

> This is a layout wrapper only — it has no CVA, no value, and no outputs. The floating behaviour is driven entirely by CSS classes applied to the host based on `variant`. Ensure the projected `<label>` has a `for` attribute matching the inner input's `id`.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'over' \| 'in' \| 'on'` | `'over'` | Determines when and where the label floats |

## Outputs

_none_

## Usage

```html
<!-- label floats above the input on focus/fill -->
<uilib-float-label>
  <input id="username" type="text" [(ngModel)]="username" />
  <label for="username">Username</label>
</uilib-float-label>

<!-- label floats inside the input -->
<uilib-float-label variant="in">
  <input id="email" type="email" [(ngModel)]="email" />
  <label for="email">Email</label>
</uilib-float-label>
```
