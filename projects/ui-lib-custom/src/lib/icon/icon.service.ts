import { Injectable, computed, inject, signal } from '@angular/core';
import { ThemeConfigService, ThemeIconConfig } from 'ui-lib-custom/theme';
import { ThemeVariant } from 'ui-lib-custom/theme';
import { ICON_CONFIG } from './icon.tokens';
import {
  ComponentVariant,
  DEFAULT_ICON_CONFIG,
  IconConfig,
  IconLibrary,
  IconSize,
  ICON_SIZES,
} from './icon.types';
import { LUCIDE_ICON_MAPPING } from './presets/minimal-icons';
import { BOOTSTRAP_ICON_MAPPING } from './presets/bootstrap-icons';
import { MATERIAL_ICON_MAPPING } from './presets/material-icons';
import { IconMapping, SemanticIcon } from './icon.semantics';

@Injectable({ providedIn: 'root' })
export class IconService {
  private readonly themeConfig = inject(ThemeConfigService, { optional: true });
  private readonly injectedConfig = inject(ICON_CONFIG, { optional: true });
  private readonly configSignal = signal<IconConfig>(
    this.injectedConfig ?? { ...DEFAULT_ICON_CONFIG }
  );
  private readonly mappings: Record<IconLibrary, IconMapping> = {
    material: MATERIAL_ICON_MAPPING,
    bootstrap: BOOTSTRAP_ICON_MAPPING,
    lucide: LUCIDE_ICON_MAPPING,
    heroicons: LUCIDE_ICON_MAPPING,
    tabler: LUCIDE_ICON_MAPPING,
  };

  public readonly config = computed<IconConfig>(() => this.configSignal());

  public readonly themeVariant = computed<ThemeVariant | null>(() => {
    const themeConfig = this.themeConfig;
    if (!themeConfig) {
      return null;
    }
    return themeConfig.getPreset().variant;
  });

  private readonly themeIcons = computed<ThemeIconConfig | null>(() => {
    const themeConfig = this.themeConfig;
    if (!themeConfig) {
      return null;
    }
    const preset = themeConfig.getPreset();
    return preset.icons ?? null;
  });

  public getLibraryForVariant(variant?: ComponentVariant | null): IconLibrary {
    const cfg = this.configSignal();
    const themeIcons = this.themeIcons();
    if (variant) {
      return cfg.variantMapping[variant as ThemeVariant];
    }
    if (themeIcons?.defaultLibrary) {
      return themeIcons.defaultLibrary;
    }
    return cfg.defaultLibrary;
  }

  public setDefaultLibrary(library: IconLibrary): void {
    this.configSignal.update((current) => ({ ...current, defaultLibrary: library }));
  }

  public setDefaultSize(size: IconSize): void {
    this.configSignal.update((current) => ({ ...current, defaultSize: size }));
  }

  public setVariantMapping(mapping: Partial<IconConfig['variantMapping']>): void {
    this.configSignal.update((current) => ({
      ...current,
      variantMapping: { ...current.variantMapping, ...mapping },
    }));
  }

  public getIconSize(size?: IconSize | null): string {
    const themeIcons = this.themeIcons();
    const target = size ?? this.configSignal().defaultSize;
    const themeSize = themeIcons?.sizes[target];
    return themeSize ?? ICON_SIZES[target];
  }

  public resolveLibrary(
    override?: IconLibrary | null,
    variant?: ComponentVariant | null
  ): IconLibrary {
    if (override) return override;
    if (variant) return this.getLibraryForVariant(variant);
    return this.getLibraryForVariant(null);
  }

  public resolveIcon(semantic: SemanticIcon, library?: IconLibrary): string {
    const lib = library ?? this.configSignal().defaultLibrary;
    const mapping = this.mappings[lib];
    return mapping[semantic] ?? semantic;
  }

  public getIconForVariant(semantic: SemanticIcon, variant: ComponentVariant = 'minimal'): string {
    const library = this.getLibraryForVariant(variant);
    return this.resolveIcon(semantic, library);
  }
}
