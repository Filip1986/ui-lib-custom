# Panel

A flexible content container with an optional collapsible body, header actions slot, and footer slot. Inspired by PrimeNG's Panel.

## Import

```typescript
import { Panel } from 'ui-lib-custom/panel';
```

## Selector

`ui-lib-panel`

## Inputs

| Input        | Type                                     | Default  | Description                                              |
|--------------|------------------------------------------|----------|----------------------------------------------------------|
| `header`     | `string`                                 | `''`     | Header title text. Use `[panelHeader]` projection for HTML. |
| `toggleable` | `boolean`                                | `false`  | Whether the body can be collapsed/expanded.              |
| `collapsed`  | `boolean` (model)                        | `false`  | Two-way bound collapsed state.                           |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`   | Design variant. Falls back to ThemeConfigService. |
| `styleClass` | `string \| null`                         | `null`   | Additional CSS classes for the host element.             |

## Outputs

| Output    | Type               | Description                                             |
|-----------|--------------------|---------------------------------------------------------|
| `toggled` | `PanelToggleEvent` | Emitted when the collapsed state changes.               |

### PanelToggleEvent

```typescript
interface PanelToggleEvent {
  collapsed: boolean;
  originalEvent?: Event;
}
```

## Content Projection

| Slot              | Selector        | Description                                       |
|-------------------|-----------------|---------------------------------------------------|
| Body              | *(default)*     | Main scrollable body content.                     |
| Custom header     | `[panelHeader]` | Replaces the header title text area.              |
| Header icons      | `[panelIcons]`  | Action buttons rendered in the header right side. |
| Footer            | `[panelFooter]` | Content rendered in the footer area.              |

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

| Property                          | Default                    | Description                     |
|-----------------------------------|----------------------------|---------------------------------|
| `--uilib-panel-border-color`      | `var(--uilib-surface-300)` | Panel border colour.            |
| `--uilib-panel-border-radius`     | `var(--uilib-radius-md)`   | Panel corner radius.            |
| `--uilib-panel-header-bg`         | `var(--uilib-surface)`     | Header background.              |
| `--uilib-panel-header-color`      | `var(--uilib-color-text)`  | Header text colour.             |
| `--uilib-panel-header-padding`    | `0.75rem 1rem`             | Header padding.                 |
| `--uilib-panel-content-padding`   | `1rem`                     | Body content padding.           |
| `--uilib-panel-footer-bg`         | `var(--uilib-surface-50)`  | Footer background.              |
| `--uilib-panel-footer-padding`    | `0.75rem 1rem`             | Footer padding.                 |
| `--uilib-panel-toggle-color`      | `var(--uilib-color-primary)` | Toggle button icon colour.    |
| `--uilib-panel-toggle-hover-bg`   | `var(--uilib-surface-100)` | Toggle button hover background. |
| `--uilib-panel-transition`        | `200ms ease`               | Collapse animation duration.    |

## Accessibility

- Host has `role="region"` + `aria-labelledby` pointing to the header element.
- Toggle button has `aria-expanded` (reflects the open/closed state) and `aria-controls` pointing to the content wrapper.
- Toggle button supports **Enter** and **Space** keys.
- Content wrapper has `aria-hidden="true"` when collapsed.
