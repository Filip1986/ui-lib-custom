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
import { CarouselComponent } from './carousel.component';
import type {
  CarouselOrientation,
  CarouselPageEvent,
  CarouselResponsiveOption,
  CarouselSize,
  CarouselVariant,
} from './carousel.types';

// ─── Typed query helpers ──────────────────────────────────────────────────────

function queryElement<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAllElements<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ─── Default host ─────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [CarouselComponent],
  template: `<ui-lib-carousel [value]="items" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultHostComponent {
  public items: string[] = ['A', 'B', 'C', 'D', 'E'];
}

// ─── Configurable host ────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [CarouselComponent],
  template: `
    <ui-lib-carousel
      [value]="items()"
      [variant]="variant()"
      [size]="size()"
      [numVisible]="numVisible()"
      [numScroll]="numScroll()"
      [circular]="circular()"
      [showNavigators]="showNavigators()"
      [showIndicators]="showIndicators()"
      [autoplayInterval]="autoplayInterval()"
      [orientation]="orientation()"
      [responsiveOptions]="responsiveOptions()"
      (pageChange)="onPageChange($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfigurableHostComponent {
  public readonly items: WritableSignal<unknown[]> = signal<unknown[]>(['A', 'B', 'C', 'D', 'E']);
  public readonly variant: WritableSignal<CarouselVariant> = signal<CarouselVariant>('material');
  public readonly size: WritableSignal<CarouselSize> = signal<CarouselSize>('md');
  public readonly numVisible: WritableSignal<number> = signal<number>(1);
  public readonly numScroll: WritableSignal<number> = signal<number>(1);
  public readonly circular: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showNavigators: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showIndicators: WritableSignal<boolean> = signal<boolean>(true);
  public readonly autoplayInterval: WritableSignal<number> = signal<number>(0);
  public readonly orientation: WritableSignal<CarouselOrientation> =
    signal<CarouselOrientation>('horizontal');
  public readonly responsiveOptions: WritableSignal<CarouselResponsiveOption[]> = signal<
    CarouselResponsiveOption[]
  >([]);
  public lastPageEvent: CarouselPageEvent | null = null;

  public onPageChange(event: CarouselPageEvent): void {
    this.lastPageEvent = event;
  }
}

