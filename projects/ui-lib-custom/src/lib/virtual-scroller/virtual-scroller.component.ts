import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChild,
  inject,
  input,
  NgZone,
  output,
  PLATFORM_ID,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import type {
  AfterViewChecked,
  AfterViewInit,
  InputSignal,
  OnDestroy,
  OnInit,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import type {
  VirtualScrollerContentOptions,
  VirtualScrollerItemOptions,
  VirtualScrollerLazyLoadEvent,
  VirtualScrollerLoaderOptions,
  VirtualScrollerOrientation,
  VirtualScrollerScrollEvent,
  VirtualScrollerScrollIndexChangeEvent,
  VirtualScrollerToType,
} from './virtual-scroller.types';
import {
  ScrollerContentDirective,
  ScrollerItemDirective,
  ScrollerLoaderDirective,
  ScrollerLoaderIconDirective,
} from './virtual-scroller.directives';

/** Internal type for first/last index — scalar for 1-D, object for 2-D ('both'). */
type GridIndex = { rows: number; cols: number };
type FirstLastIndex = number | GridIndex;
type ScrollPosition = number | { top: number; left: number };
type VoidListener = (() => void) | null;

/** Monotonic counter for generating unique element IDs. */
let virtualScrollerIdCounter: number = 0;

/**
 * VirtualScroller renders only the items currently visible in the viewport
 * plus a configurable tolerance buffer, using CSS transforms to position the
 * content and an invisible spacer to maintain the full scroll height.
 *
 * Supports vertical, horizontal, and 2-D ('both') orientations; lazy loading;
 * external loading state; and fully custom item, content, and loader templates.
 *
 * @example
 * ```html
 * <ui-lib-virtual-scroller [items]="items" [itemSize]="50" scrollHeight="400px">
 *   <ng-template uiScrollerItem let-item>
 *     <div class="item">{{ item.label }}</div>
 *   </ng-template>
 * </ui-lib-virtual-scroller>
 * ```
 */
@Component({
  selector: 'ui-lib-virtual-scroller',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './virtual-scroller.component.html',
  styleUrl: './virtual-scroller.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class VirtualScrollerComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  // ---------------------------------------------------------------------------
  // DI
  // ---------------------------------------------------------------------------

  private readonly zone: NgZone = inject(NgZone);
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly platformId: object = inject(PLATFORM_ID);

  // ---------------------------------------------------------------------------
  // Inputs
  // ---------------------------------------------------------------------------

  /** Unique HTML id applied to the viewport element. */
  public readonly id: InputSignal<string> = input<string>(
    `uilib-scroller-${(++virtualScrollerIdCounter).toString()}`
  );

  /** Additional CSS class(es) applied to the host element. */
  public readonly styleClass: InputSignal<string> = input<string>('');

  /** The full array of items to virtualize. */
  public readonly items: InputSignal<unknown[] | null | undefined> = input<
    unknown[] | null | undefined
  >(null);

  /** Fixed height per row (vertical), width (horizontal), or [rowHeight, colWidth] (both) in px. */
  public readonly itemSize: InputSignal<number | [number, number]> = input<
    number | [number, number]
  >(0);

  /** CSS height of the scroll viewport (e.g. '400px', '100%'). */
  public readonly scrollHeight: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** CSS width of the scroll viewport. Only relevant for horizontal/both orientations. */
  public readonly scrollWidth: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Scroll direction. */
  public readonly orientation: InputSignal<VirtualScrollerOrientation> =
    input<VirtualScrollerOrientation>('vertical');

  /** Number of items per lazy-load page. 0 disables stepped paging. */
  public readonly step: InputSignal<number> = input<number>(0);

  /** Throttle delay in ms between scroll events being processed. 0 = no throttle. */
  public readonly delay: InputSignal<number> = input<number>(0);

  /** Debounce in ms after a window resize before re-initializing. */
  public readonly resizeDelay: InputSignal<number> = input<number>(10);

  /** When true, newly loaded items are appended without removing older DOM nodes. */
  public readonly appendOnly: InputSignal<boolean> = input<boolean>(false);

  /** When true, the viewport fits inline within its containing flow (no fixed height). */
  public readonly inline: InputSignal<boolean> = input<boolean>(false);

  /** Enable lazy loading. Emits lazyLoad when the visible range changes. */
  public readonly lazy: InputSignal<boolean> = input<boolean>(false);

  /** Disable virtualization — all items are rendered directly. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Suppress the built-in loader overlay; provide your own via the loader template. */
  public readonly loaderDisabled: InputSignal<boolean> = input<boolean>(false);

  /** Column data array used with 'horizontal' or 'both' orientations. */
  public readonly columns: InputSignal<unknown[] | null | undefined> = input<
    unknown[] | null | undefined
  >(null);

  /** Whether to render the spacer element that creates the virtual scroll height. */
  public readonly showSpacer: InputSignal<boolean> = input<boolean>(true);

  /** Whether to show a loading overlay when loading is true. */
  public readonly showLoader: InputSignal<boolean> = input<boolean>(false);

  /** Override the number of off-screen tolerated items rendered on each side. */
  public readonly numToleratedItems: InputSignal<number | undefined> = input<number | undefined>(
    undefined
  );

  /** External loading flag combined with lazy to control the loading overlay. */
  public readonly loading: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined);

  /** TrackBy function forwarded to the @for item loop. Receives (absoluteIndex, item). */
  public readonly trackByFn: InputSignal<((index: number, item: unknown) => unknown) | undefined> =
    input<((index: number, item: unknown) => unknown) | undefined>(undefined);

  /** Tab index on the viewport element. */
  public readonly tabIndex: InputSignal<number> = input<number>(0);

  /**
   * Total number of records available on the server.
   * Used in lazy-loading mode to pre-size the virtual spacer so the
   * scrollbar reflects the full dataset even when only a page is loaded.
   * When omitted, `items.length` is used instead.
   */
  public readonly totalRecords: InputSignal<number | undefined> = input<number | undefined>(
    undefined
  );

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Fires when the visible range changes in lazy mode. */
  public readonly lazyLoad: OutputEmitterRef<VirtualScrollerLazyLoadEvent> =
    output<VirtualScrollerLazyLoadEvent>();

  /** Fires on every scroll event. */
  public readonly scroll: OutputEmitterRef<VirtualScrollerScrollEvent> =
    output<VirtualScrollerScrollEvent>();

  /** Fires when the first/last rendered index changes. */
  public readonly scrollIndexChange: OutputEmitterRef<VirtualScrollerScrollIndexChangeEvent> =
    output<VirtualScrollerScrollIndexChangeEvent>();

  // ---------------------------------------------------------------------------
  // Content templates
  // ---------------------------------------------------------------------------

  /** @internal Item row template. Use `uiScrollerItem` directive. */
  protected readonly itemTpl: Signal<TemplateRef<unknown> | undefined> = contentChild(
    ScrollerItemDirective,
    { read: TemplateRef }
  );

  /** @internal Full content override template. Use `uiScrollerContent` directive. */
  protected readonly contentTpl: Signal<TemplateRef<unknown> | undefined> = contentChild(
    ScrollerContentDirective,
    { read: TemplateRef }
  );

  /** @internal Custom loader template. Use `uiScrollerLoader` directive. */
  protected readonly loaderTpl: Signal<TemplateRef<unknown> | undefined> = contentChild(
    ScrollerLoaderDirective,
    { read: TemplateRef }
  );

  /** @internal Custom loader icon template. Use `uiScrollerLoaderIcon` directive. */
  protected readonly loaderIconTpl: Signal<TemplateRef<unknown> | undefined> = contentChild(
    ScrollerLoaderIconDirective,
    { read: TemplateRef }
  );

  // ---------------------------------------------------------------------------
  // View refs
  // ---------------------------------------------------------------------------

  private readonly scrollerElementRef: () => ElementRef<HTMLElement> | undefined = viewChild(
    'scrollerEl',
    { read: ElementRef }
  ) as () => ElementRef<HTMLElement> | undefined;

  private readonly contentElementRef: () => ElementRef<HTMLElement> | undefined = viewChild(
    'contentEl',
    { read: ElementRef }
  ) as () => ElementRef<HTMLElement> | undefined;

  // ---------------------------------------------------------------------------
  // Reactive state (drives template)
  // ---------------------------------------------------------------------------

  /** @internal Whether the scroller is currently showing a loading state. */
  protected readonly internalLoading: WritableSignal<boolean> = signal(false);

  /** @internal Array used to render skeleton loader rows. */
  protected readonly loaderArr: WritableSignal<unknown[]> = signal([]);

  /** @internal CSS style for the spacer element (sets the virtual total height/width). */
  protected readonly spacerStyle: WritableSignal<Record<string, string>> = signal({});

  /** @internal CSS style for the content element (translate3d positioning). */
  protected readonly contentStyle: WritableSignal<Record<string, string>> = signal({});

  /**
   * @internal Incremented whenever the rendered range changes.
   * Computed signals that depend on first/last subscribe to this to force recomputation.
   */
  private readonly rangeVersion: WritableSignal<number> = signal(0);

  // ---------------------------------------------------------------------------
  // Algorithmic state (not reactive — updated on every scroll tick)
  // ---------------------------------------------------------------------------

  private first: FirstLastIndex = 0;
  private last: FirstLastIndex = 0;
  private page: number = 0;
  private numItemsInViewport: FirstLastIndex = 0;
  private internalNumToleratedItems: number | [number, number] | undefined = undefined;
  private lastScrollPos: ScrollPosition = 0;
  private lazyLoadState: VirtualScrollerLazyLoadEvent = { first: 0, last: 0 };
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  private windowResizeListener: VoidListener = null;
  private scrollListener: VoidListener = null;
  private defaultWidth: number | undefined = undefined;
  private defaultHeight: number | undefined = undefined;
  private defaultContentWidth: number | undefined = undefined;
  private defaultContentHeight: number | undefined = undefined;
  private initialized: boolean = false;
  private contentElement: HTMLElement | null = null;

  // ---------------------------------------------------------------------------
  // Computed — orientation helpers and host classes
  // ---------------------------------------------------------------------------

  /** @internal */
  protected readonly isVertical: Signal<boolean> = computed(
    (): boolean => this.orientation() === 'vertical'
  );

  /** @internal */
  protected readonly isHorizontal: Signal<boolean> = computed(
    (): boolean => this.orientation() === 'horizontal'
  );

  /** @internal */
  protected readonly isBoth: Signal<boolean> = computed(
    (): boolean => this.orientation() === 'both'
  );

  /** @internal Host CSS classes. */
  protected readonly hostClasses: Signal<string> = computed((): string => {
    const parts: string[] = ['uilib-scroller'];
    if (this.inline()) parts.push('uilib-scroller-inline');
    if (this.isHorizontal()) parts.push('uilib-scroller-horizontal');
    if (this.isBoth()) parts.push('uilib-scroller-both');
    if (this.styleClass()) parts.push(this.styleClass());
    return parts.join(' ');
  });

  /** @internal Items slice currently rendered in the DOM. */
  protected readonly loadedItems: Signal<unknown[]> = computed((): unknown[] => {
    // rangeVersion dependency forces recomputation when first/last change.
    void this.rangeVersion();
    const items: unknown[] | null | undefined = this.items();
    if (!items || this.internalLoading()) return [];

    if (this.isBoth()) {
      const firstGrid: GridIndex = this.first as GridIndex;
      const lastGrid: GridIndex = this.last as GridIndex;
      const appendOnly: boolean = this.appendOnly();
      return (items as unknown[][])
        .slice(appendOnly ? 0 : firstGrid.rows, lastGrid.rows)
        .map((row: unknown[]): unknown[] =>
          this.columns() ? row : row.slice(appendOnly ? 0 : firstGrid.cols, lastGrid.cols)
        );
    } else if (this.isHorizontal() && this.columns()) {
      return items;
    } else {
      const appendOnly: boolean = this.appendOnly();
      return items.slice(appendOnly ? 0 : (this.first as number), this.last as number);
    }
  });

  /** @internal Row items passed to the item template loop. */
  protected readonly loadedRows: Signal<unknown[]> = computed((): unknown[] => {
    void this.rangeVersion();
    if (this.internalLoading()) {
      return this.loaderDisabled() ? this.loaderArr() : [];
    }
    return this.loadedItems();
  });

  /** @internal Column items passed to the content template. */
  protected readonly loadedColumns: Signal<unknown[] | null | undefined> = computed(
    (): unknown[] | null | undefined => {
      void this.rangeVersion();
      const cols: unknown[] | null | undefined = this.columns();
      const both: boolean = this.isBoth();
      const horizontal: boolean = this.isHorizontal();
      if (cols && (both || horizontal)) {
        if (this.internalLoading() && this.loaderDisabled()) {
          const arr: unknown[][] = this.loaderArr() as unknown[][];
          return both ? arr[0] : (this.loaderArr() as unknown[]);
        }
        if (both) {
          return cols.slice((this.first as GridIndex).cols, (this.last as GridIndex).cols);
        }
        return cols.slice(this.first as number, this.last as number);
      }
      return cols;
    }
  );

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  public ngOnInit(): void {
    this.setInitialState();
  }

  public ngAfterViewInit(): void {
    void Promise.resolve().then((): void => {
      this.viewInit();
    });
  }

  public ngAfterViewChecked(): void {
    if (!this.initialized) {
      this.viewInit();
    }
  }

  public ngOnDestroy(): void {
    this.unbindResizeListener();
    this.unbindScrollListener();
    if (this.scrollTimeout !== null) clearTimeout(this.scrollTimeout);
    if (this.resizeTimeout !== null) clearTimeout(this.resizeTimeout);
    this.contentElement = null;
    this.initialized = false;
  }

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------

  private viewInit(): void {
    if (!isPlatformBrowser(this.platformId) || this.initialized) return;
    const element: HTMLElement | undefined = this.scrollerElementRef()?.nativeElement;
    if (!element || !this.isElementVisible(element)) return;

    this.setInitialState();
    this.resolveContentElement();
    this.init();

    this.defaultWidth = element.offsetWidth;
    this.defaultHeight = element.offsetHeight;
    this.defaultContentWidth = this.contentElement?.offsetWidth ?? 0;
    this.defaultContentHeight = this.contentElement?.offsetHeight ?? 0;
    this.initialized = true;
    this.bindScrollListener();
  }

  private init(): void {
    if (this.disabled()) return;
    this.setSize();
    this.calculateOptions();
    this.setSpacerSize();
    this.bindResizeListener();
    this.changeDetectorRef.markForCheck();
  }

  private setInitialState(): void {
    const both: boolean = this.isBoth();
    this.first = both ? { rows: 0, cols: 0 } : 0;
    this.last = both ? { rows: 0, cols: 0 } : 0;
    this.numItemsInViewport = both ? { rows: 0, cols: 0 } : 0;
    this.lastScrollPos = both ? { top: 0, left: 0 } : 0;
    this.internalLoading.set(this.loading() ?? false);
    this.internalNumToleratedItems = this.numToleratedItems();
    this.loaderArr.set([]);
    this.page = 0;
  }

  private resolveContentElement(element?: HTMLElement): void {
    this.contentElement =
      element ??
      this.contentElementRef()?.nativeElement ??
      this.scrollerElementRef()?.nativeElement.querySelector<HTMLElement>(
        '.uilib-scroller-content'
      ) ??
      null;
  }

  // ---------------------------------------------------------------------------
  // Size & position
  // ---------------------------------------------------------------------------

  private setSize(): void {
    const element: HTMLElement | undefined = this.scrollerElementRef()?.nativeElement;
    if (!element) return;

    const parentElement: HTMLElement | null = element.parentElement
      ? element.parentElement.parentElement
      : null;
    const scrollHeight: string | undefined = this.scrollHeight();
    const scrollWidth: string | undefined = this.scrollWidth();
    const width: string =
      scrollWidth ?? `${(element.offsetWidth || (parentElement?.offsetWidth ?? 0)).toString()}px`;
    const height: string =
      scrollHeight ??
      `${(element.offsetHeight || (parentElement?.offsetHeight ?? 0)).toString()}px`;

    if (this.isBoth() || this.isHorizontal()) {
      element.style.height = height;
      element.style.width = width;
    } else {
      element.style.height = height;
    }
  }

  private setSpacerSize(): void {
    const items: unknown[] | null | undefined = this.items();
    if (!items) return;

    const contentPos: {
      left: number;
      right: number;
      top: number;
      bottom: number;
      x: number;
      y: number;
    } = this.getContentPosition();
    const itemSize: number | [number, number] = this.itemSize();
    const cols: unknown[] | null | undefined = this.columns();
    const newStyle: Record<string, string> = {};

    // In lazy mode, use totalRecords for the spacer when provided so the
    // scrollbar reflects the full server-side dataset size.
    const resolvedLength: number = this.totalRecords() ?? items.length;

    if (this.isBoth()) {
      const sizeArr: [number, number] = itemSize as [number, number];
      newStyle['height'] = `${resolvedLength * sizeArr[0] + contentPos.y}px`;
      newStyle['width'] =
        `${(cols ?? (items[0] as unknown[])).length * sizeArr[1] + contentPos.x}px`;
    } else if (this.isHorizontal()) {
      const list: unknown[] = cols ?? items;
      newStyle['width'] = `${list.length * (itemSize as number) + contentPos.x}px`;
    } else {
      newStyle['height'] = `${resolvedLength * (itemSize as number) + contentPos.y}px`;
    }

    this.spacerStyle.set(newStyle);
  }

  private setContentPosition(position?: { first: FirstLastIndex }): void {
    if (!this.contentElement || this.appendOnly()) return;

    const first: FirstLastIndex = position ? position.first : this.first;
    const itemSize: number | [number, number] = this.itemSize();

    let transform: string;
    if (this.isBoth()) {
      const gridFirst: GridIndex = first as GridIndex;
      const sizeArr: [number, number] = itemSize as [number, number];
      transform = `translate3d(${gridFirst.cols * sizeArr[1]}px, ${gridFirst.rows * sizeArr[0]}px, 0)`;
    } else {
      const value: number = (first as number) * (itemSize as number);
      transform = this.isHorizontal()
        ? `translate3d(${value}px, 0, 0)`
        : `translate3d(0, ${value}px, 0)`;
    }

    this.contentStyle.set({ ...this.contentStyle(), transform });
  }

  private getContentPosition(): {
    left: number;
    right: number;
    top: number;
    bottom: number;
    x: number;
    y: number;
  } {
    if (!this.contentElement) {
      return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    }
    const style: CSSStyleDeclaration = getComputedStyle(this.contentElement);
    const left: number = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
    const right: number =
      parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
    const top: number = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
    const bottom: number =
      parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
    return { left, right, top, bottom, x: left + right, y: top + bottom };
  }

  // ---------------------------------------------------------------------------
  // Virtual window calculation
  // ---------------------------------------------------------------------------

  private calculateOptions(): void {
    const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
    const both: boolean = this.isBoth();

    let last: FirstLastIndex;
    if (both) {
      const firstGrid: GridIndex = this.first as GridIndex;
      const numInViewGrid: GridIndex = numItemsInViewport as GridIndex;
      const numTolArr: [number, number] = numToleratedItems as [number, number];
      last = {
        rows: this.calcLast(firstGrid.rows, numInViewGrid.rows, numTolArr[0]),
        cols: this.calcLast(firstGrid.cols, numInViewGrid.cols, numTolArr[1], true),
      };
    } else {
      last = this.calcLast(
        this.first as number,
        numItemsInViewport as number,
        numToleratedItems as number
      );
    }

    this.last = last;
    this.numItemsInViewport = numItemsInViewport;
    this.internalNumToleratedItems = numToleratedItems;

    if (this.showLoader()) {
      const loaderItems: unknown[] = both
        ? Array.from(
            { length: (numItemsInViewport as GridIndex).rows },
            (): unknown[] =>
              Array.from({ length: (numItemsInViewport as GridIndex).cols }) as unknown[]
          )
        : Array.from({ length: numItemsInViewport as number });
      this.loaderArr.set(loaderItems);
    }

    if (this.lazy()) {
      const items: unknown[] | null | undefined = this.items();
      const itemCount: number = items?.length ?? 0;
      const step: number = this.step();
      const lazyEvent: VirtualScrollerLazyLoadEvent = {
        first: step
          ? Math.min(this.getPageByFirst() * step, Math.max(0, itemCount - step))
          : (this.first as number),
        last: Math.min(step ? step : (last as number), itemCount),
      };
      void Promise.resolve().then((): void => {
        this.lazyLoadState = lazyEvent;
        this.lazyLoad.emit(lazyEvent);
      });
    }

    this.rangeVersion.update((version: number): number => version + 1);
  }

  private calculateNumItems(): {
    numItemsInViewport: FirstLastIndex;
    numToleratedItems: number | [number, number];
  } {
    const contentPos: {
      left: number;
      right: number;
      top: number;
      bottom: number;
      x: number;
      y: number;
    } = this.getContentPosition();
    const element: HTMLElement | undefined = this.scrollerElementRef()?.nativeElement;
    const contentWidth: number = element ? Math.max(0, element.offsetWidth - contentPos.left) : 0;
    const contentHeight: number = element ? Math.max(0, element.offsetHeight - contentPos.top) : 0;
    const itemSize: number | [number, number] = this.itemSize();
    const both: boolean = this.isBoth();

    let numItemsInViewport: FirstLastIndex;
    let numToleratedItems: number | [number, number];

    if (both) {
      const sizeArr: [number, number] = itemSize as [number, number];
      const rowsInView: number = this.calcNumInViewport(contentHeight, sizeArr[0]);
      const colsInView: number = this.calcNumInViewport(contentWidth, sizeArr[1]);
      numItemsInViewport = { rows: rowsInView, cols: colsInView };
      numToleratedItems =
        this.internalNumToleratedItems !== undefined
          ? (this.internalNumToleratedItems as [number, number])
          : [Math.ceil(rowsInView / 2), Math.ceil(colsInView / 2)];
    } else {
      const size: number = itemSize as number;
      numItemsInViewport = this.calcNumInViewport(
        this.isHorizontal() ? contentWidth : contentHeight,
        size
      );
      numToleratedItems =
        this.internalNumToleratedItems !== undefined
          ? (this.internalNumToleratedItems as number)
          : Math.ceil((numItemsInViewport as number) / 2);
    }

    return { numItemsInViewport, numToleratedItems };
  }

  /** @internal Calculate how many items fit in a given content size. */
  private calcNumInViewport(contentSize: number, itemSizeValue: number): number {
    return itemSizeValue || contentSize
      ? Math.ceil(contentSize / (itemSizeValue || contentSize))
      : 0;
  }

  /** @internal Clamp `last` to the actual item count. */
  private getLast(last: number = 0, isCols: boolean = false): number {
    const items: unknown[] | null | undefined = this.items();
    if (!items) return 0;
    const cols: unknown[] | null | undefined = this.columns();
    return Math.min(isCols ? (cols ?? (items[0] as unknown[])).length : items.length, last);
  }

  /** @internal Calculate the 'last' index for the visible window. */
  private calcLast(
    first: number,
    numInView: number,
    numTol: number,
    isCols: boolean = false
  ): number {
    return this.getLast(first + numInView + (first < numTol ? 2 : 3) * numTol, isCols);
  }

  private getPageByFirst(first?: FirstLastIndex): number {
    const resolvedFirst: FirstLastIndex = first ?? this.first;
    const numTol: number | [number, number] | undefined = this.internalNumToleratedItems;
    const numTolValue: number = Array.isArray(numTol) ? numTol[0] : (numTol ?? 0);
    const step: number = this.step();
    return Math.floor(((resolvedFirst as number) + numTolValue * 4) / (step || 1));
  }

  private isPageChanged(first?: FirstLastIndex): boolean {
    return this.step() ? this.page !== this.getPageByFirst(first ?? this.first) : true;
  }

  // ---------------------------------------------------------------------------
  // Scroll processing
  // ---------------------------------------------------------------------------

  private onScrollPositionChange(event: Event): {
    first: FirstLastIndex;
    last: FirstLastIndex;
    isRangeChanged: boolean;
    scrollPos: ScrollPosition;
  } {
    const target: HTMLElement = event.target as HTMLElement;
    const contentPos: {
      left: number;
      right: number;
      top: number;
      bottom: number;
      x: number;
      y: number;
    } = this.getContentPosition();
    const itemSize: number | [number, number] = this.itemSize();
    const both: boolean = this.isBoth();
    const horizontal: boolean = this.isHorizontal();
    const numTol: number | [number, number] | undefined = this.internalNumToleratedItems;

    const scrollTop: number = this.calcScrollOffset(target.scrollTop, contentPos.top);
    const scrollLeft: number = this.calcScrollOffset(target.scrollLeft, contentPos.left);

    let newFirst: FirstLastIndex = both ? { rows: 0, cols: 0 } : 0;
    let newLast: FirstLastIndex = this.last;
    let isRangeChanged: boolean = false;
    let newScrollPos: ScrollPosition = this.lastScrollPos;

    if (both) {
      const numTolArr: [number, number] = (numTol ?? [0, 0]) as [number, number];
      const numViewGrid: GridIndex = this.numItemsInViewport as GridIndex;
      const firstGrid: GridIndex = this.first as GridIndex;
      const lastGrid: GridIndex = this.last as GridIndex;
      const sizeArr: [number, number] = itemSize as [number, number];
      const isScrollDown: boolean =
        (this.lastScrollPos as { top: number; left: number }).top <= scrollTop;
      const isScrollRight: boolean =
        (this.lastScrollPos as { top: number; left: number }).left <= scrollLeft;

      if (!this.appendOnly() || (this.appendOnly() && (isScrollDown || isScrollRight))) {
        const currentRowIndex: number = this.calcCurrentIndex(scrollTop, sizeArr[0]);
        const currentColIndex: number = this.calcCurrentIndex(scrollLeft, sizeArr[1]);
        const triggerRowIndex: number = this.calcTriggerIndex(
          currentRowIndex,
          firstGrid.rows,
          lastGrid.rows,
          numViewGrid.rows,
          numTolArr[0],
          isScrollDown
        );
        const triggerColIndex: number = this.calcTriggerIndex(
          currentColIndex,
          firstGrid.cols,
          lastGrid.cols,
          numViewGrid.cols,
          numTolArr[1],
          isScrollRight
        );
        const newFirstRows: number = this.calcFirstFromScroll(
          currentRowIndex,
          triggerRowIndex,
          firstGrid.rows,
          numViewGrid.rows,
          numTolArr[0],
          isScrollDown
        );
        const newFirstCols: number = this.calcFirstFromScroll(
          currentColIndex,
          triggerColIndex,
          firstGrid.cols,
          numViewGrid.cols,
          numTolArr[1],
          isScrollRight
        );
        newFirst = { rows: newFirstRows, cols: newFirstCols };
        const newLastRows: number = this.calcLastFromScroll(
          currentRowIndex,
          newFirstRows,
          numViewGrid.rows,
          numTolArr[0]
        );
        const newLastCols: number = this.calcLastFromScroll(
          currentColIndex,
          newFirstCols,
          numViewGrid.cols,
          numTolArr[1],
          true
        );
        newLast = { rows: newLastRows, cols: newLastCols };
        const newFirstGrid: GridIndex = newFirst as GridIndex;
        const newLastGrid: GridIndex = newLast as GridIndex;
        isRangeChanged =
          newFirstGrid.rows !== firstGrid.rows ||
          newLastGrid.rows !== lastGrid.rows ||
          newFirstGrid.cols !== firstGrid.cols ||
          newLastGrid.cols !== lastGrid.cols;
        newScrollPos = { top: scrollTop, left: scrollLeft };
      }
    } else {
      const scrollPos: number = horizontal ? scrollLeft : scrollTop;
      const isScrollDownOrRight: boolean = (this.lastScrollPos as number) <= scrollPos;

      if (!this.appendOnly() || (this.appendOnly() && isScrollDownOrRight)) {
        const size: number = itemSize as number;
        const numT: number = (numTol ?? 0) as number;
        const numInView: number = this.numItemsInViewport as number;
        const firstNum: number = this.first as number;
        const lastNum: number = this.last as number;

        const currentIndex: number = this.calcCurrentIndex(scrollPos, size);
        const triggerIndex: number = this.calcTriggerIndex(
          currentIndex,
          firstNum,
          lastNum,
          numInView,
          numT,
          isScrollDownOrRight
        );
        const newFirstNum: number = this.calcFirstFromScroll(
          currentIndex,
          triggerIndex,
          firstNum,
          numInView,
          numT,
          isScrollDownOrRight
        );
        const newLastNum: number = this.calcLastFromScroll(
          currentIndex,
          newFirstNum,
          numInView,
          numT
        );
        newFirst = newFirstNum;
        newLast = newLastNum;
        isRangeChanged = newFirstNum !== firstNum || newLastNum !== lastNum;
        newScrollPos = scrollPos;
      }
    }

    return { first: newFirst, last: newLast, isRangeChanged, scrollPos: newScrollPos };
  }

  private onScrollChange(event: Event): void {
    const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
    if (!isRangeChanged) return;

    const newState: VirtualScrollerScrollIndexChangeEvent = { first, last };
    this.setContentPosition(newState as { first: FirstLastIndex });
    this.first = first;
    this.last = last;
    this.lastScrollPos = scrollPos;
    this.scrollIndexChange.emit(newState);

    if (this.lazy() && this.isPageChanged(first)) {
      const items: unknown[] | null | undefined = this.items();
      const itemCount: number = items?.length ?? 0;
      const step: number = this.step();
      const lazyFirst: number = step
        ? Math.min(this.getPageByFirst(first) * step, itemCount - step)
        : (first as number);
      const lazyLast: number = Math.min(
        step ? (this.getPageByFirst(first) + 1) * step : (last as number),
        itemCount
      );
      const lazyEvent: VirtualScrollerLazyLoadEvent = { first: lazyFirst, last: lazyLast };
      if (
        this.lazyLoadState.first !== lazyEvent.first ||
        this.lazyLoadState.last !== lazyEvent.last
      ) {
        this.lazyLoad.emit(lazyEvent);
      }
      this.lazyLoadState = lazyEvent;
    }

    this.rangeVersion.update((version: number): number => version + 1);
    this.changeDetectorRef.markForCheck();
  }

  /** @internal Scroll event handler — runs inside Angular zone. */
  protected onContainerScroll(event: Event): void {
    this.scroll.emit({ originalEvent: event });

    const delay: number = this.delay();
    if (delay && this.isPageChanged()) {
      if (this.scrollTimeout !== null) clearTimeout(this.scrollTimeout);

      if (!this.internalLoading() && this.showLoader()) {
        const { isRangeChanged } = this.onScrollPositionChange(event);
        const changed: boolean = isRangeChanged || (this.step() ? this.isPageChanged() : false);
        if (changed) {
          this.internalLoading.set(true);
          this.changeDetectorRef.markForCheck();
        }
      }

      this.scrollTimeout = setTimeout((): void => {
        this.onScrollChange(event);
        if (
          this.internalLoading() &&
          this.showLoader() &&
          (!this.lazy() || this.loading() === undefined)
        ) {
          this.internalLoading.set(false);
          this.page = this.getPageByFirst();
        }
        this.changeDetectorRef.markForCheck();
      }, delay);
    } else if (!this.internalLoading()) {
      this.onScrollChange(event);
    }
  }

  // ---------------------------------------------------------------------------
  // Scroll math helpers (extracted to avoid typedef issues with inline functions)
  // ---------------------------------------------------------------------------

  /** @internal Scroll offset adjusted for content padding. */
  private calcScrollOffset(rawPos: number, contentOffset: number): number {
    return rawPos ? (rawPos > contentOffset ? rawPos - contentOffset : rawPos) : 0;
  }

  /** @internal Index of the item at scroll position `pos`. */
  private calcCurrentIndex(pos: number, size: number): number {
    return size || pos ? Math.floor(pos / (size || pos)) : 0;
  }

  /**
   * @internal Index at which the rendered window should shift.
   * If the current scroll index crosses this threshold a re-render is triggered.
   */
  private calcTriggerIndex(
    currentIndex: number,
    first: number,
    last: number,
    numInView: number,
    numTol: number,
    isForward: boolean
  ): number {
    return currentIndex <= numTol
      ? numTol
      : isForward
        ? last - numInView - numTol
        : first + numTol - 1;
  }

  /** @internal New `first` index after a scroll update. */
  private calcFirstFromScroll(
    currentIndex: number,
    triggerIndex: number,
    currentFirst: number,
    numInView: number,
    numTol: number,
    isForward: boolean
  ): number {
    if (currentIndex <= numTol) return 0;
    return Math.max(
      0,
      isForward
        ? currentIndex < triggerIndex
          ? currentFirst
          : currentIndex - numTol
        : currentIndex > triggerIndex
          ? currentFirst
          : currentIndex - 2 * numTol
    );
  }

  /** @internal New `last` index after a scroll update. */
  private calcLastFromScroll(
    currentIndex: number,
    newFirst: number,
    numInView: number,
    numTol: number,
    isCols: boolean = false
  ): number {
    let lastValue: number = newFirst + numInView + 2 * numTol;
    if (currentIndex >= numTol) lastValue += numTol + 1;
    return this.getLast(lastValue, isCols);
  }

  // ---------------------------------------------------------------------------
  // Resize handling
  // ---------------------------------------------------------------------------

  private bindResizeListener(): void {
    if (!isPlatformBrowser(this.platformId) || this.windowResizeListener !== null) return;

    this.zone.runOutsideAngular((): void => {
      const eventName: string = this.isTouchDevice() ? 'orientationchange' : 'resize';
      const handler: () => void = this.onWindowResize.bind(this) as () => void;
      window.addEventListener(eventName, handler);
      this.windowResizeListener = (): void => window.removeEventListener(eventName, handler);
    });
  }

  private unbindResizeListener(): void {
    this.windowResizeListener?.();
    this.windowResizeListener = null;
  }

  private bindScrollListener(): void {
    const element: HTMLElement | undefined = this.scrollerElementRef()?.nativeElement;
    if (!element || this.scrollListener !== null) return;

    // Run outside Angular zone so each scroll pixel does not trigger change detection.
    // We call zone.run() only when the rendered range actually changes.
    this.zone.runOutsideAngular((): void => {
      const handler: (event: Event) => void = (event: Event): void => {
        this.zone.run((): void => {
          this.onContainerScroll(event);
        });
      };
      element.addEventListener('scroll', handler, { passive: true });
      this.scrollListener = (): void => element.removeEventListener('scroll', handler);
    });
  }

  private unbindScrollListener(): void {
    this.scrollListener?.();
    this.scrollListener = null;
  }

  /** Returns true when the current device supports touch events. */
  private isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  /** Returns true when the element occupies space in the document layout. */
  private isElementVisible(element: HTMLElement): boolean {
    return element.offsetParent !== null || element.offsetWidth > 0 || element.offsetHeight > 0;
  }

  private onWindowResize(): void {
    if (this.resizeTimeout !== null) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout((): void => {
      const element: HTMLElement | undefined = this.scrollerElementRef()?.nativeElement;
      if (!element || !this.isElementVisible(element)) return;

      const width: number = element.offsetWidth;
      const height: number = element.offsetHeight;
      const isDiffWidth: boolean = width !== this.defaultWidth;
      const isDiffHeight: boolean = height !== this.defaultHeight;
      const both: boolean = this.isBoth();
      const horizontal: boolean = this.isHorizontal();
      const vertical: boolean = this.isVertical();
      const shouldReinit: boolean = both
        ? isDiffWidth || isDiffHeight
        : horizontal
          ? isDiffWidth
          : vertical
            ? isDiffHeight
            : false;

      if (shouldReinit) {
        this.zone.run((): void => {
          this.internalNumToleratedItems = this.numToleratedItems();
          this.defaultWidth = width;
          this.defaultHeight = height;
          this.defaultContentWidth = this.contentElement?.offsetWidth ?? 0;
          this.defaultContentHeight = this.contentElement?.offsetHeight ?? 0;
          this.init();
        });
      }
    }, this.resizeDelay());
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /** Scroll the viewport to an arbitrary position. */
  public scrollTo(options: ScrollToOptions): void {
    this.scrollerElementRef()?.nativeElement.scrollTo(options);
  }

  /** Scroll so that the item at `index` becomes visible. */
  public scrollToIndex(index: number | [number, number], behavior: ScrollBehavior = 'auto'): void {
    const both: boolean = this.isBoth();
    const isValid: boolean = both
      ? (index as [number, number]).every((value: number): boolean => value > -1)
      : (index as number) > -1;

    if (!isValid) return;

    const { numToleratedItems } = this.calculateNumItems();
    const contentPos: {
      left: number;
      right: number;
      top: number;
      bottom: number;
      x: number;
      y: number;
    } = this.getContentPosition();
    const itemSize: number | [number, number] = this.itemSize();

    if (both) {
      const indexArr: [number, number] = index as [number, number];
      const numTolArr: [number, number] = numToleratedItems as [number, number];
      const sizeArr: [number, number] = itemSize as [number, number];
      const newFirstRows: number = indexArr[0] <= numTolArr[0] ? 0 : indexArr[0];
      const newFirstCols: number = indexArr[1] <= numTolArr[1] ? 0 : indexArr[1];
      this.scrollTo({
        left: newFirstCols * sizeArr[1] + contentPos.left,
        top: newFirstRows * sizeArr[0] + contentPos.top,
        behavior,
      });
    } else if (this.isHorizontal()) {
      const idx: number = index as number;
      const numTol: number = numToleratedItems as number;
      const size: number = itemSize as number;
      const newFirst: number = idx <= numTol ? 0 : idx;
      this.scrollTo({ left: newFirst * size + contentPos.left, behavior });
    } else {
      const idx: number = index as number;
      const numTol: number = numToleratedItems as number;
      const size: number = itemSize as number;
      const newFirst: number = idx <= numTol ? 0 : idx;
      this.scrollTo({ top: newFirst * size + contentPos.top, behavior });
    }
  }

  /** Scroll an item into view towards 'to-start' or 'to-end'. */
  public scrollInView(
    index: number | [number, number],
    to: VirtualScrollerToType,
    behavior: ScrollBehavior = 'auto'
  ): void {
    const { first, viewport } = this.getRenderedRange();
    const itemSize: number | [number, number] = this.itemSize();
    const both: boolean = this.isBoth();
    const horizontal: boolean = this.isHorizontal();

    if (to === 'to-start') {
      if (both) {
        const idxArr: [number, number] = index as [number, number];
        const firstGrid: GridIndex = viewport.first as GridIndex;
        const totalFirst: GridIndex = first as GridIndex;
        const sizeArr: [number, number] = itemSize as [number, number];
        if (firstGrid.rows - totalFirst.rows > idxArr[0]) {
          this.scrollTo({
            left: firstGrid.cols * sizeArr[1],
            top: (firstGrid.rows - 1) * sizeArr[0],
            behavior,
          });
        } else if (firstGrid.cols - totalFirst.cols > idxArr[1]) {
          this.scrollTo({
            left: (firstGrid.cols - 1) * sizeArr[1],
            top: firstGrid.rows * sizeArr[0],
            behavior,
          });
        }
      } else {
        const idx: number = index as number;
        const firstNum: number = viewport.first as number;
        const totalFirstNum: number = first as number;
        if (firstNum - totalFirstNum > idx) {
          const pos: number = (firstNum - 1) * (itemSize as number);
          horizontal
            ? this.scrollTo({ left: pos, top: 0, behavior })
            : this.scrollTo({ left: 0, top: pos, behavior });
        }
      }
    } else {
      // to === 'to-end'
      if (both) {
        const idxArr: [number, number] = index as [number, number];
        const firstGrid: GridIndex = viewport.first as GridIndex;
        const lastGrid: GridIndex = viewport.last as GridIndex;
        const totalFirst: GridIndex = first as GridIndex;
        const sizeArr: [number, number] = itemSize as [number, number];
        if (lastGrid.rows - totalFirst.rows <= idxArr[0] + 1) {
          this.scrollTo({
            left: firstGrid.cols * sizeArr[1],
            top: (firstGrid.rows + 1) * sizeArr[0],
            behavior,
          });
        } else if (lastGrid.cols - totalFirst.cols <= idxArr[1] + 1) {
          this.scrollTo({
            left: (firstGrid.cols + 1) * sizeArr[1],
            top: firstGrid.rows * sizeArr[0],
            behavior,
          });
        }
      } else {
        const idx: number = index as number;
        const firstNum: number = viewport.first as number;
        const lastNum: number = viewport.last as number;
        const totalFirst: number = first as number;
        if (lastNum - totalFirst <= idx + 1) {
          const pos: number = (firstNum + 1) * (itemSize as number);
          horizontal
            ? this.scrollTo({ left: pos, top: 0, behavior })
            : this.scrollTo({ left: 0, top: pos, behavior });
        }
      }
    }
  }

  /** Return the current rendered range plus the visible viewport range. */
  public getRenderedRange(): {
    first: FirstLastIndex;
    last: FirstLastIndex;
    viewport: { first: FirstLastIndex; last: FirstLastIndex };
  } {
    const element: HTMLElement | undefined = this.scrollerElementRef()?.nativeElement;
    const both: boolean = this.isBoth();
    const horizontal: boolean = this.isHorizontal();
    const itemSize: number | [number, number] = this.itemSize();

    let firstInViewport: FirstLastIndex = this.first;
    let lastInViewport: FirstLastIndex = 0;

    if (element) {
      const { scrollTop, scrollLeft } = element;
      if (both) {
        const sizeArr: [number, number] = itemSize as [number, number];
        const numViewGrid: GridIndex = this.numItemsInViewport as GridIndex;
        const rowFirst: number = this.calcCurrentIndex(scrollTop, sizeArr[0]);
        const colFirst: number = this.calcCurrentIndex(scrollLeft, sizeArr[1]);
        firstInViewport = { rows: rowFirst, cols: colFirst };
        lastInViewport = {
          rows: rowFirst + numViewGrid.rows,
          cols: colFirst + numViewGrid.cols,
        };
      } else {
        const size: number = itemSize as number;
        const numInView: number = this.numItemsInViewport as number;
        const scrollPos: number = horizontal ? scrollLeft : scrollTop;
        firstInViewport = this.calcCurrentIndex(scrollPos, size);
        lastInViewport = (firstInViewport as number) + numInView;
      }
    }

    return {
      first: this.first,
      last: this.last,
      viewport: { first: firstInViewport, last: lastInViewport },
    };
  }

  // ---------------------------------------------------------------------------
  // Template helpers
  // ---------------------------------------------------------------------------

  /** @internal Returns positional metadata for a locally-rendered item index. */
  protected getItemOptions(localIndex: number): VirtualScrollerItemOptions {
    const items: unknown[] | null | undefined = this.items();
    const count: number = items?.length ?? 0;
    const index: number = this.isBoth()
      ? (this.first as GridIndex).rows + localIndex
      : (this.first as number) + localIndex;
    return {
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
    };
  }

  /** @internal Returns loader metadata for a locally-rendered loader index. */
  protected getLoaderOptions(
    loaderIndex: number,
    extra?: { numCols?: number }
  ): VirtualScrollerLoaderOptions {
    const count: number = this.loaderArr().length;
    return {
      index: loaderIndex,
      count,
      first: loaderIndex === 0,
      last: loaderIndex === count - 1,
      even: loaderIndex % 2 === 0,
      odd: loaderIndex % 2 !== 0,
      ...extra,
    };
  }

  /** @internal Track-by function for the item @for loop — uses the item index. */
  protected trackItem(index: number, _item: unknown): number {
    return index;
  }

  /** @internal Builds the full options context object for the content template. */
  protected getContentOptions(): VirtualScrollerContentOptions {
    return {
      items: this.loadedItems(),
      rows: this.loadedRows(),
      columns: this.loadedColumns(),
      loading: this.internalLoading(),
      itemSize: this.itemSize(),
      spacerStyle: this.spacerStyle(),
      contentStyle: this.contentStyle(),
      vertical: this.isVertical(),
      horizontal: this.isHorizontal(),
      both: this.isBoth(),
      getItemOptions: (itemIndex: number): VirtualScrollerItemOptions =>
        this.getItemOptions(itemIndex),
      getLoaderOptions: (
        loaderIndex: number,
        extra?: Record<string, unknown>
      ): VirtualScrollerLoaderOptions => this.getLoaderOptions(loaderIndex, extra),
    };
  }
}
