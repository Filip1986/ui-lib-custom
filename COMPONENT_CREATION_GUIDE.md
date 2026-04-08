# Component Creation Guide — AI Agent Instructions

> **Purpose:** This document tells you exactly what to consider, research, and deliver when Filip asks you to create a new component for `ui-lib-custom`. Read this **before** writing any prompts or code.

---

## Step 0 — Mandatory Reading

Before doing anything else, read these files in order:

1. `AI_AGENT_CONTEXT.md` — component inventory, active work, file map
2. `LIBRARY_CONVENTIONS.md` — all architectural rules (the source of truth)
3. This file — the creation workflow

If any convention below conflicts with `LIBRARY_CONVENTIONS.md`, that file wins.

---

## Step 1 — Understand the Component

### Classify the component

Determine which category it falls into, because each has different implementation concerns:

- **Layout / wrapper** (e.g., IconField, InputGroup, FloatLabel) — Pure CSS, no form logic, no CVA. Content projection only. Simplest category; typically 3–5 prompts.
- **Form control** (e.g., Input, Select, DatePicker, AutoComplete, InputMask) — Requires `ControlValueAccessor`, `ngModel`/reactive forms support, validation states, FloatLabel integration. Most complex category; typically 7–12 prompts.
- **Overlay / popup** (e.g., Dialog, DatePicker panel, AutoComplete dropdown) — Needs focus trap, scroll lock, backdrop, positioning, open/close animations. Uses the overlay infrastructure established by Dialog (`FocusTrap` from `ui-lib-custom/core`, no Angular CDK).
- **Data display** (e.g., Accordion, Tabs, Card, Badge) — Read-only or toggle-based. Moderate complexity; typically 5–8 prompts.
- **Compound component** (e.g., Accordion + AccordionPanel, Tabs + Tab) — Parent/child communication via signals or DI. Follow the Tabs pattern for content projection and the Accordion pattern for expand/collapse state.

### Research the PrimeNG reference

Always inspect PrimeNG source via `npm pack`, never by scraping the website:

```powershell
cd C:\temp
npm pack primeng@19 --pack-destination .
tar xzf primeng-19.*.tgz
# Read the component's .d.ts for API surface
Get-Content .\package\<component>\<component>.d.ts
# Read the .mjs for implementation details
Get-Content .\package\fesm2022\primeng-<component>.mjs
# Read interface files if they exist
Get-Content .\package\<component>\<component>.interface.d.ts
```

Document what PrimeNG does, then note every divergence our conventions require (see Step 2).

---

## Step 2 — API Design Decisions

These are the recurring design decisions that come up for every component. Resolve each one explicitly during the design phase.

### Naming & terminology mapping

| PrimeNG concept | ui-lib-custom equivalent | Notes |
|---|---|---|
| `variant` (filled/outlined) | `appearance` input | Our `variant` means material/bootstrap/minimal |
| `size="small"` / `size="large"` | `size="sm"` / `size="md"` / `size="lg"` | Always three tokens |
| `severity` | `severity` | Keep as-is if applicable |
| `p-` prefix | `uilib-` prefix | Host classes, CSS vars |
| `styleClass` | `styleClass` | Keep for escape-hatch styling |
| `@Input()` | `input()` / `model()` | Signal inputs only, never decorators |
| TypeScript `enum` | `as const` object + string union type | Public API uses the union, internals use the constant |

### Form integration checklist (if applicable)

- Does it need `ControlValueAccessor`? → implement via `forwardRef` + `NG_VALUE_ACCESSOR`
- Does it need `model()` for two-way binding? → use Angular's `model()` signal
- What is the value type? Define it explicitly (not `any`)
- Validation states: how does `ng-invalid` / `ng-dirty` / `ng-touched` surface visually?
- FloatLabel integration: does the component need `uilib-filled` / `uilib-inputwrapper-filled` / `uilib-inputwrapper-focus` host classes?

### Inputs audit

For every input the component will expose:

