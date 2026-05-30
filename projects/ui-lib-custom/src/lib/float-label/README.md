# FloatLabel

**Selector:** `ui-lib-float-label`
**Package:** `ui-lib-custom/float-label`
**Content projection:** yes — project your `<input>` (or other form control) and `<label>` as direct children

> This is a layout wrapper only — it has no CVA, no value, and no outputs. The floating behaviour is driven entirely by CSS pseudo-selectors (`:focus-within`, `:not(:placeholder-shown)`) and state classes on projected wrapper components. JavaScript is only used to keep the projected `<label>` and control IDs wired correctly and to inject the blank placeholder needed by native inputs when it is omitted.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'over' \| 'in' \| 'on'` | `'over'` | Determines when and where the label floats |

## Outputs

_none_

## Usage

```html
<!-- label floats above the input on focus/fill (over variant) -->
<ui-lib-float-label>
  <input id="username" type="text" placeholder=" " [(ngModel)]="username" />
  <label for="username">Username</label>
</ui-lib-float-label>

<!-- label floats inside the input (in variant) -->
<ui-lib-float-label variant="in">
  <input id="email" type="email" placeholder=" " [(ngModel)]="email" />
  <label for="email">Email</label>
</ui-lib-float-label>

<!-- label sits on the border of the input (on variant) -->
<ui-lib-float-label variant="on">
  <input id="city" type="text" placeholder=" " [(ngModel)]="city" />
  <label for="city">City</label>
</ui-lib-float-label>

<!-- works with ui-lib-input (note: set label="" to suppress internal label) -->
<ui-lib-float-label>
  <ui-lib-input id="first-name" label="" placeholder=" " [(ngModel)]="firstName" />
  <label for="first-name">First Name</label>
</ui-lib-float-label>

<!-- works with ui-lib-password -->
<ui-lib-float-label>
  <ui-lib-password inputId="account-password" [feedback]="false" placeholder=" " />
  <label for="account-password">Password</label>
</ui-lib-float-label>

<!-- works with textarea -->
<ui-lib-float-label>
  <textarea id="bio" placeholder=" " [(ngModel)]="bio"></textarea>
  <label for="bio">Bio</label>
</ui-lib-float-label>

<!-- works with ui-lib-select (external label id is mirrored to aria-labelledby) -->
<ui-lib-float-label>
  <ui-lib-select [options]="cityOptions" />
  <label>City</label>
</ui-lib-float-label>
```

## Accessibility

### Required: `<label for="inputId">` association

The projected label should be a real `<label>` element. For native inputs and components that render a native input internally (`ui-lib-input`, `ui-lib-password`, `ui-lib-autocomplete`), prefer an explicit `for`/`id` pair. FloatLabel will generate and sync the `id`/`for` values for you when they are omitted, but explicit IDs are still the clearest consumer contract.

```html
<!-- ✅ Correct -->
<ui-lib-float-label>
  <input id="my-field" type="text" placeholder=" " />
  <label for="my-field">My Field</label>
</ui-lib-float-label>

<!-- ❌ Wrong — no for/id association -->
<ui-lib-float-label>
  <input type="text" placeholder=" " />
  <label>My Field</label> <!-- FloatLabel will repair this, but explicit wiring is preferred -->
</ui-lib-float-label>
```

> **Select note:** `ui-lib-select` exposes a combobox host rather than a native `<select>`. FloatLabel mirrors the projected label `id` to the select host's `aria-labelledby` so the accessible name stays intact even though native `label[for]` focus behaviour does not apply.

### Required for native controls: `placeholder=" "` (single space)

For native `<input>` and `<textarea>`, CSS float detection uses `:not(:placeholder-shown)`. That selector only activates when the control has a placeholder attribute, so the recommended pattern is `placeholder=" "` (a single space).

```html
<ui-lib-float-label>
  <input id="email" type="email" placeholder=" " />
  <label for="email">Email address</label>
</ui-lib-float-label>
```

If you omit the placeholder, FloatLabel will inject `placeholder=" "` for native inputs and textareas so the CSS-only float state still works.

### Float animation and `prefers-reduced-motion`

The label transition is disabled automatically when the user has requested reduced motion:

```scss
@media (prefers-reduced-motion: reduce) {
  .ui-lib-float-label label {
    transition: none;
  }
}
```

No additional configuration is required. Components that rely on this component inherit this behaviour automatically.

### Font size at floated position

The floated label uses `--ui-lib-float-label-active-font-size` (default `0.75rem` = 12 px at the standard 16 px base), which satisfies the WCAG 1.4.4 Resize Text requirement of ≥ 11 px at 200 % browser zoom.

### Screen reader behaviour

The label is always present in the DOM — it is repositioned via CSS only, never added or removed dynamically. Screen readers announce it as the control's accessible name. `pointer-events: none` keeps the overlaid label from intercepting pointer interaction while it visually overlaps the control.

### Compatible controls and composition

- Native: `<input>`, `<textarea>`
- Wrapper components with native inner inputs: `ui-lib-input`, `ui-lib-password`, `ui-lib-autocomplete`
- Wrapper components with host-level labelling: `ui-lib-select`

FloatLabel composes well with:

- `ui-lib-form-field` for shared hint/error/required semantics around the wrapped control
- `ui-lib-input-group` when the projected control already handles addon spacing and you want the label to float above the whole field

## CSS Custom Properties

| Token | Default | Description |
|-------|---------|-------------|
| `--ui-lib-float-label-color` | `var(--uilib-text-secondary-color, #6b7280)` | Resting label color |
| `--ui-lib-float-label-active-color` | `var(--uilib-text-secondary-color, #6b7280)` | Filled-but-not-focused label color |
| `--ui-lib-float-label-focus-color` | `var(--uilib-primary-color, #3b82f6)` | Label color when control is focused |
| `--ui-lib-float-label-invalid-color` | `var(--uilib-error-color, #ef4444)` | Label color when control is invalid and dirty |
| `--ui-lib-float-label-font-size` | `1rem` | Resting label font size |
| `--ui-lib-float-label-active-font-size` | `0.75rem` | Floated/active label font size |
| `--ui-lib-float-label-transition` | `0.2s ease` | Label animation timing (duration + easing); set to `0ms` when `prefers-reduced-motion: reduce` |
| `--ui-lib-float-label-on-border-radius` | `var(--uilib-input-radius, var(--uilib-shape-base, 6px))` | Floated label chip radius for the `on` variant |
