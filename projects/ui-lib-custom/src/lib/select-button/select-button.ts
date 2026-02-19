import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Button } from 'ui-lib-custom/button';
import {
  SelectButtonChangeEvent,
  SelectButtonItemContext,
  SelectButtonOption,
  SelectButtonSize,
  SelectButtonVariant,
} from './select-button.types';

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
      useExisting: forwardRef(() => SelectButton),
      multi: true,
    },
  ],
  host: {
    class: 'ui-lib-select-button',
    '[class.ui-lib-select-button--material]': "variant() === 'material'",
    '[class.ui-lib-select-button--bootstrap]': "variant() === 'bootstrap'",
    '[class.ui-lib-select-button--minimal]': "variant() === 'minimal'",
    '[class.ui-lib-select-button--small]': "size() === 'small'",
    '[class.ui-lib-select-button--medium]': "size() === 'medium'",
    '[class.ui-lib-select-button--large]': "size() === 'large'",
    '[class.ui-lib-select-button--disabled]': 'isDisabled()',
    '[class.ui-lib-select-button--invalid]': 'invalid()',
    '[class.ui-lib-select-button--fluid]': 'fluid()',
    '[attr.role]': "'group'",
    '[attr.aria-labelledby]': 'ariaLabelledBy() || null',
    '[attr.aria-disabled]': 'isDisabled() ? true : null',
    '[attr.aria-invalid]': 'invalid() ? true : null',
  },
})
export class SelectButton implements ControlValueAccessor {
  options = input<SelectButtonOption[]>([]);
  value = input<any | any[] | null | undefined>(undefined);
  optionLabel = input<string>('label');
  optionValue = input<string>('value');
  optionDisabled = input<string>('disabled');

  multiple = input<boolean>(false);
  allowEmpty = input<boolean>(true);

  variant = input<SelectButtonVariant>('material');
  size = input<SelectButtonSize>('medium');
  disabled = input<boolean>(false);
  invalid = input<boolean>(false);
  fluid = input<boolean>(false);

  ariaLabelledBy = input<string | null>(null);

  onChange = output<SelectButtonChangeEvent>();
  valueChange = output<any | any[]>();

  readonly itemTemplate = contentChild<TemplateRef<SelectButtonItemContext>>('item');

  readonly focusedIndex = signal<number>(-1);
  readonly internalValue = signal<any[]>([]);
  private readonly cvaDisabled = signal<boolean>(false);

  private onCvaChange: (value: any | any[]) => void = () => {};
  private onCvaTouched: () => void = () => {};

  readonly isDisabled = computed<boolean>(() => this.disabled() || this.cvaDisabled());

