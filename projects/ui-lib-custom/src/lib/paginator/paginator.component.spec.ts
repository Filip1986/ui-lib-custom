import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { DebugElement, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginatorComponent, PAGINATOR_DEFAULTS } from './paginator.component';
import type { PaginatorPageEvent, PaginatorSize, PaginatorVariant } from './paginator.types';
@Component({
  selector: 'test-host',
  standalone: true,
  imports: [PaginatorComponent],
  template: `
    <ui-lib-paginator
      [totalRecords]="totalRecords()"
      [rows]="rows()"
      [first]="first()"
      [pageLinkSize]="pageLinkSize()"
      [variant]="variant()"
      [size]="size()"
      [alwaysShow]="alwaysShow()"
      [showFirstLastIcon]="showFirstLastIcon()"
      [showPageLinks]="showPageLinks()"
      [showCurrentPageReport]="showCurrentPageReport()"
      [currentPageReportTemplate]="currentPageReportTemplate()"
      [rowsPerPageOptions]="rowsPerPageOptions()"
      [showJumpToPageInput]="showJumpToPageInput()"
      (pageChange)="onPageChange($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly totalRecords: WritableSignal<number> = signal<number>(100);
  public readonly rows: WritableSignal<number> = signal<number>(10);
  public readonly first: WritableSignal<number> = signal<number>(0);
  public readonly pageLinkSize: WritableSignal<number> = signal<number>(5);
  public readonly variant: WritableSignal<PaginatorVariant> = signal<PaginatorVariant>('material');
  public readonly size: WritableSignal<PaginatorSize> = signal<PaginatorSize>('md');
  public readonly alwaysShow: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showFirstLastIcon: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showPageLinks: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showCurrentPageReport: WritableSignal<boolean> = signal<boolean>(false);
  public readonly currentPageReportTemplate: WritableSignal<string> = signal<string>(
    PAGINATOR_DEFAULTS.CURRENT_PAGE_REPORT_TEMPLATE
  );
  public readonly rowsPerPageOptions: WritableSignal<number[] | null> = signal<number[] | null>(
    null
  );
  public readonly showJumpToPageInput: WritableSignal<boolean> = signal<boolean>(false);
  public readonly lastEvent: WritableSignal<PaginatorPageEvent | null> =
    signal<PaginatorPageEvent | null>(null);
  public onPageChange(event: PaginatorPageEvent): void {
    this.lastEvent.set(event);
  }
}
function getTrimmedTextContent(element: Element): string {
  return element.textContent.trim();
}

function queryRequired(
  fixture: ComponentFixture<TestHostComponent>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

function getPageButtonAtIndex(
  fixture: ComponentFixture<TestHostComponent>,
  index: number
): HTMLButtonElement {
  const buttons: HTMLButtonElement[] = getPageButtons(fixture);
  const button: HTMLButtonElement | undefined = buttons[index];
  if (button === undefined) {
    throw new Error(`Expected page button at index ${index}`);
  }
  return button;
}

function getPageButtons(fixture: ComponentFixture<TestHostComponent>): HTMLButtonElement[] {
  const pageButtonDebugElements: DebugElement[] = fixture.debugElement.queryAll(
    By.css('.uilib-paginator-page')
  );
  return pageButtonDebugElements.map((debugElement: DebugElement): HTMLButtonElement => {
    return debugElement.nativeElement as HTMLButtonElement;
  });
}
function getNavButton(
  fixture: ComponentFixture<TestHostComponent>,
  selector: string
): HTMLButtonElement {
  const navigationButtonDebugElement: DebugElement = queryRequired(fixture, selector);
  return navigationButtonDebugElement.nativeElement as HTMLButtonElement;
}
describe('PaginatorComponent', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', (): void => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it('should render the paginator content wrapper', (): void => {
    const content: DebugElement | null = fixture.debugElement.query(
      By.css('.uilib-paginator-content')
    );
    expect(content).toBeTruthy();
  });
  it('should render 5 page-link buttons for 100 records / 10 rows', (): void => {
    const firstButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 0);
    expect(getPageButtons(fixture).length).toBe(5);
    expect(getTrimmedTextContent(firstButton)).toBe('1');
  });

  it('should mark the first page button as selected on load', (): void => {
    const firstButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 0);
    expect(firstButton.classList).toContain('uilib-paginator-page--selected');
    expect(firstButton.getAttribute('aria-current')).toBe('page');
  });
  it('should render first and last buttons by default', (): void => {
    const first: DebugElement | null = fixture.debugElement.query(By.css('.uilib-paginator-first'));
    const last: DebugElement | null = fixture.debugElement.query(By.css('.uilib-paginator-last'));
    expect(first).toBeTruthy();
    expect(last).toBeTruthy();
  });
  it('should hide first/last buttons when showFirstLastIcon is false', (): void => {
    host.showFirstLastIcon.set(false);
    fixture.detectChanges();
    const first: DebugElement | null = fixture.debugElement.query(By.css('.uilib-paginator-first'));
    expect(first).toBeNull();
  });
  it('should hide page links when showPageLinks is false', (): void => {
    host.showPageLinks.set(false);
    fixture.detectChanges();
    expect(getPageButtons(fixture).length).toBe(0);
  });
  it('should apply material variant host class by default', (): void => {
    const paginatorElement: HTMLElement = queryRequired(fixture, 'ui-lib-paginator')
      .nativeElement as HTMLElement;
    expect(paginatorElement.classList).toContain('ui-lib-paginator--material');
  });
  it('should apply bootstrap variant host class', (): void => {
    host.variant.set('bootstrap');
    fixture.detectChanges();
    const paginatorElement: HTMLElement = queryRequired(fixture, 'ui-lib-paginator')
      .nativeElement as HTMLElement;
    expect(paginatorElement.classList).toContain('ui-lib-paginator--bootstrap');
  });
  it('should apply minimal variant host class', (): void => {
    host.variant.set('minimal');
    fixture.detectChanges();
    const paginatorElement: HTMLElement = queryRequired(fixture, 'ui-lib-paginator')
      .nativeElement as HTMLElement;
    expect(paginatorElement.classList).toContain('ui-lib-paginator--minimal');
  });
  it('should apply md size host class by default', (): void => {
    const paginatorElement: HTMLElement = queryRequired(fixture, 'ui-lib-paginator')
      .nativeElement as HTMLElement;
    expect(paginatorElement.classList).toContain('ui-lib-paginator--md');
  });
  it('should apply sm size host class', (): void => {
    host.size.set('sm');
    fixture.detectChanges();
    const paginatorElement: HTMLElement = queryRequired(fixture, 'ui-lib-paginator')
      .nativeElement as HTMLElement;
    expect(paginatorElement.classList).toContain('ui-lib-paginator--sm');
  });
  it('should apply lg size host class', (): void => {
    host.size.set('lg');
    fixture.detectChanges();
    const paginatorElement: HTMLElement = queryRequired(fixture, 'ui-lib-paginator')
      .nativeElement as HTMLElement;
    expect(paginatorElement.classList).toContain('ui-lib-paginator--lg');
  });
  it('should navigate to page 2 when the second page button is clicked', (): void => {
    const secondButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 1);
    secondButton.click();
    fixture.detectChanges();

    const updatedSecondButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 1);
    expect(updatedSecondButton.classList).toContain('uilib-paginator-page--selected');
    expect(host.lastEvent()?.page).toBe(1);
    expect(host.lastEvent()?.first).toBe(10);
  });
  it('should navigate to next page on next button click', (): void => {
    getNavButton(fixture, '.uilib-paginator-next').click();
    fixture.detectChanges();
    expect(host.lastEvent()?.page).toBe(1);
  });
  it('should navigate to previous page on prev button click', (): void => {
    const secondButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 1);
    secondButton.click();
    fixture.detectChanges();
    host.lastEvent.set(null);
    getNavButton(fixture, '.uilib-paginator-prev').click();
    fixture.detectChanges();
    expect(host.lastEvent()?.page).toBe(0);
  });
  it('should navigate to last page on last button click', (): void => {
    getNavButton(fixture, '.uilib-paginator-last').click();
    fixture.detectChanges();
    expect(host.lastEvent()?.page).toBe(9);
  });
  it('should navigate to first page on first button click after navigating away', (): void => {
    getNavButton(fixture, '.uilib-paginator-last').click();
    fixture.detectChanges();
    host.lastEvent.set(null);
    getNavButton(fixture, '.uilib-paginator-first').click();
    fixture.detectChanges();
    expect(host.lastEvent()?.page).toBe(0);
  });
  it('should disable first and prev buttons when on first page', (): void => {
    const firstButton: HTMLButtonElement = getNavButton(fixture, '.uilib-paginator-first');
    const prevButton: HTMLButtonElement = getNavButton(fixture, '.uilib-paginator-prev');
    expect(firstButton.disabled).toBe(true);
    expect(prevButton.disabled).toBe(true);
  });
  it('should disable last and next buttons when on last page', (): void => {
    getNavButton(fixture, '.uilib-paginator-last').click();
    fixture.detectChanges();
    const nextButton: HTMLButtonElement = getNavButton(fixture, '.uilib-paginator-next');
    const lastButton: HTMLButtonElement = getNavButton(fixture, '.uilib-paginator-last');
    expect(nextButton.disabled).toBe(true);
    expect(lastButton.disabled).toBe(true);
  });
  it('should emit correct pageChange payload', (): void => {
    const thirdButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 2);
    thirdButton.click();
    fixture.detectChanges();
    expect(host.lastEvent()).toEqual({
      page: 2,
      first: 20,
      rows: 10,
      pageCount: 10,
    });
  });
  it('should limit page links to pageLinkSize', (): void => {
    host.pageLinkSize.set(3);
    fixture.detectChanges();
    expect(getPageButtons(fixture).length).toBe(3);
  });
  it('should window page links around the current page', (): void => {
    getNavButton(fixture, '.uilib-paginator-last').click();
    fixture.detectChanges();
    const buttons: HTMLButtonElement[] = getPageButtons(fixture);
    const labels: string[] = buttons.map((button: HTMLButtonElement): string => {
      return getTrimmedTextContent(button);
    });
    expect(labels).toContain('10');
  });
  it('should hide when alwaysShow is false and there is only one page', (): void => {
    host.totalRecords.set(5);
    host.rows.set(10);
    host.alwaysShow.set(false);
    fixture.detectChanges();
    const content: DebugElement | null = fixture.debugElement.query(
      By.css('.uilib-paginator-content')
    );
    expect(content).toBeNull();
  });
  it('should show when alwaysShow is false but there are multiple pages', (): void => {
    host.alwaysShow.set(false);
    fixture.detectChanges();
    const content: DebugElement | null = fixture.debugElement.query(
      By.css('.uilib-paginator-content')
    );
    expect(content).toBeTruthy();
  });
  it('should not render current page report by default', (): void => {
    const report: DebugElement | null = fixture.debugElement.query(
      By.css('.uilib-paginator-current')
    );
    expect(report).toBeNull();
  });
  it('should render current page report when enabled', (): void => {
    host.showCurrentPageReport.set(true);
    fixture.detectChanges();
    const report: DebugElement | null = fixture.debugElement.query(
      By.css('.uilib-paginator-current')
    );
    expect(report).toBeTruthy();
    const reportElement: HTMLElement = (report as DebugElement).nativeElement as HTMLElement;
    expect(getTrimmedTextContent(reportElement)).toBe('1 of 10');
  });
  it('should update the report template placeholders correctly', (): void => {
    host.showCurrentPageReport.set(true);
    host.currentPageReportTemplate.set(
      'Page {currentPage} of {totalPages} ({totalRecords} records)'
    );
    fixture.detectChanges();
    const report: DebugElement = queryRequired(fixture, '.uilib-paginator-current');
    const reportElement: HTMLElement = report.nativeElement as HTMLElement;
    expect(getTrimmedTextContent(reportElement)).toBe('Page 1 of 10 (100 records)');
  });
  it('should not render rows-per-page select by default', (): void => {
    const select: DebugElement | null = fixture.debugElement.query(
      By.css('.uilib-paginator-rpp-select')
    );
    expect(select).toBeNull();
  });
  it('should render rows-per-page select when options are provided', (): void => {
    host.rowsPerPageOptions.set([5, 10, 25]);
    fixture.detectChanges();
    const select: DebugElement = queryRequired(fixture, '.uilib-paginator-rpp-select');
    expect(select).toBeTruthy();
    const options: DebugElement[] = select.queryAll(By.css('option'));
    expect(options.length).toBe(3);
  });
  it('should update rows and emit pageChange on rows-per-page change', (): void => {
    host.rowsPerPageOptions.set([5, 10, 25]);
    fixture.detectChanges();
    const selectElement: HTMLSelectElement = queryRequired(fixture, '.uilib-paginator-rpp-select')
      .nativeElement as HTMLSelectElement;
    selectElement.value = '25';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(host.lastEvent()?.rows).toBe(25);
    expect(host.lastEvent()?.pageCount).toBe(4);
  });
  it('should not render jump-to-page input by default', (): void => {
    const input: DebugElement | null = fixture.debugElement.query(
      By.css('.uilib-paginator-jtp-input')
    );
    expect(input).toBeNull();
  });
  it('should render jump-to-page input when enabled', (): void => {
    host.showJumpToPageInput.set(true);
    fixture.detectChanges();
    const input: DebugElement = queryRequired(fixture, '.uilib-paginator-jtp-input');
    expect(input).toBeTruthy();
  });
  it('should navigate to the entered page when Enter is pressed', (): void => {
    host.showJumpToPageInput.set(true);
    fixture.detectChanges();
    const inputElement: HTMLInputElement = queryRequired(fixture, '.uilib-paginator-jtp-input')
      .nativeElement as HTMLInputElement;
    inputElement.value = '5';
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(host.lastEvent()?.page).toBe(4);
  });
  it('should not navigate when a non-Enter key is pressed on jump-to-page input', (): void => {
    host.showJumpToPageInput.set(true);
    fixture.detectChanges();
    const inputElement: HTMLInputElement = queryRequired(fixture, '.uilib-paginator-jtp-input')
      .nativeElement as HTMLInputElement;
    inputElement.value = '5';
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    fixture.detectChanges();
    expect(host.lastEvent()).toBeNull();
  });
  it('should apply empty host class when totalRecords is 0', (): void => {
    host.totalRecords.set(0);
    fixture.detectChanges();
    const paginatorElement: HTMLElement = queryRequired(fixture, 'ui-lib-paginator')
      .nativeElement as HTMLElement;
    expect(paginatorElement.classList).toContain('ui-lib-paginator--empty');
  });
  it('should disable all nav buttons when totalRecords is 0', (): void => {
    host.totalRecords.set(0);
    fixture.detectChanges();
    const prevButton: HTMLButtonElement = getNavButton(fixture, '.uilib-paginator-prev');
    const nextButton: HTMLButtonElement = getNavButton(fixture, '.uilib-paginator-next');
    expect(prevButton.disabled).toBe(true);
    expect(nextButton.disabled).toBe(true);
  });
  it('should have a navigation aria-label on the host element', (): void => {
    const paginatorElement: HTMLElement = queryRequired(fixture, 'ui-lib-paginator')
      .nativeElement as HTMLElement;
    expect(paginatorElement.getAttribute('aria-label')).toBe('Pagination');
  });
  it('should mark the selected page with aria-current="page"', (): void => {
    const firstButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 0);
    const secondButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 1);
    expect(firstButton.getAttribute('aria-current')).toBe('page');
    expect(secondButton.getAttribute('aria-current')).toBeNull();
  });
  it('should have aria-label on nav buttons', (): void => {
    const previousButton: HTMLButtonElement = getNavButton(fixture, '.uilib-paginator-prev');
    const nextButton: HTMLButtonElement = getNavButton(fixture, '.uilib-paginator-next');
    expect(previousButton.getAttribute('aria-label')).toBe('Previous page');
    expect(nextButton.getAttribute('aria-label')).toBe('Next page');
  });
  it('should have numbered aria-label on page-link buttons', (): void => {
    const firstButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 0);
    const fifthButton: HTMLButtonElement = getPageButtonAtIndex(fixture, 4);
    expect(firstButton.getAttribute('aria-label')).toBe('Page 1');
    expect(fifthButton.getAttribute('aria-label')).toBe('Page 5');
  });
  it('should export PAGINATOR_DEFAULTS with expected keys', (): void => {
    expect(PAGINATOR_DEFAULTS.ROWS).toBe(10);
    expect(PAGINATOR_DEFAULTS.PAGE_LINK_SIZE).toBe(5);
    expect(PAGINATOR_DEFAULTS.CURRENT_PAGE_REPORT_TEMPLATE).toBe('{currentPage} of {totalPages}');
  });
});
