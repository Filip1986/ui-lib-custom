# Theming Guide

This guide explains how CSS variables and theme services work together, how to change global defaults, and how to scope themes to a subtree.

---

## How CSS Variables Work

All components read CSS custom properties (`--uilib-*`) that are defined at the global scope or a theme scope. Theming flows like this:

1. **Design tokens** (`design-tokens.ts`) define canonical values.
2. **Global CSS vars** (`themes.scss`) expose tokens.
3. **Component vars** map global vars to component-specific values.
4. **Interactive states** derive from CSS vars (hover, focus, disabled).

You can override at any scope:

```scss
:root {
  --uilib-color-primary-600: #2563eb;
}

[data-theme='brand-x'] {
  --uilib-color-primary-600: #ef4444;
}
```

---

## Global Variant

Set the library-wide default variant (material/bootstrap/minimal):

```typescript
import { ThemeConfigService } from 'ui-lib-custom/theme';

export class AppComponent {
  private readonly theme = inject(ThemeConfigService);

  setVariant(): void {
    this.theme.setVariant('bootstrap');
  }
}
```

Any component without an explicit `variant` input will use the global value.

---

## Global Shape

Shape controls border radius personality across components.

```typescript
this.theme.setShape('soft');
```

Available values:
- `sharp`
- `rounded`
- `soft`
- `pill`

---

## Density

Density scales padding/spacing uniformly across components.

```typescript
this.theme.setDensity('compact');
```

Available values:
- `compact`
- `default`
- `comfortable`

---

## Dark Mode

```typescript
this.theme.setMode('dark');
this.theme.setMode('light');
this.theme.setMode('auto');
```

You can also scope dark mode using `data-theme="dark"` on a container.

---

## Color Overrides

Override semantic color variables at any scope:

```scss
[data-theme='brand-x'] {
  --uilib-color-primary-600: #0ea5e9;
  --uilib-color-secondary-600: #8b5cf6;
  --uilib-color-success-600: #22c55e;
  --uilib-color-danger-600: #ef4444;
}
```

Component-level CSS variables can also be overridden to fine-tune styling.

---

## Theme Presets

Use `ThemePresetService` to capture and apply full presets.

```typescript
import { ThemePresetService } from 'ui-lib-custom/theme';

const presets = inject(ThemePresetService);
const preset = presets.captureCurrentTheme('My Theme');

presets.savePreset(preset);
presets.applyPreset(preset);
```

### Export/Import

```typescript
const json = presets.exportAsJson(preset);
const imported = presets.importFromJson(json);
```

---

## Apply a Preset in a Consumer App

```typescript
import { ThemePresetService } from 'ui-lib-custom/theme';
import presetJson from './my-theme.json';

const presets = inject(ThemePresetService);
const preset = presets.importFromJson(presetJson);

presets.applyPreset(preset);
```

---

## Scoped Theming

Use `[uiLibTheme]` to scope a theme to a subtree. This allows a dark sidebar inside a light page, for example.

```html
<section [uiLibTheme]="'dark'">
  <ui-lib-card>Dark card</ui-lib-card>
</section>

<section [uiLibTheme]="{ colors: { primary: '#0ea5e9' } }">
  <ui-lib-button>Branded button</ui-lib-button>
</section>
```

---

## Theme Editor

The demo app includes a Theme Editor sidebar for real-time customization. It updates variant, shape, density, dark mode, and colors live. See `docs/guides/THEME_EDITOR_GOOGLE_FONTS.md` for font loading behavior.

---

## Troubleshooting

- If a component ignores theme changes, verify it is using CSS variables (not hardcoded colors).
- Ensure `ViewEncapsulation.None` is used in library components (required for CSS vars).
- For scoped themes, check that the `data-theme` attribute is on the intended container.

