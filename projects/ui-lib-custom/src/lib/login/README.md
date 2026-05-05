# LoginComponent

**Selector:** `lib-login` — component
**Package:** `ui-lib-custom/login`
**Content projection:** no — none

> The selector is `lib-login`, not the `ui-lib-*` convention used by other components. The `variant` input is a string union `'1' | '2' | '3'` (not a number), selecting between three layout templates rendered by an internal factory component.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `title` | `string` | `'Sign In'` | Heading text rendered inside the login form |
| `variant` | `'1' \| '2' \| '3'` | `'1'` | Login layout template to render |
| `loading` | `boolean` | `false` | Shows a loading state on the submit button |
| `socialProviders` | `LoginSocialProvider[]` | default providers | List of social login buttons to display |
| `features` | `LoginFeatures` | all `true` | Toggles individual UI sections |

### `LoginFeatures` shape

| Property | Type | Default | Notes |
|----------|------|---------|-------|
| `showSocialLogin` | `boolean` | `true` | Show social login buttons |
| `showRememberMe` | `boolean` | `true` | Show remember-me checkbox |
| `showForgotPassword` | `boolean` | `true` | Show forgot-password link |
| `showRegisterLink` | `boolean` | `true` | Show register/sign-up link |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `submitLogin` | `LoginFormData` | Emits `{ username, password, rememberMe }` on form submit |
| `registerClick` | `void` | Emitted when the register link is clicked |
| `forgotPasswordClick` | `string` | Emitted with the email value when the forgot-password link is clicked |
| `socialLoginClick` | `string` | Emitted with the provider `id` when a social button is clicked |
| `rememberMeChange` | `boolean` | Emitted when the remember-me checkbox changes |

## Usage

```html
<lib-login
  variant="2"
  [features]="{ showSocialLogin: false }"
  (submitLogin)="onLogin($event)"
/>
```
