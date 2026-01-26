import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputVariant = 'material' | 'bootstrap' | 'minimal';
export type InputLabelFloat = 'over' | 'in' | 'on';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

let inputIdCounter = 0;

@Component({
  selector: 'ui-lib-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiLibInput),
      multi: true,
    },
  ],
})
export class UiLibInput implements ControlValueAccessor {
  id = input<string | null>(null);
  name = input<string | null>(null);
  variant = input<InputVariant>('material');
  type = input<InputType>('text');
  label = input<string>('');
  labelFloat = input<InputLabelFloat>('over');
  placeholder = input<string>('');
  error = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  showCounter = input<boolean>(false);
  maxLength = input<number | null>(null);
  showClear = input<boolean>(false);
  showTogglePassword = input<boolean>(false);

  readonly value = signal<string>('');
  readonly focused = signal(false);
  readonly showPassword = signal(false);
  private readonly _disabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly controlId = computed(() => this.id() ?? `ui-lib-input-${++inputIdCounter}`);
  readonly describedById = computed(() => (this.error() ? `${this.controlId()}-error` : undefined));
  readonly displayPlaceholder = computed(() => (this.labelFloat() === 'over' ? this.placeholder() : ''));
  readonly inputType = computed<InputType>(() => {
    if (this.type() === 'password' && this.showTogglePassword()) {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  readonly hostClasses = computed(() => {
    const classes = [
      'ui-input',
      `ui-input-${this.variant()}`,
      `ui-input-float-${this.labelFloat()}`,
    ];
    if (this.labelFloat() !== 'over') classes.push('ui-input-has-floating');
    if (this.isDisabled()) classes.push('ui-input-disabled');
    if (this.error()) classes.push('ui-input-error');
    if (this.isFloating()) classes.push('ui-input-floating-active');
    return classes.join(' ');
  });

  readonly isFloating = computed(() => {
    const mode = this.labelFloat();
    if (mode === 'over') return false;
    return this.focused() || !!this.value();
  });
  readonly isDisabled = computed(() => this.disabled() || this._disabled());

  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  writeValue(obj: unknown): void {
    this.value.set((obj ?? '') as string);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  onInput(val: string): void {
    this.value.set(val);
    this.onChange(val);
  }

  onBlur(): void {
    this.focused.set(false);
    this.onTouched();
  }

  onFocus(): void {
    this.focused.set(true);
  }

  clear(): void {
    if (this.isDisabled()) return;
    this.onInput('');
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  currentLength(): number {
    return this.value()?.length ?? 0;
  }

  focusInput(event?: MouseEvent): void {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.closest('button')) return;
    }
    this.inputEl?.nativeElement.focus();
  }
}
