import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
import { ICON_FIELD_DEFAULTS } from './icon-field.constants';
import type { IconPosition } from './icon-field.types';

/**
 * Wrapper that positions a leading or trailing input icon around projected controls.
 */
@Component({
  selector: 'uilib-icon-field',
  standalone: true,
  templateUrl: './icon-field.html',
  styleUrl: './icon-field.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-lib-icon-field',
    '[class.ui-lib-icon-field--left]': 'iconPosition() === "left"',
    '[class.ui-lib-icon-field--right]': 'iconPosition() === "right"',
  },
})
export class IconFieldComponent {
  public readonly iconPosition: InputSignal<IconPosition> = input<IconPosition>(
    ICON_FIELD_DEFAULTS.iconPosition
  );
}
