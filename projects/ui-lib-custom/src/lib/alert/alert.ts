import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  inject,
  ViewEncapsulation,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core';
import { Icon } from '../icon';
import type { StatusIcon } from '../icon';
import { ThemeConfigService } from 'ui-lib-custom/theme';

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
    class: 'alert',
    '[class]': 'hostClasses()',
    role: 'alert',
  },
})
export class Alert {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  public readonly severity: InputSignal<'success' | 'error' | 'warning' | 'info'> = input<
    'success' | 'error' | 'warning' | 'info'
  >('info');
  public readonly variant: InputSignal<'material' | 'bootstrap' | 'minimal' | null> = input<
    'material' | 'bootstrap' | 'minimal' | null
  >(null);
  public readonly dismissible: InputSignal<boolean> = input<boolean>(false);

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

  public readonly effectiveVariant: Signal<'material' | 'bootstrap' | 'minimal'> = computed<
    'material' | 'bootstrap' | 'minimal'
  >((): 'material' | 'bootstrap' | 'minimal' => this.variant() ?? this.themeConfig.variant());

  public readonly hostClasses: Signal<string> = computed<string>(
    (): string => `alert-${this.effectiveVariant()} alert-${this.severity()}`
  );

  public onDismiss(): void {
    this.dismissed.emit();
  }
}
