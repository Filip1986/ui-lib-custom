import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { SPACING_TOKENS, SpacingToken } from '../design-tokens';

const spacingVar = (token: SpacingToken) => `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;

export type InlineAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type InlineJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around';

/**
 * Inline - A performant inline/horizontal layout primitive with wrapping
 *
 * Similar to Stack but with flex-wrap enabled for responsive inline layouts.
 * Ideal for tags, chips, button groups, or any inline content that should wrap.
 */
@Component({
  selector: 'uilib-inline',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[style.display]': '"flex"',
    '[style.flex-direction]': '"row"',
    '[style.flex-wrap]': '"wrap"',
    '[style.align-items]': 'align()',
    '[style.justify-content]': '_justifyContent()',
    '[style.gap]': '_gapValue()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inline {
  /** Alignment of items along the cross axis */
  align = input<InlineAlign>('center');

  /** Justification of items along the main axis */
  justify = input<InlineJustify>('start');

  /** Gap between items (using design tokens) */
  gap = input<SpacingToken>(2);

  /** Computed justify-content value */
  protected _justifyContent = computed(() => {
    const justifyMap: Record<InlineJustify, string> = {
      'start': 'flex-start',
      'center': 'center',
      'end': 'flex-end',
      'space-between': 'space-between',
      'space-around': 'space-around',
    };
    return justifyMap[this.justify()];
  });

  /** Computed gap value from token */
  protected _gapValue = computed(() => spacingVar(this.gap()));
}
