import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { ButtonVariant, ButtonSize } from '../button/button';

@Component({
  selector: 'ui-lib-button-group',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './button-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'btn-group',
    '[class.btn-group-vertical]': 'vertical()',
    '[class.btn-group-size-small]': "size() === 'small'",
    '[class.btn-group-size-large]': "size() === 'large'",
    '[class.btn-group-material]': "variant() === 'material'",
    '[class.btn-group-bootstrap]': "variant() === 'bootstrap'",
    '[class.btn-group-minimal]': "variant() === 'minimal'",
    '[attr.role]': '"group"',
  },
})
export class ButtonGroup {
  variant = input<ButtonVariant>('material');
  vertical = input<boolean>(false);
  size = input<ButtonSize | null>(null);

  hostClasses = computed(() => '');
}
