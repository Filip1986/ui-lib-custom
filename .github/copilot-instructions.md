# GitHub Copilot Instructions — ui-lib-custom

This is an **Angular component library** with secondary-entry-point architecture, signals-first, accessibility-native, and design-token-driven. Follow every rule below before generating or modifying any code.

> **Legacy — migrating to `platform/libs/ui`.** For workspace context read `operator-hq:WORKSPACE.md`
> (SenseAtlas) and `operator-hq:AI_AGENT_CONTEXT.md` before cross-repo work.

---

## §1 Project Overview

`ui-lib-custom` is a next-generation Angular UI library with three projects in `angular.json`:

- `projects/ui-lib-custom` — the library (secondary-entry-point tree-shaking architecture)
- `projects/demo` — live demo application with Theme Editor
- `projects/minimal` — minimal app for tree-shaking verification

**Entry points (import from these — never from internal paths):**

```typescript
import { ... } from 'ui-lib-custom';                  // primary barrel
import { ... } from 'ui-lib-custom/theme';             // theme services
import { ... } from 'ui-lib-custom/tokens';            // design tokens
import { ... } from 'ui-lib-custom/core';              // shared types
import { ... } from 'ui-lib-custom/a11y';              // a11y helpers
import { ... } from 'ui-lib-custom/testing';           // test utilities
```

**Component location:** `projects/ui-lib-custom/src/lib/<component-name>/`

---

## §2 Component Creation Rules

Before generating a new component:

1. Check if it already exists under `projects/ui-lib-custom/src/lib/`
2. Read `COMPONENT_CREATION_GUIDE.md` for the exact file scaffold
3. Every component **must** have:
   - A `*.spec.ts` unit test with `jest-axe` a11y assertion
   - A `*.stories.ts` Storybook story
   - An `index.ts` barrel exporting the public API
   - Entry in `public-api.ts`

**Required file structure for each component:**

```
projects/ui-lib-custom/src/lib/<name>/
├── <name>.ts              ← component class
├── <name>.html            ← template
├── <name>.scss            ← styles
├── <name>.spec.ts         ← unit tests + jest-axe
├── <name>.stories.ts      ← Storybook story
└── index.ts               ← barrel export
```

**Every component must use:**

```typescript
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,   // NEVER Emulated
  // ...
})
```

---

## §3 Library Conventions

From `LIBRARY_CONVENTIONS.md`:

- **ViewEncapsulation.None** — global CSS; use BEM naming + `uilib-` prefix to avoid collisions
- **No styles in TypeScript** — all styles in `.scss` files
- **Design tokens first** — never hardcode colours; use `--uilib-*` CSS custom properties defined in `design-tokens.ts`
- **No relative cross-entry-point imports** — use `ui-lib-custom/theme`, not `../../theme/...`
- **Public API hygiene** — only export what consumers need from `index.ts`; internal types stay internal
- **`input()` / `output()`** — not `@Input()` / `@Output()` decorators
- **String unions for public Input types** — not exported constant objects

---

## §3b Styling Standards

> Violations are caught automatically by **stylelint** (`npm run lint:css`).
> Token prefix: `--uilib-*`. Source of truth: `projects/ui-lib-custom/src/lib/themes/`.

### Non-negotiable rules

- All styles in `.scss` files — never inline
- **`ViewEncapsulation.None`** everywhere — styles are global; BEM + `uilib-` prefix are the ONLY collision guard
- Every colour and font-size must use `var(--uilib-*)` — no raw hex, rgb(), or named colours
- New colour tokens defined in `oklch()` — not raw hex
- BEM naming strictly: `.uilib-button__icon--disabled`
- No `!important` unless overriding consumer themes (comment and document why)
- Specificity low: classes only — no ID selectors, no element-qualified selectors
- Nesting depth ≤ 2 levels
- No `transition: all` — name specific properties
- Use logical properties (`margin-inline-start`, `padding-block`) for RTL-safe spacing

### Native CSS first

| Feature                       | Use for                                                             |
| ----------------------------- | ------------------------------------------------------------------- |
| `@layer`                      | Explicit override hierarchy for theme layers                        |
| Container queries             | Component adapts to its container — critical for a library          |
| `clamp()` / `min()` / `max()` | Fluid sizing without consumer breakpoint coupling                   |
| `:has()`                      | Relational selectors — reduces JS state management                  |
| Logical properties            | RTL/i18n support in every spacing value                             |
| `oklch()` / `color-mix()`     | Perceptually-uniform colours; generate palette variants dynamically |
| Subgrid                       | Nested grid alignment in compound components                        |
| `animation-timeline`          | Scroll/viewport animations — no JS observers                        |

### Performance

- Animate only `transform` and `opacity` — never layout-triggering properties
- `content-visibility: auto` for any component with a long list (virtualised scrollers, tables)
- No `will-change` in component CSS — it wastes memory for every instance

### Linting

```bash
npm run lint:css        # check
npm run lint:css:fix    # auto-fix what's possible
npm run lint:css:ci     # CI mode — zero warnings
```

---

## §3c HTML / Template Standards

