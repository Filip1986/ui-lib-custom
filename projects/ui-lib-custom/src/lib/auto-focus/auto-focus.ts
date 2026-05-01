import { Directive, ElementRef, inject, input } from '@angular/core';
import type { AfterViewInit, InputSignal } from '@angular/core';

/**
 * AutoFocus directive — programmatically focuses the host element after view
 * initialization when the `autofocus` input is `true` (default).
 *
 * Equivalent to the native `autofocus` attribute but works reliably in
 * Angular applications, including those with dynamic content or conditional
 * rendering flows.
 *
 * Usage:
 * ```html
 * <input uiLibAutoFocus />
 * <input uiLibAutoFocus [autofocus]="isNew" />
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
   * When `true` (default), the host element receives focus after the view is
   * initialized. Set to `false` to disable autofocus conditionally.
   */
  public readonly autofocus: InputSignal<boolean> = input<boolean>(true);

  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    if (this.autofocus()) {
      // setTimeout defers focus to the next macrotask, ensuring the element
      // is fully rendered — especially useful inside overlays and deferred
      // templates where synchronous focus would fail.
      setTimeout((): void => {
        this.elementRef.nativeElement.focus();
      });
    }
  }
}
