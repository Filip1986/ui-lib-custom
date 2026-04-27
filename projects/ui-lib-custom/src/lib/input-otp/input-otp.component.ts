import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type {
  ElementRef,
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { INPUT_OTP_DEFAULTS } from './input-otp.types';
import type { InputOtpChangeEvent, InputOtpSize } from './input-otp.types';

/**
 * InputOtp component — renders N individual input cells for one-time password entry.
 * Supports CVA (ngModel / reactive forms), keyboard navigation, paste, mask, and integer-only modes.
 */
@Component({
  selector: 'uilib-input-otp',
  standalone: true,
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof InputOtpComponent => InputOtpComponent),
      multi: true,
    },
  ],
  host: {
    class: 'uilib-input-otp',
    '[class.uilib-input-otp-sm]': 'size() === "sm"',
    '[class.uilib-input-otp-lg]': 'size() === "lg"',
    '[class.uilib-input-otp-filled]': 'filled()',
    '[class.uilib-input-otp-invalid]': 'invalid()',
    '[class.uilib-input-otp-disabled]': 'isControlDisabled()',
    '[class.uilib-input-otp-readonly]': 'readonly()',
  },
})
export class InputOtpComponent implements ControlValueAccessor {
  /** Number of OTP input cells to render. */
  public readonly length: InputSignal<number> = input<number>(INPUT_OTP_DEFAULTS.length);

  /** When true, each cell renders as a password field (dots). */
  public readonly mask: InputSignal<boolean> = input<boolean>(INPUT_OTP_DEFAULTS.mask);

  /** When true, only digit characters (0-9) are accepted. */
  public readonly integerOnly: InputSignal<boolean> = input<boolean>(
    INPUT_OTP_DEFAULTS.integerOnly
  );

  /** Applies filled background appearance to each cell. */
  public readonly filled: InputSignal<boolean> = input<boolean>(INPUT_OTP_DEFAULTS.filled);

  /** Disables all input cells. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(INPUT_OTP_DEFAULTS.disabled);

  /** Makes all input cells read-only. */
  public readonly readonly: InputSignal<boolean> = input<boolean>(INPUT_OTP_DEFAULTS.readonly);

  /** Applies invalid (error) styling to all cells. */
  public readonly invalid: InputSignal<boolean> = input<boolean>(INPUT_OTP_DEFAULTS.invalid);

  /** Size variant: 'sm' | 'md' | 'lg'. */
  public readonly size: InputSignal<InputOtpSize> = input<InputOtpSize>(INPUT_OTP_DEFAULTS.size);

  /** Tab index forwarded to each cell input. */
  public readonly tabindex: InputSignal<number | null> = input<number | null>(null);

  /** Extra CSS class applied to each cell input element. */
  public readonly styleClass: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Emitted whenever the OTP value changes. */
  public readonly changed: OutputEmitterRef<InputOtpChangeEvent> = output<InputOtpChangeEvent>();

  /** Emitted when any cell receives focus. */
  public readonly focused: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  /** Emitted when any cell loses focus. */
  public readonly blurred: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  /** Emitted when all cells are filled (OTP entry complete). */
  public readonly completed: OutputEmitterRef<string> = output<string>();

  // Internal token array - one slot per cell.
  protected readonly tokens: WritableSignal<string[]> = signal<string[]>([]);

