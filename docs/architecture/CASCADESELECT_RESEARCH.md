# CascadeSelect Research (Phase 1)

> Status: Design phase document.

## Goal

Define a v1 `ui-lib-cascadeselect` scope inspired by PrimeNG `p-cascadeselect`, identify what can be reused from current `Select`/`AutoComplete` infrastructure, and document what new hierarchical navigation infrastructure must be introduced.

This document is based on:

- `AI_AGENT_CONTEXT.md` (hard constraints, inventory, entry-point rules)
- `LIBRARY_CONVENTIONS.md` (Active Conventions)
- `projects/ui-lib-custom/src/lib/select/` (CVA + panel + keyboard baseline)
- `projects/ui-lib-custom/src/lib/autocomplete/` (template slots + complex form UX baseline)
- `projects/ui-lib-custom/src/lib/core/shared/constants.ts` (`KEYBOARD_KEYS`, shared variant/size defaults)
- `docs/architecture/DIALOG_RESEARCH.md` (Phase 1 structure reference)

## PrimeNG Feature Mapping

> Note: PrimeNG prop/template names can vary by version. Names below use common/current `p-cascadeselect` terminology and should be validated against the exact PrimeNG version used for parity checks.

| Feature | PrimeNG Prop / Template | Priority | Notes for `ui-lib-cascadeselect` |
|---|---|---|---|
| Value binding (template-driven + reactive) | `[(ngModel)]`, `formControlName` | P0 | Implement full `ControlValueAccessor` contract (single selected leaf only). Reuse Select CVA pattern, but with hierarchical option resolution. |
| Hierarchical options source | `options` | P0 | Accept arbitrary object trees; no rigid DTO required. |
| Leaf display label key | `optionLabel` | P0 | Resolve display text from selected leaf object via key lookup (fallback to string coercion). |
| Category display label key | `optionGroupLabel` | P0 | Resolve non-leaf text for each depth panel level. |
| Ordered depth children keys | `optionGroupChildren` | P0 | Must support array-based resolver (for example `['states', 'cities']`) to traverse uneven nesting by level. New utility required. |
| Leaf model value key | `optionValue` | P0 | Resolve CVA value from leaf; if unset, emit leaf object reference/value fallback (final API decision needed). |
| Placeholder | `placeholder` | P0 | Reuse Select-like placeholder behavior when no selection exists. |
| Disabled state | `disabled` | P0 | Merge component input + CVA disabled state; include `aria-disabled`. |
| Invalid state | `invalid` | P0 | Visual + ARIA invalid state parity with existing form components. |
| Loading state | `loading` | P0 | Suppress open/select interactions while loading; expose loading affordance in trigger. |
| Clear affordance | `showClear` | P0 | Optional clear icon/button that resets model to `null` and emits CVA change. |
| Variant support | `variant` | P0 | Keep union type `'material' | 'bootstrap' | 'minimal'`; default from `ThemeConfigService.variant()` when null. |
| Size support | `size` | P0 | Keep explicit union type for API; align naming with library standard (see conflict note on `sm/md/lg` vs `small/medium/large`). |
| Full width | `fluid` | P0 | Host class toggle, consistent with AutoComplete behavior. |
| Filled style | `filled` | P0 | Host class toggle for filled appearance; token-driven styles only. |
| Hierarchical keyboard navigation | Arrow keys, Enter/Space, Escape | P0 | Use `KEYBOARD_KEYS`. ArrowUp/Down move within current level, ArrowRight enters child, ArrowLeft returns parent, Enter/Space selects leaf, Escape closes. |
| ARIA tree semantics | roles/aria attributes | P0 | Trigger `combobox`; popup `tree`; items `treeitem`; child containers `group`; support `aria-expanded`, `aria-selected`, `aria-level`, `aria-setsize`, `aria-posinset`, `aria-activedescendant`, `aria-controls`, `aria-haspopup`. |
| Option item template | `pTemplate="option"` | P1 | Add content projection directive for leaf node rendering (AutoComplete-style template directives). |
| Value display template | `pTemplate="value"` | P1 | Optional custom trigger-value rendering when selected. |
| Dropdown icon template | `pTemplate="dropdownicon"` | P1 | Reuse template-slot pattern from AutoComplete. |
| Option-group icon template | `pTemplate="optiongroupicon"` | P1 | Needed for custom expand indicators in category rows. |
| Header template | `pTemplate="header"` | P1 | Optional projected header content inside popup. |
| Footer template | `pTemplate="footer"` | P1 | Optional projected footer content inside popup. |
| Float label integration | FloatLabel wrapper pattern | P1 | Ensure component markup/classes integrate with existing float/ifta label styling approach. |
| Ifta label integration | IftaLabel wrapper pattern | P1 | Same as above; likely style contract + docs/demo coverage rather than core logic. |
| Forms validation UX integration | Angular forms states | P1 | Ensure touched/dirty/error state hooks are reflected cleanly in host classes and docs examples. |
| Virtual scrolling | `virtualScroll` | P2 | Defer: hierarchical trees complicate viewport math beyond flat option lists. |
| Lazy child loading | lazy/async children patterns | P2 | Defer: requires loading hooks per node and async expansion states. |
| RTL behavior | `rtl` / direction inheritance | P2 | Defer dedicated API; rely on container direction initially, harden later. |
| Portal target | `appendTo` | P2 | Defer: requires overlay/portal placement strategy and clipping safeguards. |

