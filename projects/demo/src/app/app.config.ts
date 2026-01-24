import { ApplicationConfig, APP_INITIALIZER, inject, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ThemeConfigService } from 'ui-lib-custom';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const themeService = inject(ThemeConfigService);
        return () => {
          const hasStored = typeof localStorage !== 'undefined' && !!localStorage.getItem('ui-lib-custom.theme');
          if (hasStored) {
            return Promise.resolve();
          }
          return themeService.loadPresetAsync('/presets/brand-example.json', { merge: true, persist: true }).catch(() => {
            themeService.applyToRoot(themeService.getPreset());
          });
        };
      },
    }
  ]
};
