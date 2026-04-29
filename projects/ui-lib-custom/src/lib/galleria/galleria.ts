import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  type InputSignal,
  type ModelSignal,
  type OnDestroy,
  type OutputEmitterRef,
  type Signal,
  type TemplateRef,
  type WritableSignal,
} from '@angular/core';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
  GALLERIA_ARIA_CLOSE_LABEL,
  GALLERIA_ARIA_FULLSCREEN_LABEL,
  GALLERIA_ARIA_NEXT_LABEL,
  GALLERIA_ARIA_PREV_LABEL,
  GALLERIA_ARIA_REGION_LABEL,
  GALLERIA_ARIA_THUMBNAIL_NEXT_LABEL,
  GALLERIA_ARIA_THUMBNAIL_PREV_LABEL,
  GALLERIA_DEFAULT_NUM_SCROLL,
  GALLERIA_DEFAULT_NUM_VISIBLE,
  GALLERIA_DEFAULT_TRANSITION_INTERVAL,
} from './galleria.constants';
import type {
  GalleriaIndicatorsPosition,
  GalleriaResponsiveOption,
  GalleriaSize,
  GalleriaThumbnailsPosition,
  GalleriaVariant,
} from './galleria.types';

export type {
  GalleriaIndicatorsPosition,
  GalleriaResponsiveOption,
  GalleriaSize,
  GalleriaThumbnailsPosition,
  GalleriaVariant,
} from './galleria.types';

let galleriaIdCounter: number = 0;

/**
 * Galleria is a media gallery component for displaying images or other content
 * with optional thumbnail navigation, dot indicators, autoplay, and fullscreen mode.
 *
 * Provide content via ng-template slots:
 * - `<ng-template #galleriaItem let-item>` — main item renderer
 * - `<ng-template #galleriaThumbnail let-item>` — thumbnail renderer
 * - `<ng-template #galleriaCaption let-item>` — caption overlay on the active item
 * - `<ng-template #galleriaHeader>` — header above the gallery
 * - `<ng-template #galleriaFooter>` — footer below the gallery
 * - `<ng-template #galleriaIndicator let-index let-active="active">` — custom indicator
 *
 * @example
 * ```html
 * <ui-lib-galleria [value]="images" [showThumbnails]="true">
 *   <ng-template #galleriaItem let-image>
 *     <img [src]="image.src" [alt]="image.alt" />
 *   </ng-template>
 *   <ng-template #galleriaThumbnail let-image>
 *     <img [src]="image.thumbnailSrc" [alt]="image.alt" />
 *   </ng-template>
 * </ui-lib-galleria>
 * ```
 */
