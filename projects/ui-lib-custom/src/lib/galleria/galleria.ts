import { DOCUMENT, isPlatformBrowser, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
  type InputSignal,
  type ModelSignal,
  type OnDestroy,
  type Signal,
  type TemplateRef,
  type WritableSignal,
} from '@angular/core';
import { FocusTrap } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import {
  GALLERIA_DEFAULT_NUM_SCROLL,
  GALLERIA_DEFAULT_NUM_VISIBLE,
  GALLERIA_DEFAULT_TRANSITION_INTERVAL,
} from './galleria.constants';
import type {
  GalleriaIndicatorsPosition,
  GalleriaResponsiveOption,
  GalleriaItem,
  GalleriaSize,
  GalleriaThumbnailsPosition,
  GalleriaVariant,
} from './galleria.types';

export type {
  GalleriaIndicatorsPosition,
  GalleriaItem,
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
    '[attr.aria-label]': 'resolvedAriaLabel()',
  },
})
export class GalleriaComponent implements OnDestroy {
  // ─── Injected services ───────────────────────────────────────────────────────

  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly hostElement: ElementRef<HTMLElement> = inject(
    ElementRef,
  ) as ElementRef<HTMLElement>;
  private readonly document: Document = inject(DOCUMENT);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly zone: NgZone = inject(NgZone);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  // ─── Content queries ─────────────────────────────────────────────────────────

  /** Template for rendering each main gallery item. Exposes `$implicit` as the item data. */
  public readonly itemTemplate: Signal<TemplateRef<{ $implicit: GalleriaItem }> | undefined> =
    contentChild<TemplateRef<{ $implicit: GalleriaItem }>>('galleriaItem');

  /** Template for rendering each thumbnail. Exposes `$implicit` as the item data. */
  public readonly thumbnailTemplate: Signal<TemplateRef<{ $implicit: GalleriaItem }> | undefined> =
    contentChild<TemplateRef<{ $implicit: GalleriaItem }>>('galleriaThumbnail');

  /** Template for the caption overlay on the active item. Exposes `$implicit` as the item data. */
  public readonly captionTemplate: Signal<TemplateRef<{ $implicit: GalleriaItem }> | undefined> =
    contentChild<TemplateRef<{ $implicit: GalleriaItem }>>('galleriaCaption');

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

  /** Fullscreen container element used for the focus trap lifecycle. */
  public readonly fullScreenContainerElement: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('fullScreenContainerElement');

  /** Fullscreen trigger button used for focus restoration fallback. */
  public readonly fullScreenTriggerButtonElement: Signal<
    ElementRef<HTMLButtonElement> | undefined
  > = viewChild<ElementRef<HTMLButtonElement>>('fullScreenTriggerButtonElement');

  // ─── Inputs ──────────────────────────────────────────────────────────────────

