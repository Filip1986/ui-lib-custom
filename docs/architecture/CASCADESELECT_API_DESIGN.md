# CascadeSelect API Design (Phase 2.1)

> Status: Design phase document.

## Goal

Define the full public API and internal architecture contract for `ui-lib-cascadeselect` before implementation.

This design follows:

- `AI_AGENT_CONTEXT.md`
- `LIBRARY_CONVENTIONS.md` (Active Conventions)
- `docs/architecture/CASCADESELECT_RESEARCH.md`
- `projects/ui-lib-custom/src/lib/select/select.ts`
- `projects/ui-lib-custom/src/lib/select/select.types.ts`
- `projects/ui-lib-custom/src/lib/autocomplete/autocomplete.types.ts`
- `projects/ui-lib-custom/src/lib/core/shared/constants.ts`

## Selector and Host-First Architecture

- **Selector:** `ui-lib-cascadeselect`
- **Host is the trigger container:** trigger styling, ARIA combobox attributes, and state classes are host-driven.
- **Panel rendering:** popup panel defaults to `appendTo='body'` overlay mounting with fixed positioning anchored to trigger bounds; `appendTo='self'` keeps host mounting.
- **Host attributes/classes (design contract):**
  - `role="combobox"`
  - `aria-haspopup="tree"`
  - `aria-expanded` reflects panel visibility
  - `aria-controls` points to tree panel id when visible
  - `aria-activedescendant` points to the active treeitem id when open
  - variant/size/disabled/invalid/loading/fluid/filled classes are host-bound

## Public Type Definitions (`cascade-select.types.ts`)

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

## Public Inputs and Outputs

### Inputs (signals)

All inputs use `input()` from `@angular/core` with explicit `InputSignal<T>` annotations.

| Name | Type | Default | Purpose |
|---|---|---|---|
| `options` | `InputSignal<unknown[]>` | `[]` | Hierarchical data source. Root-level options are the first column in the panel. |
| `optionLabel` | `InputSignal<string>` | `'label'` | Leaf display label property key. |
| `optionValue` | `InputSignal<string \| undefined>` | `undefined` | Leaf model-value key; when undefined, selected leaf object is used as value. |
| `optionGroupLabel` | `InputSignal<string>` | `'label'` | Group/category display label property key. |
| `optionGroupChildren` | `InputSignal<string[]>` | `[]` | Ordered child-key names by depth (for example `['states', 'cities']`). |
| `optionDisabled` | `InputSignal<string \| undefined>` | `undefined` | Optional property key that marks option/group as disabled. |
| `placeholder` | `InputSignal<string>` | `''` | Trigger placeholder when no leaf is selected. |
| `variant` | `InputSignal<CascadeSelectVariant \| undefined>` | `undefined` | Optional visual variant; falls back to `ThemeConfigService.variant()`. |
| `size` | `InputSignal<CascadeSelectSize>` | `'md'` | Component size token (`sm`/`md`/`lg`). |
| `disabled` | `InputSignal<boolean>` | `false` | Component-level disabled state (merged with CVA disabled). |
| `invalid` | `InputSignal<boolean>` | `false` | Invalid visual/ARIA state for forms integration. |
| `loading` | `InputSignal<boolean>` | `false` | Loading state; blocks interaction and allows loading slot rendering. |
| `showClear` | `InputSignal<boolean>` | `false` | Enables clear control when a value exists. |
| `fluid` | `InputSignal<boolean>` | `false` | Expands component width to available container width. |
| `filled` | `InputSignal<boolean>` | `false` | Enables filled style treatment. |
| `tabindex` | `InputSignal<number>` | `0` | Host focus order index when interactive. |
| `inputId` | `InputSignal<string>` | `''` | Optional id override for trigger control id generation. |
| `appendTo` | `InputSignal<string \| HTMLElement \| undefined>` | `'body'` | Panel mount target (`'body'`, `'self'`, CSS selector, or `HTMLElement`). |
| `ariaLabel` | `InputSignal<string \| null>` | `null` | Explicit aria-label for trigger. |
| `ariaLabelledBy` | `InputSignal<string \| null>` | `null` | External label id linkage override. |

### Outputs

All outputs use `output()` from `@angular/core` with explicit `OutputEmitterRef<T>` annotations.

