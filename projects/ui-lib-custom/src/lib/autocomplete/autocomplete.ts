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
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { InputSignal, OutputEmitterRef, Signal, WritableSignal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import {
  AUTOCOMPLETE_EMPTY_TEXT,
  AUTOCOMPLETE_ID_PREFIX,
  AUTOCOMPLETE_LISTBOX_ROLE,
  AUTOCOMPLETE_OPTION_ID_SEPARATOR,
  AUTOCOMPLETE_OPTION_ROLE,
} from './autocomplete.constants';
import type {
  AutoCompleteCompleteEvent,
  AutoCompleteDropdownClickEvent,
  AutoCompleteDropdownMode,
  AutoCompleteSelectEvent,
  AutoCompleteSize,
  AutoCompleteUnselectEvent,
  AutoCompleteVariant,
} from './autocomplete.types';
import {
  AutoCompleteDropdownIconDirective,
  AutoCompleteEmptyDirective,
  AutoCompleteFooterDirective,
  AutoCompleteGroupDirective,
  AutoCompleteHeaderDirective,
  AutoCompleteItemDirective,
  AutoCompleteLoadingDirective,
  AutoCompleteRemoveTokenIconDirective,
  AutoCompleteSelectedItemDirective,
} from './autocomplete.template-directives';

export type {
  AutoCompleteVariant,
  AutoCompleteSize,
  AutoCompleteDropdownMode,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
  AutoCompleteUnselectEvent,
  AutoCompleteDropdownClickEvent,
  AutoCompleteOptionGroup,
} from './autocomplete.types';

let autocompleteIdCounter: number = 0;

/**
 * PrimeNG-inspired autocomplete with single and multiple selection modes.
 */
@Component({
  selector: 'ui-lib-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof UiLibAutoComplete => UiLibAutoComplete),
      multi: true,
    },
  ],
  host: {
    class: 'ui-lib-autocomplete',
    '[class.ui-lib-autocomplete--material]': 'variant() === "material"',
    '[class.ui-lib-autocomplete--bootstrap]': 'variant() === "bootstrap"',
    '[class.ui-lib-autocomplete--minimal]': 'variant() === "minimal"',
    '[class.ui-lib-autocomplete--small]': 'size() === "small"',
    '[class.ui-lib-autocomplete--medium]': 'size() === "medium"',
    '[class.ui-lib-autocomplete--large]': 'size() === "large"',
    '[class.ui-lib-autocomplete--multiple]': 'multiple()',
    '[class.ui-lib-autocomplete--disabled]': 'isDisabled()',
    '[class.ui-lib-autocomplete--invalid]': 'invalid()',
    '[class.ui-lib-autocomplete--filled]': 'filled()',
    '[class.ui-lib-autocomplete--fluid]': 'fluid()',
    '[class.ui-lib-autocomplete--open]': 'panelVisible()',
    '[class.ui-lib-autocomplete--has-value]': 'hasValue()',
  },
})
export class UiLibAutoComplete implements ControlValueAccessor {
  public readonly suggestions: InputSignal<unknown[]> = input<unknown[]>([]);
  public readonly optionLabel: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly optionValue: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly optionDisabled: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly optionGroupLabel: InputSignal<string> = input<string>('label');
  public readonly optionGroupChildren: InputSignal<string> = input<string>('items');

  public readonly dropdown: InputSignal<boolean> = input<boolean>(false);
  public readonly dropdownMode: InputSignal<AutoCompleteDropdownMode> =
    input<AutoCompleteDropdownMode>('blank');
  public readonly multiple: InputSignal<boolean> = input<boolean>(false);
  public readonly forceSelection: InputSignal<boolean> = input<boolean>(false);
  public readonly completeOnFocus: InputSignal<boolean> = input<boolean>(false);
  public readonly autoClear: InputSignal<boolean> = input<boolean>(true);
  public readonly unique: InputSignal<boolean> = input<boolean>(false);
  public readonly minLength: InputSignal<number> = input<number>(1);
  public readonly delay: InputSignal<number> = input<number>(300);
  public readonly maxlength: InputSignal<number | null> = input<number | null>(null);

