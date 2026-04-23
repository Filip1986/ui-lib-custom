import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type DebugElement,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataViewComponent } from './data-view.component';
import type { DataViewPageEvent, DataViewSortEvent, DataViewSortOrder } from './data-view.types';
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

interface DataViewItem {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  imports: [
    DataViewComponent,
    DataViewListItemDirective,
    DataViewGridItemDirective,
    DataViewHeaderDirective,
    DataViewFooterDirective,
    DataViewEmptyDirective,
    DataViewLoadingDirective,
    DataViewPaginatorLeftDirective,
    DataViewPaginatorRightDirective,
  ],
  template: `
    <ui-lib-data-view
      [value]="value()"
      [layout]="layout()"
      (layoutChange)="layout.set($event)"
      [size]="size()"
      [loading]="loading()"
      [emptyMessage]="emptyMessage()"
      [gridColumns]="gridColumns()"
      [gridGap]="gridGap()"
      [trackBy]="trackBy()"
      [dataKey]="dataKey()"
      [ariaLabel]="ariaLabel()"
      [paginator]="paginator()"
      [rows]="rows()"
      [first]="first()"
      (firstChange)="first.set($event)"
      [totalRecords]="totalRecords()"
      [rowsPerPageOptions]="rowsPerPageOptions()"
      [paginatorPosition]="paginatorPosition()"
      [showCurrentPageReport]="showCurrentPageReport()"
      [currentPageReportTemplate]="currentPageReportTemplate()"
      [sortField]="sortField()"
      [sortOrder]="sortOrder()"
      (pageChange)="onPageChange($event)"
      (sortChange)="onSortChange($event)"
    >
      @if (showListTemplate()) {
        <ng-template
          uiDataViewListItem
          let-item
          let-index="index"
          let-first="first"
          let-last="last"
          let-even="even"
          let-odd="odd"
        >
          <article
            class="list-item-template"
            [attr.data-index]="index"
            [attr.data-first]="first"
            [attr.data-last]="last"
            [attr.data-even]="even"
            [attr.data-odd]="odd"
          >
            <span class="list-item-name">{{ item.name }}</span>
          </article>
        </ng-template>
      }

      @if (showGridTemplate()) {
        <ng-template uiDataViewGridItem let-item>
          <article class="grid-item-template">
            <span class="grid-item-name">{{ item.name }}</span>
          </article>
        </ng-template>
      }

      @if (showHeaderTemplate()) {
        <ng-template uiDataViewHeader>
          <div class="header-template">Header content</div>
        </ng-template>
      }

      @if (showFooterTemplate()) {
        <ng-template uiDataViewFooter>
          <div class="footer-template">Footer content</div>
        </ng-template>
      }

      @if (showEmptyTemplate()) {
        <ng-template uiDataViewEmpty>
          <div class="empty-template">Custom empty</div>
        </ng-template>
      }

      @if (showLoadingTemplate()) {
        <ng-template uiDataViewLoading>
          <div class="loading-template">Custom loading</div>
        </ng-template>
      }

      @if (showPaginatorLeftTemplate()) {
        <ng-template uiDataViewPaginatorLeft>
          <div class="paginator-left-template">Paginator left</div>
        </ng-template>
      }

      @if (showPaginatorRightTemplate()) {
        <ng-template uiDataViewPaginatorRight>
          <div class="paginator-right-template">Paginator right</div>
        </ng-template>
      }
    </ui-lib-data-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DataViewHostComponent {
  public readonly value: WritableSignal<DataViewItem[]> = signal<DataViewItem[]>([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
  ]);

  public readonly layout: WritableSignal<'list' | 'grid'> = signal<'list' | 'grid'>('list');
  public readonly size: WritableSignal<'sm' | 'md' | 'lg'> = signal<'sm' | 'md' | 'lg'>('md');
  public readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  public readonly emptyMessage: WritableSignal<string> = signal<string>('No records found.');
  public readonly gridColumns: WritableSignal<number> = signal<number>(3);
  public readonly gridGap: WritableSignal<string> = signal<string>('1rem');
  public readonly trackBy: WritableSignal<((index: number, item: DataViewItem) => unknown) | null> =
    signal<((index: number, item: DataViewItem) => unknown) | null>(null);
  public readonly dataKey: WritableSignal<string | null> = signal<string | null>(null);
  public readonly ariaLabel: WritableSignal<string> = signal<string>('Data list');

  public readonly paginator: WritableSignal<boolean> = signal<boolean>(false);
  public readonly rows: WritableSignal<number> = signal<number>(10);
  public readonly first: WritableSignal<number> = signal<number>(0);
  public readonly totalRecords: WritableSignal<number | null> = signal<number | null>(null);
  public readonly rowsPerPageOptions: WritableSignal<number[] | null> = signal<number[] | null>(
    null
  );
  public readonly paginatorPosition: WritableSignal<'top' | 'bottom' | 'both'> = signal<
    'top' | 'bottom' | 'both'
  >('bottom');
  public readonly showCurrentPageReport: WritableSignal<boolean> = signal<boolean>(true);
  public readonly currentPageReportTemplate: WritableSignal<string> = signal<string>(
    'Showing {first} to {last} of {totalRecords} entries'
  );

  public readonly sortField: WritableSignal<string | null> = signal<string | null>(null);
  public readonly sortOrder: WritableSignal<DataViewSortOrder> = signal<DataViewSortOrder>(1);

  public readonly showListTemplate: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showGridTemplate: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showHeaderTemplate: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showFooterTemplate: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showEmptyTemplate: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showLoadingTemplate: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showPaginatorLeftTemplate: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showPaginatorRightTemplate: WritableSignal<boolean> = signal<boolean>(false);

  public readonly pageChanges: WritableSignal<DataViewPageEvent[]> = signal<DataViewPageEvent[]>(
    []
  );
  public readonly sortChanges: WritableSignal<DataViewSortEvent[]> = signal<DataViewSortEvent[]>(
    []
  );

  public onPageChange(event: DataViewPageEvent): void {
    this.pageChanges.update((items: DataViewPageEvent[]): DataViewPageEvent[] => [...items, event]);
  }

  public onSortChange(event: DataViewSortEvent): void {
    this.sortChanges.update((items: DataViewSortEvent[]): DataViewSortEvent[] => [...items, event]);
  }
}

function refreshFixture<T>(fixture: ComponentFixture<T>): void {
  fixture.changeDetectorRef.markForCheck();
  fixture.detectChanges();
}

function requiredElement<T extends Element>(root: ParentNode, selector: string): T {
  const element: T | null = root.querySelector(selector) as T | null;
  if (element === null) {
    throw new Error(`Expected element for selector: ${selector}`);
  }

  return element;
}

function createHostFixture(): ComponentFixture<DataViewHostComponent> {
  const fixture: ComponentFixture<DataViewHostComponent> =
    TestBed.createComponent(DataViewHostComponent);
  refreshFixture(fixture);
  return fixture;
}

function hostElement(fixture: ComponentFixture<DataViewHostComponent>): HTMLElement {
  return fixture.nativeElement as HTMLElement;
}

function dataViewElement(fixture: ComponentFixture<DataViewHostComponent>): HTMLElement {
  return requiredElement<HTMLElement>(hostElement(fixture), 'ui-lib-data-view');
}

function dataViewComponent(
  fixture: ComponentFixture<DataViewHostComponent>
): DataViewComponent<DataViewItem> {
  const debugElement: DebugElement = fixture.debugElement.query(By.directive(DataViewComponent));
  return debugElement.componentInstance as DataViewComponent<DataViewItem>;
}

describe('DataViewComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [DataViewHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  describe('Rendering', (): void => {
    it('renders with host class', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      expect(dataViewElement(fixture).classList.contains('ui-lib-data-view')).toBeTruthy();
    });

    it('renders list layout by default', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      const host: HTMLElement = dataViewElement(fixture);
      expect(host.classList.contains('ui-lib-data-view--list')).toBeTruthy();
      expect(host.classList.contains('ui-lib-data-view--grid')).toBeFalsy();
    });

    it('renders grid layout class when layout is grid', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.layout.set('grid');
      refreshFixture(fixture);

      const host: HTMLElement = dataViewElement(fixture);
      expect(host.classList.contains('ui-lib-data-view--grid')).toBeTruthy();
    });

    it('applies size classes', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.size.set('sm');
      refreshFixture(fixture);
      expect(dataViewElement(fixture).classList.contains('ui-lib-data-view--sm')).toBeTruthy();

      fixture.componentInstance.size.set('md');
      refreshFixture(fixture);
      expect(dataViewElement(fixture).classList.contains('ui-lib-data-view--md')).toBeTruthy();

      fixture.componentInstance.size.set('lg');
      refreshFixture(fixture);
      expect(dataViewElement(fixture).classList.contains('ui-lib-data-view--lg')).toBeTruthy();
    });

    it('sets aria-label attribute', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.ariaLabel.set('Products list');
      refreshFixture(fixture);

      expect(dataViewElement(fixture).getAttribute('aria-label')).toBe('Products list');
    });

    it('sets aria-busy when loading', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.loading.set(true);
      refreshFixture(fixture);

      expect(dataViewElement(fixture).getAttribute('aria-busy')).toBe('true');
      expect(dataViewElement(fixture).classList.contains('ui-lib-data-view--loading')).toBeTruthy();
    });
  });

  describe('Template projection', (): void => {
    it('renders list items using uiDataViewListItem template', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      const names: string[] = Array.from(
        hostElement(fixture).querySelectorAll('.list-item-name')
      ).map((element: Element): string => (element as HTMLElement).textContent.trim());

      expect(names).toEqual(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
    });

    it('renders grid items using uiDataViewGridItem template', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.layout.set('grid');
      refreshFixture(fixture);

      const names: string[] = Array.from(
        hostElement(fixture).querySelectorAll('.grid-item-name')
      ).map((element: Element): string => (element as HTMLElement).textContent.trim());

      expect(names).toEqual(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
    });

    it('provides correct list template context values', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      const rows: HTMLElement[] = Array.from(
        hostElement(fixture).querySelectorAll('.list-item-template')
      ) as HTMLElement[];
      const firstRow: HTMLElement | undefined = rows.at(0);
      const lastRow: HTMLElement | undefined = rows.at(-1);
      if (firstRow === undefined || lastRow === undefined) {
        throw new Error('Expected list template rows to be rendered.');
      }

      expect(firstRow.getAttribute('data-index')).toBe('0');
      expect(firstRow.getAttribute('data-first')).toBe('true');
      expect(firstRow.getAttribute('data-last')).toBe('false');
      expect(firstRow.getAttribute('data-even')).toBe('true');
      expect(firstRow.getAttribute('data-odd')).toBe('false');

      expect(lastRow.getAttribute('data-index')).toBe('4');
      expect(lastRow.getAttribute('data-first')).toBe('false');
      expect(lastRow.getAttribute('data-last')).toBe('true');
      expect(lastRow.getAttribute('data-even')).toBe('true');
      expect(lastRow.getAttribute('data-odd')).toBe('false');
    });

    it('shows empty item wrappers in grid mode when grid template is missing', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.layout.set('grid');
      fixture.componentInstance.showGridTemplate.set(false);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelectorAll('.grid-item-name').length).toBe(0);
      expect(hostElement(fixture).querySelectorAll('.ui-lib-data-view__item').length).toBe(5);
    });

    it('renders header template when provided', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.showHeaderTemplate.set(true);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('.header-template')?.textContent).toContain(
        'Header content'
      );
    });

    it('renders footer template when provided', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.showFooterTemplate.set(true);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('.footer-template')?.textContent).toContain(
        'Footer content'
      );
    });

    it('renders custom empty template when provided', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.value.set([]);
      fixture.componentInstance.showEmptyTemplate.set(true);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('.empty-template')?.textContent).toContain(
        'Custom empty'
      );
    });

    it('renders default empty message when no empty template is provided', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.value.set([]);
      fixture.componentInstance.emptyMessage.set('No data in test');
      refreshFixture(fixture);

      expect(
        hostElement(fixture).querySelector('.ui-lib-data-view__empty-default')?.textContent
      ).toContain('No data in test');
    });

    it('renders custom loading template when provided', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.loading.set(true);
      fixture.componentInstance.showLoadingTemplate.set(true);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('.loading-template')?.textContent).toContain(
        'Custom loading'
      );
    });

    it('renders default loading state when no loading template is provided', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.loading.set(true);
      refreshFixture(fixture);

      expect(
        hostElement(fixture).querySelector('.ui-lib-data-view__loading-default')?.textContent
      ).toContain('Loading...');
    });
  });

  describe('Layout switching', (): void => {
    it('switches from list to grid layout when layout changes', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.layout.set('grid');
      refreshFixture(fixture);

      expect(dataViewElement(fixture).classList.contains('ui-lib-data-view--grid')).toBeTruthy();
      expect(hostElement(fixture).querySelectorAll('.grid-item-name').length).toBe(5);
    });

    it('applies grid columns and gap custom properties in grid mode', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.layout.set('grid');
      fixture.componentInstance.gridColumns.set(4);
      fixture.componentInstance.gridGap.set('2rem');
      refreshFixture(fixture);

      const content: HTMLElement = requiredElement<HTMLElement>(
        hostElement(fixture),
        '.ui-lib-data-view__content--grid'
      );
      expect(content.style.getPropertyValue('--uilib-data-view-grid-columns')).toBe('4');
      expect(content.style.getPropertyValue('--uilib-data-view-grid-gap')).toBe('2rem');
    });
  });

  describe('Pagination (client-side)', (): void => {
    it('does not show paginator by default', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      expect(hostElement(fixture).querySelector('nav[aria-label="Pagination"]')).toBeNull();
    });

    it('shows paginator when enabled', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('nav[aria-label="Pagination"]')).toBeTruthy();
    });

    it('returns page index 0 and no navigation items when there are no records', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.value.set([]);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      const component: DataViewComponent<DataViewItem> = dataViewComponent(fixture);
      expect(component.currentPage()).toBe(0);
      expect(component.pageNavigationItems()).toEqual([]);
    });

    it('displays correct number of items per page', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelectorAll('.list-item-name').length).toBe(2);
    });

    it('navigates to next and previous pages', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      const nextButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        'button[aria-label="Go to next page"]'
      );
      nextButton.click();
      refreshFixture(fixture);

      expect(fixture.componentInstance.first()).toBe(2);
      const firstVisibleItem: HTMLElement = requiredElement<HTMLElement>(
        hostElement(fixture),
        '.list-item-name'
      );
      expect(firstVisibleItem.textContent).toContain('Item 3');

      const previousButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        'button[aria-label="Go to previous page"]'
      );
      previousButton.click();
      refreshFixture(fixture);

      expect(fixture.componentInstance.first()).toBe(0);
    });

    it('navigates to first and last pages', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      const lastButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        'button[aria-label="Go to last page"]'
      );
      lastButton.click();
      refreshFixture(fixture);

      expect(fixture.componentInstance.first()).toBe(4);

      const firstButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        'button[aria-label="Go to first page"]'
      );
      firstButton.click();
      refreshFixture(fixture);

      expect(fixture.componentInstance.first()).toBe(0);
    });

    it('disables previous and first buttons on first page', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      expect(
        requiredElement<HTMLButtonElement>(
          hostElement(fixture),
          'button[aria-label="Go to first page"]'
        ).disabled
      ).toBeTruthy();
      expect(
        requiredElement<HTMLButtonElement>(
          hostElement(fixture),
          'button[aria-label="Go to previous page"]'
        ).disabled
      ).toBeTruthy();
    });

    it('disables next and last buttons on last page', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      fixture.componentInstance.first.set(4);
      refreshFixture(fixture);

      expect(
        requiredElement<HTMLButtonElement>(
          hostElement(fixture),
          'button[aria-label="Go to next page"]'
        ).disabled
      ).toBeTruthy();
      expect(
        requiredElement<HTMLButtonElement>(
          hostElement(fixture),
          'button[aria-label="Go to last page"]'
        ).disabled
      ).toBeTruthy();
    });

    it('shows page report text with resolved values', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      fixture.componentInstance.first.set(2);
      refreshFixture(fixture);

      const reportText: string = requiredElement<HTMLElement>(
        hostElement(fixture),
        '.ui-lib-data-view__page-report'
      ).textContent.trim();
      expect(reportText).toBe('Showing 3 to 4 of 5 entries');
    });

    it('shows rows-per-page dropdown and changes rows resetting to page 0', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      fixture.componentInstance.first.set(2);
      fixture.componentInstance.rowsPerPageOptions.set([1, 2, 4]);
      refreshFixture(fixture);

      const select: HTMLSelectElement = requiredElement<HTMLSelectElement>(
        hostElement(fixture),
        'select.ui-lib-data-view__rows-select'
      );
      select.value = '4';
      select.dispatchEvent(new Event('change', { bubbles: true }));
      refreshFixture(fixture);

      expect(fixture.componentInstance.first()).toBe(0);
      expect(hostElement(fixture).querySelectorAll('.list-item-name').length).toBe(4);
    });

    it('normalizes invalid rows values to 1 when rows-per-page changes', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      const component: DataViewComponent<DataViewItem> = dataViewComponent(fixture);
      component.onRowsPerPageChange(Number.NaN);
      refreshFixture(fixture);

      const pageEvent: DataViewPageEvent | undefined = fixture.componentInstance
        .pageChanges()
        .at(-1);
      expect(pageEvent?.rows).toBe(1);
    });

    it('clamps requested page to 0 when page count is zero', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.value.set([]);
      refreshFixture(fixture);

      const component: DataViewComponent<DataViewItem> = dataViewComponent(fixture);
      component.onPageChange(5);
      refreshFixture(fixture);

      const pageEvent: DataViewPageEvent | undefined = fixture.componentInstance
        .pageChanges()
        .at(-1);
      expect(pageEvent?.page).toBe(0);
      expect(pageEvent?.pageCount).toBe(0);
    });

    it('renders left ellipsis for middle pages in long pagination ranges', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(1);
      fixture.componentInstance.value.set(
        Array.from(
          { length: 12 },
          (_unused: unknown, index: number): DataViewItem => ({
            id: index + 1,
            name: `Item ${index + 1}`,
          })
        )
      );
      fixture.componentInstance.first.set(6);
      refreshFixture(fixture);

      const ellipsisItems: HTMLElement[] = Array.from(
        hostElement(fixture).querySelectorAll('.ui-lib-data-view__paginator-ellipsis')
      ) as HTMLElement[];
      expect(ellipsisItems.length).toBe(2);
      expect(
        ellipsisItems.every((item: HTMLElement): boolean => item.textContent.includes('...'))
      ).toBe(true);
    });
  });

  describe('Pagination (server-side)', (): void => {
    it('does not slice items when totalRecords is explicitly set', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      fixture.componentInstance.first.set(4);
      fixture.componentInstance.totalRecords.set(50);
      fixture.componentInstance.value.set([
        { id: 200, name: 'Server Item A' },
        { id: 201, name: 'Server Item B' },
      ]);
      refreshFixture(fixture);

      const names: string[] = Array.from(
        hostElement(fixture).querySelectorAll('.list-item-name')
      ).map((element: Element): string => element.textContent.trim());
      expect(names).toEqual(['Server Item A', 'Server Item B']);
    });

    it('uses totalRecords for page count and emits pageChange for fetch flow', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      fixture.componentInstance.totalRecords.set(10);
      fixture.componentInstance.value.set([
        { id: 10, name: 'Remote 1' },
        { id: 11, name: 'Remote 2' },
      ]);
      refreshFixture(fixture);

      expect(
        hostElement(fixture).querySelectorAll('.ui-lib-data-view__paginator-page').length
      ).toBeGreaterThan(0);

      requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        'button[aria-label="Go to next page"]'
      ).click();
      refreshFixture(fixture);

      const events: DataViewPageEvent[] = fixture.componentInstance.pageChanges();
      expect(events.at(-1)?.pageCount).toBe(5);
      expect(events.at(-1)?.page).toBe(1);
    });
  });

  describe('Sorting', (): void => {
    it('accepts sortField and sortOrder inputs without changing rendered order', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.value.set([
        { id: 3, name: 'C item' },
        { id: 1, name: 'A item' },
        { id: 2, name: 'B item' },
      ]);
      fixture.componentInstance.sortField.set('name');
      fixture.componentInstance.sortOrder.set(-1);
      refreshFixture(fixture);

      const names: string[] = Array.from(
        hostElement(fixture).querySelectorAll('.list-item-name')
      ).map((element: Element): string => element.textContent.trim());
      expect(names).toEqual(['C item', 'A item', 'B item']);
    });

    it('emits sortChange when emitSortChange is called', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      const component: DataViewComponent<DataViewItem> = dataViewComponent(fixture);

      component.emitSortChange('name', -1);
      refreshFixture(fixture);

      const events: DataViewSortEvent[] = fixture.componentInstance.sortChanges();
      expect(events).toEqual([{ sortField: 'name', sortOrder: -1 }]);
    });
  });

  describe('Edge cases', (): void => {
    it('shows empty state for empty arrays', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.value.set([]);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('.ui-lib-data-view__empty-default')).toBeTruthy();
    });

    it('handles null value gracefully', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.value.set(null as unknown as DataViewItem[]);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('.ui-lib-data-view__empty-default')).toBeTruthy();
    });

    it('handles undefined value gracefully', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.value.set(undefined as unknown as DataViewItem[]);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('.ui-lib-data-view__empty-default')).toBeTruthy();
    });

    it('updates rendered items reactively when value changes', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.value.set([
        { id: 100, name: 'Updated 1' },
        { id: 101, name: 'Updated 2' },
      ]);
      refreshFixture(fixture);

      const names: string[] = Array.from(
        hostElement(fixture).querySelectorAll('.list-item-name')
      ).map((element: Element): string => element.textContent.trim());
      expect(names).toEqual(['Updated 1', 'Updated 2']);
    });

    it('trackBy and dataKey resolve stable tracking keys', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      const component: DataViewComponent<DataViewItem> = dataViewComponent(fixture);
      const item: DataViewItem = { id: 44, name: 'Tracked' };

      fixture.componentInstance.dataKey.set('id');
      refreshFixture(fixture);
      expect(component.trackItem(0, item)).toBe(44);

      fixture.componentInstance.trackBy.set(
        (index: number, currentItem: DataViewItem): unknown => `${index}-${currentItem.name}`
      );
      refreshFixture(fixture);
      expect(component.trackItem(2, item)).toBe('2-Tracked');
    });

    it('clamps out-of-range first input back to page start', (): void => {
      const componentFixture: ComponentFixture<DataViewComponent<DataViewItem>> =
        TestBed.createComponent(DataViewComponent<DataViewItem>);
      componentFixture.componentRef.setInput('value', [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]);
      componentFixture.componentRef.setInput('rows', 2);
      componentFixture.componentRef.setInput('first', 99);
      componentFixture.detectChanges();

      expect(componentFixture.componentInstance.first()).toBe(0);
    });
  });

  describe('Accessibility', (): void => {
    it('content container uses role list and item wrappers use listitem', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      expect(
        hostElement(fixture).querySelector('.ui-lib-data-view__content[role="list"]')
      ).toBeTruthy();
      const itemRoles: string[] = Array.from(
        hostElement(fixture).querySelectorAll('.ui-lib-data-view__item')
      ).map((element: Element): string => (element as HTMLElement).getAttribute('role') ?? '');
      expect(itemRoles.every((role: string): boolean => role === 'listitem')).toBeTruthy();
    });

    it('pagination nav and buttons expose descriptive aria labels', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      expect(hostElement(fixture).querySelector('nav[aria-label="Pagination"]')).toBeTruthy();
      expect(
        hostElement(fixture).querySelector('button[aria-label="Go to first page"]')
      ).toBeTruthy();
      expect(
        hostElement(fixture).querySelector('button[aria-label="Go to previous page"]')
      ).toBeTruthy();
      expect(
        hostElement(fixture).querySelector('button[aria-label="Go to next page"]')
      ).toBeTruthy();
      expect(
        hostElement(fixture).querySelector('button[aria-label="Go to last page"]')
      ).toBeTruthy();
      expect(hostElement(fixture).querySelector('button[aria-label="Go to page 1"]')).toBeTruthy();
    });

    it('marks current page and disabled states accessibly', (): void => {
      const fixture: ComponentFixture<DataViewHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      refreshFixture(fixture);

      const currentPageButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        '.ui-lib-data-view__paginator-page[aria-current="page"]'
      );
      expect(currentPageButton.textContent.trim()).toBe('1');
      expect(currentPageButton.disabled).toBeTruthy();

      const previousButton: HTMLButtonElement = requiredElement<HTMLButtonElement>(
        hostElement(fixture),
        'button[aria-label="Go to previous page"]'
      );
      expect(previousButton.disabled).toBeTruthy();
    });
  });
});
