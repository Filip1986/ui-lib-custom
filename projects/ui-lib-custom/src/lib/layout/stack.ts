import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import { SPACING_TOKENS, SpacingToken, STACK_TOKENS, StackToken } from 'ui-lib-custom/tokens';

const stackVar = (token: StackToken): string =>
  `var(--uilib-stack-${token}, ${STACK_TOKENS[token]})`;
const spaceVar = (token: SpacingToken): string =>
  `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;

export type StackDirection = 'vertical' | 'horizontal';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

/**
 * Stack - A performant vertical or horizontal layout primitive
 *
 * Renders a single element with flexbox for predictable layouts.
 * Uses signals for optimal change detection performance.
 */
@Component({
  selector: 'ui-lib-stack',
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
  encapsulation: ViewEncapsulation.None,
})
export class Stack {
  /** Direction of the stack layout */
  public readonly direction = input<StackDirection>('vertical');

  /** Alignment of items along the cross axis */
  public readonly align = input<StackAlign>('stretch');

  /** Justification of items along the main axis */
  public readonly justify = input<StackJustify>('start');

  /**
   * Semantic spacing using stack tokens (preferred).
   * Accepts t-shirt sizes that map to `--uilib-stack-*` CSS variables.
   */
  public readonly spacing = input<StackToken | SpacingToken | number | null>(null);

  /** Back-compat numeric gap using spacing scale (remains supported). */
  public readonly gap = input<SpacingToken>(4);

  /** Computed flex-direction value */
  protected readonly _flexDirection = computed<string>((): string =>
    this.direction() === 'vertical' ? 'column' : 'row'
  );

  /** Computed justify-content value */
  protected readonly _justifyContent = computed<string>((): string => {
    const justifyMap: Record<StackJustify, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      'space-between': 'space-between',
      'space-around': 'space-around',
      'space-evenly': 'space-evenly',
    };
    return justifyMap[this.justify()];
  });

  /** Computed gap value from semantic spacing (falls back to numeric gap) */
  protected readonly _gapValue = computed<string>((): string => {
    const semantic = this.spacing();
    if (semantic !== null) {
      return typeof semantic === 'number'
        ? spaceVar(semantic as SpacingToken)
        : stackVar(semantic as StackToken);
    }
    return spaceVar(this.gap());
  });
}
