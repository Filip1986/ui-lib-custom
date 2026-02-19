# Storybook Integration Plan

## Goals
- Interactive component documentation
- Visual testing capabilities
- Design system showcase
- Isolated component development

## Setup Steps

### 1. Installation
```powershell
npx storybook@latest init --type angular
```

### 2. Configuration
- Configure for library (not app) and ensure stories reference `projects/ui-lib-custom`.
- Use secondary entry points for imports (e.g., `ui-lib-custom/button`).
- Configure `angular.json` to include Storybook targets (build and serve) for the library.
- Align TS config to library paths and add story globs for `*.stories.ts`.

### 3. Story Structure
- Co-locate stories with components:
  - `projects/ui-lib-custom/src/lib/**/` with `*.stories.ts`.
- Use `meta` + `args` to mirror component inputs and variants.
- Provide base stories for each component:
  - Default
  - Variants
  - Sizes
  - States (disabled, loading, error)

### 4. Theming & Tokens
- Load theme CSS and tokens in `.storybook/preview.ts`.
- Add a global toolbar to switch themes (`data-theme=light/dark`).
- Provide decorator for theme scope to keep stories isolated.

### 5. Docs & Controls
- Enable docs addon for auto-generated API tables.
- Use `argTypes` to describe inputs/outputs.
- Add MDX docs where manual guidance is needed.

### 6. Visual Regression
- Integrate with Chromatic or Playwright screenshot testing (optional).
- Define baseline stories for key variants.
- Add a “visual smoke” story set for CI checks.

### 7. CI Integration
- Add Storybook build step in CI (`storybook:build`).
- Store static build artifacts if needed.
- Add size budget checks for Storybook bundle (optional).

## Initial Files to Add

- `.storybook/main.ts`
  - Stories globs for library components.
  - Addons list.
  - Framework config: Angular.
- `.storybook/preview.ts`
  - Global decorators, theme toolbar.
- `projects/ui-lib-custom/src/lib/**/` stories
  - Start with Button, Card, Input, Tabs, Select, Checkbox.

## Suggested Story Categories

- Components/Buttons
- Components/Cards
- Components/Inputs
- Components/Tabs
- Components/Select
- Components/Checkbox
- Systems/Design Tokens
- Systems/Theming

## Risks & Mitigations

- **CSS variable scoping:** ensure `ViewEncapsulation.None` components read theme vars; add theme decorator.
- **Library vs app config:** verify Storybook uses library tsconfig and paths.
- **Bundle size:** keep stories simple and reuse sample data.

## Next Steps

1. Decide story co-location vs centralized `stories/` folder.
2. Confirm theme presets and which CSS files to load.
3. Identify first 5 components for initial stories.
4. Add CI pipeline step for Storybook build.

