# SpeedDial

Floating action menu that expands a primary trigger into contextual action items using linear and radial layouts.

---

## Overview

`SpeedDial` is useful when you want to keep secondary actions available without permanently occupying UI space. It supports linear, circle, semi-circle, and quarter-circle layouts, keyboard navigation, optional masking, and template slots for custom trigger/icon/item rendering.

---

## Import

```ts
import { SpeedDial, SpeedDialItem } from 'ui-lib-custom/speed-dial';
```

> Note: In current source exports, the component class is `SpeedDialComponent`.

---

## Basic Usage

```html
<ui-lib-speed-dial [model]="items" />
```

```ts
public readonly items: SpeedDialItem[] = [
  { label: 'Add', icon: 'plus', command: ({ item }): void => console.log(item.label) },
  { label: 'Update', icon: 'pencil' },
  { label: 'Delete', icon: 'trash' },
];
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|---|---|---:|---|
| `model` | `readonly SpeedDialItem[]` | `[]` | Action list rendered in the menu. Items with `visible: false` are filtered out. |
| `type` | `'linear' \| 'circle' \| 'semi-circle' \| 'quarter-circle'` | `'linear'` | Layout mode for action positioning. |
| `direction` | `SpeedDialDirection` | `'up'` | Direction strategy used by linear/semi/quarter layouts. |
| `radius` | `number` | `0` | Radius used by radial layouts (`circle`, `semi-circle`, `quarter-circle`). |
| `transitionDelay` | `number` | `30` | Per-item transition staggering in milliseconds. |
| `mask` | `boolean` | `false` | Renders backdrop mask while open. |
| `disabled` | `boolean` | `false` | Disables trigger and blocks open/interaction handlers. |
| `hideOnClickOutside` | `boolean` | `true` | Closes menu when clicking outside host. |
| `rotateAnimation` | `boolean` | `true` | Rotates trigger icon when open (only when `hideIcon` is not set). |
| `showIcon` | `string` | `'plus'` | Default trigger icon when closed. |
| `hideIcon` | `string \| null` | `null` | Optional trigger icon when open. |
| `buttonAriaLabel` | `string \| null` | `null` | Preferred trigger `aria-label`; falls back to `ariaLabel`. |
| `ariaLabel` | `string \| null` | `null` | Trigger `aria-label` fallback. |
| `ariaLabelledBy` | `string \| null` | `null` | Trigger `aria-labelledby`. |
| `tabindex` | `number` | `0` | Trigger tab order. |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Explicit visual variant; `null` resolves from theme service. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger/item size scale. |
| `styleClass` | `string \| null` | `null` | Additional host class string. |

### Model

| Model | Type | Default | Description |
|---|---|---:|---|
| `visible` | `boolean` | `false` | Two-way open state via `[(visible)]`. |

### Outputs

| Output | Payload | Description |
|---|---|---|
| `onClick` | `SpeedDialClickEvent` | Fires on trigger click toggle with next visible state. |
| `onVisibleChange` | `SpeedDialVisibleChangeEvent` | Fires whenever visibility changes through component APIs. |
| `onShow` | `SpeedDialShowEvent` | Fires after opening. |
| `onHide` | `SpeedDialHideEvent` | Fires after closing. |
| `onItemCommand` | `SpeedDialItemCommandEvent` | Fires when an enabled item action executes. |
| `onFocus` | `FocusEvent` | Declared output (reserved in v1; no internal emit path yet). |
| `onBlur` | `FocusEvent` | Declared output (reserved in v1; no internal emit path yet). |

### Template Slots

| Selector | Context | Description |
|---|---|---|
| `[speedDialButton]` | `$implicit: boolean` (`visible`) | Full custom trigger content. |
| `[speedDialIcon]` | `$implicit: boolean` (`visible`) | Custom trigger icon content (used when button template is not provided). |
| `[speedDialItem]` | `$implicit: SpeedDialItem`, `index: number` | Custom per-item action content. |

### Types

| Type | Values |
|---|---|
| `SpeedDialType` | `'linear' \| 'circle' \| 'semi-circle' \| 'quarter-circle'` |
| `SpeedDialDirection` | `'up' \| 'down' \| 'left' \| 'right' \| 'up-left' \| 'up-right' \| 'down-left' \| 'down-right'` |
| `SpeedDialVariant` | `'material' \| 'bootstrap' \| 'minimal'` |
| `SpeedDialSize` | `'sm' \| 'md' \| 'lg'` |

---

## `SpeedDialItem` Reference

| Field | Type | Description |
|---|---|---|
| `label` | `string` | Accessible/action label text. |
| `icon` | `SemanticIcon \| string` | Item icon name. |
| `command` | `(event: SpeedDialItemCommandEvent) => void` | Handler invoked on item activation. |
| `disabled` | `boolean` | Marks item non-interactive. |
| `tooltip` | `string` | Current tooltip fallback via native `title` attribute. |
| `url` | `string` | Reserved custom field (not used in v1 template behavior). |
| `target` | `string` | Reserved custom field (not used in v1 template behavior). |
| `routerLink` | `string \| unknown[]` | Reserved custom field (not used in v1 template behavior). |
| `styleClass` | `string` | Reserved custom field for consumer metadata/templates. |
| `visible` | `boolean` | When `false`, item is filtered from rendered actions. |

---

## Layout Types

| Type | Direction Support | Behavior |
|---|---|---|
| `linear` | `up`, `down`, `left`, `right` | Items are arranged in a single row/column from the trigger. |
| `circle` | Direction ignored | Items are distributed around a full 360deg radius. |
| `semi-circle` | `up`, `down`, `left`, `right` | Items are distributed across a 180deg arc. |
| `quarter-circle` | `up-left`, `up-right`, `down-left`, `down-right` | Items are distributed across a 90deg arc. |

Conceptual diagrams:

```text
Linear (up):       Circle:            Quarter (up-right):
   o                  o o                    o o
   o                o  +  o                  +
   +                  o o
