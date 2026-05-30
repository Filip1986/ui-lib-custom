import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  inject,
  input,
  isDevMode,
} from '@angular/core';
import type { AfterViewInit, InputSignal } from '@angular/core';

/**
 * AutoFocus directive — programmatically focuses the host element (or an
 * optional focusable child selector target) after view initialization.
 *
 * Equivalent to the native `autofocus` attribute but works reliably in
 * Angular applications, including those with dynamic content or conditional
 * rendering flows.
 *
 * Usage:
 * ```html
 * <input uiLibAutoFocus />
 * <input uiLibAutoFocus [disabled]="isDisabled" />
 * <div uiLibAutoFocus selector="[data-autofocus-target]">...</div>
 * ```
 */
@Directive({
  selector: '[uiLibAutoFocus]',
  standalone: true,
  host: {
    class: 'ui-lib-autofocus',
  },
})
export class AutoFocus implements AfterViewInit {
  /**
   * When `true`, autofocus is skipped.
   */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Optional CSS selector used to focus a child element instead of the host.
   */
  public readonly selector: InputSignal<string | null> = input<string | null>(null);

  /**
   * Additional delay in milliseconds before the focus is applied.
   *
   * Useful when the host element is inside an animated container (modal, drawer,
   * dropdown) that needs time to complete its opening animation before the browser
   * will scroll the focused element into view correctly.
   *
   * When `0` (default) focus is deferred by one `requestAnimationFrame` tick —
   * sufficient for most static-mount scenarios. When positive, a `setTimeout` is
   * used instead and the pending timer is cleared if the directive is destroyed
   * before it fires.
   *
   * @example
   * <!-- Wait for a 300 ms open animation before focusing -->
   * <input uiLibAutoFocus [delay]="300" />
   */
  public readonly delay: InputSignal<number> = input<number>(0);

  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document: Document = inject(DOCUMENT);
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  private readonly hostTagName: string = `<${this.elementRef.nativeElement.tagName.toLowerCase()}>`;

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    if (!this.isBrowser || this.disabled()) {
      return;
    }

    const delayMs: number = this.delay();

    if (delayMs > 0) {
      // User-specified delay — give animated containers time to finish opening before
      // focus is applied (otherwise scroll-into-view may position the page incorrectly).
      const timeoutId: ReturnType<typeof setTimeout> = setTimeout((): void => {
        this.attemptFocus();
      }, delayMs);
      this.destroyRef.onDestroy((): void => clearTimeout(timeoutId));
    } else {
      // Default: defer one rAF tick so Angular finishes the initial render pass.
      requestAnimationFrame((): void => {
        this.attemptFocus();
      });
    }
  }

  /** Attempts to focus the resolved target — re-checks disabled so late changes take effect. */
  private attemptFocus(): void {
    if (this.disabled()) {
      return;
    }

    const target: HTMLElement | null = this.resolveFocusTarget();
    if (!target || !this.shouldFocusTarget(target)) {
      return;
    }

    if (isDevMode() && !this.isProgrammaticallyFocusable(target)) {
      console.warn(
        `[ui-lib-custom/auto-focus] ${this.hostTagName} host or selector target is not programmatically focusable. ` +
          'Add tabindex="-1" or provide a focusable selector target.',
      );
    }

    target.focus();
  }

  private resolveFocusTarget(): HTMLElement | null {
    const hostElement: HTMLElement = this.elementRef.nativeElement;
    const selectorValue: string | null = this.selector();

    if (!selectorValue || selectorValue.trim().length === 0) {
      return hostElement;
    }

    try {
      return hostElement.querySelector<HTMLElement>(selectorValue);
    } catch {
      if (isDevMode()) {
        console.warn(
          `[ui-lib-custom/auto-focus] Invalid selector "${selectorValue}" on ${this.hostTagName}. Falling back to host element.`,
        );
      }
      return hostElement;
    }
  }

  private shouldFocusTarget(target: HTMLElement): boolean {
    const activeElement: Element | null = this.document.activeElement;
    if (!(activeElement instanceof HTMLElement)) {
      return true;
    }

    if (activeElement === this.document.body || activeElement === this.document.documentElement) {
      return true;
    }

    if (!activeElement.isConnected) {
      return true;
    }

    if (!this.isProgrammaticallyFocusable(activeElement)) {
      return true;
    }

    if (
      activeElement === target ||
      target.contains(activeElement) ||
      activeElement.contains(target)
    ) {
      return false;
    }

    return false;
  }

  private isProgrammaticallyFocusable(target: HTMLElement): boolean {
    if (target.hasAttribute('disabled')) {
      return false;
    }

    if (target.hasAttribute('tabindex')) {
      const tabIndexValue: number = Number(target.getAttribute('tabindex'));
      return Number.isNaN(tabIndexValue) || tabIndexValue >= -1;
    }

    return target.matches(
      'a[href], button, input, select, textarea, summary, iframe, [contenteditable="true"], audio[controls], video[controls]',
    );
  }
}
