import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  isDevMode,
  ViewEncapsulation,
  type AfterViewInit,
  type InputSignal,
  type Signal,
} from '@angular/core';
import { Icon } from 'ui-lib-custom/icon';
import type { IconSize } from 'ui-lib-custom/icon';
import type { SemanticIcon } from 'ui-lib-custom/icon';
import { SHARED_DEFAULTS, SHARED_SIZES } from 'ui-lib-custom/core';
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
})
export class IconButton implements AfterViewInit {
  public readonly icon: InputSignal<SemanticIcon | string> = input.required<
    SemanticIcon | string
  >();
  public readonly size: InputSignal<IconButtonSize> = input<IconButtonSize>(SHARED_DEFAULTS.Size);
  public readonly variant: InputSignal<IconButtonVariant> = input<IconButtonVariant>(
    SHARED_DEFAULTS.Variant
  );
  public readonly color: InputSignal<IconButtonColor | null> = input<IconButtonColor | null>(null);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly ariaLabel: InputSignal<string> = input.required<string>();

  public readonly iconSize: Signal<IconSize> = computed<IconSize>((): IconSize => {
    const map: Record<IconButtonSize, IconSize> = {
      [SHARED_SIZES.Sm]: SHARED_SIZES.Sm,
      [SHARED_SIZES.Md]: SHARED_SIZES.Md,
      [SHARED_SIZES.Lg]: SHARED_SIZES.Lg,
    };
    return map[this.size()];
  });

  public readonly resolvedIconName: Signal<SemanticIcon | string> = computed<SemanticIcon | string>(
    (): SemanticIcon | string => (this.loading() ? 'spinner' : this.icon())
  );

  public readonly ariaLabelResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      if (this.loading()) {
        return 'Loading, please wait';
      }

      const ariaLabel: string = this.ariaLabel().trim();
      return ariaLabel.length > 0 ? ariaLabel : null;
    }
  );

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.loading()
  );

  public readonly buttonClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-icon-button',
      `ui-lib-icon-button--${this.variant()}`,
      `ui-lib-icon-button--size-${this.size()}`,
    ];

    const color: IconButtonColor | null = this.color();
    if (color) {
      classes.push(`ui-lib-icon-button--color-${color}`);
    }

    if (this.isDisabled()) {
      classes.push('ui-lib-icon-button--disabled');
    }

    if (this.loading()) {
      classes.push('ui-lib-icon-button--loading');
    }

    return classes.join(' ');
  });

  public ngAfterViewInit(): void {
    if (!isDevMode() || this.ariaLabel().trim().length > 0) {
      return;
    }

    console.error('[ui-lib-icon-button] ariaLabel must not be empty for accessibility.');
  }
}
