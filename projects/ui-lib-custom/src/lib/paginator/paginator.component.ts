import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import type { InputSignal, ModelSignal, OutputEmitterRef, Signal } from '@angular/core';
import type { PaginatorPageEvent, PaginatorSize, PaginatorVariant } from './paginator.types';

/** Default values for the Paginator component. */
export const PAGINATOR_DEFAULTS: {
  readonly ROWS: number;
  readonly PAGE_LINK_SIZE: number;
  readonly CURRENT_PAGE_REPORT_TEMPLATE: string;
} = {
  ROWS: 10,
  PAGE_LINK_SIZE: 5,
  CURRENT_PAGE_REPORT_TEMPLATE: '{currentPage} of {totalPages}',
} as const;

/**
 * Paginator provides page-based navigation controls for any list or data set.
 *
 * Supports three visual variants (material, bootstrap, minimal), three sizes,
 * optional first/last buttons, page-link windowing, rows-per-page select,
 * and a jump-to-page input.
 */
@Component({
  selector: 'ui-lib-paginator',
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-paginator',
    '[class.ui-lib-paginator--material]': 'variant() === "material"',
    '[class.ui-lib-paginator--bootstrap]': 'variant() === "bootstrap"',
    '[class.ui-lib-paginator--minimal]': 'variant() === "minimal"',
    '[class.ui-lib-paginator--sm]': 'size() === "sm"',
    '[class.ui-lib-paginator--md]': 'size() === "md"',
    '[class.ui-lib-paginator--lg]': 'size() === "lg"',
    '[class.ui-lib-paginator--empty]': 'isEmpty()',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class PaginatorComponent {
  /** Total number of records across all pages. */
  public readonly totalRecords: InputSignal<number> = input<number>(0);

  /** Number of records displayed per page. Two-way bindable. */
  public readonly rows: ModelSignal<number> = model<number>(PAGINATOR_DEFAULTS.ROWS);

  /** Zero-based index of the first record on the current page. Two-way bindable. */
  public readonly first: ModelSignal<number> = model<number>(0);

  /** Maximum number of page-link buttons shown in the windowed range. */
  public readonly pageLinkSize: InputSignal<number> = input<number>(
    PAGINATOR_DEFAULTS.PAGE_LINK_SIZE
  );

  /** Visual design variant. */
  public readonly variant: InputSignal<PaginatorVariant> = input<PaginatorVariant>('material');

  /** Size token controlling padding and font size. */
  public readonly size: InputSignal<PaginatorSize> = input<PaginatorSize>('md');

  /** When false, the paginator hides itself if there is only one page. */
  public readonly alwaysShow: InputSignal<boolean> = input<boolean>(true);

  /** Show buttons to jump to the first and last page. */
  public readonly showFirstLastIcon: InputSignal<boolean> = input<boolean>(true);

  /** Show the windowed list of numbered page-link buttons. */
  public readonly showPageLinks: InputSignal<boolean> = input<boolean>(true);

  /** Show a summary of the current page position (e.g. "1 of 10"). */
  public readonly showCurrentPageReport: InputSignal<boolean> = input<boolean>(false);

  /**
   * Template string for the current-page report.
   * Supported placeholders: {currentPage}, {totalPages}, {first}, {last}, {rows}, {totalRecords}.
   */
  public readonly currentPageReportTemplate: InputSignal<string> = input<string>(
    PAGINATOR_DEFAULTS.CURRENT_PAGE_REPORT_TEMPLATE
  );

  /** Array of row counts to show in the rows-per-page dropdown. Pass null to hide the dropdown. */
  public readonly rowsPerPageOptions: InputSignal<number[] | null> = input<number[] | null>(null);

  /** Show a numeric input that lets the user type a page number and press Enter. */
  public readonly showJumpToPageInput: InputSignal<boolean> = input<boolean>(false);

  /** Additional CSS class(es) applied to the inner content wrapper. */
  public readonly styleClass: InputSignal<string> = input<string>('');

  /** Accessible label for the navigation landmark (used on the host element). */
  public readonly ariaLabel: InputSignal<string> = input<string>('Pagination');

  /** Emitted whenever the active page or rows-per-page changes. */
  public readonly pageChange: OutputEmitterRef<PaginatorPageEvent> = output<PaginatorPageEvent>();

  // ── Derived state ──────────────────────────────────────────────────────────

  /** Total number of pages. */
  public readonly pageCount: Signal<number> = computed<number>((): number => {
    const rowCount: number = this.rows();
    return rowCount > 0 ? Math.ceil(this.totalRecords() / rowCount) : 0;
  });

  /** Zero-based index of the current page. */
  public readonly currentPage: Signal<number> = computed<number>((): number => {
    const rowCount: number = this.rows();
    return rowCount > 0 ? Math.floor(this.first() / rowCount) : 0;
  });

  /** True when the total record count is zero (no pages exist). */
  public readonly isEmpty: Signal<boolean> = computed<boolean>((): boolean => {
    return this.pageCount() === 0;
  });

  /** True when the current page is the first page. */
  public readonly isFirstPage: Signal<boolean> = computed<boolean>((): boolean => {
    return this.currentPage() === 0;
  });

  /** True when the current page is the last page. */
  public readonly isLastPage: Signal<boolean> = computed<boolean>((): boolean => {
    return this.currentPage() === this.pageCount() - 1;
  });

  /**
   * True when the paginator should render.
   * Respects `alwaysShow`; hides automatically when there is only one page.
   */
  public readonly shouldShow: Signal<boolean> = computed<boolean>((): boolean => {
    return this.alwaysShow() || this.pageCount() > 1;
  });

  /**
   * Windowed array of 1-based page numbers centred on the current page.
   * The window size is capped at `pageLinkSize`.
   */
  public readonly pageLinks: Signal<number[]> = computed<number[]>((): number[] => {
    const count: number = this.pageCount();
    const current: number = this.currentPage();
    const linkSize: number = this.pageLinkSize();
    const visiblePages: number = Math.min(linkSize, count);

    let start: number = Math.max(0, Math.ceil(current - visiblePages / 2));
    const end: number = Math.min(count - 1, start + visiblePages - 1);
    // Shift start left if window is smaller than linkSize near the end
    const delta: number = linkSize - (end - start + 1);
    start = Math.max(0, start - delta);

    const links: number[] = [];
    for (let page: number = start; page <= end; page++) {
      links.push(page + 1); // convert to 1-based for display
    }
    return links;
  });

  /** Formatted current-page report string with placeholders resolved. */
  public readonly currentPageReport: Signal<string> = computed<string>((): string => {
    const count: number = this.pageCount();
    const page: number = this.currentPage();
    const rowCount: number = this.rows();
    const total: number = this.totalRecords();
    const firstRecord: number = total > 0 ? this.first() + 1 : 0;
    const lastRecord: number = Math.min(this.first() + rowCount, total);

    return this.currentPageReportTemplate()
      .replace('{currentPage}', String(count > 0 ? page + 1 : 0))
      .replace('{totalPages}', String(count))
      .replace('{first}', String(firstRecord))
      .replace('{last}', String(lastRecord))
      .replace('{rows}', String(rowCount))
      .replace('{totalRecords}', String(total));
  });

  // ── Page navigation ────────────────────────────────────────────────────────

  /** Navigate to a specific zero-based page index. Emits `pageChange`. */
  public changePage(page: number): void {
    const count: number = this.pageCount();
    if (page < 0 || page >= count) {
      return;
    }
    const rowCount: number = this.rows();
    const newFirst: number = rowCount * page;
    this.first.set(newFirst);
    this.pageChange.emit({
      page,
      first: newFirst,
      rows: rowCount,
      pageCount: count,
    });
  }

  /** Navigate to the first page. */
  public changePageToFirst(event: Event): void {
    event.preventDefault();
    if (!this.isFirstPage()) {
      this.changePage(0);
    }
  }

  /** Navigate to the previous page. */
  public changePageToPrev(event: Event): void {
    event.preventDefault();
    this.changePage(this.currentPage() - 1);
  }

  /** Navigate to the next page. */
  public changePageToNext(event: Event): void {
    event.preventDefault();
    this.changePage(this.currentPage() + 1);
  }

  /** Navigate to the last page. */
  public changePageToLast(event: Event): void {
    event.preventDefault();
    if (!this.isLastPage()) {
      this.changePage(this.pageCount() - 1);
    }
  }

  /** Handle a numbered page-link click. `pageLink` is 1-based. */
  public onPageLinkClick(event: Event, pageLink: number): void {
    event.preventDefault();
    this.changePage(pageLink - 1);
  }

  /** Handle change event from the rows-per-page `<select>`. */
  public onRowsPerPageChange(event: Event): void {
    const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
    const newRows: number = Number(selectElement.value);
    // Preserve approximate scroll position when rows per page changes
    const newFirst: number = Math.floor(this.first() / newRows) * newRows;
    const newPageCount: number = Math.ceil(this.totalRecords() / newRows);
    this.rows.set(newRows);
    this.first.set(newFirst);
    this.pageChange.emit({
      page: Math.floor(newFirst / newRows),
      first: newFirst,
      rows: newRows,
      pageCount: newPageCount,
    });
  }

  /** Handle Enter key on the jump-to-page input. */
  public onJumpToPageKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const page: number = Number(inputElement.value) - 1;
    if (!isNaN(page) && page >= 0 && page < this.pageCount()) {
      this.changePage(page);
      inputElement.value = '';
    }
  }
}
