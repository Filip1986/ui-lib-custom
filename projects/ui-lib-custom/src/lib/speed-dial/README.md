# SpeedDial

**Selector:** `ui-lib-speed-dial`
**Package:** `ui-lib-custom/speed-dial`
**Content projection:** yes — three optional template slots via directives: `uiSpeedDialItem` (custom item rendering), `uiSpeedDialButton` (custom trigger button), `uiSpeedDialIcon` (custom trigger icon)

> Outputs follow PrimeNG's `onShow` / `onHide` / `onClick` naming convention (prefixed with `on`), which is intentionally kept for API parity despite the lint suppression comments in the source.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `readonly SpeedDialItem[]` | `[]` | Items to display when open |
| `visible` | `boolean` | `false` | Two-way bindable via `[(visible)]` — controls open/closed state |
| `type` | `'linear' \| 'circle' \| 'semi-circle' \| 'quarter-circle'` | `'linear'` | Layout of the action items |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Expand direction (linear type only) |
| `radius` | `number` | `0` | Radius in px for circle/semi-circle/quarter-circle types |
| `transitionDelay` | `number` | `30` | Per-item animation stagger delay in ms |
| `mask` | `boolean` | `false` | Shows a backdrop overlay when open |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `hideOnClickOutside` | `boolean` | `true` | Close on click outside the component |
| `rotateAnimation` | `boolean` | `true` | Rotates the trigger icon when open (when no `hideIcon` is set) |
| `showIcon` | `string` | `'plus'` | Icon name for the trigger button when closed |
| `hideIcon` | `string \| null` | `null` | Icon name for the trigger button when open; `null` uses rotation animation instead |
| `buttonAriaLabel` | `string \| null` | `null` | `aria-label` override for the trigger button |
| `ariaLabel` | `string \| null` | `null` | Fallback `aria-label` for the trigger button |
| `tabindex` | `number` | `0` | Tab index on the trigger button |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onShow` | `SpeedDialShowEvent` | Fired when the dial opens |
| `onHide` | `SpeedDialHideEvent` | Fired when the dial closes |
| `onVisibleChange` | `SpeedDialVisibleChangeEvent` | Fired on every open/close toggle; includes `{ originalEvent, visible }` |
| `onClick` | `SpeedDialClickEvent` | Fired when the trigger button is clicked |
| `onFocus` | `FocusEvent` | Fired when the trigger button gains focus |
| `onBlur` | `FocusEvent` | Fired when the trigger button loses focus |
| `onItemCommand` | `SpeedDialItemCommandEvent` | Fired when an action item is activated |

## Usage

```html
<!-- basic vertical speed dial -->
<ui-lib-speed-dial [model]="actions" [(visible)]="isOpen" />

<!-- circular layout with mask -->
<ui-lib-speed-dial [model]="actions" type="circle" [mask]="true" (onItemCommand)="run($event)" />
```
