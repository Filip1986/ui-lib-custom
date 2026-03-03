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
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from 'ui-lib-custom/icon';
import type { SemanticIcon } from 'ui-lib-custom/icon';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type {
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
  public readonly variant: InputSignal<CardVariant | null> = input<CardVariant | null>(null);
  public readonly elevation: InputSignal<CardElevation> = input<CardElevation>('medium');
  public readonly bordered: InputSignal<boolean> = input<boolean>(false);
  public readonly hoverable: InputSignal<boolean> = input<boolean>(false);
  public readonly showHeader: InputSignal<boolean | null> = input<boolean | null>(null);
  public readonly showFooter: InputSignal<boolean | null> = input<boolean | null>(null);
  public readonly shadow: InputSignal<string | null> = input<string | null>(null);
  public readonly headerBg: InputSignal<string | null> = input<string | null>(null);
  public readonly footerBg: InputSignal<string | null> = input<string | null>(null);
  public readonly headerIcon: InputSignal<SemanticIcon | string | null> = input<
    SemanticIcon | string | null
  >(null);
  public readonly closable: InputSignal<boolean> = input<boolean>(false);
  public readonly subtitle: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Optional scoped theme override */
  public readonly theme: InputSignal<ThemeScopeInput | null> = input<ThemeScopeInput | null>(null);

  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);
  private readonly appliedVars: Set<string> = new Set<string>();

  public readonly closed: OutputEmitterRef<void> = output<void>();

  public readonly effectiveVariant: Signal<CardVariant> = computed<CardVariant>(
    (): CardVariant => this.variant() ?? this.themeService.variant()
  );
  public readonly headerVisible: Signal<boolean> = computed<boolean>(
    (): boolean => this.showHeader() !== false
  );
  public readonly footerVisible: Signal<boolean> = computed<boolean>(
    (): boolean => this.showFooter() !== false
  );

  public readonly cardClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
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

  private readTheme(): ThemeScopeInput | null {
    const read: () => ThemeScopeInput | null = this.theme as () => ThemeScopeInput | null;
    return read();
  }

  private applyThemeScope(): void {
    const config: ThemeScopeInput | null = this.readTheme();
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
    const entries: [string, string][] = Object.entries(variables) as [string, string][];
    entries.forEach(([key, value]: [string, string]): void => {
      const varName: string = key.startsWith('--') ? key : `--${key}`;
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
