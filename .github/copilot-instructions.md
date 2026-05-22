# GitHub Copilot Instructions — ui-lib-custom

This is an **Angular component library** with secondary-entry-point architecture, signals-first, accessibility-native, and design-token-driven. Follow every rule below before generating or modifying any code.

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

## §4 Pre-Generation Checklist

Before generating code, answer:
- [ ] Does this component already exist in `projects/ui-lib-custom/src/lib/`?
- [ ] Which entry point will it belong to (primary barrel or a secondary entry)?
- [ ] What are the ARIA roles and keyboard interactions required? (a11y first)
- [ ] Which design tokens will it consume (`--uilib-*`)?
- [ ] Is `ViewEncapsulation.None` used? (never `Emulated`)
- [ ] Will this be added to `public-api.ts`?
- [ ] Is a Storybook story planned?
- [ ] Is `jest-axe` covered in the spec?

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

| Rule | Why |
|------|-----|
| `@typescript-eslint/no-explicit-any` | Type safety — use generics or specific types |
| `@typescript-eslint/explicit-function-return-type` | Prevents inference surprises |
| `@typescript-eslint/no-floating-promises` | Unhandled promises cause silent failures |
| `@typescript-eslint/prefer-readonly` | Immutability by default |
| `@angular-eslint/prefer-on-push-component-change-detection` | Performance non-negotiable |
| `@angular-eslint/component-max-inline-declarations` | Keep templates external |
| `no-console` | Use a logger service, not console |

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

| ❌ Never | ✅ Instead |
|----------|-----------|
| `ViewEncapsulation.Emulated` | `ViewEncapsulation.None` |
| Hardcoded colours in SCSS | `var(--uilib-color-primary)` design tokens |
| `@Input() value: string` | `value = input<string>()` |
| `@Output() changed` | `changed = output<void>()` |
| Styles in component TypeScript | External `.scss` file |
| NgModules | Standalone components with `imports: [...]` |
| Relative cross-entry-point imports | Use `ui-lib-custom/theme` package path |
| Export internal types in barrel | Keep internal types internal |
| Skip jest-axe in spec | Always add a11y assertion |
| Skip Storybook story | Every component needs a story |

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

