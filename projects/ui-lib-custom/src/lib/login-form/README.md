# LoginForm

**Selector:** `ui-lib-login-form`
**Package:** `ui-lib-custom/login-form`
**Content projection:** yes — two named slots:
- `[sidebar-brand]` — not used in this component (see SidebarMenu)
- `[social-buttons]` — additional social login buttons injected before the built-in Google/GitHub/Microsoft buttons when `showSocialLogin` is `true`

> The component ships its own email/password/remember state internally; the `login` output carries the final values — do not bind external form controls to the internal fields.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'centered' \| 'split' \| 'minimal'` | `'centered'` | Layout template to render |
| `showSocialLogin` | `boolean` | `false` | Shows the social-login section with Google, GitHub, and Microsoft buttons |
| `showRememberMe` | `boolean` | `false` | Shows a "Remember me" checkbox |
| `logoTemplate` | `TemplateRef<unknown> \| null` | `null` | Optional logo template rendered at the top of the card |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `login` | `{ email: string; password: string; remember: boolean }` | Emitted on form submit with trimmed email |
| `forgotPassword` | `void` | Emitted when the user clicks "Forgot password?" |
| `socialLogin` | `'google' \| 'github' \| 'microsoft'` | Emitted when a built-in social button is clicked |

## Usage

```html
<ui-lib-login-form
  variant="centered"
  [showRememberMe]="true"
  (login)="onLogin($event)"
  (forgotPassword)="onForgot()"
/>
```
