# CascadeSelect API

## Overview

`ui-lib-cascade-select` is a hierarchical dropdown for category -> subcategory -> leaf selection. It is designed for deep option trees where only leaf nodes are valid values.

### Features

- Single-value selection with `ControlValueAccessor` (`ngModel` and reactive forms)
- Hierarchical traversal using `optionGroupChildren` depth keys
- Keyboard support for tree navigation (`Arrow*`, `Enter`, `Space`, `Home`, `End`, `Escape`, `Tab`)
- Slot directives for option/value/icons/header/footer/loading customization
- Variant, size, fluid, filled, disabled, invalid, and loading states
- CSS variable driven theming via `--uilib-cascade-select-*`

## Import

```typescript
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';
```

## Inputs

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `unknown[]` | `[]` | Root level hierarchical options. |
| `optionLabel` | `string` | `'label'` | Leaf option display label key. |
| `optionValue` | `string \| undefined` | `undefined` | Leaf model value key. Falls back to full object when omitted. |
| `optionGroupLabel` | `string` | `'label'` | Group option display label key. |
| `optionGroupChildren` | `string[]` | `[]` | Ordered child key names by depth (`['states', 'cities']`). |
| `optionDisabled` | `string \| undefined` | `undefined` | Option disabled-state key. |
| `placeholder` | `string` | `''` | Trigger text when no selection exists. |
| `variant` | `CascadeSelectVariant \| undefined` | `undefined` | Visual variant. Falls back to `ThemeConfigService.variant()`. |
| `size` | `CascadeSelectSize` | `'md'` | Size scale (`sm`, `md`, `lg`). |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `invalid` | `boolean` | `false` | Invalid state styling + ARIA. |
| `loading` | `boolean` | `false` | Shows loading state and blocks interaction. |
| `showClear` | `boolean` | `false` | Shows clear button when value exists. |
| `fluid` | `boolean` | `false` | Makes host/trigger full width. |
| `filled` | `boolean` | `false` | Enables filled style treatment. |
| `tabindex` | `number` | `0` | Host tabindex when interactive. |
| `inputId` | `string` | `''` | Optional trigger id override. |
| `ariaLabel` | `string \| null` | `null` | Explicit ARIA label. |
| `ariaLabelledBy` | `string \| null` | `null` | `aria-labelledby` id reference(s). |

## Outputs

| Name | Payload | Description |
| --- | --- | --- |
| `onChange` | `CascadeSelectChangeEvent` | Emitted when a leaf is selected. |
| `onGroupChange` | `CascadeSelectGroupChangeEvent` | Emitted when navigation expands/focuses into a group level. |
| `onShow` | `CascadeSelectShowEvent` | Emitted when panel opens. |
| `onHide` | `CascadeSelectHideEvent` | Emitted when panel closes. |
| `onClear` | `void` | Emitted after clear action. |
| `onFocus` | `FocusEvent` | Emitted on host focus. |
| `onBlur` | `FocusEvent` | Emitted on host blur. |

## Template Slot Directives

| Slot Directive | Implicit Context | Description |
| --- | --- | --- |
| `uiCascadeSelectOption` | `option` | Custom row rendering for each option node. |
| `uiCascadeSelectValue` | `selectedOption` | Custom trigger value rendering. |
| `uiCascadeSelectDropdownIcon` | - | Custom dropdown trigger icon. |
| `uiCascadeSelectOptionGroupIcon` | `option` | Custom group/submenu indicator icon. |
| `uiCascadeSelectHeader` | - | Panel header content. |
| `uiCascadeSelectFooter` | - | Panel footer content. |
| `uiCascadeSelectLoading` | - | Loading content while `loading=true`. |

## Types

```typescript
export type CascadeSelectVariant = 'material' | 'bootstrap' | 'minimal';
export type CascadeSelectSize = 'sm' | 'md' | 'lg';

export interface CascadeSelectChangeEvent {
  originalEvent: Event;
  value: unknown;
}

export interface CascadeSelectShowEvent {
  originalEvent: Event;
}

export interface CascadeSelectHideEvent {
  originalEvent: Event;
}

export interface CascadeSelectGroupChangeEvent {
  originalEvent: Event;
  level: number;
  value: unknown;
}
```

## Basic Usage

```html
<ui-lib-cascade-select
  [(ngModel)]="cityCode"
  [options]="countries"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  optionLabel="cname"
  optionValue="code"
  placeholder="Select city"
/>
```

## Hierarchical Data Example

```typescript
countries = [
  {
    name: 'Australia',
    states: [
      {
        name: 'New South Wales',
        cities: [
          { cname: 'Sydney', code: 'SYD' },
          { cname: 'Newcastle', code: 'NEW' },
        ],
      },
    ],
  },
  {
    name: 'Canada',
    states: [
      {
        name: 'Ontario',
        cities: [
          { cname: 'Toronto', code: 'TOR' },
          { cname: 'Ottawa', code: 'OTT' },
        ],
      },
    ],
  },
];
```

## Template Customization Example

```html
<ui-lib-cascade-select
  [(ngModel)]="cityCode"
  [options]="countries"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  optionLabel="cname"
  optionValue="code"
>
  <ng-template uiCascadeSelectHeader>
    <strong>Location Picker</strong>
  </ng-template>

  <ng-template uiCascadeSelectOption let-option>
    <span>{{ option.name ?? option.cname }}</span>
  </ng-template>

  <ng-template uiCascadeSelectValue let-selected>
    <span>{{ selected?.cname ?? selected?.name }}</span>
  </ng-template>

  <ng-template uiCascadeSelectOptionGroupIcon>
    <span>></span>
  </ng-template>
</ui-lib-cascade-select>
```

