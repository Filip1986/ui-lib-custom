import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  ViewEncapsulation,
  type InputSignal,
  type Signal,
} from '@angular/core';
import {
  SPACING_TOKENS,
  type SpacingToken,
  INLINE_TOKENS,
  type InlineToken,
} from 'ui-lib-custom/tokens';
import type { InlineAlign, InlineJustify } from './inline.types';

export type { InlineAlign, InlineJustify } from './inline.types';

const inlineVar: (token: InlineToken) => string = (token: InlineToken): string =>
  `var(--uilib-inline-${token}, ${INLINE_TOKENS[token]})`;
const spaceVar: (token: SpacingToken) => string = (token: SpacingToken): string =>
  `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;

/**
 * Inline - A performant inline/horizontal layout primitive with wrapping
 *
 * Similar to Stack but with flex-wrap enabled for responsive inline layouts.
 * Ideal for tags, chips, button groups, or any inline content that should wrap.
 */
@Component({
  selector: 'ui-lib-inline',
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
  encapsulation: ViewEncapsulation.None,
})
export class Inline {
  /** Alignment of items along the cross axis */
  public readonly align: InputSignal<InlineAlign> = input<InlineAlign>('center');

  /** Justification of items along the main axis */
  public readonly justify: InputSignal<InlineJustify> = input<InlineJustify>('start');

  /**
   * Semantic spacing using inline tokens (preferred).
   * Accepts t-shirt sizes that map to `--uilib-inline-*` CSS variables.
   */
  public readonly spacing: InputSignal<InlineToken | SpacingToken | number | null> = input<
    InlineToken | SpacingToken | number | null
  >(null);

  /** Back-compat numeric gap using spacing scale (remains supported). */
  public readonly gap: InputSignal<SpacingToken> = input<SpacingToken>(2);

  /** Computed justify-content value */
  protected readonly _justifyContent: Signal<string> = computed<string>((): string => {
    const justifyMap: Record<InlineJustify, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      'space-between': 'space-between',
      'space-around': 'space-around',
    };
    return justifyMap[this.justify()];
  });

  /** Computed gap value from semantic spacing (falls back to numeric gap) */
  protected readonly _gapValue: Signal<string> = computed<string>((): string => {
    const semantic: InlineToken | SpacingToken | number | null = this.spacing();
    if (semantic !== null) {
      return typeof semantic === 'number'
        ? spaceVar(semantic as SpacingToken)
        : inlineVar(semantic as InlineToken);
    }
    return spaceVar(this.gap());
  });
}
