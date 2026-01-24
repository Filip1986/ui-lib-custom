# ThemeConfigService

Documentation for the runtime theming service that drives presets, CSS variable application, and persistence.

## What it provides
- Typed presets via `ThemePreset` (variant, colors, shape, typography) with `DeepPartial` overrides.
- Reactive state using Angular signals (`preset`), partial merge support, and host tracking for `applyToRoot`.
- Persistence to `localStorage` under `ui-lib-custom.theme`.
- Async loading from JSON (local or remote) plus export helpers to CSS/JSON.

## Preset sources
- Built-ins (bundled): `light`, `dark`, `brand-example` at `projects/ui-lib-custom/src/lib/theming/presets/`.
- Demo fetchable asset: `projects/demo/public/presets/brand-example.json` (used in bootstrap example below).

## Using in an app (demo pattern)
Add an `APP_INITIALIZER` so a preset is ready before first paint. The demo fetches a brand preset when nothing is persisted, otherwise it keeps the stored theme.

```ts
import { ApplicationConfig, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ThemeConfigService } from 'ui-lib-custom';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const themeService = inject(ThemeConfigService);
        return () => {
          const hasStored = typeof localStorage !== 'undefined' && !!localStorage.getItem('ui-lib-custom.theme');
          if (hasStored) return Promise.resolve();
          return themeService.loadPresetAsync('/presets/brand-example.json', { merge: true, persist: true })
            .catch(() => themeService.applyToRoot(themeService.getPreset()));
        };
      },
    }
  ]
};
```

## Switching themes at runtime
Use built-in presets or your own partial overrides:

```ts
const themeService = inject(ThemeConfigService);

// Built-in toggle
const next = themeService.preset().name === 'dark' ? 'light' : 'dark';
const preset = themeService.listBuiltInPresets()[next];
if (preset) {
  themeService.loadPreset(preset, { apply: true, persist: true, merge: false });
}

// Partial override (keeps other values intact)
themeService.loadPreset({
  colors: { primary: '#4f46e5', surface: '#ffffff' },
  shape: { buttonRadius: 'lg' }
}, { merge: true, persist: true, apply: true });
```

## Async/remote presets
```ts
await themeService.loadPresetAsync('https://example.com/themes/acme-dark.json', {
  merge: true,
  apply: true,
  persist: true,
});
```

## CSS variables
`applyToRoot` maps the preset onto `--uilib-*` variables on `document.documentElement` by default. Provide a custom host to scope variables:
```ts
themeService.applyToRoot(undefined, document.getElementById('preview-pane'));
```

## Exporting
```ts
const css = themeService.exportAsCSS();   // :root { --uilib-... }
const json = themeService.exportAsJSON(); // serialized ThemePreset
```

## Persistence
- Key: `ui-lib-custom.theme`
- Opt out by passing `{ persist: false }` to `loadPreset`/`loadPresetAsync`.

## Shape & radius
`ThemeShapeRadius` accepts `sm|md|lg|xl|2xl|full` or any CSS size string. The service resolves tokens from `design-tokens.ts` before falling back to raw values.
