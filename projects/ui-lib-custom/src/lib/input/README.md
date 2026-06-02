# Input

**Selector:** `ui-lib-input`
**Package:** `ui-lib-custom/input`
**Content projection:** yes — `[prefix]` and `[suffix]` slots for icons or addons

> Implements `ControlValueAccessor`; use `ngModel` or reactive forms. The `label` input renders a `<label>` element — it is not projected content. Prefix/suffix content must carry the `prefix` or `suffix` attribute selector.

> **Accessibility note:** A `placeholder` alone is **not** an accessible label. Always provide a `label` input so the `<label>` element is rendered and associated with the native input via `for`/`id`. Placeholder text disappears once the user types and is not reliably announced by all screen readers.

## Inputs

| Name                 | Type                                             | Default  | Notes                                                                                                                                                               |
| -------------------- | ------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | `string \| null`                                 | `null`   | Forwarded to the native `<input>` id                                                                                                                                |
| `name`               | `string \| null`                                 | `null`   | Forwarded to the native `<input>` name                                                                                                                              |
| `label`              | `string`                                         | `''`     | Rendered as a `<label>` element above the input                                                                                                                     |
| `ariaLabel`          | `string \| null`                                 | `null`   | ARIA label on the native `<input>` — use when no visible label is rendered                                                                                          |
| `ariaLabelledBy`     | `string \| null`                                 | `null`   | Space-separated IDs of external elements that label the input                                                                                                       |
| `variant`            | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Falls back to global theme variant when null                                                                                                                        |
| `size`               | `'sm' \| 'md' \| 'lg'`                           | `'md'`   |                                                                                                                                                                     |
| `type`               | `InputType`                                      | `'text'` | Any valid HTML input type                                                                                                                                           |
| `labelFloat`         | `'over' \| 'in' \| 'on'`                         | `'over'` | Label position / floating behaviour                                                                                                                                 |
| `placeholder`        | `string`                                         | `''`     |                                                                                                                                                                     |
| `error`              | `string \| null`                                 | `null`   | Error message rendered below the input; announces via live region; implies `aria-invalid`                                                                           |
| `hint`               | `string \| null`                                 | `null`   | Helper text rendered below the input; linked via `aria-describedby`                                                                                                 |
| `invalid`            | `boolean`                                        | `false`  | Marks the field invalid (sets `aria-invalid`) without requiring an error message                                                                                    |
| `disabled`           | `boolean`                                        | `false`  |                                                                                                                                                                     |
| `readonly`           | `boolean`                                        | `false`  | Sets `readOnly` on the native input and `aria-readonly="true"`. The field remains in the tab order and its value is still submitted with a form, unlike `disabled`. |
| `required`           | `boolean`                                        | `false`  |                                                                                                                                                                     |
| `showCounter`        | `boolean`                                        | `false`  | Shows character count; requires `maxLength` to display fraction                                                                                                     |
| `maxLength`          | `number \| null`                                 | `null`   |                                                                                                                                                                     |
| `showClear`          | `boolean`                                        | `false`  | Shows an inline clear button when the field has a value                                                                                                             |
| `showTogglePassword` | `boolean`                                        | `false`  | Only meaningful when `type="password"`                                                                                                                              |

## Outputs

_none_

## Usage

```html
<!-- minimal example -->
<ui-lib-input label="Email" type="email" [(ngModel)]="email" />

<!-- with hint text -->
<ui-lib-input label="Email" hint="We'll never share your email" [(ngModel)]="email" />

<!-- with prefix icon, error, and character counter -->
<ui-lib-input
  label="Username"
  [error]="usernameError"
  [showCounter]="true"
  [maxLength]="30"
  [(ngModel)]="username"
>
  <span prefix>@</span>
</ui-lib-input>
```

## Composability

Input composes with the library's form-layout components. Use these wrappers to add icons, group addons, or provide form-level label/error orchestration.

### With IconField

```html
<!-- Leading icon inside the field -->
<ui-lib-icon-field>
  <ui-lib-input label="Search" placeholder="Type to search…" [(ngModel)]="query" />
  <ui-lib-icon iconPos="left">search</ui-lib-icon>
</ui-lib-icon-field>
```

### With InputGroup (prefix / suffix addons)

```html
<!-- URL prefix addon -->
<ui-lib-input-group>
  <span>https://</span>
  <ui-lib-input label="Website" [(ngModel)]="url" />
  <span>.com</span>
</ui-lib-input-group>
```

### With FormField (label + hint + error orchestration)

```html
<ui-lib-form-field
  label="Email"
  hint="We'll never share your email"
  [error]="emailControl.invalid && emailControl.touched ? 'Invalid email' : null"
>
  <ui-lib-input type="email" [formControl]="emailControl" />
</ui-lib-form-field>
```

### Inline prefix / suffix slots

```html
<ui-lib-input label="Amount" [(ngModel)]="amount">
  <span prefix>$</span>
  <ui-lib-icon suffix>attach_money</ui-lib-icon>
</ui-lib-input>
```

### Reactive forms with validation

```ts
emailControl = new FormControl('', [Validators.required, Validators.email]);
```

```html
<ui-lib-input
  label="Email"
  type="email"
  [formControl]="emailControl"
  [error]="emailControl.invalid && emailControl.dirty ? 'Please enter a valid email' : null"
/>
```

## CSS Custom Properties

| Variable                         | Default                                                                                                         | Description                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `--uilib-input-transition`       | `border-color 0.15s ease, box-shadow 0.15s ease`                                                                | Field border/shadow transition; set to `none` when `prefers-reduced-motion: reduce` |
| `--uilib-input-label-transition` | `transform 0.15s ease, font-size 0.15s ease, color 0.15s ease, padding 0.15s ease, background-color 0.15s ease` | Floating label animation; set to `none` when `prefers-reduced-motion: reduce`       |
| `--uilib-input-bg`               | `var(--uilib-surface)`                                                                                          | Field background                                                                    |
| `--uilib-input-border`           | `var(--uilib-border)`                                                                                           | Field border color                                                                  |
| `--uilib-input-border-focus`     | `var(--uilib-color-primary-600)`                                                                                | Field border color on focus                                                         |
| `--uilib-input-text`             | `var(--uilib-page-fg)`                                                                                          | Field text color                                                                    |
| `--uilib-input-placeholder`      | `var(--uilib-muted)`                                                                                            | Placeholder / label resting color                                                   |
| `--uilib-input-error`            | `var(--uilib-color-danger-600)`                                                                                 | Error state color                                                                   |
| `--uilib-input-radius`           | `var(--uilib-shape-base, 6px)`                                                                                  | Field border radius                                                                 |
| `--uilib-input-min-height`       | `44px`                                                                                                          | Minimum field height                                                                |
| `--uilib-input-label-bg`         | `var(--uilib-input-bg)`                                                                                         | Floating label background (used in `on` variant)                                    |
