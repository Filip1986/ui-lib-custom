import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type {
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  TrackByFunction,
  WritableSignal,
} from '@angular/core';
import type {
  DataViewGridItemContext,
  DataViewLayout,
  DataViewListItemContext,
  DataViewPageEvent,
  DataViewSize,
  DataViewSortEvent,
  DataViewSortOrder,
} from './data-view.types';
import {
  DataViewEmptyDirective,
  DataViewFooterDirective,
  DataViewGridItemDirective,
  DataViewHeaderDirective,
  DataViewListItemDirective,
  DataViewLoadingDirective,
  DataViewPaginatorLeftDirective,
  DataViewPaginatorRightDirective,
} from './data-view.template-directives';

type DataViewPaginatorPosition = 'top' | 'bottom' | 'both';
type DataViewPageNavigationItem = number | 'ellipsis-left' | 'ellipsis-right';

/**
 * Core DataView shell that renders list/grid item templates with loading and empty states.
 */
@Component({
  selector: 'ui-lib-data-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-view.component.html',
  styleUrl: './data-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-data-view',
    '[class.ui-lib-data-view--list]': 'layout() === "list"',
    '[class.ui-lib-data-view--grid]': 'layout() === "grid"',
    '[class.ui-lib-data-view--sm]': 'size() === "sm"',
    '[class.ui-lib-data-view--md]': 'size() === "md"',
    '[class.ui-lib-data-view--lg]': 'size() === "lg"',
    '[class.ui-lib-data-view--loading]': 'loading()',
    '[class.ui-lib-data-view--empty]': 'isEmpty() && !loading()',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-busy]': 'loading()',
  },
})
export class DataViewComponent<T> {
  public readonly value: InputSignal<T[]> = input.required<T[]>();
  public readonly layout: ModelSignal<DataViewLayout> = model<DataViewLayout>('list');
  public readonly size: InputSignal<DataViewSize> = input<DataViewSize>('md');
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly emptyMessage: InputSignal<string> = input<string>('No records found.');
  public readonly gridColumns: InputSignal<number> = input<number>(3);
  public readonly gridGap: InputSignal<string> = input<string>('1rem');
  public readonly trackBy: InputSignal<TrackByFunction<T> | null> =
    input<TrackByFunction<T> | null>(null);
  public readonly dataKey: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabel: InputSignal<string> = input<string>('Data list');
  public readonly paginator: InputSignal<boolean> = input<boolean>(false);
  public readonly rows: InputSignal<number> = input<number>(10);
  public readonly first: ModelSignal<number> = model<number>(0);
  public readonly totalRecords: InputSignal<number | null> = input<number | null>(null);
  public readonly rowsPerPageOptions: InputSignal<number[] | null> = input<number[] | null>(null);
  public readonly paginatorPosition: InputSignal<DataViewPaginatorPosition> =
    input<DataViewPaginatorPosition>('bottom');
  public readonly showCurrentPageReport: InputSignal<boolean> = input<boolean>(true);
  public readonly currentPageReportTemplate: InputSignal<string> = input<string>(
    'Showing {first} to {last} of {totalRecords} entries'
  );
  public readonly sortField: InputSignal<string | null> = input<string | null>(null);
  public readonly sortOrder: InputSignal<DataViewSortOrder> = input<DataViewSortOrder>(1);

  public readonly pageChange: OutputEmitterRef<DataViewPageEvent> = output<DataViewPageEvent>();
  public readonly sortChange: OutputEmitterRef<DataViewSortEvent> = output<DataViewSortEvent>();