## Form Integration

### Template-driven

```html
<ui-lib-cascade-select
  name="city"
  [(ngModel)]="model.city"
  [options]="countries"
  optionGroupLabel="name"
  [optionGroupChildren]="['states', 'cities']"
  optionLabel="cname"
  optionValue="code"
  [invalid]="cityCtrl.invalid && cityCtrl.touched"
  #cityCtrl="ngModel"
/>
```

### Reactive Forms

```html
<form [formGroup]="form">
  <ui-lib-cascade-select
    formControlName="city"
    [options]="countries"
    optionGroupLabel="name"
    [optionGroupChildren]="['states', 'cities']"
    optionLabel="cname"
    optionValue="code"
    [invalid]="form.controls.city.invalid && form.controls.city.touched"
  />
</form>
```

## CSS Variables

| Variable | Default |
| --- | --- |
| `--uilib-cascade-select-bg` | `var(--uilib-input-bg, var(--uilib-surface))` |
| `--uilib-cascade-select-border` | `var(--uilib-input-border, var(--uilib-border))` |
| `--uilib-cascade-select-border-focus` | `var(--uilib-input-border-focus, var(--uilib-color-primary-600))` |
| `--uilib-cascade-select-radius` | `var(--uilib-input-radius, var(--uilib-shape-base, 0.375rem))` |
| `--uilib-cascade-select-text` | `var(--uilib-input-text, var(--uilib-page-fg))` |
| `--uilib-cascade-select-placeholder` | `var(--uilib-input-placeholder, var(--uilib-muted))` |
| `--uilib-cascade-select-padding-y-base` | `0.5rem` |
| `--uilib-cascade-select-padding-x-base` | `0.75rem` |
| `--uilib-cascade-select-padding-y` | `calc(var(--uilib-cascade-select-padding-y-base) * var(--uilib-density, 1))` |
| `--uilib-cascade-select-padding-x` | `calc(var(--uilib-cascade-select-padding-x-base) * var(--uilib-density, 1))` |
| `--uilib-cascade-select-min-height` | `var(--uilib-input-min-height, 2.75rem)` |
| `--uilib-cascade-select-panel-bg` | `var(--uilib-select-dropdown-bg, var(--uilib-surface))` |
| `--uilib-cascade-select-panel-border` | `var(--uilib-cascade-select-border)` |
| `--uilib-cascade-select-panel-shadow` | `var(--uilib-select-dropdown-shadow, var(--uilib-shadow-md, none))` |
| `--uilib-cascade-select-panel-min-width` | `12.5rem` |
| `--uilib-cascade-select-panel-max-height` | `16.25rem` |
| `--uilib-cascade-select-option-padding` | `0.55rem 0.75rem` |
| `--uilib-cascade-select-option-hover-bg` | `var(--uilib-select-option-hover, color-mix(in srgb, var(--uilib-color-primary-600) 8%, transparent))` |
| `--uilib-cascade-select-option-selected-bg` | `color-mix(in srgb, var(--uilib-color-primary-600) 14%, transparent)` |
| `--uilib-cascade-select-option-disabled-opacity` | `0.55` |
| `--uilib-cascade-select-submenu-icon-size` | `0.75rem` |
| `--uilib-cascade-select-submenu-gap` | `0` |
| `--uilib-cascade-select-transition` | `border-color 0.15s ease, box-shadow 0.15s ease` |
| `--uilib-cascade-select-loading-size` | `1rem` |

## Theming Override Example

```scss
[data-theme='brand-x'] {
  --uilib-cascade-select-bg: #0f172a;
  --uilib-cascade-select-border: #334155;
  --uilib-cascade-select-panel-bg: #111827;
  --uilib-cascade-select-option-hover-bg: color-mix(in srgb, #60a5fa 18%, transparent);
}
```

## Accessibility

### Keyboard Interaction

| Key | Closed State | Open State |
| --- | --- | --- |
| `Enter` / `Space` | Open panel | Select focused leaf or expand focused group |
| `ArrowDown` | Open panel | Move to next option in current level |
| `ArrowUp` | Open panel | Move to previous option in current level |
| `ArrowRight` | - | Expand focused group into next level |
| `ArrowLeft` | - | Move focus back to parent level |
| `Home` | - | Move to first option in current level |
| `End` | - | Move to last option in current level |
| `Escape` | - | Close panel |
| `Tab` | Move focus out | Close panel and move focus out |

### ARIA Attributes

| Attribute | Usage |
| --- | --- |
| `role="combobox"` | Applied to host trigger wrapper. |
| `aria-expanded` | Reflects panel open state. |
| `aria-haspopup="tree"` | Announces tree popup semantics. |
| `aria-controls` | Points to the popup tree id when open. |
| `aria-activedescendant` | Points to the current active treeitem id. |
| `aria-invalid` | Mirrors invalid state. |
| `aria-disabled` | Mirrors disabled/loading state. |
| `role="tree"` | Applied to popup panel container. |
| `role="treeitem"` | Applied to each option node. |
| `role="group"` | Applied to non-root list levels. |
| `aria-level` | Tree depth (`1..n`). |
| `aria-setsize` / `aria-posinset` | Sibling count and position metadata. |
| `aria-selected` | Selected leaf state. |
| `aria-expanded` (treeitem) | Applied to group nodes only. |

