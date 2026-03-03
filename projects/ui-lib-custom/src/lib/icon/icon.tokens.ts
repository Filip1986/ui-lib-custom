import { InjectionToken } from '@angular/core';
import type { IconConfig } from './icon.types';
import { DEFAULT_ICON_CONFIG } from './icon.types';

export const ICON_CONFIG: InjectionToken<IconConfig> = new InjectionToken<IconConfig>(
  'ui-lib-icon-config',
  {
    providedIn: 'root',
    factory: (): IconConfig => ({ ...DEFAULT_ICON_CONFIG }),
  }
);
