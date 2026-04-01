import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
import { ICON_FIELD_CLASSES } from './icon-field.constants';

/**
 * Absolute-positioned icon container for IconField layouts.
 */
@Component({
  selector: 'uilib-input-icon',
  standalone: true,
  templateUrl: './input-icon.html',
  styleUrl: './input-icon.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-lib-input-icon',
    '[class]': 'hostClassNames()',
  },
})
export class InputIconComponent {
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  public hostClassNames(): string {
    const customStyleClass: string | null = this.styleClass();
    if (!customStyleClass) {
      return ICON_FIELD_CLASSES.InputIcon;
    }
    return `${ICON_FIELD_CLASSES.InputIcon} ${customStyleClass}`;
  }
}
