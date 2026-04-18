# SplitButton

SplitButton combines a primary action button with a secondary dropdown trigger so related operations stay in a single compact control while preserving clear action hierarchy, keyboard navigation, and signal-driven theming behavior.

---

## Import

```ts
import { SplitButtonComponent, type SplitButtonItem } from 'ui-lib-custom/split-button';
```

---

## Usage

```html
<ui-lib-split-button
  label="Save"
  icon="save"
  [model]="items"
  (onClick)="onSave()"
  (onItemCommand)="onMenuCommand($event)"
/>
```

```ts
public readonly items: SplitButtonItem[] = [
  { label: 'Update', icon: 'pencil', command: (event): void => this.onMenuCommand(event) },
  { label: 'Delete', icon: 'trash', command: (event): void => this.onMenuCommand(event) },
  { label: 'Copy Link', icon: 'link', command: (event): void => this.onMenuCommand(event) },
  { separator: true },
  { label: 'Help', icon: 'help-circle', tooltip: 'Open help center' },
];
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|---|---|---:|---|
| `label` | `string` | `''` | Main button label text. |
| `icon` | `string \| null` | `null` | Main button icon name. |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Main button icon placement. |
| `model` | `readonly SplitButtonItem[]` | `[]` | Menu model; items with `visible: false` are filtered out. |
| `severity` | `SplitButtonSeverity` | `'primary'` | Color severity token. |
| `variant` | `SplitButtonVariant \| null` | `null` | Explicit visual variant, `null` resolves from theme service. |
| `size` | `SplitButtonSize` | `'md'` | Size scale for button pair. |
| `disabled` | `boolean` | `false` | Disables both buttons and interaction. |
| `buttonDisabled` | `boolean` | `false` | Disables only the main action button. |
| `menuButtonDisabled` | `boolean` | `false` | Disables only the menu trigger button. |
| `loading` | `boolean` | `false` | Shows loading icon and disables main action. |
| `loadingIcon` | `string` | `'spinner'` | Icon used while loading. |
| `raised` | `boolean` | `false` | Enables raised style token set. |
| `rounded` | `boolean` | `false` | Enables pill radius token set. |
| `text` | `boolean` | `false` | Applies text-style button presentation. |
| `outlined` | `boolean` | `false` | Applies outlined button presentation. |
| `dropdownIcon` | `string` | `'chevron-down'` | Menu trigger icon when no custom template is provided. |
| `buttonAriaLabel` | `string \| null` | `null` | Accessible name for the main button (falls back to `label`). |
| `menuButtonAriaLabel` | `string \| null` | `null` | Accessible name for menu trigger and menu label fallback. |
| `tabindex` | `number` | `0` | Tab order value applied to both trigger buttons. |
| `styleClass` | `string \| null` | `null` | Additional host class names. |

### Outputs

| Output | Payload | Description |
|---|---|---|
| `onClick` | `SplitButtonClickEvent` | Fires when the main action button is activated. |
| `onMenuShow` | `SplitButtonMenuShowEvent` | Fires when the menu opens. |
| `onMenuHide` | `SplitButtonMenuHideEvent` | Fires when the menu closes. |
| `onItemCommand` | `SplitButtonItemCommandEvent` | Fires when a menu item command executes. |

### Template Slots

| Selector | Context | Description |
|---|---|---|
| `[splitButtonContent]` | none | Replaces main button label/icon content area. |
| `[splitButtonDropdownIcon]` | none | Replaces dropdown trigger icon content. |

### Types

| Type | Values |
|---|---|
| `SplitButtonVariant` | `'material' \| 'bootstrap' \| 'minimal'` |
| `SplitButtonSize` | `'sm' \| 'md' \| 'lg'` |
| `SplitButtonSeverity` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'help' \| 'danger' \| 'contrast'` |

---

## `SplitButtonItem` Reference

| Field | Type | Description |
|---|---|---|
| `label` | `string` | Menu item label text. |
| `icon` | `string` | Optional leading icon name. |
| `command` | `(event: SplitButtonItemCommandEvent) => void` | Callback invoked when item is activated. |
| `disabled` | `boolean` | Marks menu item as non-interactive. |
| `separator` | `boolean` | Renders a separator row instead of a command item. |
| `tooltip` | `string` | Native title fallback for tooltip text. |
| `url` | `string` | Opens URL via `window.open`. |
| `target` | `string` | Window target used with `url` (`_self`, `_blank`, etc). |
| `routerLink` | `string \| unknown[]` | Router navigation target when Angular Router is available. |
| `styleClass` | `string` | Additional metadata class field for consumers/templates. |
| `visible` | `boolean` | When `false`, item is removed from rendered menu. |

---

## Severity, Modifiers, and Sizes

- Severities: `primary`, `secondary`, `success`, `info`, `warning`, `help`, `danger`, `contrast`.
- Visual modifiers: `raised`, `rounded`, `text`, `outlined`.
- Sizes: `sm`, `md`, `lg`.
- Variant fallback: when `variant` is `null`, `ThemeConfigService` provides the active variant.

