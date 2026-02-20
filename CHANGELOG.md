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

### Changed
- All components now support dark mode.
- ThemeConfigService now supports mode (`auto`/`light`/`dark`).

### Deprecated
- 

### Removed
- 

### Fixed
- 

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

