# SpeedDial

**Selector:** `ui-lib-speed-dial`
**Package:** `ui-lib-custom/speed-dial`
**Content projection:** yes — three optional template slots via directives: `uiSpeedDialItem` (custom item rendering), `uiSpeedDialButton` (custom trigger button), `uiSpeedDialIcon` (custom trigger icon)

> Output names avoid native DOM event names (`click`, `focus`, `blur`, `change`) to prevent dual-binding issues when native events bubble from child elements to the host. Use `buttonClick` / `buttonFocus` / `buttonBlur` / `panelChange` as shown in the Outputs table.

## Inputs

| Name                 | Type                                                        | Default    | Notes                                                                              |
| -------------------- | ----------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------- |
| `model`              | `readonly SpeedDialItem[]`                                  | `[]`       | Items to display when open                                                         |
| `visible`            | `boolean`                                                   | `false`    | Two-way bindable via `[(visible)]` — controls open/closed state                    |
| `type`               | `'linear' \| 'circle' \| 'semi-circle' \| 'quarter-circle'` | `'linear'` | Layout of the action items                                                         |
| `direction`          | `'up' \| 'down' \| 'left' \| 'right'`                       | `'up'`     | Expand direction (linear type only)                                                |
| `radius`             | `number`                                                    | `0`        | Radius in px for circle/semi-circle/quarter-circle types                           |
| `transitionDelay`    | `number`                                                    | `30`       | Per-item animation stagger delay in ms                                             |
| `mask`               | `boolean`                                                   | `false`    | Shows a backdrop overlay when open                                                 |
| `disabled`           | `boolean`                                                   | `false`    | Disables all interaction                                                           |
| `hideOnClickOutside` | `boolean`                                                   | `true`     | Close on click outside the component                                               |
| `rotateAnimation`    | `boolean`                                                   | `true`     | Rotates the trigger icon when open (when no `hideIcon` is set)                     |
| `showIcon`           | `string`                                                    | `'plus'`   | Icon name for the trigger button when closed                                       |
| `hideIcon`           | `string \| null`                                            | `null`     | Icon name for the trigger button when open; `null` uses rotation animation instead |
| `buttonAriaLabel`    | `string \| null`                                            | `null`     | `aria-label` override for the trigger button                                       |
| `ariaLabel`          | `string \| null`                                            | `null`     | Fallback `aria-label` for the trigger button                                       |
| `tabindex`           | `number`                                                    | `0`        | Tab index on the trigger button                                                    |
| `variant`            | `'material' \| 'bootstrap' \| 'minimal' \| null`            | `null`     | Falls back to `ThemeConfigService` when `null`                                     |
| `size`               | `'sm' \| 'md' \| 'lg'`                                      | `'md'`     | Size token                                                                         |
| `styleClass`         | `string \| null`                                            | `null`     | Extra CSS class on the host                                                        |

## Outputs

| Name          | Payload                       | Notes                                                                                                                                                                                      |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `show`        | `SpeedDialShowEvent`          | Fired when the dial opens                                                                                                                                                                  |
| `hide`        | `SpeedDialHideEvent`          | Fired when the dial closes                                                                                                                                                                 |
| `panelChange` | `SpeedDialVisibleChangeEvent` | Fired on every open/close toggle; includes `{ originalEvent, visible }`. Named `panelChange` (not `visibleChange`) to avoid clashing with the `[(visible)]` model signal's internal event. |
| `buttonClick` | `SpeedDialClickEvent`         | Fired when the trigger button is activated. Named `buttonClick` (not `click`) to avoid native DOM event clash.                                                                             |
| `buttonFocus` | `FocusEvent`                  | Fired when the trigger button gains focus. Named `buttonFocus` (not `focus`) to avoid native DOM event clash.                                                                              |
| `buttonBlur`  | `FocusEvent`                  | Fired when the trigger button loses focus. Named `buttonBlur` (not `blur`) to avoid native DOM event clash.                                                                                |
| `itemCommand` | `SpeedDialItemCommandEvent`   | Fired when an action item is activated                                                                                                                                                     |

## SpeedDialItem Interface

```typescript
interface SpeedDialItem {
  label?: string; // Always provide for icon-only actions — used as aria-label and tooltip
  icon?: string; // Icon name
  command?: (event: SpeedDialItemCommandEvent) => void;
  disabled?: boolean;
  tooltip?: string; // Visible tooltip text (falls back to label if omitted)
  visible?: boolean; // Hides item from the list when false
  styleClass?: string;
  [key: string]: unknown;
}
```

> **Accessibility note:** Because SpeedDial action buttons are icon-only, `label` is functionally required for every item. An item without `label` will have no accessible name, which is a WCAG 2.1 Level A violation.

