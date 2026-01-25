import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CONTAINER_MAX_WIDTHS, ContainerSize, SPACING_TOKENS, SpacingToken, INSET_TOKENS, InsetToken } from '../design-tokens';

const spaceVar = (token: SpacingToken) => `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;
const insetVar = (token: InsetToken) => `var(--uilib-inset-${token}, ${INSET_TOKENS[token]})`;
const containerVar = (size: ContainerSize) => `var(--uilib-container-${size}, ${CONTAINER_MAX_WIDTHS[size]})`;

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
})
export class Container {
  /** Maximum width of the container */
  size = input<ContainerSize>('lg');

  /** Whether to center the container */
  centered = input<boolean>(true);

  /**
   * Semantic inset padding using inset tokens (preferred).
   * Accepts t-shirt sizes that map to `--uilib-inset-*` CSS variables.
   */
  inset = input<Exclude<InsetToken, 'xs'> | null>(null);

  /** Back-compat horizontal padding using numeric spacing tokens. */
  padding = input<SpacingToken>(4);

  /** Computed max-width value */
  protected _maxWidth = computed(() => containerVar(this.size()));

  /** Computed centered value (for host binding) */
  protected _centered = computed(() => this.centered());

  /** Computed padding value from inset (falls back to numeric padding) */
  protected _paddingValue = computed(() => {
    const semantic = this.inset();
    if (semantic !== null && semantic !== undefined) {
      return insetVar(semantic as InsetToken);
    }
    return spaceVar(this.padding());
  });
}
