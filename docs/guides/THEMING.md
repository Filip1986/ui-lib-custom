# Complete Theming Guide

## Quick Start

### Global Theme

```typescript
import { ThemeConfigService } from 'ui-lib-custom/theme';

@Component({
  // ...
})
export class App {
  private readonly themeService = inject(ThemeConfigService);

  toggleDark(): void {
    this.themeService.toggleDarkMode();
  }
}
```

### Scoped Theme

```html
<section [uiLibTheme]="'dark'">
  <!-- All components here use dark theme -->
</section>
```

## Dark Mode

### Automatic (System Preference)

```typescript
themeService.setMode('auto');
```

### Manual Control

```typescript
themeService.setMode('dark');
themeService.setMode('light');
```

## Exporting Themes

### JSON Export

```typescript
const json = themeService.exportAsJson();
```

### CSS Export

```typescript
const css = themeService.exportAsCss();
// Outputs CSS custom properties
```

### SCSS Export

```typescript
const scss = themeService.exportAsScss();
// Outputs SCSS variables
```

### Figma Tokens Export

```typescript
const figma = themeService.exportAsFigmaTokens();
// Outputs Tokens Studio compatible JSON
```

## Scoped Theming

### Directive

```html
<div [uiLibTheme]="themeConfig">...</div>
<div [uiLibDarkTheme]="true">...</div>
<div [uiLibLightTheme]="true">...</div>
```

### Component Input

```html
<ui-lib-card theme="dark">...</ui-lib-card>
```

### Custom Colors

```typescript
customTheme: ThemeScopeConfig = {
  colors: { primary: '#ff5722' }
};
```

## Theme Presets

Theme presets provide a portable, strongly typed snapshot of your theme configuration. Use `ThemePresetService` to capture, save, apply, import, and export presets.

### Canonical ThemePreset

```typescript
import { ThemePreset } from 'ui-lib-custom/theme';

const preset: ThemePreset = {
  id: 'preset-1',
  name: 'My Theme',
  description: 'Marketing site palette',
  variant: 'material',
  shape: 'rounded',
  density: 'default',
  darkMode: 'light',
  colors: {
    primary: '#1976d2',
    secondary: '#757575',
    success: '#43a047',
    danger: '#e53935',
    warning: '#fb8c00',
    info: '#039be5',
    surface: '#ffffff',
    background: '#f7f7f9',
  },
  fonts: {
    heading: "'Inter', 'Segoe UI', sans-serif",
    body: "'Inter', 'Segoe UI', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
```

### Save & Apply Presets

```typescript
import { ThemePresetService } from 'ui-lib-custom/theme';

const presetService = inject(ThemePresetService);
const preset = presetService.captureCurrentTheme('Custom Theme');

presetService.savePreset(preset);
presetService.applyPreset(preset);
```

### Export & Import

```typescript
const json = presetService.exportAsCss(preset);
const presetJson = presetService.exportAsJson(preset);

const imported = presetService.importFromJson(presetJson);
```

## Final Verification Checklist

- [ ] Dark mode works globally
- [ ] System preference detection works
- [ ] All components render correctly in dark mode
- [ ] Theme export works (JSON, CSS, SCSS, Figma)
- [ ] Scoped theming directive works
- [ ] Component theme inputs work
- [ ] Nested scopes work correctly
- [ ] Demo pages work
- [ ] Documentation is complete

> For the full guide (variant, shape, density, presets, scoped theming), see `docs/guides/THEMING_GUIDE.md`.
