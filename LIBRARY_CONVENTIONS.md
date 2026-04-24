# Angular UI Library Conventions

## Purpose

- Build a PrimeNG-like Angular library that is lighter, tree-shakable, and easy to theme/customize for new projects.
- Prioritize DX: predictable API shapes, sensible defaults, and minimal setup to swap themes or override styles.
  This library enables rapid project bootstrapping by providing:

1. Pre-built component variants (Material, Bootstrap, Minimal) for different aesthetics
2. Runtime theme customization via CSS variables
3. Theme presets that can be saved/loaded as JSON configs
4. A demo app with live preview and theme editor

## Active Conventions

Use this section for rules that still cause real regressions and should be checked on every task.

## AI Agent & Development Environment

> **Start here.** Before writing any code, read `AI_AGENT_CONTEXT.md` (project root) for the
> current component inventory, active work, and common task playbooks. Then read the relevant
> section of this file.

### Environment

- **Terminal:** Use **PowerShell** for all terminal commands. Never bash, cmd, or other shells.
- **Custom Components First:** Always use `ui-lib-*` components in demos and new features.
  Never reach for PrimeNG or Angular Material as a substitute when a custom equivalent exists.
  This enforces dogfooding, surfaces gaps, and ensures library consistency.

### Recommended Reading Order

1. `AI_AGENT_CONTEXT.md` — component inventory, file map, active work, task playbooks
2. `LIBRARY_CONVENTIONS.md` (this file) — all architectural rules and patterns
3. Component doc at `docs/reference/components/<n>.md` — if working on a specific component
4. `docs/architecture/` — if working on cross-cutting concerns (entry points, theming, tokens)

### Code Quality Checklist

Run through this mentally before submitting any output.

#### Active checks (enforce on every task)

- [ ] **ESLint passes with zero errors and zero warnings** — run `npx eslint <changed-files> --max-warnings 0` before declaring any task complete. This is non-negotiable: a passing build with lint errors is not a passing build.
- [ ] `ViewEncapsulation.None` present on every library component
- [ ] All return types are explicit — no inference on class members, public APIs, or `computed()`
- [ ] Cross-entry-point imports use package paths (`ui-lib-custom/theme`), not relative paths
- [ ] Public component inputs use string union types — not constants objects
- [ ] Self-closing tags used for all components without projected content
- [ ] No raw hex/px — all new tokens added to `design-tokens.ts` first
- [ ] If a new secondary entry point was added: `package.json` exports + `typesVersions` updated
- [ ] Component inventory in `AI_AGENT_CONTEXT.md` updated if component status changed

#### [Historical] Migration checks (lower priority; preserved for context)

- [ ] [Historical] No new TypeScript enums — use `as const` constant objects
- [ ] [Historical] Template uses `@if`/`@for`/`@switch` block syntax — no `*ngIf`/`*ngFor`

### Anti-Patterns (Common Mistakes)

These have caused real regressions. Active anti-patterns are still common traps; historical anti-patterns are migration-era reminders kept for context.

#### Active Anti-Patterns

| Anti-pattern | Why it's wrong | Correct approach |
|---|---|---|
| Relative import across entry points | Causes circular package graphs and ng-packagr build errors | Use `ui-lib-custom/<entry>` package paths for cross-entry imports |
| Missing `ViewEncapsulation.None` | CSS variables and animations do not cascade correctly | Always add it — no exceptions |
| Type inference on `computed()` arrow functions | ESLint `allowTypedFunctionExpressions: false` will fail the build | Always annotate: `computed<MyType>((): MyType => ...)` |
| Replacing public string union types with constants | Breaks the public API contract for consumers | Only extract *internal* repeated strings; leave public types as union literals |
| Padding on the `overflow: hidden` collapse wrapper | Padding "leaks" visibly during `grid-row` animation | Use three layers: clip wrapper -> padding wrapper -> content |
| Creating `public-api.ts` inside secondary entry folders | Not the established convention; ng-packagr handles it | `ng-package.json` points directly to `../src/lib/<n>/index.ts` |
| Inlining raw hex or px values | Bypasses the design token system | Add to `design-tokens.ts`, derive a `--uilib-*` CSS variable |
| Adding PrimeNG/Material components to demo pages | Undermines dogfooding; surfaces library gaps incorrectly | Use `ui-lib-*` equivalents; document gap in component inventory if none exists |

