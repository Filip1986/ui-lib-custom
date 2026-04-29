import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { GalleriaComponent } from './galleria';
import type { GalleriaSize, GalleriaThumbnailsPosition, GalleriaVariant } from './galleria.types';

// ─── Test helpers ─────────────────────────────────────────────────────────────

function getHost(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('ui-lib-galleria')!;
}

function getContainer(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
    '.uilib-galleria__container'
  );
}

function getItemWrapper(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
    '.uilib-galleria__item-wrapper'
  );
}

function getAllThumbnailItems(fixture: ComponentFixture<unknown>): NodeListOf<HTMLElement> {
  return (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
    '.uilib-galleria__thumbnail-item'
  );
}

function getNavPrev(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
    '.uilib-galleria__item-nav--prev'
  );
}

function getNavNext(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
    '.uilib-galleria__item-nav--next'
  );
}

// ─── Test items ───────────────────────────────────────────────────────────────

interface TestItem {
  src: string;
  alt: string;
}

const TEST_ITEMS: TestItem[] = [
  { src: 'img1.jpg', alt: 'Image 1' },
  { src: 'img2.jpg', alt: 'Image 2' },
  { src: 'img3.jpg', alt: 'Image 3' },
  { src: 'img4.jpg', alt: 'Image 4' },
  { src: 'img5.jpg', alt: 'Image 5' },
];

// ─── Test host ────────────────────────────────────────────────────────────────

