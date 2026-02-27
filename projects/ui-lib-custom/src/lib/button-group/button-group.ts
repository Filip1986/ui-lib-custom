import {
  ChangeDetectionStrategy,
  Component,
  input,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonVariant, ButtonSize } from '../button/button';

@Component({
  selector: 'ui-lib-button-group',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './button-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'btn-group',
    '[class.btn-group-vertical]': 'vertical()',
    '[class.btn-group-size-small]': "normalizedSize() === 'small'",
    '[class.btn-group-size-large]': "normalizedSize() === 'large'",
    '[class.btn-group-material]': "variant() === 'material'",
    '[class.btn-group-bootstrap]': "variant() === 'bootstrap'",
    '[class.btn-group-minimal]': "variant() === 'minimal'",
    '[attr.role]': '"group"',
  },
})
export class ButtonGroup {
  variant = input<ButtonVariant>('material');
  vertical = input<boolean>(false);
  size = input<ButtonSize>('md');

  readonly normalizedSize = computed<'small' | 'medium' | 'large'>(
    (): 'small' | 'medium' | 'large' => {
      const size: ButtonSize = this.size();
      const map: Record<ButtonSize, 'small' | 'medium' | 'large'> = {
        sm: 'small',
        md: 'medium',
        lg: 'large',
        small: 'small',
        medium: 'medium',
        large: 'large',
      };
      return map[size] ?? 'medium';
    }
  );

  hostClasses = computed<string>(() => '');
}
