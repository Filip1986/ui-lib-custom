import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CONTAINER_MAX_WIDTHS, ContainerSize, SPACING_TOKENS, SpacingToken } from './tokens';

/**
 * Container - A performant container layout primitive
 *
 * Centers content with max-width constraints and padding.
 * Single element, no wrapper divs, optimal performance.
 */
@Component({
  selector: 'uilib-container',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[style.width]': '"100%"',
    '[style.max-width]': '_maxWidth()',
    '[style.margin-left]': '_centered() ? "auto" : null',
    '[style.margin-right]': '_centered() ? "auto" : null',
    '[style.padding-left]': '_paddingValue()',
    '[style.padding-right]': '_paddingValue()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Container {
  /** Maximum width of the container */
  size = input<ContainerSize>('lg');

  /** Whether to center the container */
  centered = input<boolean>(true);

  /** Horizontal padding (using design tokens) */
  padding = input<SpacingToken>(4);

  /** Computed max-width value */
  protected _maxWidth = computed(() => CONTAINER_MAX_WIDTHS[this.size()]);

  /** Computed centered value (for host binding) */
  protected _centered = computed(() => this.centered());

  /** Computed padding value from token */
  protected _paddingValue = computed(() => SPACING_TOKENS[this.padding()]);
}
