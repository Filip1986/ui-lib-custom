# Menubar

**Selector:** `ui-lib-menubar`
**Package:** `ui-lib-custom/menubar`
**Content projection:** yes — `[menubarStart]` slot (left, e.g. logo) and `[menubarEnd]` slot (right, e.g. search/actions)

> Unlike PrimeNG's Menubar, the start/end slots are attribute-selected (`[menubarStart]` / `[menubarEnd]`), not `<ng-template>` — project any element directly with those attributes.

## Inputs

| Name         | Type                                             | Default        | Notes                                                                                                   |
| ------------ | ------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------- |
| `model`      | `MenubarItem[]`                                  | `[]`           | Top-level navigation items; items with `items` array open dropdown panels                               |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`         | Falls back to `ThemeConfigService` when `null`                                                          |
| `size`       | `'sm' \| 'md' \| 'lg'`                           | `'md'`         | Size token                                                                                              |
| `styleClass` | `string \| null`                                 | `null`         | Extra CSS class on the host                                                                             |
| `ariaLabel`  | `string`                                         | `'Navigation'` | `aria-label` on the `<nav>` landmark — use a unique value when multiple navbars appear on the same page |

## Outputs

| Name        | Payload               | Notes                                            |
| ----------- | --------------------- | ------------------------------------------------ |
| `itemClick` | `MenubarCommandEvent` | Fired when a non-disabled leaf item is activated |

## Public Properties

| Name          | Type                     | Notes                                                                |
| ------------- | ------------------------ | -------------------------------------------------------------------- |
| `menubarId`   | `string`                 | Unique instance ID (e.g. `uilib-menubar-1`)                          |
| `rootListId`  | `string`                 | ID of the root `<ul>` — used by `aria-controls` on the toggle button |
| `activeIndex` | `WritableSignal<number>` | Index of the currently open root panel (-1 = none)                   |
| `rovingIndex` | `WritableSignal<number>` | Index of the root item that holds the tab stop (roving tabindex)     |

## MenubarItem Interface

| Property     | Type                                                | Default | Description                                 |
| ------------ | --------------------------------------------------- | ------- | ------------------------------------------- |
| `label`      | `string \| undefined`                               | —       | Display text for the item                   |
| `icon`       | `string \| undefined`                               | —       | Icon class applied to a decorative `<span>` |
| `disabled`   | `boolean \| undefined`                              | `false` | When true, item is inert                    |
| `visible`    | `boolean \| undefined`                              | `true`  | When explicitly `false`, hides the item     |
| `separator`  | `boolean \| undefined`                              | `false` | Renders a visual separator (no interaction) |
| `styleClass` | `string \| undefined`                               | —       | Extra CSS class on the item element         |
| `url`        | `string \| undefined`                               | —       | When set, renders the item as `<a href>`    |
| `target`     | `string \| undefined`                               | —       | `target` attribute for `url`-based items    |
| `items`      | `MenubarItem[] \| undefined`                        | —       | Nested items — creates a dropdown sub-panel |
| `command`    | `(event: MenubarCommandEvent) => void \| undefined` | —       | Callback when a leaf item is activated      |

## Content Projection

| Slot attribute   | Position              | Use for                               |
| ---------------- | --------------------- | ------------------------------------- |
| `[menubarStart]` | Left side of the bar  | Logo, branding, back button           |
| `[menubarEnd]`   | Right side of the bar | Search box, auth button, theme toggle |

```html
<ui-lib-menubar [model]="items">
  <img menubarStart src="/logo.svg" alt="Acme Corp" />
  <button menubarEnd type="button" (click)="openSearch()">Search</button>
</ui-lib-menubar>
```

## Usage

```html
<!-- minimal -->
<ui-lib-menubar [model]="navItems" />

<!-- with start/end slots -->
<ui-lib-menubar [model]="navItems">
  <img menubarStart src="logo.png" alt="Logo" />
  <button menubarEnd>Sign in</button>
