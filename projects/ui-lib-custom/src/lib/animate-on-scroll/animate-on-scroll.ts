import { Directive, ElementRef, DestroyRef, inject, input, output } from '@angular/core';
import type { InputSignal, OnInit, OutputEmitterRef } from '@angular/core';

/**
 * AnimateOnScroll directive — uses the native `IntersectionObserver` API to
 * detect when the host element enters or leaves the viewport, then adds/removes
 * CSS classes to trigger animations.
 *
 * No external animation dependencies; works with the built-in
 * `uilib-aos-*` preset classes defined in `animate-on-scroll.scss`, or with
 * any custom CSS classes.
 *
 * Usage:
 * ```html
 * <div class="uilib-aos-slide-up"
 *      uiLibAnimateOnScroll
 *      enterClass="uilib-aos-active">
 *   Animated content
 * </div>
 * ```
 */
@Directive({
  selector: '[uiLibAnimateOnScroll]',
  standalone: true,
  host: {
    class: 'ui-lib-animate-on-scroll',
  },
})
export class AnimateOnScroll implements OnInit {
  /** CSS class(es) (space-separated) to add when the element enters the viewport. */
  public readonly enterClass: InputSignal<string> = input<string>('');

  /** CSS class(es) (space-separated) to add when the element leaves the viewport. Only applied when `once` is false. */
  public readonly leaveClass: InputSignal<string> = input<string>('');

  /** IntersectionObserver threshold - ratio of element visibility required to trigger (0-1). */
  public readonly threshold: InputSignal<number> = input<number>(0.1);

  /** IntersectionObserver rootMargin - margin around the root. */
  public readonly rootMargin: InputSignal<string> = input<string>('0px');

  /**
   * When `true` (default), the directive unobserves the element after the first
   * enter event so the animation plays only once.
   */
  public readonly once: InputSignal<boolean> = input<boolean>(true);

  /** When `true`, the directive does nothing and no observer is created. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Emitted when the host element enters the viewport. */
  public readonly enter: OutputEmitterRef<void> = output<void>();

  /** Emitted when the host element leaves the viewport. Only emitted when `once` is false. */
  public readonly leave: OutputEmitterRef<void> = output<void>();

  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private observer: IntersectionObserver | null = null;

  /** @inheritdoc */
  public ngOnInit(): void {
    if (this.disabled()) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        for (const entry of entries) {
          this.handleIntersection(entry);
        }
      },
      {
        threshold: this.threshold(),
        rootMargin: this.rootMargin(),
      }
    );

    this.observer.observe(this.elementRef.nativeElement);

    this.destroyRef.onDestroy((): void => {
      this.observer?.disconnect();
      this.observer = null;
    });
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /** Handle a single IntersectionObserverEntry. */
  private handleIntersection(entry: IntersectionObserverEntry): void {
    const element: HTMLElement = this.elementRef.nativeElement;

    if (entry.isIntersecting) {
      this.applyClasses(element, this.enterClass(), true);
      this.applyClasses(element, this.leaveClass(), false);
      this.enter.emit();

      if (this.once()) {
        this.observer?.unobserve(element);
      }
    } else if (!this.once()) {
      this.applyClasses(element, this.leaveClass(), true);
      this.applyClasses(element, this.enterClass(), false);
      this.leave.emit();
    }
  }

  /**
   * Split a space-separated class string and add or remove each class on the
   * given element. Empty strings are silently ignored.
   */
  private applyClasses(element: HTMLElement, classString: string, add: boolean): void {
    if (!classString.trim()) {
      return;
    }

    const classes: string[] = classString.trim().split(/\s+/);

    for (const cssClass of classes) {
      if (add) {
        element.classList.add(cssClass);
      } else {
        element.classList.remove(cssClass);
      }
    }
  }
}
