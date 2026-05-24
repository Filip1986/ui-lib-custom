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
import type { GridAlign, GridJustify } from './grid.types';

export type { GridAlign, GridJustify } from './grid.types';

const stackVar: (token: StackToken) => string = (token: StackToken): string =>
  `var(--uilib-stack-${token}, ${STACK_TOKENS[token]})`;
const spaceVar: (token: SpacingToken) => string = (token: SpacingToken): string =>
  `var(--uilib-space-${token}, ${SPACING_TOKENS[token]})`;
const DEFAULT_GRID_COLUMNS: GridColumns = 12;

function isSpacingToken(value: number): value is SpacingToken {
  return value in SPACING_TOKENS;
}

/**
 * Grid - A performant CSS Grid layout primitive
 *
 * Provides a simple grid system without runtime overhead.
 * Uses signals and host bindings for optimal performance.
 */
@Component({
  selector: 'ui-lib-grid',
  standalone: true,
  templateUrl: './grid.html',
  host: {
    '[style.display]': '"grid"',
    '[style.--uilib-grid-columns]': '_gridTemplateColumns()',
    '[style.--uilib-grid-gap]': '_gapValue()',
    '[style.--uilib-grid-row-gap]': '_rowGapValue()',
    '[style.--uilib-grid-column-gap]': '_columnGapValue()',
    '[style.grid-template-columns]': '"var(--uilib-grid-columns)"',
    '[style.align-items]': 'align()',
    '[style.justify-items]': 'justify()',
    '[style.gap]': '"var(--uilib-grid-gap)"',
    '[style.row-gap]': '"var(--uilib-grid-row-gap)"',
    '[style.column-gap]': '"var(--uilib-grid-column-gap)"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Grid {
  /** Number of columns (using design tokens) */
  public readonly columns: InputSignal<GridColumns | string> = input<GridColumns | string>(
    DEFAULT_GRID_COLUMNS,
  );

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

  /** Optional row-gap override (falls back to gap when unset). */
  public readonly rowGap: InputSignal<StackToken | SpacingToken | number | null> = input<
    StackToken | SpacingToken | number | null
  >(null);

  /** Optional column-gap override (falls back to gap when unset). */
  public readonly columnGap: InputSignal<StackToken | SpacingToken | number | null> = input<
    StackToken | SpacingToken | number | null
  >(null);

  /** Optional minimum column width (enables auto-fit) */
  public readonly minColumnWidth: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );

  /** Computed grid-template-columns value */
  protected readonly _gridTemplateColumns: Signal<string> = computed<string>((): string => {
    const minWidth: string | undefined = this.minColumnWidth();
    if (minWidth) {
      // Auto-fit responsive grid
      return `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
    }
    const columns: GridColumns | string = this.columns();
    if (typeof columns === 'string') {
      return columns.trim().length > 0
        ? columns
        : `repeat(${GRID_COLUMNS[DEFAULT_GRID_COLUMNS]}, 1fr)`;
    }
    // Fixed column count
    return `repeat(${GRID_COLUMNS[columns]}, 1fr)`;
  });

  /** Computed gap value from semantic spacing (falls back to numeric gap) */
  protected readonly _gapValue: Signal<string> = computed<string>((): string => {
    return this.resolveGap(this.spacing());
  });

  /** Computed row-gap value (falls back to gap). */
  protected readonly _rowGapValue: Signal<string> = computed<string>((): string => {
    const resolvedRowGap: string | null = this.resolveOptionalGap(this.rowGap());
    return resolvedRowGap ?? this._gapValue();
  });

  /** Computed column-gap value (falls back to gap). */
  protected readonly _columnGapValue: Signal<string> = computed<string>((): string => {
    const resolvedColumnGap: string | null = this.resolveOptionalGap(this.columnGap());
    return resolvedColumnGap ?? this._gapValue();
  });

  private resolveGap(value: StackToken | SpacingToken | number | null): string {
    if (value === null) {
      return spaceVar(this.gap());
    }
    if (typeof value === 'number') {
      return isSpacingToken(value) ? spaceVar(value) : spaceVar(this.gap());
    }
    return stackVar(value);
  }

  private resolveOptionalGap(value: StackToken | SpacingToken | number | null): string | null {
    if (value === null) {
      return null;
    }
    if (typeof value === 'number') {
      return isSpacingToken(value) ? spaceVar(value) : spaceVar(this.gap());
    }
    return stackVar(value);
  }
}
