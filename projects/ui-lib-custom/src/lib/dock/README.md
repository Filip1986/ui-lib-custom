# Dock

**Selector:** `ui-lib-dock`
**Package:** `ui-lib-custom/dock`
**Content projection:** `#dockItemTemplate` — optional custom item content template

> The magnification effect scales up to `DOCK_MAGNIFICATION_SPREAD` (2) neighbours on each side of the hovered item; the scale falls off linearly. Set `[magnification]="false"` for a static bar with no animation.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `DockItem[]` | `[]` | Items to display in the dock |
| `position` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Position of the dock relative to its container |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `magnification` | `boolean` | `true` | Enables hover magnification effect |
| `magnificationLevel` | `number` | `1.5` | Scale factor at the directly hovered item (1.2–2.5 recommended) |
| `ariaLabel` | `string` | `'Dock'` | Accessible label for the `<nav>` landmark — override when multiple docks are on the same page |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `DockItemCommandEvent` | Fired when a dock item is clicked or activated via keyboard |

## DockItem interface

| Field | Type | Notes |
|-------|------|-------|
| `label` | `string?` | Tooltip text and default accessible name |
| `ariaLabel` | `string?` | Dedicated accessible name for screen readers — takes priority over `label` |
| `icon` | `string?` | Icon name passed to `<ui-lib-icon>` |
| `disabled` | `boolean?` | Disables the item |
| `visible` | `boolean?` | `false` hides the item from the list |
| `styleClass` | `string?` | Extra CSS class on the item wrapper |
| `routerLink` | `string \| string[]?` | Angular Router link |
| `url` | `string?` | External URL for anchor items |
| `target` | `string?` | Anchor `target` attribute (e.g. `'_blank'`) |
| `command` | `(event) => void?` | Callback invoked when the item is activated |

## Container role guidance

The dock uses `<nav aria-label="...">` as its container:
- Items that are **links** (`routerLink` or `url`) render as `<a>` elements.
- Items that are **actions** (`command` only) render as `<button>` elements.
- Items with no interaction render as `<span>` elements.

If all dock items are application actions (no navigation links), consider adding `role="toolbar"` via a host directive or using the `<ui-lib-toolbar>` component instead.

## Keyboard interaction

| Key | Behavior |
|-----|----------|
| `Tab` | Move focus to the next interactive dock item |
| `Shift+Tab` | Move focus to the previous interactive dock item |
| `Enter` / `Space` | Activate the focused button item |

Disabled items (buttons with `disabled` attribute) are skipped by Tab order automatically.

## Accessibility

- The `<nav>` landmark has `aria-label` from the `ariaLabel` input (default `"Dock"`).
- Each interactive item has `aria-label` from `item.ariaLabel ?? item.label`.
- Icons inside items have `aria-hidden="true"` — the accessible name comes from the item's `aria-label`.
- Tooltips have `aria-hidden="true"` — they are purely visual.
- Disabled command items render as `<button disabled aria-disabled="true">`.
- Disabled link items render as `<a aria-disabled="true">` without navigation attributes.

## Reduced motion

The magnification scale animation and tooltip transition are disabled when the user has requested reduced motion via `prefers-reduced-motion: reduce`. The dock still renders correctly; items display at their base size with no animation.

## Custom item template (Phase 5 — Composability)

Use `#dockItemTemplate` to replace the default icon with custom content. The template context exposes `$implicit` (the `DockItem`) and `index`.

```html
<ui-lib-dock [items]="dockItems">
  <ng-template #dockItemTemplate let-item let-index="index">
    <img [src]="item.icon" [alt]="" aria-hidden="true" />
    <span class="badge">{{ badges[index] }}</span>
  </ng-template>
</ui-lib-dock>
```

## Usage

```html
<!-- bottom dock (default) -->
<ui-lib-dock [items]="dockItems" (itemClick)="onDockItem($event)" />

<!-- top dock, no magnification -->
<ui-lib-dock [items]="dockItems" position="top" [magnification]="false" />

<!-- custom aria-label for multiple docks on one page -->
<ui-lib-dock [items]="navItems" ariaLabel="Primary navigation dock" />
<ui-lib-dock [items]="toolItems" ariaLabel="Tool shortcuts" />
```
