# FormField

**Selector:** `ui-lib-form-field`
**Package:** `ui-lib-custom/form-field`
**Content projection:** yes — place the form control (input, select, etc.) inside the component

> New error messages are automatically announced to screen readers via `LiveAnnouncerService`; you do not need to add a separate `aria-live` region for validation feedback.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `error` | `string \| null` | `null` | Displays an error message below the control and sets `aria-live="assertive"` on the message element |
| `hint` | `string \| null` | `null` | Displays a hint below the control; hidden when `error` is set |

## Outputs

_none_

## Usage

```html
<ui-lib-form-field [error]="emailError()" hint="Enter your work email">
  <input type="email" name="email" />
</ui-lib-form-field>
```
