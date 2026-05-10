# Input Component

## Overview

A form input with floating label modes, validation states, and optional helpers (clear button, password toggle, character counter). Implements `ControlValueAccessor` — use `ngModel` or `formControlName`. Built with standalone + OnPush and CSS-variable theming.

**Selector:** `ui-lib-input`
**Package:** `ui-lib-custom/input`

```typescript
import { UiLibInput } from 'ui-lib-custom/input';
```

---

## Features

- Signal-powered inputs for reactive updates
- CSS-variable theming with design-token fallbacks
- Accessible validation and required states (`aria-invalid`, `aria-describedby`, `aria-required`)
- `ControlValueAccessor` support for template-driven and reactive forms
- Floating label modes: `over`, `in`, `out`
- Optional clear button, password toggle, and character counter
- Content projection slots for prefix and suffix addons

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `id` | `string \| null` | `null` | Forwarded to the native `<input>` id (auto-generated when null) |
| `name` | `string \| null` | `null` | Forwarded to the native `<input>` name attribute |
| `label` | `string` | `''` | Rendered as a `<label>` element associated with the input |
| `variant` | `InputVariant \| null` | `null` | Visual style; inherits from global theme when null |
| `size` | `InputSize` | `'md'` | Size scale |
| `type` | `InputType` | `'text'` | Any valid HTML input type |
| `labelFloat` | `'over' \| 'in' \| 'on'` | `'over'` | Label position / floating behaviour — see Floating Label Modes below |
| `placeholder` | `string` | `''` | Placeholder text |
| `error` | `string \| null` | `null` | Error message rendered below the input; announces via live region |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required state — adds visual indicator and `aria-required` |
| `showCounter` | `boolean` | `false` | Shows character count; requires `maxLength` to display the fraction |
| `maxLength` | `number \| null` | `null` | Maximum length for counter display |
| `showClear` | `boolean` | `false` | Shows an inline clear button when the field has a value |
| `showTogglePassword` | `boolean` | `false` | Shows a visibility toggle button; only meaningful when `type="password"` |

### Outputs

None. Use Angular forms bindings: `[(ngModel)]` or `formControlName`.

### Types

```typescript
type InputVariant   = 'material' | 'bootstrap' | 'minimal';
type InputSize      = 'sm' | 'md' | 'lg';
type InputLabelFloat = 'over' | 'in' | 'on';
type InputType      = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
```

---

## Content Projection

The input supports two named slots for inline addons:

```html
<ui-lib-input label="Username" [(ngModel)]="username">
  <span prefix>@</span>
</ui-lib-input>

<ui-lib-input label="Search" [(ngModel)]="query">
  <ui-lib-icon suffix icon="search" />
</ui-lib-input>
```

| Slot | Selector | Position |
|---|---|---|
| Prefix | `[prefix]` | Inside the field, before the input |
| Suffix | `[suffix]` | Inside the field, after the input |

> The `label` input renders a `<label>` element — it is not projected content. Prefix/suffix elements must carry the `prefix` or `suffix` attribute selector.

---

## Floating Label Modes

| Mode | Behaviour |
|---|---|
| `over` | Label sits statically above the field; placeholder is visible at all times |
| `in` | Label starts inside the field and lifts to the top-inside when focused or a value exists |
| `on` | Label starts inside the field and lifts onto the border edge with a background chip when focused or a value exists (the classic "outlined" Material-style float) |

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

### Form State Styling

When used with Angular forms the host element receives `ng-touched`, `ng-dirty`, `ng-invalid`, and `ng-disabled` classes. Styles react via CSS variables:

| Variable | Purpose |
|---|---|
| `--uilib-input-border-touched` | Border color when the control is touched |
| `--uilib-input-border-dirty` | Border color when the control is dirty |
| `--uilib-input-error` | Border and text color when invalid |

---

## Validation & Error Announcements

Error state is triggered when `error` is a non-empty string. The message is rendered below the input and announced to screen readers via an `aria-live` region.

```html
<ui-lib-input label="Email" [error]="emailError" [(ngModel)]="email" />
```

### Manual Announcements

```typescript
import { LiveAnnouncerService } from 'ui-lib-custom';

export class MyComponent {
  private readonly announcer = inject(LiveAnnouncerService);

  onSave(): void {
    this.announcer.announceSuccess('Changes saved successfully');
  }

  onError(message: string): void {
    this.announcer.announceError(message);
  }
}
```

---

## Theming & CSS Variables

| Variable | Purpose |
|---|---|
| `--uilib-input-bg` | Field background |
| `--uilib-input-border` | Field border color |
| `--uilib-input-border-focus` | Focus border color |
| `--uilib-input-text` | Input text color |
| `--uilib-input-placeholder` | Placeholder and helper text color |
| `--uilib-input-radius` | Border radius |
| `--uilib-input-error` | Error color (border + text) |
| `--uilib-input-label-color` | Label text color |
| `--uilib-input-label-bg` | Floating label chip background (mode `out`) |
| `--uilib-input-label-floating-scale` | Scale applied to the floating label |
| `--uilib-input-label-offset-x` | Floating label horizontal offset |
| `--uilib-input-label-padding-x` | Floating label chip horizontal padding |
| `--uilib-input-label-padding-y` | Floating label chip vertical padding |
| `--uilib-input-label-on-offset` | Floating label vertical offset (mode `out`) |
| `--uilib-input-float-in-extra-pad` | Extra top padding added in `in` mode |
| `--uilib-input-padding-x` | Field horizontal padding |
| `--uilib-input-padding-y` | Field vertical padding |
| `--uilib-input-min-height` | Minimum field height |

---

## Accessibility

### Keyboard Interaction

| Key | Action |
|---|---|
| Tab | Focus the input |
| Enter | Submit parent form (native browser behaviour) |

### ARIA Attributes

| Attribute | When set |
|---|---|
| `aria-required` | When `required` is true |
| `aria-invalid` | When `error` is non-null |
| `aria-describedby` | Links to the error message element |

### Screen Reader Behaviour

- The `label` element is associated with the native `<input>` via `for`/`id`.
- Error text is announced via `aria-describedby` and an `aria-live` region when it changes.
- Clear and toggle-password buttons are focusable and carry descriptive `aria-label` values.

---

## Best Practices

**Do:**
- Always set `label` — never rely on placeholder text alone.
- Use `labelFloat="in"` for compact UIs; `labelFloat="on"` for outlined (border-chip) styles.
- Provide `error` messages instead of relying solely on color.

**Don't:**
- Enable `showClear` on read-only or disabled fields.
- Show `showCounter` without also setting `maxLength`.
- Use placeholder as a substitute for a label.

---

## Edge Cases

- `showCounter` without `maxLength`: renders the current character count alone (`12`) rather than a fraction (`12 / 30`). Always set `maxLength` when using `showCounter` to give users a useful cap indicator.
- `showClear` is suppressed while the field is disabled — the clear button only renders when both `showClear` is true and the field is enabled.
- `showTogglePassword` has no effect unless `type="password"`.
- Placeholder is only visible in `labelFloat="over"` mode. In `'in'` and `'on'` modes the label itself acts as the visual placeholder; setting `placeholder` in those modes has no visible effect.
- `error` changes are announced to screen readers via `LiveAnnouncerService`. Rapidly toggling `error` may cause duplicate announcements — debounce error updates in high-frequency validation scenarios.

---

## Related

- [`SELECT.md`](SELECT.md)
- [`CHECKBOX.md`](CHECKBOX.md)
- [`CARD.md`](CARD.md)