---

## CSS Variables

| Variable | Default |
|---|---|
| `--uilib-split-button-bg` | `var(--uilib-button-secondary-bg, var(--uilib-color-secondary-600, var(--uilib-color-neutral-600, currentColor)))` |
| `--uilib-split-button-fg` | `var(--uilib-button-secondary-fg, var(--uilib-color-neutral-50, currentColor))` |
| `--uilib-split-button-border` | `var(--uilib-button-secondary-border, var(--uilib-split-button-bg))` |
| `--uilib-split-button-bg-hover` | `var(--uilib-button-secondary-bg-hover, var(--uilib-split-button-bg))` |
| `--uilib-split-button-fg-hover` | `var(--uilib-split-button-fg)` |
| `--uilib-split-button-emphasis` | `var(--uilib-split-button-border)` |
| `--uilib-split-button-radius` | `var(--uilib-button-radius, var(--uilib-shape-base, 0.375rem))` |
| `--uilib-split-button-padding` | `var(--uilib-button-padding-medium, var(--uilib-space-2, 0.5rem) var(--uilib-space-4, 1rem))` |
| `--uilib-split-button-font-size` | `var(--uilib-button-font-size-medium, var(--uilib-font-size-md, 1rem))` |
| `--uilib-split-button-shadow` | `var(--uilib-button-shadow, none)` |
| `--uilib-split-button-transition` | `var(--uilib-button-transition, all var(--uilib-transition-fast, 0.2s ease))` |
| `--uilib-split-button-focus-ring` | `var(--uilib-button-focus-ring, 0 0 0 var(--uilib-border-width-2, 0.125rem) color-mix(in srgb, var(--uilib-color-primary-500, currentColor) 30%, transparent))` |
| `--uilib-split-button-disabled-opacity` | `var(--uilib-button-disabled-opacity, 0.5)` |
| `--uilib-split-button-divider-color` | `color-mix(in srgb, var(--uilib-split-button-bg) 75%, transparent)` |
| `--uilib-split-button-menu-bg` | `var(--uilib-select-dropdown-bg, var(--uilib-surface, transparent))` |
| `--uilib-split-button-menu-shadow` | `var(--uilib-select-dropdown-shadow, var(--uilib-shadow-md, none))` |
| `--uilib-split-button-menu-radius` | `var(--uilib-split-button-radius)` |
| `--uilib-split-button-menu-z` | `var(--uilib-z-overlay, 1000)` |
| `--uilib-split-button-menu-item-padding` | `var(--uilib-space-2, 0.5rem) var(--uilib-space-3, 0.75rem)` |
| `--uilib-split-button-menu-item-hover-bg` | `var(--uilib-select-option-hover, color-mix(in srgb, var(--uilib-color-primary-600, currentColor) 8%, transparent))` |
| `--uilib-split-button-menu-item-disabled-opacity` | `0.55` |
| `--uilib-split-button-separator-color` | `color-mix(in srgb, var(--uilib-split-button-border) 55%, transparent)` |
| `--uilib-split-button-icon-size` | `var(--uilib-icon-size-sm, 1rem)` |

---

## Keyboard Interaction

| Target | Key | Behavior |
|---|---|---|
| Main button | `Enter`, `Space` | Activates main action (native button behavior). |
| Main button | `Tab` | Moves focus per normal tab order. |
| Menu button | `Enter`, `Space` | Toggle menu open/closed; opening focuses first menu item. |
| Menu button | `ArrowDown` | Open menu and focus first enabled menu item. |
| Menu button | `ArrowUp` | Open menu and focus last enabled menu item. |
| Menu button | `Escape` | Close menu and restore focus to menu button. |
| Menu items | `Enter`, `Space` | Execute command/navigation and close menu. |
| Menu items | `ArrowDown`, `ArrowUp` | Move focus to next/previous enabled menu item (wraps). |
| Menu items | `Home`, `End` | Jump focus to first/last enabled menu item. |
| Menu items | `Escape` | Close menu and return focus to menu button. |
| Menu items | `Tab` | Close menu and continue browser tab flow. |

---

## Accessibility

- Main action is a native `<button>` with optional `buttonAriaLabel`; falls back to `label`.
- Menu trigger exposes `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls`.
- Popup list uses `role="menu"`; actionable rows use `role="menuitem"`; separators use `role="separator"`.
- Disabled menu rows expose `aria-disabled="true"` and are removed from keyboard activation paths.
- Escape handling and post-command close behavior return focus to menu trigger for predictable keyboard flow.
- Consumers should provide meaningful labels when using custom content templates.

---

## Known Limitations (v1)

- Nested submenus are deferred to v2.
- Tooltips currently fall back to native `title`; migrate to `ui-lib-tooltip` when that component ships.
- `appendTo`/portal mounting behavior is deferred; the menu currently renders in-place.
