import { NgTemplateOutlet } from '@angular/common';
import type {
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import type { KnobChangeEvent, KnobSize, KnobValueContext, KnobVariant } from './knob.types';
import { KNOB_DEFAULTS, KNOB_SVG } from './knob.types';

/** Counter for generating unique IDs. */
let knobIdCounter: number = 0;

/**
 * Knob — a circular dial form control for selecting a numeric value.
 * Supports drag interaction, keyboard navigation, CVA (ngModel + reactive forms),
 * three design variants, three sizes, and full CSS-variable theming.
 */
@Component({
  selector: 'ui-lib-knob',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './knob.component.html',
  styleUrl: './knob.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof KnobComponent => KnobComponent),
      multi: true,
    },
  ],
  host: {
    class: 'ui-lib-knob',
    role: 'slider',
    '[attr.id]': 'inputId()',
    '[attr.tabindex]': 'effectiveTabindex()',
    '[attr.aria-label]': 'resolvedAriaLabel()',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'clampedValue()',
    '[attr.aria-valuetext]': 'getValueText()',
    '[attr.aria-disabled]': 'isControlDisabled() ? "true" : null',
    '[attr.aria-readonly]': 'readonly() ? "true" : null',
    '(focus)': 'onFocusEvent($event)',
    '(blur)': 'onBlurEvent($event)',
    '(keydown)': 'onKeyDown($event)',
    '(pointerdown)': 'onPointerDown($event)',
    '[class.ui-lib-knob--sm]': 'size() === "sm"',
    '[class.ui-lib-knob--md]': 'size() === "md"',
    '[class.ui-lib-knob--lg]': 'size() === "lg"',
    '[class.ui-lib-knob--disabled]': 'isControlDisabled()',
    '[class.ui-lib-knob--readonly]': 'readonly()',
    '[class.ui-lib-knob--focused]': 'isFocused()',
    '[class.ui-lib-knob--material]': 'effectiveVariant() === "material"',
    '[class.ui-lib-knob--bootstrap]': 'effectiveVariant() === "bootstrap"',
    '[class.ui-lib-knob--minimal]': 'effectiveVariant() === "minimal"',
    '[style.--uilib-knob-range-color-override]': 'valueColor() || null',
    '[style.--uilib-knob-text-color-override]': 'textColor() || null',
    '[class]': 'styleClass()',
  },
})
export class KnobComponent implements ControlValueAccessor {
  // ---------------------------------------------------------------------------
  // Public inputs
  // ---------------------------------------------------------------------------

  /** Current value. Two-way bindable via [(value)] or ngModel. */
  public readonly value: ModelSignal<number> = model<number>(0);

  /** Minimum allowed value. */
  public readonly min: InputSignal<number> = input<number>(KNOB_DEFAULTS.min);

  /** Maximum allowed value. */
  public readonly max: InputSignal<number> = input<number>(KNOB_DEFAULTS.max);

  /** Increment/decrement step for keyboard interaction and drag snapping. */
  public readonly step: InputSignal<number> = input<number>(KNOB_DEFAULTS.step);

  /** Component size token. */
  public readonly size: InputSignal<KnobSize> = input<KnobSize>(KNOB_DEFAULTS.size);

  /**
   * Design variant override. When null the active global theme variant is used.
   * Accepts 'material' | 'bootstrap' | 'minimal'.
   */
  public readonly variant: InputSignal<KnobVariant | null> = input<KnobVariant | null>(null);

  /** Width of the SVG arc stroke in SVG user-unit coordinates. */
  public readonly strokeWidth: InputSignal<number> = input<number>(KNOB_DEFAULTS.strokeWidth);

  /** Whether to render the numeric value label inside the dial. */
  public readonly showValue: InputSignal<boolean> = input<boolean>(KNOB_DEFAULTS.showValue);

  /**
   * Optional value format template. Use `{value}` as a placeholder for the number.
   * Example: `'{value}%'` renders `42%`.
   */
  public readonly valueTemplate: InputSignal<string | null> = input<string | null>(null);

