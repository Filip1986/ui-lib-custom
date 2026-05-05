# ToggleButton

**Selector:** `ui-lib-toggle-button`
**Package:** `ui-lib-custom/toggle-button`
**Content projection:** no — none

> Label text is driven by `onLabel` / `offLabel` inputs, not content projection. When `allowEmpty` is `false`, clicking an already-checked button does nothing (selection is sticky).

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `onLabel` | `string` | `'Yes'` | Label shown when checked |
| `offLabel` | `string` | `'No'` | Label shown when unchecked |
| `onIcon` | `SemanticIcon \| string \| null` | `null` | Icon shown when checked |
| `offIcon` | `SemanticIcon \| string \| null` | `null` | Icon shown when unchecked |
| `ariaLabel` | `string \| null` | `null` | |
| `ariaLabelledBy` | `string \| null` | `null` | |
| `disabled` | `boolean` | `false` | |
| `inputId` | `string \| null` | `null` | Forwarded to the inner `<button>` id |
| `tabindex` | `number` | `0` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `iconPos` | `'left' \| 'right'` | `'left'` | Icon position relative to the label |
| `autofocus` | `boolean` | `false` | |
| `allowEmpty` | `boolean` | `true` | When false, a checked button cannot be unchecked |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to global theme variant when null |
| `styleClass` | `string \| null` | `null` | Extra CSS classes on the host element |
| `checked` | `boolean` | `false` | Two-way bindable via `[(checked)]` |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `change` | `ToggleButtonChangeEvent` | `{ checked: boolean, originalEvent: Event }` |
| `focus` | `FocusEvent` | |
| `blur` | `FocusEvent` | |

## Usage

```html
<!-- minimal example -->
<ui-lib-toggle-button onLabel="On" offLabel="Off" [(checked)]="isOn" />

<!-- with icons, sticky selection -->
<ui-lib-toggle-button
  onLabel="Liked"
  offLabel="Like"
  onIcon="heart"
  [allowEmpty]="false"
  [(checked)]="liked"
/>
```
