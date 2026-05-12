# SplitButton

**Selector:** `ui-lib-split-button`  
**Package:** `ui-lib-custom/split-button`  
**Content projection:** yes — `SplitButtonContentDirective` replaces the primary button content and `SplitButtonDropdownIconDirective` replaces the dropdown icon

SplitButton combines a primary action button with a secondary dropdown trigger so related actions stay grouped in a compact, keyboard-accessible control.

## Import

```ts
import {
  SplitButtonComponent,
  SplitButtonContentDirective,
  SplitButtonDropdownIconDirective,
  type SplitButtonItem,
} from 'ui-lib-custom/split-button';
```

## Usage

```html
<ui-lib-split-button
  label="Save"
  icon="save"
  [model]="items"
  (onClick)="savePrimary()"
  (onItemCommand)="handleMenuCommand($event)"
/>
```

```ts
public readonly items: SplitButtonItem[] = [
  { label: 'Save draft', icon: 'pencil', command: (): void => this.saveDraft() },
  { label: 'Archive', icon: 'archive', command: (): void => this.archive() },
  { separator: true },
  { label: 'Delete', icon: 'trash', command: (): void => this.delete() },
];
```

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string` | `''` | Primary button text and default accessible name fallback |
| `icon` | `string \| null` | `null` | Leading or trailing primary button icon |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Primary icon placement |
| `model` | `readonly SplitButtonItem[]` | `[]` | Menu items; entries with `visible: false` are filtered out |
| `severity` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'help' \| 'danger' \| 'contrast'` | `'primary'` | Color severity token |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Uses `ThemeConfigService` variant when `null` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `disabled` | `boolean` | `false` | Disables both buttons |
| `buttonDisabled` | `boolean` | `false` | Disables only the primary action |
| `menuButtonDisabled` | `boolean` | `false` | Disables only the dropdown trigger |
| `loading` | `boolean` | `false` | Shows a loading icon and disables the primary action |
| `loadingIcon` | `string` | `'spinner'` | Icon used while loading |
| `raised` | `boolean` | `false` | Enables raised styling |
| `rounded` | `boolean` | `false` | Enables pill radius styling |
| `text` | `boolean` | `false` | Uses text-button styling |
| `outlined` | `boolean` | `false` | Uses outlined styling |
| `dropdownIcon` | `string` | `'chevron-down'` | Dropdown trigger icon when no custom slot is provided |
| `buttonAriaLabel` | `string \| null` | `null` | Explicit accessible name for the primary button |
| `menuButtonAriaLabel` | `string \| null` | `null` | Accessible name for the dropdown trigger and menu label fallback |
| `tabindex` | `number` | `0` | Applied to both trigger buttons |
| `styleClass` | `string \| null` | `null` | Additional host class names |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onClick` | `SplitButtonClickEvent` | Emitted when the primary button is activated |
| `onMenuShow` | `SplitButtonMenuShowEvent` | Emitted when the menu opens |
| `onMenuHide` | `SplitButtonMenuHideEvent` | Emitted when the menu closes |
| `onItemCommand` | `SplitButtonItemCommandEvent` | Emitted when a menu item command runs |

## Template slots

| Selector | Description |
|----------|-------------|
| `[splitButtonContent]` | Replaces the primary button content area |
| `[splitButtonDropdownIcon]` | Replaces the dropdown trigger icon |

## `SplitButtonItem` reference

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Menu item text |
| `icon` | `string` | Optional leading icon |
| `command` | `(event: SplitButtonItemCommandEvent) => void` | Invoked on activation |
| `disabled` | `boolean` | Removes item from activation paths |
| `separator` | `boolean` | Renders a separator instead of an actionable row |
| `tooltip` | `string` | Applied as native `title` |
| `url` | `string` | Opens using the current document window |
| `target` | `string` | Window target for `url` |
| `routerLink` | `string \| unknown[]` | Angular Router target when Router is present |
| `styleClass` | `string` | Consumer metadata/class slot |
| `visible` | `boolean` | Hides the item when `false` |

## ARIA attributes

| Element | Attributes |
|---------|------------|
| Primary button | Native `<button>` semantics, `aria-label` from `buttonAriaLabel`, `label`, or icon-only fallback |
| Menu trigger button | `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`, `aria-label` |
| Dropdown panel | `role="menu"`, unique `id`, `aria-label` |
| Menu item | `role="menuitem"`, `aria-disabled` when disabled |
| Separator | `role="separator"` |
| Decorative icons | `aria-hidden="true"` |

## Keyboard interaction

| Target | Key | Behavior |
|--------|-----|----------|
| Main button | `Enter`, `Space` | Activates the primary action using native button behavior |
| Menu trigger | `Enter`, `Space` | Toggle menu open/closed |
| Menu trigger | `ArrowDown` | Open menu and focus first enabled item |
| Menu trigger | `ArrowUp` | Open menu and focus last enabled item |
| Menu trigger | `Escape` | Close menu and restore focus to the trigger |
| Menu items | `Enter`, `Space` | Activate item and close menu |
| Menu items | `ArrowDown`, `ArrowUp` | Move focus to next/previous enabled item, wrapping at ends |
| Menu items | `Home`, `End` | Jump to first/last enabled item |
| Menu items | `Escape` | Close menu and restore focus to the trigger |
| Menu items | `Tab` | Close menu and continue normal tab flow |

## CSS custom properties

| Variable | Default |
|----------|---------|
| `--uilib-split-button-bg` | `var(--uilib-button-secondary-bg, var(--uilib-color-secondary-600, var(--uilib-color-neutral-600, currentColor)))` |
| `--uilib-split-button-fg` | `var(--uilib-button-secondary-fg, var(--uilib-color-neutral-50, currentColor))` |
| `--uilib-split-button-border` | `var(--uilib-button-secondary-border, var(--uilib-split-button-bg))` |
| `--uilib-split-button-bg-hover` | `var(--uilib-button-secondary-bg-hover, var(--uilib-split-button-bg))` |
| `--uilib-split-button-radius` | `var(--uilib-button-radius, var(--uilib-shape-base, 0.375rem))` |
| `--uilib-split-button-padding` | `var(--uilib-button-padding-medium, var(--uilib-space-2, 0.5rem) var(--uilib-space-4, 1rem))` |
| `--uilib-split-button-font-size` | `var(--uilib-button-font-size-medium, var(--uilib-font-size-md, 1rem))` |
| `--uilib-split-button-shadow` | `var(--uilib-button-shadow, none)` |
| `--uilib-split-button-transition` | `var(--uilib-button-transition, all var(--uilib-transition-fast, 0.2s ease))` |
| `--uilib-split-button-focus-ring` | `var(--uilib-button-focus-ring, 0 0 0 var(--uilib-border-width-2, 0.125rem) color-mix(in srgb, var(--uilib-color-primary-500, currentColor) 30%, transparent))` |
| `--uilib-split-button-divider-color` | `color-mix(in srgb, var(--uilib-split-button-bg) 75%, transparent)` |
| `--uilib-split-button-menu-bg` | `var(--uilib-select-dropdown-bg, var(--uilib-surface, transparent))` |
| `--uilib-split-button-menu-shadow` | `var(--uilib-select-dropdown-shadow, var(--uilib-shadow-md, none))` |
| `--uilib-split-button-menu-radius` | `var(--uilib-split-button-radius)` |
| `--uilib-split-button-menu-z` | `var(--uilib-z-overlay, 1000)` |
| `--uilib-split-button-menu-item-padding` | `var(--uilib-space-2, 0.5rem) var(--uilib-space-3, 0.75rem)` |
| `--uilib-split-button-menu-item-hover-bg` | `var(--uilib-select-option-hover, color-mix(in srgb, var(--uilib-color-primary-600, currentColor) 8%, transparent))` |
| `--uilib-split-button-separator-color` | `color-mix(in srgb, var(--uilib-split-button-border) 55%, transparent)` |
| `--uilib-split-button-icon-size` | `var(--uilib-icon-size-sm, 1rem)` |

## Accessibility notes

- SplitButton follows a split menu-button pattern: the primary action remains a native button while the dropdown trigger exposes menu semantics.
- The component generates unique instance and menu IDs for reliable `aria-controls` relationships.
- Focus returns to the dropdown trigger when the menu is dismissed with `Escape` or after activating an item.
- Decorative icons are hidden from assistive technology.
- Reduced-motion users receive a no-animation fallback for spinner, menu entrance, and button transitions.
- When supplying custom projected content that does not include readable text, provide `buttonAriaLabel` explicitly.

## Known limitations

- Nested submenus are intentionally deferred.
- Tooltips currently use native `title` attributes.
- The dropdown panel renders in place; portal mounting is not yet implemented.
