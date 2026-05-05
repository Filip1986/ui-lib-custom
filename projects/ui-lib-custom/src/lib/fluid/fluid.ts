import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  booleanAttribute,
  computed,
  input,
  ViewEncapsulation,
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
} from '@angular/core';

/**
 * FluidDirective — applies the `ui-lib-fluid` CSS class to any host element.
 *
 * When the host element carries `.ui-lib-fluid`, all descendant form controls
 * (inputs, textareas, selects, buttons, and `ui-lib-*` components) are stretched
 * to full width via the cascade.
 *
 * Usage:
 * ```html
 * <!-- Always fluid (attribute presence = true) -->
 * <div uiLibFluid>…</div>
 *
 * <!-- Conditionally fluid -->
 * <div [uiLibFluid]="isFluid">…</div>
 * ```
 */
@Directive({
  selector: '[uiLibFluid]',
  standalone: true,
  host: {
    '[class.ui-lib-fluid]': 'uiLibFluid()',
  },
})
export class FluidDirective {
  /**
   * When `true` (default), the `ui-lib-fluid` class is added to the host element,
   * making its descendant form controls take full width.
   * Supports attribute-only usage — `<div uiLibFluid>` is equivalent to
   * `[uiLibFluid]="true"`.
   */
  public readonly uiLibFluid: InputSignalWithTransform<boolean, boolean | string> = input<
    boolean,
    boolean | string
  >(true, { transform: booleanAttribute });
}

/**
 * Fluid — layout wrapper that stretches all descendant form controls to full width.
 *
 * Renders a block container with the `ui-lib-fluid` CSS class applied. Any
 * `<input>`, `<textarea>`, `<select>`, `<button>`, or `ui-lib-*` form component
 * nested inside will expand to 100 % of the available width.
 *
 * For applying fluid behaviour to an existing element without an extra wrapper,
 * use the {@link FluidDirective} (`[uiLibFluid]`) attribute directive instead.
 *
 * @example
 * ```html
 * <!-- Wrap a form so every field is full-width -->
 * <ui-lib-fluid>
 *   <input type="text" placeholder="Name" />
 *   <ui-lib-button label="Submit" />
 * </ui-lib-fluid>
 *
 * <!-- Directive form — no extra DOM element -->
 * <form uiLibFluid>
 *   <input type="email" placeholder="Email" />
 * </form>
 * ```
 */
@Component({
  selector: 'ui-lib-fluid',
  standalone: true,
  templateUrl: './fluid.html',
  styleUrl: './fluid.scss',
  host: {
    '[class]': 'hostClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Fluid {
  /** Additional CSS classes to attach to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Computed host CSS classes. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-fluid'];
    const extra: string | null = this.styleClass();
    if (extra) {
      classes.push(extra);
    }
    return classes.join(' ');
  });
}
