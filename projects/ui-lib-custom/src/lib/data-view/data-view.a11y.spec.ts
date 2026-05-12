import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { DataViewComponent } from './data-view.component';
import type { DataViewLayout, DataViewSortEvent, DataViewSortOrder } from './data-view.types';
import {
  DataViewGridItemDirective,
  DataViewListItemDirective,
} from './data-view.template-directives';

interface ProductItem {
  readonly id: number;
  readonly name: string;
  readonly category: string;
}

const PRODUCTS: ProductItem[] = [
  { id: 1, name: 'Alpha Phone', category: 'Electronics' },
  { id: 2, name: 'Beta Keyboard', category: 'Accessories' },
  { id: 3, name: 'Gamma Mouse', category: 'Accessories' },
  { id: 4, name: 'Delta Laptop', category: 'Electronics' },
  { id: 5, name: 'Epsilon Display', category: 'Monitors' },
  { id: 6, name: 'Zeta Dock', category: 'Accessories' },
  { id: 7, name: 'Eta Cable', category: 'Accessories' },
  { id: 8, name: 'Theta Stand', category: 'Accessories' },
];

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective, DataViewGridItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-view
      [value]="value()"
      [(layout)]="layout"
      [paginator]="paginator()"
      [rows]="rows()"
      [sortField]="sortField()"
      [sortOrder]="sortOrder()"
      [filterAriaLabel]="filterAriaLabel()"
      [sortAriaLabel]="sortAriaLabel()"
      [controlsAriaLabel]="controlsAriaLabel()"
      [listLayoutAriaLabel]="listLayoutAriaLabel()"
      [gridLayoutAriaLabel]="gridLayoutAriaLabel()"
      (sortChange)="onSortChange($event)"
    >
      <ng-template uiDataViewListItem let-item>
        <article class="a11y-item">{{ item.name }}</article>
      </ng-template>
      <ng-template uiDataViewGridItem let-item>
        <article class="a11y-item">{{ item.name }}</article>
      </ng-template>
    </ui-lib-data-view>
  `,
})
class DataViewA11yHostComponent {
  public readonly value: WritableSignal<ProductItem[]> = signal<ProductItem[]>([...PRODUCTS]);
  public readonly layout: WritableSignal<DataViewLayout> = signal<DataViewLayout>('list');
  public readonly paginator: WritableSignal<boolean> = signal<boolean>(false);
  public readonly rows: WritableSignal<number> = signal<number>(10);
  public readonly sortField: WritableSignal<string | null> = signal<string | null>('name');
  public readonly sortOrder: WritableSignal<DataViewSortOrder> = signal<DataViewSortOrder>(1);
  public readonly filterAriaLabel: WritableSignal<string> = signal<string>('Filter catalog');
  public readonly sortAriaLabel: WritableSignal<string> = signal<string>('Sort catalog');
  public readonly controlsAriaLabel: WritableSignal<string> = signal<string>('Catalog controls');
  public readonly listLayoutAriaLabel: WritableSignal<string> = signal<string>('Use list view');
  public readonly gridLayoutAriaLabel: WritableSignal<string> = signal<string>('Use grid view');
  public readonly sortEvents: DataViewSortEvent[] = [];

  public onSortChange(event: DataViewSortEvent): void {
    this.sortEvents.push(event);
  }
}

@Component({
  standalone: true,
  imports: [DataViewComponent, DataViewListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-lib-data-view [value]="value">
      <ng-template uiDataViewListItem let-item>
        <article>{{ item.name }}</article>
      </ng-template>
    </ui-lib-data-view>
    <ui-lib-data-view [value]="value">
      <ng-template uiDataViewListItem let-item>
        <article>{{ item.name }}</article>
      </ng-template>
    </ui-lib-data-view>
  `,
})
class MultiDataViewA11yHostComponent {
  public readonly value: ProductItem[] = PRODUCTS.slice(0, 2);
}

function queryElement<T extends Element>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryRequiredElement<T extends Element>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  const element: T | null = queryElement<T>(fixture, selector);
  if (element === null) {
    throw new Error(`Expected element for selector: ${selector}`);
  }
  return element;
}

function queryElements<T extends Element>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function createHostFixture(): ComponentFixture<DataViewA11yHostComponent> {
  const fixture: ComponentFixture<DataViewA11yHostComponent> =
    TestBed.createComponent(DataViewA11yHostComponent);
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  return fixture;
}