- Use `input<T>()` with an explicit type and default value
- Use `model<T>()` for two-way-bound values (e.g., `visible`, `value`)
- Use `output<T>()` for events (not `@Output()` + `EventEmitter`)
- String union types for public-facing options: `input<'sm' | 'md' | 'lg'>({ initialValue: 'md' })`
- Boolean inputs should default to `false` unless there's a strong UX reason otherwise
- `filled` is always a boolean input, never a variant string
- Provide sensible defaults so the component renders well with zero configuration

### Host bindings & classes

- Apply variant/size/state classes on the host element via `host` metadata, not a wrapper `<div>`
- Use `computed()` signals for derived host classes where needed
- Never generate global CSS — scope everything to component host selectors

---

## Step 3 — File & Entry Point Structure

Every new component gets a secondary entry point. The structure is strict:

```
projects/ui-lib-custom/
├── src/lib/<component>/
│   ├── index.ts                    # barrel — re-exports everything public
│   ├── <component>.component.ts
│   ├── <component>.component.html  # (or inline template if small)
│   ├── <component>.component.scss
│   ├── <component>.component.spec.ts
│   └── <component>.types.ts        # (if the component has non-trivial types)
├── <component>/                    # ← secondary entry point folder
│   ├── ng-package.json             # { "lib": { "entryFile": "../src/lib/<component>/index.ts" } }
│   └── package.json                # { "name": "ui-lib-custom/<component>" }
```

**Hard rules:**

- The secondary entry point folder contains **only** `ng-package.json` and `package.json` — no `public-api.ts`, no `src/` subfolder, no stale files.
- The primary `public-api.ts` must **not** re-export anything already owned by a secondary entry point.
- Cross-entry-point imports use package paths: `import { X } from 'ui-lib-custom/core'` — never `../core/`.
- After creating the entry point, update `package.json` `exports` and `typesVersions` fields.

---

## Step 4 — Styling Architecture

### CSS variable naming

All component tokens follow: `--uilib-<component>-<property>[-<state>]`

Examples:
```scss
--uilib-dialog-border-radius
--uilib-button-hover-background
--uilib-input-focus-border-color
```

### Variant styling

Every component supports three design variants: `material`, `bootstrap`, `minimal`. The variant is applied via a host class (e.g., `uilib-variant-material`) and styled with variant-specific SCSS blocks.

### Size tokens

Components that support sizing use `sm` / `md` / `lg`. Map these to CSS variables so the theme editor can adjust them.

### Theming rules

- No hardcoded hex colors or px values — always reference design tokens or CSS variables
- Component must react to theme changes at runtime without rebuild
- Use `ViewEncapsulation.None` (mandatory) so CSS variables cascade properly
- Animations: prefer CSS transitions/keyframes; keep them variant-aware

---

## Step 5 — Accessibility

Every component must address:

- **ARIA roles and attributes** — research the WAI-ARIA pattern for the component type (e.g., `role="dialog"`, `role="tablist"`, `role="combobox"`)
- **Keyboard navigation** — define which keys do what (Enter, Escape, Arrow keys, Tab, Home/End)
- **Focus management** — where does focus go on open/close? Is a focus trap needed?
- **Screen reader announcements** — use `aria-live` regions where dynamic content changes
- **Labels** — all interactive elements need accessible names (`aria-label`, `aria-labelledby`, or visible text)

Do not skip this. Research the correct ARIA pattern before implementation; do not guess.

---

## Step 6 — Testing Strategy

### Test setup

- Use Jest + `jest-preset-angular` (Karma is fully removed)
- Test host components must use `provideZonelessChangeDetection()` and `ChangeDetectionStrategy.OnPush`
- Reference existing test files for patterns — do **not** reference `AI_TEST_GUARD.md` (it does not exist); use `jest.config.ts` and existing `.spec.ts` files as the source of truth

### What to test

- **Rendering:** default state, each variant, each size
- **Inputs:** verify each input changes behavior/appearance correctly
- **Outputs:** verify events fire with correct payloads
- **Form integration** (if CVA): `ngModel` binding, reactive form binding, validation states, disabled state
- **Keyboard interaction:** every keyboard shortcut defined in the accessibility section
- **Edge cases:** empty states, maximum content, rapid toggling, null/undefined inputs