#### [Historical] Resolved Anti-Patterns (Migration Notes)

| Anti-pattern | Why it's wrong | Correct approach |
|---|---|---|
| [Historical] `enum` instead of `as const` | Enums add runtime overhead and reduce tree-shaking | Use `export const MY_THING = { ... } as const` |
| [Historical] Using `*ngIf` / `*ngFor` | Legacy syntax inconsistent with Angular 21 codebase | Use `@if`, `@for (x of y; track z)`, `@switch` |

### Session Handoff Protocol

At the end of every productive session, output a brief handoff note and paste it into the
"Last Session" section of `AI_AGENT_CONTEXT.md`:

```
Date: YYYY-MM-DD
Changed: <what files/components were modified>
State: <what is complete, what is in-progress>
Next step: <the single most logical next action>
```

This is mandatory. It closes the loop between sessions and eliminates re-explanation of context.

## Framework & Architecture

- Angular 21+, standalone components only, `ChangeDetectionStrategy.OnPush`, signals for inputs/derived state.
- Host-first: avoid wrapper elements; apply styles via host bindings instead of extra DOM nodes.
- Strong typing on all inputs; provide defaults so components render well without configuration.
- Barrel exports stay tree-shakable; keep `sideEffects: false` and avoid global side effects.
- Templates should use Angular 21 block syntax (`@if/@else`, `@for` with `track`, `@switch`) for consistency in all new or touched code. Migration rationale is documented in `Historical Migration Notes`.
- **HTML Special Characters**: Always escape special characters in templates that could be interpreted by Angular. Use `&#123;` for `{` and `&#125;` for `}` when displaying literal braces (e.g., in code examples or documentation). Alternatively, use `{{ '{' }}` and `{{ '}' }}` for interpolation-safe output.
- **Self-Closing Tags**: Use Angular's self-closing tag syntax whenever possible for cleaner, more concise templates. Prefer `<ui-lib-button />` over `<ui-lib-button></ui-lib-button>`. This applies to all components without projected content.
- **Explicit Typing**: Always provide explicit type annotations for return types, variables, and function parameters. Never rely on type inference for public APIs, class members, or any non-trivial expressions.

  ```typescript
  // ❌ Bad - implicit return type
  get viewportPresets() {
    return this.viewport?.presets() ?? [];
  }

  // ✅ Good - explicit return type
  get viewportPresets(): ViewportPreset[] {
    return this.viewport?.presets() ?? [];
  }

  // ❌ Bad - implicit types
  const items = [];
  const config = { ... };

  // ✅ Good - explicit types
  const items: MenuItem[] = [];
  const config: ThemeConfig = { ... };

  // ❌ Bad - implicit parameter and return types
  function processItems(items) {
    return items.map(i => i.name);
  }

  // ✅ Good - explicit parameter and return types
  function processItems(items: Item[]): string[] {
    return items.map(i => i.name);
  }
  ```

## Code Style

### Inline Variables (Avoid Single-Use Assignments)

Do not assign a value to a named variable only to immediately `return` or pass it.
Inline it directly instead.

❌ Avoid:
```ts
const context: TabsContextItem = { ... };
return context;
```

✅ Prefer:
```ts
return { ... } satisfies TabsContextItem;
```

Use `satisfies Type` instead of `: Type` annotation when inlining a returned object literal,
as type annotations cannot be applied directly to return expressions without a variable.

**Exceptions — keep the variable when:**
- It is referenced more than once
- Naming it significantly clarifies complex logic
- A temporary debug breakpoint is intentional (remove before committing)

### Meaningful Names (No Abbreviations)

Always use full, descriptive names for variables, parameters, functions, and class members.
Do not shorten names to save keystrokes — the reader's comprehension matters more than the writer's convenience.

❌ Avoid:
```ts
function processBtn(e: Event, cfg: ButtonConfig): void { ... }
const idx = items.findIndex(i => i.val === target);
```

