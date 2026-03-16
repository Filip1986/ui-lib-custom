# Dialog API Design (Phase 2.1)

> Status: Design phase document. For current shipped behavior and maintainer guidance, see `docs/implementation/DIALOG_IMPLEMENTATION.md`.

## Goal

Define the full public API and internal architecture contract for `ui-lib-dialog` before implementation.

This design follows:

- `AI_AGENT_CONTEXT.md`
- `LIBRARY_CONVENTIONS.md`
- `docs/architecture/DIALOG_RESEARCH.md`
- `docs/architecture/DIALOG_TOKENS.md`

## Selector and Host-First Architecture

- **Selector:** `ui-lib-dialog`
- **Host is the panel:** no wrapper container; dialog panel styles/attributes are applied to the component host.
- **Host attributes/classes/styles (design contract):**
  - `role="dialog"`
  - `aria-modal` reflects `modal()`
  - `aria-labelledby` uses generated header id unless overridden by `ariaLabelledBy()`
  - variant, position, and state classes are bound on host
  - position styles/classes are host-driven, not wrapper-driven

## Public Inputs and Outputs

### Inputs (signals)

All inputs use `input()` or `model()` from `@angular/core`.

| Name | Type | Default | Purpose |
|---|---|---|---|
| `visible` | `ModelSignal<boolean>` | `false` | Controlled/uncontrolled visibility with two-way binding contract. |
| `header` | `InputSignal<string>` | `''` | Optional plain header text when no projected header slot is provided. |
| `modal` | `InputSignal<boolean>` | `false` | Enables backdrop semantics and modal ARIA behavior. |
| `closable` | `InputSignal<boolean>` | `true` | Shows close affordance in default chrome. |
| `closeOnEscape` | `InputSignal<boolean>` | `true` | Closes on `Escape` when open. |
| `dismissableMask` | `InputSignal<boolean>` | `false` | Allows backdrop click-to-close (modal only). |
| `draggable` | `InputSignal<boolean>` | `false` | Enables header drag behavior when default chrome is active. |
| `maximizable` | `InputSignal<boolean>` | `false` | Shows maximize toggle control. |
| `blockScroll` | `InputSignal<boolean>` | `true` | Locks body/root scroll when modal dialog is open. |
| `position` | `InputSignal<DialogPosition>` | `'center'` | Controls one of 9 placement positions. |
| `breakpoints` | `InputSignal<Record<string, string>>` | `{}` | Responsive width map, e.g. `{ '960px': '75vw', '640px': '90vw' }`. |
| `variant` | `InputSignal<DialogVariant \| undefined>` | `undefined` | Optional variant override; falls back to global variant from theme config. |
| `ariaLabelledBy` | `InputSignal<string \| undefined>` | `undefined` | Explicit labeling id override for accessibility. |
| `headless` | `InputSignal<boolean>` | `false` | Disables default chrome and uses fully projected headless content. |

### Outputs

| Name | Type | Emitted when |
|---|---|---|
| `visibleChange` | `OutputEmitterRef<boolean>` | Visibility state changes (for `[(visible)]`). |
| `onShow` | `OutputEmitterRef<void>` | Dialog open transition completes. |
| `onHide` | `OutputEmitterRef<void>` | Dialog close transition completes. |
| `onMaximize` | `OutputEmitterRef<{ maximized: boolean }>` | Maximize state toggles. |

## Content Projection API

### Default mode

```html
<ng-content />
<ng-content select="[uiLibDialogHeader]" />
<ng-content select="[uiLibDialogFooter]" />
```

- Default unnamed content is the dialog body.
- Named header/footer slots override or extend default chrome regions.

### Headless mode

```html
<ng-content select="[uiLibDialogHeadless]" />
```

- When `headless()` is true, projected headless content owns full internal markup.
- Behavioral features (visibility, backdrop, escape handling, focus trap, scroll lock) remain component-managed.

## Public Type Definitions (`dialog.types.ts`)

```typescript
export type DialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type DialogVariant = 'material' | 'bootstrap' | 'minimal';
```

## Internal Architecture

## Components and modules

- `DialogComponent`
  - Main public component (`ui-lib-dialog`), host-first panel.
- `DialogBackdropComponent` (or inline backdrop block)
  - Mask layer rendered conditionally with `@if` when `visible()` and `modal()`.
