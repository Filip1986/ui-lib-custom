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
  GRID_COLUMNS,
  type GridColumns,
  STACK_TOKENS,
  type StackToken,
} from 'ui-lib-custom/tokens';

const stackVar: (token: StackToken) => string = (token: StackToken): string =>
  `var(--uilib-stack-${token}, ${STACK_TOKENS[token]})`;
const spaceVar: (token: SpacingToken) => string = (token: SpacingToken): string =>
  `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;

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
  encapsulation: ViewEncapsulation.None,
})
export class Grid {
  /** Number of columns (using design tokens) */
  public readonly columns: InputSignal<GridColumns> = input<GridColumns>(12);

  /** Alignment of items along the block axis */
  public readonly align: InputSignal<GridAlign> = input<GridAlign>('stretch');

  /** Justification of items along the inline axis */
  public readonly justify: InputSignal<GridJustify> = input<GridJustify>('stretch');

  /**
   * Semantic spacing using stack tokens (preferred for grid gaps).
   * Accepts t-shirt sizes that map to `--uilib-stack-*` CSS variables.
   */
  public readonly spacing: InputSignal<StackToken | SpacingToken | number | null> = input<
    StackToken | SpacingToken | number | null
  >(null);

  /** Back-compat numeric gap using spacing scale (remains supported). */
  public readonly gap: InputSignal<SpacingToken> = input<SpacingToken>(4);

  /** Optional minimum column width (enables auto-fit) */
  public readonly minColumnWidth: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Computed grid-template-columns value */
  protected readonly _gridTemplateColumns: Signal<string> = computed<string>((): string => {
    const minWidth: string | undefined = this.minColumnWidth();
    if (minWidth) {
      // Auto-fit responsive grid
      return `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
    }
    // Fixed column count
    return `repeat(${GRID_COLUMNS[this.columns()]}, 1fr)`;
  });

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
