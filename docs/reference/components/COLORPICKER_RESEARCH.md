# ColorPicker Research and Gap Analysis

## Scope

This document analyzes PrimeNG ColorPicker parity targets and maps them to reusable infrastructure in `ui-lib-custom`.

Inputs used:
- `AI_AGENT_CONTEXT.md`
- `LIBRARY_CONVENTIONS.md`
- Existing component implementations under `projects/ui-lib-custom/src/lib/`
- PrimeNG ColorPicker capability list provided in this prompt

## Feature Inventory and Comparison

| Capability | PrimeNG | Current `ui-lib-custom` status | Proposed `ui-lib-color-picker` scope | Gap / Notes |
| --- | --- | --- | --- | --- |
| Popup mode (swatch trigger + overlay panel) | Yes | No ColorPicker yet; popup pattern exists in `select`, `autocomplete`, `cascade-select` | P0 | Reuse anchored panel/open-close patterns; implement dedicated panel interaction model. |
| Inline mode (always visible picker panel) | Yes | Not present | P0 | Inline is straightforward once panel internals are componentized. |
| Hex format model (`"6466f1"`) | Yes | No shared public color model utilities | P0 | Add explicit parse/normalize helpers with strict typing. |
| RGB format model (`{ r, g, b }`) | Yes | No shared public RGB model utilities | P0 | Add conversion utilities and typed guards. |
| HSB format model (`{ h, s, b }`) | Yes | No shared public HSB model utilities | P0 | Add HSB conversion/utilities; keep canonical internal model. |
| Forms integration (`ngModel`, `formControlName`) | Yes | CVA patterns mature across components (`select`, `autocomplete`, `checkbox`, `cascade-select`) | P0 | Reuse CVA contract and touched/disabled handling patterns. |
| Disabled state | Yes | Standardized patterns exist in many components | P0 | Reuse disabled host classes + ARIA + pointer/keyboard guards. |
| `onChange` with `{ value, originalEvent }` | Yes | Event-shape parity exists in `cascade-select` style outputs | P0 | Add typed `ColorPickerChangeEvent`. |
| `onShow` / `onHide` (popup) | Yes | Pattern exists in `cascade-select` | P0 | Emit only in popup mode. |
| Keyboard support (open/select/close/navigation) | Yes | Strong key handling patterns via `KEYBOARD_KEYS` and select-like components | P0 | Add 2D panel and hue-slider key semantics. |
| `appendTo` overlay mounting | Yes | Implemented in `autocomplete` (`appendTo='body'` default, `self`/selector/element supported) | P2 | Reuse autocomplete approach in v1 if needed; keep shared overlay infra extraction as follow-up. |
| `showTransitionOptions` / `hideTransitionOptions` | Yes | No generic show/hide transition API for popup controls | P1 | Map to CSS variable-driven motion inputs; avoid Angular animation coupling. |
| `inputId`, `tabindex`, `style`, `styleClass` | Yes | `inputId`/`tabindex` are common; style/styleClass not consistently exposed | P0 (`inputId`/`tabindex`), P1 (`style`/`styleClass`) | Align with existing component API style and host class patterns. |

## Reusability Assessment

## Reusable patterns available now

| Area | Reusable from | What to reuse |
| --- | --- | --- |
| Popup open/close lifecycle | `projects/ui-lib-custom/src/lib/select/select.ts`, `projects/ui-lib-custom/src/lib/cascade-select/cascade-select.ts` | `openPanel` / `closePanel`, external click close, Escape close, touched-state integration. |
| Keyboard constants | `projects/ui-lib-custom/src/lib/core/shared/constants.ts` | `KEYBOARD_KEYS` for Escape/Space/Enter/Arrow/Home/End/Tab handling. |
| CVA wiring | `select`, `autocomplete`, `checkbox`, `cascade-select` components | Explicit `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState` flow. |
| Theming variant fallback | `ThemeConfigService` usage in `select`, `cascade-select`, `dialog` | `variant() ?? themeConfig.variant()` pattern. |
| Overlay-like panel styling | `select.scss`, `cascade-select.scss`, `autocomplete.scss` | Absolute anchored panel tokens (`panel-bg`, `panel-border`, `panel-shadow`, z-index, spacing). |
| Click-outside handling | `@HostListener('document:click')` in `select`, `autocomplete`, `cascade-select` | Immediate baseline behavior for popup closing. |

