# Menu

**Selector:** `ui-lib-menu`
**Package:** `ui-lib-custom/menu`
**Content projection:** no — none

> In popup mode the component itself must hold a template reference (`#menu`) and be called imperatively via `menu.toggle($event)` / `menu.show($event)` / `menu.hide()` — there is no `appendTo` / teleport support; the panel positions itself with fixed viewport coordinates.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `MenuItem[]` | `[]` | Items to display; top-level items with `items` render as labelled groups |
| `popup` | `boolean` | `false` | `true` renders a floating overlay instead of an inline panel |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `ariaLabel` | `string` | `'Menu'` | `aria-label` on the `role="menu"` panel |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `MenuItemCommandEvent` | Fired on any non-disabled leaf item activation |
| `menuShow` | `MouseEvent` | Fired when the popup panel becomes visible |
| `menuHide` | `void` | Fired when the popup panel is hidden |

## Public Properties

| Name | Type | Notes |
|------|------|-------|
| `menuId` | `string` | Unique instance ID for the rendered menu panel |
| `isVisible` | `WritableSignal<boolean>` | Popup visibility state |
| `rovingIndex` | `WritableSignal<number>` | Index of the item that currently owns the tab stop |
| `focusedFlatIndex` | `WritableSignal<number>` | Index of the currently focused item in the flat focusable list |

## MenuItem Interface

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string \| undefined` | — | Visible text label for the item or group header |
| `icon` | `string \| undefined` | — | Icon class rendered in a decorative `<span>` |
| `disabled` | `boolean \| undefined` | `false` | When true, the item is inert and removed from keyboard navigation |
| `separator` | `boolean \| undefined` | `false` | Renders a visual separator line |
| `visible` | `boolean \| undefined` | `true` | When explicitly `false`, hides the item from rendering |
| `styleClass` | `string \| undefined` | — | Extra CSS class applied to the rendered link |
| `items` | `MenuItem[] \| undefined` | — | Child items used for grouped menu sections |
| `command` | `(event: MenuItemCommandEvent) => void \| undefined` | — | Callback invoked on click or keyboard activation |
| `url` | `string \| undefined` | — | When set, the item renders as an anchor with `href` |
| `target` | `string \| undefined` | — | Optional `target` attribute for `url`-based items |

## Usage

```html
<!-- inline (always visible) -->
<ui-lib-menu [model]="items" />

