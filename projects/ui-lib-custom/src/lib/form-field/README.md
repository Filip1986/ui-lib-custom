# FormField

**Selector:** `ui-lib-form-field`
**Package:** `ui-lib-custom/form-field`
**Content projection:** yes — place one form control (`input`, `select`, `textarea`, or `ui-lib-*` input component) inside the component

> New error messages are automatically announced to screen readers via `LiveAnnouncerService`; you do not need to add a separate `aria-live` region for validation feedback.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string \| null` | `null` | Renders a `<label>` wired to the projected control ID |
| `inputId` | `string \| null` | `null` | Optional explicit control ID. If omitted, FormField generates a stable `form-field-*-input` ID |
| `hint` | `string \| null` | `null` | Hint text rendered below the control and included in `aria-describedby` |
| `error` | `string \| null` | `null` | Error text rendered with `role="alert"` and included in `aria-describedby` when invalid |
| `invalid` | `boolean` | `false` | Marks control invalid (`aria-invalid="true"`). Error text is treated as invalid automatically when present |
| `required` | `boolean` | `false` | Sets `aria-required="true"` (and native `required`) on projected native controls |
| `disabled` | `boolean` | `false` | Sets `aria-disabled="true"` (and native `disabled`) on projected native controls |

## Outputs

_none_

## Accessibility wiring

`FormField` orchestrates a complete label → control → hint/error relationship:

- Label: `for="<inputId>"` + generated `labelId`
- Hint: generated `hintId`, appended to `aria-describedby`
- Error: generated `errorId`, `role="alert"`, appended to `aria-describedby` when invalid
- Control state: `aria-invalid`, `aria-required`, and `aria-disabled`

When both hint and error are active, FormField uses a single space-separated `aria-describedby` value:

```html
aria-describedby="form-field-1-hint form-field-1-error"
```

For built-in inputs, FormField also exposes a DI context token (`FORM_FIELD_CONTEXT`) so inner `ui-lib-*` controls can consume the same IDs and state without prop drilling.

## Usage

### Native input

```html
<ui-lib-form-field
  label="Email address"
  [required]="true"
  [invalid]="!!emailError()"
  [error]="emailError()"
  hint="Enter your work email"
>
  <input type="email" name="email" />
</ui-lib-form-field>
```

### Built-in input

```html
<ui-lib-form-field label="Email address" [error]="emailError()" [invalid]="!!emailError()">
  <ui-lib-input type="email" />
</ui-lib-form-field>
```

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--uilib-form-field-error-animation` | `ui-lib-form-field-error-slide-in 180ms ease-out` | Error message entrance animation; set to `none` when `prefers-reduced-motion: reduce` |