| Name | Type | Emitted when |
|---|---|---|
| `onChange` | `OutputEmitterRef<CascadeSelectChangeEvent>` | Selected leaf value changes (user interaction or clear action). |
| `onGroupChange` | `OutputEmitterRef<CascadeSelectGroupChangeEvent>` | Active expanded group path changes at a specific level. |
| `onShow` | `OutputEmitterRef<CascadeSelectShowEvent>` | Panel opens. |
| `onHide` | `OutputEmitterRef<CascadeSelectHideEvent>` | Panel closes. |
| `onClear` | `OutputEmitterRef<void>` | Clear action is triggered and value resets. |
| `onFocus` | `OutputEmitterRef<FocusEvent>` | Trigger receives focus. |
| `onBlur` | `OutputEmitterRef<FocusEvent>` | Trigger loses focus. |

### CVA contract

- Implements `ControlValueAccessor` for template-driven (`[(ngModel)]`) and reactive forms (`formControlName`).
- Internal selected value state mirrors Select pattern:
  - `writeValue()` normalizes incoming value to internal signal state.
  - `registerOnChange()` and `registerOnTouched()` wire Angular forms callbacks.
  - `setDisabledState()` merges CVA disabled state with `disabled` input.
- `onChange` output is event-style and complements (does not replace) CVA propagation.

## Template Slot Directives

Template customizations follow directive-slot conventions used by AutoComplete.

| Directive selector | Purpose | Template context |
|---|---|---|
| `[uiCascadeSelectOption]` | Custom option/leaf row rendering | `$implicit` = option |
| `[uiCascadeSelectValue]` | Custom trigger selected-value rendering | `$implicit` = selected value |
| `[uiCascadeSelectDropdownIcon]` | Custom trigger icon content | none |
| `[uiCascadeSelectOptionGroupIcon]` | Custom group-expand indicator content | `$implicit` = group option |
| `[uiCascadeSelectHeader]` | Panel header content | none |
| `[uiCascadeSelectFooter]` | Panel footer content | none |
| `[uiCascadeSelectLoading]` | Loading state panel content | none |

## Internal Architecture

## Core state model

- `panelVisible: WritableSignal<boolean>`
  - Open/closed state for the popup panel.
- `activePath: WritableSignal<unknown[]>`
  - Ordered expanded group path from root to deepest open group.
  - Exactly one branch is expanded at a time.
- `activeOption: WritableSignal<unknown | null>`
  - Current keyboard-focused option in the deepest visible level.
- `internalValue: WritableSignal<unknown | null>`
  - Selected leaf model value tracked for CVA + trigger display.

## Derived/computed state

- `visibleLevels: Signal<unknown[][]>`
  - Computed columns of currently visible options, derived from `options()` + `activePath()`.
  - Level 0 is root, deeper levels exist only for expanded branch nodes.
- `activeLeafLabel: Signal<string>`
  - Trigger display label resolved from selected leaf and `optionLabel()`.
- `effectiveVariant: Signal<CascadeSelectVariant>`
  - `variant()` override or `ThemeConfigService.variant()` fallback.
- `isDisabled: Signal<boolean>`
  - `disabled()` OR CVA-disabled state.

## Level resolver contract

A dedicated utility resolves hierarchy semantics from arbitrary objects and `optionGroupChildren()`:

- Input: current option object, current depth, ordered children-key array.
- Output contract:
  - `depth: number`
  - `isGroup: boolean`
  - `isLeaf: boolean`
  - `children: unknown[]`
- Rules:
  - Depth key is selected by index from `optionGroupChildren()`.
  - Missing/empty children at current depth means leaf.
  - Resolver is pure and side-effect free.

## Keyboard/interaction contract

Keyboard handling reuses `KEYBOARD_KEYS` constants from `core`.

- `ArrowDown` / `ArrowUp`: move within current level, skipping disabled items.
- `ArrowRight`: if active option is a group, expand into next level and emit `onGroupChange`.
- `ArrowLeft`: collapse one level to parent group.
- `Enter` / `Space`: select active option only when it is a leaf.
- `Escape`: close panel and emit `onHide`.

## Panel Rendering Strategy (v1)

