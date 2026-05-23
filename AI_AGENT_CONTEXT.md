# AI Agent Context

> Active session context only.
> Stable architecture, conventions, and workflows live in `AGENTS.md`.
> Historical handoffs live in `docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md`.

---

## Purpose and Scope

Use this file for:
- Current focus, queue, and blockers
- Quick status deltas for in-flight components/docs
- Recent handoffs (latest 1-3 sessions)

Do not duplicate stable project rules here; link to `AGENTS.md` instead.

---

## Active Session State

- **Current milestone:** Component foundation hardening + documentation completeness
- **Active focus:** ALL components hardened — 76 original queue items + all new components COMPLETE. Library hardening milestone achieved 2026-05-15.
- **Next queue:** No remaining hardening items. Next milestone: runtime variant switcher, theme preset management, broader axe-core audit.
- **Horizon:** Runtime variant switcher, theme preset management, broader axe-core audit ✅ (infra in place)
- **Prompt library status:** All Tier 1 hardening prompts deleted (one-time-use scaffolding — lessons distilled into `docs/prompts/COMPONENT_EVOLUTION_PROMPTS.md`). Active prompt system: `docs/prompts/audit/` (3-phase agentic Tier 2 audit). Score index: `docs/prompts/HARDENING_PROMPT_INDEX.md`.

### Component/Docs Delta (Active Only)

- `CodeSnippet` -> ✅ integrated app-wide (demo build clean; all 36 demo pages migrated from app-code-preview)

