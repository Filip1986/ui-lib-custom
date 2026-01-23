import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { SPACING_TOKENS, SpacingToken, GRID_COLUMNS, GridColumns } from '../design-tokens';

export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'stretch';

/**
 * Grid - A performant CSS Grid layout primitive
 *
 * Provides a simple grid system without runtime overhead.
 * Uses signals and host bindings for optimal performance.
 */
@Component({
  selector: 'uilib-grid',
  standalone: true,
  template: '<ng-content />',
  host: {
    '[style.display]': '"grid"',
    '[style.grid-template-columns]': '_gridTemplateColumns()',
    '[style.align-items]': 'align()',
    '[style.justify-items]': 'justify()',
    '[style.gap]': '_gapValue()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grid {
  /** Number of columns (using design tokens) */
  columns = input<GridColumns>(12);

  /** Alignment of items along the block axis */
  align = input<GridAlign>('stretch');

  /** Justification of items along the inline axis */
  justify = input<GridJustify>('stretch');

  /** Gap between items (using design tokens) */
  gap = input<SpacingToken>(4);

  /** Optional minimum column width (enables auto-fit) */
  minColumnWidth = input<string | undefined>(undefined);

  /** Computed grid-template-columns value */
  protected _gridTemplateColumns = computed(() => {
    const minWidth = this.minColumnWidth();
    if (minWidth) {
      // Auto-fit responsive grid
      return `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
    }
    // Fixed column count
    return `repeat(${GRID_COLUMNS[this.columns()]}, 1fr)`;
  });

  /** Computed gap value from token */
  protected _gapValue = computed(() => SPACING_TOKENS[this.gap()]);
}