- Panel uses multi-column cascade layout where each visible level renders one list.
- Root column always shows `options()`.
- Expanding a group appends an adjacent submenu column.
- Only one expanded path is active at any time; opening a sibling replaces deeper branch columns.
- Each level renders a separate `<ul>`:
  - first level uses `role="tree"`
  - nested level containers use `role="group"`
  - options use `role="treeitem"`
- Viewport-aware submenu direction (right/left) is internal behavior detail; no public API in v1.
- `appendTo` behavior is implemented (`'body'` default, host/selector/element targets); shared overlay utility extraction remains a follow-up.

## ARIA Contract (P0 baseline)

- Trigger (`combobox`): `aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-activedescendant`, `aria-disabled`, `aria-invalid`.
- Popup tree semantics:
  - root list: `role="tree"`
  - nested lists: `role="group"`
  - nodes: `role="treeitem"`
- Treeitem metadata per visible level:
  - `aria-expanded` for group nodes
  - `aria-selected` for selected leaf
  - `aria-level`, `aria-setsize`, `aria-posinset`

## PrimeNG Divergence and Rationale

| API/Behavior | PrimeNG baseline | `ui-lib-cascadeselect` decision | Rationale |
|---|---|---|---|
| Filled mode API | Variant-style filled usage | `filled: boolean` input | Aligns with existing `ui-lib-autocomplete` convention. |
| Size literals | Commonly `small`/`large` | `sm`/`md`/`lg` | Aligns with Select and shared core size literals. |
| Template customization | `pTemplate` named templates | Directive-slot API (`uiCascadeSelect*`) | Consistent with library projection conventions and strong typing ergonomics. |
| Panel portal target | `appendTo` available | Implemented with `'body'` default + `'self'`/selector/element targets | Prevents clipping while preserving an extraction path to shared overlay infrastructure. |

## Final API Signature Snapshot

```typescript
// Inputs
public readonly options: InputSignal<unknown[]> = input<unknown[]>([]);
public readonly optionLabel: InputSignal<string> = input<string>('label');
public readonly optionValue: InputSignal<string | undefined> = input<string | undefined>(undefined);
public readonly optionGroupLabel: InputSignal<string> = input<string>('label');
public readonly optionGroupChildren: InputSignal<string[]> = input<string[]>([]);
public readonly optionDisabled: InputSignal<string | undefined> = input<string | undefined>(undefined);
public readonly placeholder: InputSignal<string> = input<string>('');
public readonly variant: InputSignal<CascadeSelectVariant | undefined> = input<CascadeSelectVariant | undefined>(undefined);
public readonly size: InputSignal<CascadeSelectSize> = input<CascadeSelectSize>('md');
public readonly disabled: InputSignal<boolean> = input<boolean>(false);
public readonly invalid: InputSignal<boolean> = input<boolean>(false);
public readonly loading: InputSignal<boolean> = input<boolean>(false);
public readonly showClear: InputSignal<boolean> = input<boolean>(false);
public readonly fluid: InputSignal<boolean> = input<boolean>(false);
public readonly filled: InputSignal<boolean> = input<boolean>(false);
public readonly tabindex: InputSignal<number> = input<number>(0);
public readonly inputId: InputSignal<string> = input<string>('');
public readonly appendTo: InputSignal<string | HTMLElement | undefined> = input<string | HTMLElement | undefined>('body');
public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

// Outputs
public readonly onChange: OutputEmitterRef<CascadeSelectChangeEvent> =
  output<CascadeSelectChangeEvent>();
public readonly onGroupChange: OutputEmitterRef<CascadeSelectGroupChangeEvent> =
  output<CascadeSelectGroupChangeEvent>();
public readonly onShow: OutputEmitterRef<CascadeSelectShowEvent> =
  output<CascadeSelectShowEvent>();
public readonly onHide: OutputEmitterRef<CascadeSelectHideEvent> =
  output<CascadeSelectHideEvent>();
public readonly onClear: OutputEmitterRef<void> = output<void>();
public readonly onFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
public readonly onBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
```

## Review Gate

This document is the approval checkpoint before implementation. If approved, next step is scaffolding `projects/ui-lib-custom/src/lib/cascadeselect/` with this exact public API and directive-slot contract.