  /** Array of data items to display. */
  public readonly value: InputSignal<GalleriaItem[]> = input<GalleriaItem[]>([]);

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
    GALLERIA_DEFAULT_TRANSITION_INTERVAL,
  );

  /** When true, a fullscreen toggle button is rendered; use `visible` to control open state. */
  public readonly fullScreen: InputSignal<boolean> = input<boolean>(false);

  /** Responsive options for breakpoint-based thumbnail counts. */
  public readonly responsiveOptions: InputSignal<GalleriaResponsiveOption[]> = input<
    GalleriaResponsiveOption[]
  >([]);

  /** Design variant; inherits from ThemeConfigService when null. */
  public readonly variant: InputSignal<GalleriaVariant | null> = input<GalleriaVariant | null>(
    null,
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

  /** Accessible label for the gallery landmark. Falls back to i18n `galleria.label` when null. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the fullscreen dialog container. */
  public readonly lightboxLabel: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the previous-item navigation button. */
  public readonly prevLabel: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the next-item navigation button. */
  public readonly nextLabel: InputSignal<string | null> = input<string | null>(null);

  // ─── Two-way bindings ─────────────────────────────────────────────────────────

  /** Active item index — supports two-way binding. */
  public readonly activeIndex: ModelSignal<number> = model<number>(0);

  /** Fullscreen overlay visibility — supports two-way binding. */
  public readonly visible: ModelSignal<boolean> = model<boolean>(false);

  // ─── Internal state ───────────────────────────────────────────────────────────

  /** Index of the first thumbnail shown in the scrollable thumbnail strip. */
  public readonly thumbnailFirstIndex: WritableSignal<number> = signal<number>(0);

  /** True while the pointer is inside the main item area (used for hover-reveal navigators). */
  public readonly isItemHovered: WritableSignal<boolean> = signal<boolean>(false);

  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  private focusTrap: FocusTrap | null = null;
  private fullScreenTriggerElement: HTMLElement | null = null;

  private readonly componentId: string = `ui-lib-galleria-${++galleriaIdCounter}`;

  // ─── Computed ────────────────────────────────────────────────────────────────

  /** Resolved design variant — falls back to the global theme variant when null. */
  public readonly effectiveVariant: Signal<GalleriaVariant> = computed<GalleriaVariant>(
    (): GalleriaVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /** Currently active item. */
  public readonly currentItem: Signal<GalleriaItem | null> = computed<GalleriaItem | null>(
    (): GalleriaItem | null => this.value()[this.activeIndex()] ?? null,
  );

  /** True when the thumbnail strip is positioned to the left or right of the item. */
  public readonly isVertical: Signal<boolean> = computed<boolean>(
    (): boolean => this.thumbnailsPosition() === 'left' || this.thumbnailsPosition() === 'right',
  );

  /** True when the thumbnail strip should appear before (above/left of) the main item. */
  public readonly isThumbnailBefore: Signal<boolean> = computed<boolean>(
    (): boolean => this.thumbnailsPosition() === 'top' || this.thumbnailsPosition() === 'left',
  );

  /** True when backward navigation is available. */
  public readonly canNavigatePrev: Signal<boolean> = computed<boolean>(
    (): boolean => this.circular() || this.activeIndex() > 0,
  );

  /** True when forward navigation is available. */
  public readonly canNavigateNext: Signal<boolean> = computed<boolean>(
    (): boolean => this.circular() || this.activeIndex() < this.value().length - 1,
  );

  /** True when the thumbnail strip can scroll back. */
  public readonly canScrollThumbnailsPrev: Signal<boolean> = computed<boolean>(
    (): boolean => this.thumbnailFirstIndex() > 0,
  );

  /** True when the thumbnail strip can scroll forward. */
  public readonly canScrollThumbnailsNext: Signal<boolean> = computed<boolean>(
    (): boolean => this.thumbnailFirstIndex() + this.numVisible() < this.value().length,
  );

  /** Slice of value[] shown in the thumbnail strip. */
  public readonly visibleThumbnails: Signal<GalleriaItem[]> = computed<GalleriaItem[]>(
    (): GalleriaItem[] =>
      this.value().slice(
        this.thumbnailFirstIndex(),
        this.thumbnailFirstIndex() + this.numVisible(),
      ),
  );

  /** Navigation arrows visibility considering both `showItemNavigators` and hover state. */
  public readonly itemNavigatorsVisible: Signal<boolean> = computed<boolean>(
    (): boolean =>
      this.showItemNavigators() || (this.showItemNavigatorsOnHover() && this.isItemHovered()),
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

  /** ID used for the inline gallery container. */
  public readonly containerId: Signal<string> = computed<string>(
    (): string => `${this.componentId}-container`,
  );

  /** ID used for the fullscreen dialog container. */
  public readonly lightboxId: Signal<string> = computed<string>(
    (): string => `${this.componentId}-lightbox`,
  );

  /** Resolved accessible region label — consumer value takes priority; falls back to i18n key. */
  public readonly resolvedAriaLabel: Signal<string> = computed<string>(
    (): string => this.ariaLabel() ?? this.i18n.translate('galleria.label'),
  );

  /** Resolved previous-item aria-label. */
  public readonly previousItemAriaLabel: Signal<string> = computed<string>((): string =>
    this.getLabelOrFallback(this.prevLabel(), this.i18n.translate('galleria.prev')),
  );

  /** Resolved next-item aria-label. */
  public readonly nextItemAriaLabel: Signal<string> = computed<string>((): string =>
    this.getLabelOrFallback(this.nextLabel(), this.i18n.translate('galleria.next')),
  );

  /** Resolved fullscreen dialog aria-label. */
  public readonly lightboxAriaLabel: Signal<string> = computed<string>((): string =>
    this.getLabelOrFallback(this.lightboxLabel(), this.i18n.translate('galleria.label')),
  );

  /** ARIA label for the close button — resolved via i18n. */
  public get closeAriaLabel(): string {
    return this.i18n.translate('galleria.close');
  }

  /** ARIA label for the fullscreen open button — resolved via i18n. */
  public get fullscreenAriaLabel(): string {
    return this.i18n.translate('galleria.fullscreen');
  }

  /** ARIA label for the thumbnail-strip previous-scroll button — resolved via i18n. */
  public get thumbnailPrevAriaLabel(): string {
    return this.i18n.translate('galleria.thumbnail.prev');
  }

  /** ARIA label for the thumbnail-strip next-scroll button — resolved via i18n. */
  public get thumbnailNextAriaLabel(): string {
    return this.i18n.translate('galleria.thumbnail.next');
  }

  /** Aria-label for the active item slide group. */
  public readonly currentItemAriaLabel: Signal<string> = computed<string>((): string =>
    this.i18n.translate('galleria.item', {
      current: this.activeIndex() + 1,
      total: this.value().length,
    }),
  );

  /** Aria-label for the indicator tablist / navigation region. */
  public readonly imageNavAriaLabel: Signal<string> = computed<string>((): string =>
    this.i18n.translate('galleria.nav'),
  );

  /** Returns the aria-label for a given indicator button (0-based index). */
  public goToItemAriaLabel(index: number): string {
    return this.i18n.translate('galleria.go-to', { n: index + 1 });
  }

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

    effect((): void => {
      const shouldTrapFocus: boolean = this.fullScreen() && this.visible();
      if (!shouldTrapFocus) {
        this.deactivateFocusTrap();
        return;
      }

      queueMicrotask((): void => {
        this.activateFocusTrap();
      });
    });
  }

  public ngOnDestroy(): void {
    this.stopAutoPlay();
    this.deactivateFocusTrap();
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
    const activeElement: Element | null = this.document.activeElement;
    this.fullScreenTriggerElement = activeElement instanceof HTMLElement ? activeElement : null;
    this.visible.set(true);
  }

  /** Close the fullscreen overlay. */
  public closeFullScreen(): void {
    this.visible.set(false);
    this.restoreFullScreenTriggerFocus();
  }

  /** Stop propagation so clicking inside the fullscreen container does not close it. */
  public onFullScreenContainerClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  /** Close fullscreen on Escape key. */
  public onLightboxKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.closeFullScreen();
    }
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

  /** Handle keyboard activation and arrow navigation on a thumbnail button. */
  public onThumbnailKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateTo(index);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.navigateTo(0);
      this.focusThumbnail(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const lastIndex: number = this.value().length - 1;
      this.navigateTo(lastIndex);
      this.focusThumbnail(lastIndex);
      return;
    }

    const horizontalStep: number =
      event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    const verticalStep: number = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    const step: number = this.isVertical() ? verticalStep : horizontalStep;

    if (step === 0) {
      return;
    }

    event.preventDefault();
    const nextIndex: number = this.clampIndex(index + step);
    this.navigateTo(nextIndex);
    this.focusThumbnail(nextIndex);
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

  /** Resolve the source URL for the current active image. */
  public resolveCurrentItemSrc(): string | null {
    return this.currentItem()?.src ?? null;
  }

  /** Resolve the alt text for the current active image, falling back to decorative alt text. */
  public resolveCurrentItemAlt(): string {
    const altText: string | undefined = this.currentItem()?.alt;
    return this.getTrimmedOrEmpty(altText);
  }

  /** Resolve the source URL for a thumbnail image. */
  public resolveThumbnailSrc(item: GalleriaItem): string | null {
    const source: string | undefined = item.thumbnailSrc ?? item.src;
    return this.getTrimmedOrNull(source);
  }

  /** Resolve the alt text for a thumbnail image. */
  public resolveThumbnailAlt(item: GalleriaItem): string {
    return this.getTrimmedOrEmpty(item.thumbnailAlt ?? item.alt);
  }

  /** Resolve the accessible name for a thumbnail button. */
  public resolveThumbnailAriaLabel(item: GalleriaItem, index: number): string {
    const thumbnailLabel: string | null = this.getTrimmedOrNull(item.thumbnailAlt);
    if (thumbnailLabel) {
      return thumbnailLabel;
    }

    const itemLabel: string | null = this.getTrimmedOrNull(item.alt);
    if (itemLabel) {
      return itemLabel;
    }

    return `Thumbnail ${index + 1}`;
  }

  private activateFocusTrap(): void {
    if (!this.isBrowser) {
      return;
    }

    const container: HTMLElement | undefined = this.fullScreenContainerElement()?.nativeElement;
    if (!container) {
      return;
    }

    this.deactivateFocusTrap();
    this.focusTrap = new FocusTrap(container);
    this.focusTrap.activate();
  }

  private deactivateFocusTrap(): void {
    this.focusTrap?.deactivate();
    this.focusTrap = null;
  }

  private restoreFullScreenTriggerFocus(): void {
    queueMicrotask((): void => {
      if (this.fullScreenTriggerElement?.isConnected) {
        this.fullScreenTriggerElement.focus();
      } else {
        const fallbackTrigger: HTMLButtonElement | null =
          this.fullScreenTriggerButtonElement()?.nativeElement ?? null;
        fallbackTrigger?.focus();
      }
      this.fullScreenTriggerElement = null;
    });
  }

  private clampIndex(index: number): number {
    const itemCount: number = this.value().length;
    if (itemCount === 0) {
      return 0;
    }

    return Math.max(0, Math.min(index, itemCount - 1));
  }

  private focusThumbnail(index: number): void {
    if (!this.isBrowser) {
      return;
    }

    queueMicrotask((): void => {
      if (!this.document.defaultView) {
        return;
      }

      const root: ParentNode = this.hostElement.nativeElement;
      const target: HTMLButtonElement | null = root.querySelector<HTMLButtonElement>(
        `[data-thumbnail-index="${index}"]`,
      );
      target?.focus();
    });
  }

  private getLabelOrFallback(value: string | null | undefined, fallback: string): string {
    return this.getTrimmedOrNull(value) ?? fallback;
  }

  private getTrimmedOrNull(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const trimmedValue: string = value.trim();
    return trimmedValue.length > 0 ? trimmedValue : null;
  }

  private getTrimmedOrEmpty(value: string | null | undefined): string {
    return this.getTrimmedOrNull(value) ?? '';
  }
}
