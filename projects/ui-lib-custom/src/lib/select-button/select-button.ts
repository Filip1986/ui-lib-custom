import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  forwardRef,
  input,
  output,
  signal,
  inject,
} from '@angular/core';
import type {
  TemplateRef,
  InputSignal,
  WritableSignal,
  Signal,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { Button } from 'ui-lib-custom/button';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
  SHARED_DEFAULTS,
  SHARED_SIZES,
  SHARED_THEME_VARIANTS,
  KEYBOARD_KEYS,
} from 'ui-lib-custom/core';
import type {
  SelectButtonChangeEvent,
  SelectButtonItemContext,
  SelectButtonOption,
  SelectButtonSize,
  SelectButtonValue,
  SelectButtonVariant,
} from './select-button.types';

/**
 * Segmented select component that supports single or multiple selection modes.
 */
@Component({
  selector: 'ui-lib-select-button',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './select-button.html',
  styleUrl: './select-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof SelectButton => SelectButton),
      multi: true,
    },
  ],
  host: {
    class: 'ui-lib-select-button',
    '[class.ui-lib-select-button--material]': 'effectiveVariant() === themeVariants.Material',
    '[class.ui-lib-select-button--bootstrap]': 'effectiveVariant() === themeVariants.Bootstrap',
    '[class.ui-lib-select-button--minimal]': 'effectiveVariant() === themeVariants.Minimal',
    '[class.ui-lib-select-button--small]': "normalizedSize() === 'small'",
    '[class.ui-lib-select-button--medium]': "normalizedSize() === 'medium'",
    '[class.ui-lib-select-button--large]': "normalizedSize() === 'large'",
    '[class.ui-lib-select-button--disabled]': 'isDisabled()',
    '[class.ui-lib-select-button--invalid]': 'invalid()',
    '[class.ui-lib-select-button--fluid]': 'fluid()',
    '[attr.role]': 'groupRole()',
    '[attr.aria-labelledby]': 'ariaLabelledBy() || null',
    '[attr.aria-label]': 'ariaLabelResolved()',
    '[attr.aria-disabled]': 'isDisabled() ? true : null',
    '[attr.aria-invalid]': 'invalid() ? true : null',
  },
})
export class SelectButton implements ControlValueAccessor {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly themeVariants: typeof SHARED_THEME_VARIANTS = SHARED_THEME_VARIANTS;

  public readonly options: InputSignal<SelectButtonOption[]> = input<SelectButtonOption[]>([]);
  public readonly variant: InputSignal<SelectButtonVariant | null> =
    input<SelectButtonVariant | null>(null);
  public readonly value: InputSignal<SelectButtonValue | SelectButtonValue[] | null> = input<
    SelectButtonValue | SelectButtonValue[] | null
  >(null);
  public readonly optionLabel: InputSignal<string> = input<string>('label');
  public readonly optionValue: InputSignal<string> = input<string>('value');
  public readonly optionDisabled: InputSignal<string> = input<string>('disabled');

  public readonly multiple: InputSignal<boolean> = input<boolean>(false);
  public readonly allowEmpty: InputSignal<boolean> = input<boolean>(false);