> Full reference, examples, and review checklist: [`docs/standards/HTML-STANDARDS.md`](../docs/standards/HTML-STANDARDS.md)

### Semantic HTML in components

- `<button type="button">` for actions — never `<div>` or `<span>`
- `<a href>` for navigation — never `<button>` for links
- Data grids: `<table>`, `<th scope="col/row">`, `<td>` — never `<div>` nests
- Lists of options: `<ul>` + `<li>` or ARIA `role="listbox"` / `role="option"` as appropriate
- **No `<h1>`–`<h3>` hard-coded** in library components — heading level must be configurable or use `aria-labelledby`

### Angular template rules

- Block syntax only: `@if` / `@for` / `@switch` — banned by ESLint (`prefer-control-flow: error`)
- `@for` must have `track` on a stable identity property (`track item.id`)
- Self-closing tags for all components without projected content: `<uilib-spinner />` not `<uilib-spinner></uilib-spinner>`
- No method calls in template expressions — `computed()` signals only

### Accessibility (critical for a library)

- Every interactive element must have an accessible label — expose `label` / `ariaLabel` as `input()` when context-dependent
- ARIA widget roles need **all required properties**: `role="listbox"` needs `aria-label`, `aria-activedescendant`; `role="option"` needs `aria-selected`
- Keyboard interactions must follow the WAI-ARIA design pattern for the widget type
- Disabled state: wire **both** `[attr.disabled]` and `[attr.aria-disabled]` in host bindings
- Decorative icons: `aria-hidden="true"`; standalone icon buttons: `[attr.aria-label]` bound to input

### Native interactive primitives

- **`<details>`/`<summary>`** for simple disclosure/accordion — native, accessible, no JS
- **`<dialog>`** for modal patterns — provides focus trap, `Escape`, backdrop, `aria-modal` natively
- **Popover API** (`[attr.popover]`) for non-modal overlays where CDK Overlay is overkill

### Content projection

- `ng-content` inside `@if` does **NOT** gate projection — use CSS visibility pattern instead
- Slot names must use `uilib-` prefix and describe semantic purpose (not position): `uilib-card-actions` not `bottom-right`

### Images

- `alt` text on all `<img>` elements (informative) or `alt=""` + no `role` (decorative)
- Always set `width` and `height` on `<img>` to prevent consumer-side CLS
- Bind dimensions: `[attr.width]="width()" [attr.height]="height()"`

### Linting (template)

```bash
npm run lint        # ESLint — covers all .ts and .html files
```

Key template rules active (`error`): `alt-text`, `elements-content`, `label-has-associated-control`, `no-positive-tabindex`, `valid-aria`, `role-has-required-aria`, `prefer-control-flow`

Key template rules active (`warn`): `click-events-have-key-events`, `interactive-supports-focus`, `use-track-by-function`, `prefer-self-closing-tags`

---

## §4 Pre-Generation Checklist

Before generating code, answer:

**Architecture**

- [ ] Does this component already exist in `projects/ui-lib-custom/src/lib/`?
- [ ] Which entry point will it belong to (primary barrel or a secondary entry)?
- [ ] Will this be added to `public-api.ts`?
- [ ] Is a Storybook story planned?

**Accessibility (answer before writing HTML)**

- [ ] What ARIA role does this widget have? What are all required ARIA properties?
- [ ] What is the complete keyboard interaction pattern (WAI-ARIA design patterns)?
- [ ] Is label/name exposed as a configurable `input()` for contextual cases?
- [ ] Is `jest-axe` covered in the spec?

**HTML / Template**

- [ ] Correct semantic element used — no `<div>`/`<span>` for interactive roles
- [ ] No `<h1>`–`<h3>` hard-coded — heading level configurable or `aria-labelledby` used
- [ ] `@if` / `@for` / `@switch` syntax — no `*ngIf` / `*ngFor`
- [ ] `@for` has `track` on stable identity
- [ ] Self-closing tags for elements without projected content
- [ ] No method calls in template expressions — `computed()` used
- [ ] `ng-content` NOT inside `@if` — CSS visibility pattern used instead
- [ ] Slot names use `uilib-` prefix and are semantic (not positional)
- [ ] `<img>` has `alt`, `width`, `height`; icons have `aria-hidden="true"` or `aria-label`
- [ ] `npm run lint` passes — no new ESLint template errors

**CSS / Styling**

- [ ] Is `ViewEncapsulation.None` used? (never `Emulated`)
- [ ] BEM class names all prefixed with `uilib-`? (collision guard)
- [ ] All colours/font-sizes use `var(--uilib-*)` — no raw hex?
- [ ] New colour tokens defined in `oklch()`?
- [ ] Logical properties used for spacing (not margin-left/padding-right)?
- [ ] Nesting depth ≤ 2 levels; no ID selectors?
- [ ] Animations use only `transform`/`opacity`; `transition: all` not used?
- [ ] `@media (prefers-reduced-motion: reduce)` present for every animation?
- [ ] `npm run lint:css` passes — no new stylelint errors?

---

## §5 Testing Rules