  readonly activeIndex = computed<number>(() => {
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

  writeValue(obj: any): void {
    const next: any[] = this.normalizeValues(obj);
    this.internalValue.set(next);
  }

  registerOnChange(fn: (value: any | any[]) => void): void {
    this.onCvaChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onCvaTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  onOptionClick(option: SelectButtonOption, index: number, event: MouseEvent): void {
    event.preventDefault();
    if (this.isDisabled() || this.isOptionDisabled(option)) return;
    this.focusedIndex.set(index);
    this.toggleOption(option, event);
  }

  tabIndexFor(index: number): number {
    if (this.isDisabled()) return -1;
    return this.activeIndex() === index ? 0 : -1;
  }

  isSelected(option: SelectButtonOption): boolean {
    const value: any = this.resolveValue(option);
    return this.internalValue().some((v: any) => v === value);
  }

  isOptionDisabled(option: SelectButtonOption): boolean {
    const resolver: string = this.optionDisabled();
    if (resolver) {
      const fieldValue: any = this.readOptionField(option, resolver);
      return fieldValue === true;
    }

    return !!option.disabled;
  }

  resolveLabel(option: SelectButtonOption): string {
    const resolver: string = this.optionLabel();
    if (resolver) {
      const fieldValue: any = this.readOptionField(option, resolver);
      if (fieldValue !== undefined && fieldValue !== null) {
        return String(fieldValue);
      }
    }

    if (option.label !== undefined && option.label !== null) {
      return String(option.label);
    }

    const fallbackValue: any = option.value ?? '';
    return String(fallbackValue);
  }

  resolveValue(option: SelectButtonOption): any {
    const resolver: string = this.optionValue();
    if (resolver) {
      const fieldValue: any = this.readOptionField(option, resolver);
      if (fieldValue !== undefined) {
        return fieldValue;
      }
    }

    return option.value ?? option.label ?? option;
  }

  trackOption(index: number, option: SelectButtonOption): string | number {
    const value: any = this.resolveValue(option);
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
    return index;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.moveFocusToStart();
        break;
      case 'End':
        event.preventDefault();
        this.moveFocusToEnd();
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.commitFocused(event);
        break;
      default:
        break;
    }
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    const nextTarget: Node | null = event.relatedTarget as Node | null;
    if (nextTarget && this.el.nativeElement.contains(nextTarget)) {
      return;
    }
    this.onCvaTouched();
  }

  private toggleOption(option: SelectButtonOption, event: Event): void {
    const value: any = this.resolveValue(option);

    if (this.multiple()) {
      const current: any[] = this.internalValue();
      const exists: boolean = current.some((v: any) => v === value);
      const next: any[] = exists ? current.filter((v: any) => v !== value) : [...current, value];
      this.applySelection(next, event);
      return;
    }

    const currentValue: any = this.internalValue()[0] ?? null;
    const isSame: boolean = currentValue === value;
    if (isSame && this.allowEmpty()) {
      this.applySelection([], event);
      return;
    }

    this.applySelection([value], event);
  }

  private applySelection(nextValues: any[], event: Event): void {
    this.internalValue.set(nextValues);
    const outputValue: any | any[] = this.multiple() ? nextValues : (nextValues[0] ?? null);

    this.onChange.emit({ originalEvent: event, value: outputValue });
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

    const option: SelectButtonOption = opts[idx];
    if (this.isOptionDisabled(option)) return;

    this.toggleOption(option, event);
  }

  private focusButton(index: number): void {
    queueMicrotask(() => {
      const buttons: NodeListOf<HTMLButtonElement> =
        this.el.nativeElement.querySelectorAll('button');
      const button: HTMLButtonElement | undefined = buttons[index];
      button?.focus();
    });
  }

  private normalizeValues(value: any | any[] | null | undefined): any[] {
    if (Array.isArray(value)) {
      return value;
    }
    if (value === null || value === undefined) {
      return [];
    }
    return [value];
  }

  private findSelectedIndex(options: SelectButtonOption[]): number {
    if (this.multiple()) return -1;
    const currentValue: any = this.internalValue()[0] ?? null;
    if (currentValue === null || currentValue === undefined) return -1;

    for (let i: number = 0; i < options.length; i += 1) {
      const option: SelectButtonOption = options[i];
      if (this.resolveValue(option) === currentValue) return i;
    }

    return -1;
  }

  private findFirstEnabledIndex(options: SelectButtonOption[]): number {
    for (let i: number = 0; i < options.length; i += 1) {
      if (!this.isOptionDisabled(options[i])) return i;
    }
    return -1;
  }

  private findLastEnabledIndex(options: SelectButtonOption[]): number {
    for (let i: number = options.length - 1; i >= 0; i -= 1) {
      if (!this.isOptionDisabled(options[i])) return i;
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
      if (!this.isOptionDisabled(options[idx])) {
        return idx;
      }
    }

    return -1;
  }

  private readOptionField(option: SelectButtonOption, field: string): any {
    if (option && Object.prototype.hasOwnProperty.call(option, field)) {
      return option[field];
    }
    return undefined;
  }

  constructor(private readonly el: ElementRef<HTMLElement>) {
    effect((): void => {
      const inputValue: any | any[] | null | undefined = this.value();
      if (inputValue !== undefined) {
        this.internalValue.set(this.normalizeValues(inputValue));
      }
    });
  }
}
