import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type {
  AfterContentInit,
  AfterViewInit,
  ElementRef,
  InputSignal,
  OnDestroy,
  OutputEmitterRef,
  Signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import {
  CAROUSEL_ARIA_NEXT_LABEL,
  CAROUSEL_ARIA_PREV_LABEL,
  CAROUSEL_ARIA_SLIDE_ROLEDESCRIPTION,
  CAROUSEL_DEFAULT_NUM_SCROLL,
  CAROUSEL_DEFAULT_NUM_VISIBLE,
  CAROUSEL_DEFAULT_ORIENTATION,
  CAROUSEL_DEFAULT_VERTICAL_VIEWPORT_HEIGHT,
  CAROUSEL_SWIPE_THRESHOLD,
  CAROUSEL_TRANSITION_DURATION,
} from './carousel.constants';
import type {
  CarouselOrientation,
  CarouselPageEvent,
  CarouselResponsiveOption,
  CarouselSize,
  CarouselVariant,
} from './carousel.types';

/**
 * Carousel is a content slider with support for multiple visible items,
 * responsive breakpoints, autoplay, circular mode, touch/swipe, and
 * three design variants (Material, Bootstrap, Minimal).
 *
 * Provide an item template via \`<ng-template carouselItem let-item>\`.
 *
 * @example
 * ```html
 * <ui-lib-carousel [value]="products" [numVisible]="3" [numScroll]="1" [circular]="true">
 *   <ng-template carouselItem let-product>
 *     <div class="product-card">{{ product.name }}</div>
 *   </ng-template>
 * </ui-lib-carousel>
 * ```
 */
@Component({
  selector: 'ui-lib-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.uilib-carousel]': 'true',
    '[class.uilib-carousel-horizontal]': '!isVertical()',
    '[class.uilib-carousel-vertical]': 'isVertical()',
    '[class.uilib-carousel-variant-material]': 'variant() === "material"',
    '[class.uilib-carousel-variant-bootstrap]': 'variant() === "bootstrap"',
    '[class.uilib-carousel-variant-minimal]': 'variant() === "minimal"',
    '[class.uilib-carousel-sm]': 'size() === "sm"',
    '[class.uilib-carousel-md]': 'size() === "md"',
    '[class.uilib-carousel-lg]': 'size() === "lg"',
    role: 'region',
  },
})
export class CarouselComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  // ─── Injected Services ───────────────────────────────────────────────────────

  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly zone: NgZone = inject(NgZone);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  // ─── View Queries ────────────────────────────────────────────────────────────

  /** Container element whose transform is animated during navigation. */
  public readonly itemsContainer: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('itemsContainer');

  /** Container for the indicator (dot) buttons — used for keyboard focus management. */
  public readonly indicatorContainer: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('indicatorContainer');

  // ─── Content Queries ─────────────────────────────────────────────────────────

  /** Template for rendering each item. Exposes `$implicit` as the item data. */
  public readonly itemTemplate: Signal<TemplateRef<{ $implicit: unknown }> | undefined> =
    contentChild<TemplateRef<{ $implicit: unknown }>>('carouselItem');

  /** Optional header template. */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('carouselHeader');

  /** Optional footer template. */
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('carouselFooter');

  /** Optional custom icon template for the "previous" button. */
  public readonly prevIconTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('carouselPrevIcon');

  /** Optional custom icon template for the "next" button. */
  public readonly nextIconTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('carouselNextIcon');

  // ─── Inputs ──────────────────────────────────────────────────────────────────

  /** Array of data items to display in the carousel. */
  public readonly value: InputSignal<unknown[]> = input<unknown[]>([]);

  /** Design variant — controls visual style. */
  public readonly variant: InputSignal<CarouselVariant> = input<CarouselVariant>('material');

  /** Size token — controls padding, font-size, and button dimensions. */
  public readonly size: InputSignal<CarouselSize> = input<CarouselSize>('md');

  /** Number of items visible in the viewport at once. */
  public readonly numVisible: InputSignal<number> = input<number>(CAROUSEL_DEFAULT_NUM_VISIBLE);

  /** Number of items scrolled per navigation step. */
  public readonly numScroll: InputSignal<number> = input<number>(CAROUSEL_DEFAULT_NUM_SCROLL);

  /** Layout orientation. */
  public readonly orientation: InputSignal<CarouselOrientation> = input<CarouselOrientation>(
    CAROUSEL_DEFAULT_ORIENTATION as CarouselOrientation
  );

  /** Viewport height override — only applied in vertical orientation. */
  public readonly verticalViewportHeight: InputSignal<string> = input<string>(
    CAROUSEL_DEFAULT_VERTICAL_VIEWPORT_HEIGHT
  );

  /** When true, navigation wraps from last item back to first. */
  public readonly circular: InputSignal<boolean> = input<boolean>(false);

  /** Show or hide the navigation (prev/next) buttons. */
  public readonly showNavigators: InputSignal<boolean> = input<boolean>(true);

  /** Show or hide the indicator (dot) buttons below the viewport. */
  public readonly showIndicators: InputSignal<boolean> = input<boolean>(true);

  /**
   * Milliseconds between automatic page advances.
   * Set to 0 (default) to disable autoplay.
   */
  public readonly autoplayInterval: InputSignal<number> = input<number>(0);

  /**
   * Responsive breakpoint options.
   * Applied when viewport width is at or below the breakpoint value.
   */
  public readonly responsiveOptions: InputSignal<CarouselResponsiveOption[]> = input<
    CarouselResponsiveOption[]
  >([]);

  /** Optional extra CSS class applied to the root host element. */
  public readonly styleClass: InputSignal<string> = input<string>('');

  /** ARIA label for the "previous" button. */
  public readonly prevAriaLabel: InputSignal<string> = input<string>(CAROUSEL_ARIA_PREV_LABEL);

  /** ARIA label for the "next" button. */
  public readonly nextAriaLabel: InputSignal<string> = input<string>(CAROUSEL_ARIA_NEXT_LABEL);

  // ─── Outputs ─────────────────────────────────────────────────────────────────

  /** Emitted whenever the active page changes. */
  public readonly pageChange: OutputEmitterRef<CarouselPageEvent> = output<CarouselPageEvent>();

  // ─── Internal State ──────────────────────────────────────────────────────────

  /** Zero-based index of the currently active page. */
  public readonly currentPage: WritableSignal<number> = signal<number>(0);

  /**
   * Responsive override for numVisible — set by applyResponsiveOptions when a breakpoint matches.
   * Null means no responsive breakpoint is active.
   */
  private readonly responsiveNumVisible: WritableSignal<number | null> = signal<number | null>(
    null
  );

  /**
   * Responsive override for numScroll — set by applyResponsiveOptions when a breakpoint matches.
   * Null means no responsive breakpoint is active.
   */
  private readonly responsiveNumScroll: WritableSignal<number | null> = signal<number | null>(null);

  /**
   * Currently active numVisible — reactive to both the numVisible input and responsive breakpoints.
   * Responsive breakpoints take precedence over the input value.
   */
  public readonly activeNumVisible: Signal<number> = computed(
    (): number => this.responsiveNumVisible() ?? this.numVisible()
  );

  /**
   * Currently active numScroll — reactive to both the numScroll input and responsive breakpoints.
   * Responsive breakpoints take precedence over the input value.
   */
  public readonly activeNumScroll: Signal<number> = computed(
    (): number => this.responsiveNumScroll() ?? this.numScroll()
  );

  /** Total offset (in item units, negative) applied via CSS transform to the item list. */
  public readonly totalShiftedItems: WritableSignal<number> = signal<number>(0);

  /** Whether the component has been fully initialised (used to guard page setter). */
  private isInitialised: boolean = false;

  /** Whether remaining items adjustment has been applied on the last page. */
  private isRemainingItemsAdded: boolean = false;

  /**
   * Number of items that don't fill a complete page.
   * Used in the step() function to correct the transform on the last page.
   */
  private get remainingItems(): number {
    return (this.value().length - this.activeNumVisible()) % this.activeNumScroll();
  }

  /** Items cloned at the start of the list for circular wrap-around. */
  public clonedItemsForStarting: unknown[] = [];

  /** Items cloned at the end of the list for circular wrap-around. */
  public clonedItemsForFinishing: unknown[] = [];

  /** Touch start coordinates — set in onTouchStart. */
  private touchStartPosition: { x: number; y: number } | null = null;

  /** Auto-play interval handle. */
  private autoplayTimerId: ReturnType<typeof setInterval> | null = null;

  /** Whether autoplay is currently allowed (set to false after manual nav). */
  private autoplayAllowed: boolean = false;

  /** Injected style element for per-component item-width rules. */
  private styleElement: HTMLStyleElement | null = null;

  /** Unique ID for scoping the dynamic style rules. */
  public readonly componentId: string = `uilib-carousel-${Math.random().toString(36).slice(2, 9)}`;

  /** Window resize listener teardown function. */
  private resizeUnlisten: (() => void) | null = null;

  // ─── Computed ────────────────────────────────────────────────────────────────

  /**
   * Total number of indicator dots.
   * = ceil((totalItems - numVisible) / numScroll) + 1
   */
  public readonly totalDots: Signal<number> = computed((): number => {
    const total: number = this.value().length;
    const numVisible: number = this.activeNumVisible();
    const numScroll: number = this.activeNumScroll();
    if (total === 0 || numVisible >= total) {
      return total === 0 ? 0 : 1;
    }
    return Math.ceil((total - numVisible) / numScroll) + 1;
  });

  /** Array of dot indices — used in @for to render indicator buttons. */
  public readonly dotsArray: Signal<number[]> = computed((): number[] =>
    Array.from({ length: this.totalDots() }, (_: unknown, index: number): number => index)
  );

  /** Whether the backward navigation button should be disabled. */
  public readonly isBackwardDisabled: Signal<boolean> = computed(
    (): boolean => this.value().length === 0 || (this.currentPage() <= 0 && !this.circular())
  );

  /** Whether the forward navigation button should be disabled. */
  public readonly isForwardDisabled: Signal<boolean> = computed(
    (): boolean =>
      this.value().length === 0 || (this.currentPage() >= this.totalDots() - 1 && !this.circular())
  );

  /** Viewport style — height override applied only in vertical orientation. */
  public readonly viewportStyle: Signal<Record<string, string>> = computed(
    (): Record<string, string> => {
      if (this.orientation() === 'vertical') {
        return { height: this.verticalViewportHeight() };
      }
      return {};
    }
  );

  // ─── Constructor ─────────────────────────────────────────────────────────────

  constructor() {
    /**
     * React to changes in `circular` or `value` after initialisation.
     * When circular mode is enabled, clone items must be (re-)populated.
     * When disabled, the clone arrays should be cleared.
     */
    effect((): void => {
      if (this.circular()) {
        this.updateCloneItems();
      } else {
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
      }
      this.cdr.markForCheck();
    });
  }

  // ─── Lifecycle ────────────────────────────────────────────────────────────────

  public ngAfterContentInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.autoplayAllowed = this.autoplayInterval() > 0;

      if (this.responsiveOptions().length > 0) {
        this.applyResponsiveOptions();
        this.bindResizeListener();
      }

      this.injectItemWidthStyle();
    }

    // Initialise shift so that the first page is in view.
    this.totalShiftedItems.set(this.circular() ? -1 * this.activeNumVisible() : 0);
    this.isInitialised = true;

    if (this.autoplayAllowed && isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  public ngAfterViewInit(): void {
    this.syncTransform(false);
  }

  public ngOnDestroy(): void {
    this.stopAutoplay();
    this.unbindResizeListener();
    this.removeStyleElement();
  }

  // ─── Public Navigation ────────────────────────────────────────────────────────

  /** Navigate one step backward. */
  public navigateBackward(event: Event): void {
    if (this.isBackwardDisabled()) {
      return;
    }
    this.step(1);
    this.stopAutoplay();
    event.preventDefault();
  }

  /** Navigate one step forward. */
  public navigateForward(event: Event): void {
    if (this.isForwardDisabled()) {
      return;
    }
    this.step(-1);
    this.stopAutoplay();
    event.preventDefault();
  }

  /** Navigate directly to a page by index (indicator dot click). */
  public navigateToPage(event: Event, targetPage: number): void {
    const page: number = this.currentPage();
    this.stopAutoplay();
    if (targetPage > page) {
      this.step(-1, targetPage);
    } else if (targetPage < page) {
      this.step(1, targetPage);
    }
    event.preventDefault();
  }

  // ─── Index helpers (used in template) ────────────────────────────────────────

  /** First index of the currently visible window into the value array. */
  public firstVisibleIndex(): number {
    const numVisible: number = this.activeNumVisible();
    return this.circular()
      ? -1 * (this.totalShiftedItems() + numVisible)
      : -1 * this.totalShiftedItems();
  }

  /** Last index of the currently visible window into the value array. */
  public lastVisibleIndex(): number {
    return this.firstVisibleIndex() + this.activeNumVisible() - 1;
  }

  /** Whether item at \`index\` is part of the currently visible window. */
  public isItemActive(index: number): boolean {
    return this.firstVisibleIndex() <= index && this.lastVisibleIndex() >= index;
  }

  /** Whether item at \`index\` is the first visible item. */
  public isItemFirst(index: number): boolean {
    return this.firstVisibleIndex() === index;
  }

  /** Whether item at \`index\` is the last visible item. */
  public isItemLast(index: number): boolean {
    return this.lastVisibleIndex() === index;
  }

  // ─── ARIA helpers (used in template) ─────────────────────────────────────────

  /** ARIA label for a numbered slide. */
  public ariaSlideNumber(index: number): string {
    return `${CAROUSEL_ARIA_SLIDE_ROLEDESCRIPTION} ${index + 1}`;
  }

  /** ARIA label for a numbered indicator dot. */
  public ariaPageLabel(page: number): string {
    return `Page ${page + 1}`;
  }

  /** Whether orientation is vertical — used in template and SCSS helpers. */
  public isVertical(): boolean {
    return this.orientation() === 'vertical';
  }

  // ─── Touch support ────────────────────────────────────────────────────────────

  /** Capture touch start position. */
  public onTouchStart(event: TouchEvent): void {
    const touch: Touch | undefined = event.changedTouches[0];
    if (!touch) {
      return;
    }
    this.touchStartPosition = { x: touch.pageX, y: touch.pageY };
  }

  /** Prevent default scroll behaviour during horizontal swipe. */
  public onTouchMove(event: TouchEvent): void {
    if (event.cancelable) {
      event.preventDefault();
    }
  }

  /** Determine swipe direction and navigate. */
  public onTouchEnd(event: TouchEvent): void {
    if (!this.touchStartPosition) {
      return;
    }
    const touch: Touch | undefined = event.changedTouches[0];
    if (!touch) {
      return;
    }
    const delta: number = this.isVertical()
      ? touch.pageY - this.touchStartPosition.y
      : touch.pageX - this.touchStartPosition.x;
    this.applyTouchNavigation(event, delta);
    this.touchStartPosition = null;
  }

  // ─── Transition end ───────────────────────────────────────────────────────────

  /** Re-snap the transform after the CSS transition completes (circular seam fix). */
  public onTransitionEnd(): void {
    const container: ElementRef<HTMLElement> | undefined = this.itemsContainer();
    if (!container) {
      return;
    }
    const element: HTMLElement = container.nativeElement;
    element.style.transition = '';

    const page: number = this.currentPage();
    const dots: number = this.totalDots();

    if (this.circular() && (page === 0 || page === dots - 1)) {
      element.style.transform = this.buildTransformValue(this.totalShiftedItems());
    }
  }

  // ─── Indicator keyboard nav ───────────────────────────────────────────────────

  /** Handle keyboard navigation within the indicator list. */
  public onIndicatorKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowRight':
      case 'ArrowDown':
        this.moveFocusedIndicator(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.moveFocusedIndicator(-1);
        break;
      case 'Home':
        this.moveFocusedIndicator(-Infinity);
        break;
      case 'End':
        this.moveFocusedIndicator(Infinity);
        break;
      default:
        break;
    }
  }

  // ─── Private helpers ──────────────────────────────────────────────────────────

  /**
   * Core navigation step function.
   * @param direction +1 = backward, -1 = forward.
   * @param targetPage Optional explicit target page (used by dot clicks).
   */
  private step(direction: number, targetPage?: number): void {
    const numVisible: number = this.activeNumVisible();
    const numScroll: number = this.activeNumScroll();
    const isCircular: boolean = this.circular() && this.value().length >= numVisible;
    let shifted: number = this.totalShiftedItems();

    if (targetPage !== undefined) {
      shifted = numScroll * targetPage * -1;
      if (isCircular) {
        shifted -= numVisible;
      }
      this.isRemainingItemsAdded = false;
    } else {
      shifted += numScroll * direction;
      if (this.isRemainingItemsAdded) {
        shifted += this.remainingItems - numScroll * direction;
        this.isRemainingItemsAdded = false;
      }
      const rawPage: number = isCircular ? shifted + numVisible : shifted;
      targetPage = Math.abs(Math.floor(rawPage / numScroll));
    }

    const page: number = this.currentPage();
    const dots: number = this.totalDots();

    // Circular wrap-around at the edges.
    if (isCircular && page === dots - 1 && direction === -1) {
      shifted = -1 * (this.value().length + numVisible);
      targetPage = 0;
    } else if (isCircular && page === 0 && direction === 1) {
      shifted = 0;
      targetPage = dots - 1;
    } else if (targetPage === dots - 1 && this.remainingItems > 0) {
      shifted += this.remainingItems * -1 - numScroll * direction;
      this.isRemainingItemsAdded = true;
    }

    this.totalShiftedItems.set(shifted);
    this.currentPage.set(targetPage);
    this.syncTransform(true);
    this.pageChange.emit({ page: targetPage });
  }

  /** Apply the CSS transform (with or without transition) to the item list. */
  private syncTransform(animated: boolean): void {
    const container: ElementRef<HTMLElement> | undefined = this.itemsContainer();
    if (!container) {
      return;
    }
    const element: HTMLElement = container.nativeElement;
    element.style.transform = this.buildTransformValue(this.totalShiftedItems());
    element.style.transition = animated ? `transform ${CAROUSEL_TRANSITION_DURATION}ms ease` : '';
  }

  /** Build the translate3d string for the current shift value. */
  private buildTransformValue(shifted: number): string {
    const numVisible: number = this.activeNumVisible();
    const percentage: number = shifted * (100 / numVisible);
    return this.isVertical()
      ? `translate3d(0, ${percentage}%, 0)`
      : `translate3d(${percentage}%, 0, 0)`;
  }

  /** Populate clone arrays used for circular wrap-around visual. */
  private updateCloneItems(): void {
    const numVisible: number = this.activeNumVisible();
    const items: unknown[] = this.value();
    if (items.length >= numVisible) {
      this.clonedItemsForStarting = items.slice(-1 * numVisible);
      this.clonedItemsForFinishing = items.slice(0, numVisible);
    } else {
      this.clonedItemsForStarting = [];
      this.clonedItemsForFinishing = [];
    }
  }

  /** Apply the matching responsive option for the current window width. */
  private applyResponsiveOptions(): void {
    const options: CarouselResponsiveOption[] = [...this.responsiveOptions()].sort(
      (a: CarouselResponsiveOption, b: CarouselResponsiveOption): number =>
        parseInt(b.breakpoint, 10) - parseInt(a.breakpoint, 10)
    );

    let matchedNumVisible: number = this.numVisible();
    let matchedNumScroll: number = this.numScroll();

    if (typeof window !== 'undefined') {
      const windowWidth: number = window.innerWidth;
      for (const option of options) {
        if (parseInt(option.breakpoint, 10) >= windowWidth) {
          matchedNumVisible = option.numVisible;
          matchedNumScroll = option.numScroll;
        }
      }
    }

    if (this.activeNumVisible() !== matchedNumVisible) {
      this.responsiveNumVisible.set(matchedNumVisible);
      if (this.circular()) {
        this.updateCloneItems();
      }
      this.injectItemWidthStyle();
    }
    if (this.activeNumScroll() !== matchedNumScroll) {
      this.responsiveNumScroll.set(matchedNumScroll);
    }
  }

  /** Inject a <style> element to set flex-basis on carousel items (numVisible → %). */
  private injectItemWidthStyle(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!this.styleElement) {
      this.styleElement = this.renderer.createElement('style') as HTMLStyleElement;
      this.styleElement.type = 'text/css';
      this.renderer.appendChild(document.head, this.styleElement);
    }
    const numVisible: number = this.activeNumVisible();
    const options: CarouselResponsiveOption[] = this.responsiveOptions();
    let css: string = `#${this.componentId} .uilib-carousel-item { flex: 1 0 ${100 / numVisible}%; }`;

    for (const option of options) {
      css += ` @media screen and (max-width: ${option.breakpoint}) {
        #${this.componentId} .uilib-carousel-item { flex: 1 0 ${100 / option.numVisible}%; }
      }`;
    }
    this.styleElement.textContent = css;
  }

  /** Remove the injected style element on destroy. */
  private removeStyleElement(): void {
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }

  /** Start the autoplay timer (runs outside Angular zone to avoid CD overhead). */
  private startAutoplay(): void {
    this.zone.runOutsideAngular((): void => {
      this.autoplayTimerId = setInterval((): void => {
        this.zone.run((): void => {
          const page: number = this.currentPage();
          const dots: number = this.totalDots();
          if (dots <= 1) {
            return;
          }
          const nextPage: number = page >= dots - 1 ? 0 : page + 1;
          this.step(-1, nextPage);
        });
      }, this.autoplayInterval());
    });
    this.autoplayAllowed = true;
  }

  /** Stop the autoplay timer. */
  private stopAutoplay(): void {
    if (this.autoplayTimerId !== null) {
      clearInterval(this.autoplayTimerId);
      this.autoplayTimerId = null;
    }
    this.autoplayAllowed = false;
  }

  /** Bind a window resize listener for responsive option recalculation. */
  private bindResizeListener(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.zone.runOutsideAngular((): void => {
      this.resizeUnlisten = this.renderer.listen('window', 'resize', (): void => {
        this.zone.run((): void => {
          this.applyResponsiveOptions();
        });
      });
    });
  }

  /** Apply touch-based navigation after a swipe gesture. */
  private applyTouchNavigation(event: Event, delta: number): void {
    if (Math.abs(delta) > CAROUSEL_SWIPE_THRESHOLD) {
      if (delta < 0) {
        this.navigateForward(event);
      } else {
        this.navigateBackward(event);
      }
    }
  }

  /** Move focus to the next/previous indicator button. */
  private moveFocusedIndicator(direction: number): void {
    const container: ElementRef<HTMLElement> | undefined = this.indicatorContainer();
    if (!container) {
      return;
    }
    const buttons: NodeListOf<HTMLButtonElement> =
      container.nativeElement.querySelectorAll<HTMLButtonElement>('button');
    const currentIndex: number = Array.from(buttons).findIndex(
      (button: HTMLButtonElement): boolean => button === document.activeElement
    );
    if (currentIndex === -1) {
      return;
    }
    let nextIndex: number;
    if (direction === -Infinity) {
      nextIndex = 0;
    } else if (direction === Infinity) {
      nextIndex = buttons.length - 1;
    } else {
      nextIndex = Math.max(0, Math.min(buttons.length - 1, currentIndex + direction));
    }
    buttons[nextIndex]?.focus();
  }

  /** Unbind the window resize listener. */
  private unbindResizeListener(): void {
    if (this.resizeUnlisten) {
      this.resizeUnlisten();
      this.resizeUnlisten = null;
    }
  }
}