- `FocusTrapDirective` (or utility)
  - Focus containment and restoration while open.
- `dialog-animations.ts`
  - Shared motion parameter types/constants consumed by CSS variable bindings.
- `dialog.constants.ts`
  - Internal constants: defaults, CSS class names, position mapping.

### Text architecture diagram

```text
ui-lib-dialog (host = panel)
  |- @if(visible() && modal())
  |    |- backdrop layer (sibling in template)
  |
  |- @if(visible())
       |- host panel content
           |- default chrome (header/body/footer) OR
           |- headless projection

DialogComponent
  |- visibility + outputs
  |- keyboard handling (Escape/Tab handoff)
  |- focus trap orchestration
  |- scroll lock orchestration
  |- breakpoint evaluation
  |- variant/position class computation
```

## Rendering Strategy (v1)

- Use Angular block syntax and conditional rendering: `@if (visible())`.
- Dialog is rendered in-place in template; **no `appendTo` / portal to `document.body` in v1**.
- Backdrop is a sibling layer in component template.
- Z-order uses CSS custom properties (`--uilib-dialog-z-index`, `--uilib-z-modal`, `--uilib-z-backdrop`) rather than runtime stacking service in v1.

### Animation runtime note

- Dialog and backdrop transitions are CSS-based (keyframes + custom properties) and do not require Angular animation providers.
- Motion is variant-aware through `--uilib-dialog-*` timing variables and respects reduced-motion via CSS media query handling.
- Lifecycle outputs are tied to visibility state changes, not Angular animation callbacks.

## CSS Class Mapping (Position -> Host Class)

| `position` value | Host class |
|---|---|
| `center` | `ui-lib-dialog--position-center` |
| `top` | `ui-lib-dialog--position-top` |
| `bottom` | `ui-lib-dialog--position-bottom` |
| `left` | `ui-lib-dialog--position-left` |
| `right` | `ui-lib-dialog--position-right` |
| `top-left` | `ui-lib-dialog--position-top-left` |
| `top-right` | `ui-lib-dialog--position-top-right` |
| `bottom-left` | `ui-lib-dialog--position-bottom-left` |
| `bottom-right` | `ui-lib-dialog--position-bottom-right` |

Additional state classes (internal convention):

- `ui-lib-dialog--visible`
- `ui-lib-dialog--modal`
- `ui-lib-dialog--maximized`
- `ui-lib-dialog--headless`
- `ui-lib-dialog--variant-material|bootstrap|minimal`

## PrimeNG Divergence and Rationale

| API/Behavior | PrimeNG baseline | `ui-lib-dialog` v1 decision | Rationale |
|---|---|---|---|
| `draggable` default | Commonly enabled by default | Default `false` | Better default for fixed SaaS workflows; avoids accidental panel movement. |
| `blockScroll` default | Commonly `false` | Default `true` when modal usage is expected | Aligns with modal UX/accessibility expectations and prevents background scroll bleed. |
| Resizable | Available | Deferred to v2 | Lower demand and high complexity/testing surface. |
| `appendTo` | Available | Deferred to v2 | Avoids SSR/portal complexity in first overlay release. |
| Dynamic dialog service | `DialogService` pattern available | Not in v1 | Prefer template-driven declarative API first; service can build on stabilized primitives later. |
| Z-index management | Runtime auto z-index options | CSS token-driven layering in v1 | Simpler initial architecture, aligned with token-first theming model. |

## Final API Signature Snapshot

```typescript
visible = model<boolean>(false);

header = input<string>('');

modal = input<boolean>(false);
closable = input<boolean>(true);
closeOnEscape = input<boolean>(true);
dismissableMask = input<boolean>(false);
draggable = input<boolean>(false);
maximizable = input<boolean>(false);
blockScroll = input<boolean>(true);

position = input<DialogPosition>('center');
breakpoints = input<Record<string, string>>({});

variant = input<DialogVariant | undefined>(undefined);

ariaLabelledBy = input<string | undefined>(undefined);

headless = input<boolean>(false);

visibleChange = output<boolean>();
onShow = output<void>();
onHide = output<void>();
onMaximize = output<{ maximized: boolean }>();
```

## Review Gate

This document is the approval checkpoint before implementation. If approved, next step is scaffolding `ui-lib-dialog` files and shared overlay/focus utilities per this contract.
