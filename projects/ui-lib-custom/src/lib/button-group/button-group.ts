import {
  ChangeDetectionStrategy,
  Component,
  input,
  computed,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import type { ButtonVariant, ButtonSize } from '../button';

/**
 * Groups buttons with shared sizing and variant styling.
 */
@Component({
  selector: 'ui-lib-button-group',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './button-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-button-group',
    '[class.ui-lib-button-group--vertical]': 'vertical()',
    '[class.ui-lib-button-group--size-small]': "normalizedSize() === 'small'",
    '[class.ui-lib-button-group--size-large]': "normalizedSize() === 'large'",
    '[class.ui-lib-button-group--material]': "variant() === 'material'",
    '[class.ui-lib-button-group--bootstrap]': "variant() === 'bootstrap'",
    '[class.ui-lib-button-group--minimal]': "variant() === 'minimal'",
    '[attr.role]': '"group"',
  },
})
export class ButtonGroup {
  public readonly variant: InputSignal<ButtonVariant> = input<ButtonVariant>('material');
  public readonly vertical: InputSignal<boolean> = input<boolean>(false);
  public readonly size: InputSignal<ButtonSize> = input<ButtonSize>('md');

  public readonly normalizedSize: Signal<'small' | 'medium' | 'large'> = computed<
    'small' | 'medium' | 'large'
  >((): 'small' | 'medium' | 'large' => {
    const size: ButtonSize = this.size();
    const map: Record<ButtonSize, 'small' | 'medium' | 'large'> = {
      sm: 'small',
      md: 'medium',
      lg: 'large',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    return map[size];
  });
}
