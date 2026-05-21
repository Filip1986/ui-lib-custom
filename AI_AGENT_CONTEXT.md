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

Date: 2026-05-21 [ARIA table migration — 7 demo pages migrated to DocAriaTableComponent]
Changed:
  - block-ui: added DocAriaTableComponent + ariaRows (7); replaced raw <table class="doc-properties"> in accessibility section
  - bottom-sheet: added DocAriaTableComponent + ariaRows (7); replaced raw <table class="doc-properties">
  - password: added DocAriaTableComponent + ariaRows (7); replaced raw <table class="doc-properties">
  - radio-button: added DocAriaTableComponent + ariaRows (7); replaced raw <table class="doc-properties">
  - rating: added DocAriaTableComponent + ariaRows (9); replaced raw <table class="doc-properties">
  - ripple: added DocAriaTableComponent + ariaRows (2); replaced raw <table class="doc-properties">
  - meter-group: added DocAriaTableComponent + ariaRows (9); replaced raw <table class="doc-properties">
State: Build zero errors. Zero raw ARIA doc-properties tables remain in component demo pages. Remaining doc-properties in themes/shadows/project-starter are utility pages (different context).
Verification: ng build demo → PASS (zero errors; only pre-existing budget warnings)
Next step: Next milestone: runtime variant switcher, theme preset management, broader axe-core audit.

Date: 2026-05-21 [API table migration — 15 remaining demo pages migrated to DocApiReferenceComponent]
Changed:
  - auto-focus-demo.component.ts/.html: added DocApiReferenceComponent + apiInputRows (2); replaced af-table
  - badges.component.ts/.html: added DocApiReferenceComponent + apiInputRows (5); replaced tab panel table
  - cards.component.ts/.html: added DocApiReferenceComponent + apiInputRows (4); replaced tab panel table
  - checkboxes.component.ts/.html: added DocApiReferenceComponent + apiInputRows (12); replaced tab panel table
  - confirm-popup-demo.component.ts/.html: added DocApiReferenceComponent + apiInputRows (11) + apiOutputRows (2) + apiServiceRows (3); replaced 3 raw tables; fixed h3 class demo-table__heading → demo-section__subtitle
  - icons-demo.component.ts/.html: added DocApiReferenceComponent + apiInputRows (4) [showDefault=false]; replaced tab panel table
  - image-demo.component.ts/.html: added DocApiReferenceComponent + apiInputRows (13) + apiOutputRows (2) + apiSlotRows (2); replaced 3 api-table elements
  - image-compare-demo.component.ts/.html: added DocApiReferenceComponent + apiInputRows (10) + apiOutputRows (2); replaced 2 api-table elements; kept keyboard navigation table
  - meter-group-demo.component.ts/.html: added DocApiReferenceComponent + apiInputRows (10) + apiMeterItemRows (4) kind=property; replaced 2 doc-properties tables
  - organization-chart-demo.component.ts/.html: added DocApiReferenceComponent + apiInputRows (5) + apiOutputRows (4) + apiSlotRows (1); replaced 3 doc-table elements; changed h4 to h3.demo-section__subtitle
  - select-buttons.component.ts/.html: added DocApiReferenceComponent + apiInputRows (7) + apiOutputRows (1); replaced api-table
  - split-button-demo.component.ts/.html: added DocApiReferenceComponent + apiInputRows (5); replaced doc-table
  - inputs.component.html: replaced 5-row tab panel doc-properties table with <app-doc-api-reference [rows]="apiRows" />
  - select.component.html: replaced 5-row tab panel doc-properties table with <app-doc-api-reference [rows]="apiRows" />
  - tabs.component.html: replaced 14-row tab panel doc-properties table with <app-doc-api-reference [rows]="apiRows" />
State: Build zero errors. Zero raw API doc tables remain across all 21 targeted pages.
Verification: ng build demo → PASS (zero errors; only pre-existing bundle budget + roadmap SCSS warnings)
Next step: Next milestone: runtime variant switcher, theme preset management, broader axe-core audit.

Date: 2026-05-21 [Demo consistency audit — import paths standardized + final raw tables eliminated]
Changed:
  - All ~110 *.ts files under projects/demo/src/app/pages/: replaced all `../../shared/doc-page/` and `../../shared/components/` relative imports with `@demo/shared/doc-page/` and `@demo/shared/components/` alias paths
  - projects/demo/src/app/pages/fieldset/fieldset-demo.component.ts: added DocApiReferenceComponent; added apiInputRows (5), apiOutputRows (1), apiProjectionRows (2)
  - projects/demo/src/app/pages/fieldset/fieldset-demo.component.html: replaced 3 raw <table class="demo-api-table"> with <app-doc-api-reference>; fixed h3 class demo-api__subtitle → demo-section__subtitle
  - projects/demo/src/app/pages/menubar/menubar-demo.component.ts: added DocApiReferenceComponent; added apiInputRows (5), apiOutputRows (1), apiItemRows (10), apiProjectionRows (2)
  - projects/demo/src/app/pages/menubar/menubar-demo.component.html: replaced 4 raw <table class="demo-api-table"> with <app-doc-api-reference>
State: Build zero errors. Zero raw demo-api-table HTML elements remain anywhere in pages/. All demo page imports now use @demo/shared alias paths exclusively.
Verification:
  eslint projects/demo/src/app/pages/fieldset/ menubar/ --max-warnings 0 → clean
  ng build demo → PASS (zero errors; only pre-existing budget warnings)
Next step: Next milestone: runtime variant switcher, theme preset management, broader axe-core audit.

<!-- older handoffs: see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md -->
