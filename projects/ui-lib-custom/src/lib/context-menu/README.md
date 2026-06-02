# ContextMenu

**Selector:** `ui-lib-context-menu`
**Package:** `ui-lib-custom/context-menu`
**Content projection:** no — none

> The menu always calls `event.preventDefault()` inside `show()`, suppressing the native browser context menu. Set `[global]="true"` to intercept right-clicks anywhere on the page, or wire `(contextmenu)="menu.show($event)"` on a specific element.

## Trigger pattern (required for full a11y)

`ui-lib-context-menu` does not own the trigger element, so consumers must provide trigger ARIA:

```html
<button
  type="button"
  aria-haspopup="menu"
  [attr.aria-expanded]="menu.isVisible() ? 'true' : 'false'"
  [attr.aria-controls]="menu.contextMenuId"
  (contextmenu)="menu.show($event)"
>
  Right-click me
</button>

<ui-lib-context-menu #menu [model]="items" />
```

Use `aria-haspopup="menu"` at minimum. `aria-expanded` and `aria-controls` are recommended.

## Inputs

| Name         | Type                                             | Default          | Notes                                                                                       |
| ------------ | ------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------- |
| `model`      | `ContextMenuItem[]`                              | `[]`             | Items to display; items with `items` array render a fly-out submenu                         |
| `global`     | `boolean`                                        | `false`          | When `true`, listens to `contextmenu` on the entire `document` and opens on any right-click |
| `variant`    | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null`           | Falls back to `ThemeConfigService` when `null`                                              |
| `size`       | `'sm' \| 'md' \| 'lg'`                           | `'md'`           | Size token                                                                                  |
| `styleClass` | `string \| null`                                 | `null`           | Extra CSS class on the host                                                                 |
| `ariaLabel`  | `string`                                         | `'Context Menu'` | `aria-label` on the menu panel                                                              |

## Outputs

| Name        | Payload                       | Notes                                            |
| ----------- | ----------------------------- | ------------------------------------------------ |
| `itemClick` | `ContextMenuItemCommandEvent` | Fired when a non-disabled leaf item is activated |
| `menuShow`  | `MouseEvent`                  | Fired when the panel becomes visible             |
| `menuHide`  | `void`                        | Fired when the panel is hidden                   |

## Public instance API

| Name                  | Type                               | Notes                                                                |
| --------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| `contextMenuId`       | `string`                           | Unique panel id (`uilib-context-menu-*`) for trigger `aria-controls` |
| `isVisible()`         | `boolean`                          | Current visibility signal value                                      |
| `show(event)`         | `(event: MouseEvent) => void`      | Opens menu at cursor position                                        |
| `hide(restoreFocus?)` | `(restoreFocus?: boolean) => void` | Hides menu; can restore captured focus                               |
| `toggle(event)`       | `(event: MouseEvent) => void`      | Toggles visibility at cursor position                                |

## Usage

```html
<!-- targeted right-click zone -->
<div (contextmenu)="menu.show($event)">Right-click me</div>
<ui-lib-context-menu #menu [model]="items" />

<!-- global: intercepts all right-clicks on the page -->
<ui-lib-context-menu [model]="items" [global]="true" />
```

## Keyboard support

| Key                     | Behavior                                                     |
| ----------------------- | ------------------------------------------------------------ |
| `ArrowDown` / `ArrowUp` | Move focus through top-level enabled items (roving tabindex) |
| `Home` / `End`          | Jump to first / last enabled top-level item                  |
| `ArrowRight`            | Open submenu and focus first enabled sub-item                |
| `ArrowLeft`             | Close open submenu and return focus to parent item           |
| `Enter` / `Space`       | Activate focused item                                        |
| `Escape`                | Close menu and restore focus to the pre-open focused element |
| `Tab`                   | Close menu and allow native tab navigation to continue       |

## Accessibility notes

### ARIA structure

| Element               | ARIA                                     |
| --------------------- | ---------------------------------------- |
| Panel                 | `role="menu"` + `aria-label`             |
| Root list             | `role="presentation"`                    |
| Item wrapper          | `role="none"`                            |
| Item link             | `role="menuitem"`                        |
| Parent item link      | `aria-haspopup="menu"` + `aria-expanded` |
| Disabled link         | `aria-disabled="true"`                   |
| Separator             | `role="separator"` (not aria-hidden)     |
| Decorative icon/caret | `aria-hidden="true"`                     |

### Focus management

- Opening captures the previously focused element and focuses the first enabled top-level menu item.
- Escape-close restores focus to the captured element.
- Click-outside and item-activation closes do not force focus restoration.
- Tab-close also does not restore focus; native Tab progression continues forward naturally.

## CSS custom properties

| Variable                                    | Purpose                       |
| ------------------------------------------- | ----------------------------- |
| `--uilib-context-menu-bg`                   | Panel background              |
| `--uilib-context-menu-border`               | Panel border                  |
| `--uilib-context-menu-shadow`               | Panel box shadow              |
| `--uilib-context-menu-radius`               | Panel border radius           |
| `--uilib-context-menu-z-index`              | Overlay stacking              |
| `--uilib-context-menu-min-width`            | Panel min width               |
| `--uilib-context-menu-padding`              | Panel vertical padding        |
| `--uilib-context-menu-font-size`            | Effective font size           |
| `--uilib-context-menu-font-size-sm/md/lg`   | Size variant font sizes       |
| `--uilib-context-menu-item-padding-y/x`     | Item paddings                 |
| `--uilib-context-menu-item-padding-y-sm/lg` | Size variant item paddings    |
| `--uilib-context-menu-item-color`           | Default item text color       |
| `--uilib-context-menu-item-bg-hover`        | Hover/active background       |
| `--uilib-context-menu-item-color-hover`     | Hover/active text color       |
| `--uilib-context-menu-item-color-disabled`  | Disabled text color           |
| `--uilib-context-menu-item-bg-active`       | Active state background token |
| `--uilib-context-menu-item-color-active`    | Active state text token       |
| `--uilib-context-menu-icon-size`            | Icon size                     |
| `--uilib-context-menu-icon-gap`             | Gap between icon and label    |
| `--uilib-context-menu-separator-color`      | Separator color               |
| `--uilib-context-menu-separator-my`         | Separator vertical margin     |
| `--uilib-context-menu-submenu-offset`       | Submenu offset token          |
| `--uilib-context-menu-focus-shadow`         | Focus-visible ring shadow     |
