# Split Button

**Selector:** `ui-lib-split-button`
**Entry point:** `import { SplitButton } from 'ui-lib-custom/split-button'`

---

## Overview

SplitButton scaffold component with primary action and dropdown trigger controls.

## API

### Inputs

| Name                  | Type                         | Default          | Description |
| --------------------- | ---------------------------- | ---------------- | ----------- |
| `buttonAriaLabel`     | `string | null`              | `null`           | —           |
| `buttonDisabled`      | `boolean`                    | `false`          | —           |
| `disabled`            | `boolean`                    | `false`          | —           |
| `dropdownIcon`        | `string`                     | `'chevron-down'` | —           |
| `icon`                | `string | null`              | `null`           | —           |
| `iconPosition`        | `'left' | 'right'`           | `'left'`         | —           |
| `label`               | `string`                     | `''`             | —           |
| `loading`             | `boolean`                    | `false`          | —           |
| `loadingIcon`         | `string`                     | `'spinner'`      | —           |
| `menuButtonAriaLabel` | `string | null`              | `null`           | —           |
| `menuButtonDisabled`  | `boolean`                    | `false`          | —           |
| `model`               | `readonly SplitButtonItem[]` | `[]`             | —           |
| `outlined`            | `boolean`                    | `false`          | —           |
| `raised`              | `boolean`                    | `false`          | —           |
| `rounded`             | `boolean`                    | `false`          | —           |
| `severity`            | `SplitButtonSeverity`        | `'primary'`      | —           |
| `size`                | `SplitButtonSize`            | `'md'`           | —           |
| `styleClass`          | `string | null`              | `null`           | —           |
| `tabindex`            | `number`                     | `0`              | —           |
| `text`                | `boolean`                    | `false`          | —           |
| `variant`             | `SplitButtonVariant | null`  | `null`           | —           |

### Outputs

| Name          | Type                          | Description                                                                                                                                            |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `buttonClick` | `SplitButtonClickEvent`       | Emits when the primary action button is clicked. Named `buttonClick` to avoid shadowing the native DOM `click` event that bubbles from inner elements. |
| `itemCommand` | `SplitButtonItemCommandEvent` | —                                                                                                                                                      |
| `menuHide`    | `SplitButtonMenuHideEvent`    | —                                                                                                                                                      |
| `menuShow`    | `SplitButtonMenuShowEvent`    | —                                                                                                                                                      |

## Content Projection

_none_

## Theming