### Test file reference

Use `jest.config.ts` for configuration patterns. Look at existing component `.spec.ts` files for:
- Test host component setup patterns
- Signal input testing patterns
- How to trigger change detection in zoneless mode

---

## Step 7 — Prompt Sequence Structure

When generating the multi-prompt sequence for the agent, follow this established format:

### Each prompt contains:

1. **Context** — What the agent is building and where it fits in the library
2. **References** — Specific files to read first (always starts with `AI_AGENT_CONTEXT.md` and `LIBRARY_CONVENTIONS.md`)
3. **Task** — Step-by-step instructions for what to implement
4. **Constraints** — Hard rules that must not be violated
5. **Deliverable** — What files should exist when done, including a handoff note to `AI_AGENT_CONTEXT.md`

### Standard phase sequence:

| Phase | Purpose | Typical prompts |
|---|---|---|
| Research & Gap Analysis | Inspect PrimeNG source via `npm pack`, document API surface, identify convention divergences | 1 |
| API Design & Types | Define TypeScript types, interfaces, constants, input/output signatures | 1 |
| Scaffold & Entry Point | Create files, secondary entry point, wire up barrel exports | 1 |
| Core Implementation | Component class, template, form integration | 1–3 |
| Styling | SCSS for all three variants, CSS variables, animations | 1–2 |
| Testing | Unit tests covering rendering, interaction, accessibility, forms | 1–2 |
| Demo & Documentation | Demo page in the demo app, update `AI_AGENT_CONTEXT.md` | 1 |

### Prompt sequence rules:

- Note which prompts can run in parallel (e.g., styling and testing after core implementation)
- Every prompt ends with: build verification (`ng build ui-lib-custom`) and a handoff note update to `AI_AGENT_CONTEXT.md`
- Include an execution order table at the top of the prompt document with rationale and estimated effort
- Scale the number of prompts to complexity: layout wrappers get 3–5, form controls get 7–12

---

## Step 8 — Build & Verification

After every prompt completes, the agent must:

```powershell
# Build the library
ng build ui-lib-custom

# Run tests for the new component
npx jest --testPathPattern="<component>" --no-cache

# Serve the demo app to visually verify
ng serve demo
```

### Common build failures to watch for:

- **`Cannot destructure property 'pos'`** — cross-entry-point relative import. Fix: use package path.
- **Source file ownership conflict** — primary `public-api.ts` re-exports something a secondary entry point owns. Fix: remove the re-export from primary.
- **Missing export** — forgot to add to `index.ts` barrel. Fix: add it.
- **Implicit return type** — ESLint will catch this. Fix: add explicit return types to every method and function.

---

## Step 9 — Final Checklist

Before marking a component as complete:

- [ ] All inputs use `input()` / `model()` / `output()` signals — no decorators
- [ ] `ViewEncapsulation.None` and `ChangeDetectionStrategy.OnPush` on every component
- [ ] `as const` objects, no TypeScript enums
- [ ] String union types for public inputs, constants for internal strings
- [ ] CSS variables prefixed `--uilib-<component>-*`
- [ ] Three variants (material, bootstrap, minimal) styled
- [ ] Size tokens: `sm` / `md` / `lg`
- [ ] All methods and functions have explicit return types
- [ ] Angular block syntax (`@if`, `@for`, `@switch`) — no legacy directives
- [ ] Self-closing tags for components without projected content
- [ ] Cross-entry-point imports use package paths exclusively
- [ ] Secondary entry point folder contains only `ng-package.json` + `package.json`
- [ ] Primary `public-api.ts` does not re-export secondary entry point symbols
- [ ] `package.json` `exports` and `typesVersions` updated
- [ ] Unit tests pass with zoneless change detection
- [ ] Accessibility: ARIA roles, keyboard nav, focus management documented and tested
- [ ] `AI_AGENT_CONTEXT.md` component inventory updated
- [ ] Demo page created and visually verified
- [ ] `ng build ui-lib-custom` succeeds with zero warnings
- [ ] PowerShell used for all terminal commands