```

---

## Variant and Size Notes

- Variants: `material`, `bootstrap`, `minimal`
- Sizes: `sm`, `md`, `lg`
- If `variant` is `null`, variant resolves from `ThemeConfigService`.
- `size` simultaneously scales trigger button and action buttons.

---

## CSS Variables

| Variable | Default |
|---|---:|
| `--uilib-speed-dial-button-size` | `var(--uilib-speed-dial-size-button-md, 3.25rem)` |
| `--uilib-speed-dial-button-bg` | `var(--uilib-color-primary-600, #1e88e5)` |
| `--uilib-speed-dial-button-color` | `var(--uilib-color-neutral-50, #fafafa)` |
| `--uilib-speed-dial-button-shadow` | `var(--uilib-shadow-lg, none)` |
| `--uilib-speed-dial-item-size` | `var(--uilib-speed-dial-size-item-md, 2.75rem)` |
| `--uilib-speed-dial-item-bg` | `var(--uilib-color-primary-600, #1e88e5)` |
| `--uilib-speed-dial-item-color` | `var(--uilib-color-neutral-50, #fafafa)` |
| `--uilib-speed-dial-item-shadow` | `var(--uilib-shadow-md, none)` |
| `--uilib-speed-dial-gap` | `var(--uilib-space-2, 0.5rem)` |
| `--uilib-speed-dial-radius` | `var(--uilib-radius-full, 9999px)` |
| `--uilib-speed-dial-mask-bg` | `color-mix(in srgb, var(--uilib-overlay-backdrop-bg, var(--uilib-color-neutral-900, #212121)) 50%, transparent)` |
| `--uilib-speed-dial-mask-z` | `var(--uilib-z-backdrop, 1040)` |
| `--uilib-speed-dial-list-z` | `var(--uilib-z-overlay, 1060)` |
| `--uilib-speed-dial-transition-duration` | `var(--uilib-transition-md, 200ms)` |
| `--uilib-speed-dial-transition-easing` | `var(--uilib-transition-ease-out, ease-out)` |
| `--uilib-speed-dial-rotate-open` | `45deg` |
| `--uilib-speed-dial-focus-ring` | `0 0 0 var(--uilib-border-width-2, 2px) color-mix(in srgb, var(--uilib-color-primary-500, #2196f3) 30%, transparent)` |

Size overrides by host class:
- `--uilib-speed-dial--sm`: uses `--uilib-speed-dial-size-button-sm`, `--uilib-speed-dial-size-item-sm`
- `--uilib-speed-dial--md`: uses `--uilib-speed-dial-size-button-md`, `--uilib-speed-dial-size-item-md`
- `--uilib-speed-dial--lg`: uses `--uilib-speed-dial-size-button-lg`, `--uilib-speed-dial-size-item-lg`

---

## Keyboard Interaction

| Target | Key | Behavior |
|---|---|---|
| Trigger | `Enter`, `Space` | Toggle open/close |
| Trigger | `Escape` | Close when open |
| Trigger | Arrow keys | Open (direction-permitting) and focus first item; when open, move focus |
| Trigger | `Tab` | Close and allow default tab flow |
| Item | `Enter`, `Space` | Execute item command and close |
| Item | `Escape` | Close and return focus to trigger |
| Item | Arrow keys | Move focus in current direction axis |
| Item | `Home` / `End` | Focus first / last enabled item |
| Item | `Tab` | Close and allow default tab flow |

---

## Accessibility

- Trigger:
  - `aria-haspopup="true"`
  - `aria-expanded` reflects open state
  - `aria-controls` points to generated list id
- Action list: `role="menu"`
- Action items: `role="menuitem"`; disabled items expose `aria-disabled="true"`
- Focus return:
  - Escape from item returns focus to trigger
  - If menu closes while focus is inside list, trigger regains focus
- Live-region policy:
  - Component itself does not create an internal `aria-live` region
  - Consumers should provide announcements (example demo uses a polite live region for action feedback)

---

## Known Limitations (v1)

- Tooltip integration currently falls back to native `title`; migrate to `ui-lib-tooltip` when available.
- RTL-specific direction mirroring is deferred; direction values are currently interpreted in LTR geometry logic.


