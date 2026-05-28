import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChild,
  forwardRef,
  input,
  signal,
  inject,
  viewChild,
} from '@angular/core';
import type { InputSignal, OnDestroy, Signal, TemplateRef, WritableSignal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { SHARED_DEFAULTS, SHARED_SIZES, KEYBOARD_KEYS } from 'ui-lib-custom/core';
import {
  SELECT_LISTBOX_ROLE,
  SELECT_OPTION_ID_SEPARATOR,
  SELECT_UNGROUPED_KEY,
} from './select.constants';
import type {
  SelectCvaValue,
  SelectOption,
  SelectOptionTemplateContext,
  SelectSize,
  SelectValue,
  SelectVariant,
} from './select.types';

export type {
  SelectVariant,
  SelectSize,
  SelectValueObject,
  SelectValue,
  SelectCvaValue,
  SelectOption,
  SelectOptionTemplateContext,
} from './select.types';

let selectIdCounter: number = 0;

/**
 * Select component with single or multiple selection and optional search.
 */
@Component({
  selector: 'ui-lib-select',
  standalone: true,
  imports: [NgTemplateOutlet, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof UiLibSelect => UiLibSelect),
      multi: true,
    },
  ],
  host: {
    role: 'combobox',
    '[class.ui-lib-select--open]': 'open()',
    '[class.ui-lib-select--has-value]': 'hasValue()',
    '[class.uilib-inputwrapper-focus]': 'open()',
    '[class.uilib-inputwrapper-filled]': 'hasValue()',
    '[attr.aria-expanded]': 'open() ? "true" : "false"',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-controls]': 'open() ? listboxId() : null',
    '[attr.aria-activedescendant]': 'activeDescendantId() || null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-labelledby]': 'resolvedLabelledBy() || null',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.aria-disabled]': 'isDisabled() || loading() ? "true" : null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[attr.tabindex]': 'isDisabled() || loading() ? -1 : 0',
    '(click)': 'onHostClick($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class UiLibSelect implements ControlValueAccessor, OnDestroy {
  public readonly listboxRole: string = SELECT_LISTBOX_ROLE;
  public readonly ungroupedKey: string = SELECT_UNGROUPED_KEY;
  public readonly optionIdSeparator: string = SELECT_OPTION_ID_SEPARATOR;

  /** Option array. Each item: `{ label, value, disabled?, group? }`. Default: `[]`. */
  public readonly options: InputSignal<SelectOption[]> = input<SelectOption[]>([]);
  /** Visual variant. Falls back to global theme when `null`. Default: `null`. */
  public readonly variant: InputSignal<SelectVariant | null> = input<SelectVariant | null>(null);
  /** Control height: `'sm'` (32px) · `'md'` (40px) · `'lg'` (48px). Default: `'md'`. */
  public readonly size: InputSignal<SelectSize> = input<SelectSize>(SHARED_DEFAULTS.Size);
  /** Enable multi-selection; `ngModel` receives `unknown[]`. Default: `false`. */
  public readonly multiple: InputSignal<boolean> = input<boolean>(false);
  /** Show filter input inside panel; announces result count via live region. Default: `false`. */
  public readonly searchable: InputSignal<boolean> = input<boolean>(false);
  /** Text shown when no value is selected. Default: `''` (uses `select.placeholder` locale key). */
  public readonly placeholder: InputSignal<string> = input<string>('');
  /** Disables the control and sets `aria-disabled`. Default: `false`. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  /** Shows spinner and blocks interaction; communicates state via `aria-disabled`. Default: `false`. */
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  /** Custom option row template. Place `<ng-template #optionTemplate let-opt>` inside `<ui-lib-select>`. */
  public readonly optionTemplate: Signal<TemplateRef<SelectOptionTemplateContext> | undefined> =
    contentChild<TemplateRef<SelectOptionTemplateContext>>('optionTemplate');
  /** Visible label rendered above the control; linked via `aria-labelledby`. Default: `''`. */
  public readonly label: InputSignal<string> = input<string>('');
  /** Sets `aria-label` on the host combobox. Use when no visible label is rendered. Default: `null`. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  /** Sets `aria-labelledby` to an external element id; overrides the auto-generated link. Default: `null`. */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
  /** Sets `aria-invalid="true"` and applies error border colour. Default: `false`. */
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);
  /** Sets `aria-required="true"` on the host element. Default: `false`. */
  public readonly required: InputSignal<boolean> = input<boolean>(false);

  /** Signal query for the panel element — undefined when panel is closed. */
  public readonly panel: Signal<ElementRef<HTMLDivElement> | undefined> =
    viewChild<ElementRef<HTMLDivElement>>('panel');
  /** Signal query for the search input — undefined when panel is closed or not searchable. */
  public readonly inputEl: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('inputEl');
  /** Signal query for the control element. */
  public readonly controlEl: Signal<ElementRef<HTMLDivElement> | undefined> =
    viewChild<ElementRef<HTMLDivElement>>('controlEl');

  public readonly open: WritableSignal<boolean> = signal<boolean>(false);
  public readonly filter: WritableSignal<string> = signal<string>('');
  public readonly focusedIndex: WritableSignal<number> = signal<number>(-1);
  public readonly internalValue: WritableSignal<SelectValue[] | null> = signal<
    SelectValue[] | null
  >(null);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document: Document = inject(DOCUMENT);

  private onChange: (value: SelectCvaValue) => void = (): void => {};
  private onTouched: () => void = (): void => {};

  /**
   * Bound document click handler — stored so the same reference can be removed
   * when the panel closes or the component is destroyed.
   */
  private readonly docClickHandler: (event: MouseEvent) => void = (event: MouseEvent): void => {
    if (this.open() && !this.el.nativeElement.contains(event.target as Node)) {
      this.closePanel();
    }
  };

  public registerOnChange(fn: (value: SelectCvaValue) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  private readonly controlIdValue: string = `ui-lib-select-${++selectIdCounter}`;
  public readonly controlId: Signal<string> = computed<string>((): string => this.controlIdValue);
  public readonly labelId: Signal<string> = computed<string>(
    (): string => `${this.controlIdValue}-label`,
  );
  public readonly listboxId: Signal<string> = computed<string>(
    (): string => `${this.controlIdValue}-listbox`,
  );

  private readonly normalizedSize: Signal<'sm' | 'md' | 'lg'> = computed<'sm' | 'md' | 'lg'>(
    (): 'sm' | 'md' | 'lg' => {
      const size: SelectSize = this.size();
      const map: Record<SelectSize, 'sm' | 'md' | 'lg'> = {
        [SHARED_SIZES.Sm]: SHARED_SIZES.Sm,
        [SHARED_SIZES.Md]: SHARED_SIZES.Md,
        [SHARED_SIZES.Lg]: SHARED_SIZES.Lg,
      };
      return map[size];
    },
  );

  public readonly resolvedLabelledBy: Signal<string | null> = computed<string | null>(
    (): string | null => {
      if (this.ariaLabelledBy()) return this.ariaLabelledBy();
      return this.label() ? this.labelId() : null;
    },
  );

  public readonly resolvedPlaceholder: Signal<string> = computed<string>(
    (): string => this.placeholder() || this.i18n.translate('select.placeholder'),
  );

  public readonly effectiveVariant: Signal<SelectVariant> = computed<SelectVariant>(
    (): SelectVariant => this.variant() ?? this.themeConfig.variant(),
  );
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-select',
      `ui-lib-select--${this.effectiveVariant()}`,
      `ui-lib-select--size-${this.normalizedSize()}`,
    ];
    if (this.isDisabled() || this.loading()) classes.push('ui-lib-select--disabled');
    if (this.multiple()) classes.push('ui-lib-select--multiple');
    return classes.join(' ');
  });

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled(),
  );
  public readonly hasValue: Signal<boolean> = computed<boolean>((): boolean => {
    const values: SelectValue[] | null = this.internalValue();
    return values !== null && values.length > 0;
  });

  public readonly displayValue: Signal<string> = computed<string>((): string => {
    const values: SelectValue[] | null = this.internalValue();
    const options: SelectOption[] = this.options();
    if (!values || values.length === 0) return '';
    const labels: string[] = values.map((value: SelectValue): string =>
      this.getOptionLabel(
        options.find((option: SelectOption): boolean => option.value === value) ?? value,
      ),
    );
    return labels.join(', ');
  });

  public readonly filteredOptions: Signal<SelectOption[]> = computed<SelectOption[]>(
    (): SelectOption[] => {
      const term: string = this.filter().toLowerCase();
      const options: SelectOption[] = this.options();
      if (!term) return options;
      return options.filter((option: SelectOption): boolean =>
        option.label.toLowerCase().includes(term),
      );
    },
  );

  public readonly activeDescendantId: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const index: number = this.focusedIndex();
      if (index < 0 || !this.open()) return null;
      return `${this.controlIdValue}${this.optionIdSeparator}${index}`;
    },
  );

  public readonly groupedOptions: Signal<Record<string, SelectOption[]>> = computed<
    Record<string, SelectOption[]>
  >((): Record<string, SelectOption[]> => {
    const groups: Record<string, SelectOption[]> = {};
    this.filteredOptions().forEach((opt: SelectOption): void => {
      const key: string = opt.group ?? this.ungroupedKey;
      groups[key] = groups[key] || [];
      groups[key].push(opt);
    });
    return groups;
  });

  public readonly groupKeys: Signal<string[]> = computed<string[]>((): string[] =>
    Object.keys(this.groupedOptions()),
  );
  public readonly selectedValues: Signal<Set<SelectValue>> = computed<Set<SelectValue>>(
    (): Set<SelectValue> => {
      const values: SelectValue[] = this.internalValue() ?? [];
      return new Set<SelectValue>(values);
    },
  );
  public readonly optionIndexMap: Signal<Map<SelectOption, number>> = computed<
    Map<SelectOption, number>
  >(
    (): Map<SelectOption, number> =>
      new Map<SelectOption, number>(
        this.filteredOptions().map((opt: SelectOption, index: number): [SelectOption, number] => [
          opt,
          index,
        ]),
      ),
  );

  /**
   * Announcement text for the screen-reader live region when filtering in searchable mode.
   * Returns an empty string (no announcement) when the panel is closed or no filter term is set.
   */
  public readonly filteredResultsAnnouncement: Signal<string> = computed<string>((): string => {
    if (!this.searchable() || !this.open() || !this.filter()) return '';
    const count: number = this.filteredOptions().length;
    return count === 1 ? '1 result available' : `${count} results available`;
  });

  public writeValue(obj: SelectCvaValue): void {
    if (this.multiple()) {
      this.internalValue.set(Array.isArray(obj) ? obj : obj === null ? [] : [obj]);
    } else {
      if (Array.isArray(obj)) {
        const first: SelectValue | null = obj[0] ?? null;
        this.internalValue.set(first === null ? [] : [first]);
        return;
      }
      this.internalValue.set(obj === null ? [] : [obj]);
    }
  }

  /**
   * Host click handler — toggles panel unless the click originated inside
   * the panel or the clear button (which have their own handlers).
   */
  public onHostClick(event: MouseEvent): void {
    const target: HTMLElement = event.target as HTMLElement;
    if (
      target.closest('.ui-lib-select__panel') !== null ||
      target.closest('.ui-lib-select__clear') !== null
    ) {
      return;
    }
    this.togglePanel();
  }

  public togglePanel(): void {
    if (this.isDisabled() || this.loading()) return;
    this.open.update((v: boolean): boolean => !v);
    if (this.open()) {
      this.openPanel();
    } else {
      this.closePanel();
    }
  }

  public openPanel(): void {
    if (this.isDisabled() || this.loading()) return;
    this.open.set(true);
    const selectedIndex: number = this.getSelectedIndex();
    const fallbackIndex: number = this.findFirstEnabledIndex();
    this.focusedIndex.set(selectedIndex >= 0 ? selectedIndex : fallbackIndex);
    queueMicrotask((): void => this.inputEl()?.nativeElement.focus());
    // Attach document click listener only while the panel is open.
    this.document.addEventListener('click', this.docClickHandler);
  }

  public closePanel(): void {
    this.open.set(false);
    this.focusedIndex.set(-1);
    this.filter.set('');
    this.onTouched();
    this.el.nativeElement.focus();
    // Remove the document click listener now that the panel is closed.
    this.document.removeEventListener('click', this.docClickHandler);
  }

  public ngOnDestroy(): void {
    // Guard against component being destroyed while panel is still open.
    this.document.removeEventListener('click', this.docClickHandler);
  }

  public selectOption(opt: SelectOption): void {
    if (opt.disabled || this.isDisabled()) return;
    if (this.multiple()) {
      const current: SelectValue[] = this.internalValue() ?? [];
      const exists: boolean = current.some((v: SelectValue): boolean => v === opt.value);
      const next: SelectValue[] = exists
        ? current.filter((v: SelectValue): boolean => v !== opt.value)
        : [...current, opt.value];
      this.internalValue.set(next);
      this.onChange(next);
    } else {
      this.internalValue.set([opt.value]);
      this.onChange(opt.value);
      this.closePanel();
    }
  }

  public clear(): void {
    if (this.isDisabled() || this.loading()) return;
    this.internalValue.set([]);
    this.onChange(this.multiple() ? [] : null);
  }

  public moveFocus(delta: number): void {
    const opts: SelectOption[] = this.filteredOptions();
    if (!opts.length) return;
    const maxIndex: number = opts.length - 1;
    const idx: number = this.focusedIndex();
    let attempts: number = 0;
    let nextIndex: number = idx;

    do {
      nextIndex = (nextIndex + delta + opts.length) % opts.length;
      attempts += 1;
      if (!opts[nextIndex]?.disabled) {
        break;
      }
    } while (attempts <= opts.length);

    nextIndex = Math.max(0, Math.min(maxIndex, nextIndex));
    this.focusedIndex.set(nextIndex);
    this.scrollActiveOptionIntoView();
  }

  public setActiveIndex(index: number): void {
    const opts: SelectOption[] = this.filteredOptions();
    if (!opts.length) return;
    const maxIndex: number = opts.length - 1;
    const next: number = Math.max(0, Math.min(maxIndex, index));
    if (opts[next]?.disabled) {
      return;
    }
    this.focusedIndex.set(next);
    this.scrollActiveOptionIntoView();
  }

  public commitFocused(): void {
    const idx: number = this.focusedIndex();
    const opts: SelectOption[] = this.filteredOptions();
    if (idx >= 0 && idx < opts.length) {
      const option: SelectOption | undefined = opts[idx];
      if (option) {
        this.selectOption(option);
      }
    }
  }

  public onFilter(term: string): void {
    this.filter.set(term);
    const fallbackIndex: number = this.findFirstEnabledIndex();
    this.focusedIndex.set(fallbackIndex);
  }

  public onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.loading()) return;

    switch (event.key) {
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        if (!this.open()) {
          this.openPanel();
        } else {
          this.moveFocus(1);
        }
        break;
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        if (!this.open()) {
          this.openPanel();
        } else {
          this.moveFocus(-1);
        }
        break;
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        if (this.open() && this.focusedIndex() >= 0) {
          this.commitFocused();
        } else {
          this.openPanel();
        }
        break;
      }
      case KEYBOARD_KEYS.Escape:
        if (this.open()) {
          event.preventDefault();
          this.closePanel();
        }
        break;
      case KEYBOARD_KEYS.Home:
        if (this.open()) {
          event.preventDefault();
          this.setActiveIndex(0);
        }
        break;
      case KEYBOARD_KEYS.End:
        if (this.open()) {
          event.preventDefault();
          this.setActiveIndex(this.filteredOptions().length - 1);
        }
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          this.handleTypeahead(event.key);
        }
        break;
    }
  }

  public contextFor(option: SelectOption, index: number): SelectOptionTemplateContext {
    return {
      $implicit: option,
      index,
      selected: this.selectedValues().has(option.value),
      disabled: option.disabled === true,
      active: this.focusedIndex() === index,
    };
  }

  public getOptionLabel(opt: SelectOption | SelectValue): string {
    if (opt && typeof opt === 'object' && 'label' in opt) {
      return String((opt as SelectOption).label);
    }
    return String(opt ?? '');
  }

  private handleTypeahead(char: string): void {
    const opts: SelectOption[] = this.filteredOptions();
    if (!opts.length) return;
    const searchChar: string = char.toLowerCase();
    const startIndex: number = this.focusedIndex() + 1;

    for (let i: number = 0; i < opts.length; i += 1) {
      const index: number = (startIndex + i) % opts.length;
      const option: SelectOption | undefined = opts[index];
      if (!option) continue;
      if (option.disabled) continue;
      const label: string = this.getOptionLabel(option).toLowerCase();
      if (label.startsWith(searchChar)) {
        this.setActiveIndex(index);
        return;
      }
    }
  }

  private scrollActiveOptionIntoView(): void {
    const activeId: string | null = this.activeDescendantId();
    if (!activeId) return;

    requestAnimationFrame((): void => {
      const element: HTMLElement | null = this.document.getElementById(activeId);
      element?.scrollIntoView({ block: 'nearest' });
    });
  }

  private findFirstEnabledIndex(): number {
    const opts: SelectOption[] = this.filteredOptions();
    for (let i: number = 0; i < opts.length; i += 1) {
      if (!opts[i]?.disabled) return i;
    }
    return -1;
  }

  private getSelectedIndex(): number {
    const opts: SelectOption[] = this.filteredOptions();
    const selected: SelectValue[] = this.internalValue() ?? [];
    if (!selected.length) return -1;
    const value: SelectValue = selected[0] as SelectValue;
    return opts.findIndex((opt: SelectOption): boolean => opt.value === value);
  }
}
