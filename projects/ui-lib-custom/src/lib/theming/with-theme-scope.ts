import { Directive, ElementRef, effect, inject, input, type InputSignal } from '@angular/core';
import { ThemeConfigService } from './theme-config.service';
import type { ThemePreset, ThemePresetColors, ThemeVariant } from './theme-preset.interface';
import type { ThemeScopeInput } from './theme-scope.directive';

/**
 * Mixin to add theme scope capability to a component
 * Use with host directive pattern
 */
@Directive({
  standalone: true,
})
export class WithThemeScopeMixin {
  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);
  private readonly appliedVars: Set<string> = new Set<string>();

  public readonly theme: InputSignal<ThemeScopeInput> = input<ThemeScopeInput>(null);

  private get hostElement(): HTMLElement {
    return this.el.nativeElement as HTMLElement;
  }

  constructor() {
    effect((): void => {
      this.applyTheme();
    });
  }

  private applyTheme(): void {
    const config: ThemeScopeInput = this.theme();
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
