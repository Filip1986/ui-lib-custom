# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete dark mode support with system preference detection.
- Theme export in SCSS, CSS, and Figma Tokens formats.
- Scoped theming via `[uiLibTheme]` directive.
- Component-level theme inputs (Card).
- Dark mode demo page.
- Scoped theming demo page.
- Automated accessibility testing with axe-core
- E2E accessibility tests with Playwright
- LiveAnnouncerService for screen reader announcements
- High contrast mode support
- RTL support for Tabs component
- New component docs for Select, Alert, and Layout primitives.
- Comprehensive theming guide (`docs/guides/THEMING_GUIDE.md`).
- New `Editor` component (`ui-lib-editor`) with native rich-text editing, toolbar command API, projected custom toolbar support (`[editorToolbar]`), forms integration, sanitization, and full demo/docs/test coverage.
- New secondary entry point: `ui-lib-custom/editor`.
- New `FloatLabel` component (`uilib-float-label`) with CSS-driven variants (`over`/`in`/`on`), native/wrapper state support, demo coverage, and API docs.
- New secondary entry point: `ui-lib-custom/float-label`.
- `CODE_SNIPPET_SYNTAX_COLORS` constant in `design-tokens.ts` — exposes all 9 One Dark syntax highlight colours as named constants, enabling consumer syntax theme customisation via `--uilib-code-snippet-syntax-*` CSS variables.
- `BOOTSTRAP_APPEARANCE_COLORS` constant in `design-tokens.ts` — tracks Bootstrap-specific colour values (`#0d6efd`, `#dee2e6`, `#495057`) as named constants to document their provenance and prevent accidental aliasing to the library's Material-based global palette.
- `CONFIRM_BUTTON_COLORS` constant in `design-tokens.ts` — tracks `warningFg: '#1f2937'` (Tailwind gray-800 dark text used on warning-yellow confirm buttons, not present in the Material palette).
- `COLORPICKER_TOKENS.selectorBorderColor` field — documents the always-white selector border that must contrast against any hue on the colour canvas.
- `--uilib-code-snippet-syntax-*` CSS variables (9 tokens) — all syntax highlight colours are now overridable at runtime, enabling full syntax theme customisation without a rebuild.

### Changed
- All components now support dark mode.
- ThemeConfigService now supports mode (`auto`/`light`/`dark`).
- Documentation index updates for new component references.
- Main README now includes theming and theme editor guidance.
- Documentation/reference indexes now include direct `Editor` API links.
- **Design token audit — CSS rule-body hex violations eliminated:** all raw hex/rgba values in component SCSS rule bodies have been replaced with `var(--uilib-*)` references. Affected components: `confirm-dialog`, `confirm-popup`, `table`, `meter-group`, `color-picker`, `mega-menu`, `menubar`, `code-snippet`.
- **Design token audit — CSS variable definition improvements:** component-scoped variable definitions that used standalone hex values now reference global tokens where one exists (`var(--uilib-color-neutral-300, #dee2e6)` pattern). Affected files: `drawer`, `scroll-panel`, `fieldset`, `panel`, `stepper`, `listbox`, `table`, `password`, `order-list`, `pick-list`.
- `LIBRARY_CONVENTIONS.md`: added Bootstrap variant colour guidance under the Design Token Rule section; added anti-pattern row for Bootstrap/Material palette aliasing.

### Deprecated
- 

### Removed
- 

### Fixed
- Select component now has proper aria-activedescendant
- Form errors now announce to screen readers
- Focus management in Select dropdown
- Keyboard navigation in all components
- `table.component.scss`: Bootstrap variant dark-mode border was `#4a5568` (Tailwind gray-700); corrected to `#495057` (Bootstrap `borderColorDark`) with source-of-truth comment.
- `mega-menu.scss` / `menubar.scss`: focus ring `outline-color: #ffffff` in dark variant now uses the already-defined `--uilib-*-root-link-color-active` variable, removing the raw hex rule-body violation and creating semantic alignment.
- `color-picker.scss`: selector crosshair border `2px solid #fff` is now driven by `--uilib-colorpicker-selector-border-color` (always white — must contrast against any hue on the canvas). Consumers can now override this token.

### Security
- 

## [0.2.0] - 2026-02-19

### Changed
- Standardized CSS custom properties to the `--uilib-{component}-{property}` pattern (breaking).
- Renamed select-button variables from `--uilib-selectbutton-*` to `--uilib-select-button-*` (breaking).
- Updated theming, demo, and docs to align with standardized variables.

### Added
- `docs/reference/systems/CSS_VARIABLES.md` for component-level CSS variable reference.
- `docs/guides/MIGRATION_CSS_VARIABLES.md` migration guide for CSS variable changes.

## [0.1.2] - 2026-02-16

### Added
- Scrollable tablist arrows with overflow detection and RTL-aware scrolling.
- Navigation mode (`mode='navigation'`) with `navigate` output.
- Per-tab lazy overrides and `uiLibTabContent` for deferred panel templates.

### Changed
- Expanded tabs demos, usage snippets, and implementation notes.
- Improved accordion content and icon animations with reduced-motion support.
- Added size-specific spacing and typography variables for accordion.

### Fixed
- Added unit tests for scrollable tabs, navigation mode, and per-tab lazy behaviors.

## [0.1.1] - 2026-01-25

### Changed
- Demo playgrounds follow the Theme Editor variant by default, with per-demo toggle to opt out.
- Demo previews apply theme changes via scoped CSS variables.
- Minimal card variant uses card background for header/footer and inset separators.

### Added
- Theme scope directive for isolated theme overrides in demos.

## [0.1.0] - 2026-01-22

### Added
- Initial release.
- Button component with Material, Bootstrap, Minimal variants.
- Card component with header/footer slots.
- Badge component with 7 color options.
- Accordion component with single/multiple expand modes.
- Tabs component with lazy loading support.
- Select component with search and multi-select.
- SelectButton segmented control.
- Input component with floating labels.
- Checkbox component.
- Icon component with multiple library support.
- Layout primitives (Stack, Inline, Grid, Container).
- Design token system (177+ tokens).
- Theme configuration service.
- Theme editor in demo app.

### Changed
- Upgraded to Angular 21 and TypeScript 5.9.
- Updated peer dependencies for Angular, PrimeNG, and PrimeIcons.

