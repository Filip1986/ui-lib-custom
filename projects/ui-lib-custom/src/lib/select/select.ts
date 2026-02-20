import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SelectVariant = 'material' | 'bootstrap' | 'minimal';

export interface SelectOption {
  label: string;
  value: unknown;
  group?: string;
  disabled?: boolean;
}

let selectIdCounter = 0;

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
      useExisting: forwardRef(() => UiLibSelect),
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
  options = input<SelectOption[]>([]);
  variant = input<SelectVariant>('material');
  multiple = input<boolean>(false);
  searchable = input<boolean>(false);
  placeholder = input<string>('Select...');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  optionTemplate = input<TemplateRef<any> | null>(null);
  label = input<string>('');
  ariaLabel = input<string | null>(null);
  ariaLabelledBy = input<string | null>(null);
  invalid = input<boolean>(false);
  required = input<boolean>(false);

  @ViewChild('panel', { static: false }) panel?: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl', { static: false }) inputEl?: ElementRef<HTMLInputElement>;
  @ViewChild('controlEl', { static: false }) controlEl?: ElementRef<HTMLDivElement>;

  readonly open = signal(false);
  readonly filter = signal('');
  readonly focusedIndex = signal<number>(-1);
  readonly internalValue = signal<unknown[] | null>(null);
  private readonly cvaDisabled = signal(false);

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  private readonly controlIdValue = `ui-lib-select-${++selectIdCounter}`;
  readonly controlId = computed((): string => this.controlIdValue);
  readonly labelId = computed((): string => `${this.controlIdValue}-label`);
  readonly listboxId = computed((): string => `${this.controlIdValue}-listbox`);

  readonly activeDescendantId = computed((): string | null => {
    const index: number = this.focusedIndex();
    if (index < 0 || !this.open()) return null;
    return `${this.controlIdValue}-option-${index}`;
  });

  readonly resolvedLabelledBy = computed((): string | null => {
    if (this.ariaLabelledBy()) return this.ariaLabelledBy();
    return this.label() ? this.labelId() : null;
  });

  readonly hostClasses = computed(() => {
    const classes = ['ui-select', `ui-select-${this.variant()}`];
    if (this.isDisabled() || this.loading()) classes.push('ui-select-disabled');
    if (this.multiple()) classes.push('ui-select-multiple');
    return classes.join(' ');
  });

  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly displayValue = computed(() => {
    const vals = this.internalValue();
    const opts = this.options();
    if (!vals || vals.length === 0) return '';
    const labels = vals.map((v) => this.getOptionLabel(opts.find((o) => o.value === v) ?? v));
    return labels.join(', ');
  });

  readonly filteredOptions = computed(() => {
    const term = this.filter().toLowerCase();
    const opts = this.options();
    if (!term) return opts;
    return opts.filter((o) => o.label.toLowerCase().includes(term));
  });

  readonly groupedOptions = computed(() => {
    const groups: Record<string, SelectOption[]> = {};
    this.filteredOptions().forEach((opt) => {
      const key = opt.group ?? '__ungrouped';
      groups[key] = groups[key] || [];
      groups[key].push(opt);
    });
    return groups;
  });

  readonly groupKeys = computed(() => Object.keys(this.groupedOptions()));

  writeValue(obj: any): void {
    if (this.multiple()) {
      this.internalValue.set(Array.isArray(obj) ? obj : obj == null ? [] : [obj]);
    } else {
      this.internalValue.set(obj == null ? [] : [obj]);
    }
  }
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  togglePanel(): void {
    if (this.isDisabled() || this.loading()) return;
    this.open.update((v) => !v);
    if (this.open()) {
      this.openPanel();
    } else {
      this.closePanel();
    }
  }

  openPanel(): void {
    if (this.isDisabled() || this.loading()) return;
    this.open.set(true);
    const selectedIndex = this.getSelectedIndex();
    const fallbackIndex = this.findFirstEnabledIndex();
    this.focusedIndex.set(selectedIndex >= 0 ? selectedIndex : fallbackIndex);
    queueMicrotask(() => this.inputEl?.nativeElement?.focus());
  }

  closePanel(): void {
    this.open.set(false);
    this.focusedIndex.set(-1);
    this.onTouched();
    this.el.nativeElement.focus();
  }

  selectOption(opt: SelectOption): void {
    if (opt.disabled || this.isDisabled()) return;
    if (this.multiple()) {
      const current = this.internalValue() ?? [];
      const exists = current.some((v) => v === opt.value);
      const next = exists ? current.filter((v) => v !== opt.value) : [...current, opt.value];
      this.internalValue.set(next);
      this.onChange(next);
    } else {
      this.internalValue.set([opt.value]);
      this.onChange(opt.value);
      this.closePanel();
    }
  }

  clear(): void {
    this.internalValue.set([]);
    this.onChange(this.multiple() ? [] : null);
  }

  isSelected(opt: SelectOption): boolean {
    return (this.internalValue() ?? []).some((v) => v === opt.value);
  }

  moveFocus(delta: number): void {
    const opts = this.filteredOptions();
    if (!opts.length) return;
    const maxIndex = opts.length - 1;
    let idx = this.focusedIndex();
    let attempts = 0;
    let nextIndex = idx;

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

  setActiveIndex(index: number): void {
    const opts = this.filteredOptions();
    if (!opts.length) return;
    const maxIndex = opts.length - 1;
    const next = Math.max(0, Math.min(maxIndex, index));
    if (opts[next]?.disabled) {
      return;
    }
    this.focusedIndex.set(next);
    this.scrollActiveOptionIntoView();
  }

  commitFocused(): void {
    const idx = this.focusedIndex();
    const opts = this.filteredOptions();
    if (idx >= 0 && idx < opts.length) {
      this.selectOption(opts[idx]);
    }
  }

  onFilter(term: string): void {
    this.filter.set(term);
    const fallbackIndex = this.findFirstEnabledIndex();
    this.focusedIndex.set(fallbackIndex);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (this.open() && !this.el.nativeElement.contains(event.target as Node)) {
      this.closePanel();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.loading()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.open()) {
          this.openPanel();
        } else {
          this.moveFocus(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.open()) {
          this.openPanel();
        } else {
          this.moveFocus(-1);
        }
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (this.open() && this.focusedIndex() >= 0) {
          this.commitFocused();
        } else {
          this.openPanel();
        }
        break;
      }
      case 'Escape':
        if (this.open()) {
          event.preventDefault();
          this.closePanel();
        }
        break;
      case 'Home':
        if (this.open()) {
          event.preventDefault();
          this.setActiveIndex(0);
        }
        break;
      case 'End':
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

  private handleTypeahead(char: string): void {
    const opts = this.filteredOptions();
    if (!opts.length) return;
    const searchChar = char.toLowerCase();
    const startIndex = this.focusedIndex() + 1;

    for (let i = 0; i < opts.length; i += 1) {
      const index = (startIndex + i) % opts.length;
      const option = opts[index];
      if (option.disabled) continue;
      const label = this.getOptionLabel(option).toLowerCase();
      if (label.startsWith(searchChar)) {
        this.setActiveIndex(index);
        return;
      }
    }
  }

  private scrollActiveOptionIntoView(): void {
    const activeId = this.activeDescendantId();
    if (!activeId) return;

    requestAnimationFrame(() => {
      const element = document.getElementById(activeId);
      element?.scrollIntoView({ block: 'nearest' });
    });
  }

  private findFirstEnabledIndex(): number {
    const opts = this.filteredOptions();
    for (let i = 0; i < opts.length; i += 1) {
      if (!opts[i]?.disabled) return i;
    }
    return -1;
  }

  private getSelectedIndex(): number {
    const opts = this.filteredOptions();
    const selected = this.internalValue() ?? [];
    if (!selected.length) return -1;
    const value = selected[0];
    return opts.findIndex((opt) => opt.value === value);
  }

  optionIndex(opt: SelectOption): number {
    return this.filteredOptions().indexOf(opt);
  }

  getOptionLabel(opt: SelectOption | unknown): string {
    if (opt && typeof opt === 'object' && 'label' in opt) {
      return String((opt as SelectOption).label ?? '');
    }
    return String(opt ?? '');
  }

  constructor(private readonly el: ElementRef<HTMLElement>) {}
}