<!-- popup attached to a button -->
<ui-lib-button label="Options" (click)="menu.toggle($event)" />
<ui-lib-menu #menu [model]="items" [popup]="true" (itemClick)="onAction($event)" />
```

## Popup trigger guidance

- Use a **real button** (or another focusable control) as the popup trigger.
- Keep focus on the trigger before opening the popup — the Menu will capture that element and
  restore focus to it when the popup closes via `Escape`.
- In popup mode, `Tab` closes the menu and lets focus continue normally to the next tabbable
  control.

```html
<button type="button" (click)="actionsMenu.toggle($event)">Actions</button>
<ui-lib-menu #actionsMenu [model]="actionItems" [popup]="true" ariaLabel="Row actions" />
```

## Accessibility

### ARIA structure

| Element | Role / attribute | Notes |
|---------|------------------|-------|
| Panel `<div>` | `role="menu"` + `aria-label` | Root semantic container for the command list |
| Root `<ul>` | `role="presentation"` | Presentational wrapper only |
| Item `<li>` | `role="none"` | Neutral wrapper; the link carries the semantic role |
| Group `<ul>` | `role="group"` + `aria-label` | Announces labelled item groups |
| Item link `<a>` | `role="menuitem"` | Interactive menu command |
| Disabled item link | `aria-disabled="true"` | Announces the disabled state |
| Separator `<li>` | `role="separator"` | Exposed as an actual separator inside the menu |
| Icons | `aria-hidden="true"` | Decorative only |
| Group label `<div>` | `aria-hidden="true"` | Visual heading; the group is labelled via `aria-label` |

### Keyboard navigation

| Context | Key | Behaviour |
|---------|-----|-----------|
| Any menu item | `ArrowDown` | Move focus to the next enabled item (wraps) |
| Any menu item | `ArrowUp` | Move focus to the previous enabled item (wraps) |
| Any menu item | `Home` | Move focus to the first enabled item |
| Any menu item | `End` | Move focus to the last enabled item |
| Any menu item | `Enter` / `Space` | Activate the focused item |
| Popup menu | `Escape` | Close the popup and restore focus to the trigger |
| Popup menu | `Tab` | Close the popup and let focus continue naturally |

### Roving tabindex

The Menu now implements the **roving tabindex** pattern:

- only one enabled item has `tabindex="0"` at a time
- all other enabled items use `tabindex="-1"`
- disabled items always use `tabindex="-1"`
- arrow keys, `Home`, `End`, and direct focus updates move the active tab stop

This matches the expected keyboard behaviour for `role="menu"` patterns and keeps `Tab`
reserved for leaving the popup instead of stepping through every menu item.

### Accessibility best practices

- Always provide a meaningful `ariaLabel`, especially when more than one menu appears on screen.
- Prefer visible item labels; icons are decorative and intentionally hidden from assistive tech.
- Keep grouped menus short and coherent so `role="group"` labels stay useful.
- Use `disabled` for unavailable actions instead of removing them when the user benefits from
  understanding that the action exists but is currently unavailable.

## Composability notes

- `ui-lib-menu` is intentionally **data-driven** — it does not expose an `itemTemplate` slot.
- If you need a reusable trigger API around popup menus, prefer composing a dedicated
  `MenuTriggerDirective`-style wrapper in consuming code rather than pushing complex trigger logic
  into the Menu component itself.
- The component supports both `itemClick` and per-item `command` callbacks, so you can choose a
  central event handler or item-local behaviour without changing the public API.

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--uilib-menu-bg` | `var(--uilib-surface-overlay, #ffffff)` | Panel background |
| `--uilib-menu-border` | `1px solid var(--uilib-color-neutral-200, #e5e7eb)` | Panel border |
| `--uilib-menu-shadow` | `var(--uilib-shadow-md, ...)` | Popup panel shadow |
| `--uilib-menu-radius` | `var(--uilib-radius-md, 0.375rem)` | Panel corner radius |
| `--uilib-menu-min-width` | `12rem` | Minimum panel width |
| `--uilib-menu-padding` | `var(--uilib-spacing-1, 0.25rem)` | Vertical panel padding |
| `--uilib-menu-item-padding-y` | `var(--uilib-spacing-2, 0.5rem)` | Item vertical padding |
| `--uilib-menu-item-padding-x` | `var(--uilib-spacing-3, 0.75rem)` | Item horizontal padding |
| `--uilib-menu-item-bg-hover` | `var(--uilib-color-neutral-100, #f3f4f6)` | Hover/focus background |
| `--uilib-menu-item-color-hover` | `var(--uilib-color-neutral-900, #111827)` | Hover/focus text colour |
| `--uilib-menu-item-color-disabled` | `var(--uilib-color-neutral-400, #9ca3af)` | Disabled text colour |
| `--uilib-menu-icon-gap` | `var(--uilib-spacing-2, 0.5rem)` | Gap between icon and label |
| `--uilib-menu-separator-color` | `var(--uilib-color-neutral-200, #e5e7eb)` | Separator colour |
| `--uilib-menu-separator-my` | `var(--uilib-spacing-1, 0.25rem)` | Separator vertical margin |
| `--uilib-menu-focus-shadow` | `0 0 0 2px color-mix(...)` | Focus-visible ring |

## Reduced motion

Popup menus use a subtle `translateY(-4px)` + opacity slide-in when positioned. When the user has
`prefers-reduced-motion: reduce` enabled, transitions are disabled.