## Infrastructure Inventory (Exists vs Needed)

| Capability | Exists today | Needed for CascadeSelect |
|---|---|---|
| Keyboard key constants | `KEYBOARD_KEYS` in `core/shared/constants.ts` includes all required keys | Reuse as-is; add tree navigation handler contract (current Select handler is listbox-centric). |
| Variant defaults | Shared theme variant + `ThemeConfigService.variant()` usage pattern exists in Select | Reuse for `variant` fallback and host class derivation. |
| CVA baseline | Mature in Select and AutoComplete | Reuse, but adapt write/read logic to leaf-only selection and hierarchical value resolution. |
| Popup open/close and outside-click handling | Exists in Select (`open`, `closePanel`, document click listener) | Reuse baseline; extend for multi-panel tree navigation and active descendant updates. |
| Panel positioning strategy | Select uses absolute-positioned panel under trigger | Reuse for v1 (non-portal). Revisit when `appendTo` enters scope. |
| Template slot directives pattern | Strong precedent in AutoComplete (`*.template-directives.ts`) | Reuse approach for option/value/icon/header/footer slots. |
| Shared size literals | `SHARED_SIZES` provides `sm/md/lg` | Reuse if API chooses compact naming; otherwise add explicit mapping layer for `small/medium/large`. |
| Hierarchical traversal utilities | Not present | New: flatten tree per visible level, compute parent/sibling paths, resolve leaf vs group, derive metadata for ARIA. |
| `optionGroupChildren` depth resolver | Not present | New: deterministic depth-aware resolver using ordered key array. |
| Tree ARIA metadata generator | Not present | New: utility to compute `aria-level`, `aria-posinset`, `aria-setsize`, ids, and expansion state. |

## Dependency and Conflict Analysis

### Existing dependencies and architectural fit

- No additional package dependency is required for P0; current patterns in Select/AutoComplete are sufficient baseline.
- `KEYBOARD_KEYS` in `core` already covers all required key names for the P0 tree interaction model.
- `ThemeConfigService` variant fallback pattern already exists and can be reused without service API changes.

### Overlap with Select

- **Reusable:** CVA shape, disabled/invalid/loading flags, clear behavior concept, outside-click close, trigger ARIA shell.
- **Non-reusable as-is:** Select uses flat/listbox assumptions (`role=listbox`, linear option index, grouped labels only). CascadeSelect requires tree semantics and level-aware active indexing.
- **Risk:** Copying Select keyboard logic directly will break ArrowLeft/ArrowRight semantics and ARIA tree expectations.

### Overlap with AutoComplete

