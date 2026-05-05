# ToggleSwitch

**Selector:** `ui-lib-toggle-switch`
**Package:** `ui-lib-custom/toggle-switch`
**Content projection:** yes — rendered as the label when `label` input is null (only one of `label` input or projected content is shown at a time)

> `checked` is a two-way `model()` signal — use `[(checked)]`. The native `change` DOM event is intentionally stopped from bubbling; listen to the typed `change` output instead.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string \| null` | `null` | Text label beside the switch; when null, `<ng-content>` is rendered instead |
| `ariaLabel` | `string \| null` | `null` | Applied directly to the native `<input>`; overrides auto aria-labelledby |
| `inputId` | `string \| null` | `null` | Forwarded to the native `<input>` id |
| `name` | `string \| null` | `null` | |
| `disabled` | `boolean` | `false` | |
| `readonly` | `boolean` | `false` | Focusable but state cannot change |
| `tabindex` | `number` | `0` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `autofocus` | `boolean` | `false` | |
| `styleClass` | `string \| null` | `null` | Extra CSS classes on the host element |
| `checked` | `boolean` | `false` | Two-way bindable via `[(checked)]` |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `change` | `ToggleSwitchChangeEvent` | `{ checked: boolean, originalEvent: Event }` |
| `focus` | `FocusEvent` | |
| `blur` | `FocusEvent` | |

## Usage

```html
<!-- minimal example -->
<ui-lib-toggle-switch label="Enable notifications" [(checked)]="notificationsOn" />

<!-- reactive form binding -->
<ui-lib-toggle-switch [formControl]="darkModeControl" label="Dark mode" />
```
