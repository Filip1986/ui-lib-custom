import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
import type { FloatLabelVariant } from './float-label.types';

/**
 * FloatLabel wrapper component scaffold.
 */
@Component({
  selector: 'uilib-float-label',
  standalone: true,
  templateUrl: './float-label.html',
  styleUrl: './float-label.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'uilib-float-label',
    '[class.uilib-float-label--over]': 'variant() === "over"',
    '[class.uilib-float-label--in]': 'variant() === "in"',
    '[class.uilib-float-label--on]': 'variant() === "on"',
  },
})
export class FloatLabelComponent {
  /** Defines the positioning of the label relative to the input. */
  public readonly variant: InputSignal<FloatLabelVariant> = input<FloatLabelVariant>('over');
}
