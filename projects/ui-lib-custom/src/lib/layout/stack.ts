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
  STACK_TOKENS,
  type StackToken,
} from 'ui-lib-custom/tokens';
import type { StackDirection, StackAlign, StackJustify, StackTag, StackWrap } from './stack.types';

export type { StackDirection, StackAlign, StackJustify, StackTag, StackWrap } from './stack.types';

const stackVar: (token: StackToken) => string = (token: StackToken): string =>
  `var(--uilib-stack-${token}, ${STACK_TOKENS[token]})`;
const spaceVar: (token: SpacingToken) => string = (token: SpacingToken): string =>
  `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;

/**
 * Stack - A performant vertical or horizontal layout primitive
 *
 * Renders a single element with flexbox for predictable layouts.
 * Uses signals for optimal change detection performance.
 */
@Component({
  selector: 'ui-lib-stack',
  standalone: true,
  templateUrl: './stack.html',
  host: {
    '[style.display]': '"contents"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Stack {
  /** Rendered HTML tag for semantics; defaults to a neutral block element. */
  public readonly as: InputSignal<StackTag | null> = input<StackTag | null>(null);

  /** Alias of `as` kept for API readability. */
  public readonly tag: InputSignal<StackTag | null> = input<StackTag | null>(null);

  /** Accessible label for semantic containers such as `nav`. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Optional ARIA role passthrough for non-semantic containers. */
  public readonly role: InputSignal<string | null> = input<string | null>(null);

  /** Direction of the stack layout */
  public readonly direction: InputSignal<StackDirection> = input<StackDirection>('vertical');

  /** Alignment of items along the cross axis */
  public readonly align: InputSignal<StackAlign> = input<StackAlign>('stretch');

  /** Justification of items along the main axis */
  public readonly justify: InputSignal<StackJustify> = input<StackJustify>('start');

  /** Flex wrap behavior */
  public readonly wrap: InputSignal<StackWrap> = input<StackWrap>('nowrap');

  /**
   * Semantic spacing using stack tokens (preferred).
   * Accepts t-shirt sizes that map to `--uilib-stack-*` CSS variables.
   */
  public readonly spacing: InputSignal<StackToken | SpacingToken | number | null> = input<
    StackToken | SpacingToken | number | null
  >(null);

  /** Back-compat numeric gap using spacing scale (remains supported). */
  public readonly gap: InputSignal<SpacingToken> = input<SpacingToken>(4);

  /** Final rendered tag name (defaults to div). */
  protected readonly _renderTag: Signal<StackTag> = computed<StackTag>(
    (): StackTag => this.as() ?? this.tag() ?? 'div',
  );

  /** Computed aria-label for semantic elements that need a label. */
  protected readonly _resolvedAriaLabel: Signal<string | null> = computed<string | null>(
    (): string | null => {
      return this._renderTag() === 'nav' ? this.ariaLabel() : null;
    },
  );

  /** Resolved role; list role is unnecessary when rendering native lists. */
  protected readonly _resolvedRole: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const renderTag: StackTag = this._renderTag();
      if (renderTag === 'ul' || renderTag === 'ol') {
        return null;
      }
      return this.role();
    },
  );

  /** Computed flex-direction value */
  protected readonly _flexDirection: Signal<string> = computed<string>((): string =>
    this.direction() === 'vertical' ? 'column' : 'row',
  );

  /** Computed justify-content value */
  protected readonly _justifyContent: Signal<string> = computed<string>((): string => {
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

  /** Computed flex-wrap value */
  protected readonly _flexWrap: Signal<string> = computed<string>((): string => this.wrap());

  /** Computed gap value from semantic spacing (falls back to numeric gap) */
  protected readonly _gapValue: Signal<string> = computed<string>((): string => {
    const semantic: StackToken | SpacingToken | number | null = this.spacing();
    if (semantic !== null) {
      return typeof semantic === 'number'
        ? spaceVar(semantic as SpacingToken)
        : stackVar(semantic as StackToken);
    }
    return spaceVar(this.gap());
  });
}
