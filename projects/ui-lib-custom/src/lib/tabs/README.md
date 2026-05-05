# Tabs

**Selector:** `ui-lib-tabs` (container) / `ui-lib-tab` (child panel definition)
**Package:** `ui-lib-custom/tabs`
**Content projection:** yes — `<ui-lib-tab>` children are projected into `<ui-lib-tabs>`; within each tab, body content is projected directly or via `[uiLibTabContent]` / `[uiLibTabLabel]` templates

> Unlike PrimeNG `TabView` / `TabPanel`, this uses a `<ui-lib-tab>` child component (not `<p-tabPanel>`) and separates the tab trigger list from panel content. The `mode="navigation"` option suppresses panel rendering entirely for router-based navigation.

---

## `ui-lib-tabs` — Container

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; inherits from `ThemeConfigService` when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token (also accepts `'small'`, `'medium'`, `'large'`) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab list orientation |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` | Alignment of tab triggers in the list |
| `mode` | `'default' \| 'navigation'` | `'default'` | `'navigation'` disables panel rendering for router use |
| `selectedValue` | `TabsValue \| null` | `null` | Controlled selection by value |
| `selectedIndex` | `number \| null` | `null` | Controlled selection by index |
| `defaultValue` | `TabsValue \| null` | `null` | Initial selected value (uncontrolled) |
| `defaultIndex` | `number \| null` | `null` | Initial selected index (uncontrolled) |
| `lazy` | `boolean \| 'unmount' \| 'keep-alive'` | `false` | Global panel render strategy; overridable per tab |
| `scrollBehavior` | `'auto' \| 'arrows'` | `'auto'` | `'arrows'` shows scroll buttons when tab list overflows |
| `closable` | `boolean` | `false` | Adds a close button to every tab (overridable per tab) |
| `disabled` | `boolean` | `false` | Disables all tabs |
| `focusPanelOnSelect` | `boolean` | `false` | Moves focus into the active panel on selection |
| `iconPosition` | `'left' \| 'top' \| 'right'` | `'left'` | Position of icon within the tab label |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | Explicit text direction; `'auto'` reads from computed styles |

### Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `selectedChange` | `{ value: TabsValue \| null; index: number }` | Emitted on any selection change |
| `selectedIndexChange` | `number` | Emitted with the new selected index |
| `navigate` | `{ value: TabsValue \| null; index: number }` | Emitted in `mode="navigation"` only |
| `tabClose` | `{ value: TabsValue \| null; index: number }` | Emitted when a closable tab's close button is clicked |
| `tabFocus` | `{ value: TabsValue \| null; index: number }` | Emitted when a tab trigger receives focus |

---

## `ui-lib-tab` — Panel Definition

### Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `value` | `string \| number \| null` | `null` | Unique identifier; falls back to tab index when null |
| `label` | `string \| null` | `null` | Tab trigger text; use `[uiLibTabLabel]` template for custom markup |
| `disabled` | `boolean` | `false` | Disables this tab |
| `closable` | `boolean` | `false` | Shows a close button on this tab |
| `lazy` | `boolean \| 'unmount' \| 'keep-alive' \| undefined` | `undefined` | Per-tab override of the parent `lazy` setting |

Use `[uiLibTabLabel]` directive on an `<ng-template>` for custom label markup.
Use `[uiLibTabContent]` directive on an `<ng-template>` for content rendered outside the default `<ng-content>` slot.

---

## Usage

```html
<!-- Basic tabs -->
<ui-lib-tabs>
  <ui-lib-tab label="Overview">Overview content</ui-lib-tab>
  <ui-lib-tab label="Settings">Settings content</ui-lib-tab>
</ui-lib-tabs>

<!-- Controlled selection with close support -->
<ui-lib-tabs [selectedValue]="activeTab" [closable]="true" (selectedChange)="activeTab = $event.value" (tabClose)="removeTab($event)">
  <ui-lib-tab value="a" label="Tab A">Content A</ui-lib-tab>
  <ui-lib-tab value="b" label="Tab B">Content B</ui-lib-tab>
</ui-lib-tabs>
```