**Every component spec must include a jest-axe assertion:**

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const fixture = TestBed.createComponent(MyComponent);
  fixture.detectChanges();
  const results = await axe(fixture.nativeElement);
  expect(results).toHaveNoViolations();
});
```

**Test setup:**

```typescript
TestBed.configureTestingModule({
  imports: [MyComponent],
  providers: [provideZonelessChangeDetection()],
});
```

**Running tests:**

```bash
npm test                    # unit tests
npm run test:coverage       # with coverage (threshold: 90%)
npm run test:a11y           # a11y-specific tests (*.a11y.spec.ts)
npm run test:a11y:e2e       # Playwright a11y E2E
npm run test:all            # all unit tests
```

---

## §6 ESLint Rules in Force

Key rules — these will block your commit:

| Rule                                                        | Why                                          |
| ----------------------------------------------------------- | -------------------------------------------- |
| `@typescript-eslint/no-explicit-any`                        | Type safety — use generics or specific types |
| `@typescript-eslint/explicit-function-return-type`          | Prevents inference surprises                 |
| `@typescript-eslint/no-floating-promises`                   | Unhandled promises cause silent failures     |
| `@typescript-eslint/prefer-readonly`                        | Immutability by default                      |
| `@angular-eslint/prefer-on-push-component-change-detection` | Performance non-negotiable                   |
| `@angular-eslint/component-max-inline-declarations`         | Keep templates external                      |
| `no-console`                                                | Use a logger service, not console            |

Run `npm run lint:fix` to auto-fix where possible. Run `npm run lint:ci` (0 warnings) before committing.

---

## §7 Branch + Commit Rules

**Branch naming:**

- `feat/<scope>-<description>` — new features
- `fix/<scope>-<description>` — bug fixes
- `docs/<description>` — documentation only
- `chore/<description>` — tooling, deps, config

**Commit scopes:** `lib` | `demo` | `minimal` | `theme` | `tokens` | `a11y` | `storybook` | `deps` | `ci` | `release` | `workspace`

**Commit examples:**

```
feat(lib): add accessible tooltip component
fix(a11y): correct focus trap in modal
chore(deps): update @angular/core to 21.x
```

**One logical change per commit.** If the message needs "and", split the commit.

---

## §8 What NOT To Do

| ❌ Never                                        | ✅ Instead                                                 |
| ----------------------------------------------- | ---------------------------------------------------------- |
| `ViewEncapsulation.Emulated`                    | `ViewEncapsulation.None`                                   |
| Hardcoded colours in SCSS (`#2563eb`)           | `var(--uilib-color-primary)` design tokens                 |
| Raw hex in new token definitions                | `oklch(57% 0.24 264)`                                      |
| `margin-left` / `padding-right`                 | Logical: `margin-inline-start` / `padding-inline-end`      |
| `transition: all`                               | Name specific properties: `transition: opacity 150ms ease` |
| Animating `width`, `height`, `background-color` | `transform` + `opacity` only                               |
| Nesting deeper than 2 levels                    | Flat BEM classes                                           |
| ID selectors in component CSS                   | Classes only                                               |
| `@Input() value: string`                        | `value = input<string>()`                                  |
| `@Output() changed`                             | `changed = output<void>()`                                 |
| Styles in component TypeScript                  | External `.scss` file                                      |
| NgModules                                       | Standalone components with `imports: [...]`                |
| Relative cross-entry-point imports              | Use `ui-lib-custom/theme` package path                     |
| Export internal types in barrel                 | Keep internal types internal                               |
| Skip jest-axe in spec                           | Always add a11y assertion                                  |
| Skip Storybook story                            | Every component needs a story                              |
| `<div>` or `<span>` for interactive elements    | `<button type="button">` or `<a href>`                     |
| Hard-coded `<h1>`–`<h3>` in library components  | Configurable heading level input or `aria-labelledby`      |
| Icon-only button without `aria-label`           | `[attr.aria-label]="label()"` bound from input             |
| `*ngIf` / `*ngFor` structural directives        | `@if` / `@for` block syntax                                |
| `ng-content` inside `@if`                       | CSS visibility pattern (`[class.hidden]`)                  |
| Positional slot names (`[top-left]`)            | Semantic slot names (`uilib-card-actions`)                 |

---

## §9 Build and Release

```bash
# Build library
npm run build              # ng build ui-lib-custom

# Build demo app
npm run build:demo

# Verify tree-shaking (modifies minimal app temporarily)
npm run verify:tree-shaking

# Check bundle size
npm run bundlesize

# Full quality check before release
npm run check              # lint:ci + typecheck + test

# Local publish testing
npm pack                   # creates tarball for manual testing
# or use verdaccio for a local registry

# Release (manual)
# 1. Update CHANGELOG.md
# 2. Bump version in package.json
# 3. npm run build
# 4. npm run verify:tree-shaking
# 5. npm run test
# 6. git commit -m "release: vX.Y.Z"
# 7. git tag vX.Y.Z
# 8. git push && git push --tags
# 9. npm publish (from dist/ui-lib-custom)
```
