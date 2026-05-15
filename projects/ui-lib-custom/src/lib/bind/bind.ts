import { Directive, ElementRef, Renderer2, effect, inject, input } from '@angular/core';
import type { InputSignal } from '@angular/core';
/**
 * Bind directive — dynamically applies a record of key-value pairs as DOM
 * properties on the host element.
 *
 * Equivalent to PrimeNG's `pBind` directive but built on Angular signal inputs.
 * Properties are applied via `Renderer2.setProperty`, which means standard DOM
 * properties (`id`, `title`, `tabIndex`, `hidden`, `ariaLabel`, etc.) all work
 * as expected. Use DOM property names instead of attribute names (`tabIndex`,
 * not `tabindex`; `ariaLabel`, not `aria-label`). For convenience, kebab-case
 * `aria-*` keys are normalized to their reflected DOM property equivalents
 * before being applied. Removed keys (keys present in a previous value that are
 * absent from the new value) have their property reset to `null`.
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
   * the host element. Use DOM property names (`tabIndex`, `ariaHidden`,
   * `htmlFor`) rather than lowercase attribute names (`tabindex`, `aria-hidden`,
   * `for`). `Record<string, unknown>` is intentionally broad so callers can
   * supply any valid native/custom host property. Pass an empty object (`{}`)
   * or set an individual key to `null` to clear previously bound properties.
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
    const normalizedBindings: Record<string, unknown> = this.normalizeBindings(bindings);

    // Reset removed keys only when this directive still owns the current value.
    for (const [key, previousValue] of Object.entries(this.previousBindings)) {
      if (!(key in normalizedBindings) && this.getPropertyValue(key) === previousValue) {
        this.renderer.setProperty(this.elementRef.nativeElement, key, null);
      }
    }
    // Apply all current key-value pairs as DOM properties.
    for (const [key, value] of Object.entries(normalizedBindings)) {
      this.renderer.setProperty(this.elementRef.nativeElement, key, value);
    }
    this.previousBindings = normalizedBindings;
  }

  private getPropertyValue(key: string): unknown {
    return Reflect.get(this.elementRef.nativeElement, key);
  }

  private normalizeBindings(bindings: Record<string, unknown>): Record<string, unknown> {
    const normalizedBindings: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(bindings)) {
      normalizedBindings[this.normalizePropertyKey(key)] = value;
    }

    return normalizedBindings;
  }

  private normalizePropertyKey(key: string): string {
    if (!key.startsWith('aria-')) {
      return key;
    }

    return key.replace(/-([a-z])/g, (_match: string, character: string): string =>
      character.toUpperCase()
    );
  }
}
