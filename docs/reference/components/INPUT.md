# Input Component

## Overview

A form input with floating label modes, validation states, and optional helpers (clear button, password toggle, counter). Built with standalone + OnPush and CSS-variable theming.

**Import**
```typescript
import { UiLibInput } from 'ui-lib-custom/input';
```

**Location:** `projects/ui-lib-custom/src/lib/input/input.ts`

---

## Features

- ✅ Signal-powered inputs for reactive updates.
- 🎨 CSS-variable theming with design-token fallbacks.
- ♿ Accessible validation and required states.
- 🧪 ControlValueAccessor support for template-driven and reactive forms.
- 🧩 Floating label modes: over, in, on.
- 🧰 Optional clear button, password toggle, and character counter.

---

## Usage
```typescript
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [UiLibInput],
  template: `<ui-lib-input label="Email" placeholder="you@example.com" />`
})
export class Example {}
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string \| null` | `null` | Custom input id (auto-generated when null). |
| `name` | `string \| null` | `null` | Input name attribute. |
| `variant` | `InputVariant` | `'material'` | Visual style. |
| `type` | `InputType` | `'text'` | Input type. |
| `label` | `string` | `''` | Label text. |
| `labelFloat` | `InputLabelFloat` | `'over'` | Floating label mode. |
| `placeholder` | `string` | `''` | Placeholder text. |
| `error` | `string` | `''` | Error message; non-empty sets error styles. |
| `disabled` | `boolean` | `false` | Disabled state. |
| `required` | `boolean` | `false` | Required state (adds indicator + aria-required). |
| `showCounter` | `boolean` | `false` | Show character counter when `maxLength` is set. |
| `maxLength` | `number \| null` | `null` | Maximum length for counter display. |
| `showClear` | `boolean` | `false` | Show clear button when value is non-empty. |
| `showTogglePassword` | `boolean` | `false` | Show toggle button for password visibility. |

### Outputs

None. Use Angular forms bindings: `[(ngModel)]` or `formControlName`.

### Types
```typescript
type InputVariant = 'material' | 'bootstrap' | 'minimal';
type InputLabelFloat = 'over' | 'in' | 'on';
type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
```

---

## Floating Label Modes

| Mode | Behavior |
| --- | --- |
| `over` | Label sits above the field; placeholder remains visible. |
| `in` | Label floats inside the field; moves on focus or when value exists. |
| `on` | Label floats above with background chip; useful for outlined styles. |

---

## Validation States

- Error state is triggered when `error` has a non-empty value.
- Required indicator renders when `required=true`.
- `aria-invalid` and `aria-describedby` are set when an error is present.

---

## Theming & CSS Variables

| Variable | Purpose |
| --- | --- |
| `--uilib-input-bg` | Field background. |
| `--uilib-input-border` | Field border. |
| `--uilib-input-border-focus` | Focus border color. |
| `--uilib-input-text` | Input text color. |
| `--uilib-input-placeholder` | Placeholder + helper color. |
| `--uilib-input-radius` | Border radius. |
| `--uilib-input-error` | Error color. |
| `--uilib-input-label-color` | Label color. |
| `--uilib-input-label-bg` | Floating label background (mode `on`). |
| `--uilib-input-label-floating-scale` | Floating label scale. |
| `--uilib-input-label-offset-x` | Floating label x offset. |
| `--uilib-input-label-padding-x` | Floating label padding x. |
| `--uilib-input-label-padding-y` | Floating label padding y. |
| `--uilib-input-label-on-offset` | Floating label offset (on). |
| `--uilib-input-float-in-extra-pad` | Extra padding for `in` mode. |
| `--uilib-input-padding-x` | Horizontal padding. |
| `--uilib-input-padding-y` | Vertical padding. |
| `--uilib-input-min-height` | Minimum height. |

---

## Form Integration

### Template-driven
```html
<ui-lib-input name="email" label="Email" [(ngModel)]="email" />
```

### Reactive Forms
```html
<form [formGroup]="form">
  <ui-lib-input label="Email" formControlName="email" />
</form>
```

---

## Accessibility

- `aria-required` and `aria-invalid` are applied based on inputs.
- Error text is linked through `aria-describedby`.
- Clear and toggle buttons include `aria-label` attributes.
- Use meaningful labels and avoid placeholder-only inputs.

---

## Best Practices

**Do:**
- Use `labelFloat="on"` with outlined styles and `labelFloat="in"` for compact UIs.
- Provide `error` messages instead of relying solely on color.
- Keep placeholder text short and illustrative.

**Don’t:**
- Use placeholder as the only label.
- Enable `showClear` on read-only or disabled fields.
- Show counters without setting `maxLength`.

---

## Related

- `docs/reference/components/CARD.md`
- `docs/reference/components/SELECT.md`
- `docs/reference/components/CHECKBOX.md`