  /** Inline color override for the value (range) arc stroke. Accepts any CSS color. */
  public readonly valueColor: InputSignal<string | null> = input<string | null>(null);

  /** Inline color override for the center value text label. Accepts any CSS color. */
  public readonly textColor: InputSignal<string | null> = input<string | null>(null);

  /** Whether the knob is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(KNOB_DEFAULTS.disabled);

  /** Whether the knob is read-only (interactive but value does not change). */
  public readonly readonly: InputSignal<boolean> = input<boolean>(KNOB_DEFAULTS.readonly);

  /** Accessible label for the dial element. Falls back to i18n `knob.dial` when null. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Additional CSS classes applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Tab index for keyboard focus. */
  public readonly tabindex: InputSignal<number> = input<number>(KNOB_DEFAULTS.tabindex);

  /** Unique HTML id forwarded to the SVG element. */
  public readonly inputId: InputSignal<string> = input<string>(`ui-lib-knob-${++knobIdCounter}`);

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Emits whenever the value changes due to user interaction. */
  public readonly knobChange: OutputEmitterRef<KnobChangeEvent> = output<KnobChangeEvent>();

  /** Emits when the knob receives focus. */
  public readonly knobFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  /** Emits when the knob loses focus. */
  public readonly knobBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  // ---------------------------------------------------------------------------
  // Content children (typed template slots)
  // ---------------------------------------------------------------------------

  /**
   * Optional custom template for the value label rendered inside the dial.
   *
   * Context: `{ $implicit: number, formattedValue: string, normalized: number }`.
   *
   * @example
   * ```html
   * <ui-lib-knob [value]="vol">
   *   <ng-template #valueLabel let-v let-f="formattedValue">
   *     <tspan>{{ f }}dB</tspan>
   *   </ng-template>
   * </ui-lib-knob>
   * ```
   */
  public readonly valueLabelTemplate: Signal<TemplateRef<KnobValueContext> | undefined> =
    contentChild<TemplateRef<KnobValueContext>>('valueLabel');

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  protected readonly isFocused: WritableSignal<boolean> = signal<boolean>(false);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  /** Drag state – recorded on pointerdown. */
  private dragStartY: number = 0;
  private dragStartValue: number = 0;
  private isDragging: boolean = false;
  private pendingPointerY: number | null = null;
  private dragAnimationFrameId: number | null = null;

  /** Bound listener references so they can be removed cleanly. */
  private readonly boundPointerMove: (event: PointerEvent) => void = (
    event: PointerEvent,
  ): void => {
    this.onPointerMove(event);
  };
  private readonly boundPointerUp: (event: PointerEvent) => void = (): void => {
    this.onPointerUp();
  };

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  // ---------------------------------------------------------------------------
  // Derived / computed signals
  // ---------------------------------------------------------------------------

  /** Active variant, falling back to the global theme variant. */
  protected readonly effectiveVariant: Signal<KnobVariant> = computed<KnobVariant>(
    (): KnobVariant => this.variant() ?? this.themeConfig.variant(),
  );

  /**
   * Resolved aria-label: uses the explicit `ariaLabel` input if provided,
   * otherwise falls back to the i18n `knob.dial` translation key.
   */
  protected readonly resolvedAriaLabel: Signal<string | null> = computed<string | null>(
    (): string | null => this.ariaLabel() ?? this.i18n.translate('knob.dial'),
  );

  /** Template context emitted to the `#valueLabel` slot. */
  protected readonly valueLabelContext: Signal<KnobValueContext> = computed<KnobValueContext>(
    (): KnobValueContext => ({
      $implicit: this.clampedValue(),
      formattedValue: this.formattedValue(),
      normalized: this.normalizedValue(),
    }),
  );

  /** Value clamped within [min, max]. */
  protected readonly clampedValue: Signal<number> = computed<number>((): number =>
    this.clamp(this.value()),
  );

  /** Normalised value in the 0..1 range. */
  protected readonly normalizedValue: Signal<number> = computed<number>((): number => {
    const range: number = this.max() - this.min();
    if (range === 0) {
      return 0;
    }
    return (this.clampedValue() - this.min()) / range;
  });

