import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';
import { ScrollerItemDirective } from './virtual-scroller.directives';
import { VirtualScrollerComponent } from './virtual-scroller.component';

@Component({
  standalone: true,
  imports: [VirtualScrollerComponent, ScrollerItemDirective],
  template: `
    <main>
      <ui-lib-virtual-scroller
        [items]="items()"
        [itemSize]="50"
        scrollHeight="200px"
        [totalRecords]="totalRecords()"
        [loading]="loading()"
        [ariaLabel]="ariaLabel()"
        [contentRole]="contentRole()"
      >
        <ng-template uiScrollerItem let-item>
          @if (contentRole() === 'grid') {
            <div class="grid-cell" role="gridcell">{{ item }}</div>
          } @else {
            <div class="list-cell">{{ item }}</div>
          }
        </ng-template>
      </ui-lib-virtual-scroller>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class VirtualScrollerA11yHostComponent {
  public readonly items: WritableSignal<string[]> = signal<string[]>(
    Array.from({ length: 50 }, (_: unknown, index: number): string => `Item ${index + 1}`)
  );
  public readonly totalRecords: WritableSignal<number | undefined> = signal<number | undefined>(50);
  public readonly loading: WritableSignal<boolean | undefined> = signal<boolean | undefined>(
    undefined
  );
  public readonly ariaLabel: WritableSignal<string> = signal<string>('');
  public readonly contentRole: WritableSignal<'list' | 'grid'> = signal<'list' | 'grid'>('list');
}

const createdFixtures: ComponentFixture<unknown>[] = [];

async function setup(): Promise<ComponentFixture<VirtualScrollerA11yHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [VirtualScrollerA11yHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = TestBed.createComponent(
    VirtualScrollerA11yHostComponent
  );
  document.body.appendChild(fixture.nativeElement);
  fixture.detectChanges();
  await fixture.whenStable();
  createdFixtures.push(fixture as ComponentFixture<unknown>);
  return fixture;
}

const AXE_EXCLUDED_SELECTORS: string[] = ['.uilib-scroller-spacer'];

function getComponent(fixture: ComponentFixture<unknown>): VirtualScrollerComponent {
  return fixture.debugElement.query(By.directive(VirtualScrollerComponent))
    .componentInstance as VirtualScrollerComponent;
}

function getViewport(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.uilib-scroller-viewport'
  ) as HTMLElement;
}

function getLiveRegion(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector(
    '.uilib-scroller-sr-only'
  ) as HTMLElement;
}

function getRenderedItems(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll('.uilib-scroller-item')
  ) as HTMLElement[];
}

function primeRenderedRange(fixture: ComponentFixture<unknown>, first: number, last: number): void {
  const component: VirtualScrollerComponent = getComponent(fixture);
  (
    component as unknown as {
      first: number;
      last: number;
      rangeVersion: WritableSignal<number>;
    }
  ).first = first;
  (
    component as unknown as {
      first: number;
      last: number;
      rangeVersion: WritableSignal<number>;
    }
  ).last = last;
  (
    component as unknown as {
      first: number;
      last: number;
      rangeVersion: WritableSignal<number>;
    }
  ).rangeVersion.update((version: number): number => version + 1);
  fixture.detectChanges();
}

describe('VirtualScroller Accessibility', (): void => {
  afterEach((): void => {
    createdFixtures.forEach((fixture: ComponentFixture<unknown>): void => fixture.destroy());
    createdFixtures.length = 0;
    TestBed.resetTestingModule();
  });

  it('exposes a keyboard-focusable viewport with a default aria-label', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();
    const viewport: HTMLElement = getViewport(fixture);

    expect(viewport.getAttribute('tabindex')).toBe('0');
    expect(viewport.getAttribute('aria-label')).toBe('Scrollable list');
    expect(viewport.getAttribute('role')).toBe('list');
  });

  it('uses a custom aria-label when provided', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    fixture.componentInstance.ariaLabel.set('Search results');
    fixture.detectChanges();

    expect(getViewport(fixture).getAttribute('aria-label')).toBe('Search results');
  });

  it('applies aria-setsize for rendered list items using the total item count', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    primeRenderedRange(fixture, 0, 3);

    getRenderedItems(fixture).forEach((item: HTMLElement): void => {
      expect(item.getAttribute('role')).toBe('listitem');
      expect(item.getAttribute('aria-setsize')).toBe('50');
    });
  });

  it('applies aria-posinset using the absolute rendered item position', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    primeRenderedRange(fixture, 10, 13);

    expect(
      getRenderedItems(fixture).map((item: HTMLElement): string | null =>
        item.getAttribute('aria-posinset')
      )
    ).toEqual(['11', '12', '13']);
  });

  it('exposes grid row count when configured as a grid', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    fixture.componentInstance.contentRole.set('grid');
    fixture.componentInstance.ariaLabel.set('Results grid');
    fixture.detectChanges();

    expect(getViewport(fixture).getAttribute('role')).toBe('grid');
    expect(getViewport(fixture).getAttribute('aria-label')).toBe('Results grid');
    expect(getViewport(fixture).getAttribute('aria-rowcount')).toBe('50');
  });

  it('applies aria-rowindex to rendered grid rows', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    fixture.componentInstance.contentRole.set('grid');
    fixture.detectChanges();
    primeRenderedRange(fixture, 20, 23);

    expect(
      getRenderedItems(fixture).map((item: HTMLElement): string | null =>
        item.getAttribute('aria-rowindex')
      )
    ).toEqual(['21', '22', '23']);
  });

  it('scrolls by one item height when ArrowDown is pressed', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();
    const component: VirtualScrollerComponent = getComponent(fixture);
    const viewport: HTMLElement = getViewport(fixture);

    Object.defineProperty(viewport, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 40,
    });
    Object.defineProperty(viewport, 'scrollLeft', {
      configurable: true,
      writable: true,
      value: 0,
    });

    const scrollToSpy: jest.SpyInstance = jest
      .spyOn(component, 'scrollTo')
      .mockImplementation((): void => undefined);

    viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 90, left: 0 });
  });

  it('scrolls by one viewport when PageDown and PageUp are pressed', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();
    const component: VirtualScrollerComponent = getComponent(fixture);
    const viewport: HTMLElement = getViewport(fixture);

    Object.defineProperty(viewport, 'clientHeight', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(viewport, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 250,
    });
    Object.defineProperty(viewport, 'scrollLeft', {
      configurable: true,
      writable: true,
      value: 0,
    });

    const scrollToSpy: jest.SpyInstance = jest
      .spyOn(component, 'scrollTo')
      .mockImplementation((): void => undefined);

    viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown' }));
    viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp' }));

    expect(scrollToSpy).toHaveBeenNthCalledWith(1, { top: 450, left: 0 });
    expect(scrollToSpy).toHaveBeenNthCalledWith(2, { top: 50, left: 0 });
  });

  it('scrolls to the start and end with Home and End keys', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();
    const component: VirtualScrollerComponent = getComponent(fixture);
    const viewport: HTMLElement = getViewport(fixture);

    Object.defineProperty(viewport, 'clientHeight', {
      configurable: true,
      value: 200,
    });
    Object.defineProperty(viewport, 'scrollHeight', {
      configurable: true,
      value: 1200,
    });
    Object.defineProperty(viewport, 'clientWidth', {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(viewport, 'scrollWidth', {
      configurable: true,
      value: 300,
    });

    const scrollToSpy: jest.SpyInstance = jest
      .spyOn(component, 'scrollTo')
      .mockImplementation((): void => undefined);

    viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

    expect(scrollToSpy).toHaveBeenNthCalledWith(1, { top: 1000 });
    expect(scrollToSpy).toHaveBeenNthCalledWith(2, { top: 0 });
  });

  it('announces loading state through a polite live region', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const liveRegionText: string = getLiveRegion(fixture).textContent.trim();
    expect(liveRegionText).toBe('Loading more items. 50 item(s) available.');
  });

  it('announces empty state when there are no items to display', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    fixture.componentInstance.items.set([]);
    fixture.componentInstance.totalRecords.set(undefined);
    fixture.detectChanges();

    const liveRegionText: string = getLiveRegion(fixture).textContent.trim();
    expect(liveRegionText).toBe('No items to display.');
  });

  it('has no axe violations in the populated state', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    primeRenderedRange(fixture, 0, 4);

    await checkA11y(fixture, {
      rules: SKIP_COLOR_CONTRAST_RULES,
      exclude: AXE_EXCLUDED_SELECTORS,
    });
  });

  it('has no axe violations in the loading state', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    await checkA11y(fixture, {
      rules: SKIP_COLOR_CONTRAST_RULES,
      exclude: AXE_EXCLUDED_SELECTORS,
    });
  });

  it('has no axe violations in the empty state', async (): Promise<void> => {
    const fixture: ComponentFixture<VirtualScrollerA11yHostComponent> = await setup();

    fixture.componentInstance.items.set([]);
    fixture.componentInstance.totalRecords.set(undefined);
    fixture.detectChanges();

    await checkA11y(fixture, {
      rules: SKIP_COLOR_CONTRAST_RULES,
      exclude: AXE_EXCLUDED_SELECTORS,
    });
  });
});