describe('DataView Accessibility', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [DataViewA11yHostComponent, MultiDataViewA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach((): void => {
    document.body.innerHTML = '';
  });

  describe('axe-core automated checks', (): void => {
    it('passes axe in default list state', async (): Promise<void> => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe in grid state', async (): Promise<void> => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      fixture.componentInstance.layout.set('grid');
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('passes axe with paginator enabled', async (): Promise<void> => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(3);
      fixture.detectChanges();
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  describe('ARIA structure', (): void => {
    it('assigns unique host IDs for each instance', (): void => {
      const fixture: ComponentFixture<MultiDataViewA11yHostComponent> = TestBed.createComponent(
        MultiDataViewA11yHostComponent
      );
      fixture.detectChanges();

      const hosts: HTMLElement[] = Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ui-lib-data-view')
      );
      expect(hosts.length).toBe(2);
      expect(hosts[0]?.id).toMatch(/^ui-lib-data-view-\d+$/);
      expect(hosts[1]?.id).toMatch(/^ui-lib-data-view-\d+$/);
      expect(hosts[0]?.id).not.toBe(hosts[1]?.id);
    });

    it('exposes labeled filter and sort controls', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      expect(
        queryRequiredElement<HTMLInputElement>(
          fixture,
          '.ui-lib-data-view__filter-input'
        ).getAttribute('aria-label')
      ).toBe('Filter catalog');
      expect(
        queryRequiredElement<HTMLSelectElement>(
          fixture,
          '.ui-lib-data-view__sort-select'
        ).getAttribute('aria-label')
      ).toBe('Sort catalog');
    });

    it('wraps controls in a labeled group', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const controls: HTMLElement = queryRequiredElement<HTMLElement>(
        fixture,
        '.ui-lib-data-view__controls'
      );
      expect(controls.getAttribute('role')).toBe('group');
      expect(controls.getAttribute('aria-label')).toBe('Catalog controls');
    });

    it('marks layout toggle buttons with aria-pressed state', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const listButton: HTMLButtonElement = queryRequiredElement<HTMLButtonElement>(
        fixture,
        '.ui-lib-data-view__layout-button:first-of-type'
      );
      const gridButton: HTMLButtonElement = queryRequiredElement<HTMLButtonElement>(
        fixture,
        '.ui-lib-data-view__layout-button:last-of-type'
      );
      expect(listButton.getAttribute('aria-pressed')).toBe('true');
      expect(gridButton.getAttribute('aria-pressed')).toBe('false');
    });

    it('announces view mode with a polite live region', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const liveRegion: HTMLElement = queryRequiredElement<HTMLElement>(
        fixture,
        '.ui-lib-data-view__sr-live'
      );
      expect(liveRegion.getAttribute('aria-live')).toBe('polite');
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true');
      expect(liveRegion.textContent.trim()).toBe('List view selected');
    });

    it('updates the live region message when layout changes', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      fixture.componentInstance.layout.set('grid');
      fixture.detectChanges();
      expect(
        queryRequiredElement<HTMLElement>(fixture, '.ui-lib-data-view__sr-live').textContent.trim()
      ).toBe('Grid view selected');
    });

    it('keeps decorative paginator ellipsis hidden from assistive technology', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(1);
      fixture.detectChanges();

      const ellipsis: HTMLElement = queryRequiredElement<HTMLElement>(
        fixture,
        '.ui-lib-data-view__paginator-ellipsis'
      );
      expect(ellipsis.getAttribute('aria-hidden')).toBe('true');
    });

    it('renders list semantics on content and items', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      expect(
        queryRequiredElement<HTMLElement>(fixture, '.ui-lib-data-view__content').getAttribute(
          'role'
        )
      ).toBe('list');
      const itemRoles: (string | null)[] = queryElements<HTMLElement>(
        fixture,
        '.ui-lib-data-view__item'
      ).map((item: HTMLElement): string | null => item.getAttribute('role'));
      expect(itemRoles.every((role: string | null): boolean => role === 'listitem')).toBe(true);
    });
  });

  describe('keyboard and interaction coverage', (): void => {
    it('changes layout when grid toggle is activated', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const gridButton: HTMLButtonElement = queryRequiredElement<HTMLButtonElement>(
        fixture,
        '.ui-lib-data-view__layout-button:last-of-type'
      );
      gridButton.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.layout()).toBe('grid');
      expect(gridButton.getAttribute('aria-pressed')).toBe('true');
    });

    it('returns to list layout when list toggle is activated', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      fixture.componentInstance.layout.set('grid');
      fixture.detectChanges();
      const listButton: HTMLButtonElement = queryRequiredElement<HTMLButtonElement>(
        fixture,
        '.ui-lib-data-view__layout-button:first-of-type'
      );
      listButton.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.layout()).toBe('list');
      expect(listButton.getAttribute('aria-pressed')).toBe('true');
    });

    it('filters visible items from filter input text', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const filterInput: HTMLInputElement = queryRequiredElement<HTMLInputElement>(
        fixture,
        '.ui-lib-data-view__filter-input'
      );
      filterInput.value = 'keyboard';
      filterInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const renderedItems: HTMLElement[] = queryElements<HTMLElement>(
        fixture,
        '.ui-lib-data-view__item'
      );
      expect(renderedItems.length).toBe(1);
      const firstRenderedItem: HTMLElement | undefined = renderedItems[0];
      if (firstRenderedItem === undefined) {
        throw new Error('Expected exactly one filtered item');
      }
      expect(firstRenderedItem.textContent.trim()).toContain('Beta Keyboard');
    });

    it('does not hide all items for empty filter input', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const filterInput: HTMLInputElement = queryRequiredElement<HTMLInputElement>(
        fixture,
        '.ui-lib-data-view__filter-input'
      );
      filterInput.value = '';
      filterInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(queryElements<HTMLElement>(fixture, '.ui-lib-data-view__item').length).toBe(
        PRODUCTS.length
      );
    });

    it('emits sortChange from the sort select control', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const sortSelect: HTMLSelectElement = queryRequiredElement<HTMLSelectElement>(
        fixture,
        '.ui-lib-data-view__sort-select'
      );
      sortSelect.value = '-1';
      sortSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(fixture.componentInstance.sortEvents).toEqual([{ sortField: 'name', sortOrder: -1 }]);
    });

    it('uses fallback sortField value when sortField input is null', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      fixture.componentInstance.sortField.set(null);
      fixture.detectChanges();
      const sortSelect: HTMLSelectElement = queryRequiredElement<HTMLSelectElement>(
        fixture,
        '.ui-lib-data-view__sort-select'
      );
      sortSelect.value = '-1';
      sortSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(fixture.componentInstance.sortEvents.at(-1)).toEqual({
        sortField: 'default',
        sortOrder: -1,
      });
    });

    it('keeps filter and sort controls keyboard focusable', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const filterInput: HTMLInputElement = queryRequiredElement<HTMLInputElement>(
        fixture,
        '.ui-lib-data-view__filter-input'
      );
      const sortSelect: HTMLSelectElement = queryRequiredElement<HTMLSelectElement>(
        fixture,
        '.ui-lib-data-view__sort-select'
      );
      filterInput.focus();
      expect(document.activeElement).toBe(filterInput);
      sortSelect.focus();
      expect(document.activeElement).toBe(sortSelect);
    });

    it('keeps layout buttons keyboard focusable', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      const buttons: HTMLButtonElement[] = queryElements<HTMLButtonElement>(
        fixture,
        '.ui-lib-data-view__layout-button'
      );
      expect(buttons.length).toBe(2);
      buttons[0]?.focus();
      expect(document.activeElement).toBe(buttons[0]);
      buttons[1]?.focus();
      expect(document.activeElement).toBe(buttons[1]);
    });

    it('resets paginator page when a filter shrinks results', (): void => {
      const fixture: ComponentFixture<DataViewA11yHostComponent> = createHostFixture();
      fixture.componentInstance.paginator.set(true);
      fixture.componentInstance.rows.set(2);
      fixture.detectChanges();

      const nextPageButton: HTMLButtonElement = queryRequiredElement<HTMLButtonElement>(
        fixture,
        'button[aria-label="Go to next page"]'
      );
      nextPageButton.click();
      fixture.detectChanges();

      const filterInput: HTMLInputElement = queryRequiredElement<HTMLInputElement>(
        fixture,
        '.ui-lib-data-view__filter-input'
      );
      filterInput.value = 'alpha';
      filterInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const currentPageButton: HTMLButtonElement = queryRequiredElement<HTMLButtonElement>(
        fixture,
        '.ui-lib-data-view__paginator-page[aria-current="page"]'
      );
      expect(currentPageButton.textContent.trim()).toBe('1');
    });
  });
});
