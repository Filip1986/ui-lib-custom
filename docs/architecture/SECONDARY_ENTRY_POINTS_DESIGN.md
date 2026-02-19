# Secondary Entry Points Design

## Goals

- Enable tree-shaking via secondary entry points while keeping the primary barrel.
- Preserve backward compatibility for existing imports from `ui-lib-custom`.
- Minimize circular dependencies across entry points.
- Align with library conventions for packaging and public API control.

## Final Entry Point List

Primary (backward compatible):

- `ui-lib-custom` (re-exports all public symbols)

Secondary entry points:

- `ui-lib-custom/button`
- `ui-lib-custom/card`
- `ui-lib-custom/badge`
- `ui-lib-custom/accordion`
- `ui-lib-custom/tabs`
- `ui-lib-custom/select`
- `ui-lib-custom/select-button`
- `ui-lib-custom/checkbox`
- `ui-lib-custom/input`
- `ui-lib-custom/icon`
- `ui-lib-custom/layout`
- `ui-lib-custom/theme`
- `ui-lib-custom/tokens`
- `ui-lib-custom/core`

Notes and scope expectations:

- `ui-lib-custom/accordion` exports `Accordion`, `AccordionPanel`, and `accordion.types`.
- `ui-lib-custom/tabs` exports `Tabs`, `Tab`, `TabLabel`, `TabContent`, `TabPanel`, and `tabs.types`.
- `ui-lib-custom/icon` exports `Icon`, `IconService`, `icon.types`, `icon.providers`, and `icon.semantics`.
- `ui-lib-custom/layout` exports `Stack`, `Inline`, `Grid`, `Container`, and optionally re-exports `tokens`.
- `ui-lib-custom/theme` exports `ThemeConfigService`, `theme-preset.interface`, and preset JSON if needed.
- `ui-lib-custom/tokens` exports `design-tokens` only.
- `ui-lib-custom/core` hosts shared types/utilities used by multiple entry points.

## File Structure Diagram

Proposed directory structure under `projects/ui-lib-custom/`:

```
projects/ui-lib-custom/
  ng-package.json
  src/
    public-api.ts
    lib/
      accordion/
      alert/
      badge/
      button/
      card/
      checkbox/
      icon/
      icon-button/
      input/
      layout/
      select/
      select-button/
      sidebar-menu/
      tabs/
      theming/
      design-tokens.ts
      core/   (new shared types/utilities)
  accordion/
    ng-package.json
  badge/
    ng-package.json
  button/
    ng-package.json
  card/
    ng-package.json
  checkbox/
    ng-package.json
  core/
    ng-package.json
  icon/
    ng-package.json
  input/
    ng-package.json
  layout/
    ng-package.json
  select/
    ng-package.json
  select-button/
    ng-package.json
  tabs/
    ng-package.json
  theme/
    ng-package.json
  tokens/
    ng-package.json
```

## Implementation Notes

- Secondary entry points do not use per-entry `public-api.ts` files.
- Each `ng-package.json` `entryFile` points directly to `../src/lib/<name>/index.ts`.

## Dependency Resolution Strategy

### 1) Public API isolation

- Each secondary `public-api.ts` should export only its feature surface.
- Avoid re-exporting unrelated feature areas to preserve tree-shaking.

### 2) Shared types and utilities in `core`

- Move types used across multiple entry points into `core`.
- Candidate moves based on analysis:
  - `ThemeVariant` and any shared types that currently create a cycle between `icon` and `theme`.
  - Generic utility types (e.g., `DeepPartial`) if used in multiple entry points.
- `core` should remain dependency-free and avoid importing feature-level entry points.

### 3) Entry point dependency rules

- `tokens` should be a leaf: no imports from other entry points.
- `layout` may depend on `tokens`.
- `theme` may depend on `tokens` and `core`.
- `icon` may depend on `core` and optionally `theme` if runtime theme integration is required.
- Components should not import from secondary entry points; they should import from relative `src/lib/...` paths to avoid circular public API graphs.

### 4) Circular dependency avoidance

Existing cycle risk from analysis:

- `icon.types` imports `ThemeVariant` from theming.
- `theme-preset.interface` imports `IconLibrary` and `IconSize` from icon.

Mitigation strategy:

- Move `ThemeVariant` into `core` and update `icon.types` to import from `core`.
- Alternatively, move `IconLibrary` and `IconSize` types into `core` so `theme-preset.interface` depends on `core` instead of `icon`.
- Keep `icon` runtime dependency on `theme` optional (already uses optional inject), but avoid type-only cycles across entry points.

### 5) Peer dependency documentation

- The library already depends on Angular and `@ng-icons/core` (used by `icon`).
- Document that `ui-lib-custom/icon` consumers need the same `@ng-icons/*` packages as the base library.
- If presets or JSON theme files are exported from `theme`, document how to import assets and include them in build pipelines.

## Migration Path

### Phase 1: Add secondary entry points (no breaking changes)

- Keep `projects/ui-lib-custom/src/public-api.ts` as the primary barrel.
- Add secondary entry point folders with `ng-package.json` pointing to `../src/lib/<name>/index.ts`.
- Release as a minor version with updated docs showing new import paths.
- Status: complete.
  - Implemented: button, badge, accordion, tabs, input, select-button, core.
  - Pending: card, checkbox, select, icon, layout, theme, tokens.

### Phase 2: Introduce `core` for shared types

- Move shared types to `src/lib/core` with a dedicated entry point.
- Update internal imports to reduce cycles.
- Maintain re-exports from the primary barrel to avoid breaking changes.

### Phase 3: Deprecation guidance (optional)

- Encourage new usage of secondary entry points in docs and examples.
- Keep the primary barrel indefinitely for compatibility.

## Backward Compatibility

Existing usage remains valid:

```ts
import { Button, Card } from 'ui-lib-custom';
```

New usage is encouraged for tree-shaking:

```ts
import { Button } from 'ui-lib-custom/button';
import { Card } from 'ui-lib-custom/card';
```

## Current Decisions

- Secondary entry points are the recommended import path for all feature areas.
- Theme JSON presets remain assets; they are not exported from the `ui-lib-custom/theme` entry point.
- The `icon` and `theme` type cycle should be resolved via `core` before tightening public API boundaries.
