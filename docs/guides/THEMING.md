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