- **Reusable:** rich template slot directive pattern, filled/fluid host-class conventions, form-state patterns.
- **Non-reusable as-is:** AutoComplete data flow is query/suggestions driven and optionally grouped, not strict hierarchical navigation.
- **Risk:** Pulling in AutoComplete-specific behaviors (search debounce, free text, virtual flat list) adds scope creep to CascadeSelect v1.

### Shared utility extraction candidates (`core`)

- `core/tree` or `core/data-structures` utilities for:
  - depth-based child key traversal (`optionGroupChildren`)
  - parent/ancestor path derivation
  - tree node flattening by active branch
  - leaf detection and safe value/label extraction
- `core/a11y` utility for treeitem ARIA metadata/id composition if future tree-like components are expected.

### Entry-point and ng-packagr risks

- New component should use a dedicated secondary entry point (`projects/ui-lib-custom/cascadeselect/ng-package.json`) instead of piggybacking on `select`.
- Follow existing entry-point convention: `ng-package.json` points directly to `../src/lib/cascadeselect/index.ts`.
- Update `projects/ui-lib-custom/package.json` exports and `typesVersions` for the new entry point.
- Avoid relative cross-entry imports. If Select and CascadeSelect share code, extract it into `core` and import via `ui-lib-custom/core`.

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Ambiguous hierarchical schema across arbitrary option objects | High | Medium | Require explicit `optionGroupChildren` depth array and validate each level defensively. |
| Keyboard focus desync across level transitions | High | Medium | Store active path as explicit node indices/ids per level; centralize focus updates in one reducer-like function. |
| ARIA tree contract drift | High | Medium | Generate ARIA attributes from a single metadata utility; verify with dedicated a11y tests (tree/treeitem/group semantics). |
| API inconsistency for size literals across components | Medium | High | Decide early between `sm/md/lg` and `small/medium/large`; if needed, support one public union and map internally. |
| Scope creep from P1 template breadth | Medium | Medium | Ship core behavior first with P0 gate; add template slots incrementally. |
| Future portal (`appendTo`) retrofit complexity | Medium | Medium | Keep popup logic encapsulated behind panel host abstraction in v1 to reduce refactor cost later. |

## Recommended Implementation Order

1. **Phase 1: Data model and traversal foundation (P0 prerequisite)**
   - Define node typing strategy and `optionGroupChildren` resolver utilities.
   - Implement leaf/group detection and value/label extraction helpers with explicit return types.
2. **Phase 2: Core component shell (P0 core)**
   - Scaffold `ui-lib-cascadeselect` with CVA, trigger, open/close lifecycle, disabled/loading/invalid states, placeholder, showClear.
3. **Phase 3: Hierarchical interaction engine (P0 core)**
   - Add level-aware keyboard navigation (Up/Down/Left/Right/Enter/Space/Escape) and active descendant management.
4. **Phase 4: ARIA tree semantics hardening (P0 completion)**
   - Apply complete tree roles/attributes (`combobox` + `tree` + `treeitem` + `group`) with deterministic id mapping.
5. **Phase 5: Visual/theming integration (P0 completion)**
   - Add variant/size/fluid/filled classes and token-driven styles; keep `ViewEncapsulation.None` and no raw hex/px additions.
6. **Phase 6: P1 template and forms UX expansion**
   - Add option/value/icon/header/footer templates and float/ifta label integration docs/demos.
7. **Phase 7: P2 backlog planning**
   - Track virtual scroll, lazy children, RTL hardening, and `appendTo` as explicit deferred milestones.

## Summary: What exists vs what must be created

- **Exists:** keyboard constants, CVA/form patterns, panel open/close behavior, variant/fill/fluid style conventions, template-slot directive pattern.
- **Must be created:** hierarchical traversal utilities, `optionGroupChildren` depth resolver, tree ARIA metadata engine, level-aware keyboard/focus state model.
- **Primary architectural decision for v1:** deliver a non-portal, hierarchical tree popup with strict leaf selection first; defer virtualization/lazy/appendTo until the base tree contract is stable.

