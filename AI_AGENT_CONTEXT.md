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

Date: 2026-05-21 [CSS Custom Properties sections auto-generated across 54 demo pages]
Changed:
  - scripts/generate-css-var-sections.mjs (NEW — extracts --uilib-* vars from component SCSS, injects cssVarRows + DocCssVarsTableComponent import + HTML section into each demo page)
  - 54 demo pages updated with cssVarRows property, import, sections entry { id: 'css-vars', label: 'CSS Custom Properties' }, and HTML <app-doc-section id="css-vars"> block
  - organization-chart, select-buttons: added missing DocSectionComponent import (were missed by earlier migration)
  - autocomplete, badges, cards, checkboxes, icons, image, image-compare: added DocSectionComponent import (pages that already used app-doc-section in HTML but lacked the import)
State: Build zero errors. 54/54 target demo pages now have CSS Custom Properties sections. 4 components skipped (alert, button-group, icon-button have no demo page; code-snippet is not on standard doc-page-layout).
Verification:
  node scripts/generate-css-var-sections.mjs → Processed: 54, Skipped: 35
  ng build demo → PASS (zero errors; only pre-existing roadmap SCSS budget warning)
Next step: Add Accessibility sections (ARIA table + keyboard nav) to pages that have ariaRows/keyboardRows data but no section in HTML. Then convert the 8 pages still on example-section layout to full doc-page-layout pattern.

Date: 2026-05-21 [Demo page standardization — app-doc-section migration complete, build clean]
Changed:
  - projects/demo/src/app/shared/doc-page/doc-section.component.ts (NEW)
  - projects/demo/src/app/shared/doc-page/doc-section.component.html (NEW)
  - projects/demo/src/app/shared/doc-page/doc-aria-table.component.ts (NEW)
  - projects/demo/src/app/shared/doc-page/doc-aria-table.component.html (NEW)
  - projects/demo/src/app/shared/index.ts (exports added for both new components)
  - scripts/migrate-doc-sections.mjs (NEW — bulk migration: 80 pages' demo-section patterns → app-doc-section)
  - scripts/fix-section-imports.mjs (NEW — fixed 7 files where DocSectionComponent import landed at EOF)
  - scripts/fix-section-tags.mjs (NEW — token+stack fixer: converts remaining plain <section id="X"> to app-doc-section and reverts no-id section closings)
  - 80+ demo pages: <section class="demo-section"> → <app-doc-section id="X" title="TITLE">
  - 22 pages fixed for mismatched closing tags (plain sections whose </section> was wrongly converted)
  - dynamic-dialog: DocSectionComponent moved from inner component to main DynamicDialogDemoComponent
  - projects/demo/src/app/pages/chip/chip-demo.component.html (golden template, DocAriaTableComponent)
State: Build zero errors. All demo pages now use app-doc-section. Shared DocSectionComponent wraps every doc section with correct data-doc-anchor, class, id host bindings. DocAriaTableComponent created as chip golden template.
Verification:
  node scripts/migrate-doc-sections.mjs → 80 pages migrated
  node scripts/fix-section-imports.mjs → 7 import placements fixed
  node scripts/fix-section-tags.mjs → 22 tag mismatches fixed
  ng build demo → PASS (zero errors; only pre-existing budget warnings)
  tsc -p projects/demo/tsconfig.app.json --noEmit → PASS
Next step: (1) Add DocAriaTableComponent usage to remaining pages that still use raw ui-lib-table for ARIA attributes. (2) Add missing CSS Custom Properties / Accessibility sections to pages that lack them. (3) Consider migrating autocomplete/toggle-button/cascade-select pages from example-section → full doc-page-layout pattern for visual consistency.

<!-- older handoffs: see docs/implementation/AI_AGENT_CONTEXT_ARCHIVE.md -->
