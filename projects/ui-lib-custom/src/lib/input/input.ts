import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  signal,
  effect,
  inject,
} from '@angular/core';
import type { ElementRef, InputSignal, WritableSignal, Signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { SHARED_DEFAULTS } from '../core/shared/constants';
import type { InputVariant, InputLabelFloat, InputType, InputSize } from './input.types';

export type { InputVariant, InputLabelFloat, InputType, InputSize } from './input.types';

let inputIdCounter: number = 0;

/**
 * Text input component with floating labels and validation states.
 */
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
      useExisting: forwardRef((): typeof UiLibInput => UiLibInput),
      multi: true,
    },
  ],
})
export class UiLibInput implements ControlValueAccessor {
  public readonly id: InputSignal<string | null> = input<string | null>(null);
  public readonly name: InputSignal<string | null> = input<string | null>(null);
  public readonly label: InputSignal<string> = input<string>('');
  public readonly variant: InputSignal<InputVariant | null> = input<InputVariant | null>(null);
  public readonly size: InputSignal<InputSize> = input<InputSize>(SHARED_DEFAULTS.Size);
  public readonly type: InputSignal<InputType> = input<InputType>('text');
  public readonly labelFloat: InputSignal<InputLabelFloat> = input<InputLabelFloat>('over');
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly error: InputSignal<string | null> = input<string | null>(null);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly required: InputSignal<boolean> = input<boolean>(false);
  public readonly showCounter: InputSignal<boolean> = input<boolean>(false);
  public readonly maxLength: InputSignal<number | null> = input<number | null>(null);
  public readonly showClear: InputSignal<boolean> = input<boolean>(false);
  public readonly showTogglePassword: InputSignal<boolean> = input<boolean>(false);

  public readonly value: WritableSignal<string> = signal<string>('');
  public readonly focused: WritableSignal<boolean> = signal<boolean>(false);
  public readonly showPassword: WritableSignal<boolean> = signal<boolean>(false);
  private readonly _disabled: WritableSignal<boolean> = signal<boolean>(false);

  private onChange: (value: string) => void = (): void => {};
  private onTouched: () => void = (): void => {};

  public readonly controlId: Signal<string> = computed<string>(
    (): string => this.id() ?? `ui-lib-input-${++inputIdCounter}`
  );
  public readonly describedById: Signal<string | undefined> = computed<string | undefined>(
    (): string | undefined => (this.error() ? `${this.controlId()}-error` : undefined)
  );
  public readonly displayPlaceholder: Signal<string> = computed<string>((): string =>
    this.labelFloat() === 'over' ? this.placeholder() : ''
  );
  public readonly inputType: Signal<InputType> = computed<InputType>((): InputType => {
    if (this.type() === 'password' && this.showTogglePassword()) {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  public readonly effectiveVariant: Signal<InputVariant> = computed<InputVariant>(
    (): InputVariant => this.variant() ?? this.themeConfig.variant()
  );
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
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

  public readonly isFloating: Signal<boolean> = computed<boolean>((): boolean => {
    const mode: InputLabelFloat = this.labelFloat();
    if (mode === 'over') return false;
    return this.focused() || Boolean(this.value());
  });
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this._disabled()
  );
  public readonly currentLength: Signal<number> = computed<number>((): number => {
    const value: string = this.value();
    return value.length;
  });

  @ViewChild('inputEl') public inputEl?: ElementRef<HTMLInputElement>;

  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
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
    this.showPassword.update((v: boolean): boolean => !v);
  }

  public focusInput(event?: MouseEvent): void {
    if (event) {
      const target: HTMLElement = event.target as HTMLElement;
      if (target.closest('button')) return;
    }
    this.inputEl?.nativeElement.focus();
  }
}
