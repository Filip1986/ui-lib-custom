import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import {
  SPACING_TOKENS,
  SpacingToken,
  GRID_COLUMNS,
  GridColumns,
  STACK_TOKENS,
  StackToken,
} from '../design-tokens';

const stackVar = (token: StackToken) => `var(--uilib-stack-${token}, ${STACK_TOKENS[token]})`;
const spaceVar = (token: SpacingToken) => `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;

export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'stretch';

/**
 * Grid - A performant CSS Grid layout primitive
 *
 * Provides a simple grid system without runtime overhead.
 * Uses signals and host bindings for optimal performance.
 */
@Component({
  selector: 'ui-lib-grid',
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

  /**
   * Semantic spacing using stack tokens (preferred for grid gaps).
   * Accepts t-shirt sizes that map to `--uilib-stack-*` CSS variables.
   */
  spacing = input<StackToken | SpacingToken | number | null>(null);

  /** Back-compat numeric gap using spacing scale (remains supported). */
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

  /** Computed gap value from semantic spacing (falls back to numeric gap) */
  protected _gapValue = computed(() => {
    const semantic = this.spacing();
    if (semantic !== null && semantic !== undefined) {
      return typeof semantic === 'number'
        ? spaceVar(semantic as SpacingToken)
        : stackVar(semantic as StackToken);
    }
    return spaceVar(this.gap());
  });
}