✅ Prefer:
```ts
function processButton(event: Event, config: ButtonConfig): void { ... }
const index = items.findIndex(item => item.value === target);
```

**Common offenders:**

| Shortcut | Meaningful name |
|---|---|
| `btn` | `button` |
| `e`, `evt` | `event` |
| `val` | `value` |
| `cfg` | `config` |
| `idx` | `index` |
| `el`, `elem` | `element` |
| `cb` | `callback` |
| `fn` | describe what it does: `handler`, `predicate`, `formatter` |
| `arr` | describe the contents: `items`, `options`, `entries` |
| `obj` | describe the shape: `config`, `preset`, `context` |
| `res` | `response` |
| `err` | `error` |
| `arg` | name what the argument actually represents |

**Allowed exceptions:**
- `id` — universally understood
- `url` — universally understood
- `i`, `j` — only inside classic `for` loops of 3 lines or fewer

### Separate Template Files

Always use a separate `.html` template file for components. Do not use inline `template` in the component decorator.

❌ Avoid:
```ts
@Component({
  selector: 'ui-lib-button',
  template: `<button>{{ label }}</button>`,
})
```

✅ Prefer:
```ts
@Component({
  selector: 'ui-lib-button',
  templateUrl: './button.component.html',
})
```

Same applies to styles — prefer `styleUrl` over inline `styles`.

### Explicit Method Return Types

Always specify the return type on every method, getter, and function.
Never rely on TypeScript inference for return types.

❌ Avoid:
```ts
getItems() {
  return this.items();
}
```

✅ Prefer:
```ts
getItems(): TabItem[] {
  return this.items();
}
```

Applies to: class methods, getters, arrow functions assigned to class members, and lifecycle hooks.

## API Surface (PrimeNG-inspired)

- Prefix selectors with `ui-lib-`. Inputs favor these patterns: `variant/appearance`, `severity|color`, `size`, `shape`, `state` (`disabled`, `loading`, `active`, `readonly`), `fullWidth`, `iconPosition`.
- Keep inputs declarative; avoid imperative setters. Derived values must use `computed()`.
- Favor composition via content projection over configuration explosion; expose lightweight structural parts (`header`, `footer`, `prefix`, `suffix` slots).
- Template control flow follows the Angular 21 block syntax (`@if/@for/@switch`) and signal-friendly bindings; no imperative DOM tweaks.

## Styling & Theming

- SCSS for authoring; output uses CSS custom properties for runtime theming. No `::ng-deep` or global resets.
- Author component styles in SCSS only (no `.css` files); share mixins/variables and pull values from design tokens or CSS vars.
- CSS custom property naming:
  - Standard pattern: `--uilib-{component}-{property}[-{variant}][-{state}]`.
  - Component parts follow the component name (for example: `--uilib-accordion-header-padding`).
  - Variants append after the property (for example: `--uilib-card-shadow-material`).
  - States append last (for example: `--uilib-button-bg-hover`).
  - Reserved global prefixes (system tokens only):
    - `--uilib-color-*`, `--uilib-spacing-*`, `--uilib-radius-*`, `--uilib-shadow-*`, `--uilib-font-*`,
      `--uilib-transition-*`, `--uilib-z-*`, `--uilib-surface`/`--uilib-surface-*`, `--uilib-page-*`.
  - Avoid unprefixed or underscored variables (`--ui-*`, `--_tabs-*`) in public API.
- Theming layers (do not bypass):
  1. **Design tokens** (`design-tokens.ts`) define canonical values.
  2. **CSS variables**: expose tokens as `--uilib-*` on `:root` or `[data-theme]` scopes.
  3. **Component variables**: map CSS vars to component-specific fallbacks (e.g., `--uilib-button-bg`, `--uilib-card-shadow`).
  4. **State tokens**: hover/active/disabled values derived via CSS vars, not hardcoded colors.