  public readonly listItemTemplate: Signal<TemplateRef<DataViewListItemContext<T>> | undefined> =
    contentChild(DataViewListItemDirective, { read: TemplateRef });
  public readonly gridItemTemplate: Signal<TemplateRef<DataViewGridItemContext<T>> | undefined> =
    contentChild(DataViewGridItemDirective, { read: TemplateRef });
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataViewHeaderDirective,
    { read: TemplateRef }
  );
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataViewFooterDirective,
    { read: TemplateRef }
  );
  public readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataViewEmptyDirective,
    { read: TemplateRef }
  );
  public readonly loadingTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataViewLoadingDirective,
    { read: TemplateRef }
  );
  public readonly paginatorLeftTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataViewPaginatorLeftDirective,
    { read: TemplateRef }
  );
  public readonly paginatorRightTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    DataViewPaginatorRightDirective,
    { read: TemplateRef }
  );

  private readonly internalRows: WritableSignal<number> = signal<number>(10);

  constructor() {
    effect((): void => {
      this.internalRows.set(this.normalizeRows(this.rows()));
    });

    effect((): void => {
      const nextFirst: number = this.clampFirst(this.first());
      if (this.first() !== nextFirst) {
        this.first.set(nextFirst);
      }
    });
  }

  public readonly isEmpty: Signal<boolean> = computed<boolean>(
    (): boolean => this.resolveItems().length === 0
  );
  public readonly activeTemplate: Signal<
    TemplateRef<DataViewListItemContext<T> | DataViewGridItemContext<T>> | undefined
  > = computed<TemplateRef<DataViewListItemContext<T> | DataViewGridItemContext<T>> | undefined>(
    (): TemplateRef<DataViewListItemContext<T> | DataViewGridItemContext<T>> | undefined =>
      this.layout() === 'list'
        ? this.listItemTemplate()
        : (this.gridItemTemplate() as TemplateRef<DataViewGridItemContext<T>> | undefined)
  );
  public readonly effectiveRows: Signal<number> = computed<number>((): number =>
    this.normalizeRows(this.internalRows())
  );
  public readonly effectiveTotalRecords: Signal<number> = computed<number>((): number => {
    const explicitTotalRecords: number | null = this.totalRecords();
    return explicitTotalRecords ?? this.resolveItems().length;
  });
  public readonly pageCount: Signal<number> = computed<number>((): number => {
    const totalRecords: number = this.effectiveTotalRecords();
    const rows: number = this.effectiveRows();
    if (totalRecords <= 0 || rows <= 0) {
      return 0;
    }
    return Math.ceil(totalRecords / rows);
  });
  public readonly currentPage: Signal<number> = computed<number>((): number => {
    if (this.pageCount() === 0) {
      return 0;
    }
    return Math.floor(this.first() / this.effectiveRows());
  });
  public readonly isFirstPage: Signal<boolean> = computed<boolean>(
    (): boolean => this.currentPage() === 0
  );
  public readonly isLastPage: Signal<boolean> = computed<boolean>((): boolean => {
    const pages: number = this.pageCount();
    if (pages <= 1) {
      return true;
    }
    return this.currentPage() >= pages - 1;
  });
  public readonly pageNavigationItems: Signal<readonly DataViewPageNavigationItem[]> = computed<
    readonly DataViewPageNavigationItem[]
  >((): readonly DataViewPageNavigationItem[] => this.createPageNavigationItems());
  public readonly pageReportText: Signal<string> = computed<string>((): string => {
    const totalRecords: number = this.effectiveTotalRecords();
    const rows: number = this.effectiveRows();
    const firstItemNumber: number = totalRecords > 0 ? this.first() + 1 : 0;
    const lastItemNumber: number =
      totalRecords > 0 ? Math.min(this.first() + rows, totalRecords) : 0;
    const currentPageNumber: number = this.pageCount() > 0 ? this.currentPage() + 1 : 0;

    return this.currentPageReportTemplate()
      .replaceAll('{currentPage}', String(currentPageNumber))
      .replaceAll('{totalPages}', String(this.pageCount()))
      .replaceAll('{first}', String(firstItemNumber))
      .replaceAll('{last}', String(lastItemNumber))
      .replaceAll('{totalRecords}', String(totalRecords))
      .replaceAll('{rows}', String(rows));
  });
  public readonly showTopPaginator: Signal<boolean> = computed<boolean>((): boolean => {
    const position: DataViewPaginatorPosition = this.paginatorPosition();
    return this.paginator() && (position === 'top' || position === 'both');
  });
  public readonly showBottomPaginator: Signal<boolean> = computed<boolean>((): boolean => {
    const position: DataViewPaginatorPosition = this.paginatorPosition();
    return this.paginator() && (position === 'bottom' || position === 'both');
  });
  public readonly displayedItems: Signal<T[]> = computed<T[]>((): T[] => {
    if (!this.paginator()) {
      return this.resolveItems();
    }

    if (this.totalRecords() !== null) {
      // Server-side mode: caller provides only current page data.
      return this.resolveItems();
    }

    const startIndex: number = this.first();
    const endIndex: number = startIndex + this.effectiveRows();
    return this.resolveItems().slice(startIndex, endIndex);
  });
  public readonly itemContexts: Signal<DataViewListItemContext<T>[]> = computed<
    DataViewListItemContext<T>[]
  >((): DataViewListItemContext<T>[] => {
    const items: T[] = this.displayedItems();
    return items.map(
      (item: T, index: number): DataViewListItemContext<T> => ({
        $implicit: item,
        index,
        first: index === 0,
        last: index === items.length - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0,
      })
    );
  });

  public trackItem(index: number, item: T): unknown {
    const customTrackBy: TrackByFunction<T> | null = this.trackBy();
    if (customTrackBy !== null) {
      return customTrackBy(index, item);
    }

    const key: string | null = this.dataKey();
    if (key !== null && item !== null && typeof item === 'object') {
      const recordItem: Record<string, unknown> = item as Record<string, unknown>;
      if (key in recordItem) {
        return recordItem[key];
      }
    }

    return index;
  }

  public trackPageNavigationItem(index: number, item: DataViewPageNavigationItem): string {
    if (typeof item === 'number') {
      return `page-${item}`;
    }
    return `${item}-${index}`;
  }

  public isPageNumber(item: DataViewPageNavigationItem): boolean {
    return typeof item === 'number';
  }

  public pageNumber(item: DataViewPageNavigationItem): number {
    return typeof item === 'number' ? item : 0;
  }

  public pageAriaLabel(pageIndex: number): string {
    return `Go to page ${pageIndex + 1}`;
  }

  public onPageChange(page: number): void {
    const nextPage: number = this.clampPage(page);
    const nextFirst: number = nextPage * this.effectiveRows();
    this.first.set(nextFirst);
    this.emitPageChange(nextPage, nextFirst);
  }

  public onNextPage(): void {
    this.onPageChange(this.currentPage() + 1);
  }

  public onPreviousPage(): void {
    this.onPageChange(this.currentPage() - 1);
  }

  public onFirstPage(): void {
    this.onPageChange(0);
  }

  public onLastPage(): void {
    if (this.pageCount() <= 0) {
      return;
    }
    this.onPageChange(this.pageCount() - 1);
  }

  public onRowsPerPageChange(rows: number): void {
    this.internalRows.set(this.normalizeRows(rows));
    this.first.set(0);
    this.emitPageChange(0, 0);
  }

  public onRowsPerPageSelectChange(event: Event): void {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    const nextRows: number = Number(target.value);
    this.onRowsPerPageChange(nextRows);
  }

  public emitSortChange(sortField: string, sortOrder: DataViewSortOrder): void {
    this.sortChange.emit({ sortField, sortOrder });
  }

  private emitPageChange(page: number, first: number): void {
    this.pageChange.emit({
      first,
      rows: this.effectiveRows(),
      page,
      pageCount: this.pageCount(),
    });
  }

  private normalizeRows(rows: number): number {
    if (!Number.isFinite(rows) || rows <= 0) {
      return 1;
    }
    return Math.floor(rows);
  }

  private clampPage(page: number): number {
    if (this.pageCount() <= 0) {
      return 0;
    }
    return Math.max(0, Math.min(page, this.pageCount() - 1));
  }

  private resolveItems(): T[] {
    const items: unknown = this.value();
    return Array.isArray(items) ? (items as T[]) : [];
  }

  private clampFirst(first: number): number {
    const normalizedFirst: number = Math.max(0, Math.floor(first));
    const pages: number = this.pageCount();
    if (pages <= 0) {
      return 0;
    }

    const maxFirst: number = (pages - 1) * this.effectiveRows();
    if (normalizedFirst > maxFirst) {
      return 0;
    }
    return normalizedFirst;
  }

  private createPageNavigationItems(): readonly DataViewPageNavigationItem[] {
    const pages: number = this.pageCount();
    if (pages <= 0) {
      return [];
    }

    const currentPage: number = this.currentPage();
    const start: number = Math.max(0, currentPage - 2);
    const end: number = Math.min(pages - 1, currentPage + 2);
    const pageItems: DataViewPageNavigationItem[] = [];

    if (start > 0) {
      pageItems.push(0);
      if (start > 1) {
        pageItems.push('ellipsis-left');
      }
    }

    for (let page: number = start; page <= end; page += 1) {
      pageItems.push(page);
    }

    if (end < pages - 1) {
      if (end < pages - 2) {
        pageItems.push('ellipsis-right');
      }
      pageItems.push(pages - 1);
    }

    return pageItems;
  }
}