  /** True when interaction should be suppressed. */
  protected readonly isControlDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled(),
  );

  /** Whether the control can be interacted with. */
  protected readonly isInteractive: Signal<boolean> = computed<boolean>(
    (): boolean => !this.isControlDisabled() && !this.readonly(),
  );

  /** Tabindex forwarded to the SVG — disabled controls are removed from tab order. */
  protected readonly effectiveTabindex: Signal<number> = computed<number>((): number =>
    this.isControlDisabled() ? -1 : this.tabindex(),
  );

  /** Human-readable value used for aria-valuetext. */
  public getValueText(): string {
    return this.formattedValue();
  }

  /** SVG `d` attribute for the full 270° track arc. */
  protected readonly trackPath: Signal<string> = computed<string>((): string => {
    const startCoords: { x: number; y: number } = this.arcCoords(KNOB_SVG.startAngleDeg);
    // End angle: startAngle + totalArc, wrapped into a position different from start
    const endAngleDeg: number = KNOB_SVG.startAngleDeg + KNOB_SVG.totalArcDeg;
    const endCoords: { x: number; y: number } = this.arcCoords(endAngleDeg);
    const radius: number = KNOB_SVG.radius;
    // 270° > 180° → large-arc-flag = 1; clockwise → sweep-flag = 1
    return `M ${this.round(startCoords.x)} ${this.round(startCoords.y)} A ${radius} ${radius} 0 1 1 ${this.round(endCoords.x)} ${this.round(endCoords.y)}`;
  });

  /** SVG `d` attribute for the partial arc representing the current value. */
  protected readonly rangePath: Signal<string> = computed<string>((): string => {
    const normalized: number = this.normalizedValue();
    if (normalized <= 0) {
      return '';
    }

    const startCoords: { x: number; y: number } = this.arcCoords(KNOB_SVG.startAngleDeg);
    const rangeAngleDeg: number = KNOB_SVG.startAngleDeg + normalized * KNOB_SVG.totalArcDeg;
    const endCoords: { x: number; y: number } = this.arcCoords(rangeAngleDeg);
    const radius: number = KNOB_SVG.radius;
    const largeArcFlag: 0 | 1 = normalized * KNOB_SVG.totalArcDeg > 180 ? 1 : 0;
    return `M ${this.round(startCoords.x)} ${this.round(startCoords.y)} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${this.round(endCoords.x)} ${this.round(endCoords.y)}`;
  });

  /** Formatted value label shown inside the dial. */
  protected readonly formattedValue: Signal<string> = computed<string>((): string => {
    const template: string | null = this.valueTemplate();
    const currentValue: number = this.clampedValue();
    if (template !== null) {
      return template.replace('{value}', String(currentValue));
    }
    return String(currentValue);
  });

  constructor() {
    // Remove global pointer listeners if the component is destroyed mid-drag
    this.destroyRef.onDestroy((): void => {
      this.clearDragAnimationFrame();
      this.removeGlobalPointerListeners();
    });
  }

  // ---------------------------------------------------------------------------
  // ControlValueAccessor
  // ---------------------------------------------------------------------------

  public writeValue(value: number | null): void {
    this.value.set(value ?? 0);
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
    if (isDisabled) {
      this.removeGlobalPointerListeners();
    }
  }

  // ---------------------------------------------------------------------------
  // Event handlers (called from template)
  // ---------------------------------------------------------------------------

  /** Handles focus on the SVG element. */
  public onFocusEvent(event: FocusEvent): void {
    this.isFocused.set(true);
    this.knobFocus.emit(event);
  }

  /** Handles blur on the SVG element. */
  public onBlurEvent(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onModelTouched();
    this.knobBlur.emit(event);
  }

  /** Handles keydown on the SVG element for keyboard-driven value changes. */
  public onKeyDown(event: KeyboardEvent): void {
    if (!this.isInteractive()) {
      return;
    }

    const currentStep: number = this.step();
    const largeStep: number = currentStep * 10;
    let handled: boolean = true;

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        this.stepValue(currentStep);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        this.stepValue(-currentStep);
        break;
      case 'PageUp':
        this.stepValue(largeStep);
        break;
      case 'PageDown':
        this.stepValue(-largeStep);
        break;
      case 'Home':
        this.updateValue(this.min());
        break;
      case 'End':
        this.updateValue(this.max());
        break;
      default:
        handled = false;
        break;
    }

    if (handled) {
      event.preventDefault();
    }
  }

  /** Begins drag tracking on pointer down. */
  public onPointerDown(event: PointerEvent): void {
    if (!this.isInteractive()) {
      return;
    }

    event.preventDefault();
    this.dragStartY = event.clientY;
    this.dragStartValue = this.clampedValue();
    this.isDragging = true;

    document.addEventListener('pointermove', this.boundPointerMove);
    document.addEventListener('pointerup', this.boundPointerUp);
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }
    this.pendingPointerY = event.clientY;
    if (this.dragAnimationFrameId !== null) {
      return;
    }

    this.dragAnimationFrameId = requestAnimationFrame((): void => {
      this.dragAnimationFrameId = null;
      if (this.pendingPointerY === null) {
        return;
      }
      // Dragging upward increases value; scale sensitivity to arc range
      const deltaY: number = this.dragStartY - this.pendingPointerY;
      const range: number = this.max() - this.min();
      // 150px of drag covers the full range — provides comfortable granularity
      const deltaValue: number = (deltaY / 150) * range;
      const newValue: number = this.snapToStep(this.dragStartValue + deltaValue);
      this.pendingPointerY = null;
      this.updateValue(newValue);
    });
  }

  private onPointerUp(): void {
    this.isDragging = false;
    this.pendingPointerY = null;
    this.clearDragAnimationFrame();
    this.onModelTouched();
    this.removeGlobalPointerListeners();
  }

  private removeGlobalPointerListeners(): void {
    document.removeEventListener('pointermove', this.boundPointerMove);
    document.removeEventListener('pointerup', this.boundPointerUp);
  }

  private clearDragAnimationFrame(): void {
    if (this.dragAnimationFrameId !== null) {
      cancelAnimationFrame(this.dragAnimationFrameId);
      this.dragAnimationFrameId = null;
    }
  }

  private stepValue(delta: number): void {
    this.updateValue(this.clampedValue() + delta);
  }

  private updateValue(rawValue: number): void {
    const snapped: number = this.snapToStep(rawValue);
    const clamped: number = this.clamp(snapped);

    if (clamped === this.value()) {
      return;
    }

    this.value.set(clamped);
    this.onModelChange(clamped);
    this.knobChange.emit({ value: clamped });
  }

  private clamp(value: number): number {
    return Math.min(this.max(), Math.max(this.min(), value));
  }

  private snapToStep(value: number): number {
    const currentStep: number = this.step();
    if (currentStep <= 0) {
      return value;
    }
    const snapped: number =
      Math.round((value - this.min()) / currentStep) * currentStep + this.min();
    return Math.round(snapped * 1e10) / 1e10; // Eliminate floating-point drift
  }

  /**
   * Converts a clockwise-from-top angle (degrees) to SVG coordinates
   * on a circle of KNOB_SVG.radius centred at (KNOB_SVG.center, KNOB_SVG.center).
   *
   * SVG y-axis is inverted (positive downward), so:
   *   x = cx + r * sin(angle)
   *   y = cy - r * cos(angle)
   */
  private arcCoords(angleDeg: number): { x: number; y: number } {
    const rad: number = (angleDeg * Math.PI) / 180;
    return {
      x: KNOB_SVG.center + KNOB_SVG.radius * Math.sin(rad),
      y: KNOB_SVG.center - KNOB_SVG.radius * Math.cos(rad),
    };
  }

  /** Rounds to 3 decimal places to keep SVG path strings concise. */
  private round(value: number): number {
    return Math.round(value * 1000) / 1000;
  }

  /** CVA callbacks — initialised to no-ops; replaced by Angular's DI. */
  private onModelChange: (value: number) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};
}
