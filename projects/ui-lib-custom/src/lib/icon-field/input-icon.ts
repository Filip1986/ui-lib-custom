import type { InputSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

import { ICON_FIELD_CLASSES } from './icon-field.constants';

/**
 * Absolute-positioned icon container for IconField layouts.
 */
@Component({
  selector: 'ui-lib-input-icon',
  standalone: true,
  templateUrl: './input-icon.html',
  styleUrl: './input-icon.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-lib-input-icon',
    '[class]': 'hostClassNames()',
    '[attr.role]': 'iconRole()',
    '[attr.tabindex]': '-1',
    '[attr.aria-hidden]': 'ariaHidden()',
    '[attr.aria-label]': 'resolvedAriaLabel()',
  },
})
export class InputIconComponent {
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);
  public readonly decorative: InputSignal<boolean> = input<boolean>(true);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  public hostClassNames(): string {
    const customStyleClass: string | null = this.styleClass();
    if (!customStyleClass) {
      return ICON_FIELD_CLASSES.InputIcon;
    }
    return `${ICON_FIELD_CLASSES.InputIcon} ${customStyleClass}`;
  }

  public iconRole(): 'img' | null {
    return this.resolvedAriaLabel() === null ? null : 'img';
  }

  public ariaHidden(): 'true' | null {
    return this.decorative() ? 'true' : null;
  }

  public resolvedAriaLabel(): string | null {
    const ariaLabel: string | null = this.ariaLabel();
    if (ariaLabel === null) {
      return null;
    }

    const trimmedAriaLabel: string = ariaLabel.trim();
    return trimmedAriaLabel.length > 0 ? trimmedAriaLabel : null;
  }
}