  // CVA disabled state set by forms API.
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  private onModelChange: (value: string) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};

  // Query all rendered cell inputs in DOM order.
  private readonly cellInputs: Signal<readonly ElementRef<HTMLInputElement>[]> =
    viewChildren<ElementRef<HTMLInputElement>>('cellInput');

  /** Derived array of indices [0, 1, length-1] for template iteration. */
  protected readonly cellIndices: Signal<number[]> = computed<number[]>((): number[] =>
    Array.from({ length: this.length() }, (_value: unknown, index: number): number => index)
  );

  /** Input type derived from mask flag. */
  protected readonly inputType: Signal<string> = computed<string>((): string =>
    this.mask() ? 'password' : 'text'
  );

  /** Input mode derived from integerOnly flag. */
  protected readonly inputMode: Signal<string> = computed<string>((): string =>
    this.integerOnly() ? 'numeric' : 'text'
  );

  /** Combined disabled state from input and CVA. */
  protected isControlDisabled(): boolean {
    return this.disabled() || this.cvaDisabled();
  }

  /** Return the current token at a given cell index. */
  protected getToken(index: number): string {
    return this.tokens()[index] ?? '';
  }

  // ---------------------------------------------------------------------------
  // ControlValueAccessor
  // ---------------------------------------------------------------------------

  /** ControlValueAccessor: write external value into component. */
  public writeValue(value: string | null | undefined): void {
    const normalized: string = value ?? '';
    const characters: string[] = normalized.split('').slice(0, this.length());
    const padded: string[] = Array.from(
      { length: this.length() },
      (_value: unknown, index: number): string => characters[index] ?? ''
    );
    this.tokens.set(padded);
  }

  /** ControlValueAccessor: register model change callback. */
  public registerOnChange(fn: (value: string) => void): void {
    this.onModelChange = fn;
  }

  /** ControlValueAccessor: register touched callback. */
  public registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  /** ControlValueAccessor: toggle disabled state from forms API. */
  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  // ---------------------------------------------------------------------------
  // Event handlers (called from template)
  // ---------------------------------------------------------------------------

  /** Handle character input in a single cell. */
  protected onCellInput(event: Event, index: number): void {
    if (this.isControlDisabled() || this.readonly()) {
      return;
    }

    const inputEvent: InputEvent = event as InputEvent;
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const inputValue: string = target.value;

    // First cell paste: distribute across all cells.
    if (index === 0 && inputValue.length > 1) {
      this.distributePaste(inputValue, event);
      return;
    }

    // Accept only a single valid character.
    const accepted: string = this.extractAccepted(inputValue);
    const updated: string[] = [...this.tokens()];
    updated[index] = accepted;
    this.tokens.set(updated);

    this.emitChange(event);

    if (inputEvent.inputType === 'deleteContentBackward') {
      this.moveToPrev(index);
    } else if (accepted.length > 0) {
      this.moveToNext(index);
    }
  }

  /** Handle keydown for navigation and deletion. */
  protected onCellKeydown(event: KeyboardEvent, index: number): void {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        this.moveToPrev(index);
        event.preventDefault();
        break;

      case 'ArrowRight':
        this.moveToNext(index);
        event.preventDefault();
        break;

      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        break;

      case 'Backspace': {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        if (target.value.length === 0) {
          // Cell already empty: clear previous cell and move back.
          const updated: string[] = [...this.tokens()];
          const previousIndex: number = index - 1;
          if (previousIndex >= 0) {
            updated[previousIndex] = '';
            this.tokens.set(updated);
            this.emitChange(event);
            this.moveToPrev(index);
          }
          event.preventDefault();
        }
        break;
      }

      case 'Delete': {
        const updated: string[] = [...this.tokens()];
        updated[index] = '';
        this.tokens.set(updated);
        this.emitChange(event);
        event.preventDefault();
        break;
      }

      default: {
        // Block non-digit keys when integerOnly is active.
        if (this.integerOnly() && !/^\d$/.test(event.key)) {
          event.preventDefault();
        }
        break;
      }
    }
  }

  /** Handle focus: select all text in the focused cell. */
  protected onCellFocus(event: FocusEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    target.select();
    this.focused.emit(event);
  }

  /** Handle blur: mark control as touched. */
  protected onCellBlur(event: FocusEvent): void {
    this.onModelTouched();
    this.blurred.emit(event);
  }

  /** Handle paste event on any cell. */
  protected onCellPaste(event: ClipboardEvent): void {
    if (this.isControlDisabled() || this.readonly()) {
      return;
    }

    const pasted: string = event.clipboardData?.getData('text') ?? '';
    if (pasted.length > 0) {
      this.distributePaste(pasted, event);
    }
    event.preventDefault();
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /** Distribute a multi-character string across cells starting at index 0. */
  private distributePaste(text: string, event: Event): void {
    const filtered: string = this.integerOnly() ? text.replace(/\D/g, '') : text;
    const characters: string[] = filtered.split('').slice(0, this.length());
    const updated: string[] = Array.from(
      { length: this.length() },
      (_value: unknown, index: number): string => characters[index] ?? ''
    );
    this.tokens.set(updated);
    this.emitChange(event);

    // Focus the first empty cell after the paste, or the last cell.
    const firstEmpty: number = updated.findIndex((token: string): boolean => token === '');
    this.focusCell(firstEmpty >= 0 ? firstEmpty : this.length() - 1);
  }

  /** Extract the single accepted character from raw input value. */
  private extractAccepted(rawValue: string): string {
    // Take the last character (handles replacement of existing character).
    const character: string = rawValue.slice(-1);
    if (this.integerOnly() && !/^\d$/.test(character)) {
      return '';
    }
    return character;
  }

  /** Propagate updated tokens to model and emit events. */
  private emitChange(event: Event): void {
    const value: string = this.tokens().join('');
    this.onModelChange(value);
    this.changed.emit({ originalEvent: event, value });

    if (value.length === this.length() && !this.tokens().includes('')) {
      this.completed.emit(value);
    }
  }

  /** Move focus to the previous cell (if any). */
  private moveToPrev(currentIndex: number): void {
    this.focusCell(currentIndex - 1);
  }

  /** Move focus to the next cell (if any). */
  private moveToNext(currentIndex: number): void {
    this.focusCell(currentIndex + 1);
  }

  /** Focus and select the cell at the given index (no-op if out of bounds). */
  private focusCell(index: number): void {
    const inputs: readonly ElementRef<HTMLInputElement>[] = this.cellInputs();
    const ref: ElementRef<HTMLInputElement> | undefined = inputs[index];
    if (ref !== undefined) {
      ref.nativeElement.focus();
      ref.nativeElement.select();
    }
  }
}