- Theme switching: toggle `[data-theme="light|dark|brand-x"]` on `html/body`; each theme file sets only CSS vars.
- Tailwind-compatible: selectors stay simple, no mandatory global styles; allow consumers to set CSS vars via Tailwind `theme()` in `:root`.
- Typography mapping (via CSS vars):
  - Headings (`h1`-`h6`, `.heading`): `var(--uilib-font-heading)` + `--uilib-font-heading-weight`.
  - Body copy (`p`, `.body-text`): `var(--uilib-font-body)` + `--uilib-font-body-weight`.
  - UI text (buttons, labels, nav, form controls, `.btn`): `var(--uilib-font-ui)`.
  - Monospace (`code`, `pre`, `.monospace`): `var(--uilib-font-mono)`.
  - Theme presets supply these via `ThemePresetTypography`; `fontFamily` remains a backward-compatible alias for body/UI fonts.
- **View Encapsulation**: All library components **must** use `ViewEncapsulation.None`. This is critical for CSS variable cascading and transitions/animations to work correctly across component boundaries. Angular's default emulated encapsulation breaks theming by scoping selectors with `_ngcontent-*` attributes.
```typescript
  import { ViewEncapsulation } from '@angular/core';

  @Component({
    // ...
    encapsulation: ViewEncapsulation.None,  // Required for all ui-lib-* components
  })
```

## Theming

### Dark Mode

- All components support light and dark modes via CSS custom properties.
- Use `data-theme="dark"` on `html`/`body` (or a container) for global dark mode.
- Use `ThemeConfigService.setMode('auto' | 'light' | 'dark')` for programmatic control.
- System preference detection uses `prefers-color-scheme` when mode is `auto`.

### Theme Export

- **JSON**: Full preset configuration for persistence and sharing.
- **CSS**: CSS custom properties for runtime theming.
- **SCSS**: SCSS variables or map output for build-time usage.
- **Figma**: Tokens Studio-compatible JSON for design handoff.

### Scoped Theming

- Use `[uiLibTheme]` to scope a theme to a subtree.
- Use `theme` input on components that expose it (e.g., `ui-lib-card`).
- Nested scopes override parent scopes via CSS cascade.

## CSS Custom Properties Naming Convention

All CSS custom properties MUST follow this pattern:

`--uilib-{component}-{property}[-{state}]`

### Examples

- `--uilib-button-bg`
- `--uilib-button-bg-hover`
- `--uilib-select-dropdown-bg`
- `--uilib-accordion-header-padding`
- `--uilib-card-shadow`

### Reserved Global Prefixes

- `--uilib-color-*`        Color palette tokens
- `--uilib-spacing-*`      Spacing tokens
- `--uilib-radius-*`       Border radius tokens
- `--uilib-shadow-*`       Shadow tokens
- `--uilib-font-*`         Typography tokens
- `--uilib-surface`        Surface colors
- `--uilib-page-*`         Page-level variables

### Adding New Variables

1. Check if a design token exists first.
2. Use component name as first segment.
3. Use descriptive property name.
4. Add state suffix for interactive states (`-hover`, `-active`, `-disabled`).
5. Document in component SCSS with comments.

## Design Tokens

- Source of truth: `projects/ui-lib-custom/src/lib/design-tokens.ts` (spacing, colors, typography, shadows, z-index, transitions, sizing).
- Do not inline raw hex/px in components; reference tokens or CSS vars derived from them.
- If a token is missing, add to `design-tokens.ts` with typed keys before using it.

## Accessibility & UX

- ARIA-first: label every interactive element; honor `aria-disabled` when `disabled` is set.
- Keyboard support: tab focus, Enter/Space activation where appropriate; maintain visible focus ring (do not remove outline without replacement).
- Contrast: base tokens should meet WCAG AA by default; document any exceptions.

## Testing & Quality

- Unit tests per component (`*.spec.ts`) cover creation, input changes (signals), classes/styles, projected content, and accessibility roles.
- Jest is the sole test runner. Do not add Karma or Jasmine. Use `jest.fn()` / `jest.spyOn()` for mocks.
- Test scripts:
  - `npm test`
  - `npm run test:watch`
  - `npm run test:coverage`
- Run `npm test` in CI; add visual/diff tests later for theme regressions.

## Packaging & Releases

- Built with `ng-packagr`; public surface defined in `projects/ui-lib-custom/src/public-api.ts` only.
- Keep exports flat; prefer per-component entry points for tree-shaking.
- Semantic versioning; document breaking changes in `docs/project/UPDATE_LOG.md`.

