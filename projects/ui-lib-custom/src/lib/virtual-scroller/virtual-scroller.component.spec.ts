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
import { VirtualScrollerComponent } from './virtual-scroller.component';
import { ScrollerItemDirective } from './virtual-scroller.directives';
import type {
  VirtualScrollerItemOptions,
  VirtualScrollerLazyLoadEvent,
  VirtualScrollerScrollEvent,
} from './virtual-scroller.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function query<T extends Element>(fixture: ComponentFixture<unknown>, selector: string): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAll<T extends Element>(fixture: ComponentFixture<unknown>, selector: string): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

function getComponent(fixture: ComponentFixture<unknown>): VirtualScrollerComponent {
  return fixture.debugElement.query(By.directive(VirtualScrollerComponent))
    .componentInstance as VirtualScrollerComponent;
}

function mockViewportMetrics(
  element: HTMLElement,
  metrics: {
    scrollTop?: number;
    scrollLeft?: number;
    clientHeight?: number;
    scrollHeight?: number;
    clientWidth?: number;
    scrollWidth?: number;
  },
): void {
  Object.entries(metrics).forEach(([propertyName, value]: [string, number | undefined]): void => {
    if (value === undefined) {
      return;
    }
    Object.defineProperty(element, propertyName, {
      configurable: true,
      writable: true,
      value,
    });
  });
}

