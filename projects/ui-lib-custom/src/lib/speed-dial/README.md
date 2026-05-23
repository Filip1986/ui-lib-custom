# SpeedDial

**Selector:** `ui-lib-speed-dial`
**Package:** `ui-lib-custom/speed-dial`
**Content projection:** yes — three optional template slots via directives: `uiSpeedDialItem` (custom item rendering), `uiSpeedDialButton` (custom trigger button), `uiSpeedDialIcon` (custom trigger icon)

> Output names avoid native DOM event names (`click`, `focus`, `blur`, `change`) to prevent dual-binding issues when native events bubble from child elements to the host. Use `buttonClick` / `buttonFocus` / `buttonBlur` / `panelChange` as shown in the Outputs table.

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
| `show` | `SpeedDialShowEvent` | Fired when the dial opens |
| `hide` | `SpeedDialHideEvent` | Fired when the dial closes |
| `panelChange` | `SpeedDialVisibleChangeEvent` | Fired on every open/close toggle; includes `{ originalEvent, visible }`. Named `panelChange` (not `visibleChange`) to avoid clashing with the `[(visible)]` model signal's internal event. |
| `buttonClick` | `SpeedDialClickEvent` | Fired when the trigger button is activated. Named `buttonClick` (not `click`) to avoid native DOM event clash. |
| `buttonFocus` | `FocusEvent` | Fired when the trigger button gains focus. Named `buttonFocus` (not `focus`) to avoid native DOM event clash. |
| `buttonBlur` | `FocusEvent` | Fired when the trigger button loses focus. Named `buttonBlur` (not `blur`) to avoid native DOM event clash. |
| `itemCommand` | `SpeedDialItemCommandEvent` | Fired when an action item is activated |

## SpeedDialItem Interface

```typescript
interface SpeedDialItem {
  label?: string;      // Always provide for icon-only actions — used as aria-label and tooltip
  icon?: string;       // Icon name
  command?: (event: SpeedDialItemCommandEvent) => void;
  disabled?: boolean;
  tooltip?: string;    // Visible tooltip text (falls back to label if omitted)
  visible?: boolean;   // Hides item from the list when false
  styleClass?: string;
  [key: string]: unknown;
}
```

> **Accessibility note:** Because SpeedDial action buttons are icon-only, `label` is functionally required for every item. An item without `label` will have no accessible name, which is a WCAG 2.1 Level A violation.

## Keyboard Interaction

| Key | Element | Action |
|-----|---------|--------|
| `Enter` / `Space` | Trigger button | Toggle open / close |
| `ArrowDown` / `ArrowRight` | Trigger button (closed) | Open menu + focus first action |
| `ArrowUp` / `ArrowLeft` | Trigger button (closed) | Open menu + focus last action |
| `ArrowUp` / `ArrowDown` | Action button (direction: up/down) | Move focus between actions |
| `ArrowLeft` / `ArrowRight` | Action button (direction: left/right) | Move focus between actions |
| `Home` | Action button | Focus first enabled action |
| `End` | Action button | Focus last enabled action |
| `Escape` | Trigger or action button | Close menu; return focus to trigger |
| `Tab` | Trigger or action button | Close menu; move to next focusable element |

## ARIA Attributes

| Attribute | Element | Value |
|-----------|---------|-------|
| `aria-expanded` | Trigger button | `"true"` when open, `"false"` when closed |
| `aria-haspopup` | Trigger button | `"true"` |
| `aria-controls` | Trigger button | ID of the action list element |
| `aria-label` | Trigger button | Value of `buttonAriaLabel` → `ariaLabel` → `null` |
| `aria-labelledby` | Trigger button | Value of `ariaLabelledBy` |
| `role="menu"` | Action list `<ul>` | Announces as menu to assistive technology |
| `aria-hidden` | Action list `<ul>` | `"true"` when closed (hidden from AT) |
| `role="none"` | `<li>` wrappers | Removes list semantics; item semantics come from the button |
| `role="menuitem"` | Action `<button>` | Correct semantics inside `role="menu"` |
| `aria-label` | Action `<button>` | `item.label` — required for icon-only actions |
| `aria-disabled` | Action `<button>` | `"true"` when item is disabled |

## Usage

```html
<!-- basic vertical speed dial -->
<ui-lib-speed-dial [model]="actions" [(visible)]="isOpen" />

<!-- circular layout with mask -->
<ui-lib-speed-dial [model]="actions" type="circle" [mask]="true" (onItemCommand)="run($event)" />
```
