import { Directive, ElementRef, Renderer2, effect, inject, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
/**
 * Bind directive — dynamically applies a record of key-value pairs as DOM
 * properties on the host element.
 *
 * Equivalent to PrimeNG's `pBind` directive but built on Angular signal inputs.
 * Properties are applied via `Renderer2.setProperty`, which means standard DOM
 * properties (`id`, `title`, `tabIndex`, `hidden`, `aria-label`, etc.) all work
 * as expected. Removed keys (keys present in a previous value that are absent
 * from the new value) have their property reset to `null`.
 *
 * Usage:
 * ```html
 * <div [uiLibBind]="{ id: 'my-div', title: 'Hello world' }"></div>
 * <input [uiLibBind]="dynamicProps" />
 * ```
 */
@Directive({
  selector: '[uiLibBind]',
  standalone: true,
  host: {
    class: 'ui-lib-bind',
  },
})
export class Bind {
  /**
   * An object whose enumerable own properties are applied as DOM properties on
   * the host element. Pass an empty object (`{}`) to clear all previously bound
   * properties.
   */
  public readonly uiLibBind: InputSignal<Record<string, unknown>> = input<Record<string, unknown>>(
    {}
  );
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  /** Last values applied by this directive, used to detect safe removals. */
  private previousBindings: Record<string, unknown> = {};
  constructor() {
    effect((): void => {
      this.applyBindings(this.uiLibBind());
    });
  }

  private applyBindings(bindings: Record<string, unknown>): void {
    // Reset removed keys only when this directive still owns the current value.
    for (const [key, previousValue] of Object.entries(this.previousBindings)) {
      if (!(key in bindings) && this.getPropertyValue(key) === previousValue) {
        this.renderer.setProperty(this.elementRef.nativeElement, key, null);
      }
    }
    // Apply all current key-value pairs as DOM properties.
    for (const [key, value] of Object.entries(bindings)) {
      this.renderer.setProperty(this.elementRef.nativeElement, key, value);
    }
    this.previousBindings = { ...bindings };
  }

  private getPropertyValue(key: string): unknown {
    return Reflect.get(this.elementRef.nativeElement, key);
  }
}
