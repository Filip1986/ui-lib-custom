import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type {
  ElementRef,
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { SLIDER_DEFAULTS } from './slider.types';
import type {
  SliderChangeEvent,
  SliderOrientation,
  SliderSize,
  SliderSlideEndEvent,
  SliderVariant,
} from './slider.types';

/** Internal discriminator for which handle is being manipulated. */
type SliderHandle = 'single' | 'start' | 'end';

/**
 * Slider - a linear track-based control for selecting a numeric value or range.
 * Supports drag interaction, click-to-jump, keyboard navigation, horizontal/vertical
 * orientation, single-value and range modes, three design variants, three sizes,
 * CVA (ngModel + reactive forms), and full CSS-variable theming.
 */
@Component({
  selector: 'ui-lib-slider',
  standalone: true,
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof Slider => Slider),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
  },
})
export class Slider implements ControlValueAccessor {
  // ---------------------------------------------------------------------------
  // Inputs
  // ---------------------------------------------------------------------------

  /** Minimum allowed value. */
  public readonly min: InputSignal<number> = input<number>(SLIDER_DEFAULTS.min);

  /** Maximum allowed value. */
  public readonly max: InputSignal<number> = input<number>(SLIDER_DEFAULTS.max);

  /** Increment/decrement step for keyboard navigation and drag snapping. */
  public readonly step: InputSignal<number> = input<number>(SLIDER_DEFAULTS.step);

  /** When true, value is a [start, end] tuple and two handles are rendered. */
  public readonly range: InputSignal<boolean> = input<boolean>(SLIDER_DEFAULTS.range);

  /** Track orientation - 'horizontal' or 'vertical'. */
  public readonly orientation: InputSignal<SliderOrientation> = input<SliderOrientation>(
    SLIDER_DEFAULTS.orientation
  );

  /** Whether the slider is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(SLIDER_DEFAULTS.disabled);

  /** Whether the slider is read-only - focusable but value does not change. */
  public readonly readonly: InputSignal<boolean> = input<boolean>(SLIDER_DEFAULTS.readonly);

  /** When true, fill bar and handle animate on value changes. */
  public readonly animate: InputSignal<boolean> = input<boolean>(SLIDER_DEFAULTS.animate);

  /** Tab index forwarded to each handle element. */
  public readonly tabindex: InputSignal<number> = input<number>(SLIDER_DEFAULTS.tabindex);

  /** Accessible label forwarded to the handle element(s). */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** aria-labelledby attribute forwarded to the handle element(s). */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  /** Design variant override. When null the active global theme variant is used. */
  public readonly variant: InputSignal<SliderVariant | null> = input<SliderVariant | null>(null);

  /** Size token - 'sm' | 'md' | 'lg'. */
  public readonly size: InputSignal<SliderSize> = input<SliderSize>(SLIDER_DEFAULTS.size);

  /** Additional CSS class(es) appended to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Model
  // ---------------------------------------------------------------------------

  /** Current value. Single mode: a number. Range mode: a [start, end] tuple. */
  public readonly value: ModelSignal<number | [number, number]> = model<number | [number, number]>(
    0
  );

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Emits on every user-driven value change. */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onChange: OutputEmitterRef<SliderChangeEvent> = output<SliderChangeEvent>();

  /** Emits when the user releases a drag interaction. */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onSlideEnd: OutputEmitterRef<SliderSlideEndEvent> = output<SliderSlideEndEvent>();

  // ---------------------------------------------------------------------------
  // ViewChild
  // ---------------------------------------------------------------------------

  private readonly trackRef: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('trackRef');

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly isFocused: WritableSignal<boolean> = signal<boolean>(false);

  private isDragging: boolean = false;
  private activeHandle: SliderHandle = 'single';
  private dragStartValue: number | [number, number] = 0;
  private dragStartPos: number = 0;

