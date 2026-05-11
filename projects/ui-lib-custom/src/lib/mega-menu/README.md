# MegaMenu

**Selector:** `ui-lib-mega-menu`
**Package:** `ui-lib-custom/mega-menu`
**Content projection:** no — none

> Sub-items live inside `MegaMenuItem.items` as an array of `MegaMenuSubColumn` objects, each
> holding an `items: MegaMenuSubItem[]` array — this two-level nesting (columns within panels)
> differs from PrimeNG's flat `items` model.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `model` | `MegaMenuItem[]` | `[]` | Top-level items; items with `items` array open multi-column mega panels |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Bar orientation |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class on the host |
| `ariaLabel` | `string` | `'Navigation'` | `aria-label` on the `<nav>` landmark |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `MegaMenuCommandEvent` | Fired when a non-disabled sub-item is activated |
| `panelOpened` | `MegaMenuItem` | Fired when a mega panel opens; payload is the triggering top-level item |
| `panelClosed` | `void` | Fired when the currently open mega panel closes |

## Public API (for advanced usage)

| Property | Type | Notes |
|----------|------|-------|
| `menuId` | `string` | Unique ID for the component instance (e.g. `ui-lib-mega-menu-1`) |
| `panelId` | `string` | ID set on the open mega panel `<div>`; use for external `aria-controls` |
| `rovingIndex` | `WritableSignal<number>` | Index of the currently focused root item (roving tabindex) |
| `activeIndex` | `WritableSignal<number>` | Index of the root item whose panel is open (-1 = closed) |

## Data model

### `MegaMenuItem` — top-level items

| Property | Type | Notes |
|----------|------|-------|
| `label` | `string?` | Display text |
| `icon` | `string?` | Icon CSS class |
| `disabled` | `boolean?` | Renders with `aria-disabled="true"` and `tabindex="-1"` |
| `visible` | `boolean?` | Defaults to `true`; `false` removes from DOM |
| `styleClass` | `string?` | Extra CSS class on the `<li>` |
| `url` | `string?` | When set and `items` is absent, renders as an `<a href>` |
| `target` | `string?` | `target` attribute for `url`-based items |
| `command` | `(event) => void` | Callback for items without sub-items |
| `items` | `MegaMenuSubColumn[]?` | Columns for the mega panel |

### `MegaMenuSubColumn` — panel columns

| Property | Type | Notes |
|----------|------|-------|
| `header` | `string?` | Column heading (also used as `aria-label` on `<ul role="menu">`) |
| `items` | `MegaMenuSubItem[]` | Leaf items in this column |

### `MegaMenuSubItem` — leaf items

| Property | Type | Notes |
|----------|------|-------|
| `label` | `string?` | Display text |
| `icon` | `string?` | Icon CSS class |
| `disabled` | `boolean?` | Renders with `aria-disabled="true"` |
| `visible` | `boolean?` | Defaults to `true` |
| `separator` | `boolean?` | Renders a horizontal rule instead of a link |
| `styleClass` | `string?` | Extra CSS class on the `<a>` link |
| `url` | `string?` | Renders as `<a href>` |
| `target` | `string?` | `target` for `url`-based links |
| `command` | `(event) => void` | Callback on activation |

## Usage

```html
<!-- horizontal (default) -->
<ui-lib-mega-menu [model]="navItems" />

<!-- vertical sidebar -->
<ui-lib-mega-menu [model]="navItems" orientation="vertical" />

<!-- listen to panel events -->
<ui-lib-mega-menu
  [model]="navItems"
  (panelOpened)="onPanelOpened($event)"
  (panelClosed)="onPanelClosed()"
/>
```

## ARIA / Accessibility pattern

The MegaMenu follows the [WAI-ARIA Authoring Practices — Menu and Menubar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

| Element | Role / Attribute | Notes |
|---------|-----------------|-------|
| `<nav>` | `aria-label` | Set via the `ariaLabel` input; defaults to `'Navigation'` |
| Root `<ul>` | `role="menubar"`, `aria-orientation` | Horizontal or vertical depending on `orientation` |
| Root `<li>` | `role="none"` | Presentation wrapper |
| Root `<a>` | `role="menuitem"` | |
| Root `<a>` (has panel) | `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` | `aria-controls` points to the open panel's `id` |
| Panel `<div>` | `id` = `panelId`, `aria-label` = `"{item.label} submenu"` | Connected via `aria-controls` on the trigger link |
| Column `<ul>` | `role="menu"`, `aria-label` | `aria-label` is the column `header` value |
| Column `<li>` | `role="none"` | Presentation wrapper |
| Column `<a>` | `role="menuitem"` | |
| Separator `<li>` | `role="separator"`, `aria-hidden="true"` | |
| Icon `<span>` | `aria-hidden="true"` | |

### Keyboard navigation

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowLeft` | Move between root items (horizontal; wraps around) |
| `ArrowDown` / `ArrowUp` | Move between root items (vertical) or open panel (horizontal `ArrowDown`) |
| `ArrowRight` | Open panel (vertical orientation) |
| `Enter` / `Space` | Activate focused item or toggle panel |
| `Home` | Focus first root item |
| `End` | Focus last root item |
| `Escape` | Close open panel and restore focus to triggering root item |
| `Tab` | Close panel and move focus to next focusable element on the page |
| `ArrowDown` / `ArrowUp` (in panel) | Navigate within a column (wraps) |
| `ArrowRight` / `ArrowLeft` (in panel) | Jump to the first item in the next/previous column (wraps) |
| `Escape` (in panel) | Close panel and return focus to triggering root item |

### Column `aria-label` guidance

Add a `header` to each `MegaMenuSubColumn` to give the column list an accessible name:

```typescript
{
  label: 'Products',
  items: [
    {
      header: 'Software',        // → <ul role="menu" aria-label="Software">
      items: [{ label: 'Editor' }]
    },
    {
      header: 'Services',        // → <ul role="menu" aria-label="Services">
      items: [{ label: 'Cloud' }]
    }
  ]
}
```

Without a `header`, the column `<ul>` receives `aria-label="null"` (omitted), which is still
valid but reduces the navigability for screen-reader users.
