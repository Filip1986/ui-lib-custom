import { Directive, ElementRef, inject, input, NgZone } from '@angular/core';
import type { InputSignal, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type { TooltipEvent, TooltipPosition, TooltipVariant } from './tooltip.types';

let tooltipIdCounter: number = 0;

/** Grace period (ms) to allow the CSS hide transition to complete before removing the element. */
const TOOLTIP_CLEANUP_DELAY_MS: number = 250;

/**
 * Tooltip directive — attaches a floating label to any host element.
 *
 * The tooltip element is appended to `document.body` and positioned with
 * `position: fixed`, so it escapes any `overflow: hidden` ancestors.
 * Import `tooltip.scss` once in your global stylesheet.
 *
 * @example
 * <button uiLibTooltip="Save document">Save</button>
 * <input uiLibTooltip="Enter your username" tooltipEvent="focus" />
 * <span uiLibTooltip="Right side" tooltipPosition="right">Hover me</span>
 */
@Directive({
  selector: '[uiLibTooltip]',
  standalone: true,
})
export class Tooltip implements OnInit, OnDestroy {
  /** The tooltip label text. An empty string suppresses the tooltip. */
  public readonly uiLibTooltip: InputSignal<string> = input<string>('');

  /** Position of the tooltip relative to the host element. Defaults to `'top'`. */
  public readonly tooltipPosition: InputSignal<TooltipPosition> = input<TooltipPosition>('top');

  /** Which events trigger the tooltip. Defaults to `'hover'`. */
  public readonly tooltipEvent: InputSignal<TooltipEvent> = input<TooltipEvent>('hover');

  /** Delay in milliseconds before the tooltip appears after a trigger event. */
  public readonly showDelay: InputSignal<number> = input<number>(0);

  /** Delay in milliseconds before the tooltip disappears after a hide event. */
  public readonly hideDelay: InputSignal<number> = input<number>(0);

  /** When `true`, the tooltip is never shown regardless of events. */
  public readonly tooltipDisabled: InputSignal<boolean> = input<boolean>(false);

  /** Design variant override. Falls back to `ThemeConfigService` when `null`. */
  public readonly tooltipVariant: InputSignal<TooltipVariant | null> = input<TooltipVariant | null>(
    null
  );

  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly document: Document = inject(DOCUMENT);

  /** Unique ID used for `aria-describedby` linking. */
  public readonly tooltipId: string;

  private tooltipElement: HTMLElement | null = null;
  private isVisible: boolean = false;
  private lastPosition: TooltipPosition = 'top';
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private cleanupTimer: ReturnType<typeof setTimeout> | null = null;

  private mouseEnterListener: (() => void) | null = null;
  private mouseLeaveListener: (() => void) | null = null;
  private focusListener: (() => void) | null = null;
  private blurListener: (() => void) | null = null;
  private keydownListener: ((event: KeyboardEvent) => void) | null = null;

  constructor() {
    this.tooltipId = `ui-lib-tooltip-${++tooltipIdCounter}`;
  }

  public ngOnInit(): void {
    this.ngZone.runOutsideAngular((): void => {
      this.setupListeners();
    });
  }

  public ngOnDestroy(): void {
    this.clearAllTimers();
    this.teardownListeners();
    this.elementRef.nativeElement.removeAttribute('aria-describedby');
    this.destroyTooltipElement();
  }

  /**
   * Binds DOM event listeners based on the current `tooltipEvent` input value.
   * Called once at ngOnInit. Listener configuration does NOT reactively update
   * if `tooltipEvent` changes after initialization — this is by design (static setup).
   *
   * WCAG 1.4.13: any event mode that includes hover MUST also include focus/blur so
   * keyboard users see the same tooltip as mouse users. The `'hover'` default therefore
   * binds both mouseenter/mouseleave AND focus/blur.
   */
  private setupListeners(): void {
    const host: HTMLElement = this.elementRef.nativeElement;
    const event: TooltipEvent = this.tooltipEvent();

    if (event === 'hover' || event === 'both') {
      this.mouseEnterListener = (): void => {
        this.scheduleShow();
      };
      this.mouseLeaveListener = (): void => {
        this.scheduleHide();
      };
      host.addEventListener('mouseenter', this.mouseEnterListener);
      host.addEventListener('mouseleave', this.mouseLeaveListener);
    }

    // WCAG 1.4.13 — all event modes must also bind focus/blur.
    // 'hover' alone satisfies mouse users but fails keyboard users. Binding focus/blur
    // for every mode ensures keyboard users always get the same tooltip as mouse users.
    this.focusListener = (): void => {
      this.scheduleShow();
    };
    this.blurListener = (): void => {
      this.scheduleHide();
    };
    host.addEventListener('focus', this.focusListener);
    host.addEventListener('blur', this.blurListener);

    this.keydownListener = (keyEvent: KeyboardEvent): void => {
      if (keyEvent.key === 'Escape' && this.isVisible) {
        this.cancelShowTimers();
        this.cancelHideTimers();
        this.hideTooltipImmediately();
      }
    };
    this.document.addEventListener('keydown', this.keydownListener);
  }

  private teardownListeners(): void {
    const host: HTMLElement = this.elementRef.nativeElement;
    if (this.mouseEnterListener) {
      host.removeEventListener('mouseenter', this.mouseEnterListener);
      this.mouseEnterListener = null;
    }
    if (this.mouseLeaveListener) {
      host.removeEventListener('mouseleave', this.mouseLeaveListener);
      this.mouseLeaveListener = null;
    }
    if (this.focusListener) {
      host.removeEventListener('focus', this.focusListener);
      this.focusListener = null;
    }
    if (this.blurListener) {
      host.removeEventListener('blur', this.blurListener);
      this.blurListener = null;
    }
    if (this.keydownListener) {
      this.document.removeEventListener('keydown', this.keydownListener);
      this.keydownListener = null;
    }
  }

  private scheduleShow(): void {
    this.cancelHideTimers();
    const delay: number = this.showDelay();
    if (delay > 0) {
      this.showTimer = setTimeout((): void => {
        this.showTooltipImmediately();
      }, delay);
    } else {
      this.showTooltipImmediately();
    }
  }

  private scheduleHide(): void {
    this.cancelShowTimers();
    const delay: number = this.hideDelay();
    if (delay > 0) {
      this.hideTimer = setTimeout((): void => {
        this.hideTooltipImmediately();
      }, delay);
    } else {
      this.hideTooltipImmediately();
    }
  }

  private showTooltipImmediately(): void {
    if (this.tooltipDisabled() || !this.uiLibTooltip()) {
      return;
    }
    if (this.isVisible) {
      this.refreshTooltipContent();
      return;
    }

    this.cancelCleanupTimer();
    this.ensureTooltipElement();
    const position: TooltipPosition = this.applyClasses();
    this.positionTooltip(position);

    requestAnimationFrame((): void => {
      if (this.tooltipElement) {
        this.tooltipElement.classList.add('ui-lib-tooltip--visible');
      }
    });

    this.isVisible = true;
    this.elementRef.nativeElement.setAttribute('aria-describedby', this.tooltipId);
  }

  private hideTooltipImmediately(): void {
    if (!this.isVisible) {
      return;
    }
    if (this.tooltipElement) {
      this.tooltipElement.classList.remove('ui-lib-tooltip--visible');
    }
    this.isVisible = false;
    this.elementRef.nativeElement.removeAttribute('aria-describedby');

    this.cleanupTimer = setTimeout((): void => {
      this.destroyTooltipElement();
    }, TOOLTIP_CLEANUP_DELAY_MS);
  }

  private ensureTooltipElement(): void {
    if (this.tooltipElement) {
      return;
    }
    const el: HTMLDivElement = this.document.createElement('div');
    el.setAttribute('role', 'tooltip');
    el.setAttribute('id', this.tooltipId);

    const arrow: HTMLDivElement = this.document.createElement('div');
    arrow.className = 'ui-lib-tooltip__arrow';
    arrow.setAttribute('aria-hidden', 'true');

    const text: HTMLDivElement = this.document.createElement('div');
    text.className = 'ui-lib-tooltip__text';

    el.appendChild(arrow);
    el.appendChild(text);
    this.document.body.appendChild(el);
    this.tooltipElement = el;
  }

  /** Set variant + position classes; returns the resolved position. */
  private applyClasses(): TooltipPosition {
    if (!this.tooltipElement) {
      return this.tooltipPosition();
    }
    const variant: TooltipVariant = this.tooltipVariant() ?? this.themeConfig.variant();
    const position: TooltipPosition = this.tooltipPosition();
    this.lastPosition = position;
    this.tooltipElement.className = `ui-lib-tooltip ui-lib-tooltip--${variant} ui-lib-tooltip--pos-${position}`;

    const textEl: HTMLElement | null =
      this.tooltipElement.querySelector<HTMLElement>('.ui-lib-tooltip__text');
    if (textEl) {
      textEl.textContent = this.uiLibTooltip();
    }
    return position;
  }

  /** Update text and variant while the tooltip is already visible. */
  private refreshTooltipContent(): void {
    if (!this.tooltipElement) {
      return;
    }
    const variant: TooltipVariant = this.tooltipVariant() ?? this.themeConfig.variant();
    this.tooltipElement.className = [
      'ui-lib-tooltip',
      `ui-lib-tooltip--${variant}`,
      `ui-lib-tooltip--pos-${this.lastPosition}`,
      'ui-lib-tooltip--visible',
    ].join(' ');

    const textEl: HTMLElement | null =
      this.tooltipElement.querySelector<HTMLElement>('.ui-lib-tooltip__text');
    if (textEl) {
      textEl.textContent = this.uiLibTooltip();
    }
  }

  private positionTooltip(requestedPosition: TooltipPosition): void {
    if (!this.tooltipElement) {
      return;
    }
    const host: HTMLElement = this.elementRef.nativeElement;
    const el: HTMLElement = this.tooltipElement;

    // Off-screen measurement
    el.style.visibility = 'hidden';
    el.style.top = '-9999px';
    el.style.left = '-9999px';

    const hostRect: DOMRect = host.getBoundingClientRect();
    const tooltipRect: DOMRect = el.getBoundingClientRect();
    const viewportWidth: number = this.document.defaultView?.innerWidth ?? 0;
    const viewportHeight: number = this.document.defaultView?.innerHeight ?? 0;
    const gap: number = 8;

    const position: TooltipPosition = this.resolvePosition(
      requestedPosition,
      hostRect,
      tooltipRect,
      viewportWidth,
      viewportHeight,
      gap
    );

    // Update class if position flipped
    if (position !== requestedPosition) {
      el.className = el.className.replace(
        `ui-lib-tooltip--pos-${requestedPosition}`,
        `ui-lib-tooltip--pos-${position}`
      );
      this.lastPosition = position;
    }

    let top: number;
    let left: number;

    if (position === 'top') {
      top = hostRect.top - tooltipRect.height - gap;
      left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
    } else if (position === 'bottom') {
      top = hostRect.bottom + gap;
      left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
    } else if (position === 'left') {
      top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
      left = hostRect.left - tooltipRect.width - gap;
    } else {
      top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
      left = hostRect.right + gap;
    }

    const padding: number = 4;
    left = Math.max(padding, Math.min(left, viewportWidth - tooltipRect.width - padding));
    top = Math.max(padding, Math.min(top, viewportHeight - tooltipRect.height - padding));

    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.visibility = '';
  }

  /** Flip the requested position when there is not enough viewport space. */
  private resolvePosition(
    requested: TooltipPosition,
    hostRect: DOMRect,
    tooltipRect: DOMRect,
    viewportWidth: number,
    viewportHeight: number,
    gap: number
  ): TooltipPosition {
    // When tooltip has no measurable dimensions (e.g. jsdom, display:none), keep requested position.
    if (tooltipRect.width === 0 && tooltipRect.height === 0) {
      return requested;
    }

    const neededHeight: number = tooltipRect.height + gap;
    const neededWidth: number = tooltipRect.width + gap;

    if (requested === 'top' && hostRect.top < neededHeight) {
      return viewportHeight - hostRect.bottom >= neededHeight ? 'bottom' : requested;
    }
    if (requested === 'bottom' && viewportHeight - hostRect.bottom < neededHeight) {
      return hostRect.top >= neededHeight ? 'top' : requested;
    }
    if (requested === 'left' && hostRect.left < neededWidth) {
      return viewportWidth - hostRect.right >= neededWidth ? 'right' : requested;
    }
    if (requested === 'right' && viewportWidth - hostRect.right < neededWidth) {
      return hostRect.left >= neededWidth ? 'left' : requested;
    }
    return requested;
  }

  private destroyTooltipElement(): void {
    if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }

  private clearAllTimers(): void {
    this.cancelShowTimers();
    this.cancelHideTimers();
    this.cancelCleanupTimer();
  }

  private cancelShowTimers(): void {
    if (this.showTimer !== null) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
  }

  private cancelHideTimers(): void {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }

  private cancelCleanupTimer(): void {
    if (this.cleanupTimer !== null) {
      clearTimeout(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }
}
