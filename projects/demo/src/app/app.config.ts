import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ThemeConfigService } from 'ui-lib-custom';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const themeService = inject(ThemeConfigService);
      const hasStored = typeof localStorage !== 'undefined' && !!localStorage.getItem('ui-lib-custom.theme');
      if (hasStored) {
        return;
      }
      return themeService.loadPresetAsync('/presets/brand-example.json', { merge: true, persist: true }).catch(() => {
        themeService.applyToRoot(themeService.getPreset());
      });
    })
  ]
};
