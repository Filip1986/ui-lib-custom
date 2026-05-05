import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  PLATFORM_ID,
  inject,
  input,
} from '@angular/core';
import type { InputSignal, OnDestroy, OnInit } from '@angular/core';

/**
 * StyleClass directive — triggers CSS class-based enter/leave transitions on a
 * target element when the host is clicked.
 *
 * The target element is identified by the `uiLibStyleClass` input, which accepts:
 * - `@next`        — the next sibling of the host element
 * - `@prev`        — the previous sibling of the host element
 * - `@parent`      — the parent element
 * - `@grandparent` — the grandparent element
 * - Any valid CSS selector (resolved via `document.querySelector`)
 *
 * **Simple toggle mode** (set `toggleClass`):
 * ```html
 * <button [uiLibStyleClass]="'@next'" toggleClass="is-open">Toggle</button>
 * <div>Content</div>
 * ```
 *
 * **Full transition mode** (set enter/leave classes):
 * ```html
 * <button
 *   [uiLibStyleClass]="'@next'"
 *   enterFromClass="hidden"
 *   enterActiveClass="fade-in"
 *   leaveActiveClass="fade-out"
 *   leaveToClass="hidden"
 *   [hideOnOutsideClick]="true"
 * >
 *   Show Panel
 * </button>
 * <div class="hidden">Panel content</div>
 * ```
 */
@Directive({
  selector: '[uiLibStyleClass]',
  standalone: true,
  host: {
    class: 'ui-lib-style-class',
  },
})
export class StyleClass implements OnInit, OnDestroy {
  /**
   * Target selector. Accepts `@next`, `@prev`, `@parent`, `@grandparent`,
   * or any CSS selector string.
   */
  public readonly uiLibStyleClass: InputSignal<string> = input.required<string>();

  /** CSS class(es) applied to the target at the very start of the enter transition. */
  public readonly enterFromClass: InputSignal<string> = input<string>('');

  /** CSS class(es) added during the enter transition (e.g. a keyframe animation class). */
  public readonly enterActiveClass: InputSignal<string> = input<string>('');

  /** CSS class(es) applied to the target at the end of the enter transition. */
  public readonly enterToClass: InputSignal<string> = input<string>('');

  /**
   * CSS class(es) kept on the target after the enter transition finishes.
   * If empty, `enterToClass` is kept instead.
   */
  public readonly enterDoneClass: InputSignal<string> = input<string>('');

  /** CSS class(es) applied to the target at the very start of the leave transition. */
  public readonly leaveFromClass: InputSignal<string> = input<string>('');

  /** CSS class(es) added during the leave transition (e.g. a keyframe animation class). */
  public readonly leaveActiveClass: InputSignal<string> = input<string>('');

  /** CSS class(es) applied to the target at the end of the leave transition. */
  public readonly leaveToClass: InputSignal<string> = input<string>('');

  /**
   * CSS class(es) kept on the target after the leave transition finishes.
   * If empty, `leaveToClass` is kept instead.
   */
  public readonly leaveDoneClass: InputSignal<string> = input<string>('');

  /**
   * A single CSS class that is toggled on the target on every click.
   * When set, the full enter/leave lifecycle is bypassed.
   */
  public readonly toggleClass: InputSignal<string> = input<string>('');

  /**
   * When `true`, clicking anywhere outside the target element while it is in
   * the entered state triggers the leave transition (or removes `toggleClass`).
   */
  public readonly hideOnOutsideClick: InputSignal<boolean> = input<boolean>(false);

  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly document: Document = inject(DOCUMENT);
  private readonly platformId: object = inject(PLATFORM_ID);

  /** Whether the target is currently in the entered/open state. */
  private isEntered: boolean = false;

  /** Whether a transition animation is currently in progress. */
  private isAnimating: boolean = false;

  private clickListener: ((event: MouseEvent) => void) | null = null;
  private outsideClickListener: ((event: MouseEvent) => void) | null = null;

  /** @inheritdoc */
  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.ngZone.runOutsideAngular((): void => {
      this.clickListener = (event: MouseEvent): void => {
        this.onHostClick(event);
      };
      this.elementRef.nativeElement.addEventListener('click', this.clickListener as EventListener);
    });

