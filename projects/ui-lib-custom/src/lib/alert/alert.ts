import { ChangeDetectionStrategy, Component, computed, input, output, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { StatusIcon } from '../icon/icon.semantics';
import { ThemeConfigService } from 'ui-lib-custom/theme';

@Component({
  selector: 'ui-lib-alert',
  standalone: true,
  imports: [Icon],
  template: `
    <ui-lib-icon
      class="alert-icon"
      [name]="statusIcon()"
      [variant]="effectiveVariant()"
      size="lg"
    />
    <div class="alert-content">
      <ng-content />
    </div>
    @if (dismissible()) {
      <ui-lib-icon
        class="alert-close"
        name="close"
        [variant]="effectiveVariant()"
        size="sm"
        [clickable]="true"
        (click)="onDismiss()"
      />
    }
  `,
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'alert',
    '[class]': 'hostClasses()',
    role: 'alert',
  },
})
export class Alert {
  private readonly themeConfig = inject(ThemeConfigService);

  severity = input<'success' | 'error' | 'warning' | 'info'>('info');
  variant = input<'material' | 'bootstrap' | 'minimal' | null>(null);
  dismissible = input<boolean>(false);

  dismissed = output<void>();

  statusIcon = computed<StatusIcon>(() => {
    const iconMap: Record<string, StatusIcon> = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    return iconMap[this.severity()];
  });

  readonly effectiveVariant = computed<'material' | 'bootstrap' | 'minimal'>(
    () => this.variant() ?? this.themeConfig.variant()
  );

  hostClasses = computed<string>(() => `alert-${this.effectiveVariant()} alert-${this.severity()}`);

  onDismiss(): void {
    this.dismissed.emit();
  }
}