  private readonly boundPointerMove: (event: PointerEvent) => void = (
    event: PointerEvent
  ): void => {
    this.onPointerMove(event);
  };
  private readonly boundPointerUp: (event: PointerEvent) => void = (event: PointerEvent): void => {
    this.onPointerUp(event);
  };

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  private onCvaChange: (value: number | [number, number]) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  // ---------------------------------------------------------------------------
  // Computed signals
  // ---------------------------------------------------------------------------

  protected readonly effectiveVariant: Signal<SliderVariant> = computed<SliderVariant>(
    (): SliderVariant => this.variant() ?? this.themeConfig.variant()
  );

  protected readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  protected readonly isInteractive: Signal<boolean> = computed<boolean>(
    (): boolean => !this.isDisabled() && !this.readonly()
  );

  protected readonly effectiveTabindex: Signal<number> = computed<number>((): number =>
    this.isDisabled() ? -1 : this.tabindex()
  );

  protected readonly isHorizontal: Signal<boolean> = computed<boolean>(
    (): boolean => this.orientation() === 'horizontal'
  );

  protected readonly singleValue: Signal<number> = computed<number>((): number => {
    const currentValue: number | [number, number] = this.value();
    return typeof currentValue === 'number' ? currentValue : currentValue[0];
  });

  protected readonly rangeStartValue: Signal<number> = computed<number>((): number => {
    const currentValue: number | [number, number] = this.value();
    return Array.isArray(currentValue) ? currentValue[0] : this.min();
  });

  protected readonly rangeEndValue: Signal<number> = computed<number>((): number => {
    const currentValue: number | [number, number] = this.value();
    return Array.isArray(currentValue) ? currentValue[1] : this.max();
  });

  protected readonly fillPercent: Signal<number> = computed<number>((): number =>
    this.toPercent(this.singleValue())
  );

  protected readonly startPercent: Signal<number> = computed<number>((): number =>
    this.toPercent(this.rangeStartValue())
  );

  protected readonly endPercent: Signal<number> = computed<number>((): number =>
    this.toPercent(this.rangeEndValue())
  );

  protected readonly fillStyle: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      if (this.range()) {
        const start: number = this.startPercent();
        const end: number = this.endPercent();
        return this.isHorizontal()
          ? { left: start + '%', width: end - start + '%' }
          : { bottom: start + '%', height: end - start + '%' };
      }