## Reuse gaps / missing shared infrastructure

| Gap | Current state | Impact on ColorPicker |
| --- | --- | --- |
| Shared overlay utility/service | Not present in `ui-lib-custom/core`; CDK overlay not used in library components | Popup logic would otherwise be copy-pasted again. |
| Shared click-outside utility | Repeated `@HostListener('document:click')` implementations | Increased duplication and inconsistency risk. |
| Public color conversion utility | `theme-editor.service.ts` has private hex/rgb/hsl helpers only | ColorPicker needs reusable, tested hex/rgb/hsb conversion API. |
| Portal/`appendTo` mounting infra | Per-component behavior exists in `autocomplete`; shared core overlay utility is not yet present | Portal parity is feasible component-by-component, but shared infra is still needed to avoid duplication. |

## Existing Color Utility Inventory

- `projects/ui-lib-custom/src/lib/theming/theme-editor.service.ts` contains useful private helpers:
  - `normalizeHex`
  - `hexToRgb`
  - `rgbToHex`
  - `rgbToHsl`
  - `hslToRgb`
  - `clamp`
- These are service-private and HSL-oriented, while ColorPicker requires public hex/RGB/HSB conversions.
- Recommendation: extract generic math and parsing to a reusable utility module, then keep ThemeEditor-specific lightness logic inside `theme-editor.service.ts`.

## Dependency Mapping

## Required shared infrastructure

| Dependency | Required for | Recommendation |
| --- | --- | --- |
| Color conversion utilities (`hex <-> rgb <-> hsb`) | Multi-format model support and keyboard/pointer updates | Create reusable utilities with full unit coverage and strict input normalization. |
| Popup panel state and positioning | Popup mode, trigger anchoring, viewport-safe behavior | Start with existing anchored absolute panel pattern; isolate in component internals for later extraction. |
| Click-outside + Escape close | Predictable popup dismissal | Reuse current host listener pattern in v1; plan extraction to shared core helper in follow-up. |
| Gradient interaction surface | Saturation/brightness selection | Implement with CSS gradients + pointer math (no canvas dependency in v1). |

## Optional / deferred infrastructure

| Item | Why deferred |
| --- | --- |
| Full shared portal mounting (`appendTo`) utility | No centralized core overlay service yet; current popup components implement mount logic locally. |
| Global overlay stack manager | Not required for first ColorPicker release; can align with future overlay initiative. |
| Angular CDK Overlay dependency | Not currently used across library popup components; introducing now increases surface and migration complexity. |

## Architectural Decisions and Recommendations

## 1) Color panel rendering: Canvas vs CSS gradients

**Recommendation: CSS gradient panel for v1.**

Why:
- Matches current library philosophy (tokenized CSS + lightweight runtime behavior).
- Easier theming across Material/Bootstrap/Minimal variants.
- Lower complexity for SSR/test environments than canvas drawing code.
- Pointer-to-value math can be pure TypeScript (`getBoundingClientRect`) with explicit typing and deterministic tests.

Trade-off:
- Canvas can be more extensible for advanced color spaces/alpha composition.
- Keep panel interaction abstraction internal so a future canvas swap remains possible.

## 2) Popup strategy: CDK Overlay vs custom

**Recommendation: custom anchored popup in v1, with extraction-ready boundaries.**

Why:
- Existing components already use anchored in-place panels (`select`, `autocomplete`, `cascade-select`).
- No current `@angular/cdk/overlay` usage in library component code.
- Lowest-risk parity path and consistent behavior with current controls.

Follow-up path:
- Define a `core` overlay helper once at least two popup components require shared portal/collision management.
- Keep `appendTo` behavior implementation aligned across popup components while centralization is pending.

## 3) Utility placement: `core` vs `color-picker` entry point

**Recommendation:**
- Put generic conversion/math utilities in `ui-lib-custom/core` (cross-component reusable).
- Keep ColorPicker-specific interaction helpers in `ui-lib-custom/color-picker` source.

