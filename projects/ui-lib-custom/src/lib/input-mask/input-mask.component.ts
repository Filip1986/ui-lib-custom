import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  effect,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type {
  ElementRef,
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import type { AfterViewInit, OnDestroy } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { INPUT_MASK_DEFAULTS } from './input-mask.types';
import type { Caret, InputMaskCompleteEvent, InputMaskSize } from './input-mask.types';
import { MaskEngine } from './mask-engine';

/**
 * InputMask component with CVA integration and mask-aware keyboard handling.
 */
@Component({
  selector: 'uilib-input-mask',
  standalone: true,
  styleUrl: './input-mask.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof InputMaskComponent => InputMaskComponent),
      multi: true,
    },
  ],
  host: {
    class: 'uilib-input-mask',
    '[class.uilib-input-mask-sm]': 'size() === "sm"',
    '[class.uilib-input-mask-lg]': 'size() === "lg"',
    '[class.uilib-input-mask-filled]': 'filled()',
    '[class.uilib-input-mask-fluid]': 'fluid()',
    '[class.uilib-input-mask-invalid]': 'invalid()',
    '[class.uilib-input-mask-disabled]': 'isControlDisabled()',
    '[class.uilib-inputwrapper-filled]': 'isFilled()',
    '[class.uilib-inputwrapper-focus]': 'isFocused()',
  },
  template: `
    <input
      #inputEl
      [type]="type()"
      [disabled]="isControlDisabled()"
      [readonly]="readonly()"
      [placeholder]="placeholder()"
      [attr.name]="name()"
      [attr.autocomplete]="autocomplete()"
      [class.uilib-filled]="filled()"
      [class.uilib-input-sm]="size() === 'sm'"
      [class.uilib-input-lg]="size() === 'lg'"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
      (keydown)="onKeyDown($event)"
      (keypress)="onKeyPress($event)"
      (input)="onInputChange($event)"
      (paste)="onPaste($event)"
    />
    @if (showClear() && isFilled() && !isControlDisabled()) {
      <span class="uilib-input-mask-clear-icon" (click)="clear()"> × </span>
    }
  `,
})
export class InputMaskComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  public readonly mask: InputSignal<string> = input<string>('');
  public readonly slotChar: InputSignal<string> = input<string>(INPUT_MASK_DEFAULTS.slotChar);
  public readonly autoClear: InputSignal<boolean> = input<boolean>(INPUT_MASK_DEFAULTS.autoClear);
  public readonly keepBuffer: InputSignal<boolean> = input<boolean>(INPUT_MASK_DEFAULTS.keepBuffer);
  public readonly unmask: InputSignal<boolean> = input<boolean>(INPUT_MASK_DEFAULTS.unmask);
  public readonly showClear: InputSignal<boolean> = input<boolean>(INPUT_MASK_DEFAULTS.showClear);
  public readonly type: InputSignal<string> = input<string>(INPUT_MASK_DEFAULTS.type);
  public readonly characterPattern: InputSignal<string> = input<string>(
    INPUT_MASK_DEFAULTS.characterPattern
  );
  public readonly size: InputSignal<InputMaskSize> = input<InputMaskSize>('md');
  public readonly filled: InputSignal<boolean> = input<boolean>(false);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  public readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly autocomplete: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined);
  public readonly fluid: InputSignal<boolean> = input<boolean>(false);
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);

  public readonly completed: OutputEmitterRef<InputMaskCompleteEvent> =
    output<InputMaskCompleteEvent>();
  public readonly focused: OutputEmitterRef<Event> = output<Event>();
  public readonly blurred: OutputEmitterRef<Event> = output<Event>();
  public readonly inputChanged: OutputEmitterRef<Event> = output<Event>();
  public readonly cleared: OutputEmitterRef<void> = output<void>();

  private readonly inputEl: Signal<ElementRef<HTMLInputElement>> =
    viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
  private maskEngine: MaskEngine | null = null;
  private focusText: string = '';
  private oldVal: string = '';
  private caretTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private androidChrome: boolean = false;
  private viewInitialized: boolean = false;
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly value: WritableSignal<string | null> = signal<string | null>(null);
  protected readonly isFilled: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly isFocused: WritableSignal<boolean> = signal<boolean>(false);

  private onModelChange: (value: string | null) => void = (): void => {};

  private onModelTouched: () => void = (): void => {};

  constructor() {
    effect((): void => {
      const maskValue: string = this.mask();
      const slotCharacter: string = this.slotChar();
      const characterPattern: string = this.characterPattern();

      this.maskEngine =
        maskValue.length > 0 ? new MaskEngine(maskValue, slotCharacter, characterPattern) : null;

      if (!this.viewInitialized) {
        return;
      }

      if (this.maskEngine === null) {
        this.updateFilledState();
        return;
      }

      const inputElement: HTMLInputElement = this.getInputElement();
      const currentValue: string = inputElement.value;
      inputElement.value = currentValue;
      this.checkVal(false);
      this.value.set(inputElement.value.length > 0 ? inputElement.value : null);
      this.updateFilledState();
    });
  }

  public ngAfterViewInit(): void {
    this.viewInitialized = true;

    if (typeof navigator !== 'undefined') {
      const userAgent: string = navigator.userAgent.toLowerCase();
      this.androidChrome = userAgent.includes('android') && userAgent.includes('chrome');
    }

    const inputElement: HTMLInputElement = this.getInputElement();
    const initialValue: string = this.value() ?? '';
    inputElement.value = initialValue;

    if (this.maskEngine !== null) {
      this.checkVal(false);
    }

    this.focusText = inputElement.value;
    this.updateFilledState();
  }

  public ngOnDestroy(): void {
    if (this.caretTimeoutId !== null) {
      clearTimeout(this.caretTimeoutId);
      this.caretTimeoutId = null;
    }
  }

  /** ControlValueAccessor: write external value into component. */
  public writeValue(value: string | null): void {
    this.value.set(value);

    if (!this.viewInitialized) {
      return;
    }

    const inputElement: HTMLInputElement = this.getInputElement();
    inputElement.value = value ?? '';

    if (this.maskEngine !== null) {
      this.checkVal(false);
    }

    this.focusText = inputElement.value;
    this.updateFilledState();
  }

  /** ControlValueAccessor: register model change callback. */
  public registerOnChange(fn: (value: string | null) => void): void {
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

  /** Focus handler with caret placement. */
  public onFocus(event: Event): void {
    this.isFocused.set(true);
    this.focusText = this.getInputElement().value;

    if (this.caretTimeoutId !== null) {
      clearTimeout(this.caretTimeoutId);
    }

    this.caretTimeoutId = setTimeout((): void => {
      if (!this.viewInitialized) {
        return;
      }

      const caretPosition: number = this.checkVal(false);
      const inputElement: HTMLInputElement = this.getInputElement();

      if (this.maskEngine !== null && this.maskEngine.isCompleted()) {
        this.caret(0, inputElement.value.length);
      } else {
        this.caret(caretPosition, caretPosition);
      }
    }, 10);

    this.focused.emit(event);
  }

  /** Blur handler with optional auto-clear behavior. */
  public onBlur(event: Event): void {
    this.isFocused.set(false);
    this.onModelTouched();

    if (!this.keepBuffer()) {
      this.checkVal(false);
    }

    this.updateFilledState();
    this.blurred.emit(event);

    const currentValue: string = this.getInputElement().value;
    if (currentValue !== this.focusText) {
      this.updateModel(event);
    }
  }

  /** Keydown handler for deletion and escape/enter controls. */
  public onKeyDown(event: KeyboardEvent): void {
    if (this.readonly()) {
      return;
    }

    this.oldVal = this.getInputElement().value;

    if (this.maskEngine === null) {
      return;
    }

    const keyCode: number = event.which || event.keyCode;

    if (keyCode === 8 || keyCode === 46) {
      const position: Caret | undefined = this.caret();
      if (!position) {
        return;
      }

      let begin: number = position.begin;
      let end: number = position.end;

      if (end - begin === 0) {
        begin =
          keyCode !== 46
            ? this.maskEngine.seekPrev(begin)
            : (end = this.maskEngine.seekNext(begin - 1));
        end = keyCode === 46 ? this.maskEngine.seekNext(end) : end;
      }

      this.maskEngine.clearBuffer(begin, end, this.keepBuffer());
      this.maskEngine.shiftL(begin, this.keepBuffer() ? end - 2 : end - 1);
      this.writeBuffer();
      this.updateModel(event);
      this.inputChanged.emit(event);
      event.preventDefault();
      return;
    }

    if (keyCode === 27) {
      this.getInputElement().value = this.focusText;
      this.checkVal(false);
      this.updateModel(event);
      event.preventDefault();
      return;
    }

    if (keyCode === 13) {
      this.onBlur(event);
      this.updateModel(event);
    }
  }

  /** Keypress handler for controlled masked insertion. */
  public onKeyPress(event: KeyboardEvent): void {
    if (this.readonly()) {
      return;
    }

    if (this.maskEngine === null) {
      return;
    }

    const keyCode: number = event.which || event.keyCode;
    if (
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      keyCode < 32 ||
      (keyCode > 34 && keyCode < 41)
    ) {
      return;
    }

    const position: Caret | undefined = this.caret();
    if (!position) {
      return;
    }

    if (position.end - position.begin !== 0) {
      this.maskEngine.clearBuffer(position.begin, position.end, this.keepBuffer());
      this.maskEngine.shiftL(position.begin, position.end - 1);
    }

    const editablePosition: number = this.maskEngine.seekNext(position.begin - 1);
    let isCompleted: boolean = false;

    if (editablePosition < this.maskEngine.len) {
      const character: string = String.fromCharCode(keyCode);
      this.maskEngine.shiftR(editablePosition);

      if (this.maskEngine.setChar(editablePosition, character)) {
        this.writeBuffer();

        const nextPosition: number = this.maskEngine.seekNext(editablePosition);
        this.caret(nextPosition, nextPosition);

        isCompleted = this.maskEngine.isCompleted();
        this.inputChanged.emit(event);
      }
    }

    event.preventDefault();
    this.updateModel(event);

    if (isCompleted) {
      this.completed.emit({
        originalEvent: event,
        value: this.unmask() ? this.maskEngine.getUnmaskedValue() : this.getInputElement().value,
      });
    }
  }

  /** Input handler with Android Chrome fallback path. */
  public onInputChange(event: Event): void {
    if (this.readonly()) {
      return;
    }

    if (this.maskEngine === null) {
      this.updateModel(event);
      this.inputChanged.emit(event);
      return;
    }

    if (this.androidChrome) {
      this.handleAndroidInput(event);
    } else {
      this.handleStandardInput(event);
    }

    this.inputChanged.emit(event);
  }

  /** Paste handler that routes through standard input normalization. */
  public onPaste(event: ClipboardEvent): void {
    if (this.readonly()) {
      return;
    }

    this.oldVal = this.getInputElement().value;

    if (this.maskEngine === null) {
      this.updateModel(event);
      this.inputChanged.emit(event);
      return;
    }

    if (this.androidChrome) {
      this.handleAndroidInput(event);
    } else {
      this.handleStandardInput(event);
    }

    this.inputChanged.emit(event);
  }

  /** Reset the control value and emit clear events. */
  public clear(): void {
    if (this.isControlDisabled()) {
      return;
    }

    const inputElement: HTMLInputElement = this.getInputElement();
    inputElement.value = '';

    if (this.maskEngine !== null) {
      this.maskEngine.reset();
      if (this.keepBuffer()) {
        this.writeBuffer();
      }
    }

    this.value.set(null);
    this.onModelChange(null);
    this.updateFilledState();
    this.cleared.emit();
  }

  /** Programmatically focus the native input. */
  public focus(): void {
    this.getInputElement().focus();
  }

  /** Get or set current caret selection range. */
  private caret(first?: number, last?: number): Caret | undefined {
    const inputElement: HTMLInputElement = this.getInputElement();

    if (typeof first === 'number') {
      const end: number = typeof last === 'number' ? last : first;
      inputElement.setSelectionRange(first, end);
      return undefined;
    }

    return {
      begin: inputElement.selectionStart ?? 0,
      end: inputElement.selectionEnd ?? 0,
    };
  }

  /** Write current mask buffer string to the native input. */
  private writeBuffer(): void {
    if (this.maskEngine === null) {
      return;
    }

    this.getInputElement().value = this.maskEngine.getBufferValue();
  }

  /** Apply model update and propagate through CVA. */
  private updateModel(event: Event): void {
    const updatedValue: string =
      this.unmask() && this.maskEngine !== null
        ? this.maskEngine.getUnmaskedValue()
        : this.getInputElement().value;

    const normalizedValue: string | null = updatedValue.length > 0 ? updatedValue : null;
    this.value.set(normalizedValue);
    this.onModelChange(normalizedValue);
    this.updateFilledState();

    void event;
  }

  /** Refresh filled-state signals used by FloatLabel wrappers. */
  private updateFilledState(): void {
    const hasValue: boolean = this.getInputElement().value.length > 0;
    this.isFilled.set(hasValue);
  }

  private checkVal(allow: boolean): number {
    if (this.maskEngine === null) {
      return 0;
    }

    const inputElement: HTMLInputElement = this.getInputElement();
    const result: { lastMatch: number; bufferValue: string; shouldClear: boolean } =
      this.maskEngine.checkVal(inputElement.value, allow, this.keepBuffer());

    if (!allow && result.shouldClear && this.autoClear() && !this.keepBuffer()) {
      this.maskEngine.reset();
      inputElement.value = '';
      return this.maskEngine.firstNonMaskPos ?? 0;
    }

    inputElement.value = result.bufferValue;

    if (result.lastMatch < 0) {
      return this.maskEngine.firstNonMaskPos ?? 0;
    }

    const nextPosition: number = this.maskEngine.seekNext(result.lastMatch);
    return nextPosition < this.maskEngine.len ? nextPosition : this.maskEngine.len;
  }

  private handleStandardInput(event: Event): void {
    if (this.maskEngine === null) {
      return;
    }

    setTimeout((): void => {
      const caretPosition: number = this.checkVal(true);
      this.caret(caretPosition, caretPosition);
      this.updateModel(event);

      if (this.maskEngine !== null && this.maskEngine.isCompleted()) {
        this.completed.emit({
          originalEvent: event,
          value: this.unmask() ? this.maskEngine.getUnmaskedValue() : this.getInputElement().value,
        });
      }
    }, 0);
  }

  private handleAndroidInput(event: Event): void {
    if (this.maskEngine === null) {
      return;
    }

    const currentValue: string = this.getInputElement().value;
    const position: Caret = this.caret() ?? { begin: 0, end: 0 };

    this.checkVal(true);

    if (this.oldVal.length > currentValue.length) {
      while (position.begin > 0 && !this.isEditable(position.begin - 1)) {
        position.begin -= 1;
      }

      if (position.begin === 0) {
        const firstNonMaskPos: number = this.maskEngine.firstNonMaskPos ?? 0;
        while (position.begin < firstNonMaskPos && !this.isEditable(position.begin)) {
          position.begin += 1;
        }
      }
    } else {
      while (position.begin < this.maskEngine.len && !this.isEditable(position.begin)) {
        position.begin += 1;
      }
    }

    setTimeout((): void => {
      this.caret(position.begin, position.begin);
      this.updateModel(event);

      if (this.maskEngine !== null && this.maskEngine.isCompleted()) {
        this.completed.emit({
          originalEvent: event,
          value: this.unmask() ? this.maskEngine.getUnmaskedValue() : this.getInputElement().value,
        });
      }
    }, 0);
  }

  private isEditable(position: number): boolean {
    return Boolean(this.maskEngine?.tests[position]?.regex);
  }

  private getInputElement(): HTMLInputElement {
    return this.inputEl().nativeElement;
  }

  protected isControlDisabled(): boolean {
    return this.disabled() || this.cvaDisabled();
  }
}
