import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  NgZone,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
  type InputSignal,
  type OnInit,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type {
  ScrollTopBehavior,
  ScrollTopSize,
  ScrollTopTarget,
  ScrollTopVariant,
} from './scroll-top.types';

export type {
  ScrollTopBehavior,
  ScrollTopSize,
  ScrollTopTarget,
  ScrollTopVariant,
} from './scroll-top.types';

/**
 * ScrollTop — a floating "back to top" button that appears after the user
 * scrolls past a configurable threshold.
 *
 * Can target the global window (default, `position: fixed`) or a parent
 * scrollable container (`position: absolute`).
 *
 * Three sizes (sm / md / lg) and three design variants (material / bootstrap / minimal).
 *
 * @example
 * <!-- Window target (fixed to viewport) -->
 * <ui-lib-scroll-top />
 *
 * <!-- Parent container target -->
 * <div style="height: 300px; overflow-y: auto; position: relative;">
 *   <ui-lib-scroll-top target="parent" />
 *   <!-- scrollable content -->
 * </div>
 */
@Component({
  selector: 'ui-lib-scroll-top',
  standalone: true,
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.scss',
  host: {
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ScrollTop implements OnInit {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  /** Scroll distance in pixels before the button becomes visible. */
  public readonly threshold: InputSignal<number> = input<number>(400);

  /** Target to listen for scroll events on: the global window or the parent element. */
  public readonly target: InputSignal<ScrollTopTarget> = input<ScrollTopTarget>('window');

  /** CSS class(es) for the icon (e.g. "pi pi-arrow-up"). */
  public readonly icon: InputSignal<string> = input<string>('pi pi-arrow-up');

  /** Native scroll-behavior applied when scrolling back to top. */
  public readonly behavior: InputSignal<ScrollTopBehavior> = input<ScrollTopBehavior>('smooth');

  /** Accessible label for the button. */
  public readonly buttonAriaLabel: InputSignal<string> = input<string>('Back to top');

  /** Size of the button. */
  public readonly size: InputSignal<ScrollTopSize> = input<ScrollTopSize>('md');

  /** Visual variant — inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<ScrollTopVariant | null> = input<ScrollTopVariant | null>(
    null
  );

  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Whether the button is currently visible (scroll position exceeds threshold). */
  public readonly isVisible: WritableSignal<boolean> = signal<boolean>(false);

  /** Resolved variant — direct input wins, then falls back to global ThemeConfigService. */
  private readonly effectiveVariant: Signal<ScrollTopVariant> = computed<ScrollTopVariant>(
    (): ScrollTopVariant => this.variant() ?? (this.themeConfig.variant() as ScrollTopVariant)
  );

  /** Computed CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-scroll-top',
      `ui-lib-scroll-top--size-${this.size()}`,
      `ui-lib-scroll-top--variant-${this.effectiveVariant()}`,
      `ui-lib-scroll-top--target-${this.target()}`,
    ];
    if (this.isVisible()) {
      classes.push('ui-lib-scroll-top--visible');
    }
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });

  private scrollListener: (() => void) | null = null;
  private scrollEventTarget: EventTarget | null = null;

  /** @inheritdoc */
  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ngZone.runOutsideAngular((): void => {
      this.bindScrollListener();
    });

    this.destroyRef.onDestroy((): void => {
      this.unbindScrollListener();
    });
  }

  /** Scrolls back to the top of the target (window or parent element). */
  public scrollToTop(): void {
    if (this.target() === 'window') {
      window.scrollTo({ top: 0, behavior: this.behavior() });
    } else {
      const parentEl: HTMLElement | null = this.elementRef.nativeElement.parentElement;
      parentEl?.scrollTo({ top: 0, behavior: this.behavior() });
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private bindScrollListener(): void {
    if (this.target() === 'window') {
      this.scrollEventTarget = window;
    } else {
      this.scrollEventTarget = this.elementRef.nativeElement.parentElement;
    }

    if (!this.scrollEventTarget) {
      return;
    }

    this.scrollListener = (): void => {
      this.checkScrollPosition();
    };

    this.scrollEventTarget.addEventListener('scroll', this.scrollListener as EventListener);
  }

  private unbindScrollListener(): void {
    if (this.scrollEventTarget && this.scrollListener) {
      this.scrollEventTarget.removeEventListener('scroll', this.scrollListener as EventListener);
    }
    this.scrollEventTarget = null;
    this.scrollListener = null;
  }

  private checkScrollPosition(): void {
    let scrollTop: number = 0;

    if (this.target() === 'window') {
      scrollTop = window.scrollY;
    } else {
      const parentEl: HTMLElement | null = this.elementRef.nativeElement.parentElement;
      scrollTop = parentEl?.scrollTop ?? 0;
    }

    const shouldBeVisible: boolean = scrollTop > this.threshold();
    if (shouldBeVisible !== this.isVisible()) {
      this.isVisible.set(shouldBeVisible);
    }
  }
}
