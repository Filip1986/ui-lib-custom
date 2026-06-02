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

export interface AriaRow {
  readonly attribute: string;
  readonly element: string;
  readonly value: string;
  readonly notes: string;
}

/**
 * Shared ARIA-attributes reference table used in Accessibility sections.
 * Renders a ui-lib-table with Attribute / Element / Value / Notes columns.
 * Notes support raw HTML (for <code> tags).
 *
 * @example
 * ```html
 * <app-doc-aria-table [rows]="ariaRows" />
 * ```
 */
@Component({
  selector: 'app-doc-aria-table',
  standalone: true,
  imports: [TableComponent, TableColumnComponent, TableColumnBodyDirective],
  templateUrl: './doc-aria-table.component.html',
  styleUrl: './doc-aria-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DocAriaTableComponent {
  public readonly rows: InputSignal<readonly AriaRow[]> = input.required<readonly AriaRow[]>();

  public readonly tableRows: Signal<AriaRow[]> = computed<AriaRow[]>(
    (): AriaRow[] => this.rows() as AriaRow[],
  );
}
