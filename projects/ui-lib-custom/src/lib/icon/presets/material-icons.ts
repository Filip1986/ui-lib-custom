import { provideIcons } from '@ng-icons/core';
import { IconMapping } from '../icon.semantics';
import { BOOTSTRAP_ICON_MAPPING, BOOTSTRAP_ICONS } from './bootstrap-icons';

export const MATERIAL_ICON_MAPPING: IconMapping = { ...BOOTSTRAP_ICON_MAPPING };
export const MATERIAL_ICONS = { ...BOOTSTRAP_ICONS };

export function provideMaterialIcons(extra: Record<string, unknown> = {}) {
  return provideIcons({ ...MATERIAL_ICONS, ...extra });
}
