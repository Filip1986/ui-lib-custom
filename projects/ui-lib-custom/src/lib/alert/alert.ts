import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Icon } from '../icon/icon';
import { StatusIcon } from '../icon/icon.semantics';

@Component({
  selector: 'ui-lib-alert',
  standalone: true,
  imports: [Icon],
  template: `
    <ui-lib-icon
      class="alert-icon"
      [name]="statusIcon()"
      [variant]="variant()"
      size="lg"
    />
    <div class="alert-content">
      <ng-content />
    </div>
    @if (dismissible()) {
      <ui-lib-icon
        class="alert-close"
        name="close"
        [variant]="variant()"
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
  severity = input<'success' | 'error' | 'warning' | 'info'>('info');
  variant = input<'material' | 'bootstrap' | 'minimal'>('material');
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

  hostClasses = computed(() => `alert-${this.variant()} alert-${this.severity()}`);

  onDismiss() {
    this.dismissed.emit();
  }
}