  public readonly virtualScroll: InputSignal<boolean> = input<boolean>(false);
  public readonly virtualScrollItemSize: InputSignal<number> = input<number>(0);

  public readonly addOnBlur: InputSignal<boolean> = input<boolean>(false);
  public readonly addOnTab: InputSignal<boolean> = input<boolean>(false);
  public readonly separator: InputSignal<string | RegExp | undefined> = input<
    string | RegExp | undefined
  >(undefined);

  public readonly variant: InputSignal<AutoCompleteVariant> =
    input<AutoCompleteVariant>('material');
  public readonly size: InputSignal<AutoCompleteSize> = input<AutoCompleteSize>('medium');
  public readonly placeholder: InputSignal<string> = input<string>('');
  public readonly showClear: InputSignal<boolean> = input<boolean>(false);
  public readonly fluid: InputSignal<boolean> = input<boolean>(false);
  public readonly filled: InputSignal<boolean> = input<boolean>(false);
  public readonly group: InputSignal<boolean> = input<boolean>(false);
  public readonly scrollHeight: InputSignal<string> = input<string>('200px');
  public readonly tabindex: InputSignal<number> = input<number>(0);
  public readonly inputId: InputSignal<string> = input<string>('');
  public readonly appendTo: InputSignal<string | HTMLElement | undefined> = input<
    string | HTMLElement | undefined
  >(undefined);

  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);
  public readonly loading: InputSignal<boolean> = input<boolean>(false);

  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  public readonly completeMethod: OutputEmitterRef<AutoCompleteCompleteEvent> =
    output<AutoCompleteCompleteEvent>();
  public readonly select: OutputEmitterRef<AutoCompleteSelectEvent> =
    output<AutoCompleteSelectEvent>();
  public readonly unselect: OutputEmitterRef<AutoCompleteUnselectEvent> =
    output<AutoCompleteUnselectEvent>();
  public readonly focus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  public readonly blur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  public readonly dropdownClick: OutputEmitterRef<AutoCompleteDropdownClickEvent> =
    output<AutoCompleteDropdownClickEvent>();
  public readonly clearEvent: OutputEmitterRef<void> = output<void>();
  public readonly keyUp: OutputEmitterRef<KeyboardEvent> = output<KeyboardEvent>();

  public readonly itemTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteItemDirective,
    { read: TemplateRef }
  );
  public readonly selectedItemTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteSelectedItemDirective,
    { read: TemplateRef }
  );
  public readonly groupTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteGroupDirective,
    { read: TemplateRef }
  );
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteHeaderDirective,
    { read: TemplateRef }
  );
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteFooterDirective,
    { read: TemplateRef }
  );
  public readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteEmptyDirective,
    { read: TemplateRef }
  );
  public readonly loadingTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteLoadingDirective,
    { read: TemplateRef }
  );
  public readonly dropdownIconTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteDropdownIconDirective,
    { read: TemplateRef }
  );
  public readonly removeTokenIconTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    AutoCompleteRemoveTokenIconDirective,
    { read: TemplateRef }
  );

  protected readonly panelVisible: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly query: WritableSignal<string> = signal<string>('');
  protected readonly focused: WritableSignal<boolean> = signal<boolean>(false);
  private readonly activeIndexState: WritableSignal<number> = signal<number>(-1);
  private readonly focusedChipIndexState: WritableSignal<number> = signal<number>(-1);
  private readonly virtualScrollTop: WritableSignal<number> = signal<number>(0);

  public readonly listboxRole: string = AUTOCOMPLETE_LISTBOX_ROLE;
  public readonly optionRole: string = AUTOCOMPLETE_OPTION_ROLE;
  public readonly emptyText: string = AUTOCOMPLETE_EMPTY_TEXT;

  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  private onChange: (value: unknown) => void = (): void => {};
  private onTouched: () => void = (): void => {};

  private readonly uniqueIdValue: string = `${AUTOCOMPLETE_ID_PREFIX}-${++autocompleteIdCounter}`;
  protected readonly listboxId: string = `${this.uniqueIdValue}-listbox`;
  protected readonly inputIdInternal: Signal<string> = computed<string>((): string => {
    const id: string = this.inputId().trim();
    return id || `${this.uniqueIdValue}-input`;
  });

  protected readonly activeDescendantId: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const index: number = this.activeIndexState();
      if (index < 0 || !this.panelVisible()) {
        return null;
      }
      return this.getOptionId(index);
    }
  );

  protected readonly hasValue: Signal<boolean> = computed<boolean>((): boolean => {
    const value: unknown = this.modelValue();
    if (this.multiple()) {
      return Array.isArray(value) && value.length > 0;
    }
    return value !== null && value !== '';
  });

  protected readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  protected readonly selectedChips: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    const value: unknown = this.modelValue();
    if (!this.multiple()) {
      return [];
    }
    return Array.isArray(value) ? value : [];
  });

  protected readonly visibleOptions: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    if (!this.group()) {
      return this.suggestions();
    }

    const flattened: unknown[] = [];
    this.suggestions().forEach((groupOption: unknown): void => {
      const children: unknown[] = this.getGroupChildren(groupOption);
      flattened.push(...children);
    });
    return flattened;
  });

  protected readonly focusedChipIndex: Signal<number> = computed<number>((): number =>
    this.focusedChipIndexState()
  );

  protected readonly virtualScrollEnabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.virtualScroll() && !this.group() && this.virtualScrollItemSize() > 0
  );

  private readonly virtualItemSizePx: Signal<number> = computed<number>((): number =>
    Math.max(1, this.virtualScrollItemSize() || 44)
  );

  private readonly virtualViewportHeightPx: Signal<number> = computed<number>((): number =>
    this.parsePixelValue(this.scrollHeight(), 200)
  );

  protected readonly virtualStartIndex: Signal<number> = computed<number>((): number => {
    if (!this.virtualScrollEnabled()) return 0;
    return Math.floor(this.virtualScrollTop() / this.virtualItemSizePx());
  });

  private readonly virtualVisibleCount: Signal<number> = computed<number>((): number => {
    if (!this.virtualScrollEnabled()) return this.visibleOptions().length;
    return Math.ceil(this.virtualViewportHeightPx() / this.virtualItemSizePx()) + 2;
  });

  protected readonly virtualEndIndex: Signal<number> = computed<number>((): number => {
    return Math.min(
      this.visibleOptions().length,
      this.virtualStartIndex() + this.virtualVisibleCount()
    );
  });

  protected readonly virtualOffsetPx: Signal<number> = computed<number>(
    (): number => this.virtualStartIndex() * this.virtualItemSizePx()
  );

  protected readonly virtualTotalHeightPx: Signal<number> = computed<number>(
    (): number => this.visibleOptions().length * this.virtualItemSizePx()
  );

  protected readonly virtualOptions: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    if (!this.virtualScrollEnabled()) {
      return this.visibleOptions();
    }
    return this.visibleOptions().slice(this.virtualStartIndex(), this.virtualEndIndex());
  });

  private readonly modelValue: WritableSignal<unknown> = signal<unknown>(null);

  public writeValue(value: unknown): void {
    if (this.multiple()) {
      const normalized: unknown[] = Array.isArray(value)
        ? Array.from(value as unknown[])
        : value === null || value === undefined
          ? []
          : [value];
      this.modelValue.set(normalized);
      this.query.set('');
      return;
    }

    this.modelValue.set(value ?? null);
    this.query.set(this.resolveLabelFromValue(value));
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  public activeIndex(): number {
    return this.activeIndexState();
  }

  public getOptionId(index: number): string {
    return `${this.uniqueIdValue}${AUTOCOMPLETE_OPTION_ID_SEPARATOR}${index}`;
  }

  public optionTrackBy(index: number, option: unknown): string {
    return `${index}-${this.getOptionLabel(option)}`;
  }

  public virtualOptionTrackBy(index: number, option: unknown): string {
    const absoluteIndex: number = this.virtualStartIndex() + index;
    return `${absoluteIndex}-${this.getOptionLabel(option)}`;
  }

  public virtualOptionIndex(index: number): number {
    return this.virtualStartIndex() + index;
  }

  public chipTrackBy(index: number, chip: unknown): string {
    return `${index}-${this.getOptionLabel(chip)}`;
  }

  public groupTrackBy(index: number, groupOption: unknown): string {
    return `${index}-${this.getGroupLabel(groupOption)}`;
  }

  public getOptionIndex(option: unknown): number {
    return this.visibleOptions().findIndex((item: unknown): boolean => item === option);
  }

  public onInput(event: Event): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = target.value;
    this.query.set(value);
    this.focusedChipIndexState.set(-1);

    this.trySeparatorTokenization(event);
    this.scheduleComplete(event, false);
  }

  public onInputFocus(event: FocusEvent): void {
    this.focused.set(true);
    this.focus.emit(event);

    if (this.completeOnFocus()) {
      this.scheduleComplete(event, true);
    }
  }

  public onInputBlur(event: FocusEvent): void {
    this.focused.set(false);
    this.onTouched();
    this.blur.emit(event);

    window.setTimeout((): void => {
      if (this.addOnBlur()) {
        this.commitFreeTextValue(event);
      }

      if (this.forceSelection() && !this.multiple()) {
        this.enforceSingleForceSelection();
      }

      this.focusedChipIndexState.set(-1);
      this.hidePanel();
    }, 0);
  }

  public onInputKeyUp(event: KeyboardEvent): void {
    this.keyUp.emit(event);
  }

  public onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    switch (event.key) {
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        if (!this.panelVisible()) {
          this.showPanel();
          this.scheduleComplete(event, true);
        } else {
          this.moveFocus(1);
        }
        break;
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        if (!this.panelVisible()) {
          this.showPanel();
        } else {
          this.moveFocus(-1);
        }
        break;
      case KEYBOARD_KEYS.Enter:
        if (this.panelVisible() && this.activeIndex() >= 0) {
          event.preventDefault();
          this.commitFocused(event);
          return;
        }
        if (this.multiple()) {
          this.commitFreeTextValue(event);
        }
        break;
      case KEYBOARD_KEYS.Escape:
        if (this.panelVisible()) {
          event.preventDefault();
          this.hidePanel();
        }
        break;
      case KEYBOARD_KEYS.Home:
        if (this.panelVisible()) {
          event.preventDefault();
          this.setActiveIndex(0);
        }
        break;
      case KEYBOARD_KEYS.End:
        if (this.panelVisible()) {
          event.preventDefault();
          this.setActiveIndex(this.visibleOptions().length - 1);
        }
        break;
      case KEYBOARD_KEYS.Tab:
        if (this.addOnTab() && this.multiple()) {
          this.commitFreeTextValue(event);
        }
        break;
      case 'Backspace':
        this.handleBackspaceOnInput(event);
        break;
      case 'Delete':
        this.handleDeleteOnInput(event);
        break;
      case KEYBOARD_KEYS.ArrowLeft:
        this.handleArrowOnChipFocus(event, -1);
        break;
      case KEYBOARD_KEYS.ArrowRight:
        this.handleArrowOnChipFocus(event, 1);
        break;
      default:
        break;
    }
  }

  public onChipKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      this.removeChip(index, event);
      const nextIndex: number = Math.min(index, this.selectedChips().length - 2);
      if (nextIndex >= 0) {
        this.focusChip(nextIndex);
      } else {
        this.focusedChipIndexState.set(-1);
        this.getNativeInputElement()?.focus();
      }
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowLeft) {
      event.preventDefault();
      this.focusChip(Math.max(0, index - 1));
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowRight) {
      event.preventDefault();
      const chipsCount: number = this.selectedChips().length;
      const next: number = index + 1;
      if (next < chipsCount) {
        this.focusChip(next);
      } else {
        this.focusedChipIndexState.set(-1);
        this.getNativeInputElement()?.focus();
      }
    }
  }

  public focusChip(index: number): void {
    const chipsCount: number = this.selectedChips().length;
    if (index < 0 || index >= chipsCount) {
      this.focusedChipIndexState.set(-1);
      return;
    }

    this.focusedChipIndexState.set(index);
    requestAnimationFrame((): void => {
      const element: HTMLElement | null = this.hostElement.nativeElement.querySelector(
        `[data-chip-index=\"${index}\"]`
      );
      element?.focus();
    });
  }

  public onVirtualViewportScroll(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    this.virtualScrollTop.set(target.scrollTop);
  }

  public onDropdownButtonClick(event: Event): void {
    if (this.isDisabled() || this.readonly()) {
      return;
    }

    if (this.dropdownMode() === 'blank') {
      this.query.set('');
      const inputElement: HTMLInputElement | null = this.getNativeInputElement();
      if (inputElement) {
        inputElement.value = '';
      }
    }

    this.dropdownClick.emit({ originalEvent: event, query: this.query() });
    this.showPanel();
    this.scheduleComplete(event, true);

    const inputElement: HTMLInputElement | null = this.getNativeInputElement();
    if (inputElement) {
      inputElement.focus();
    }
  }

  public selectOption(option: unknown, originalEvent: Event): void {
    if (this.isOptionDisabled(option) || this.isDisabled()) {
      return;
    }

    const resolvedValue: unknown = this.getOptionValue(option);

    if (this.multiple()) {
      const currentValues: unknown[] = this.selectedChips();
      const alreadySelected: boolean = currentValues.some(
        (current: unknown): boolean => current === resolvedValue
      );

      if (alreadySelected && this.unique()) {
        this.query.set('');
        return;
      }

      if (alreadySelected) {
        this.query.set('');
        return;
      }

      const nextValues: unknown[] = [...currentValues, resolvedValue];
      this.modelValue.set(nextValues);
      this.onChange(nextValues);
      this.query.set('');
      this.focusedChipIndexState.set(-1);
    } else {
      this.modelValue.set(resolvedValue);
      this.onChange(resolvedValue);
      this.query.set(this.getOptionLabel(option));
      this.hidePanel();
    }

    this.select.emit({ originalEvent, value: resolvedValue });
  }

  public removeChip(index: number, originalEvent: Event): void {
    originalEvent.preventDefault();
    originalEvent.stopPropagation();

    if (!this.multiple() || this.isDisabled() || this.readonly()) {
      return;
    }

    const chips: unknown[] = this.selectedChips();
    if (index < 0 || index >= chips.length) {
      return;
    }

    const removedValue: unknown = chips[index];
    const nextValues: unknown[] = chips.filter(
      (_: unknown, chipIndex: number): boolean => chipIndex !== index
    );

    this.modelValue.set(nextValues);
    this.onChange(nextValues);
    this.unselect.emit({ originalEvent, value: removedValue });

    if (this.focusedChipIndexState() >= nextValues.length) {
      this.focusedChipIndexState.set(nextValues.length - 1);
    }
  }

  public clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isDisabled()) {
      return;
    }

    if (this.multiple()) {
      this.modelValue.set([]);
      this.onChange([]);
    } else {
      this.modelValue.set(null);
      this.onChange(null);
    }

    this.query.set('');
    this.activeIndexState.set(-1);
    this.focusedChipIndexState.set(-1);
    this.hidePanel();
    this.clearEvent.emit();
  }

  public getOptionLabel(option: unknown): string {
    if (option === null || option === undefined) {
      return '';
    }

    if (typeof option !== 'object') {
      return String(option);
    }

    const labelKey: string | undefined = this.optionLabel();
    if (!labelKey) {
      return String(option);
    }

    const recordOption: Record<string, unknown> = option as Record<string, unknown>;
    const resolved: unknown = recordOption[labelKey];
    return resolved === null || resolved === undefined ? '' : String(resolved);
  }

  public getOptionValue(option: unknown): unknown {
    if (option === null || option === undefined) {
      return option;
    }

    if (typeof option !== 'object') {
      return option;
    }

    const valueKey: string | undefined = this.optionValue();
    if (!valueKey) {
      return option;
    }

    const recordOption: Record<string, unknown> = option as Record<string, unknown>;
    return recordOption[valueKey];
  }

  public isOptionDisabled(option: unknown): boolean {
    if (!option || typeof option !== 'object') {
      return false;
    }

    const disabledKey: string | undefined = this.optionDisabled();
    if (!disabledKey) {
      return false;
    }

    const recordOption: Record<string, unknown> = option as Record<string, unknown>;
    return Boolean(recordOption[disabledKey]);
  }

  public isSelected(option: unknown): boolean {
    const optionValue: unknown = this.getOptionValue(option);
    const value: unknown = this.modelValue();

    if (this.multiple()) {
      const values: unknown[] = Array.isArray(value) ? value : [];
      return values.some((item: unknown): boolean => item === optionValue);
    }

    return value === optionValue;
  }

  public getChipLabel(chip: unknown): string {
    if (chip === null || chip === undefined) {
      return '';
    }

    const matchedOption: unknown | undefined = this.visibleOptions().find(
      (option: unknown): boolean => this.getOptionValue(option) === chip
    );

    if (matchedOption !== undefined) {
      return this.getOptionLabel(matchedOption);
    }

    return this.getOptionLabel(chip);
  }

  public getGroupChildren(groupOption: unknown): unknown[] {
    if (!groupOption || typeof groupOption !== 'object') {
      return [];
    }

    const recordGroup: Record<string, unknown> = groupOption as Record<string, unknown>;
    const childrenKey: string = this.optionGroupChildren();
    const children: unknown = recordGroup[childrenKey];

    return Array.isArray(children) ? children : [];
  }

  public getGroupLabel(groupOption: unknown): string {
    if (!groupOption || typeof groupOption !== 'object') {
      return '';
    }

    const recordGroup: Record<string, unknown> = groupOption as Record<string, unknown>;
    const labelKey: string = this.optionGroupLabel();
    const label: unknown = recordGroup[labelKey];

    return label === null || label === undefined ? '' : String(label);
  }

  public setActiveIndex(index: number): void {
    const options: unknown[] = this.visibleOptions();
    if (!options.length) {
      this.activeIndexState.set(-1);
      return;
    }

    const boundedIndex: number = Math.max(0, Math.min(options.length - 1, index));
    if (this.isOptionDisabled(options[boundedIndex])) {
      return;
    }

    this.activeIndexState.set(boundedIndex);
    this.ensureVirtualIndexVisible(boundedIndex);
    this.scrollActiveOptionIntoView();
  }

  public showPanel(): void {
    if (this.isDisabled()) {
      return;
    }

    this.panelVisible.set(true);
    this.activeIndexState.set(this.findFirstEnabledIndex());
    if (this.virtualScrollEnabled()) {
      this.virtualScrollTop.set(0);
    }
  }

  public hidePanel(): void {
    this.panelVisible.set(false);
    this.activeIndexState.set(-1);
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.panelVisible()) {
      return;
    }

    const clickedInside: boolean = this.hostElement.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.hidePanel();
    }
  }

  private scheduleComplete(event: Event, ignoreMinLength: boolean): void {
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    const query: string = this.query();
    if (!ignoreMinLength && query.length < this.minLength()) {
      if (!this.multiple()) {
        this.hidePanel();
      }
      return;
    }

    const delayInMilliseconds: number = Math.max(0, this.delay());
    this.debounceTimer = setTimeout((): void => {
      this.completeMethod.emit({ originalEvent: event, query: this.query() });
      this.showPanel();
      this.ensureVirtualIndexVisible(this.activeIndexState());
    }, delayInMilliseconds);
  }

  private moveFocus(delta: number): void {
    const options: unknown[] = this.visibleOptions();
    if (!options.length) {
      this.activeIndexState.set(-1);
      return;
    }

    let nextIndex: number = this.activeIndexState();
    if (nextIndex < 0) {
      nextIndex = delta > 0 ? -1 : 0;
    }

    let attempts: number = 0;
    do {
      nextIndex = (nextIndex + delta + options.length) % options.length;
      attempts += 1;
      if (!this.isOptionDisabled(options[nextIndex])) {
        this.activeIndexState.set(nextIndex);
        this.scrollActiveOptionIntoView();
        return;
      }
    } while (attempts <= options.length);
  }

  private commitFocused(event: Event): void {
    const index: number = this.activeIndexState();
    const options: unknown[] = this.visibleOptions();
    const focusedOption: unknown | undefined = options[index];
    if (focusedOption === undefined) {
      return;
    }

    this.selectOption(focusedOption, event);
  }

  private enforceSingleForceSelection(): void {
    const currentQuery: string = this.query().trim();
    if (!currentQuery) {
      if (this.autoClear()) {
        this.modelValue.set(null);
        this.onChange(null);
      }
      return;
    }

    const matched: unknown | undefined = this.visibleOptions().find(
      (option: unknown): boolean =>
        this.getOptionLabel(option).toLowerCase() === currentQuery.toLowerCase()
    );

    if (matched !== undefined) {
      this.selectOption(matched, new Event('blur'));
      return;
    }

    const labelFromValue: string = this.resolveLabelFromValue(this.modelValue());
    this.query.set(labelFromValue);

    if (!labelFromValue && this.autoClear()) {
      this.modelValue.set(null);
      this.onChange(null);
    }
  }

  private commitFreeTextValue(event: Event): void {
    if (!this.multiple() || this.forceSelection()) {
      return;
    }

    const value: string = this.query().trim();
    if (!value) {
      return;
    }

    const chips: unknown[] = this.selectedChips();
    if (this.unique() && chips.some((chip: unknown): boolean => chip === value)) {
      this.query.set('');
      return;
    }

    if (chips.some((chip: unknown): boolean => chip === value)) {
      this.query.set('');
      return;
    }

    const nextValues: unknown[] = [...chips, value];
    this.modelValue.set(nextValues);
    this.onChange(nextValues);
    this.select.emit({ originalEvent: event, value });
    this.query.set('');
    this.focusedChipIndexState.set(-1);
  }

  private trySeparatorTokenization(event: Event): void {
    if (!this.multiple() || this.forceSelection()) {
      return;
    }

    const separatorConfig: string | RegExp | undefined = this.separator();
    if (!separatorConfig) {
      return;
    }

    const queryValue: string = this.query();
    const hasSeparator: boolean =
      typeof separatorConfig === 'string'
        ? queryValue.includes(separatorConfig)
        : separatorConfig.test(queryValue);

    if (!hasSeparator) {
      return;
    }

    const parts: string[] =
      typeof separatorConfig === 'string'
        ? queryValue.split(separatorConfig)
        : queryValue.split(separatorConfig);

    const tokens: string[] = parts.map((part: string): string => part.trim()).filter(Boolean);
    if (!tokens.length) {
      return;
    }

    const chips: unknown[] = this.selectedChips();
    const nextValues: unknown[] = [...chips];
    tokens.forEach((token: string): void => {
      if (nextValues.some((existing: unknown): boolean => existing === token)) {
        return;
      }
      nextValues.push(token);
      this.select.emit({ originalEvent: event, value: token });
    });

    this.modelValue.set(nextValues);
    this.onChange(nextValues);
    this.query.set('');
    this.focusedChipIndexState.set(-1);
  }

  private findFirstEnabledIndex(): number {
    const options: unknown[] = this.visibleOptions();
    for (let index: number = 0; index < options.length; index += 1) {
      if (!this.isOptionDisabled(options[index])) {
        return index;
      }
    }
    return -1;
  }

  private scrollActiveOptionIntoView(): void {
    const activeId: string | null = this.activeDescendantId();
    if (!activeId) {
      return;
    }

    requestAnimationFrame((): void => {
      const activeElement: HTMLElement | null = document.getElementById(activeId);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  private resolveLabelFromValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    const matchedOption: unknown | undefined = this.visibleOptions().find(
      (option: unknown): boolean => this.getOptionValue(option) === value
    );

    if (matchedOption !== undefined) {
      return this.getOptionLabel(matchedOption);
    }

    return this.getOptionLabel(value);
  }

  private getNativeInputElement(): HTMLInputElement | null {
    return this.hostElement.nativeElement.querySelector('input.ui-autocomplete-input');
  }

  private handleBackspaceOnInput(event: KeyboardEvent): void {
    if (!this.multiple()) {
      return;
    }

    if (this.query().length > 0) {
      return;
    }

    const chipsCount: number = this.selectedChips().length;
    if (chipsCount === 0) {
      return;
    }

    event.preventDefault();
    const focusedChip: number = this.focusedChipIndexState();
    if (focusedChip < 0) {
      this.focusChip(chipsCount - 1);
      return;
    }

    this.removeChip(focusedChip, event);
    const nextIndex: number = Math.min(focusedChip, this.selectedChips().length - 1);
    if (nextIndex >= 0) {
      this.focusChip(nextIndex);
    } else {
      this.focusedChipIndexState.set(-1);
    }
  }

  private handleDeleteOnInput(event: KeyboardEvent): void {
    if (!this.multiple()) {
      return;
    }

    const focusedChip: number = this.focusedChipIndexState();
    if (focusedChip < 0) {
      return;
    }

    event.preventDefault();
    this.removeChip(focusedChip, event);
    const nextIndex: number = Math.min(focusedChip, this.selectedChips().length - 1);
    if (nextIndex >= 0) {
      this.focusChip(nextIndex);
    } else {
      this.focusedChipIndexState.set(-1);
      this.getNativeInputElement()?.focus();
    }
  }

  private handleArrowOnChipFocus(event: KeyboardEvent, delta: number): void {
    if (!this.multiple()) {
      return;
    }

    if (this.query().length > 0) {
      return;
    }

    const chipsCount: number = this.selectedChips().length;
    if (chipsCount === 0) {
      return;
    }

    const current: number = this.focusedChipIndexState();
    if (current < 0 && delta < 0) {
      event.preventDefault();
      this.focusChip(chipsCount - 1);
      return;
    }

    if (current >= 0) {
      event.preventDefault();
      const nextIndex: number = current + delta;
      if (nextIndex < 0) {
        this.focusedChipIndexState.set(-1);
        this.getNativeInputElement()?.focus();
        return;
      }
      if (nextIndex >= chipsCount) {
        this.focusedChipIndexState.set(-1);
        this.getNativeInputElement()?.focus();
        return;
      }
      this.focusChip(nextIndex);
    }
  }

  private ensureVirtualIndexVisible(index: number): void {
    if (!this.virtualScrollEnabled() || index < 0) {
      return;
    }

    const viewport: HTMLElement | null = this.hostElement.nativeElement.querySelector(
      '.ui-autocomplete-virtual-viewport'
    );
    if (!viewport) {
      return;
    }

    const itemSize: number = this.virtualItemSizePx();
    const top: number = index * itemSize;
    const bottom: number = top + itemSize;
    const viewTop: number = viewport.scrollTop;
    const viewBottom: number = viewTop + viewport.clientHeight;

    if (top < viewTop) {
      viewport.scrollTop = top;
      this.virtualScrollTop.set(top);
    } else if (bottom > viewBottom) {
      const nextTop: number = bottom - viewport.clientHeight;
      viewport.scrollTop = nextTop;
      this.virtualScrollTop.set(nextTop);
    }
  }

  private parsePixelValue(value: string, fallback: number): number {
    const parsed: number = Number.parseInt(value, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
    return fallback;
  }
}