      const fill: number = this.fillPercent();
      return this.isHorizontal()
        ? { left: '0', width: fill + '%' }
        : { bottom: '0', height: fill + '%' };
    }
  );

  protected readonly handleStyle: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => {
      const fill: number = this.fillPercent();
      return this.isHorizontal() ? { left: fill + '%' } : { bottom: fill + '%' };
    }
  );

  protected readonly startHandleStyle: Signal<Record<string, string>> = computed<
    Record<string, string>
  >((): Record<string, string> => {
    const start: number = this.startPercent();
    return this.isHorizontal() ? { left: start + '%' } : { bottom: start + '%' };
  });

  protected readonly endHandleStyle: Signal<Record<string, string>> = computed<
    Record<string, string>
  >((): Record<string, string> => {
    const end: number = this.endPercent();
    return this.isHorizontal() ? { left: end + '%' } : { bottom: end + '%' };
  });

  protected readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-slider',
      'ui-lib-slider--variant-' + this.effectiveVariant(),
      'ui-lib-slider--size-' + this.size(),
      'ui-lib-slider--' + this.orientation(),
    ];

    if (this.isDisabled()) {
      classes.push('ui-lib-slider--disabled');
    }

    if (this.readonly()) {
      classes.push('ui-lib-slider--readonly');
    }

    if (this.animate()) {
      classes.push('ui-lib-slider--animate');
    }

    if (this.isFocused()) {
      classes.push('ui-lib-slider--focused');
    }

    if (this.range()) {
      classes.push('ui-lib-slider--range');
    }

    const extraClass: string | null = this.styleClass();
    if (extraClass) {
      classes.push(extraClass);
    }

    return classes.join(' ');
  });

  // ---------------------------------------------------------------------------
  // Constructor
  // ---------------------------------------------------------------------------

  constructor() {
    this.destroyRef.onDestroy((): void => {
      this.removeGlobalPointerListeners();
    });
  }

  // ---------------------------------------------------------------------------
  // ControlValueAccessor
  // ---------------------------------------------------------------------------

  public writeValue(value: number | [number, number] | null): void {
    if (value === null) {
      this.value.set(this.range() ? [this.min(), this.max()] : this.min());
      return;
    }

    this.value.set(value);
  }

  public registerOnChange(fn: (value: number | [number, number]) => void): void {
    this.onCvaChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onCvaTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
    if (isDisabled) {
      this.removeGlobalPointerListeners();
    }
  }

  // ---------------------------------------------------------------------------
  // Event handlers - called from template
  // ---------------------------------------------------------------------------

  public onFocusEvent(_event: FocusEvent): void {
    this.isFocused.set(true);
  }

  public onBlurEvent(_event: FocusEvent): void {
    this.isFocused.set(false);
    this.onCvaTouched();
  }

  public onKeyDown(event: KeyboardEvent, handle: SliderHandle): void {
    if (!this.isInteractive()) {
      return;
    }

    const currentStep: number = this.step();
    const largeStep: number = currentStep * 10;
    let handled: boolean = true;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        this.stepHandle(handle, currentStep, event);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        this.stepHandle(handle, -currentStep, event);
        break;
      case 'PageUp':
        this.stepHandle(handle, largeStep, event);
        break;
      case 'PageDown':
        this.stepHandle(handle, -largeStep, event);
        break;
      case 'Home': {
        const homeTarget: number = handle === 'end' ? this.rangeStartValue() : this.min();
        this.updateHandleValue(handle, homeTarget, event);
        break;
      }
      case 'End': {
        const endTarget: number = handle === 'start' ? this.rangeEndValue() : this.max();
        this.updateHandleValue(handle, endTarget, event);
        break;
      }
      default:
        handled = false;
        break;
    }

    if (handled) {
      event.preventDefault();
    }
  }

  public onHandlePointerDown(event: PointerEvent, handle: SliderHandle): void {
    if (!this.isInteractive()) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    this.isDragging = true;
    this.activeHandle = handle;
    this.dragStartValue = this.value();
    this.dragStartPos = this.isHorizontal() ? event.clientX : event.clientY;

    (event.target as HTMLElement).setPointerCapture(event.pointerId);

    document.addEventListener('pointermove', this.boundPointerMove);
    document.addEventListener('pointerup', this.boundPointerUp);
  }

  public onTrackPointerDown(event: PointerEvent): void {
    if (!this.isInteractive()) {
      return;
    }

    const target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('ui-lib-slider__handle')) {
      return;
    }

    const percent: number = this.getPercentFromEvent(event);
    const clickValue: number = this.percentToValue(percent);

    if (this.range()) {
      const startVal: number = this.rangeStartValue();
      const endVal: number = this.rangeEndValue();
      const distToStart: number = Math.abs(clickValue - startVal);
      const distToEnd: number = Math.abs(clickValue - endVal);
      const handle: SliderHandle = distToStart <= distToEnd ? 'start' : 'end';
      this.updateHandleValue(handle, clickValue, event);
    } else {
      this.updateHandleValue('single', clickValue, event);
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    const track: ElementRef<HTMLElement> | undefined = this.trackRef();
    if (!track) {
      return;
    }

    const rect: DOMRect = track.nativeElement.getBoundingClientRect();
    const trackLength: number = this.isHorizontal() ? rect.width : rect.height;
    if (trackLength === 0) {
      return;
    }

    const currentPos: number = this.isHorizontal() ? event.clientX : event.clientY;
    const delta: number = this.isHorizontal()
      ? currentPos - this.dragStartPos
      : this.dragStartPos - currentPos;

    const valueRange: number = this.max() - this.min();
    const deltaValue: number = (delta / trackLength) * valueRange;

    let rawValue: number;

    if (this.activeHandle === 'start') {
      const startVal: number = Array.isArray(this.dragStartValue)
        ? this.dragStartValue[0]
        : (this.dragStartValue as number);
      rawValue = startVal + deltaValue;
    } else if (this.activeHandle === 'end') {
      const endVal: number = Array.isArray(this.dragStartValue)
        ? this.dragStartValue[1]
        : (this.dragStartValue as number);
      rawValue = endVal + deltaValue;
    } else {
      rawValue = (this.dragStartValue as number) + deltaValue;
    }

    this.updateHandleValue(this.activeHandle, rawValue, event);
  }

  private onPointerUp(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    this.isDragging = false;
    this.onCvaTouched();
    this.onSlideEnd.emit({ value: this.value(), originalEvent: event });
    this.removeGlobalPointerListeners();
  }

  private removeGlobalPointerListeners(): void {
    document.removeEventListener('pointermove', this.boundPointerMove);
    document.removeEventListener('pointerup', this.boundPointerUp);
  }

  private stepHandle(handle: SliderHandle, delta: number, event: Event): void {
    const currentVal: number = this.getHandleCurrentValue(handle);
    this.updateHandleValue(handle, currentVal + delta, event);
  }

  private getHandleCurrentValue(handle: SliderHandle): number {
    if (handle === 'start') {
      return this.rangeStartValue();
    }

    if (handle === 'end') {
      return this.rangeEndValue();
    }

    return this.singleValue();
  }

  private updateHandleValue(handle: SliderHandle, rawValue: number, event: Event): void {
    const snapped: number = this.snapToStep(rawValue);

    if (handle === 'single') {
      const clamped: number = this.clamp(snapped, this.min(), this.max());
      if (clamped === this.singleValue()) {
        return;
      }

      this.value.set(clamped);
      this.onCvaChange(clamped);
      this.onChange.emit({ value: clamped, originalEvent: event });
    } else if (handle === 'start') {
      const endVal: number = this.rangeEndValue();
      const clamped: number = this.clamp(snapped, this.min(), endVal);
      if (clamped === this.rangeStartValue()) {
        return;
      }

      const newValue: [number, number] = [clamped, endVal];
      this.value.set(newValue);
      this.onCvaChange(newValue);
      this.onChange.emit({ value: newValue, originalEvent: event });
    } else {
      const startVal: number = this.rangeStartValue();
      const clamped: number = this.clamp(snapped, startVal, this.max());
      if (clamped === this.rangeEndValue()) {
        return;
      }

      const newValue: [number, number] = [startVal, clamped];
      this.value.set(newValue);
      this.onCvaChange(newValue);
      this.onChange.emit({ value: newValue, originalEvent: event });
    }
  }

  private toPercent(value: number): number {
    const range: number = this.max() - this.min();
    if (range === 0) {
      return 0;
    }

    return ((this.clamp(value, this.min(), this.max()) - this.min()) / range) * 100;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private snapToStep(value: number): number {
    const currentStep: number = this.step();
    if (currentStep <= 0) {
      return value;
    }

    const snapped: number =
      Math.round((value - this.min()) / currentStep) * currentStep + this.min();
    return Math.round(snapped * 1e10) / 1e10;
  }

  private getPercentFromEvent(event: PointerEvent): number {
    const track: ElementRef<HTMLElement> | undefined = this.trackRef();
    if (!track) {
      return 0;
    }

    const rect: DOMRect = track.nativeElement.getBoundingClientRect();

    if (this.isHorizontal()) {
      if (rect.width === 0) {
        return 0;
      }

      return ((event.clientX - rect.left) / rect.width) * 100;
    }

    if (rect.height === 0) {
      return 0;
    }

    return ((rect.bottom - event.clientY) / rect.height) * 100;
  }

  private percentToValue(percent: number): number {
    const range: number = this.max() - this.min();
    return this.min() + (percent / 100) * range;
  }
}
