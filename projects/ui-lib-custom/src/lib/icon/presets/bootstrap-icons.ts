import { provideIcons } from '@ng-icons/core';
import { LUCIDE_ICON_MAPPING, LUCIDE_ICONS } from './minimal-icons';
import { IconMapping } from '../icon.semantics';

export const BOOTSTRAP_ICON_MAPPING: IconMapping = { ...LUCIDE_ICON_MAPPING };
export const BOOTSTRAP_ICONS = { ...LUCIDE_ICONS };

export function provideBootstrapIcons(extra: Record<string, unknown> = {}) {
  return provideIcons({ ...BOOTSTRAP_ICONS, ...extra });
}
