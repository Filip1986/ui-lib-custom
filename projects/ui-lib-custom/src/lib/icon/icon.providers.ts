import { provideIcons } from '@ng-icons/core';
import { ICON_CONFIG } from './icon.tokens';
import { IconConfig, IconLibrary } from './icon.types';
import { LUCIDE_ICONS } from './presets/minimal-icons';
import { MATERIAL_ICONS } from './presets/material-icons';
import { BOOTSTRAP_ICONS } from './presets/bootstrap-icons';

export function provideUiLibIcons(options?: { defaultLibrary?: IconLibrary; additionalIcons?: Record<string, unknown> }) {
  const baseIcons = {
    ...MATERIAL_ICONS,
    ...BOOTSTRAP_ICONS,
    ...LUCIDE_ICONS,
    ...(options?.additionalIcons ?? {}),
  };

  const config: IconConfig = {
    defaultLibrary: options?.defaultLibrary ?? 'lucide',
    defaultSize: 'md',
    variantMapping: {
      material: 'lucide',
      bootstrap: 'bootstrap',
      minimal: 'lucide',
    },
  };

  return [provideIcons(baseIcons), { provide: ICON_CONFIG, useValue: config }];
}