</ui-lib-menubar>
```

## Accessibility

### ARIA structure

| Element                     | Role / attribute                                 | Notes                                                                                                                             |
| --------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `<nav>`                     | landmark + `aria-label`                          | Labels the navigation region. Customise via `ariaLabel` input — use a unique label when multiple navbars appear on the same page. |
| Root `<ul>`                 | `role="menubar"`                                 | Identifies the horizontal menu bar.                                                                                               |
| Root `<li>`                 | `role="none"`                                    | Neutral wrapper — the `<a>` carries the semantic role.                                                                            |
| Root `<a>`                  | `role="menuitem"`                                | Interactive menu item.                                                                                                            |
| Parent `<a>` (has subitems) | `aria-haspopup="menu"` + `aria-expanded`         | Announces that activating the item opens a submenu.                                                                               |
| Submenu `<ul>`              | `role="menu"` + `aria-orientation="vertical"`    | Identifies the dropdown panel as a vertical menu.                                                                                 |
| Submenu `<li>`              | `role="none"`                                    | Neutral wrapper.                                                                                                                  |
| Submenu `<a>`               | `role="menuitem"`                                | Interactive sub-item.                                                                                                             |
| Separator `<li>`            | `role="separator"` + `aria-hidden="true"`        | Visual divider — hidden from AT's item count.                                                                                     |
| Icons / carets              | `aria-hidden="true"`                             | Decorative — conveyed by label text.                                                                                              |
| Hamburger button            | `aria-expanded` + `aria-controls` + `aria-label` | Announces mobile menu state and links to the controlled list.                                                                     |

### Keyboard navigation

| Context              | Key                             | Behaviour                                                |
| -------------------- | ------------------------------- | -------------------------------------------------------- |
| Menubar (root level) | `ArrowRight`                    | Move focus to the next root item (wraps)                 |
| Menubar (root level) | `ArrowLeft`                     | Move focus to the previous root item (wraps)             |
| Menubar (root level) | `Home`                          | Move focus to the first root item                        |
| Menubar (root level) | `End`                           | Move focus to the last root item                         |
| Menubar (root level) | `ArrowDown` / `Enter` / `Space` | Open the dropdown panel and focus the first item         |
| Menubar (root level) | `Escape`                        | Close open panel; return focus to the triggering item    |
| Submenu panel        | `ArrowDown`                     | Move focus to the next item (wraps)                      |
| Submenu panel        | `ArrowUp`                       | Move focus to the previous item (wraps)                  |
| Submenu panel        | `ArrowRight`                    | Open nested sub-panel (when item has children)           |
| Submenu panel        | `ArrowLeft` / `Escape`          | Close current panel; return focus to parent root item    |
| Anywhere             | `Tab`                           | Move focus out of the menubar entirely (roving tabindex) |

### Roving tabindex

The Menubar implements the **roving tabindex** pattern required by WAI-ARIA for `role="menubar"`:

- Only **one** root item is in the tab sequence at a time (the one at `rovingIndex`)
- Arrow keys move between root items; `Tab` exits the menubar entirely
- The active tab stop follows arrow key navigation and click interactions

### Multiple navbars on the same page

When more than one `<ui-lib-menubar>` appears on the same page, provide a unique `ariaLabel`
for each so screen reader users can distinguish them in the landmarks list. The component
automatically generates a unique instance ID (`menubarId`) so `aria-controls` references
are never duplicated across instances:

```html
<ui-lib-menubar [model]="primaryNav" ariaLabel="Primary navigation" />
<ui-lib-menubar [model]="secondaryNav" ariaLabel="Documentation navigation" />
```

## CSS Custom Properties

| Property                            | Default                                    | Description                                                                        |
| ----------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `--uilib-menubar-bar-bg`            | `var(--uilib-surface-100, #f8f9fa)`        | Bar background colour                                                              |
| `--uilib-menubar-bar-border`        | `1px solid var(--uilib-color-border)`      | Bar border                                                                         |
| `--uilib-menubar-bar-border-radius` | `var(--uilib-radius-md, 4px)`              | Bar corner radius                                                                  |
| `--uilib-menubar-panel-bg`          | `var(--uilib-surface-0, #ffffff)`          | Dropdown panel background                                                          |
| `--uilib-menubar-panel-shadow`      | `var(--uilib-shadow-md)`                   | Dropdown panel shadow                                                              |
| `--uilib-menubar-panel-min-width`   | `12rem`                                    | Minimum dropdown panel width                                                       |
| `--uilib-menubar-transition`        | `var(--uilib-transition-fast, 150ms ease)` | Animation/transition duration (set to `0ms` with `prefers-reduced-motion: reduce`) |