@Component({
  selector: 'ui-lib-galleria',
  standalone: true,
  imports: [NgTemplateOutlet, NgStyle],
  templateUrl: './galleria.html',
  styleUrl: './galleria.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': '"region"',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class GalleriaComponent implements OnDestroy {
  // ─── Injected services ───────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly zone: NgZone = inject(NgZone);

  // ─── Content queries ─────────────────────────────────────────────────────────

  /** Template for rendering each main gallery item. Exposes `$implicit` as the item data. */
  public readonly itemTemplate: Signal<TemplateRef<{ $implicit: unknown }> | undefined> =
    contentChild<TemplateRef<{ $implicit: unknown }>>('galleriaItem');

  /** Template for rendering each thumbnail. Exposes `$implicit` as the item data. */
  public readonly thumbnailTemplate: Signal<TemplateRef<{ $implicit: unknown }> | undefined> =
    contentChild<TemplateRef<{ $implicit: unknown }>>('galleriaThumbnail');

  /** Template for the caption overlay on the active item. Exposes `$implicit` as the item data. */
  public readonly captionTemplate: Signal<TemplateRef<{ $implicit: unknown }> | undefined> =
    contentChild<TemplateRef<{ $implicit: unknown }>>('galleriaCaption');

  /** Optional header template rendered above the gallery. */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('galleriaHeader');

  /** Optional footer template rendered below the gallery. */
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> =
    contentChild<TemplateRef<unknown>>('galleriaFooter');

  /** Custom indicator button template. Exposes `$implicit` as the index and `active` as a boolean. */
  public readonly indicatorTemplate: Signal<
    TemplateRef<{ $implicit: number; active: boolean }> | undefined
  > = contentChild<TemplateRef<{ $implicit: number; active: boolean }>>('galleriaIndicator');

  // ─── Inputs ──────────────────────────────────────────────────────────────────

  /** Array of data items to display. */
  public readonly value: InputSignal<unknown[]> = input<unknown[]>([]);

  /** Number of thumbnails visible in the strip. */
  public readonly numVisible: InputSignal<number> = input<number>(GALLERIA_DEFAULT_NUM_VISIBLE);

  /** Number of thumbnails to scroll per thumbnail-navigator click. */
  public readonly numScroll: InputSignal<number> = input<number>(GALLERIA_DEFAULT_NUM_SCROLL);

  /** Position of the thumbnail strip relative to the main item. */
  public readonly thumbnailsPosition: InputSignal<GalleriaThumbnailsPosition> =
    input<GalleriaThumbnailsPosition>('bottom');

  /** Position of the indicator dots. */
  public readonly indicatorsPosition: InputSignal<GalleriaIndicatorsPosition> =
    input<GalleriaIndicatorsPosition>('bottom');

  /** When true, the thumbnail strip is rendered. */
  public readonly showThumbnails: InputSignal<boolean> = input<boolean>(true);

  /** When true, indicator dots are rendered below/above the gallery. */
  public readonly showIndicators: InputSignal<boolean> = input<boolean>(false);

  /** When true, indicator dots are rendered on top of the active item. */
  public readonly showIndicatorsOnItem: InputSignal<boolean> = input<boolean>(false);

  /** When true, prev/next item navigation arrows are always visible. */
  public readonly showItemNavigators: InputSignal<boolean> = input<boolean>(true);

  /** When true, prev/next item navigation arrows appear only while hovering the item. */
  public readonly showItemNavigatorsOnHover: InputSignal<boolean> = input<boolean>(false);

  /** When true, thumbnail-strip navigation arrows are rendered. */
  public readonly showThumbnailNavigators: InputSignal<boolean> = input<boolean>(true);

  /** When true, navigation wraps around from the last item to the first and vice versa. */
  public readonly circular: InputSignal<boolean> = input<boolean>(false);

  /** When true, the gallery automatically advances to the next item. */
  public readonly autoPlay: InputSignal<boolean> = input<boolean>(false);

  /** Interval in milliseconds between automatic slide transitions. */
  public readonly transitionInterval: InputSignal<number> = input<number>(
    GALLERIA_DEFAULT_TRANSITION_INTERVAL
  );

  /** When true, a fullscreen toggle button is rendered; use `visible` to control open state. */
  public readonly fullScreen: InputSignal<boolean> = input<boolean>(false);

  /** Responsive options for breakpoint-based thumbnail counts. */
  public readonly responsiveOptions: InputSignal<GalleriaResponsiveOption[]> = input<
    GalleriaResponsiveOption[]
  >([]);

  /** Design variant; inherits from ThemeConfigService when null. */
  public readonly variant: InputSignal<GalleriaVariant | null> = input<GalleriaVariant | null>(
    null
  );

  /** Component size token. */
  public readonly size: InputSignal<GalleriaSize> = input<GalleriaSize>('md');

  /** Additional CSS class(es) applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Inline styles for the gallery container element. */
  public readonly containerStyle: InputSignal<Record<string, string> | null> = input<Record<
    string,
    string
  > | null>(null);

  /** Accessible label for the gallery landmark. Defaults to the built-in region label constant. */
  public readonly ariaLabel: InputSignal<string> = input<string>(GALLERIA_ARIA_REGION_LABEL);

  // ─── Two-way bindings ─────────────────────────────────────────────────────────

  /** Active item index — supports two-way binding. */
  public readonly activeIndex: ModelSignal<number> = model<number>(0);

  /** Fullscreen overlay visibility — supports two-way binding. */
  public readonly visible: ModelSignal<boolean> = model<boolean>(false);

  // ─── Outputs ─────────────────────────────────────────────────────────────────

  /** Emitted whenever the active index changes. */
  public readonly activeIndexChange: OutputEmitterRef<number> = output<number>();

  // ─── Internal state ───────────────────────────────────────────────────────────

  /** Index of the first thumbnail shown in the scrollable thumbnail strip. */
  public readonly thumbnailFirstIndex: WritableSignal<number> = signal<number>(0);

  /** True while the pointer is inside the main item area (used for hover-reveal navigators). */
  public readonly isItemHovered: WritableSignal<boolean> = signal<boolean>(false);

  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  private readonly componentId: string = `ui-lib-galleria-${++galleriaIdCounter}`;

  // ─── Computed ────────────────────────────────────────────────────────────────

  /** Resolved design variant — falls back to the global theme variant when null. */
  public readonly effectiveVariant: Signal<GalleriaVariant> = computed<GalleriaVariant>(
    (): GalleriaVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** Currently active item. */
  public readonly currentItem: Signal<unknown> = computed<unknown>(
    (): unknown => this.value()[this.activeIndex()] ?? null
  );

  /** True when the thumbnail strip is positioned to the left or right of the item. */
  public readonly isVertical: Signal<boolean> = computed<boolean>(
    (): boolean => this.thumbnailsPosition() === 'left' || this.thumbnailsPosition() === 'right'
  );

  /** True when the thumbnail strip should appear before (above/left of) the main item. */
  public readonly isThumbnailBefore: Signal<boolean> = computed<boolean>(
    (): boolean => this.thumbnailsPosition() === 'top' || this.thumbnailsPosition() === 'left'
  );

  /** True when backward navigation is available. */
  public readonly canNavigatePrev: Signal<boolean> = computed<boolean>(
    (): boolean => this.circular() || this.activeIndex() > 0
  );

  /** True when forward navigation is available. */
  public readonly canNavigateNext: Signal<boolean> = computed<boolean>(
    (): boolean => this.circular() || this.activeIndex() < this.value().length - 1
  );

  /** True when the thumbnail strip can scroll back. */
  public readonly canScrollThumbnailsPrev: Signal<boolean> = computed<boolean>(
    (): boolean => this.thumbnailFirstIndex() > 0
  );

  /** True when the thumbnail strip can scroll forward. */
  public readonly canScrollThumbnailsNext: Signal<boolean> = computed<boolean>(
    (): boolean => this.thumbnailFirstIndex() + this.numVisible() < this.value().length
  );

  /** Slice of value[] shown in the thumbnail strip. */
  public readonly visibleThumbnails: Signal<unknown[]> = computed<unknown[]>((): unknown[] =>
    this.value().slice(this.thumbnailFirstIndex(), this.thumbnailFirstIndex() + this.numVisible())
  );

  /** Navigation arrows visibility considering both `showItemNavigators` and hover state. */
  public readonly itemNavigatorsVisible: Signal<boolean> = computed<boolean>(
    (): boolean =>
      this.showItemNavigators() || (this.showItemNavigatorsOnHover() && this.isItemHovered())
  );

  /** Composite CSS class string applied via the host binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-galleria',
      `ui-lib-galleria--variant-${this.effectiveVariant()}`,
      `ui-lib-galleria--size-${this.size()}`,
      `ui-lib-galleria--thumbnails-${this.thumbnailsPosition()}`,
    ];

    if (this.isVertical()) {
      classes.push('ui-lib-galleria--vertical');
    }

    const extraClass: string | null = this.styleClass();
    if (extraClass) {
      classes.push(extraClass);
    }

    return classes.join(' ');
  });

  // ARIA label constants exposed to the template.
  public readonly prevAriaLabel: string = GALLERIA_ARIA_PREV_LABEL;
  public readonly nextAriaLabel: string = GALLERIA_ARIA_NEXT_LABEL;
  public readonly closeAriaLabel: string = GALLERIA_ARIA_CLOSE_LABEL;
  public readonly fullscreenAriaLabel: string = GALLERIA_ARIA_FULLSCREEN_LABEL;
  public readonly thumbnailPrevAriaLabel: string = GALLERIA_ARIA_THUMBNAIL_PREV_LABEL;
  public readonly thumbnailNextAriaLabel: string = GALLERIA_ARIA_THUMBNAIL_NEXT_LABEL;

  // ─── Lifecycle ────────────────────────────────────────────────────────────────

  constructor() {
    // React to autoPlay input changes.
    effect((): void => {
      if (this.autoPlay()) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });
  }

  public ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  /** Navigate to the previous item. */
  public navigatePrev(event: Event): void {
    event.stopPropagation();

    if (!this.canNavigatePrev()) {
      return;
    }

    const total: number = this.value().length;
    const next: number = this.activeIndex() === 0 ? total - 1 : this.activeIndex() - 1;
    this.navigateTo(next);
  }

  /** Navigate to the next item. */
  public navigateNext(event: Event): void {
    event.stopPropagation();

    if (!this.canNavigateNext()) {
      return;
    }

    const total: number = this.value().length;
    const next: number = this.activeIndex() === total - 1 ? 0 : this.activeIndex() + 1;
    this.navigateTo(next);
  }

  /** Navigate directly to a specific item index. */
  public navigateTo(index: number): void {
    this.activeIndex.set(index);
    this.activeIndexChange.emit(index);
    this.syncThumbnailsToActiveIndex();
  }

  /** Scroll the thumbnail strip toward the first item. */
  public scrollThumbnailsPrev(event: Event): void {
    event.stopPropagation();

    if (!this.canScrollThumbnailsPrev()) {
      return;
    }

    const nextFirst: number = this.thumbnailFirstIndex() - this.numScroll();
    this.thumbnailFirstIndex.set(Math.max(0, nextFirst));
  }

  /** Scroll the thumbnail strip toward the last item. */
  public scrollThumbnailsNext(event: Event): void {
    event.stopPropagation();

    if (!this.canScrollThumbnailsNext()) {
      return;
    }

    const maxFirst: number = this.value().length - this.numVisible();
    const nextFirst: number = this.thumbnailFirstIndex() + this.numScroll();
    this.thumbnailFirstIndex.set(Math.min(nextFirst, Math.max(0, maxFirst)));
  }

  // ─── Fullscreen ──────────────────────────────────────────────────────────────

  /** Open the fullscreen overlay. */
  public openFullScreen(): void {
    this.visible.set(true);
  }

  /** Close the fullscreen overlay. */
  public closeFullScreen(): void {
    this.visible.set(false);
  }

  /** Stop propagation so clicking inside the fullscreen container does not close it. */
  public onFullScreenContainerClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  // ─── Hover tracking ───────────────────────────────────────────────────────────

  /** Mark the item area as hovered. */
  public onItemMouseEnter(): void {
    this.isItemHovered.set(true);
  }

  /** Mark the item area as no longer hovered. */
  public onItemMouseLeave(): void {
    this.isItemHovered.set(false);
  }

  // ─── Thumbnail keyboard support ───────────────────────────────────────────────

  /** Handle keyboard activation (Enter / Space) on a thumbnail button. */
  public onThumbnailKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateTo(index);
    }
  }

  // ─── Autoplay ────────────────────────────────────────────────────────────────

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.zone.runOutsideAngular((): void => {
      this.autoPlayTimer = setInterval((): void => {
        this.zone.run((): void => {
          this.navigateNext(new Event('autoplay'));
        });
      }, this.transitionInterval());
    });
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  /** Ensure the thumbnail strip always shows the active item. */
  private syncThumbnailsToActiveIndex(): void {
    const activeIndex: number = this.activeIndex();
    const numVisible: number = this.numVisible();
    const firstIndex: number = this.thumbnailFirstIndex();

    if (activeIndex < firstIndex) {
      this.thumbnailFirstIndex.set(activeIndex);
    } else if (activeIndex >= firstIndex + numVisible) {
      this.thumbnailFirstIndex.set(activeIndex - numVisible + 1);
    }
  }
}
