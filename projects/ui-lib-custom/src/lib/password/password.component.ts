import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { InputSignal, OutputEmitterRef, Signal, WritableSignal } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { PASSWORD_DEFAULTS } from './password.types';
import type { PasswordSize, PasswordStrength, PasswordVariant } from './password.types';

/** Password field with strength meter, mask toggle, and ControlValueAccessor integration. */
@Component({
  selector: 'uilib-password',
  standalone: true,
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof PasswordComponent => PasswordComponent),
      multi: true,
    },
  ],
  host: {
    class: 'uilib-password',
    '[class.uilib-password-sm]': 'size() === "sm"',
    '[class.uilib-password-lg]': 'size() === "lg"',
    '[class.uilib-password-appearance-filled]': 'appearance() === "filled"',
    '[class.uilib-password-fluid]': 'fluid()',
    '[class.uilib-password-invalid]': 'invalid()',
    '[class.uilib-password-disabled]': 'isControlDisabled()',
    '[class.uilib-inputwrapper-filled]': 'isFilled()',
    '[class.uilib-inputwrapper-focus]': 'isFocused()',
    '[class.uilib-variant-material]': 'variant() === "material"',
    '[class.uilib-variant-bootstrap]': 'variant() === "bootstrap"',
    '[class.uilib-variant-minimal]': 'variant() === "minimal"',
  },
})
export class PasswordComponent implements ControlValueAccessor {
  /** Design variant: material, bootstrap, or minimal. */
  public readonly variant: InputSignal<PasswordVariant> = input<PasswordVariant>('material');

  /** Size token: sm, md, or lg. */
  public readonly size: InputSignal<PasswordSize> = input<PasswordSize>('md');

  /** Visual appearance: outlined (default) or filled background. */
  public readonly appearance: InputSignal<'outlined' | 'filled'> = input<'outlined' | 'filled'>(
    'outlined'
  );

