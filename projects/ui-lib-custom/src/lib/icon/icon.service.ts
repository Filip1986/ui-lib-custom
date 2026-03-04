import {
  Injectable,
  computed,
  inject,
  signal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { ThemeConfigService, type ThemeIconConfig, type ThemePreset } from 'ui-lib-custom/theme';
import type { ThemeVariant } from 'ui-lib-custom/theme';
import { ICON_CONFIG } from './icon.tokens';
import {
  type ComponentVariant,
  DEFAULT_ICON_CONFIG,
  type IconConfig,
  type IconLibrary,
  type IconSize,
  ICON_SIZES,
} from './icon.types';
import { LUCIDE_ICON_MAPPING } from './presets';
import { BOOTSTRAP_ICON_MAPPING } from './presets';
import { MATERIAL_ICON_MAPPING } from './presets';
import type { IconMapping, SemanticIcon } from './icon.semantics';

/**
 * Resolves icon libraries, sizes, and semantic mappings for ui-lib icons.
 */
@Injectable({ providedIn: 'root' })
export class IconService {
  private readonly themeConfig: ThemeConfigService | null = inject(ThemeConfigService, {
    optional: true,
  });
  private readonly injectedConfig: IconConfig | null = inject(ICON_CONFIG, { optional: true });
  private readonly configSignal: WritableSignal<IconConfig> = signal<IconConfig>(
    this.injectedConfig ?? { ...DEFAULT_ICON_CONFIG }
  );
  private readonly mappings: Record<IconLibrary, IconMapping> = {
    material: MATERIAL_ICON_MAPPING,
    bootstrap: BOOTSTRAP_ICON_MAPPING,
    lucide: LUCIDE_ICON_MAPPING,
    heroicons: LUCIDE_ICON_MAPPING,
    tabler: LUCIDE_ICON_MAPPING,
  };

  public readonly config: Signal<IconConfig> = computed<IconConfig>((): IconConfig => {
    return this.configSignal();
  });

  public readonly themeVariant: Signal<ThemeVariant | null> = computed<ThemeVariant | null>(
    (): ThemeVariant | null => {
      const themeConfig: ThemeConfigService | null = this.themeConfig;
      if (!themeConfig) {
        return null;
      }
      return themeConfig.getPreset().variant;
    }
  );

  private readonly themeIcons: Signal<ThemeIconConfig | null> = computed<ThemeIconConfig | null>(
    (): ThemeIconConfig | null => {
      const themeConfig: ThemeConfigService | null = this.themeConfig;
      if (!themeConfig) {
        return null;
      }
      const preset: ThemePreset = themeConfig.getPreset();
      return preset.icons ?? null;
    }
  );

  private readConfig(): IconConfig {
    const read: () => IconConfig = this.configSignal as () => IconConfig;
    return read();
  }

  private readThemeIcons(): ThemeIconConfig | null {
    const read: () => ThemeIconConfig | null = this.themeIcons as () => ThemeIconConfig | null;
    return read();
  }

  public getLibraryForVariant(variant?: ComponentVariant | null): IconLibrary {
    const cfg: IconConfig = this.readConfig();
    const themeIcons: ThemeIconConfig | null = this.readThemeIcons();
    if (variant) {
      return cfg.variantMapping[variant];
    }
    if (themeIcons?.defaultLibrary) {
      return themeIcons.defaultLibrary;
    }
    return cfg.defaultLibrary;
  }

  public setDefaultLibrary(library: IconLibrary): void {
    this.configSignal.update(
      (current: IconConfig): IconConfig => ({ ...current, defaultLibrary: library })
    );
  }

  public setDefaultSize(size: IconSize): void {
    this.configSignal.update(
      (current: IconConfig): IconConfig => ({ ...current, defaultSize: size })
    );
  }

  public setVariantMapping(mapping: Partial<IconConfig['variantMapping']>): void {
    this.configSignal.update(
      (current: IconConfig): IconConfig => ({
        ...current,
        variantMapping: { ...current.variantMapping, ...mapping },
      })
    );
  }

  public getIconSize(size?: IconSize | null): string {
    const themeIcons: ThemeIconConfig | null = this.readThemeIcons();
    const cfg: IconConfig = this.readConfig();
    const target: IconSize = size ?? cfg.defaultSize;
    const themeSize: string | undefined = themeIcons?.sizes[target];
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
    const cfg: IconConfig = this.readConfig();
    const lib: IconLibrary = library ?? cfg.defaultLibrary;
    const mapping: IconMapping = this.mappings[lib];
    return mapping[semantic] ?? semantic;
  }

  public getIconForVariant(semantic: SemanticIcon, variant: ComponentVariant = 'minimal'): string {
    const library: IconLibrary = this.getLibraryForVariant(variant);
    return this.resolveIcon(semantic, library);
  }
}
