import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  signal,
  effect,
  inject,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { ThemeConfigService } from 'ui-lib-custom/theme';

export type InputVariant = 'material' | 'bootstrap' | 'minimal';
export type InputLabelFloat = 'over' | 'in' | 'on';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
export type InputSize = 'sm' | 'md' | 'lg';

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
  public readonly id = input<string | null>(null);
  public readonly name = input<string | null>(null);
  public readonly variant = input<InputVariant | null>(null);
  public readonly size = input<InputSize>('md');
  public readonly type = input<InputType>('text');
  public readonly label = input<string>('');
  public readonly labelFloat = input<InputLabelFloat>('over');
  public readonly placeholder = input<string>('');
  public readonly error = input<string | null>(null);
  public readonly disabled = input<boolean>(false);
  public readonly required = input<boolean>(false);
  public readonly showCounter = input<boolean>(false);
  public readonly maxLength = input<number | null>(null);
  public readonly showClear = input<boolean>(false);
  public readonly showTogglePassword = input<boolean>(false);

  public readonly value = signal<string>('');
  public readonly focused = signal(false);
  public readonly showPassword = signal(false);
  private readonly _disabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  public readonly controlId = computed<string>(
    () => this.id() ?? `ui-lib-input-${++inputIdCounter}`
  );
  public readonly describedById = computed<string | undefined>(() =>
    this.error() ? `${this.controlId()}-error` : undefined
  );
  public readonly displayPlaceholder = computed<string>(() =>
    this.labelFloat() === 'over' ? this.placeholder() : ''
  );
  public readonly inputType = computed<InputType>(() => {
    if (this.type() === 'password' && this.showTogglePassword()) {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  private readonly themeConfig = inject(ThemeConfigService);

  public readonly effectiveVariant = computed<InputVariant>(
    () => this.variant() ?? this.themeConfig.variant()
  );
  public readonly hostClasses = computed<string>(() => {
    const classes: string[] = [
      'ui-input',
      `ui-input-${this.effectiveVariant()}`,
      `ui-input-size-${this.size()}`,
      `ui-input-float-${this.labelFloat()}`,
    ];
    if (this.labelFloat() !== 'over') classes.push('ui-input-has-floating');
    if (this.isDisabled()) classes.push('ui-input-disabled');
    if (this.error()) classes.push('ui-input-error');
    if (this.isFloating()) classes.push('ui-input-floating-active');
    return classes.join(' ');
  });

  public readonly isFloating = computed<boolean>(() => {
    const mode: InputLabelFloat = this.labelFloat();
    if (mode === 'over') return false;
    return this.focused() || Boolean(this.value());
  });
  public readonly isDisabled = computed<boolean>(() => this.disabled() || this._disabled());
  public readonly currentLength = computed<number>(() => {
    const value: string = this.value();
    return value.length;
  });

  @ViewChild('inputEl') public inputEl?: ElementRef<HTMLInputElement>;

  private readonly liveAnnouncer = inject(LiveAnnouncerService);
  private previousError: string | null = null;

  constructor() {
    effect((): void => {
      const currentError: string | null = this.error();

      if (currentError && currentError !== this.previousError) {
        void this.liveAnnouncer.announceError(currentError);
      }

      this.previousError = currentError;
    });
  }

  public writeValue(obj: unknown): void {
    this.value.set((obj ?? '') as string);
  }
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  public setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  public onInput(val: string): void {
    this.value.set(val);
    this.onChange(val);
  }

  public onBlur(): void {
    this.focused.set(false);
    this.onTouched();
  }

  public onFocus(): void {
    this.focused.set(true);
  }

  public clear(): void {
    if (this.isDisabled()) return;
    this.onInput('');
  }

  public togglePassword(): void {
    if (this.isDisabled()) return;
    this.showPassword.update((v) => !v);
  }

  public focusInput(event?: MouseEvent): void {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.closest('button')) return;
    }
    this.inputEl?.nativeElement.focus();
  }
}