## Keyboard Interaction

| Key                        | Element                               | Action                                     |
| -------------------------- | ------------------------------------- | ------------------------------------------ |
| `Enter` / `Space`          | Trigger button                        | Toggle open / close                        |
| `ArrowDown` / `ArrowRight` | Trigger button (closed)               | Open menu + focus first action             |
| `ArrowUp` / `ArrowLeft`    | Trigger button (closed)               | Open menu + focus last action              |
| `ArrowUp` / `ArrowDown`    | Action button (direction: up/down)    | Move focus between actions                 |
| `ArrowLeft` / `ArrowRight` | Action button (direction: left/right) | Move focus between actions                 |
| `Home`                     | Action button                         | Focus first enabled action                 |
| `End`                      | Action button                         | Focus last enabled action                  |
| `Escape`                   | Trigger or action button              | Close menu; return focus to trigger        |
| `Tab`                      | Trigger or action button              | Close menu; move to next focusable element |

## ARIA Attributes

| Attribute         | Element            | Value                                                       |
| ----------------- | ------------------ | ----------------------------------------------------------- |
| `aria-expanded`   | Trigger button     | `"true"` when open, `"false"` when closed                   |
| `aria-haspopup`   | Trigger button     | `"true"`                                                    |
| `aria-controls`   | Trigger button     | ID of the action list element                               |
| `aria-label`      | Trigger button     | Value of `buttonAriaLabel` → `ariaLabel` → `null`           |
| `aria-labelledby` | Trigger button     | Value of `ariaLabelledBy`                                   |
| `role="menu"`     | Action list `<ul>` | Announces as menu to assistive technology                   |
| `aria-hidden`     | Action list `<ul>` | `"true"` when closed (hidden from AT)                       |
| `role="none"`     | `<li>` wrappers    | Removes list semantics; item semantics come from the button |
| `role="menuitem"` | Action `<button>`  | Correct semantics inside `role="menu"`                      |
| `aria-label`      | Action `<button>`  | `item.label` — required for icon-only actions               |
| `aria-disabled`   | Action `<button>`  | `"true"` when item is disabled                              |

## Usage

```html
<!-- basic vertical speed dial -->
<ui-lib-speed-dial [model]="actions" [(visible)]="isOpen" />

<!-- circular layout with mask -->
<ui-lib-speed-dial [model]="actions" type="circle" [mask]="true" (onItemCommand)="run($event)" />
```

## CSS Custom Properties

| Variable                                 | Default                                               | Description                                                                                |
| ---------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `--uilib-speed-dial-button-size`         | `3.25rem`                                             | Trigger button size (width and height)                                                     |
| `--uilib-speed-dial-button-bg`           | `var(--uilib-color-primary-600)`                      | Trigger button background                                                                  |
| `--uilib-speed-dial-button-color`        | `var(--uilib-color-neutral-50)`                       | Trigger button icon/text color                                                             |
| `--uilib-speed-dial-button-shadow`       | `var(--uilib-shadow-lg)`                              | Trigger button box shadow                                                                  |
| `--uilib-speed-dial-item-size`           | `2.75rem`                                             | Action item button size                                                                    |
| `--uilib-speed-dial-item-bg`             | `var(--uilib-color-primary-600)`                      | Action item background                                                                     |
| `--uilib-speed-dial-item-color`          | `var(--uilib-color-neutral-50)`                       | Action item icon color                                                                     |
| `--uilib-speed-dial-item-shadow`         | `var(--uilib-shadow-md)`                              | Action item box shadow                                                                     |
| `--uilib-speed-dial-gap`                 | `var(--uilib-space-2, 0.5rem)`                        | Gap between action items                                                                   |
| `--uilib-speed-dial-radius`              | `var(--uilib-radius-full, 9999px)`                    | Border radius for buttons                                                                  |
| `--uilib-speed-dial-mask-bg`             | `color-mix(…neutral-900… 50%, transparent)`           | Backdrop color when `mask=true`                                                            |
| `--uilib-speed-dial-transition-duration` | `var(--uilib-transition-md, 200ms)`                   | Duration for all open/close animations; set to `0ms` when `prefers-reduced-motion: reduce` |
| `--uilib-speed-dial-transition-easing`   | `var(--uilib-transition-ease-out, ease-out)`          | Easing for all animations                                                                  |
| `--uilib-speed-dial-rotate-open`         | `45deg`                                               | Trigger icon rotation angle when open                                                      |
| `--uilib-speed-dial-focus-ring`          | `0 0 0 2px color-mix(…primary-500… 30%, transparent)` | Focus ring box-shadow on buttons                                                           |