- `Accordion` -> ✅ complete + hardened (6-phase, score 9.0/10, 51 tests — 33 unit + 18 a11y)
- `TieredMenu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 70 tests — 28 unit + 42 a11y)
- `Menu` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 89 tests — 44 unit + 45 a11y)
- `Menubar` -> ✅ complete + hardened (6-phase evolution, score 9.0/10, 84 tests — 42 unit + 42 a11y)
- `MegaMenu` -> ✅ complete + hardened (6-phase, score 9.0/10, 95 tests — 51 unit + 44 a11y)
- `Tabs` -> ✅ complete + hardened (6-phase, score 9.0/10)
- `Stepper` -> ✅ complete + hardened (6-phase, score 9.0/10, 61 tests — 39 unit + 22 a11y)
- `RadioButton` -> ✅ complete + hardened (6-phase, 64 tests — 40 unit + 24 a11y)
- `Password` -> ✅ complete + hardened (6-phase, 73 tests — 49 unit + 24 a11y)
- `Slider` -> ✅ complete + hardened (6-phase, 75 tests — 47 unit + 28 a11y)
- `Rating` -> ✅ complete + hardened (6-phase, 75 tests — 53 unit + 22 a11y)
- `Ripple` -> ✅ complete + hardened (6-phase, score 8.7/10, 29 tests — 19 unit + 10 a11y)
- `BlockUI` -> ✅ complete + hardened (6-phase, score 9.0/10, 38 tests — 22 unit + 15 a11y + 1 updated)
- `Table` -> ✅ complete + hardened (6-phase, 125 tests — 92 unit + 33 a11y)
- `TreeTable` -> ✅ complete + hardened (6-phase, score 8.5/10, 85 tests — 41 unit + 44 a11y)
- `Tree` -> ✅ complete + hardened (6-phase, score 8.6/10, 93 tests — 38 unit + 55 a11y)
- `Timeline` -> ✅ complete + hardened (6-phase, score 8.3/10, 48 tests — 33 unit + 15 a11y)
- `Upload` -> ✅ complete + hardened (6-phase, score 8.9/10, 66 tests — 36 unit + 30 a11y)
- `Tag` -> ✅ complete + hardened (6-phase, score 8.9/10, 40 tests — 26 unit + 14 a11y)
- `Card` -> ✅ complete + hardened (6-phase, score 9.0/10, 34 tests — 10 unit + 24 a11y)
- `Badge` -> ✅ complete + hardened (6-phase, score 8.4/10, 25 tests — 13 unit + 12 a11y)
- `Chip` -> ✅ complete + hardened (6-phase, score 8.5/10, 48 tests — 30 unit + 18 a11y)
- `ContextMenu` -> ✅ complete + hardened (6-phase, 86 tests — 55 unit + 31 a11y)
- `Chart` -> ✅ complete + hardened (6-phase, score 8.9/10, 96 tests — 75 unit + 21 a11y)
- `BottomSheet` -> ✅ complete + hardened (6-phase, score 8.5/10, 50 tests — 26 unit + 24 a11y)
- `MeterGroup` -> ✅ complete + hardened (6-phase, score 8.3/10, 45 tests — 27 unit + 18 a11y)
- `DataView` -> ✅ complete + hardened (6-phase, score 8.3/10, 64 tests — 43 unit + 21 a11y)
- `Divider` -> ✅ complete + hardened (6-phase, score 8.7/10, 36 tests — 24 unit + 12 a11y)
- `Fieldset` -> ✅ complete + hardened (6-phase, score 9.0/10, 53 tests — 30 unit + 23 a11y)
- `Panel` -> ✅ complete + hardened (6-phase, score 9.0/10, 110 tests — 87 unit + 23 a11y)
- `ScrollPanel` -> ✅ complete + hardened (6-phase, score 8.9/10, 29 tests — 13 unit + 16 a11y)
- `ScrollTop` -> ✅ complete + hardened (6-phase, score 8.4/10, 37 tests — 23 unit + 14 a11y)
- `Carousel` -> ✅ complete + hardened (6-phase, score 8.3/10, 70 tests — 44 unit + 26 a11y)
- `Galleria` -> ✅ complete + hardened (6-phase, score 8.3/10, 55 tests — 39 unit + 16 a11y)
- `Button` -> ✅ complete + hardened (6-phase, score 8.9/10, 72 tests — 48 unit + 24 a11y)
- `ImageCompare` -> ✅ complete + hardened (6-phase, score 8.9/10, 60 tests — 39 unit + 21 a11y)
- `ToggleSwitch` -> ✅ complete + hardened (6-phase, score 8.8/10, 68 tests — 37 unit + 31 a11y)
- `Icon` -> ✅ complete + hardened (6-phase, score 8.7/10, 30 tests — 12 unit + 18 a11y)
- `IconButton` -> ✅ complete + hardened (6-phase, score 8.6/10, 27 tests — 6 unit + 21 a11y)

---

## Known Blockers / Watch Items

- Non-blocking Jest warning seen during a11y run:
  - `jest-haste-map: Haste module naming collision: ui-lib-custom`
  - between root `package.json` and `projects/ui-lib-custom/package.json`
- Demo build shows pre-existing SCSS budget warnings in `button` and `date-picker` -- not a blocker

---

## Recent Handoffs

Date: 2026-05-24 [BEM class name standardisation — all uilib-variant-* and single-hyphen modifier classes eliminated]
Changed:
  input-number/input-number.component.ts: host bindings renamed (ui-lib-input-number-sm → ui-lib-input-number--sm etc.)
  input-number/input-number.component.scss: 13 top-level selectors renamed to double-hyphen BEM
  input-number/input-number.component.spec.ts: 10 assertion strings updated
  knob/knob.component.ts: host bindings renamed (ui-lib-knob-sm → ui-lib-knob--sm etc.)
  knob/knob.component.scss: 8 nested selectors + 2 top-level variant blocks restructured (.uilib-variant-bootstrap → ui-lib-knob.ui-lib-knob--bootstrap)
  knob/knob.component.spec.ts: 4 assertion strings updated
  password/password.component.ts: host bindings (completed previous session)
  password/password.component.scss: selectors (completed previous session)
  password/password.component.spec.ts: assertions (completed previous session)
  input-mask/input-mask.component.ts: added inject, ThemeConfigService, variant input, effectiveVariant; renamed host bindings + added variant bindings
  input-mask/input-mask.component.scss: renamed modifier selectors + converted parent-context .uilib-variant-* to component-level ui-lib-input-mask--* selectors
  input-mask/input-mask.component.spec.ts: 6 assertion strings updated
  input-otp/input-otp.component.ts: added inject, ThemeConfigService, variant input, effectiveVariant; renamed host bindings + added variant bindings
  input-otp/input-otp.component.scss: renamed modifier selectors + converted parent-context .uilib-variant-* to component-level ui-lib-input-otp--* selectors
  input-otp/input-otp.component.spec.ts: 6 assertion strings updated
  virtual-scroller/virtual-scroller.component.ts: added ThemeConfigService inject, variant input, effectiveVariant computed, added variant class to hostClasses()
  virtual-scroller/virtual-scroller.component.scss: 3 top-level variant selectors renamed (uilib-variant-* → ui-lib-virtual-scroller--*)
State: 6040/6040 tests passing (226 suites). ng build ui-lib-custom → PASS. PR #233 open.
Verification: npx eslint → 0 warnings; ng build → PASS; npm test → 6040/6040; pre-push typecheck → PASS
Terminal notes: Use npm test -- --testPathPatterns="pattern" (not --testPathPattern which is deprecated); pipe | in regex must use PowerShell not bash
Next step: Merge PR #233 → then CSS @layer adoption, or broader axe-core audit.

Date: 2026-05-24 [Runtime variant switcher — all components now respect ThemeConfigService.setVariant()]
Changed:
  theming/theme-config.service.ts: setVariant() now writes data-variant to document.documentElement AND persists to localStorage via persistConfig(); constructor restores stored variant on boot
  theming/theme-preset.interface.ts: ThemeConfig extended with optional variant?: ThemeVariant
  6 outlier components updated from hardcoded input<Variant>('material') to input<Variant | null>(null) + effectiveVariant computed signal:
  - button-group/button-group.ts (primary barrel — relative import OK)
  - carousel/carousel.component.ts (secondary entry point — import { ThemeConfigService } from 'ui-lib-custom/theme')
  - paginator/paginator.component.ts (secondary entry point — same pattern)
  - password/password.component.ts (secondary entry point — same pattern)
  - upload/upload.component.ts (secondary entry point — same pattern)
  - autocomplete/autocomplete.ts (secondary entry point — same pattern; also updated syncPanelMount to use effectiveVariant())
  Key lesson: Secondary entry points MUST use package-path imports for ThemeConfigService (not relative) or ng-packagr partial compilation throws "Cannot destructure property 'pos' of 'file.referencedFiles[index]'"
State: 399/399 tests passing in affected suites. ng build → PASS. PR #232 open.
Verification: npx eslint → 0 warnings; ng build → PASS; npm test → 399/399; npm run typecheck → PASS
Terminal notes: npm test -- --testPathPatterns="pattern" (not --testPathPattern which is deprecated)
Next step: Merge PR #232 → then CSS @layer adoption, or broader axe-core audit.

Date: 2026-05-23 [Dark-mode consolidation — eliminated all 4 parallel dark-mode systems]
Changed:
  Component SCSS files — all 20 migrated to inline scoped dark-mode blocks:
  - layout/stack.scss, inline.scss, grid.scss, container.scss
  - icon/icon.scss, alert/alert.scss, badge/badge.scss
  - input/input.scss, select/select.scss, checkbox/checkbox.scss
  - select-button/select-button.scss, tabs/tabs.scss
  - accordion/accordion.scss, accordion/accordion-panel.scss
  - radio-button/radio-button.scss, rating/rating.scss
  - toggle-switch/toggle-switch.scss (replaced @include with inline tokens)
  - card/card.scss (replaced @include + standardized selector to ui-lib-card)
  - dialog/dialog.component.scss (replaced @include + standardized media-query selector)
  - button/button.scss (30-token mixin inlined; bare hex → var(--uilib-color-neutral-950, #0b1220))
  Pattern: [data-theme='dark'] ui-lib-<component> { } + @media (prefers-color-scheme: dark) block
  styles/dark-theme.scss → emptied (was opt-in mixin aggregator; now superseded)
  styles/light-theme.scss → emptied (tokens in themes.scss Section 2)
  styles/_theme-mixins.scss → zero consumers; safe to delete
State: 6040/6040 tests pass (226 suites). ng build ui-lib-custom → zero warnings/errors.
Verification: npm test → 6040/6040; npm run build → PASS
Terminal notes: Use node_modules/.bin/jest.cmd not npx jest on Windows
Next step: Delete _theme-mixins.scss (confirmed zero consumers). Then: runtime variant switcher; CSS @layer adoption.


<!-- older handoffs: see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md -->
