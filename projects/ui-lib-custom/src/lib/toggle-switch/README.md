# ToggleSwitch

**Selector:** `ui-lib-toggle-switch`
**Package:** `ui-lib-custom/toggle-switch`
**Content projection:** yes — rendered as the label when `label` input is null (only one of `label` input or projected content is shown at a time)

> `checked` is a two-way `model()` signal — use `[(checked)]`. The native `change` DOM event is intentionally stopped from bubbling; listen to the typed `change` output instead.

## Accessibility

### role="switch" rationale

ToggleSwitch uses `<input type="checkbox" role="switch">` — **not** `<button role="switch">` or a div. This is the correct ARIA pattern because:

- The native `<input type="checkbox">` provides built-in keyboard support (Space toggles) without any custom event handling on every browser/AT combination.
- `role="switch"` overrides the implied `checkbox` semantics and instructs screen readers to announce "on/off" state rather than "checked/unchecked".
- `aria-checked` is redundant on a native checkbox, but is explicitly set to `"true"` / `"false"` to ensure consistent AT behaviour across older assistive technologies.

### Three label strategies

Choose **one** of the following strategies per instance:

1. **`label` input** _(preferred for visible labels)_
   Renders a `<label>` element linked via `for`/`id` and sets `aria-labelledby` on the native input.

   ```html
   <ui-lib-toggle-switch label="Dark mode" [(checked)]="darkMode" />
   ```

2. **`ariaLabel` input** _(use when no visible label is desired)_
   Sets `aria-label` directly on the native `<input>`. Overrides `aria-labelledby` when both would otherwise apply.

   ```html
   <ui-lib-toggle-switch ariaLabel="Toggle dark mode" [(checked)]="darkMode" />
   ```

3. **Projected `<label>`** _(use when the label is controlled by the host or a form field)_
   Provide `inputId` and project a `<label for="same-id">`. No `label` input or `ariaLabel` is needed.
   ```html
   <ui-lib-toggle-switch inputId="dark-mode-switch">
     <label for="dark-mode-switch">Dark mode</label>
   </ui-lib-toggle-switch>
   ```

> **DEV mode warning:** When none of these three strategies provides an accessible name, the component logs a `console.warn` in development builds to catch unlabeled switches early.

### readonly vs disabled

| Attribute  | Focusable            | State changeable | ARIA attribute             |
| ---------- | -------------------- | ---------------- | -------------------------- |
| `disabled` | No (`tabindex="-1"`) | No               | `disabled` on native input |
| `readonly` | Yes                  | No               | `aria-readonly="true"`     |

Use `disabled` when the control is not applicable in the current context.
Use `readonly` when the user should be able to read the current value but not change it.

### Live announcer (i18n note)

On each toggle, `LiveAnnouncerService` announces `"${label} on"` or `"${label} off"` with `polite` priority. When no label or `ariaLabel` is set the fallback string `"Toggle switch"` is used. This fallback is English-only; full i18n support for the announcement string is planned for a future `announceOn` / `announceOff` input pair.

## Inputs

| Name         | Type                                             | Default | Notes                                                                       |
| ------------ | ------------------------------------------------ | ------- | --------------------------------------------------------------------------- |
| `label`      | `string \| null`                                 | `null`  | Text label beside the switch; when null, `<ng-content>` is rendered instead |
| `ariaLabel`  | `string \| null`                                 | `null`  | Applied directly to the native `<input>`; overrides auto aria-labelledby    |
| `inputId`    | `string \| null`                                 | `null`  | Forwarded to the native `<input>` id                                        |
| `name`       | `string \| null`                                 | `null`  |                                                                             |
| `disabled`   | `boolean`                                        | `false` | Removes focusability; native `disabled` attribute                           |
| `readonly`   | `boolean`                                        | `false` | Focusable but state cannot change; sets `aria-readonly="true"`              |
| `tabindex`   | `number`                                         | `0`     |                                                                             |
| `size`       | `'sm' \| 'md' \| 'lg'`                           | `'md'`  |                                                                             |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`  | Falls back to global theme variant when null                                |
| `autofocus`  | `boolean`                                        | `false` |                                                                             |
| `styleClass` | `string \| null`                                 | `null`  | Extra CSS classes on the host element                                       |
| `checked`    | `boolean`                                        | `false` | Two-way bindable via `[(checked)]`                                          |

## Outputs

| Name     | Payload                   | Notes                                        |
| -------- | ------------------------- | -------------------------------------------- |
| `change` | `ToggleSwitchChangeEvent` | `{ checked: boolean, originalEvent: Event }` |
| `focus`  | `FocusEvent`              |                                              |
| `blur`   | `FocusEvent`              |                                              |

## Usage

```html
<!-- minimal example with visible label -->
<ui-lib-toggle-switch label="Enable notifications" [(checked)]="notificationsOn" />

<!-- aria-label only (no visible label) -->
<ui-lib-toggle-switch ariaLabel="Toggle notifications" [(checked)]="notificationsOn" />

<!-- reactive form binding -->
<ui-lib-toggle-switch [formControl]="darkModeControl" label="Dark mode" />

<!-- ngModel binding -->
<ui-lib-toggle-switch [(ngModel)]="enabled" label="Feature flag" />

<!-- projected label (e.g. inside a form field) -->
<ui-lib-toggle-switch inputId="feature-switch">
  <label for="feature-switch">Enable advanced features</label>
</ui-lib-toggle-switch>
```

## Internationalisation

This component contains no translatable strings — all visible text is supplied by the consumer via inputs or content projection. No UiLibI18nService integration is needed.
