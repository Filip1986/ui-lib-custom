import { Directive, ElementRef, effect, inject, input } from '@angular/core';
import { ThemeConfigService } from './theme-config.service';
import { ThemePreset, ThemePresetColors, ThemeVariant } from './theme-preset.interface';

export interface ThemeScopeConfig {
  /** Full preset to apply */
  preset?: ThemePreset;

  /** Color scheme shorthand */
  colorScheme?: 'light' | 'dark';

  /** Partial color overrides */
  colors?: Partial<ThemePresetColors>;

  /** Variant override */
  variant?: ThemeVariant;

  /** Direct CSS variable overrides */
  variables?: Record<string, string>;
}

export type ThemeScopeInput = ThemeScopeConfig | 'light' | 'dark' | null;

@Directive({
  selector: '[uiLibTheme]',
  standalone: true,
  host: {
    '[attr.data-theme-scope]': '"true"',
  },
})
export class ThemeScopeDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly themeService = inject(ThemeConfigService);
  private readonly appliedVars = new Set<string>();

  /** Theme configuration input */
  uiLibTheme = input<ThemeScopeInput>(null);

  constructor() {
    effect(() => {
      this.applyThemeScope();
    });
  }

  private applyThemeScope(): void {
    const config = this.uiLibTheme();
    this.clearAppliedStyles();

    if (!config) {
      this.clearThemeScope();
      return;
    }

    if (typeof config === 'string') {
      this.applyColorScheme(config);
      return;
    }

    if (config.colorScheme) {
      this.applyColorScheme(config.colorScheme);
    }

    const basePreset = config.preset ?? this.themeService.getPreset();
    const resolvedPreset = this.mergePreset(basePreset, config);
    if (config.preset || config.colors || config.variant) {
      this.applyVariables(this.themeService.getCssVars(resolvedPreset));
    }

    if (config.variant) {
      this.el.nativeElement.setAttribute('data-variant', config.variant);
    }

    if (config.variables) {
      this.applyVariables(config.variables);
    }
  }

  private applyColorScheme(scheme: 'light' | 'dark'): void {
    this.el.nativeElement.setAttribute('data-theme', scheme);
  }

  private applyVariables(variables: Record<string, string>): void {
    const element = this.el.nativeElement;
    Object.entries(variables).forEach(([key, value]) => {
      const varName = key.startsWith('--') ? key : `--${key}`;
      element.style.setProperty(varName, value);
      this.appliedVars.add(varName);
    });
  }

  private clearThemeScope(): void {
    const element = this.el.nativeElement;
    element.removeAttribute('data-theme');
    element.removeAttribute('data-variant');
  }

  private clearAppliedStyles(): void {
    const element = this.el.nativeElement;
    this.appliedVars.forEach((key) => element.style.removeProperty(key));
    this.appliedVars.clear();
    element.removeAttribute('data-variant');
  }

  private mergePreset(base: ThemePreset, config: ThemeScopeConfig): ThemePreset {
    if (!config.colors && !config.variant) {
      return base;
    }

    return {
      ...base,
      variant: config.variant ?? base.variant,
      colors: {
        ...base.colors,
        ...(config.colors ?? {}),
      },
    };
  }
}
