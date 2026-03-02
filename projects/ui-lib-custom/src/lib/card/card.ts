import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  output,
  ViewEncapsulation,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from 'ui-lib-custom/icon';
import { SemanticIcon } from 'ui-lib-custom/icon';
import {
  ThemeConfigService,
  ThemeScopeInput,
  ThemePreset,
  ThemePresetColors,
  ThemeVariant,
} from 'ui-lib-custom/theme';

export type CardVariant = 'material' | 'bootstrap' | 'minimal';
export type CardElevation = 'none' | 'low' | 'medium' | 'high';

@Component({
  selector: 'ui-lib-card',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Card {
  public readonly variant = input<CardVariant | null>(null);
  public readonly elevation = input<CardElevation>('medium');
  public readonly bordered = input<boolean>(false);
  public readonly hoverable = input<boolean>(false);
  public readonly showHeader = input<boolean | null>(null);
  public readonly showFooter = input<boolean | null>(null);
  public readonly shadow = input<string | null>(null);
  public readonly headerBg = input<string | null>(null);
  public readonly footerBg = input<string | null>(null);
  public readonly headerIcon = input<SemanticIcon | string | null>(null);
  public readonly closable = input<boolean>(false);
  public readonly subtitle = input<string | null>(null);
  public readonly ariaLabel = input<string | null>(null);

  /** Optional scoped theme override */
  public readonly theme = input<ThemeScopeInput>(null);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeService = inject(ThemeConfigService);
  private readonly appliedVars = new Set<string>();

  public readonly closed = output<void>();

  public readonly effectiveVariant = computed<CardVariant>(
    (): CardVariant => this.variant() ?? this.themeService.variant()
  );
  public readonly headerVisible = computed<boolean>((): boolean => this.showHeader() !== false);
  public readonly footerVisible = computed<boolean>((): boolean => this.showFooter() !== false);

  public readonly cardClasses = computed<string>((): string => {
    const classes = [
      'card',
      `card-${this.effectiveVariant()}`,
      `card-elevation-${this.elevation()}`,
    ];

    if (this.bordered()) {
      classes.push('card-bordered');
    }

    if (this.hoverable()) {
      classes.push('card-hoverable');
    }

    return classes.join(' ');
  });

  constructor() {
    effect((): void => {
      this.applyThemeScope();
    });
  }

  public onClose(): void {
    this.closed.emit();
  }

  public onKeydown(event: KeyboardEvent): void {
    if (!this.hoverable()) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.el.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }

  private applyThemeScope(): void {
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

    const basePreset: ThemePreset = config.preset ?? this.themeService.getPreset();
    const resolvedPreset: ThemePreset = this.mergePreset(basePreset, config);
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
    const element: HTMLElement = this.el.nativeElement;
    Object.entries(variables).forEach(([key, value]): void => {
      const varName = key.startsWith('--') ? key : `--${key}`;
      element.style.setProperty(varName, value);
      this.appliedVars.add(varName);
    });
  }

  private clearThemeScope(): void {
    const element: HTMLElement = this.el.nativeElement;
    element.removeAttribute('data-theme');
    element.removeAttribute('data-variant');
  }

  private clearAppliedStyles(): void {
    const element: HTMLElement = this.el.nativeElement;
    this.appliedVars.forEach((key): void => {
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