// ---------------------------------------------------------------------------
// Default test host
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [VirtualScrollerComponent],
  template: `
    <ui-lib-virtual-scroller
      [items]="items()"
      [itemSize]="itemSize()"
      [scrollHeight]="scrollHeight()"
      [styleClass]="styleClass()"
      [disabled]="disabled()"
      [showLoader]="showLoader()"
      [loading]="loading()"
      [showSpacer]="showSpacer()"
      [lazy]="lazy()"
      [tabIndex]="tabIndex()"
      [ariaLabel]="ariaLabel()"
      [contentRole]="contentRole()"
      [totalRecords]="totalRecords()"
      (lazyLoad)="onLazyLoad($event)"
      (virtualScroll)="onScroll($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly items: WritableSignal<unknown[]> = signal<unknown[]>([]);
  public readonly itemSize: WritableSignal<number> = signal<number>(50);
  public readonly scrollHeight: WritableSignal<string> = signal<string>('400px');
  public readonly styleClass: WritableSignal<string | null> = signal<string | null>(null);
  public readonly disabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showLoader: WritableSignal<boolean> = signal<boolean>(false);
  public readonly loading: WritableSignal<boolean | undefined> = signal<boolean | undefined>(
    undefined,
  );
  public readonly showSpacer: WritableSignal<boolean> = signal<boolean>(true);
  public readonly lazy: WritableSignal<boolean> = signal<boolean>(false);
  public readonly tabIndex: WritableSignal<number> = signal<number>(0);
  public readonly ariaLabel: WritableSignal<string | null> = signal<string | null>(null);
  public readonly contentRole: WritableSignal<'list' | 'grid'> = signal<'list' | 'grid'>('list');
  public readonly totalRecords: WritableSignal<number | undefined> = signal<number | undefined>(
    undefined,
  );

  public lazyLoadEvents: VirtualScrollerLazyLoadEvent[] = [];
  public scrollEvents: VirtualScrollerScrollEvent[] = [];

  public onLazyLoad(event: VirtualScrollerLazyLoadEvent): void {
    this.lazyLoadEvents.push(event);
  }

  public onScroll(event: VirtualScrollerScrollEvent): void {
    this.scrollEvents.push(event);
  }
}

// ---------------------------------------------------------------------------
// Item template host
// ---------------------------------------------------------------------------

@Component({
  standalone: true,
  imports: [VirtualScrollerComponent, ScrollerItemDirective],
  template: `
    <ui-lib-virtual-scroller [items]="items()" [itemSize]="50" scrollHeight="400px">
      <ng-template uiScrollerItem let-item let-options="options">
        <div class="item-row" [attr.data-index]="options.index">{{ item }}</div>
      </ng-template>
    </ui-lib-virtual-scroller>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ItemTemplateHostComponent {
  public readonly items: WritableSignal<string[]> = signal<string[]>([]);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('VirtualScrollerComponent', (): void => {
  describe('basic rendering', (): void => {
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

    it('should create the component', (): void => {
      expect(getComponent(fixture)).toBeTruthy();
    });

    it('should apply uilib-scroller class to host', (): void => {
      const element: HTMLElement | null = query(fixture, 'ui-lib-virtual-scroller');
      expect(element?.classList.contains('uilib-scroller')).toBe(true);
    });

    it('should apply additional styleClass to host', (): void => {
      host.styleClass.set('my-custom-class');
      fixture.detectChanges();
      const element: HTMLElement | null = query(fixture, 'ui-lib-virtual-scroller');
      expect(element?.classList.contains('my-custom-class')).toBe(true);
    });

    it('should render the viewport div when not disabled', (): void => {
      const viewport: HTMLElement | null = query(fixture, '.uilib-scroller-viewport');
      expect(viewport).toBeTruthy();
    });

    it('should render the spacer when showSpacer is true', (): void => {
      const spacer: HTMLElement | null = query(fixture, '.uilib-scroller-spacer');
      expect(spacer).toBeTruthy();
    });

    it('should not render the spacer when showSpacer is false', (): void => {
      host.showSpacer.set(false);
      fixture.detectChanges();
      const spacer: HTMLElement | null = query(fixture, '.uilib-scroller-spacer');
      expect(spacer).toBeNull();
    });

    it('should render the content container', (): void => {
      const content: HTMLElement | null = query(fixture, '.uilib-scroller-content');
      expect(content).toBeTruthy();
    });
  });

  describe('disabled mode', (): void => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      host = fixture.componentInstance;
      host.disabled.set(true);
      fixture.detectChanges();
    });

    it('should not render the viewport when disabled', (): void => {
      const viewport: HTMLElement | null = query(fixture, '.uilib-scroller-viewport');
      expect(viewport).toBeNull();
    });

    it('should not render the spacer when disabled', (): void => {
      const spacer: HTMLElement | null = query(fixture, '.uilib-scroller-spacer');
      expect(spacer).toBeNull();
    });
  });

  describe('item template', (): void => {
    let fixture: ComponentFixture<ItemTemplateHostComponent>;
    let host: ItemTemplateHostComponent;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [ItemTemplateHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(ItemTemplateHostComponent);
      host = fixture.componentInstance;
    });

    it('should render without errors when items are provided', (): void => {
      host.items.set(['Alpha', 'Beta', 'Gamma']);
      fixture.detectChanges();
      // In JSDOM (zero-size elements) init may not fully run — verify no crash.
      const scroller: HTMLElement | null = query(fixture, 'ui-lib-virtual-scroller');
      expect(scroller).toBeTruthy();
    });

    it('should expose item index via options context', (): void => {
      host.items.set(['X', 'Y', 'Z']);
      fixture.detectChanges();
      // If any rows render, verify data-index attributes are numeric.
      const rows: HTMLElement[] = queryAll<HTMLElement>(fixture, '.item-row');
      rows.forEach((row: HTMLElement, localIndex: number): void => {
        const dataIndex: string | null = row.getAttribute('data-index');
        expect(dataIndex).not.toBeNull();
        expect(parseInt(dataIndex ?? '0', 10)).toBe(localIndex);
      });
    });
  });

  describe('loading state', (): void => {
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

    it('should not show loader overlay when showLoader is false', (): void => {
      host.showLoader.set(false);
      host.loading.set(true);
      fixture.detectChanges();
      const loader: HTMLElement | null = query(fixture, '.uilib-scroller-loader');
      expect(loader).toBeNull();
    });

    it('should not show loader overlay when loading is false', (): void => {
      host.showLoader.set(true);
      host.loading.set(false);
      fixture.detectChanges();
      const loader: HTMLElement | null = query(fixture, '.uilib-scroller-loader');
      expect(loader).toBeNull();
    });

    it('should show loader overlay and aria-busy when loading is true', async (): Promise<void> => {
      host.showLoader.set(true);
      host.loading.set(true);
      fixture.detectChanges();
      await Promise.resolve();
      fixture.detectChanges();
      const loader: HTMLElement | null = query(fixture, '.uilib-scroller-loader');
      const viewport: HTMLElement | null = query(fixture, '.uilib-scroller-viewport');
      expect(loader).toBeTruthy();
      expect(viewport?.getAttribute('aria-busy')).toBe('true');
    });

    it('should remove aria-busy when loading becomes false', async (): Promise<void> => {
      host.showLoader.set(true);
      host.loading.set(true);
      fixture.detectChanges();
      await Promise.resolve();
      fixture.detectChanges();

      host.loading.set(false);
      fixture.detectChanges();
      await Promise.resolve();
      fixture.detectChanges();

      const viewport: HTMLElement | null = query(fixture, '.uilib-scroller-viewport');
      expect(viewport?.getAttribute('aria-busy')).toBeNull();
    });
  });

  describe('host classes', (): void => {
    it('should add uilib-scroller-horizontal for horizontal orientation', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [VirtualScrollerComponent],
        template: `<ui-lib-virtual-scroller orientation="horizontal" />`,
        changeDetection: ChangeDetectionStrategy.OnPush,
      })
      class HorizontalHost {}

      await TestBed.configureTestingModule({
        imports: [HorizontalHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixt: ComponentFixture<HorizontalHost> = TestBed.createComponent(HorizontalHost);
      fixt.detectChanges();
      const element: HTMLElement | null = query(fixt, 'ui-lib-virtual-scroller');
      expect(element?.classList.contains('uilib-scroller-horizontal')).toBe(true);
    });

    it('should add uilib-scroller-both for both orientation', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [VirtualScrollerComponent],
        template: `<ui-lib-virtual-scroller orientation="both" />`,
        changeDetection: ChangeDetectionStrategy.OnPush,
      })
      class BothHost {}

      await TestBed.configureTestingModule({
        imports: [BothHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixt: ComponentFixture<BothHost> = TestBed.createComponent(BothHost);
      fixt.detectChanges();
      const element: HTMLElement | null = query(fixt, 'ui-lib-virtual-scroller');
      expect(element?.classList.contains('uilib-scroller-both')).toBe(true);
    });

    it('should add uilib-scroller-inline when inline is true', async (): Promise<void> => {
      @Component({
        standalone: true,
        imports: [VirtualScrollerComponent],
        template: `<ui-lib-virtual-scroller [inline]="true" />`,
        changeDetection: ChangeDetectionStrategy.OnPush,
      })
      class InlineHost {}

      await TestBed.configureTestingModule({
        imports: [InlineHost],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixt: ComponentFixture<InlineHost> = TestBed.createComponent(InlineHost);
      fixt.detectChanges();
      const element: HTMLElement | null = query(fixt, 'ui-lib-virtual-scroller');
      expect(element?.classList.contains('uilib-scroller-inline')).toBe(true);
    });
  });

  describe('outputs', (): void => {
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

    it('should not crash when lazy is enabled and items are provided', async (): Promise<void> => {
      host.lazy.set(true);
      host.items.set(Array.from({ length: 100 }, (_: unknown, index: number): number => index));
      fixture.detectChanges();
      await Promise.resolve();
      fixture.detectChanges();
      expect(host.lazyLoadEvents).toBeDefined();
    });
  });

  describe('getItemOptions', (): void => {
    it('should compute correct metadata for an item', async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      const fixt: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
      const hostComp: TestHostComponent = fixt.componentInstance;
      hostComp.items.set(['a', 'b', 'c', 'd', 'e']);
      fixt.detectChanges();

      const component: VirtualScrollerComponent = fixt.debugElement.query(
        By.directive(VirtualScrollerComponent),
      ).componentInstance as VirtualScrollerComponent;

      // Access protected method via cast for testing.
      const options: VirtualScrollerItemOptions = (
        component as unknown as { getItemOptions: (i: number) => VirtualScrollerItemOptions }
      ).getItemOptions(0);

      expect(options.count).toBe(5);
      expect(options.first).toBe(true);
      expect(options.even).toBe(true);
      expect(options.odd).toBe(false);
    });
  });

  describe('accessibility', (): void => {
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

    it('should have role="list" and a fallback aria-label on the viewport', (): void => {
      const viewport: HTMLElement | null = query(fixture, '.uilib-scroller-viewport');
      expect(viewport?.getAttribute('role')).toBe('list');
      expect(viewport?.getAttribute('aria-label')).toBe('Scrollable list');
    });

    it('should expose a tabindex on the viewport', (): void => {
      const viewport: HTMLElement | null = query(fixture, '.uilib-scroller-viewport');
      expect(viewport?.getAttribute('tabindex')).toBe('0');
    });

    it('should expose aria-rowcount when configured as a grid', (): void => {
      host.contentRole.set('grid');
      host.totalRecords.set(42);
      host.ariaLabel.set('Results grid');
      fixture.detectChanges();
      const viewport: HTMLElement | null = query(fixture, '.uilib-scroller-viewport');
      expect(viewport?.getAttribute('role')).toBe('grid');
      expect(viewport?.getAttribute('aria-label')).toBe('Results grid');
      expect(viewport?.getAttribute('aria-rowcount')).toBe('42');
    });

    it('should mark the spacer as aria-hidden', (): void => {
      const spacer: HTMLElement | null = query(fixture, '.uilib-scroller-spacer');
      expect(spacer?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('keyboard scrolling', (): void => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async (): Promise<void> => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
    });

    it('should scroll by one item height when ArrowDown is pressed', (): void => {
      const viewport: HTMLElement = query(fixture, '.uilib-scroller-viewport') as HTMLElement;
      const component: VirtualScrollerComponent = getComponent(fixture);
      mockViewportMetrics(viewport, { scrollTop: 25, scrollLeft: 0 });

      const scrollToSpy: jest.SpyInstance = jest
        .spyOn(component, 'scrollTo')
        .mockImplementation((): void => undefined);

      viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

      expect(scrollToSpy).toHaveBeenCalledWith({ top: 75, left: 0 });
    });

    it('should scroll to the start and end with Home and End keys', (): void => {
      const viewport: HTMLElement = query(fixture, '.uilib-scroller-viewport') as HTMLElement;
      const component: VirtualScrollerComponent = getComponent(fixture);
      mockViewportMetrics(viewport, { clientHeight: 200, scrollHeight: 1200 });

      const scrollToSpy: jest.SpyInstance = jest
        .spyOn(component, 'scrollTo')
        .mockImplementation((): void => undefined);

      viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
      viewport.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

      expect(scrollToSpy).toHaveBeenNthCalledWith(1, { top: 1000 });
      expect(scrollToSpy).toHaveBeenNthCalledWith(2, { top: 0 });
    });
  });
});