| CSS Variable                                      | Default                                                                                                                                                           |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--uilib-split-button-bg`                         | `var( --uilib-button-secondary-bg, var(--uilib-color-secondary-600, var(--uilib-color-neutral-600, currentColor)) )`                                              |
| `--uilib-split-button-bg-hover`                   | `var( --uilib-button-secondary-bg-hover, var(--uilib-split-button-bg) )`                                                                                          |
| `--uilib-split-button-border`                     | `var(--uilib-button-secondary-border, var(--uilib-split-button-bg))`                                                                                              |
| `--uilib-split-button-disabled-opacity`           | `var(--uilib-button-disabled-opacity, 0.5)`                                                                                                                       |
| `--uilib-split-button-divider-color`              | `color-mix( in srgb, var(--uilib-split-button-bg) 75%, transparent )`                                                                                             |
| `--uilib-split-button-emphasis`                   | `var(--uilib-split-button-border)`                                                                                                                                |
| `--uilib-split-button-fg`                         | `var( --uilib-button-secondary-fg, var(--uilib-color-neutral-50, currentColor) )`                                                                                 |
| `--uilib-split-button-fg-hover`                   | `var(--uilib-split-button-fg)`                                                                                                                                    |
| `--uilib-split-button-focus-ring`                 | `var( --uilib-button-focus-ring, 0 0 0 var(--uilib-border-width-2, 0.125rem) color-mix(in srgb, var(--uilib-color-primary-500, currentColor) 30%, transparent) )` |
| `--uilib-split-button-font-size`                  | `var( --uilib-button-font-size-medium, var(--uilib-font-size-md, 1rem) )`                                                                                         |
| `--uilib-split-button-icon-size`                  | `var(--uilib-icon-size-sm, 1rem)`                                                                                                                                 |
| `--uilib-split-button-menu-bg`                    | `var( --uilib-select-dropdown-bg, var(--uilib-surface, transparent) )`                                                                                            |
| `--uilib-split-button-menu-item-disabled-opacity` | `0.55`                                                                                                                                                            |
| `--uilib-split-button-menu-item-hover-bg`         | `var( --uilib-select-option-hover, color-mix(in srgb, var(--uilib-color-primary-600, currentColor) 8%, transparent) )`                                            |
| `--uilib-split-button-menu-item-padding`          | `var(--uilib-space-2, 0.5rem) var(--uilib-space-3, 0.75rem)`                                                                                                      |
| `--uilib-split-button-menu-radius`                | `var(--uilib-split-button-radius)`                                                                                                                                |
| `--uilib-split-button-menu-shadow`                | `var( --uilib-select-dropdown-shadow, var(--uilib-shadow-md, none) )`                                                                                             |
| `--uilib-split-button-menu-z`                     | `var(--uilib-z-overlay, 1000)`                                                                                                                                    |
| `--uilib-split-button-padding`                    | `var( --uilib-button-padding-medium, var(--uilib-space-2, 0.5rem) var(--uilib-space-4, 1rem) )`                                                                   |
| `--uilib-split-button-radius`                     | `var(--uilib-button-radius, var(--uilib-shape-base, 0.375rem))`                                                                                                   |
| `--uilib-split-button-separator-color`            | `color-mix( in srgb, var(--uilib-split-button-border) 55%, transparent )`                                                                                         |
| `--uilib-split-button-shadow`                     | `var(--uilib-button-shadow, none)`                                                                                                                                |
| `--uilib-split-button-transition`                 | `var( --uilib-button-transition, all var(--uilib-transition-fast, 0.2s ease) )`                                                                                   |

## Accessibility

**APG pattern:** <!-- TODO: add WAI-ARIA APG pattern URL or "decorative" -->

### Keyboard Interactions

| Test description                                                                                 |
| ------------------------------------------------------------------------------------------------ |
| ArrowDown and ArrowUp support roving focus with wrap                                             |
| ArrowDown opens and focuses first non-disabled item                                              |
| ArrowDown skips disabled items and separators                                                    |
| ArrowUp on the menu button opens the menu and focuses the last enabled item                      |
| ArrowUp opens and focuses last non-disabled item                                                 |
| ArrowUp wraps from the first enabled item to the last enabled item                               |
| End focuses the last enabled menu item                                                           |
| Enter activates a menu item command and closes the menu                                          |
| Enter and Space activate item and close menu                                                     |
| Enter and Space toggle menu                                                                      |
| Enter on the menu button opens the menu and focuses the first enabled item                       |
| Escape closes menu                                                                               |
| Escape closes menu and returns focus to menu button                                              |
| Escape on a menu item closes the menu and restores focus to the menu button                      |
| Home focuses the first enabled menu item                                                         |
| Tab closes menu without preventDefault                                                           |
| applies variant classes                                                                          |
| disabled item has aria-disabled and does not fire command                                        |
| document Escape closes and returns focus to menu button                                          |
| document Escape closes the menu and restores focus to the menu button                            |
| focusItem returns early when item is focusable but not currently rendered in DOM                 |
| handles document keydown non-escape and escape-while-closed guard branches                       |
| handles focusItem guard branches for non-focusable and missing DOM item                          |
| handles main button keydown Enter/Space no-op paths                                              |
| handles menu button keydown Escape when menu is already closed                                   |
| handles menu button keydown branches for open-state arrows, default key, and escape while closed |
| handles separator and unknown keyboard branch in onItem handlers                                 |
| has no detectable violations for the bootstrap variant                                           |
| has no detectable violations for the minimal variant                                             |
| has no detectable violations in the default closed state                                         |
| has no detectable violations with the menu open                                                  |
| main button uses buttonAriaLabel when provided                                                   |
| menu button exposes aria-haspopup, aria-expanded, and aria-controls                              |
| menu items and separators expose the expected roles and disabled state                           |
| menu list/items/separators expose expected roles                                                 |
| menu panel uses role menu and inherits the trigger label                                         |
| openMenu with focusTarget none opens without focusing items                                      |
| resets focusedItemIndex for invalid focus target                                                 |
| returns -1 for focus helpers when no focusable items exist                                       |
| returns -1 from getNextFocusableIndex after full scan when no candidates are focusable           |
| returns -1 from getNextFocusableIndex when menu has zero items                                   |

## Usage Examples

```html
<ui-lib-split-button
  label="Save"
  icon="save"
  [model]="items"
  (buttonClick)="savePrimary()"
  (itemCommand)="handleMenuCommand($event)"
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

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#split-button)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/split-button/README.md)