## Entry Points & Tree-Shaking

- Each component or feature should have a secondary entry point under `projects/ui-lib-custom/<entry>/`.
- Each entry point must include `ng-package.json`; `public-api.ts` is optional. The `ng-package.json` may point directly to `src/lib/<name>/index.ts` (current convention).
- Avoid re-exporting secondary entry points from the primary barrel to prevent circular package graphs.
- If a new entry point is added, update `projects/ui-lib-custom/package.json` exports and `typesVersions`.
- Keep entry point public APIs narrow and stable; internal code should import via relative `src/lib/...` paths.
- The `<entry>/src/` subfolder pattern is not used; do not create `public-api.ts` files inside secondary entry point folders.

## Documentation & Demos

- Update `docs/` when adding or changing components (API, usage, theming knobs, accessibility notes).
- Demo app lives in `projects/demo`; provide at least one example per component and per theme.
- Demos and docs should showcase the Angular 21 block syntax and SCSS usage (e.g., `@if`/`@for` plus token-driven SCSS snippets).
- Use TS path aliases for demo code: `@demo/shared/*` for shared utilities/components and `@demo/pages/*` for pages; keep them updated in `tsconfig.json` when moving files.

## Contribution Guidelines

- Maintain OnPush + signals + standalone pattern.
- Align new components to the API shape and theming layers above.
- No silent global CSS; scope everything to component hosts and CSS vars.

## Changelog & Versioning

- Maintain `CHANGELOG.md` at the project root.
- Follow the Keep a Changelog format.
- Follow Semantic Versioning.
- Document breaking changes immediately.
- Create migration guides for major/minor versions with breaking changes.

### Key Architectural Decisions

- **Variants** define structural/visual differences (e.g., floating label vs top label)
- **Themes** define colors, spacing, and shape via CSS variables
- Variants are chosen at component level; themes apply globally
- All components must react to theme changes without rebuild

## Comments

### When to comment
- **Always**: non-obvious logic, workarounds, ARIA decisions, CSS variable naming rationale
- **Never**: obvious code (`// increment counter` above `count++`)
- **Public API**: all exported classes and inputs must have JSDoc descriptions

### Format
- Prefer `//` for inline explanations
- Use `/** */` JSDoc for all exported symbols
- Reference related specs or issues for workarounds: `// See: https://...`

## Historical Migration Notes

These rules mattered during earlier migration phases and are preserved for onboarding context.
They are lower-priority checks compared to Active Conventions, but still documented to avoid backsliding.
All items in this section are labeled with `[Historical]` for quick scanning.

### [Historical] Angular Template Syntax Migration

- [Historical] During Angular 21 migration, the codebase standardized on block syntax.
- [Historical] Prefer `@if`, `@for`, and `@switch` over legacy `*ngIf`/`*ngFor` in all maintained code.
- [Historical] Legacy structural directives are considered resolved anti-patterns for this repository.

### [Historical] Constants & Enums

- [Historical] **Never use TypeScript `enum`**. Prefer `as const` objects — they have no runtime overhead,
  tree-shake cleanly, and compose naturally with string union types.
```typescript
  // ❌ Avoid
  enum ButtonSize { Sm = 'sm', Md = 'md', Lg = 'lg' }

  // ✅ Prefer
  export const BUTTON_SIZES = { Sm: 'sm', Md: 'md', Lg: 'lg' } as const;
  export type ButtonSize = typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES];
```

- [Historical] **Public input types stay as string unions** (`type InputVariant = 'material' | 'bootstrap' | 'minimal'`).
  Do not replace these with enums or const objects — string unions are more ergonomic for consumers.

- [Historical] **Extract repeated internal strings to a co-located constants file** (`[component].constants.ts`)
  when a literal appears 2 or more times within the same component. This applies to CSS class names,
  ARIA attribute strings, and default value strings used in logic.

- [Historical] **Shared cross-component constants** belong in `src/lib/shared/constants.ts`. Only move a
  constant there if it is used in 3 or more components. Avoid over-centralizing component-specific values.

- [Historical] Do not export component-internal constants from secondary entry points unless they are
  explicitly part of the public API contract.
