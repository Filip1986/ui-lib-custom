import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
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
import {
  INPUT_NUMBER_DEFAULTS,
  type InputNumberButtonLayout,
  type InputNumberCurrencyDisplay,
  type InputNumberLocaleMatcher,
  type InputNumberMode,
} from './input-number.types';
import { NumberFormatService, type NumberFormatConfig } from './number-format.service';

let inputNumberIdCounter: number = 0;

/** Numeric input with locale-aware parsing/formatting, CVA support, and spinner controls. */
@Component({
  selector: 'uilib-input-number',
  standalone: true,
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof InputNumberComponent => InputNumberComponent),
      multi: true,
    },
  ],
  host: {
    class: 'uilib-input-number',
    '[class.uilib-input-number-stacked]': 'showButtons() && buttonLayout() === "stacked"',
    '[class.uilib-input-number-horizontal]': 'showButtons() && buttonLayout() === "horizontal"',
    '[class.uilib-input-number-vertical]': 'showButtons() && buttonLayout() === "vertical"',
    '[class.uilib-input-number-sm]': 'size() === "sm"',
    '[class.uilib-input-number-md]': 'size() === "md"',
    '[class.uilib-input-number-lg]': 'size() === "lg"',
    '[class.uilib-input-number-filled]':
      'filled() || value() !== null || displayValue().length > 0',
    '[class.uilib-input-number-fluid]': 'fluid()',
    '[class.uilib-input-number-invalid]': 'invalid()',
    '[class.uilib-input-number-disabled]': 'isControlDisabled()',
    '[class.uilib-variant-material]': 'effectiveVariant() === "material"',
    '[class.uilib-variant-bootstrap]': 'effectiveVariant() === "bootstrap"',
    '[class.uilib-variant-minimal]': 'effectiveVariant() === "minimal"',
    '[class.uilib-inputwrapper-filled]': 'value() !== null || displayValue().length > 0',
    '[class.uilib-inputwrapper-focus]': 'isFocused()',
  },
  template: `
    @if (showButtons() && buttonLayout() === 'vertical') {
      <button
        type="button"
        class="uilib-input-number-button uilib-input-number-button-up"
        [disabled]="isControlDisabled() || !canIncrement()"
        (mousedown)="onSpinMouseDown($event, 1)"
        (mouseup)="stopSpinRepeat()"
        (mouseleave)="stopSpinRepeat()"
      >
        ▲
      </button>
    }

    @if (showButtons() && buttonLayout() === 'horizontal') {
      <button
        type="button"
        class="uilib-input-number-button uilib-input-number-button-down"
        [disabled]="isControlDisabled() || !canDecrement()"
        (mousedown)="onSpinMouseDown($event, -1)"
        (mouseup)="stopSpinRepeat()"
        (mouseleave)="stopSpinRepeat()"
      >
        −
      </button>
    }

    <span class="uilib-input-number-input-wrapper">
      @if (prefix()) {
        <span class="uilib-input-number-prefix">{{ prefix() }}</span>
      }

      <input
        #inputElement
        type="text"
        inputmode="decimal"
        role="spinbutton"
        [value]="displayValue()"
        [disabled]="isControlDisabled()"
        [readOnly]="readonly()"
        [placeholder]="placeholder()"
        [id]="inputId()"
        [attr.aria-valuemin]="min()"
        [attr.aria-valuemax]="max()"
        [attr.aria-valuenow]="value()"
        [attr.aria-label]="ariaLabel() || null"
        [attr.aria-labelledby]="ariaLabelledBy() || null"
        [attr.aria-describedby]="ariaDescribedBy() || null"
        [attr.tabindex]="tabindex()"
        [attr.autocomplete]="autocomplete()"
        [class.uilib-input-number-input]="true"
        (input)="onNativeInput($event)"
        (focus)="onNativeFocus($event)"
        (blur)="onNativeBlur($event)"
        (keydown)="onNativeKeyDown($event)"
      />

      @if (suffix()) {
        <span class="uilib-input-number-suffix">{{ suffix() }}</span>
      }

      @if (showClear() && value() !== null && !isControlDisabled()) {
        <button type="button" class="uilib-input-number-clear" (click)="clearValue()">×</button>
      }
    </span>

    @if (showButtons() && buttonLayout() === 'stacked') {
      <span class="uilib-input-number-button-group">
        <button
          type="button"
          class="uilib-input-number-button uilib-input-number-button-up"
          [disabled]="isControlDisabled() || !canIncrement()"
          (mousedown)="onSpinMouseDown($event, 1)"
          (mouseup)="stopSpinRepeat()"
          (mouseleave)="stopSpinRepeat()"
        >
          ▲
        </button>
        <button
          type="button"
          class="uilib-input-number-button uilib-input-number-button-down"
          [disabled]="isControlDisabled() || !canDecrement()"
          (mousedown)="onSpinMouseDown($event, -1)"
          (mouseup)="stopSpinRepeat()"
          (mouseleave)="stopSpinRepeat()"
        >
          ▼
        </button>
      </span>
    }

    @if (showButtons() && buttonLayout() === 'horizontal') {
      <button
        type="button"
        class="uilib-input-number-button uilib-input-number-button-up"
        [disabled]="isControlDisabled() || !canIncrement()"
        (mousedown)="onSpinMouseDown($event, 1)"
        (mouseup)="stopSpinRepeat()"
        (mouseleave)="stopSpinRepeat()"
      >
        +
      </button>
    }

    @if (showButtons() && buttonLayout() === 'vertical') {
      <button
        type="button"
        class="uilib-input-number-button uilib-input-number-button-down"
        [disabled]="isControlDisabled() || !canDecrement()"
        (mousedown)="onSpinMouseDown($event, -1)"
        (mouseup)="stopSpinRepeat()"
        (mouseleave)="stopSpinRepeat()"
      >
        ▼
      </button>
    }
  `,
})
export class InputNumberComponent implements ControlValueAccessor {
  public readonly value: ModelSignal<number | null> = model<number | null>(null);
  public readonly mode: InputSignal<InputNumberMode> = input<InputNumberMode>(
    INPUT_NUMBER_DEFAULTS.mode
  );
  public readonly format: InputSignal<boolean> = input<boolean>(INPUT_NUMBER_DEFAULTS.format);
  public readonly locale: InputSignal<string | undefined> = input<string | undefined>(undefined);
  public readonly currency: InputSignal<string | undefined> = input<string | undefined>(undefined);
  public readonly currencyDisplay: InputSignal<InputNumberCurrencyDisplay> =
    input<InputNumberCurrencyDisplay>(INPUT_NUMBER_DEFAULTS.currencyDisplay);
  public readonly localeMatcher: InputSignal<InputNumberLocaleMatcher> =
    input<InputNumberLocaleMatcher>(INPUT_NUMBER_DEFAULTS.localeMatcher);
  public readonly useGrouping: InputSignal<boolean> = input<boolean>(
    INPUT_NUMBER_DEFAULTS.useGrouping
  );
  public readonly minFractionDigits: InputSignal<number | null> = input<number | null>(
    INPUT_NUMBER_DEFAULTS.minFractionDigits
  );
  public readonly maxFractionDigits: InputSignal<number | null> = input<number | null>(
    INPUT_NUMBER_DEFAULTS.maxFractionDigits
  );
  public readonly prefix: InputSignal<string> = input<string>('');
  public readonly suffix: InputSignal<string> = input<string>('');
  public readonly min: InputSignal<number | null> = input<number | null>(INPUT_NUMBER_DEFAULTS.min);
  public readonly max: InputSignal<number | null> = input<number | null>(INPUT_NUMBER_DEFAULTS.max);
  public readonly step: InputSignal<number> = input<number>(INPUT_NUMBER_DEFAULTS.step);
  public readonly showButtons: InputSignal<boolean> = input<boolean>(
    INPUT_NUMBER_DEFAULTS.showButtons
  );
  public readonly buttonLayout: InputSignal<InputNumberButtonLayout> =
    input<InputNumberButtonLayout>(INPUT_NUMBER_DEFAULTS.buttonLayout);
  public readonly showClear: InputSignal<boolean> = input<boolean>(INPUT_NUMBER_DEFAULTS.showClear);
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly inputId: InputSignal<string> = input<string>(
    `uilib-input-number-${++inputNumberIdCounter}`
  );
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);
  public readonly filled: InputSignal<boolean> = input<boolean>(false);
  public readonly size: InputSignal<'sm' | 'md' | 'lg'> = input<'sm' | 'md' | 'lg'>('md');
  public readonly fluid: InputSignal<boolean> = input<boolean>(false);
  public readonly variant: InputSignal<'material' | 'bootstrap' | 'minimal' | null> = input<
    'material' | 'bootstrap' | 'minimal' | null
  >(null);
  public readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined);
  public readonly ariaLabelledBy: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly ariaDescribedBy: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly tabindex: InputSignal<number> = input<number>(0);
  public readonly autocomplete: InputSignal<string> = input<string>('off');

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onInput: OutputEmitterRef<{ originalEvent: InputEvent; value: number | null }> =
    output<{ originalEvent: InputEvent; value: number | null }>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onKeyDown: OutputEmitterRef<KeyboardEvent> = output<KeyboardEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onClear: OutputEmitterRef<void> = output<void>();

  private readonly inputElement: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('inputElement');
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly isFocused: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly displayValue: WritableSignal<string> = signal<string>('');
  private readonly numberFormatService: NumberFormatService = new NumberFormatService();
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  private spinDelayTimer: ReturnType<typeof setTimeout> | null = null;
  private spinIntervalTimer: ReturnType<typeof setInterval> | null = null;

  private onModelChange: (value: number | null) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};

  protected readonly effectiveVariant: Signal<'material' | 'bootstrap' | 'minimal'> = computed<
    'material' | 'bootstrap' | 'minimal'
  >((): 'material' | 'bootstrap' | 'minimal' => this.variant() ?? this.themeConfig.variant());

  private readonly numberFormatConfig: Signal<NumberFormatConfig> = computed<NumberFormatConfig>(
    (): NumberFormatConfig => {
      const config: NumberFormatConfig = {
        mode: this.mode(),
        currencyDisplay: this.currencyDisplay(),
        localeMatcher: this.localeMatcher(),
        useGrouping: this.useGrouping(),
        minFractionDigits: this.minFractionDigits(),
        maxFractionDigits: this.maxFractionDigits(),
      };

      const locale: string | undefined = this.locale();
      if (locale !== undefined) {
        config.locale = locale;
      }

      const currency: string | undefined = this.currency();
      if (currency !== undefined) {
        config.currency = currency;
      }

      const prefix: string = this.prefix();
      if (prefix.length > 0) {
        config.prefix = prefix;
      }

      const suffix: string = this.suffix();
      if (suffix.length > 0) {
        config.suffix = suffix;
      }

      return config;
    }
  );

  constructor() {
    effect((): void => {
      this.numberFormatService.configure(this.numberFormatConfig());
      const currentValue: number | null = untracked((): number | null => this.value());
      this.syncDisplayValue(currentValue);
    });
  }

  public writeValue(value: number | null): void {
    this.value.set(value);
    this.syncDisplayValue(value);
  }

  public registerOnChange(fn: (value: number | null) => void): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
    if (isDisabled) {
      this.stopSpinRepeat();
    }
  }

  public onNativeInput(event: Event): void {
    const inputEvent: InputEvent = event as InputEvent;
    const inputValue: string = (event.target as HTMLInputElement).value;
    this.displayValue.set(inputValue);

    const parsedValue: number | null = this.numberFormatService.parseValue(inputValue);
    const validatedValue: number | null = this.clampValue(parsedValue);

    this.value.set(validatedValue);
    this.onModelChange(validatedValue);
    this.onInput.emit({ originalEvent: inputEvent, value: validatedValue });
  }

  public onNativeFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    const nativeInput: HTMLInputElement | null = this.getNativeInputElement();
    if (nativeInput !== null) {
      queueMicrotask((): void => {
        nativeInput.select();
      });
    }

    this.onFocus.emit(event);
  }

  public onNativeBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.stopSpinRepeat();

    const currentValue: number | null = this.clampValue(
      this.numberFormatService.parseValue(this.displayValue())
    );
    this.value.set(currentValue);
    this.onModelChange(currentValue);
    this.onModelTouched();
    this.syncDisplayValue(currentValue);

    this.onBlur.emit(event);
  }

  public onNativeKeyDown(event: KeyboardEvent): void {
    if (this.isControlDisabled() || this.readonly()) {
      this.onKeyDown.emit(event);
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        this.spinBy(1);
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.spinBy(-1);
        event.preventDefault();
        break;
      case 'PageUp':
        this.spinBy(10);
        event.preventDefault();
        break;
      case 'PageDown':
        this.spinBy(-10);
        event.preventDefault();
        break;
      case 'Home':
        if (this.min() !== null) {
          this.setValueAndSync(this.min());
          event.preventDefault();
        }
        break;
      case 'End':
        if (this.max() !== null) {
          this.setValueAndSync(this.max());
          event.preventDefault();
        }
        break;
      default:
        if (!this.isAllowedKey(event)) {
          event.preventDefault();
        }
        break;
    }

    this.onKeyDown.emit(event);
  }

  public onSpinMouseDown(event: MouseEvent, direction: -1 | 1): void {
    event.preventDefault();

    if (this.isControlDisabled() || this.readonly()) {
      return;
    }

    this.spinBy(direction);
    this.startSpinRepeat(direction);
  }

  public stopSpinRepeat(): void {
    if (this.spinDelayTimer !== null) {
      clearTimeout(this.spinDelayTimer);
      this.spinDelayTimer = null;
    }

    if (this.spinIntervalTimer !== null) {
      clearInterval(this.spinIntervalTimer);
      this.spinIntervalTimer = null;
    }
  }

  public clearValue(): void {
    if (this.isControlDisabled()) {
      return;
    }

    this.stopSpinRepeat();
    this.value.set(null);
    this.displayValue.set('');
    this.onModelChange(null);
    this.onModelTouched();
    this.onClear.emit();
  }

  protected canIncrement(): boolean {
    const currentValue: number = this.value() ?? 0;
    const maxValue: number | null = this.max();
    return maxValue === null || currentValue < maxValue;
  }

  protected canDecrement(): boolean {
    const currentValue: number = this.value() ?? 0;
    const minValue: number | null = this.min();
    return minValue === null || currentValue > minValue;
  }

  protected isControlDisabled(): boolean {
    return this.disabled() || this.cvaDisabled();
  }

  private setValueAndSync(value: number | null): void {
    const normalizedValue: number | null = this.clampValue(value);
    this.value.set(normalizedValue);
    this.onModelChange(normalizedValue);
    this.syncDisplayValue(normalizedValue);
  }

  private spinBy(multiplier: number): void {
    const stepValue: number = this.step() * multiplier;
    const currentValue: number = this.value() ?? 0;
    const nextValue: number = currentValue + stepValue;
    this.setValueAndSync(nextValue);
  }

  private startSpinRepeat(direction: -1 | 1): void {
    this.stopSpinRepeat();

    this.spinDelayTimer = setTimeout((): void => {
      this.spinIntervalTimer = setInterval((): void => {
        if (this.isControlDisabled() || this.readonly()) {
          this.stopSpinRepeat();
          return;
        }

        this.spinBy(direction);
      }, 50);
    }, 400);
  }

  private clampValue(value: number | null): number | null {
    if (value === null || Number.isNaN(value)) {
      return null;
    }

    const minValue: number | null = this.min();
    const maxValue: number | null = this.max();

    if (minValue !== null && value < minValue) {
      return minValue;
    }

    if (maxValue !== null && value > maxValue) {
      return maxValue;
    }

    return value;
  }

  private syncDisplayValue(value: number | null): void {
    this.displayValue.set(this.toDisplayValue(value));
  }

  private toDisplayValue(value: number | null): string {
    if (value === null) {
      return '';
    }

    if (this.format()) {
      return this.numberFormatService.formatValue(value);
    }

    const stringValue: string = String(value);
    return `${this.prefix()}${stringValue}${this.suffix()}`;
  }

  private isAllowedKey(event: KeyboardEvent): boolean {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return true;
    }

    const allowedKeys: Set<string> = new Set<string>([
      'Backspace',
      'Delete',
      'Tab',
      'Enter',
      'Escape',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'PageUp',
      'PageDown',
    ]);

    if (allowedKeys.has(event.key)) {
      return true;
    }

    if (event.key.length !== 1) {
      return false;
    }

    const decimalSeparator: string = this.numberFormatService.getDecimalSeparator();
    const groupSeparator: string = this.numberFormatService.getGroupSeparator();

    return (
      /[0-9]/.test(event.key) ||
      event.key === '-' ||
      event.key === decimalSeparator ||
      event.key === groupSeparator
    );
  }

  private getNativeInputElement(): HTMLInputElement | null {
    return this.inputElement()?.nativeElement ?? null;
  }
}
