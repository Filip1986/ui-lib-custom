# Panel

A flexible content container with an optional collapsible body, header actions slot, and footer slot. Inspired by PrimeNG's Panel.

## Import

```typescript
import { Panel } from 'ui-lib-custom/panel';
```

## Selector

`ui-lib-panel`

## Inputs

| Input        | Type                                             | Default | Description                                                 |
| ------------ | ------------------------------------------------ | ------- | ----------------------------------------------------------- |
| `header`     | `string`                                         | `''`    | Header title text. Use `[panelHeader]` projection for HTML. |
| `toggleable` | `boolean`                                        | `false` | Whether the body can be collapsed/expanded.                 |
| `collapsed`  | `boolean` (model)                                | `false` | Two-way bound collapsed state.                              |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`  | Design variant. Falls back to ThemeConfigService.           |
| `styleClass` | `string \| null`                                 | `null`  | Additional CSS classes for the host element.                |

## Outputs

| Output    | Type               | Description                               |
| --------- | ------------------ | ----------------------------------------- |
| `toggled` | `PanelToggleEvent` | Emitted when the collapsed state changes. |

### PanelToggleEvent

```typescript
interface PanelToggleEvent {
  collapsed: boolean;
  originalEvent?: Event;
}
```

## Content Projection

| Slot          | Selector        | Description                                       |
| ------------- | --------------- | ------------------------------------------------- |
| Body          | _(default)_     | Main scrollable body content.                     |
| Custom header | `[panelHeader]` | Replaces the header title text area.              |
| Header icons  | `[panelIcons]`  | Action buttons rendered in the header right side. |
| Footer        | `[panelFooter]` | Content rendered in the footer area.              |

## Usage

### Basic panel

```html
<ui-lib-panel header="User Details">
  <p>Content goes here.</p>
</ui-lib-panel>
```

### Toggleable panel with two-way binding

```html
<ui-lib-panel header="Advanced" [toggleable]="true" [(collapsed)]="isCollapsed">
  <p>This can be collapsed.</p>
</ui-lib-panel>
```

### Custom header and footer

```html
<ui-lib-panel [toggleable]="true">
  <span panelHeader>Custom <strong>Header</strong></span>
  <p>Body content.</p>
  <div panelFooter>Footer content</div>
</ui-lib-panel>
```

### Header action icons

```html
<ui-lib-panel header="Settings" [toggleable]="true">
  <button panelIcons type="button" (click)="refresh()">Refresh</button>
  <p>Panel body.</p>
</ui-lib-panel>
```

## CSS Custom Properties

| Property                           | Default                      | Description                         |
| ---------------------------------- | ---------------------------- | ----------------------------------- |
| `--uilib-panel-border-color`       | `var(--uilib-surface-300)`   | Panel border colour.                |
| `--uilib-panel-border-radius`      | `var(--uilib-radius-md)`     | Panel corner radius.                |
| `--uilib-panel-header-bg`          | `var(--uilib-surface)`       | Header background.                  |
| `--uilib-panel-header-color`       | `var(--uilib-color-text)`    | Header text colour.                 |
| `--uilib-panel-header-font-size`   | `0.9375rem`                  | Header font size.                   |
| `--uilib-panel-header-font-weight` | `600`                        | Header font weight.                 |
| `--uilib-panel-header-padding`     | `0.75rem 1rem`               | Header padding.                     |
| `--uilib-panel-content-padding`    | `1rem`                       | Body content padding.               |
| `--uilib-panel-footer-bg`          | `var(--uilib-surface-50)`    | Footer background.                  |
| `--uilib-panel-footer-padding`     | `0.75rem 1rem`               | Footer padding.                     |
| `--uilib-panel-toggle-color`       | `var(--uilib-color-primary)` | Toggle button icon colour.          |
| `--uilib-panel-toggle-hover-bg`    | `var(--uilib-surface-100)`   | Toggle button hover background.     |
| `--uilib-panel-toggle-size`        | `1.75rem`                    | Toggle button width and height.     |
| `--uilib-panel-transition`         | `200ms ease`                 | Collapse animation duration/easing. |

## Accessibility

### ARIA Attributes

| Element              | Attribute         | Value / Notes                                                                       |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------- |
| `ui-lib-panel` host  | `role`            | `"region"` — marks this as a named landmark region.                                 |
| `ui-lib-panel` host  | `aria-labelledby` | Points to the header element `id` to give the region an accessible name.            |
| Header `<div>`       | `id`              | `"ui-lib-panel-{n}-header"` — unique per-instance; referenced by `aria-labelledby`. |
| Content `<div>`      | `id`              | `"ui-lib-panel-{n}-content"` — unique per-instance; referenced by `aria-controls`.  |
| Content `<div>`      | `aria-hidden`     | `"true"` when `toggleable` and `collapsed`; attribute removed when expanded.        |
| Toggle `<button>`    | `aria-expanded`   | `"true"` when expanded, `"false"` when collapsed.                                   |
| Toggle `<button>`    | `aria-controls`   | Points to the content wrapper `id`.                                                 |
| Toggle `<button>`    | `aria-label`      | `"Toggle panel"` — provides a descriptive label for icon-only button.               |
| Toggle icon `<span>` | `aria-hidden`     | `"true"` — decorative chevron; hidden from assistive technology.                    |

### Keyboard Interaction

| Key       | Target element | Behaviour                                     |
| --------- | -------------- | --------------------------------------------- |
| **Tab**   | Toggle button  | Moves focus to / away from the toggle button. |
| **Enter** | Toggle button  | Toggles the panel open or collapsed.          |
| **Space** | Toggle button  | Toggles the panel open or collapsed.          |

### Accessibility Notes

- The panel host uses `role="region"` and `aria-labelledby` so screen readers can announce it as
  a named landmark. Only use Panel for content that warrants landmark navigation — avoid wrapping
  every minor section.
- When the panel is collapsed, the content wrapper gains `aria-hidden="true"` so assistive
  technologies skip over hidden body content.
- The toggle button uses `aria-expanded` to communicate the current state to screen readers;
  the value changes reactively as the panel opens and closes.
- All collapse/expand animations respect `prefers-reduced-motion: reduce` — the transition
  duration is set to `0ms` for users who prefer reduced motion.
- Focus is never moved programmatically on toggle; the user retains focus on the toggle button,
  which is the expected pattern for show/hide regions.
