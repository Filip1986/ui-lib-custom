# ButtonGroup

**Selector:** `ui-lib-button-group`
**Package:** `ui-lib-custom/button-group`
**Content projection:** yes — place `<ui-lib-button>` elements directly inside the component

> The `size` input accepts both shorthand (`'sm'`, `'md'`, `'lg'`) and longhand (`'small'`, `'medium'`, `'large'`) values; they are normalised internally via a map.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal'` | `'material'` | Visual style applied to the group container |
| `size` | `'sm' \| 'md' \| 'lg' \| 'small' \| 'medium' \| 'large'` | `'md'` | Propagated to child buttons via CSS classes on the host |
| `vertical` | `boolean` | `false` | Stacks buttons vertically when `true` |

## Outputs

_none_

## Usage

```html
<ui-lib-button-group variant="material" size="md">
  <ui-lib-button>Left</ui-lib-button>
  <ui-lib-button>Centre</ui-lib-button>
  <ui-lib-button>Right</ui-lib-button>
</ui-lib-button-group>
```