  /** Whether the control is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** Whether the control is read-only. */
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);

  /** Whether the control is in an invalid state. */
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);

  /** Whether the control spans the full width of its container. */
  public readonly fluid: InputSignal<boolean> = input<boolean>(false);

  /** Whether to display the strength meter panel when the input is focused. */
  public readonly feedback: InputSignal<boolean> = input<boolean>(PASSWORD_DEFAULTS.feedback);

  /** Whether to show a button that toggles password visibility. */
  public readonly toggleMask: InputSignal<boolean> = input<boolean>(PASSWORD_DEFAULTS.toggleMask);

  /** Whether to show a clear button when the field has a value. */
  public readonly showClear: InputSignal<boolean> = input<boolean>(PASSWORD_DEFAULTS.showClear);

  /** Placeholder text for the native input. */
  public readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Autocomplete attribute value for the native input. */
  public readonly autocomplete: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Name attribute for the native input. */
  public readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /** ID applied to the inner input element — use with an associated label element. */
  public readonly inputId: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /** Accessible label string for the input. */
  public readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined);

  /** Space-separated IDs of elements that label this input. */
  public readonly ariaLabelledBy: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Maximum character length constraint on the input. */
  public readonly maxLength: InputSignal<number | undefined> = input<number | undefined>(undefined);

  /** Tab-order index for the input. */
  public readonly tabindex: InputSignal<number | undefined> = input<number | undefined>(undefined);

  /** Strength panel label shown before the user starts typing. */
  public readonly promptLabel: InputSignal<string> = input<string>(PASSWORD_DEFAULTS.promptLabel);

  /** Strength panel label shown when the password is classified as weak. */
  public readonly weakLabel: InputSignal<string> = input<string>(PASSWORD_DEFAULTS.weakLabel);

  /** Strength panel label shown when the password is classified as medium. */
  public readonly mediumLabel: InputSignal<string> = input<string>(PASSWORD_DEFAULTS.mediumLabel);

  /** Strength panel label shown when the password is classified as strong. */
  public readonly strongLabel: InputSignal<string> = input<string>(PASSWORD_DEFAULTS.strongLabel);

  /** Regex used to classify a password as medium strength. */
  public readonly mediumRegex: InputSignal<string> = input<string>(PASSWORD_DEFAULTS.mediumRegex);

  /** Regex used to classify a password as strong. */
  public readonly strongRegex: InputSignal<string> = input<string>(PASSWORD_DEFAULTS.strongRegex);

  /** Additional CSS class applied to the inner input element. */
  public readonly inputStyleClass: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Emitted when the input receives focus. */
  public readonly focused: OutputEmitterRef<Event> = output<Event>();

  /** Emitted when the input loses focus. */
  public readonly blurred: OutputEmitterRef<Event> = output<Event>();

  /** Emitted when the clear button is clicked. */
  public readonly cleared: OutputEmitterRef<void> = output<void>();

  protected readonly inputValue: WritableSignal<string> = signal<string>('');
  protected readonly isFocused: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly overlayVisible: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly passwordVisible: WritableSignal<boolean> = signal<boolean>(false);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly isFilled: Signal<boolean> = computed<boolean>(
    (): boolean => this.inputValue().length > 0
  );

  /** Current password strength level, or null when the field is empty. */
  protected readonly strength: Signal<PasswordStrength | null> = computed<PasswordStrength | null>(
    (): PasswordStrength | null => {
      const value: string = this.inputValue();
      if (value.length === 0) {
        return null;
      }
      if (new RegExp(this.strongRegex()).test(value)) {
        return 'strong';
      }
      if (new RegExp(this.mediumRegex()).test(value)) {
        return 'medium';
      }
      return 'weak';
    }
  );

  /** CSS width percentage for the strength meter fill bar. */
  protected readonly meterWidth: Signal<string> = computed<string>((): string => {
    const strengthValue: PasswordStrength | null = this.strength();
    if (strengthValue === 'weak') {
      return '33.33%';
    }
    if (strengthValue === 'medium') {
      return '66.66%';
    }
    if (strengthValue === 'strong') {
      return '100%';
    }
    return '0%';
  });

  /** Text displayed below the meter in the strength panel. */
  protected readonly strengthLabel: Signal<string> = computed<string>((): string => {
    const strengthValue: PasswordStrength | null = this.strength();
    if (strengthValue === 'weak') {
      return this.weakLabel();
    }
    if (strengthValue === 'medium') {
      return this.mediumLabel();
    }
    if (strengthValue === 'strong') {
      return this.strongLabel();
    }
    return this.promptLabel();
  });

  /** Native input type — switches between "password" and "text" when the mask is toggled. */
  protected readonly inputType: Signal<string> = computed<string>((): string =>
    this.passwordVisible() ? 'text' : 'password'
  );

  private onModelChange: (value: string | null) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};

  /** ControlValueAccessor: write an external value into the component. */
  public writeValue(value: string | null): void {
    this.inputValue.set(value ?? '');
  }

  /** ControlValueAccessor: register the model-change propagation callback. */
  public registerOnChange(fn: (value: string | null) => void): void {
    this.onModelChange = fn;
  }

  /** ControlValueAccessor: register the touched propagation callback. */
  public registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  /** ControlValueAccessor: toggle the disabled state as directed by the forms API. */
  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  /** Handle native input events and propagate the new value through CVA. */
  protected onInput(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const newValue: string = inputElement.value;
    this.inputValue.set(newValue);
    this.onModelChange(newValue.length > 0 ? newValue : null);
  }

  /** Show the strength panel when the input is focused and feedback is enabled. */
  protected onFocus(event: Event): void {
    this.isFocused.set(true);
    if (this.feedback()) {
      this.overlayVisible.set(true);
    }
    this.focused.emit(event);
  }

  /** Hide the strength panel and mark the control as touched when the input loses focus. */
  protected onBlur(event: Event): void {
    this.isFocused.set(false);
    this.overlayVisible.set(false);
    this.onModelTouched();
    this.blurred.emit(event);
  }

  /** Toggle between password (masked) and plain-text (unmasked) display modes. */
  protected togglePasswordVisibility(): void {
    this.passwordVisible.update((visible: boolean): boolean => !visible);
  }

  /** Clear the field value and notify the form. */
  protected clear(): void {
    if (this.isControlDisabled()) {
      return;
    }
    this.inputValue.set('');
    this.onModelChange(null);
    this.cleared.emit();
  }

  /** Returns true when the control is disabled via the input property or the CVA API. */
  protected isControlDisabled(): boolean {
    return this.disabled() || this.cvaDisabled();
  }
}
