import { Directive, ElementRef, NgZone, inject, input } from '@angular/core';
import type { InputSignal, OnDestroy, OnInit } from '@angular/core';

/**
 * Ripple directive — adds a Material-style circular ripple effect to any element on click.
 *
 * The host element is given `position: relative` and `overflow: hidden` automatically
 * via the `ui-lib-ripple` CSS class so the wave is clipped inside the element bounds.
 *
 * Usage:
 * ```html
 * <button uiLibRipple>Click me</button>
 * <div uiLibRipple [rippleColor]="'rgba(0,0,0,0.12)'">Custom color</div>
 * ```
 */
@Directive({
  selector: '[uiLibRipple]',
  standalone: true,
  host: {
    class: 'ui-lib-ripple',
  },
})
export class Ripple implements OnInit, OnDestroy {
  /** When `true`, no ripple wave is produced on click. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /**
   * Override the CSS variable `--uilib-ripple-color` inline.
   * Accepts any valid CSS colour value (e.g. `'rgba(0,0,0,0.12)'`).
   * If not provided, the CSS variable value is used.
   */
  public readonly rippleColor: InputSignal<string> = input<string>('');

  /**
   * Override the animation duration inline (e.g. `'500ms'`).
   * If not provided, the CSS variable `--uilib-ripple-duration` value is used.
   */
  public readonly rippleDuration: InputSignal<string> = input<string>('');

  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone: NgZone = inject(NgZone);

  private clickListener: ((event: MouseEvent) => void) | null = null;

  /** @inheritdoc */
  public ngOnInit(): void {
    this.ngZone.runOutsideAngular((): void => {
      this.clickListener = (event: MouseEvent): void => {
        this.onHostClick(event);
      };
      this.elementRef.nativeElement.addEventListener('click', this.clickListener as EventListener);
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    if (this.clickListener) {
      this.elementRef.nativeElement.removeEventListener(
        'click',
        this.clickListener as EventListener
      );
      this.clickListener = null;
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /** Handle a click on the host element. */
  private onHostClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }
    this.spawnWave(event);
  }

  /** Create, position, animate, and clean up a single ripple wave element. */
  private spawnWave(event: MouseEvent): void {
    const host: HTMLElement = this.elementRef.nativeElement;
    const rect: DOMRect = host.getBoundingClientRect();

    const diameter: number = Math.max(host.offsetWidth, host.offsetHeight);
    const radius: number = diameter / 2;

    const wave: HTMLSpanElement = document.createElement('span');
    wave.classList.add('ui-lib-ripple-wave');

    wave.style.width = `${diameter}px`;
    wave.style.height = `${diameter}px`;
    wave.style.left = `${event.clientX - rect.left - radius}px`;
    wave.style.top = `${event.clientY - rect.top - radius}px`;

    const color: string = this.rippleColor();
    if (color) {
      wave.style.setProperty('--uilib-ripple-color', color);
    }

    const duration: string = this.rippleDuration();
    if (duration) {
      wave.style.setProperty('--uilib-ripple-duration', duration);
    }

    host.appendChild(wave);

    wave.addEventListener(
      'animationend',
      (): void => {
        wave.remove();
      },
      { once: true }
    );
  }
}
