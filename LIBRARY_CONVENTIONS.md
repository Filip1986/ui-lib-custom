# Angular UI Library Conventions

## Purpose

- Build a PrimeNG-like Angular library that is lighter, tree-shakable, and easy to theme/customize for new projects.
- Prioritize DX: predictable API shapes, sensible defaults, and minimal setup to swap themes or override styles.
  This library enables rapid project bootstrapping by providing:

1. Pre-built component variants (Material, Bootstrap, Minimal) for different aesthetics
2. Runtime theme customization via CSS variables
3. Theme presets that can be saved/loaded as JSON configs
4. A demo app with live preview and theme editor

## AI Agent & Development Environment

- **Terminal**: Use **PowerShell** for all terminal commands. Do not use bash, cmd, or other shells.
- **Custom Components First**: When building new features, components, or demos within this library, always prefer using the library's own custom components (`ui-lib-*`) over third-party alternatives (e.g., PrimeNG, Angular Material) whenever a suitable custom component exists. This ensures dogfooding, consistency, and helps identify gaps in the component library.

## Framework & Architecture

- Angular 21+, standalone components only, `ChangeDetectionStrategy.OnPush`, signals for inputs/derived state.
- Host-first: avoid wrapper elements; apply styles via host bindings instead of extra DOM nodes.
- Strong typing on all inputs; provide defaults so components render well without configuration.
- Barrel exports stay tree-shakable; keep `sideEffects: false` and avoid global side effects.
- Templates use Angular 21 block syntax (`@if/@else`, `@for` with `track`, `@switch`); avoid legacy structural directives (`*ngIf/*ngFor`) in new code.
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
