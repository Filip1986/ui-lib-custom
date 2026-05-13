# IconField

**Selector:** `uilib-icon-field`
**Package:** `ui-lib-custom/icon-field`
**Content projection:** yes — project your icon element and `<input>` as direct children; CSS positions the icon based on `iconPosition`

> This is a pure layout wrapper with no CVA and no outputs. The icon element must be a sibling of the input inside this wrapper — the component does not render any icon itself. Position padding on the input is handled by CSS variables.

## Inputs

### `uilib-icon-field`

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `iconPosition` | `'left' \| 'right'` | `'left'` | Which side the icon appears on |

### `uilib-input-icon`

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `styleClass` | `string \| null` | `null` | Renders a class-based icon span when provided |
| `decorative` | `boolean` | `true` | Decorative icons stay `aria-hidden="true"` by default |
| `ariaLabel` | `string \| null` | `null` | Rare escape hatch for a truly informative standalone icon |

## Outputs

_none_

## Usage

```html
<!-- leading search icon -->
<uilib-icon-field>
  <uilib-input-icon styleClass="icon-search" />
  <input type="text" placeholder="Search" />
</uilib-icon-field>

<!-- trailing icon on the right -->
<uilib-icon-field iconPosition="right">
  <input type="text" placeholder="Email" />
  <uilib-input-icon styleClass="icon-envelope" />
</uilib-icon-field>
```

## Accessibility guidance

- `uilib-input-icon` is decorative by default and renders `aria-hidden="true"` plus `tabindex="-1"` so the icon never steals focus from the field.
- Keep the accessible name on the input itself (`<label>`, `aria-label`, `aria-labelledby`) and keep helper/error meaning on the input via `aria-describedby`.
- If an icon conveys unique meaning that is not already expressed by the field label or helper text, set `[decorative]="false"` and provide `ariaLabel`.
- The icon container uses `pointer-events: none`, so clicks intended for the input pass through the icon.
- Padding is reserved through CSS variables on the field wrapper, so adding or swapping icons does not cause input layout shift.

## Composition notes

- Supported with native `<input>`, `<ui-lib-input>`, `<uilib-password>`, `<uilib-input-mask>`, and `<uilib-input-number>`.
- Input padding is handled entirely by CSS selectors and `--uilib-icon-field-input-padding-with-icon`; no JavaScript measurement is required.