// ─── Template host ────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [CarouselComponent],
  template: `
    <ui-lib-carousel [value]="items">
      <ng-template #carouselItem let-item>
        <div class="item-slot">{{ item }}</div>
      </ng-template>
      <ng-template #carouselHeader>
        <span class="header-slot">Header</span>
      </ng-template>
      <ng-template #carouselFooter>
        <span class="footer-slot">Footer</span>
      </ng-template>
    </ui-lib-carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TemplateHostComponent {
  public items: string[] = ['X', 'Y', 'Z', 'W', 'V'];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function createDefaultFixture(): Promise<ComponentFixture<DefaultHostComponent>> {
  const fixture: ComponentFixture<DefaultHostComponent> =
    TestBed.createComponent(DefaultHostComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

async function createConfigurableFixture(): Promise<ComponentFixture<ConfigurableHostComponent>> {
  const fixture: ComponentFixture<ConfigurableHostComponent> =
    TestBed.createComponent(ConfigurableHostComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

async function createTemplateFixture(): Promise<ComponentFixture<TemplateHostComponent>> {
  const fixture: ComponentFixture<TemplateHostComponent> =
    TestBed.createComponent(TemplateHostComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('CarouselComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [
        CarouselComponent,
        DefaultHostComponent,
        ConfigurableHostComponent,
        TemplateHostComponent,
      ],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  // ─── Rendering ───────────────────────────────────────────────────────────────

  describe('rendering', (): void => {
    it('should create the component', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      expect(carousel).toBeTruthy();
    });

    it('should apply the uilib-carousel host class', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel');
    });

    it('should apply the horizontal class by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel-horizontal');
      expect(host?.classList).not.toContain('uilib-carousel-vertical');
    });

    it('should render prev and next buttons when showNavigators is true', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const prevBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-prev-button'
      );
      const nextBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-next-button'
      );
      expect(prevBtn).not.toBeNull();
      expect(nextBtn).not.toBeNull();
    });

    it('should render indicator dots when showIndicators is true and totalDots > 1', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const indicators: HTMLElement[] = queryAllElements<HTMLElement>(
        fixture,
        '.uilib-carousel-indicator'
      );
      expect(indicators.length).toBeGreaterThan(0);
    });

    it('should render all value items as carousel items', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const items: HTMLElement[] = queryAllElements<HTMLElement>(
        fixture,
        '.uilib-carousel-item:not(.uilib-carousel-item-clone)'
      );
      expect(items.length).toBe(5);
    });

    it('should have role="region" on the host element', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.getAttribute('role')).toBe('region');
    });
  });

  // ─── Variants ────────────────────────────────────────────────────────────────

  describe('variants', (): void => {
    it('should apply material variant class by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel-variant-material');
    });

    it('should apply bootstrap variant class when set', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel-variant-bootstrap');
    });

    it('should apply minimal variant class when set', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.variant.set('minimal');
      fixture.detectChanges();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel-variant-minimal');
    });
  });

  // ─── Sizes ───────────────────────────────────────────────────────────────────

  describe('sizes', (): void => {
    it('should apply md size class by default', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel-md');
    });

    it('should apply sm size class when set', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.size.set('sm');
      fixture.detectChanges();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel-sm');
    });

    it('should apply lg size class when set', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel-lg');
    });
  });

  // ─── Navigation ───────────────────────────────────────────────────────────────

  describe('navigation', (): void => {
    it('should disable prev button on the first page', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const prevBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-prev-button'
      );
      expect(prevBtn?.disabled).toBe(true);
    });

    it('should disable next button on the last page', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      // Navigate to last page
      const lastPage: number = carousel.totalDots() - 1;
      carousel.currentPage.set(lastPage);
      fixture.detectChanges();
      const nextBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-next-button'
      );
      expect(nextBtn?.disabled).toBe(true);
    });

    it('should advance page when next button is clicked', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      expect(carousel.currentPage()).toBe(0);
      const nextBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-next-button'
      );
      nextBtn?.click();
      fixture.detectChanges();
      expect(carousel.currentPage()).toBe(1);
    });

    it('should go back one page when prev button is clicked after advancing', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      const nextBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-next-button'
      );
      nextBtn?.click();
      fixture.detectChanges();
      expect(carousel.currentPage()).toBe(1);
      const prevBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-prev-button'
      );
      prevBtn?.click();
      fixture.detectChanges();
      expect(carousel.currentPage()).toBe(0);
    });

    it('should emit pageChange when navigating forward', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const nextBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-next-button'
      );
      nextBtn?.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.lastPageEvent).toEqual({ page: 1 });
    });

    it('should navigate to a specific page when an indicator dot is clicked', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      const dotButtons: HTMLButtonElement[] = queryAllElements<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-indicator-button'
      );
      expect(dotButtons.length).toBeGreaterThan(2);
      dotButtons[2]!.click();
      fixture.detectChanges();
      expect(carousel.currentPage()).toBe(2);
    });
  });

  // ─── Visibility toggles ──────────────────────────────────────────────────────

  describe('visibility toggles', (): void => {
    it('should hide nav buttons when showNavigators is false', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.showNavigators.set(false);
      fixture.detectChanges();
      const prevBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-prev-button'
      );
      const nextBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-next-button'
      );
      expect(prevBtn).toBeNull();
      expect(nextBtn).toBeNull();
    });

    it('should hide indicators when showIndicators is false', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.showIndicators.set(false);
      fixture.detectChanges();
      const indicatorList: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.uilib-carousel-indicator-list'
      );
      expect(indicatorList).toBeNull();
    });
  });

  // ─── numVisible / totalDots ───────────────────────────────────────────────────

  describe('numVisible and totalDots', (): void => {
    it('should compute correct totalDots for 5 items with numVisible=1 numScroll=1', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      // 5 items, numVisible=1, numScroll=1 → ceil((5-1)/1)+1 = 5
      expect(carousel.totalDots()).toBe(5);
    });

    it('should compute correct totalDots for 5 items with numVisible=3 numScroll=1', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.numVisible.set(3);
      fixture.detectChanges();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      // ceil((5-3)/1)+1 = 3
      expect(carousel.totalDots()).toBe(3);
    });

    it('should not show indicators when there is only one dot', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.numVisible.set(5);
      fixture.detectChanges();
      const indicatorList: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.uilib-carousel-indicator-list'
      );
      expect(indicatorList).toBeNull();
    });
  });

  // ─── Orientation ──────────────────────────────────────────────────────────────

  describe('orientation', (): void => {
    it('should apply vertical class when orientation is vertical', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.orientation.set('vertical');
      fixture.detectChanges();
      const host: HTMLElement | null = queryElement(fixture, 'ui-lib-carousel');
      expect(host?.classList).toContain('uilib-carousel-vertical');
      expect(host?.classList).not.toContain('uilib-carousel-horizontal');
    });

    it('should report isVertical() true when orientation is vertical', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.orientation.set('vertical');
      fixture.detectChanges();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      expect(carousel.isVertical()).toBe(true);
    });
  });

  // ─── Templates ────────────────────────────────────────────────────────────────

  describe('content templates', (): void => {
    it('should render item template for each item', async (): Promise<void> => {
      const fixture: ComponentFixture<TemplateHostComponent> = await createTemplateFixture();
      const slots: HTMLElement[] = queryAllElements<HTMLElement>(fixture, '.item-slot');
      // 5 real items
      expect(slots.length).toBe(5);
    });

    it('should render header template', async (): Promise<void> => {
      const fixture: ComponentFixture<TemplateHostComponent> = await createTemplateFixture();
      const header: HTMLElement | null = queryElement<HTMLElement>(fixture, '.header-slot');
      expect(header).not.toBeNull();
      expect((header as HTMLElement).textContent!.trim()).toBe('Header');
    });

    it('should render footer template', async (): Promise<void> => {
      const fixture: ComponentFixture<TemplateHostComponent> = await createTemplateFixture();
      const footer: HTMLElement | null = queryElement<HTMLElement>(fixture, '.footer-slot');
      expect(footer).not.toBeNull();
      expect((footer as HTMLElement).textContent!.trim()).toBe('Footer');
    });
  });

  // ─── Empty state ─────────────────────────────────────────────────────────────

  describe('empty state', (): void => {
    it('should render no items when value is empty', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.items.set([]);
      fixture.detectChanges();
      const items: HTMLElement[] = queryAllElements<HTMLElement>(
        fixture,
        '.uilib-carousel-item:not(.uilib-carousel-item-clone)'
      );
      expect(items.length).toBe(0);
    });

    it('should disable both nav buttons when value is empty', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.items.set([]);
      fixture.detectChanges();
      const prevBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-prev-button'
      );
      const nextBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-next-button'
      );
      expect(prevBtn?.disabled).toBe(true);
      expect(nextBtn?.disabled).toBe(true);
    });
  });

  // ─── Circular ────────────────────────────────────────────────────────────────

  describe('circular mode', (): void => {
    it('should create clone items when circular is true', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.circular.set(true);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      expect(carousel.clonedItemsForStarting.length).toBeGreaterThan(0);
      expect(carousel.clonedItemsForFinishing.length).toBeGreaterThan(0);
    });

    it('should not disable prev button on first page in circular mode', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      fixture.componentInstance.circular.set(true);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const prevBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-prev-button'
      );
      expect(prevBtn?.disabled).toBe(false);
    });
  });

  // ─── ARIA ─────────────────────────────────────────────────────────────────────

  describe('accessibility', (): void => {
    it('should set aria-hidden on non-active items', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const items: HTMLElement[] = queryAllElements<HTMLElement>(
        fixture,
        '.uilib-carousel-item:not(.uilib-carousel-item-clone)'
      );
      const hiddenItems: HTMLElement[] = items.filter(
        (item: HTMLElement): boolean => item.getAttribute('aria-hidden') === 'true'
      );
      // With 5 items and numVisible=1, only 1 is active so 4 should be hidden
      expect(hiddenItems.length).toBe(4);
    });

    it('should set aria-label on prev and next buttons', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const prevBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-prev-button'
      );
      const nextBtn: HTMLButtonElement | null = queryElement<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-next-button'
      );
      expect(prevBtn?.getAttribute('aria-label')).toBeTruthy();
      expect(nextBtn?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should set role="tablist" on the indicator list', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const indicatorList: HTMLElement | null = queryElement<HTMLElement>(
        fixture,
        '.uilib-carousel-indicator-list'
      );
      expect(indicatorList?.getAttribute('role')).toBe('tablist');
    });

    it('should set role="tab" on indicator buttons', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const dotButtons: HTMLButtonElement[] = queryAllElements<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-indicator-button'
      );
      for (const button of dotButtons) {
        expect(button.getAttribute('role')).toBe('tab');
      }
    });

    it('should set aria-selected="true" on the active indicator button', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const dotButtons: HTMLButtonElement[] = queryAllElements<HTMLButtonElement>(
        fixture,
        '.uilib-carousel-indicator-button'
      );
      expect(dotButtons[0]!.getAttribute('aria-selected')).toBe('true');
      expect(dotButtons[1]!.getAttribute('aria-selected')).toBe('false');
    });

    it('should apply aria-roledescription="slide" to each item', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const items: HTMLElement[] = queryAllElements<HTMLElement>(
        fixture,
        '.uilib-carousel-item:not(.uilib-carousel-item-clone)'
      );
      for (const item of items) {
        expect(item.getAttribute('aria-roledescription')).toBe('slide');
      }
    });
  });

  // ─── componentId ──────────────────────────────────────────────────────────────

  describe('componentId', (): void => {
    it('should generate a unique componentId', async (): Promise<void> => {
      const fixture1: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      const fixture2: ComponentFixture<DefaultHostComponent> =
        TestBed.createComponent(DefaultHostComponent);
      fixture1.detectChanges();
      fixture2.detectChanges();
      const c1: CarouselComponent = fixture1.debugElement.query(By.directive(CarouselComponent))
        .componentInstance as CarouselComponent;
      const c2: CarouselComponent = fixture2.debugElement.query(By.directive(CarouselComponent))
        .componentInstance as CarouselComponent;
      expect(c1.componentId).not.toBe(c2.componentId);
    });
  });

  // ─── Helper methods ───────────────────────────────────────────────────────────

  describe('index helpers', (): void => {
    it('should mark first visible index as active', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      expect(carousel.isItemActive(0)).toBe(true);
      expect(carousel.isItemFirst(0)).toBe(true);
    });

    it('should mark non-visible items as inactive', async (): Promise<void> => {
      const fixture: ComponentFixture<ConfigurableHostComponent> =
        await createConfigurableFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      expect(carousel.isItemActive(1)).toBe(false);
      expect(carousel.isItemActive(4)).toBe(false);
    });

    it('should produce correct ariaSlideNumber', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      expect(carousel.ariaSlideNumber(0)).toBe('slide 1');
      expect(carousel.ariaSlideNumber(4)).toBe('slide 5');
    });

    it('should produce correct ariaPageLabel', async (): Promise<void> => {
      const fixture: ComponentFixture<DefaultHostComponent> = await createDefaultFixture();
      const carousel: CarouselComponent = fixture.debugElement.query(
        By.directive(CarouselComponent)
      ).componentInstance as CarouselComponent;
      expect(carousel.ariaPageLabel(0)).toBe('Page 1');
      expect(carousel.ariaPageLabel(0)).toBe('Page 1');
      expect(carousel.ariaPageLabel(3)).toBe('Page 4');
    });
  });
});
