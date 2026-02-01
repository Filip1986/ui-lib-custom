import { InjectionToken } from '@angular/core';
import { DEFAULT_ICON_CONFIG, IconConfig } from './icon.types';

export const ICON_CONFIG = new InjectionToken<IconConfig>('ui-lib-icon-config', {
  providedIn: 'root',
  factory: () => ({ ...DEFAULT_ICON_CONFIG }),
});
