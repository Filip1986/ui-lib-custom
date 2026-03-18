# Checkbox Component

Accessible checkbox with binary and group-array modes, signal inputs, CSS-variable theming, and form integration.

**Location:** `projects/ui-lib-custom/src/lib/checkbox/checkbox.ts`

## Overview

`ui-lib-checkbox` supports two model modes:

- **Binary mode**: checkbox maps to a single value (`trueValue` / `falseValue`)
- **Group mode**: checkbox maps to membership in an array (`value` inside a shared model array)

Mode is auto-detected to match Prime-style behavior:

- Binary when `binary === true` **or** `value === null`
- Group when `binary === false` and `value` is non-null

## Features

- Signal inputs + `model()` two-way `[(checked)]`
- CVA support for `[(ngModel)]` and `formControlName`
- `material` / `bootstrap` / `minimal` variants
- `outlined` / `filled` appearance
- `sm` / `md` / `lg` sizes
- Indeterminate visual and ARIA mixed state
- Hidden native `<input type="checkbox">` for screen reader semantics

## API Reference

### Inputs

| Input | Type | Default | Notes |
| --- | --- | --- | --- |
| `label` | `string \| null` | `null` | Optional visual label |
| `description` | `string \| null` | `null` | Optional helper text |
| `ariaLabel` | `string \| null` | `null` | Direct aria label override |
| `inputId` | `string \| null` | `null` | Native input id; enables external `label[for]` |
| `name` | `string \| null` | `null` | Native input name |
| `required` | `boolean` | `false` | Native required attribute |
| `readonly` | `boolean` | `false` | Prevents value changes; keeps focusable behavior |
| `tabindex` | `number` | `0` | Native input tab order (`-1` when disabled) |
| `disabled` | `boolean` | `false` | Disables interaction |
| `indeterminate` | `boolean` | `false` | Shows mixed indicator and `aria-checked="mixed"` |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant |
| `appearance` | `'outlined' \| 'filled'` | `'outlined'` | Visual style layer orthogonal to `variant` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Control scale |
| `binary` | `boolean` | `false` | Forces binary mode when true |
| `value` | `unknown \| null` | `null` | Group-item value in array mode |
| `trueValue` | `unknown` | `true` | Emitted/stored when checked in binary mode |
| `falseValue` | `unknown` | `false` | Emitted/stored when unchecked in binary mode |
| `checkboxIcon` | `string \| null` | `null` | Extra class for custom check icon |
| `inputClass` | `string \| null` | `null` | Extra class for hidden native input |
| `autofocus` | `boolean` | `false` | Focuses input after init if enabled |

### Model

| Model | Type | Default | Notes |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | Visual checked state (`[(checked)]`) |

### Outputs

| Output | Payload | Description |
| --- | --- | --- |
| `checkedChange` | `boolean` | Emitted by `[(checked)]` model updates |
| `onChange` | `CheckboxChangeEvent` | `{ checked: boolean \| unknown[], originalEvent: Event }` |
| `onFocus` | `FocusEvent` | Native input receives focus |
| `onBlur` | `FocusEvent` | Native input loses focus |

## Mode Examples

### Binary with custom values

```html
<ui-lib-checkbox
  [binary]="true"
  [trueValue]="'YES'"
  [falseValue]="'NO'"
  [(ngModel)]="status"
  label="Enable feature"
/>
```

### Group mode (shared array)

```html
<ui-lib-checkbox [binary]="false" [value]="'email'" [(ngModel)]="channels" label="Email" />
<ui-lib-checkbox [binary]="false" [value]="'sms'" [(ngModel)]="channels" label="SMS" />
<ui-lib-checkbox [binary]="false" [value]="'push'" [(ngModel)]="channels" label="Push" />
```

## Forms Integration

### Reactive forms

```html
<form [formGroup]="form">
  <ui-lib-checkbox formControlName="accepted" [required]="true" label="Accept terms" />

  <ui-lib-checkbox formControlName="channels" [binary]="false" [value]="'email'" label="Email" />
  <ui-lib-checkbox formControlName="channels" [binary]="false" [value]="'sms'" label="SMS" />
</form>
```

### Template-driven required

```html
<form #f="ngForm">
  <ui-lib-checkbox name="accepted" [required]="true" [(ngModel)]="accepted" label="Accept" />
</form>
```

## Migration from Boolean-Only Usage

If your previous usage treated every checkbox as a simple boolean, use this quick mapping.

### Before (boolean-only)

```html
<ui-lib-checkbox [(ngModel)]="accepted" label="Accept" />
```

### After (recommended explicit binary mode)

```html
<ui-lib-checkbox [binary]="true" [(ngModel)]="accepted" label="Accept" />
```

### After (group array mode)

```html
<ui-lib-checkbox [binary]="false" [value]="'email'" [(ngModel)]="channels" label="Email" />
<ui-lib-checkbox [binary]="false" [value]="'sms'" [(ngModel)]="channels" label="SMS" />
```

Migration notes:

- **Binary model shape:** scalar value (`boolean` by default, or custom `trueValue` / `falseValue`).
- **Group model shape:** array value (`unknown[]`), where each checkbox toggles membership of `value`.
- **Null safety:** in group mode, `null` / `undefined` model values are handled as empty arrays.
- **Compatibility behavior:** if `value` is `null`, checkbox auto-falls back to binary mode.

## Theming and CSS Variables

Primary variables include:

- `--uilib-checkbox-bg`
- `--uilib-checkbox-bg-checked`
- `--uilib-checkbox-border`
- `--uilib-checkbox-border-hover`
- `--uilib-checkbox-border-active`
- `--uilib-checkbox-filled-bg`
- `--uilib-checkbox-filled-border-color`
- `--uilib-checkbox-check-color`
- `--uilib-checkbox-focus-ring`
- `--uilib-checkbox-description-color`

Form-state styling hooks:

- `--uilib-checkbox-border-touched`
- `--uilib-checkbox-border-dirty`
- `--uilib-checkbox-border-invalid`

## Accessibility Notes

- A visually hidden native input carries checkbox semantics.
- Visual checkbox box is presentation-only (`aria-hidden` + presentation role).
- Supports `aria-label`, `aria-labelledby`, and `aria-describedby`.
- Indeterminate state announces as mixed.
- `readonly` blocks mutation but still allows focus.

## Best Practices

- Use `[(ngModel)]` / reactive forms for persisted value; use `[(checked)]` for local visual control.
- Use group mode for multi-select arrays and binary mode for scalar values.
- In group mode, initialize with `[]` (null/undefined are handled safely, but explicit arrays are clearer).
- Prefer `inputId` when integrating with external labels.

## Verification

```bash
npm.cmd test -- --testPathPatterns='checkbox.spec.ts'
```

## Related Docs

- [Components Index](README.md)
- [Design Tokens](../systems/DESIGN_TOKENS.md)

