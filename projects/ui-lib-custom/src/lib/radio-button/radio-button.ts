import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
  type AfterViewInit,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import type {
  RadioButtonVariant,
  RadioButtonSize,
  RadioButtonAppearance,
  RadioButtonChangeEvent,
} from './radio-button.types';

export type {
  RadioButtonVariant,
  RadioButtonSize,
  RadioButtonAppearance,
  RadioButtonChangeEvent,
} from './radio-button.types';

let radioButtonIdCounter: number = 0;

/**
 * RadioButton component with accessible labeling and group selection support via ControlValueAccessor.
 */
@Component({
  selector: 'ui-lib-radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof RadioButton => RadioButton),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'onHostClick($event)',
  },
})
export class RadioButton implements ControlValueAccessor, AfterViewInit {
  /** Label text rendered next to the radio button. */
  public readonly label: InputSignal<string | null> = input<string | null>(null);
  /** Id forwarded to the native `<input>` element. */
  public readonly inputId: InputSignal<string | null> = input<string | null>(null);
  /** Name attribute shared across the radio group. */
  public readonly name: InputSignal<string | null> = input<string | null>(null);
  /** The value this radio button represents in the group model. */
  public readonly value: InputSignal<unknown> = input<unknown>(null);
  /** Whether the native input is required. */
  public readonly required: InputSignal<boolean> = input<boolean>(false);
  /** When true the radio button is visible but cannot be changed. */
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  /** Whether the radio button is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  /** Tab index for keyboard navigation. */
  public readonly tabindex: InputSignal<number> = input<number>(0);
  /** Automatically focuses the input after view init. */
  public readonly autofocus: InputSignal<boolean> = input<boolean>(false);
  /** ARIA label when no visible label is provided. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  /** Explicit aria-labelledby override. */
  public readonly ariaLabelledby: InputSignal<string | null> = input<string | null>(null);
  /** Design-system variant; falls back to ThemeConfigService when null. */
  public readonly variant: InputSignal<RadioButtonVariant | null> =
    input<RadioButtonVariant | null>(null);
  /** Size token: sm | md | lg. */
  public readonly size: InputSignal<RadioButtonSize> = input<RadioButtonSize>('md');
  /** Visual appearance of the radio box. */
  public readonly appearance: InputSignal<RadioButtonAppearance> =
    input<RadioButtonAppearance>('outlined');

  /** Emitted when this radio button is selected. */
  public readonly change: OutputEmitterRef<RadioButtonChangeEvent> =
    output<RadioButtonChangeEvent>();
  /** Emitted when the native input gains focus. */
  public readonly focus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  /** Emitted when the native input loses focus. */
  public readonly blur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  /** Tracks the disabled state applied by a parent form control. */
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Stores the current group value received via writeValue().
   * The radio button is checked when this matches its own `value` input.
   */
  private readonly modelValue: WritableSignal<unknown> = signal<unknown>(undefined);

  private onCvaChange: (value: unknown) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  private readonly controlId: string = `ui-lib-radio-button-${++radioButtonIdCounter}`;

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly hostElement: ElementRef = inject(ElementRef);

  /** Resolved variant — falls back to global theme when not set explicitly. */
  public readonly effectiveVariant: Signal<RadioButtonVariant> = computed<RadioButtonVariant>(
    (): RadioButtonVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** True when the component is disabled via input or a parent form control. */
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  /**
   * True when the group model value (received via CVA writeValue) equals this
   * radio button's own value input.
   */
  public readonly isChecked: Signal<boolean> = computed<boolean>(
    (): boolean => this.modelValue() !== undefined && this.modelValue() === this.value()
  );

  /** Host CSS classes derived from current state. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-radio-button',
      `ui-lib-radio-button--variant-${this.effectiveVariant()}`,
      `ui-lib-radio-button--size-${this.size()}`,
    ];

    if (this.isChecked()) {
      classes.push('ui-lib-radio-button--checked');
    }

    if (this.isDisabled()) {
      classes.push('ui-lib-radio-button--disabled');
    }

    if (this.appearance() === 'filled') {
      classes.push('radio-button--filled');
    }

    return classes.join(' ');
  });

  /** Effective tab index: -1 when disabled. */
  public readonly hostTabIndex: Signal<number> = computed<number>((): number =>
    this.isDisabled() ? -1 : this.tabindex()
  );

  /**
   * Resolved aria-labelledby: null when an explicit ariaLabel is provided;
   * falls back to the label element id when a visible label is rendered.
   */
  public readonly ariaLabelledbyResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      if (this.ariaLabel()) {
        return null;
      }

      if (this.ariaLabelledby()) {
        return this.ariaLabelledby();
      }

      return this.label() ? this.getLabelElementId() : null;
    }
  );

  public ngAfterViewInit(): void {
    if (!this.autofocus() || this.isDisabled()) {
      return;
    }

    queueMicrotask((): void => {
      if (!this.isDisabled()) {
        this.getNativeInputElement()?.focus();
      }
    });
  }

  /** Routes host-level clicks to onSelect, skipping when the native input already fired. */
  public onHostClick(event: MouseEvent): void {
    const target: EventTarget | null = event.target;
    if (target instanceof HTMLInputElement) {
      return;
    }

    this.onSelect(event);
  }

  /**
   * Handles a selection action from click or keyboard.
   * When disabled or readonly the event is blocked and state is unchanged.
   */
  public onSelect(event: Event): void {
    event.preventDefault();

    if (this.isDisabled() || this.readonly()) {
      return;
    }

    const nextValue: unknown = this.value();
    this.modelValue.set(nextValue);
    this.onCvaChange(nextValue);
    this.onCvaTouched();
    this.change.emit({ value: nextValue, originalEvent: event });
  }

  /** Forwards focus events from the native input to the `focus` output. */
  public onFocusIn(event: FocusEvent): void {
    this.focus.emit(event);
  }

  /** Marks the control as touched and forwards blur events to the `blur` output. */
  public onNativeBlur(event: FocusEvent): void {
    this.onCvaTouched();
    this.blur.emit(event);
  }

  // ── ControlValueAccessor ────────────────────────────────────────────────────

  /**
   * Receives the current group selection from the form control.
   * The radio button becomes checked when this value equals its own `value` input.
   */
  public writeValue(value: unknown): void {
    this.modelValue.set(value);
  }

  /** Registers the CVA onChange callback. */
  public registerOnChange(fn: (value: unknown) => void): void {
    this.onCvaChange = fn;
  }

  /** Registers the CVA onTouched callback. */
  public registerOnTouched(fn: () => void): void {
    this.onCvaTouched = fn;
  }

  /** Applies disabled state propagated by the parent form group. */
  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /** Returns the id used on the native `<input>` element. */
  public getNativeInputId(): string {
    return this.inputId() ?? `${this.controlId}-input`;
  }

  /** Returns the id used on the rendered `<label>` element. */
  public getLabelElementId(): string {
    return `${this.controlId}-label`;
  }

  private getNativeInputElement(): HTMLInputElement | null {
    const hostNativeElement: unknown = this.hostElement.nativeElement;
    if (!(hostNativeElement instanceof HTMLElement)) {
      return null;
    }

    return hostNativeElement.querySelector<HTMLInputElement>('.ui-lib-radio-button__native-input');
  }
}
