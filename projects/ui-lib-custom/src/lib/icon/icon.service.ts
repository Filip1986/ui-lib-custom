import { Injectable, computed, inject, signal } from '@angular/core';
import { ThemeConfigService } from '../theming/theme-config.service';
import { ThemeVariant } from '../theming/theme-preset.interface';
import { ICON_CONFIG } from './icon.tokens';
import { ComponentVariant, DEFAULT_ICON_CONFIG, IconConfig, IconLibrary, IconSize, ICON_SIZES } from './icon.types';
import { LUCIDE_ICON_MAPPING } from './presets/minimal-icons';
import { BOOTSTRAP_ICON_MAPPING } from './presets/bootstrap-icons';
import { MATERIAL_ICON_MAPPING } from './presets/material-icons';
import { IconMapping, SemanticIcon } from './icon.semantics';

@Injectable({ providedIn: 'root' })
export class IconService {
  private readonly themeConfig = inject(ThemeConfigService, { optional: true });
  private readonly injectedConfig = inject(ICON_CONFIG, { optional: true });
  private readonly configSignal = signal<IconConfig>(this.injectedConfig ?? { ...DEFAULT_ICON_CONFIG });
  private mappings: Record<IconLibrary, IconMapping> = {
    material: MATERIAL_ICON_MAPPING,
    bootstrap: BOOTSTRAP_ICON_MAPPING,
    lucide: LUCIDE_ICON_MAPPING,
    heroicons: LUCIDE_ICON_MAPPING,
    tabler: LUCIDE_ICON_MAPPING,
  };

  readonly config = computed(() => this.configSignal());

  readonly themeVariant = computed<ThemeVariant | null>(() => {
    const preset = this.themeConfig?.getPreset?.();
    return preset?.variant ?? null;
  });

  getLibraryForVariant(variant?: ComponentVariant | null): IconLibrary {
    const cfg = this.configSignal();
    const target = variant ?? this.themeVariant();
    if (target && cfg.variantMapping[target as ThemeVariant]) {
      return cfg.variantMapping[target as ThemeVariant];
    }
    return cfg.defaultLibrary;
  }

  setDefaultLibrary(library: IconLibrary): void {
    this.configSignal.update((current) => ({ ...current, defaultLibrary: library }));
  }

  setDefaultSize(size: IconSize): void {
    this.configSignal.update((current) => ({ ...current, defaultSize: size }));
  }

  setVariantMapping(mapping: Partial<IconConfig['variantMapping']>): void {
    this.configSignal.update((current) => ({ ...current, variantMapping: { ...current.variantMapping, ...mapping } }));
  }

  getIconSize(size?: IconSize | null): string {
    const target = size ?? this.configSignal().defaultSize;
    return ICON_SIZES[target];
  }

  resolveLibrary(override?: IconLibrary | null, variant?: ComponentVariant | null): IconLibrary {
    if (override) return override;
    return this.getLibraryForVariant(variant ?? this.themeVariant());
  }

  resolveIcon(semantic: SemanticIcon, library?: IconLibrary): string {
    const lib = library ?? this.configSignal().defaultLibrary;
    const mapping = this.mappings[lib];
    return mapping?.[semantic] ?? semantic;
  }

  getIconForVariant(semantic: SemanticIcon, variant: ComponentVariant = 'minimal'): string {
    const library = this.getLibraryForVariant(variant);
    return this.resolveIcon(semantic, library);
  }
}
