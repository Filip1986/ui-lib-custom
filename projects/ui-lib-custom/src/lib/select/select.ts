import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  signal,
  inject,
} from '@angular/core';
import type { TemplateRef, InputSignal, WritableSignal, Signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { SHARED_DEFAULTS, SHARED_SIZES, KEYBOARD_KEYS } from 'ui-lib-custom/core';
import {
  SELECT_LISTBOX_ROLE,
  SELECT_OPTION_ID_SEPARATOR,
  SELECT_UNGROUPED_KEY,
} from './select.constants';
import type {
  SelectCvaValue,
  SelectOption,
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
} from './select.types';

let selectIdCounter: number = 0;

/**
 * Select component with single or multiple selection and optional search.
 */
@Component({
  selector: 'ui-lib-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    '[attr.aria-expanded]': 'open() ? "true" : "false"',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-controls]': 'listboxId() || null',
    '[attr.aria-activedescendant]': 'activeDescendantId() || null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-labelledby]': 'resolvedLabelledBy() || null',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.aria-disabled]': 'isDisabled() || loading() ? "true" : null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[attr.tabindex]': 'isDisabled() || loading() ? -1 : 0',
    '(keydown)': 'onKeydown($event)',
  },
})
export class UiLibSelect implements ControlValueAccessor {
  public readonly listboxRole: string = SELECT_LISTBOX_ROLE;
  public readonly ungroupedKey: string = SELECT_UNGROUPED_KEY;
  public readonly optionIdSeparator: string = SELECT_OPTION_ID_SEPARATOR;

  public readonly options: InputSignal<SelectOption[]> = input<SelectOption[]>([]);
  public readonly variant: InputSignal<SelectVariant | null> = input<SelectVariant | null>(null);
  public readonly size: InputSignal<SelectSize> = input<SelectSize>(SHARED_DEFAULTS.Size);
  public readonly multiple: InputSignal<boolean> = input<boolean>(false);
  public readonly searchable: InputSignal<boolean> = input<boolean>(false);
  public readonly placeholder: InputSignal<string> = input<string>('Select...');
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly optionTemplate: InputSignal<TemplateRef<unknown> | null> =
    input<TemplateRef<unknown> | null>(null);
  public readonly label: InputSignal<string> = input<string>('');
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);
  public readonly required: InputSignal<boolean> = input<boolean>(false);

  @ViewChild('panel', { static: false }) public panel?: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl', { static: false }) public inputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('controlEl', { static: false }) public controlEl?: ElementRef<HTMLDivElement>;

  public readonly open: WritableSignal<boolean> = signal<boolean>(false);
  public readonly filter: WritableSignal<string> = signal<string>('');
  public readonly focusedIndex: WritableSignal<number> = signal<number>(-1);
  public readonly internalValue: WritableSignal<SelectValue[] | null> = signal<
    SelectValue[] | null
  >(null);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);

  private onChange: (value: SelectCvaValue) => void = (): void => {};
  private onTouched: () => void = (): void => {};

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
    (): string => `${this.controlIdValue}-label`
  );
  public readonly listboxId: Signal<string> = computed<string>(
    (): string => `${this.controlIdValue}-listbox`
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
    }
  );

  public readonly resolvedLabelledBy: Signal<string | null> = computed<string | null>(
    (): string | null => {
      if (this.ariaLabelledBy()) return this.ariaLabelledBy();
      return this.label() ? this.labelId() : null;
    }
  );

  public readonly effectiveVariant: Signal<SelectVariant> = computed<SelectVariant>(
    (): SelectVariant => this.variant() ?? this.themeConfig.variant()
  );
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-select',
      `ui-select-${this.effectiveVariant()}`,
      `ui-select-size-${this.normalizedSize()}`,
    ];
    if (this.isDisabled() || this.loading()) classes.push('ui-select-disabled');
    if (this.multiple()) classes.push('ui-select-multiple');
    return classes.join(' ');
  });

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  public readonly displayValue: Signal<string> = computed<string>((): string => {
    const values: SelectValue[] | null = this.internalValue();
    const options: SelectOption[] = this.options();
    if (!values || values.length === 0) return '';
    const labels: string[] = values.map((value: SelectValue): string =>
      this.getOptionLabel(
        options.find((option: SelectOption): boolean => option.value === value) ?? value
      )
    );
    return labels.join(', ');
  });

  public readonly filteredOptions: Signal<SelectOption[]> = computed<SelectOption[]>(
    (): SelectOption[] => {
      const term: string = this.filter().toLowerCase();
      const options: SelectOption[] = this.options();
      if (!term) return options;
      return options.filter((option: SelectOption): boolean =>
        option.label.toLowerCase().includes(term)
      );
    }
  );

  public readonly activeDescendantId: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const index: number = this.focusedIndex();
      if (index < 0 || !this.open()) return null;
      return `${this.controlIdValue}${this.optionIdSeparator}${index}`;
    }
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
    Object.keys(this.groupedOptions())
  );
  public readonly selectedValues: Signal<Set<SelectValue>> = computed<Set<SelectValue>>(
    (): Set<SelectValue> => {
      const values: SelectValue[] = this.internalValue() ?? [];
      return new Set<SelectValue>(values);
    }
  );
  public readonly optionIndexMap: Signal<Map<SelectOption, number>> = computed<
    Map<SelectOption, number>
  >(
    (): Map<SelectOption, number> =>
      new Map<SelectOption, number>(
        this.filteredOptions().map((opt: SelectOption, index: number): [SelectOption, number] => [
          opt,
          index,
        ])
      )
  );

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
    queueMicrotask((): void => this.inputEl?.nativeElement.focus());
  }

  public closePanel(): void {
    this.open.set(false);
    this.focusedIndex.set(-1);
    this.filter.set('');
    this.onTouched();
    this.el.nativeElement.focus();
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

  @HostListener('document:click', ['$event'])
  public onDocClick(event: MouseEvent): void {
    if (this.open() && !this.el.nativeElement.contains(event.target as Node)) {
      this.closePanel();
    }
  }

  @HostListener('keydown', ['$event'])
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

  public getOptionLabel(opt: SelectOption | SelectValue): string {
    if (opt && typeof opt === 'object' && 'label' in opt) {
      return String((opt as SelectOption).label);
    }
    return String(opt ?? '');
  }

  constructor() {}

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
      const element: HTMLElement | null = document.getElementById(activeId);
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
