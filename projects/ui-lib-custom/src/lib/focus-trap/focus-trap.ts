import {
  Directive,
  ElementRef,
  booleanAttribute,
  effect,
  inject,
  input,
  isDevMode,
  untracked,
} from '@angular/core';
import type { InputSignal, InputSignalWithTransform, OnDestroy } from '@angular/core';
import { FocusTrap } from 'ui-lib-custom/core';
import type { FocusTrapOptions } from 'ui-lib-custom/core';

/**
 * FocusTrap directive — constrains keyboard focus within the host element.
 *
 * Applies a focus trap that intercepts Tab / Shift+Tab key events so focus
 * cycles only among the focusable descendants of the host. When deactivated
 * or destroyed, the trap is released and focus is restored to the element
 * that was active before the trap activated (configurable via `restoreFocus`).
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
 *
 * <!-- Focus a specific element on open -->
 * <div uiLibFocusTrap initialFocusSelector="#cancel-btn">…</div>
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

  /**
   * When `true` (default), the trap moves focus to the element matching
   * `initialFocusSelector`, or to the first focusable descendant, immediately
   * on activation. Set `false` when a parent component manages initial focus.
   */
  public readonly autoFocus: InputSignal<boolean> = input<boolean>(true);

  /**
   * CSS selector identifying the element that should receive focus when the
   * trap activates. Evaluated as `querySelector` on the host element.
   * Falls back to the first focusable descendant when no match is found.
   * Only used when `autoFocus` is `true`.
   *
   * In dev mode a console warning is emitted if no matching element is found.
   *
   * Example: `initialFocusSelector="#cancel-btn"`
   */
  public readonly initialFocusSelector: InputSignal<string | null> = input<string | null>(null);

  /**
   * When `true` (default), deactivating the trap returns focus to whichever
   * element was active before the trap activated.
   * Set `false` when the activating element will no longer exist after close.
   */
  public readonly restoreFocus: InputSignal<boolean> = input<boolean>(true);

  /**
   * Extra CSS class name(s) added to each sentinel `<span>` element.
   * Primarily useful for debugging — add a class and style the sentinels to
   * make them visible during development.
   *
   * Example: `sentinelClass="debug-sentinel"` then
   * `.debug-sentinel { opacity: 1 !important; outline: 2px solid red; }`
   */
  public readonly sentinelClass: InputSignal<string | null> = input<string | null>(null);

  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  private trap: FocusTrap | null = null;

  constructor() {
    effect((): void => {
      if (this.uiLibFocusTrap()) {
        this.activateTrap();
      } else {
        this.deactivateTrap();
      }
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.deactivateTrap();
    this.trap = null;
  }

  private activateTrap(): void {
    if (!this.trap) {
      this.trap = new FocusTrap(this.elementRef.nativeElement);
    }

    const selector: string | null = untracked(this.initialFocusSelector);

    if (isDevMode() && selector) {
      const match: Element | null = this.elementRef.nativeElement.querySelector(selector);
      if (!match) {
        console.warn(
          `[uiLibFocusTrap] initialFocusSelector "${selector}" did not match any element ` +
            `within the trap container. Falling back to first focusable descendant.`,
        );
      }
    }

    const options: FocusTrapOptions = {
      autoFocus: untracked(this.autoFocus),
      initialFocusSelector: selector,
      restoreFocus: untracked(this.restoreFocus),
      sentinelClass: untracked(this.sentinelClass),
    };

    this.trap.activate(options);
  }

  private deactivateTrap(): void {
    this.trap?.deactivate();
  }
}
