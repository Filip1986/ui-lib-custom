# theming

**Selector:** service / directives
**Package:** `ui-lib-custom/theming` (also aliased as `ui-lib-custom/theme`)
**Content projection:** no — none

> `ThemeConfigService` is `providedIn: 'root'` and immediately reads/writes `localStorage` and `document.documentElement` on construction — it is not SSR-safe without a `PLATFORM_ID` guard in the consuming app.

## Exports

| Name | Kind | Notes |
|------|------|-------|
| `ThemeConfigService` | service | Central service for presets, variants, mode, shape, density, and CSS variable management |
| `ThemeScopeDirective` | directive (`[uiLibTheme]`) | Applies scoped theme variables to a subtree |
| `DarkThemeDirective` | directive (`[uiLibDarkTheme]`) | Sets `data-theme="dark"` on the host element |
| `LightThemeDirective` | directive (`[uiLibLightTheme]`) | Sets `data-theme="light"` on the host element |
| `ThemePreset` | interface | Full preset shape |
| `ThemePresetColors` | interface | Color tokens within a preset |
| `ThemeMode` | type | `'auto' \| 'light' \| 'dark'` |
| `ThemeVariant` | type | `'material' \| 'bootstrap' \| 'minimal'` (re-exported from `core`) |
| `exportThemeAsScss` | function | Renders preset variables as SCSS variable declarations |
| `exportThemeAsCss` | function | Renders preset variables as a `:root {}` CSS block |
| `exportThemeAsFigmaJson` | function | Renders preset as Figma-compatible token JSON |

## `ThemeConfigService` — key signals (read-only)

| Signal | Type | Notes |
|--------|------|-------|
| `preset` | `Signal<ThemePreset>` | Currently active preset |
| `mode` | `Signal<ThemeMode>` | Active mode setting |
| `effectiveTheme` | `Signal<'light' \| 'dark'>` | Resolved mode (respects `prefers-color-scheme` when `'auto'`) |
| `variant` | `Signal<ThemeVariant>` | Active component variant |
| `shape` | `Signal<ShapeToken>` | Active shape token |
| `density` | `Signal<DensityToken>` | Active density token |
| `savedThemes` | `Signal<string[]>` | Names of user-saved themes in `localStorage` |

## `ThemeConfigService` — key methods

| Method | Notes |
|--------|-------|
| `loadPreset(preset, options?)` | Merge or replace the active preset; persist and apply by default |
| `loadPresetAsync(source, options?)` | Async variant; accepts URL, Promise, or factory |
| `setMode(mode)` | Switch light / dark / auto |
| `toggleDarkMode()` | Toggle between light and dark |
| `setVariant(variant)` | Update component variant signal |
| `setShape(shape)` | Update shape token and `--uilib-shape-base` CSS var |
| `setDensity(density)` | Update density token and `--uilib-density` CSS var |
| `exportAsCSS()` | Returns `:root {}` string |
| `exportAsScss()` | Returns SCSS variable string |
| `exportAsJson()` | Returns JSON string of active preset |
| `exportAsFigmaTokens()` | Returns Figma token JSON string |
| `downloadExport(format)` | Triggers browser download for `'scss' \| 'css' \| 'json' \| 'figma'` |
| `saveToLocalStorage(name)` | Persist current preset under a name |
| `loadFromLocalStorage(name)` | Restore a named saved preset |
| `deleteSavedTheme(name)` | Remove a saved theme |
| `importFromJSON(file)` | Load preset from a `File` object |

## `ThemeScopeDirective` Input

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `uiLibTheme` | `ThemeScopeConfig \| 'light' \| 'dark' \| null` | `null` | Full config object or shorthand color scheme string |

## Usage

```html
<!-- Scope a subtree to dark mode -->
<section [uiLibTheme]="'dark'">...</section>

<!-- Scope with color overrides -->
<div [uiLibTheme]="{ colors: { primary: '#e63946' }, variant: 'bootstrap' }">...</div>
```

```typescript
// Imperative preset switch
themeConfigService.loadPreset(myPreset);
themeConfigService.setMode('dark');
```
