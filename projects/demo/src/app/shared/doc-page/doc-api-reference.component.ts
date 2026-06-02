import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';
import {
  TableComponent,
  TableColumnComponent,
  TableColumnBodyDirective,
} from 'ui-lib-custom/table';

export type ApiPropKind = 'input' | 'output' | 'property' | 'name';

export interface ApiPropRow {
  readonly name: string;
  readonly type: string;
  readonly default?: string;
  readonly description: string;
  readonly required?: boolean;
}

/**
 * Shared API-reference table used across all demo pages.
 * Renders a ui-lib-table with name / type / default / description columns.
 * The first-column heading adapts to the `kind` input ('Input', 'Output', etc.).
 * The Default column is automatically hidden when no row has a `default` value,
 * unless `showDefault` is explicitly provided.
 *
 * @example
 * ```html
 * <app-doc-api-reference title="Inputs" kind="input" [rows]="inputRows" />
 * <app-doc-api-reference title="Outputs" kind="output" [rows]="outputRows" [showDefault]="false" />
 * ```
 */
@Component({
  selector: 'app-doc-api-reference',
  standalone: true,
  imports: [TableComponent, TableColumnComponent, TableColumnBodyDirective],
  templateUrl: './doc-api-reference.component.html',
  styleUrl: './doc-api-reference.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DocApiReferenceComponent {
  /** Optional heading rendered above the table, e.g. "Inputs", "Outputs". */
  public readonly title: InputSignal<string> = input<string>('');

  /** Controls the label shown in the first column header. */
  public readonly kind: InputSignal<ApiPropKind> = input<ApiPropKind>('input');

  /** Row data for the table. */
  public readonly rows: InputSignal<readonly ApiPropRow[]> =
    input.required<readonly ApiPropRow[]>();

  /**
   * When `true`, the Default column is shown.
   * When `false`, it is hidden.
   * Defaults to auto-detect: shown if at least one row has a `default` value.
   */
  public readonly showDefault: InputSignal<boolean | undefined> = input<boolean | undefined>(
    undefined,
  );

  /** Resolved first-column label based on `kind`. */
  public readonly nameColumnLabel: Signal<string> = computed<string>((): string => {
    const map: Record<ApiPropKind, string> = {
      input: 'Input',
      output: 'Output',
      property: 'Property',
      name: 'Name',
    };
    return map[this.kind()];
  });

  /** Whether the Default column should be rendered. */
  public readonly showDefaultColumn: Signal<boolean> = computed<boolean>((): boolean => {
    const override: boolean | undefined = this.showDefault();
    if (override !== undefined) {
      return override;
    }
    return this.rows().some((row: ApiPropRow): boolean => row.default !== undefined);
  });

  /** Rows cast to a mutable array as required by ui-lib-table's `value` input. */
  public readonly tableRows: Signal<ApiPropRow[]> = computed<ApiPropRow[]>(
    (): ApiPropRow[] => this.rows() as ApiPropRow[],
  );
}
