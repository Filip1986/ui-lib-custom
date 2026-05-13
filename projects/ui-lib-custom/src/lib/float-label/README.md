# FloatLabel

**Selector:** `uilib-float-label`
**Package:** `ui-lib-custom/float-label`
**Content projection:** yes — project your `<input>` (or other form control) and `<label>` as direct children

> This is a layout wrapper only — it has no CVA, no value, and no outputs. The floating behaviour is driven entirely by CSS pseudo-selectors (`:focus-within`, `:not(:placeholder-shown)`) and state classes on projected wrapper components. No JavaScript is required for the float animation.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'over' \| 'in' \| 'on'` | `'over'` | Determines when and where the label floats |

## Outputs

_none_

## Usage

```html
<!-- label floats above the input on focus/fill (over variant) -->
<uilib-float-label>
  <input id="username" type="text" placeholder=" " [(ngModel)]="username" />
  <label for="username">Username</label>
</uilib-float-label>

<!-- label floats inside the input (in variant) -->
<uilib-float-label variant="in">
  <input id="email" type="email" placeholder=" " [(ngModel)]="email" />
  <label for="email">Email</label>
</uilib-float-label>

<!-- label sits on the border of the input (on variant) -->
<uilib-float-label variant="on">
  <input id="city" type="text" placeholder=" " [(ngModel)]="city" />
  <label for="city">City</label>
</uilib-float-label>

<!-- works with ui-lib-input (note: set label="" to suppress internal label) -->
<uilib-float-label>
  <ui-lib-input id="first-name" label="" placeholder=" " [(ngModel)]="firstName" />
  <label for="first-name">First Name</label>
</uilib-float-label>

<!-- works with textarea -->
<uilib-float-label>
  <textarea id="bio" placeholder=" " [(ngModel)]="bio"></textarea>
  <label for="bio">Bio</label>
</uilib-float-label>
```

## Accessibility

### Required: `<label for="inputId">` association

The projected `<label>` **must** be a real `<label>` element with a `for` attribute matching the `id` of the projected input. This creates the native browser and screen reader association between the label and the control. A `<span>` or `<div>` styled to look like a label is not acceptable — it loses native semantics.

```html
<!-- ✅ Correct -->
<uilib-float-label>
  <input id="my-field" type="text" placeholder=" " />
  <label for="my-field">My Field</label>
</uilib-float-label>

<!-- ❌ Wrong — no for/id association -->
<uilib-float-label>
  <input type="text" placeholder=" " />
  <label>My Field</label>
</uilib-float-label>
```

> **Tip:** When projecting `<ui-lib-input>`, it automatically generates a stable `id` for the inner input and exposes it. Pass the same id to the external `<label for="...">`.

### Float animation and `prefers-reduced-motion`

The label transition is disabled automatically when the user has requested reduced motion:

```scss
@media (prefers-reduced-motion: reduce) {
  .uilib-float-label label {
    transition: none;
  }
}
```

No additional configuration is required. Components that rely on this component inherit this behaviour automatically.

### Font size at floated position

The floated label uses `--uilib-float-label-active-font-size` (default `0.75rem` = 12 px at the standard 16 px base), which satisfies the WCAG 1.4.4 Resize Text requirement of ≥ 11 px at 200 % browser zoom.

### Screen reader behaviour

The label is always present in the DOM — it is repositioned via CSS only, never added or removed dynamically. Screen readers will announce the label once, as the accessible name for the associated input. There is no double-announcement risk.

## CSS Custom Properties

| Token | Default | Description |
|-------|---------|-------------|
| `--uilib-float-label-color` | `var(--uilib-text-secondary-color, #6b7280)` | Resting label color |
| `--uilib-float-label-active-color` | `var(--uilib-text-secondary-color, #6b7280)` | Filled-but-not-focused label color |
| `--uilib-float-label-focus-color` | `var(--uilib-primary-color, #3b82f6)` | Label color when control is focused |
| `--uilib-float-label-invalid-color` | `var(--uilib-error-color, #ef4444)` | Label color when control is invalid and dirty |
| `--uilib-float-label-font-size` | `1rem` | Resting label font size |
| `--uilib-float-label-active-font-size` | `0.75rem` | Floated/active label font size |
| `--uilib-float-label-transition-duration` | `0.2s` | Label animation duration |
| `--uilib-float-label-transition-timing` | `ease` | Label animation easing function |
