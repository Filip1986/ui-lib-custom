# SplitButton

**Selector:** `ui-lib-split-button`
**Package:** `ui-lib-custom/split-button`
**Content projection:** yes — `SplitButtonContentDirective` replaces the primary button label; `SplitButtonDropdownIconDirective` replaces the dropdown chevron icon

> The dropdown menu items are passed via the `model` input (a `readonly SplitButtonItem[]` array), not via content projection. The output names follow the PrimeNG convention (`onClick`, `onMenuShow`, etc.) and include the `on` prefix — the ESLint rule is suppressed intentionally.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `label` | `string` | `''` | Primary button label text |
| `icon` | `string \| null` | `null` | Icon name for the primary button |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon relative to the label |
| `model` | `readonly SplitButtonItem[]` | `[]` | Dropdown menu items |
| `severity` | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'help' \| 'danger' \| 'contrast'` | `'primary'` | Color palette |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Falls back to `ThemeConfigService` global variant when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size token |
| `disabled` | `boolean` | `false` | Disables both the primary button and the dropdown trigger |
| `buttonDisabled` | `boolean` | `false` | Disables only the primary button |
| `menuButtonDisabled` | `boolean` | `false` | Disables only the dropdown trigger |
| `loading` | `boolean` | `false` | Shows a loading spinner and disables the primary button |
| `loadingIcon` | `string` | `'spinner'` | Icon name used while loading |
| `raised` | `boolean` | `false` | Adds a box-shadow to the button group |
| `rounded` | `boolean` | `false` | Applies fully rounded corners |
| `text` | `boolean` | `false` | Text-only (ghost) style |
| `outlined` | `boolean` | `false` | Outlined (border-only) style |
| `dropdownIcon` | `string` | `'chevron-down'` | Icon name for the dropdown trigger |
| `buttonAriaLabel` | `string \| null` | `null` | Accessible label for the primary button |
| `menuButtonAriaLabel` | `string \| null` | `null` | Accessible label for the dropdown trigger |
| `tabindex` | `number` | `0` | Tab index for both buttons |
| `styleClass` | `string \| null` | `null` | Additional CSS class(es) on the host element |

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `onClick` | `SplitButtonClickEvent` | Emitted when the primary button is clicked |
| `onMenuShow` | `SplitButtonMenuShowEvent` | Emitted when the dropdown menu opens |
| `onMenuHide` | `SplitButtonMenuHideEvent` | Emitted when the dropdown menu closes |
| `onItemCommand` | `SplitButtonItemCommandEvent` | Emitted when a menu item is activated |

## Usage

```html
<!-- basic split button -->
<ui-lib-split-button
  label="Save"
  [model]="menuItems"
  (onClick)="save($event)"
/>
```

```ts
menuItems: SplitButtonItem[] = [
  { label: 'Save as draft', command: () => this.saveDraft() },
  { separator: true },
  { label: 'Discard', icon: 'trash', command: () => this.discard() },
];
```
