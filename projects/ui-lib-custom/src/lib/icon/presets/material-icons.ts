import { provideIcons } from '@ng-icons/core';
import { LUCIDE_ICON_MAPPING, LUCIDE_ICONS } from './minimal-icons';
import { IconMapping } from '../icon.semantics';

export const MATERIAL_ICON_MAPPING: IconMapping = { ...LUCIDE_ICON_MAPPING };
export const MATERIAL_ICONS = { ...LUCIDE_ICONS };

export function provideMaterialIcons(extra: Record<string, unknown> = {}) {
  return provideIcons({ ...MATERIAL_ICONS, ...extra });
}