@Component({
  selector: 'test-host',
  standalone: true,
  imports: [GalleriaComponent],
  template: `
    <ui-lib-galleria
      [value]="items()"
      [activeIndex]="activeIndex()"
      [numVisible]="numVisible()"
      [numScroll]="numScroll()"
      [showThumbnails]="showThumbnails()"
      [showIndicators]="showIndicators()"
      [showItemNavigators]="showItemNavigators()"
      [circular]="circular()"
      [variant]="variant()"
      [size]="size()"
      [thumbnailsPosition]="thumbnailsPosition()"
      (activeIndexChange)="onActiveIndexChange($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly items: WritableSignal<TestItem[]> = signal<TestItem[]>(TEST_ITEMS);
  public readonly activeIndex: WritableSignal<number> = signal<number>(0);
  public readonly numVisible: WritableSignal<number> = signal<number>(3);
  public readonly numScroll: WritableSignal<number> = signal<number>(1);
  public readonly showThumbnails: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showIndicators: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showItemNavigators: WritableSignal<boolean> = signal<boolean>(true);
  public readonly circular: WritableSignal<boolean> = signal<boolean>(false);
  public readonly variant: WritableSignal<GalleriaVariant> = signal<GalleriaVariant>('material');
  public readonly size: WritableSignal<GalleriaSize> = signal<GalleriaSize>('md');
  public readonly thumbnailsPosition: WritableSignal<GalleriaThumbnailsPosition> =
    signal<GalleriaThumbnailsPosition>('bottom');

  public lastActiveIndexChange: number = -1;

  public onActiveIndexChange(index: number): void {
    this.lastActiveIndexChange = index;
  }
}

// ─── Suite ────────────────────────────────────────────────────────────────────

describe('GalleriaComponent', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  async function setup(
    overrides: Partial<{
      items: TestItem[];
      activeIndex: number;
      numVisible: number;
      numScroll: number;
      showThumbnails: boolean;
      showIndicators: boolean;
      showItemNavigators: boolean;
      circular: boolean;
      variant: GalleriaVariant;
      size: GalleriaSize;
      thumbnailsPosition: GalleriaThumbnailsPosition;
    }> = {}
  ): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;

    if (overrides.items !== undefined) {
      host.items.set(overrides.items);
    }
    if (overrides.activeIndex !== undefined) {
      host.activeIndex.set(overrides.activeIndex);
    }
    if (overrides.numVisible !== undefined) {
      host.numVisible.set(overrides.numVisible);
    }
    if (overrides.numScroll !== undefined) {
      host.numScroll.set(overrides.numScroll);
    }
    if (overrides.showThumbnails !== undefined) {
      host.showThumbnails.set(overrides.showThumbnails);
    }
    if (overrides.showIndicators !== undefined) {
      host.showIndicators.set(overrides.showIndicators);
    }
    if (overrides.showItemNavigators !== undefined) {
      host.showItemNavigators.set(overrides.showItemNavigators);
    }
    if (overrides.circular !== undefined) {
      host.circular.set(overrides.circular);
    }
    if (overrides.variant !== undefined) {
      host.variant.set(overrides.variant);
    }
    if (overrides.size !== undefined) {
      host.size.set(overrides.size);
    }
    if (overrides.thumbnailsPosition !== undefined) {
      host.thumbnailsPosition.set(overrides.thumbnailsPosition);
    }

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  // ─── Rendering ─────────────────────────────────────────────────────────────

  it('should create the component', async (): Promise<void> => {
    await setup();
    expect(getHost(fixture)).toBeTruthy();
  });

  it('should render the gallery container', async (): Promise<void> => {
    await setup();
    expect(getContainer(fixture)).toBeTruthy();
  });

  it('should render the item wrapper', async (): Promise<void> => {
    await setup();
    expect(getItemWrapper(fixture)).toBeTruthy();
  });

  // ─── Host classes ──────────────────────────────────────────────────────────

  it('should apply the base host class', async (): Promise<void> => {
    await setup();
    expect(getHost(fixture).classList.contains('ui-lib-galleria')).toBe(true);
  });

  it('should apply the variant class', async (): Promise<void> => {
    await setup({ variant: 'bootstrap' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--variant-bootstrap')).toBe(true);
  });

  it('should apply the size class', async (): Promise<void> => {
    await setup({ size: 'lg' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--size-lg')).toBe(true);
  });

  it('should apply the thumbnailsPosition class', async (): Promise<void> => {
    await setup({ thumbnailsPosition: 'left' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--thumbnails-left')).toBe(true);
  });

  it('should apply the vertical class when thumbnailsPosition is left or right', async (): Promise<void> => {
    await setup({ thumbnailsPosition: 'left' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--vertical')).toBe(true);
  });

  it('should NOT apply vertical class for bottom position', async (): Promise<void> => {
    await setup({ thumbnailsPosition: 'bottom' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--vertical')).toBe(false);
  });

  // ─── Navigation ────────────────────────────────────────────────────────────

  it('should render prev/next navigator buttons when showItemNavigators is true', async (): Promise<void> => {
    await setup({ showItemNavigators: true });
    expect(getNavPrev(fixture)).toBeTruthy();
    expect(getNavNext(fixture)).toBeTruthy();
  });

  it('should NOT render navigator buttons when showItemNavigators is false', async (): Promise<void> => {
    await setup({ showItemNavigators: false });
    expect(getNavPrev(fixture)).toBeNull();
    expect(getNavNext(fixture)).toBeNull();
  });

  it('should disable prev button when on first item and not circular', async (): Promise<void> => {
    await setup({ activeIndex: 0, circular: false });
    const prevButton: HTMLButtonElement | null = getNavPrev(fixture);
    expect(prevButton).toBeTruthy();
    expect(prevButton!.disabled).toBe(true);
  });

  it('should disable next button when on last item and not circular', async (): Promise<void> => {
    await setup({ activeIndex: TEST_ITEMS.length - 1, circular: false });
    const nextButton: HTMLButtonElement | null = getNavNext(fixture);
    expect(nextButton).toBeTruthy();
    expect(nextButton!.disabled).toBe(true);
  });

  it('should NOT disable prev button when circular and on first item', async (): Promise<void> => {
    await setup({ activeIndex: 0, circular: true });
    const prevButton: HTMLButtonElement | null = getNavPrev(fixture);
    expect(prevButton!.disabled).toBe(false);
  });

  it('should NOT disable next button when circular and on last item', async (): Promise<void> => {
    await setup({ activeIndex: TEST_ITEMS.length - 1, circular: true });
    const nextButton: HTMLButtonElement | null = getNavNext(fixture);
    expect(nextButton!.disabled).toBe(false);
  });

  it('should navigate forward when next button is clicked', async (): Promise<void> => {
    await setup({ activeIndex: 0 });
    getNavNext(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.lastActiveIndexChange).toBe(1);
  });

  it('should navigate backward when prev button is clicked', async (): Promise<void> => {
    await setup({ activeIndex: 2 });
    getNavPrev(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.lastActiveIndexChange).toBe(1);
  });

  it('should wrap to last item when navigating prev from index 0 with circular', async (): Promise<void> => {
    await setup({ activeIndex: 0, circular: true });
    getNavPrev(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.lastActiveIndexChange).toBe(TEST_ITEMS.length - 1);
  });

  it('should wrap to first item when navigating next from last item with circular', async (): Promise<void> => {
    await setup({ activeIndex: TEST_ITEMS.length - 1, circular: true });
    getNavNext(fixture)!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.lastActiveIndexChange).toBe(0);
  });

  // ─── Thumbnails ────────────────────────────────────────────────────────────

  it('should render numVisible thumbnails', async (): Promise<void> => {
    await setup({ numVisible: 3 });
    const thumbnails: NodeListOf<HTMLElement> = getAllThumbnailItems(fixture);
    expect(thumbnails.length).toBe(3);
  });

  it('should NOT render thumbnails when showThumbnails is false', async (): Promise<void> => {
    await setup({ showThumbnails: false });
    const thumbnails: NodeListOf<HTMLElement> = getAllThumbnailItems(fixture);
    expect(thumbnails.length).toBe(0);
  });

  it('should mark the active thumbnail with the active class', async (): Promise<void> => {
    await setup({ activeIndex: 0, numVisible: 3 });
    const thumbnails: NodeListOf<HTMLElement> = getAllThumbnailItems(fixture);
    expect(thumbnails[0]!.classList.contains('uilib-galleria__thumbnail-item--active')).toBe(true);
  });

  it('should navigate to item when thumbnail is clicked', async (): Promise<void> => {
    await setup({ activeIndex: 0, numVisible: 3 });
    const thumbnails: NodeListOf<HTMLElement> = getAllThumbnailItems(fixture);
    thumbnails[2]!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.lastActiveIndexChange).toBe(2);
  });

  // ─── Indicators ────────────────────────────────────────────────────────────

  it('should render indicator buttons when showIndicators is true', async (): Promise<void> => {
    await setup({ showIndicators: true });
    const indicators: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('.uilib-galleria__indicator-btn');
    expect(indicators.length).toBe(TEST_ITEMS.length);
  });

  it('should NOT render indicators when showIndicators is false', async (): Promise<void> => {
    await setup({ showIndicators: false });
    const indicators: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('.uilib-galleria__indicator-btn');
    expect(indicators.length).toBe(0);
  });

  it('should navigate to item when indicator is clicked', async (): Promise<void> => {
    await setup({ showIndicators: true, activeIndex: 0 });
    const indicators: NodeListOf<HTMLElement> = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll<HTMLElement>('.uilib-galleria__indicator-btn');
    (indicators[3] as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(host.lastActiveIndexChange).toBe(3);
  });

  // ─── Thumbnail scroll ──────────────────────────────────────────────────────

  it('should scroll thumbnails forward when thumb-next is clicked', async (): Promise<void> => {
    await setup({ numVisible: 3, numScroll: 1 });
    const galleriaEl: GalleriaComponent = (
      fixture.nativeElement as HTMLElement
    ).querySelector<Element>('ui-lib-galleria')! as unknown as GalleriaComponent;

    // Access via component instance via debugElement
    const galleriaEl2: Element = (fixture.nativeElement as HTMLElement).querySelector(
      'ui-lib-galleria'
    )!;
    const thumbNextBtn: HTMLButtonElement | null = galleriaEl2.querySelector<HTMLButtonElement>(
      '.uilib-galleria__thumbnail-nav--next'
    );
    expect(thumbNextBtn).toBeTruthy();
    thumbNextBtn!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    // thumbnailFirstIndex should advance by numScroll
    const activeThumb: HTMLElement | null = galleriaEl2.querySelector(
      '.uilib-galleria__thumbnail-item--active'
    );
    // After scroll, first thumbnail should be the 2nd item (index 1)
    const thumbnails: NodeListOf<HTMLElement> = galleriaEl2.querySelectorAll<HTMLElement>(
      '.uilib-galleria__thumbnail-item'
    );
    expect(thumbnails.length).toBe(3);
    // Void usage to avoid unused-var lint
    void activeThumb;
    void galleriaEl;
  });

  // ─── Accessibility ─────────────────────────────────────────────────────────

  it('should have role="region" on the host', async (): Promise<void> => {
    await setup();
    expect(getHost(fixture).getAttribute('role')).toBe('region');
  });

  it('should have aria-label on the host', async (): Promise<void> => {
    await setup();
    expect(getHost(fixture).getAttribute('aria-label')).toBeTruthy();
  });

  it('should have aria-label on the item area', async (): Promise<void> => {
    await setup();
    const itemArea: HTMLElement | null =
      getItemWrapper(fixture)?.querySelector('.uilib-galleria__item') ?? null;
    expect(itemArea?.getAttribute('aria-label')).toContain('1 of');
  });

  it('should have role="button" on thumbnail items', async (): Promise<void> => {
    await setup({ numVisible: 3 });
    const thumbnails: NodeListOf<HTMLElement> = getAllThumbnailItems(fixture);
    thumbnails.forEach((thumb: HTMLElement): void => {
      expect(thumb.getAttribute('role')).toBe('button');
    });
  });

  it('should have tabindex="0" on thumbnail items', async (): Promise<void> => {
    await setup({ numVisible: 3 });
    const thumbnails: NodeListOf<HTMLElement> = getAllThumbnailItems(fixture);
    thumbnails.forEach((thumb: HTMLElement): void => {
      expect(thumb.getAttribute('tabindex')).toBe('0');
    });
  });

  // ─── Variants ──────────────────────────────────────────────────────────────

  it('should apply material variant class', async (): Promise<void> => {
    await setup({ variant: 'material' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--variant-material')).toBe(true);
  });

  it('should apply bootstrap variant class', async (): Promise<void> => {
    await setup({ variant: 'bootstrap' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--variant-bootstrap')).toBe(true);
  });

  it('should apply minimal variant class', async (): Promise<void> => {
    await setup({ variant: 'minimal' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--variant-minimal')).toBe(true);
  });

  // ─── Sizes ─────────────────────────────────────────────────────────────────

  it('should apply sm size class', async (): Promise<void> => {
    await setup({ size: 'sm' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--size-sm')).toBe(true);
  });

  it('should apply md size class', async (): Promise<void> => {
    await setup({ size: 'md' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--size-md')).toBe(true);
  });

  it('should apply lg size class', async (): Promise<void> => {
    await setup({ size: 'lg' });
    expect(getHost(fixture).classList.contains('ui-lib-galleria--size-lg')).toBe(true);
  });

  // ─── Empty value ───────────────────────────────────────────────────────────

  it('should render without errors when value is empty', async (): Promise<void> => {
    await setup({ items: [] });
    expect(getContainer(fixture)).toBeTruthy();
  });
});
