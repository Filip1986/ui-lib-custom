# Tabs

## Overview
Accessible, theme-aware tabs for switching between content sections. Supports Material, Bootstrap, and Minimal visual variants with horizontal/vertical layouts, closable tabs, and lazy panel rendering.

## Features
- Multiple variants: material (underline), bootstrap (boxed), minimal (ghost/underline)
- Controlled/uncontrolled selection via index or value
- Lazy rendering modes (`false`, `unmount`, `keep-alive`)
- Orientation, alignment, icon+text labels, closable/disabled tabs
- Animated indicator (material), roving tabindex + keyboard navigation
- CSS variable theming hooked to design tokens

## Usage
```html
<ui-lib-tabs variant="material" [selectedIndex]="0">
  <ui-lib-tab label="Home">Home content</ui-lib-tab>
  <ui-lib-tab label="Profile">Profile content</ui-lib-tab>
</ui-lib-tabs>
```

Icon + template label:
```html
<ui-lib-tabs variant="material">
  <ui-lib-tab value="settings">
    <ng-template uiLibTabLabel>
      <ui-lib-icon name="settings" /> Settings
    </ng-template>
    Settings content
  </ui-lib-tab>
</ui-lib-tabs>
```

Vertical + controlled:
```html
<ui-lib-tabs orientation="vertical" [selectedIndex]="active" (selectedIndexChange)="active = $event">
  <ui-lib-tab label="Overview">Overview</ui-lib-tab>
  <ui-lib-tab label="Billing">Billing</ui-lib-tab>
</ui-lib-tabs>
```

Closable with lazy keep-alive:
```html
<ui-lib-tabs [closable]="true" lazy="keep-alive" (tabClose)="onClose($event)">
  <ui-lib-tab value="alpha" label="Alpha">Alpha content</ui-lib-tab>
  <ui-lib-tab value="beta" label="Beta">Beta content</ui-lib-tab>
</ui-lib-tabs>
```

## API Reference
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TabsVariant` | `'material'` | Visual style: material (underline), bootstrap (boxed), minimal (ghost) |
| `size` | `TabsSize` | `'medium'` | Padding/typography density |
| `orientation` | `TabsOrientation` | `'horizontal'` | Layout direction; sets `aria-orientation` and keyboard map |
| `align` | `TabsAlignment` | `'start'` | Alignment of triggers in the tab list |
| `selectedIndex` | `number \| null` | `null` | Controlled selection by index |
| `selectedValue` | `TabsValue \| null` | `null` | Controlled selection by value |
| `defaultIndex` | `number \| null` | `null` | Uncontrolled initial index |
| `defaultValue` | `TabsValue \| null` | `null` | Uncontrolled initial value |
| `lazy` | `TabsLazyMode` | `false` | Panel rendering: eager (`false`), unmount on blur (`'unmount'`), cache (`'keep-alive'`) |
| `scrollBehavior` | `TabsScrollBehavior` | `'auto'` | Overflow handling (future: arrows/menu) |
| `closable` | `boolean` | `false` | Makes tabs closable unless overridden per tab |
| `disabled` | `boolean` | `false` | Disable entire tablist |
| `focusPanelOnSelect` | `boolean` | `false` | Move focus into panel after selection |
| `iconPosition` | `'left' \| 'top' \| 'right'` | `'left'` | Icon/text layout for triggers |

Outputs:
| Name | Payload | Description |
|------|---------|-------------|
| `selectedChange` | `{ value: TabsValue \| null; index: number }` | Fired on selection change |
| `selectedIndexChange` | `number` | Index-only change (PrimeNG parity) |
| `tabClose` | `{ value: TabsValue \| null; index: number }` | Fired when a closable tab is closed |
| `tabFocus` | `{ value: TabsValue \| null; index: number }` | Fired when a tab trigger receives focus |

Per-tab inputs (`ui-lib-tab`): `value`, `label`, `disabled`, `closable`; label template slot via `uiLibTabLabel`.

## Types
```typescript
export type TabsVariant = 'material' | 'bootstrap' | 'minimal';
export type TabsSize = 'small' | 'medium' | 'large';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsAlignment = 'start' | 'center' | 'end' | 'stretch';
export type TabsLazyMode = false | 'unmount' | 'keep-alive';
export type TabsScrollBehavior = 'auto' | 'arrows' | 'overflow-menu';
export type TabsValue = string | number;
```

## Accessibility
- `role="tablist"` on container; `role="tab"` on triggers; `role="tabpanel"` on panels
- `aria-selected`, `aria-controls`, `aria-labelledby` kept in sync; only active tab has `tabindex="0"`
- Keyboard: Left/Right (or Up/Down when vertical) to navigate; Home/End jump ends; Enter/Space activate
- Disabled tabs set `aria-disabled="true"` and are skipped by roving focus
- Indicator/focus states use theme tokens; icon-only tabs should set `aria-label`

## Variants
- **material**: underline indicator with animation; hover background subtle; transparent base
- **bootstrap**: boxed/bordered triggers; active tab merges with panel surface
- **minimal**: text-first, low chrome; subtle underline/hover

## Notes
- Lazy `keep-alive` caches rendered panels; `unmount` removes inactive panels
- Controlled mode prefers `selectedValue` for dynamic tab lists; `selectedIndex` kept for PrimeNG parity
- Use CSS vars (`--uilib-tabs-*`, `--uilib-tab-*`) to theme without rebuild
