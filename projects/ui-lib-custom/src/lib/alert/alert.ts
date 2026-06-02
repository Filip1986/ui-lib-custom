import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  type InputSignal,
  output,
  type OutputEmitterRef,
  type Signal,
  ViewEncapsulation,
} from '@angular/core';

import { UiLibI18nService } from 'ui-lib-custom/i18n';
import type { StatusIcon } from 'ui-lib-custom/icon';
import { Icon } from 'ui-lib-custom/icon';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import type { AlertSeverity, AlertVariant } from './alert.types';

export type { AlertSeverity, AlertVariant } from './alert.types';

/**
 * Alert component for status messaging with optional dismiss action.
 */
@Component({
  selector: 'ui-lib-alert',
  standalone: true,
  imports: [Icon],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-alert',
    '[class]': 'hostClasses()',
    '[attr.role]': 'liveRole()',
    '[attr.aria-live]': 'ariaLive()',
    'aria-atomic': 'true',
  },
})
export class Alert {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  public readonly severity: InputSignal<AlertSeverity> = input<AlertSeverity>('info');
  public readonly variant: InputSignal<AlertVariant | null> = input<AlertVariant | null>(null);
  public readonly dismissible: InputSignal<boolean> = input<boolean>(false);
  public readonly dismissLabel: InputSignal<string | null> = input<string | null>(null);

  public readonly dismissed: OutputEmitterRef<void> = output<void>();

  public readonly statusIcon: Signal<StatusIcon> = computed<StatusIcon>((): StatusIcon => {
    const iconMap: Record<string, StatusIcon> = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    return iconMap[this.severity()] ?? 'info';
  });

  public readonly effectiveVariant: Signal<AlertVariant> = computed<AlertVariant>(
    (): AlertVariant => this.variant() ?? this.themeConfig.variant(),
  );

  public readonly liveRole: Signal<'alert' | 'status'> = computed<'alert' | 'status'>(
    (): 'alert' | 'status' =>
      this.severity() === 'error' || this.severity() === 'warning' ? 'alert' : 'status',
  );

  public readonly ariaLive: Signal<'assertive' | 'polite'> = computed<'assertive' | 'polite'>(
    (): 'assertive' | 'polite' => (this.liveRole() === 'alert' ? 'assertive' : 'polite'),
  );

  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-alert',
      `ui-lib-alert--${this.effectiveVariant()}`,
      `ui-lib-alert--${this.severity()}`,
    ];
    return classes.join(' ');
  });

  public onDismiss(): void {
    this.dismissed.emit();
  }
}
