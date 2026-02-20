import { Directive, ElementRef, effect, inject, input } from '@angular/core';
import { ThemeConfigService } from './theme-config.service';
import { ThemePreset, ThemePresetColors, ThemeVariant } from './theme-preset.interface';
import { ThemeScopeInput } from './theme-scope.directive';

/**
 * Mixin to add theme scope capability to a component
 * Use with host directive pattern
 */
@Directive({
  standalone: true,
})
export class WithThemeScopeMixin {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly themeService = inject(ThemeConfigService);
  private readonly appliedVars = new Set<string>();

  theme = input<ThemeScopeInput>(null);

  constructor() {
    effect(() => {
      this.applyTheme();
    });
  }

  private applyTheme(): void {
    const config = this.theme();
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

  private mergePreset(
    base: ThemePreset,
    config: { colors?: Partial<ThemePresetColors>; variant?: ThemeVariant }
  ): ThemePreset {
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