Rationale:
- Theme editor and potential future controls (theme tooling, gradients, charts) can reuse generic color transforms.
- Prevents coupling generic utilities to one component entry point.

## Proposed New Design Tokens

Add canonical values in `projects/ui-lib-custom/src/lib/design-tokens.ts` first, then expose component CSS variables.

| Proposed token key (design-tokens.ts) | Proposed CSS var | Purpose |
| --- | --- | --- |
| `COLOR_PICKER_PANEL_SIZE` | `--uilib-color-picker-panel-size` | Saturation/brightness panel width/height baseline. |
| `COLOR_PICKER_HUE_SLIDER_HEIGHT` | `--uilib-color-picker-hue-height` | Hue rail size for popup/inline panel. |
| `COLOR_PICKER_HANDLE_SIZE` | `--uilib-color-picker-handle-size` | Drag handle diameter for panel and hue slider thumb. |
| `COLOR_PICKER_HANDLE_BORDER` | `--uilib-color-picker-handle-border` | Handle ring contrast against any background color. |
| `COLOR_PICKER_SWATCH_SIZE` | `--uilib-color-picker-swatch-size` | Trigger swatch dimension in popup mode. |
| `COLOR_PICKER_PANEL_BG` | `--uilib-color-picker-panel-bg` | Popup panel background. |
| `COLOR_PICKER_PANEL_BORDER` | `--uilib-color-picker-panel-border` | Popup panel border color. |
| `COLOR_PICKER_PANEL_SHADOW` | `--uilib-color-picker-panel-shadow` | Popup panel elevation/shadow token. |
| `COLOR_PICKER_FOCUS_RING` | `--uilib-color-picker-focus-ring` | Keyboard focus ring treatment for trigger/panel controls. |
| `COLOR_PICKER_TRANSITION_DURATION` | `--uilib-color-picker-transition-duration` | Show/hide transition timing baseline. |
| `COLOR_PICKER_OPTIONAL_INPUT_BG` | `--uilib-color-picker-input-bg` | Optional text-input surface (if value input is included). |
| `COLOR_PICKER_OPTIONAL_INPUT_BORDER` | `--uilib-color-picker-input-border` | Optional text-input border token. |

## Accessibility Requirements (Implementation Contract)

## Keyboard behavior

- Popup closed:
  - `Tab` focuses swatch trigger.
  - `Space` or `Enter` opens popup.
- Popup open:
  - `Escape` closes popup and restores focus to trigger.
  - `Tab` moves through interactive elements predictably; no focus trap required unless modal behavior is introduced.
- Saturation/brightness panel:
  - Arrow keys adjust saturation/brightness in small increments.
  - `Shift + Arrow` optional larger increments (recommended for UX).
- Hue slider:
  - `ArrowUp` / `ArrowRight` increase hue.
  - `ArrowDown` / `ArrowLeft` decrease hue.
- Selection eventing:
  - Keyboard and pointer updates both emit consistent `onChange` payloads.

## ARIA and semantics

- Trigger (popup mode):
  - `role="button"`, `aria-haspopup="dialog"` (or `application` if interactive-region semantics are used), `aria-expanded`, `aria-controls`.
- Popup panel:
  - Label with `aria-label` or `aria-labelledby`.
  - Expose current color text value in an announceable region (`aria-live="polite"` recommended).
- Sliders/surfaces:
  - Hue control should expose slider semantics with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`.
  - 2D panel can be represented as two coordinated slider semantics or one application region with explicit instructions; document final decision in API docs.
- Disabled state:
  - Apply `aria-disabled="true"` and suppress all interactions.
- Forms:
  - CVA touched/dirty integration must align with existing form components.

## Gap Summary

- The codebase already has enough popup/CVA/keyboard patterns to deliver a strong v1 ColorPicker.
- The main missing foundation is **reusable public color conversion utilities** and **shared overlay abstraction**.
- Recommended approach is a phased delivery:
  - **P0:** popup + inline, hex/rgb/hsb model support, CVA, disabled, onChange/onShow/onHide, keyboard + ARIA baseline.
  - **P1:** transition options, style/styleClass parity, polish + docs/demo depth.
  - **P2:** true `appendTo`/portal support with shared overlay infrastructure.

