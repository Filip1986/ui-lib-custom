import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { Icon } from '../icon';
import type { IconSize } from '../icon';
import type { SemanticIcon } from '../icon';
import { SHARED_DEFAULTS, SHARED_SIZES } from '../core/shared/constants';
import type { IconButtonSize, IconButtonVariant, IconButtonColor } from './icon-button.types';

export type { IconButtonSize, IconButtonVariant, IconButtonColor } from './icon-button.types';

/**
 * Icon-only button component with size and variant support.
 */
@Component({
  selector: 'ui-lib-icon-button',
  standalone: true,
  imports: [Icon],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'icon-button',
    '[class]': 'hostClasses()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.disabled]': 'disabled() || null',
    role: 'button',
    tabindex: '0',
  },
})
export class IconButton {
  public readonly icon: InputSignal<SemanticIcon | string> = input.required<
    SemanticIcon | string
  >();
  public readonly size: InputSignal<IconButtonSize> = input<IconButtonSize>(SHARED_DEFAULTS.Size);
  public readonly variant: InputSignal<IconButtonVariant> = input<IconButtonVariant>(
    SHARED_DEFAULTS.Variant
  );
  public readonly color: InputSignal<IconButtonColor | null> = input<IconButtonColor | null>(null);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  public readonly iconSize: Signal<IconSize> = computed<IconSize>((): IconSize => {
    const map: Record<IconButtonSize, IconSize> = {
      [SHARED_SIZES.Sm]: SHARED_SIZES.Sm,
      [SHARED_SIZES.Md]: SHARED_SIZES.Md,
      [SHARED_SIZES.Lg]: SHARED_SIZES.Lg,
    };
    return map[this.size()];
  });

  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      `icon-button-${this.variant()}`,
      `icon-button-${this.size()}`,
      this.color() ? `icon-button-${this.color()}` : '',
      this.disabled() ? 'icon-button-disabled' : '',
    ];
    return classes.filter(Boolean).join(' ');
  });
}
