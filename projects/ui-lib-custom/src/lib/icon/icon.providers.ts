import { provideIcons } from '@ng-icons/core';
import { ICON_CONFIG } from './icon.tokens';
import type { IconConfig, IconLibrary } from './icon.types';
import { LUCIDE_ICONS } from './presets';
import { MATERIAL_ICONS } from './presets';
import { BOOTSTRAP_ICONS } from './presets';
import type { Provider } from '@angular/core';

export function provideUiLibIcons(options?: {
  defaultLibrary?: IconLibrary;
  additionalIcons?: Record<string, unknown>;
}): Provider[] {
  const baseIcons: Record<string, string> = {
    ...MATERIAL_ICONS,
    ...BOOTSTRAP_ICONS,
    ...LUCIDE_ICONS,
    ...(options?.additionalIcons ?? {}),
  } as Record<string, string>;

  const config: IconConfig = {
    defaultLibrary: options?.defaultLibrary ?? 'lucide',
    defaultSize: 'md',
    variantMapping: {
      material: 'material',
      bootstrap: 'bootstrap',
      minimal: 'lucide',
    },
  };

  return [provideIcons(baseIcons), { provide: ICON_CONFIG, useValue: config }];
}
