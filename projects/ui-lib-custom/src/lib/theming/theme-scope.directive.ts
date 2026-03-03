import { Directive, ElementRef, effect, inject, input, type InputSignal } from '@angular/core';
import { ThemeConfigService } from './theme-config.service';
import type { ThemePreset, ThemePresetColors, ThemeVariant } from './theme-preset.interface';

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
  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);
  private readonly appliedVars: Set<string> = new Set<string>();

  /** Theme configuration input */
  public readonly uiLibTheme: InputSignal<ThemeScopeInput> = input<ThemeScopeInput>(null);

  private get hostElement(): HTMLElement {
    return this.el.nativeElement as HTMLElement;
  }

  constructor() {
    effect((): void => {
      this.applyThemeScope();
    });
  }

  private applyThemeScope(): void {
    const config: ThemeScopeInput = this.uiLibTheme();
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

    const basePreset: ThemePreset = config.preset ?? this.themeService.getPreset();
    const resolvedPreset: ThemePreset = this.mergePreset(basePreset, config);
    if (config.preset || config.colors || config.variant) {
      this.applyVariables(this.themeService.getCssVars(resolvedPreset));
    }

    if (config.variant) {
      this.hostElement.setAttribute('data-variant', config.variant);
    }

    if (config.variables) {
      this.applyVariables(config.variables);
    }
  }

  private applyColorScheme(scheme: 'light' | 'dark'): void {
    this.hostElement.setAttribute('data-theme', scheme);
  }

  private applyVariables(variables: Record<string, string>): void {
    const element: HTMLElement = this.hostElement;
    Object.entries(variables).forEach(([key, value]: [string, string]): void => {
      const varName: string = key.startsWith('--') ? key : `--${key}`;
      element.style.setProperty(varName, value);
      this.appliedVars.add(varName);
    });
  }

  private clearThemeScope(): void {
    const element: HTMLElement = this.hostElement;
    element.removeAttribute('data-theme');
    element.removeAttribute('data-variant');
  }

  private clearAppliedStyles(): void {
    const element: HTMLElement = this.hostElement;
    this.appliedVars.forEach((key: string): void => {
      element.style.removeProperty(key);
    });
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
