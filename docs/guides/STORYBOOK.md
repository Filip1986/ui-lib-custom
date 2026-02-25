# Storybook Setup

Storybook is configured at the repo root and targets the demo app while loading UI library stories from `projects/ui-lib-custom/src/lib/**`. All stories live alongside their components.

## Commands

```powershell
npm run storybook
```

```powershell
npm run build-storybook
```

## Configuration

- `.storybook/main.ts`
  - Stories: `projects/ui-lib-custom/src/lib/**/*.stories.ts`
  - Addons: `@storybook/addon-a11y`, `@storybook/addon-docs`
- `.storybook/preview.ts`
  - Imports `projects/ui-lib-custom/src/lib/themes/themes.scss`
  - Wraps stories with a ThemeConfigService-aware wrapper
  - Global toolbar: Variant, Dark Mode, Shape

## Guidelines

- Each component must have `Default`, `Variants`, `Sizes`, `States`, `Dark Mode`, and `Full API` stories.
- All stories should pass `@storybook/addon-a11y` checks.
- Use ui-lib components inside stories to dogfood the library.
