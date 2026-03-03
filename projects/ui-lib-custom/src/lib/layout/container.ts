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
  CONTAINER_MAX_WIDTHS,
  type ContainerSize,
  SPACING_TOKENS,
  type SpacingToken,
  INSET_TOKENS,
  type InsetToken,
} from 'ui-lib-custom/tokens';

const spaceVar: (token: SpacingToken) => string = (token: SpacingToken): string =>
  `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;
const insetVar: (token: InsetToken) => string = (token: InsetToken): string =>
  `var(--uilib-inset-${token}, ${INSET_TOKENS[token]})`;
const containerVar: (size: ContainerSize) => string = (size: ContainerSize): string =>
  `var(--uilib-container-${size}, ${CONTAINER_MAX_WIDTHS[size]})`;

/**
 * Container - A performant container layout primitive
 *
 * Centers content with max-width constraints and padding.
 * Single element, no wrapper divs, optimal performance.
 */
@Component({
  selector: 'ui-lib-container',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[style.width]': '"100%"',
    '[style.max-width]': '_maxWidth()',
    '[style.margin-left]': '_centered() ? "auto" : null',
    '[style.margin-right]': '_centered() ? "auto" : null',
    '[style.padding-left]': '_paddingValue()',
    '[style.padding-right]': '_paddingValue()',
    '[style.padding-top]': '_paddingValue()',
    '[style.padding-bottom]': '_paddingValue()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Container {
  /** Maximum width of the container */
  public readonly size: InputSignal<ContainerSize> = input<ContainerSize>('lg');

  /** Whether to center the container */
  public readonly centered: InputSignal<boolean> = input<boolean>(false);

  /**
   * Semantic inset padding using inset tokens (preferred).
   * Accepts t-shirt sizes that map to `--uilib-inset-*` CSS variables.
   */
  public readonly inset: InputSignal<Exclude<InsetToken, 'xs'> | null> = input<Exclude<
    InsetToken,
    'xs'
  > | null>(null);

  /** Back-compat horizontal padding using numeric spacing tokens. */
  public readonly padding: InputSignal<SpacingToken> = input<SpacingToken>(4);

  /** Computed max-width value */
  protected readonly _maxWidth: Signal<string> = computed<string>((): string =>
    containerVar(this.size())
  );

  /** Computed centered value (for host binding) */
  protected readonly _centered: Signal<boolean> = computed<boolean>((): boolean => this.centered());

  /** Computed padding value from inset (falls back to numeric padding) */
  protected readonly _paddingValue: Signal<string> = computed<string>((): string => {
    const semantic: Exclude<InsetToken, 'xs'> | null = this.inset();
    if (semantic !== null) {
      return insetVar(semantic as InsetToken);
    }
    return spaceVar(this.padding());
  });
}
