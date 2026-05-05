import { Directive, ElementRef, booleanAttribute, effect, inject, input } from '@angular/core';
import type { InputSignalWithTransform, OnDestroy } from '@angular/core';
import { FocusTrap } from 'ui-lib-custom/core';

/**
 * FocusTrap directive — constrains keyboard focus within the host element.
 *
 * Applies a focus trap that intercepts Tab / Shift+Tab key events so focus
 * cycles only among the focusable descendants of the host. When deactivated
 * or destroyed, the trap is released and focus is restored to the element
 * that was active before the trap activated.
 *
 * The underlying `FocusTrap` class lives in `ui-lib-custom/core` and is also
 * used directly by Dialog and other overlay components.
 *
 * Usage:
 * ```html
 * <!-- Always active (attribute presence = true) -->
 * <div uiLibFocusTrap>…</div>
 *
 * <!-- Conditionally active -->
 * <div [uiLibFocusTrap]="isModalOpen">…</div>
 * ```
 */
@Directive({
  selector: '[uiLibFocusTrap]',
  standalone: true,
  host: {
    class: 'ui-lib-focus-trap',
  },
})
export class FocusTrapDirective implements OnDestroy {
  /**
   * When `true` (default), focus is trapped inside the host element.
   * Supports attribute-only usage — `<div uiLibFocusTrap>` is equivalent to
   * `[uiLibFocusTrap]="true"`. Set to `false` to deactivate at runtime.
   */
  public readonly uiLibFocusTrap: InputSignalWithTransform<boolean, boolean | string> = input<
    boolean,
    boolean | string
  >(true, { transform: booleanAttribute });

  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  private trap: FocusTrap | null = null;

  constructor() {
    effect((): void => {
      if (this.uiLibFocusTrap()) {
        this.activate();
      } else {
        this.deactivate();
      }
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.deactivate();
    this.trap = null;
  }

  private activate(): void {
    if (!this.trap) {
      this.trap = new FocusTrap(this.elementRef.nativeElement);
    }
    this.trap.activate();
  }

  private deactivate(): void {
    this.trap?.deactivate();
  }
}