  public readonly size: InputSignal<SelectButtonSize> = input<SelectButtonSize>(
    SHARED_DEFAULTS.Size
  );
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);
  public readonly fluid: InputSignal<boolean> = input<boolean>(false);

  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  public readonly selectionChange: OutputEmitterRef<SelectButtonChangeEvent> =
    output<SelectButtonChangeEvent>();
  public readonly valueChange: OutputEmitterRef<SelectButtonValue | SelectButtonValue[] | null> =
    output<SelectButtonValue | SelectButtonValue[] | null>();

  public readonly itemTemplate: Signal<TemplateRef<SelectButtonItemContext> | undefined> =
    contentChild<TemplateRef<SelectButtonItemContext>>('item');

  public readonly focusedIndex: WritableSignal<number> = signal<number>(-1);
  public readonly internalValue: WritableSignal<SelectButtonValue[]> = signal<SelectButtonValue[]>(
    []
  );
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  private onCvaChange: (value: SelectButtonValue | SelectButtonValue[]) => void = (): void => {};
  private onCvaTouched: () => void = (): void => {};

  public readonly normalizedSize: Signal<'small' | 'medium' | 'large'> = computed<
    'small' | 'medium' | 'large'
  >((): 'small' | 'medium' | 'large' => {
    const size: SelectButtonSize = this.size();
    const map: Record<SelectButtonSize, 'small' | 'medium' | 'large'> = {
      [SHARED_SIZES.Sm]: 'small',
      [SHARED_SIZES.Md]: 'medium',
      [SHARED_SIZES.Lg]: 'large',
      small: 'small',
      medium: 'medium',
      large: 'large',
    };
    return map[size];
  });

  public readonly effectiveVariant: Signal<SelectButtonVariant> = computed<SelectButtonVariant>(
    (): SelectButtonVariant => this.variant() ?? this.themeConfig.variant()
  );
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  public readonly activeIndex: Signal<number> = computed<number>((): number => {
    const opts: SelectButtonOption[] = this.options();
    const focused: number = this.focusedIndex();
    if (focused >= 0 && focused < opts.length) {
      return focused;
    }

    const selectedIndex: number = this.findSelectedIndex(opts);
    if (selectedIndex >= 0) {
      return selectedIndex;
    }

    return this.findFirstEnabledIndex(opts);
  });

  public readonly groupRole: Signal<string> = computed<string>((): string =>
    this.multiple() ? 'group' : 'radiogroup'
  );
  public readonly itemRole: Signal<string> = computed<string>((): string =>
    this.multiple() ? 'checkbox' : 'radio'
  );
  public readonly ariaLabelResolved: Signal<string | null> = computed<string | null>(
    (): string | null => {
      if (this.ariaLabelledBy()) {
        return null;
      }
      return this.ariaLabel() ?? 'Select options';
    }
  );

  public optionAriaChecked(option: SelectButtonOption): string {
    return this.isSelected(option) ? 'true' : 'false';
  }

  public writeValue(obj: SelectButtonValue | SelectButtonValue[] | null): void {
    const next: SelectButtonValue[] = this.normalizeValues(obj);
    this.internalValue.set(next);
  }

  public registerOnChange(fn: (value: SelectButtonValue | SelectButtonValue[]) => void): void {
    this.onCvaChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onCvaTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  public onOptionClick(option: SelectButtonOption, index: number, event: MouseEvent): void {
    event.preventDefault();
    if (this.isDisabled() || this.isOptionDisabled(option)) return;
    this.focusedIndex.set(index);
    this.toggleOption(option, event);
  }

  public tabIndexFor(index: number): number {
    if (this.isDisabled()) return -1;
    return this.activeIndex() === index ? 0 : -1;
  }

  public isSelected(option: SelectButtonOption): boolean {
    const value: SelectButtonValue = this.resolveValue(option);
    return this.internalValue().some((v: SelectButtonValue): boolean => v === value);
  }

  public isOptionDisabled(option: SelectButtonOption): boolean {
    const resolver: string = this.optionDisabled();
    if (resolver) {
      const fieldValue: SelectButtonValue | undefined = this.readOptionField(option, resolver);
      return fieldValue === true;
    }

    return Boolean(option.disabled);
  }

  public resolveLabel(option: SelectButtonOption): string {
    const raw: unknown = option as unknown;
    if (typeof raw !== 'object' || raw === null) {
      return String(raw);
    }
    const resolver: string = this.optionLabel();
    if (resolver) {
      const fieldValue: SelectButtonValue | undefined = this.readOptionField(option, resolver);
      if (fieldValue !== undefined && fieldValue !== null) {
        return String(fieldValue);
      }
    }

    if (option.label !== undefined) {
      return String(option.label);
    }

    const fallbackValue: SelectButtonValue = option.value ?? '';
    return String(fallbackValue);
  }

  public resolveValue(option: SelectButtonOption): SelectButtonValue {
    const raw: unknown = option as unknown;
    if (typeof raw !== 'object' || raw === null) {
      return raw as SelectButtonValue;
    }
    const resolver: string = this.optionValue();
    if (resolver) {
      const fieldValue: SelectButtonValue | undefined = this.readOptionField(option, resolver);
      if (fieldValue !== undefined) {
        return fieldValue;
      }
    }

    return option.value ?? option.label ?? null;
  }

  public trackOption(index: number, option: SelectButtonOption): string | number {
    const value: SelectButtonValue = this.resolveValue(option);
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
    return index;
  }

  constructor() {
    effect((): void => {
      const inputValue: SelectButtonValue | SelectButtonValue[] | null = this.value();
      if (inputValue !== null) {
        this.internalValue.set(this.normalizeValues(inputValue));
      }
    });
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    switch (event.key) {
      case KEYBOARD_KEYS.ArrowRight:
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        this.moveFocus(1);
        break;
      case KEYBOARD_KEYS.ArrowLeft:
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case KEYBOARD_KEYS.Home:
        event.preventDefault();
        this.moveFocusToStart();
        break;
      case KEYBOARD_KEYS.End:
        event.preventDefault();
        this.moveFocusToEnd();
        break;
      case KEYBOARD_KEYS.Space:
      case KEYBOARD_KEYS.Enter:
        event.preventDefault();
        this.commitFocused(event);
        break;
      default:
        break;
    }
  }

  @HostListener('focusout', ['$event'])
  public onFocusOut(event: FocusEvent): void {
    const nextTarget: Node | null = event.relatedTarget as Node | null;
    if (nextTarget && this.el.nativeElement.contains(nextTarget)) {
      return;
    }
    this.onCvaTouched();
  }

  private toggleOption(option: SelectButtonOption, event: Event): void {
    const value: SelectButtonValue = this.resolveValue(option);

    if (this.multiple()) {
      const current: SelectButtonValue[] = this.internalValue();
      const exists: boolean = current.some((v: SelectButtonValue): boolean => v === value);
      const next: SelectButtonValue[] = exists
        ? current.filter((v: SelectButtonValue): boolean => v !== value)
        : [...current, value];
      this.applySelection(next, event);
      return;
    }

    const currentValue: SelectButtonValue | null = this.internalValue()[0] ?? null;
    const isSame: boolean = currentValue === value;
    if (isSame && this.allowEmpty()) {
      this.applySelection([], event);
      return;
    }

    this.applySelection([value], event);
  }

  private applySelection(nextValues: SelectButtonValue[], event: Event): void {
    this.internalValue.set(nextValues);
    const outputValue: SelectButtonValue | SelectButtonValue[] = this.multiple()
      ? nextValues
      : (nextValues[0] ?? null);

    this.selectionChange.emit({ originalEvent: event, value: outputValue });
    this.valueChange.emit(outputValue);
    this.onCvaChange(outputValue);
  }

  private moveFocus(delta: number): void {
    const opts: SelectButtonOption[] = this.options();
    if (!opts.length) return;

    let idx: number = this.activeIndex();
    if (idx < 0) idx = 0;

    const nextIndex: number = this.findNextEnabledIndex(opts, idx, delta);
    if (nextIndex >= 0) {
      this.focusedIndex.set(nextIndex);
      this.focusButton(nextIndex);
    }
  }

  private moveFocusToStart(): void {
    const opts: SelectButtonOption[] = this.options();
    const idx: number = this.findFirstEnabledIndex(opts);
    if (idx >= 0) {
      this.focusedIndex.set(idx);
      this.focusButton(idx);
    }
  }

  private moveFocusToEnd(): void {
    const opts: SelectButtonOption[] = this.options();
    const idx: number = this.findLastEnabledIndex(opts);
    if (idx >= 0) {
      this.focusedIndex.set(idx);
      this.focusButton(idx);
    }
  }

  private commitFocused(event: Event): void {
    const idx: number = this.activeIndex();
    const opts: SelectButtonOption[] = this.options();
    if (idx < 0 || idx >= opts.length) return;

    const option: SelectButtonOption | undefined = opts[idx];
    if (!option || this.isOptionDisabled(option)) return;

    this.toggleOption(option, event);
  }

  private focusButton(index: number): void {
    queueMicrotask((): void => {
      const buttons: NodeListOf<HTMLButtonElement> =
        this.el.nativeElement.querySelectorAll('button');
      const button: HTMLButtonElement | undefined = buttons[index];
      button?.focus();
    });
  }

  private normalizeValues(
    value: SelectButtonValue | SelectButtonValue[] | null
  ): SelectButtonValue[] {
    if (Array.isArray(value)) {
      return value;
    }
    if (value === null) {
      return [];
    }
    return [value];
  }

  private findSelectedIndex(options: SelectButtonOption[]): number {
    if (this.multiple()) return -1;
    const currentValue: SelectButtonValue | null = this.internalValue()[0] ?? null;
    if (currentValue === null) return -1;

    for (let i: number = 0; i < options.length; i += 1) {
      const option: SelectButtonOption | undefined = options[i];
      if (!option) continue;
      if (this.resolveValue(option) === currentValue) return i;
    }

    return -1;
  }

  private findFirstEnabledIndex(options: SelectButtonOption[]): number {
    for (let i: number = 0; i < options.length; i += 1) {
      const option: SelectButtonOption | undefined = options[i];
      if (!option) continue;
      if (!this.isOptionDisabled(option)) return i;
    }
    return -1;
  }

  private findLastEnabledIndex(options: SelectButtonOption[]): number {
    for (let i: number = options.length - 1; i >= 0; i -= 1) {
      const option: SelectButtonOption | undefined = options[i];
      if (!option) continue;
      if (!this.isOptionDisabled(option)) return i;
    }
    return -1;
  }

  private findNextEnabledIndex(
    options: SelectButtonOption[],
    currentIndex: number,
    delta: number
  ): number {
    if (!options.length) return -1;

    let idx: number = currentIndex;
    for (let i: number = 0; i < options.length; i += 1) {
      idx = (idx + delta + options.length) % options.length;
      const option: SelectButtonOption | undefined = options[idx];
      if (!option) continue;
      if (!this.isOptionDisabled(option)) {
        return idx;
      }
    }

    return -1;
  }

  private readOptionField(option: unknown, field: string): SelectButtonValue | undefined {
    if (typeof option !== 'object' || option === null) {
      return undefined;
    }
    const record: Record<string, SelectButtonValue | undefined> = option as Record<
      string,
      SelectButtonValue | undefined
    >;
    if (Object.prototype.hasOwnProperty.call(record, field)) {
      return record[field];
    }
    return undefined;
  }
}
