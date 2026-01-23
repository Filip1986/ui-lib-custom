import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { SPACING_TOKENS, SpacingToken } from '../design-tokens';

export type StackDirection = 'vertical' | 'horizontal';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * Stack - A performant vertical or horizontal layout primitive
 *
 * Renders a single element with flexbox for predictable layouts.
 * Uses signals for optimal change detection performance.
 */
@Component({
  selector: 'uilib-stack',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[style.display]': '"flex"',
    '[style.flex-direction]': '_flexDirection()',
    '[style.align-items]': 'align()',
    '[style.justify-content]': '_justifyContent()',
    '[style.gap]': '_gapValue()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stack {
  /** Direction of the stack layout */
  direction = input<StackDirection>('vertical');

  /** Alignment of items along the cross axis */
  align = input<StackAlign>('stretch');

  /** Justification of items along the main axis */
  justify = input<StackJustify>('start');

  /** Gap between items (using design tokens) */
  gap = input<SpacingToken>(4);

  /** Computed flex-direction value */
  protected _flexDirection = computed(() =>
    this.direction() === 'vertical' ? 'column' : 'row'
  );

  /** Computed justify-content value */
  protected _justifyContent = computed(() => {
    const justifyMap: Record<StackJustify, string> = {
      'start': 'flex-start',
      'center': 'center',
      'end': 'flex-end',
      'space-between': 'space-between',
      'space-around': 'space-around',
      'space-evenly': 'space-evenly',
    };
    return justifyMap[this.justify()];
  });

  /** Computed gap value from token */
  protected _gapValue = computed(() => SPACING_TOKENS[this.gap()]);
}
