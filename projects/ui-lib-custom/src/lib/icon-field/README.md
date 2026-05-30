# IconField

**Selector:** `ui-lib-icon-field`
**Package:** `ui-lib-custom/icon-field`
**Content projection:** yes — project your icon element and `<input>` as direct children; CSS positions the icon based on `iconPosition`

> This is a pure layout wrapper with no CVA and no outputs. The icon element must be a sibling of the input inside this wrapper — the component does not render any icon itself. Position padding on the input is handled by CSS variables.

## Inputs

### `ui-lib-icon-field`

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `iconPosition` | `'left' \| 'right'` | `'left'` | Which side the icon appears on |

### `ui-lib-input-icon`

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
<ui-lib-icon-field>
  <ui-lib-input-icon styleClass="icon-search" />
  <input type="text" placeholder="Search" />
</ui-lib-icon-field>

<!-- trailing icon on the right -->
<ui-lib-icon-field iconPosition="right">
  <input type="text" placeholder="Email" />
  <ui-lib-input-icon styleClass="icon-envelope" />
</ui-lib-icon-field>
```

## Accessibility guidance

- `ui-lib-input-icon` is decorative by default and renders `aria-hidden="true"` plus `tabindex="-1"` so the icon never steals focus from the field.
- Keep the accessible name on the input itself (`<label>`, `aria-label`, `aria-labelledby`) and keep helper/error meaning on the input via `aria-describedby`.
- If an icon conveys unique meaning that is not already expressed by the field label or helper text, set `[decorative]="false"` and provide `ariaLabel`.
- The icon container uses `pointer-events: none`, so clicks intended for the input pass through the icon.
- Padding is reserved through CSS variables on the field wrapper, so adding or swapping icons does not cause input layout shift.

## Composition notes

- Supported with native `<input>`, `<ui-lib-input>`, `<ui-lib-password>`, `<ui-lib-input-mask>`, and `<ui-lib-input-number>`.
- Input padding is handled entirely by CSS selectors and `--ui-lib-icon-field-input-padding-with-icon`; no JavaScript measurement is required.

## CSS Custom Properties

| Variable | Default | Description |
|----------|---------|-------------|
| `--ui-lib-icon-field-icon-color` | `var(--uilib-muted, currentColor)` | Icon color |
| `--ui-lib-icon-field-icon-margin` | `0.75rem` | Distance from the icon to the field edge |
| `--ui-lib-icon-field-icon-size` | inherited | Icon size (overridden by `sm`/`lg` size context) |
| `--ui-lib-icon-field-input-padding-with-icon` | `2.5rem` | Input side padding when an icon is present |
| `--ui-lib-icon-field-input-padding-with-icon-sm` | `2rem` | Input side padding for `sm` fields |
| `--ui-lib-icon-field-input-padding-with-icon-lg` | `3rem` | Input side padding for `lg` fields |
| `--ui-lib-icon-field-icon-margin-minimal` | inherits `--ui-lib-icon-field-icon-margin` | Icon margin override for the minimal variant |
