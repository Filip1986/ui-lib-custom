# IconField

**Selector:** `uilib-icon-field`
**Package:** `ui-lib-custom/icon-field`
**Content projection:** yes — project your icon element and `<input>` as direct children; CSS positions the icon based on `iconPosition`

> This is a pure layout wrapper with no CVA and no outputs. The icon element must be a sibling of the input inside this wrapper — the component does not render any icon itself. Position padding on the input is handled by CSS variables.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `iconPosition` | `'left' \| 'right'` | `'left'` | Which side the icon appears on |

## Outputs

_none_

## Usage

```html
<!-- leading search icon -->
<uilib-icon-field>
  <i class="icon-search"></i>
  <input type="text" placeholder="Search" />
</uilib-icon-field>

<!-- trailing icon on the right -->
<uilib-icon-field iconPosition="right">
  <input type="text" placeholder="Email" />
  <i class="icon-envelope"></i>
</uilib-icon-field>
```