    this.destroyRef.onDestroy((): void => {
      this.cleanup();
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.cleanup();
  }

  // ---------------------------------------------------------------------------
  // Public helpers (exposed for testing / programmatic control)
  // ---------------------------------------------------------------------------

  /**
   * Resolve the target element from the `uiLibStyleClass` selector input.
   * Returns `null` when the target cannot be found.
   */
  public resolveTarget(): HTMLElement | null {
    const host: HTMLElement = this.elementRef.nativeElement;
    const selectorValue: string = this.uiLibStyleClass();

    switch (selectorValue) {
      case '@next':
        return (host.nextElementSibling as HTMLElement | null) ?? null;
      case '@prev':
        return (host.previousElementSibling as HTMLElement | null) ?? null;
      case '@parent':
        return (host.parentElement as HTMLElement | null) ?? null;
      case '@grandparent':
        return (host.parentElement?.parentElement as HTMLElement | null) ?? null;
      default:
        return (this.document.querySelector(selectorValue) as HTMLElement | null) ?? null;
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private onHostClick(event: MouseEvent): void {
    event.stopPropagation();

    const target: HTMLElement | null = this.resolveTarget();
    if (!target) {
      return;
    }

    if (this.toggleClass()) {
      this.performToggle(target);
    } else if (this.isEntered) {
      this.performLeave(target);
    } else {
      this.performEnter(target);
    }
  }

  /** Toggle a single class — simple mode. */
  private performToggle(target: HTMLElement): void {
    const cssClass: string = this.toggleClass();
    if (!cssClass) {
      return;
    }

    const wasActive: boolean = target.classList.contains(cssClass);
    this.applyClasses(target, cssClass, !wasActive);
    this.isEntered = !wasActive;

    if (!wasActive && this.hideOnOutsideClick()) {
      this.bindOutsideClickListener(target);
    } else {
      this.unbindOutsideClickListener();
    }
  }

  /** Run the enter transition lifecycle on the target. */
  private performEnter(target: HTMLElement): void {
    if (this.isAnimating) {
      return;
    }

    // Remove leave-done class if present from a previous leave
    this.applyClasses(target, this.leaveDoneClass(), false);
    this.applyClasses(target, this.leaveToClass(), false);

    const fromClass: string = this.enterFromClass();
    const activeClass: string = this.enterActiveClass();
    const toClass: string = this.enterToClass();
    const doneClass: string = this.enterDoneClass();

    if (!fromClass && !activeClass && !toClass && !doneClass) {
      // No transition classes configured — nothing to do
      this.isEntered = true;
      return;
    }

    this.isAnimating = true;

    // Step 1: apply enterFromClass
    this.applyClasses(target, fromClass, true);

    requestAnimationFrame((): void => {
      // Step 2: swap enterFromClass → enterActiveClass + enterToClass
      this.applyClasses(target, fromClass, false);
      this.applyClasses(target, activeClass, true);
      this.applyClasses(target, toClass, true);

      this.onTransitionEnd(target, (): void => {
        // Step 3: finish enter
        this.applyClasses(target, activeClass, false);

        if (doneClass) {
          this.applyClasses(target, toClass, false);
          this.applyClasses(target, doneClass, true);
        }

        this.isAnimating = false;
        this.isEntered = true;

        if (this.hideOnOutsideClick()) {
          this.bindOutsideClickListener(target);
        }
      });
    });
  }

  /** Run the leave transition lifecycle on the target. */
  private performLeave(target: HTMLElement): void {
    if (this.isAnimating) {
      return;
    }

    this.unbindOutsideClickListener();

    // Remove enter-done class if present
    this.applyClasses(target, this.enterDoneClass(), false);
    this.applyClasses(target, this.enterToClass(), false);

    const fromClass: string = this.leaveFromClass();
    const activeClass: string = this.leaveActiveClass();
    const toClass: string = this.leaveToClass();
    const doneClass: string = this.leaveDoneClass();

    if (!fromClass && !activeClass && !toClass && !doneClass) {
      // No transition classes configured — nothing to do
      this.isEntered = false;
      return;
    }

    this.isAnimating = true;

    // Step 1: apply leaveFromClass
    this.applyClasses(target, fromClass, true);

    requestAnimationFrame((): void => {
      // Step 2: swap leaveFromClass → leaveActiveClass + leaveToClass
      this.applyClasses(target, fromClass, false);
      this.applyClasses(target, activeClass, true);
      this.applyClasses(target, toClass, true);

      this.onTransitionEnd(target, (): void => {
        // Step 3: finish leave
        this.applyClasses(target, activeClass, false);

        if (doneClass) {
          this.applyClasses(target, toClass, false);
          this.applyClasses(target, doneClass, true);
        }

        this.isAnimating = false;
        this.isEntered = false;
      });
    });
  }

  /**
   * Listen for the next `transitionend` or `animationend` on `target`,
   * then invoke `callback`. Falls back to invoking callback immediately
   * if neither event fires within a short timeout (for elements with no
   * transitions/animations defined, e.g. in test environments).
   */
  private onTransitionEnd(target: HTMLElement, callback: () => void): void {
    let fired: boolean = false;

    const finish: () => void = (): void => {
      if (fired) {
        return;
      }
      fired = true;
      target.removeEventListener('transitionend', finish);
      target.removeEventListener('animationend', finish);
      callback();
    };

    target.addEventListener('transitionend', finish, { once: true });
    target.addEventListener('animationend', finish, { once: true });

    // Fallback: if no transition/animation is defined, resolve after a tick
    // so the directive still works in environments without CSS transitions.
    setTimeout((): void => {
      finish();
    }, 500);
  }

  /** Bind an outside-click listener that triggers leave (or toggle off). */
  private bindOutsideClickListener(target: HTMLElement): void {
    this.unbindOutsideClickListener();

    this.ngZone.runOutsideAngular((): void => {
      this.outsideClickListener = (event: MouseEvent): void => {
        const clickedTarget: EventTarget | null = event.target;

        if (
          clickedTarget instanceof Node &&
          !target.contains(clickedTarget) &&
          !this.elementRef.nativeElement.contains(clickedTarget)
        ) {
          if (this.toggleClass()) {
            this.performToggle(target);
          } else {
            this.performLeave(target);
          }
        }
      };

      this.document.addEventListener('click', this.outsideClickListener as EventListener, {
        capture: true,
      });
    });
  }

  /** Remove the outside-click listener if bound. */
  private unbindOutsideClickListener(): void {
    if (this.outsideClickListener) {
      this.document.removeEventListener('click', this.outsideClickListener as EventListener, {
        capture: true,
      });
      this.outsideClickListener = null;
    }
  }

  /**
   * Add or remove space-separated CSS classes on the given element.
   * Empty/blank strings are silently ignored.
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

  /** Remove all listeners and cancel state. */
  private cleanup(): void {
    if (this.clickListener) {
      this.elementRef.nativeElement.removeEventListener(
        'click',
        this.clickListener as EventListener
      );
      this.clickListener = null;
    }

    this.unbindOutsideClickListener();
  }
}
