# Angular UI Library Conventions

## Purpose
- Build a PrimeNG-like Angular library that is lighter, tree-shakable, and easy to theme/customize for new projects.
- Prioritize DX: predictable API shapes, sensible defaults, and minimal setup to swap themes or override styles.
  This library enables rapid project bootstrapping by providing:
1. Pre-built component variants (Material, Bootstrap, Minimal) for different aesthetics
2. Runtime theme customization via CSS variables
3. Theme presets that can be saved/loaded as JSON configs
4. A demo app with live preview and theme editor


## Framework & Architecture
- Angular 21+, standalone components only, `ChangeDetectionStrategy.OnPush`, signals for inputs/derived state.
- Host-first: avoid wrapper elements; apply styles via host bindings instead of extra DOM nodes.
- Strong typing on all inputs; provide defaults so components render well without configuration.
- Barrel exports stay tree-shakable; keep `sideEffects: false` and avoid global side effects.
- Templates use Angular 21 block syntax (`@if/@else`, `@for` with `track`, `@switch`); avoid legacy structural directives (`*ngIf/*ngFor`) in new code.

## API Surface (PrimeNG-inspired)
- Prefix selectors with `ui-lib-`. Inputs favor these patterns: `variant/appearance`, `severity|color`, `size`, `shape`, `state` (`disabled`, `loading`, `active`, `readonly`), `fullWidth`, `iconPosition`.
- Keep inputs declarative; avoid imperative setters. Derived values must use `computed()`.
- Favor composition via content projection over configuration explosion; expose lightweight structural parts (`header`, `footer`, `prefix`, `suffix` slots).
- Template control flow follows the Angular 21 block syntax (`@if/@for/@switch`) and signal-friendly bindings; no imperative DOM tweaks.

## Styling & Theming
- SCSS for authoring; output uses CSS custom properties for runtime theming. No `::ng-deep` or global resets.
- Author component styles in SCSS only (no `.css` files); share mixins/variables and pull values from design tokens or CSS vars.
- Theming layers (do not bypass):
  1. **Design tokens** (`design-tokens.ts`) define canonical values.
  2. **CSS variables**: expose tokens as `--uilib-*` on `:root` or `[data-theme]` scopes.
  3. **Component variables**: map CSS vars to component-specific fallbacks (e.g., `--uilib-button-bg`, `--uilib-card-shadow`).
  4. **State tokens**: hover/active/disabled values derived via CSS vars, not hardcoded colors.
- Theme switching: toggle `[data-theme="light|dark|brand-x"]` on `html/body`; each theme file sets only CSS vars.
- Tailwind-compatible: selectors stay simple, no mandatory global styles; allow consumers to set CSS vars via Tailwind `theme()` in `:root`.

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

## Documentation & Demos
- Update `docs/` when adding or changing components (API, usage, theming knobs, accessibility notes).
- Demo app lives in `projects/demo`; provide at least one example per component and per theme.
- Demos and docs should showcase the Angular 21 block syntax and SCSS usage (e.g., `@if`/`@for` plus token-driven SCSS snippets).

## Contribution Guidelines
- Maintain OnPush + signals + standalone pattern.
- Align new components to the API shape and theming layers above.
- No silent global CSS; scope everything to component hosts and CSS vars.

### Key Architectural Decisions
- **Variants** define structural/visual differences (e.g., floating label vs top label)
- **Themes** define colors, spacing, and shape via CSS variables
- Variants are chosen at component level; themes apply globally
- All components must react to theme changes without rebuild
