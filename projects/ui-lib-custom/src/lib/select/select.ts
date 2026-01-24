import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, TemplateRef, ViewChild, ViewEncapsulation, computed, forwardRef, input, signal } from '@angular/core';
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

  @ViewChild('panel', { static: false }) panel?: ElementRef<HTMLDivElement>;
  @ViewChild('inputEl', { static: false }) inputEl?: ElementRef<HTMLInputElement>;

  readonly open = signal(false);
  readonly filter = signal('');
  readonly focusedIndex = signal<number>(-1);
  readonly internalValue = signal<unknown[] | null>(null);
  private readonly cvaDisabled = signal(false);

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  private readonly controlIdValue = `ui-lib-select-${++selectIdCounter}`;
  readonly controlId = computed(() => this.controlIdValue);
  readonly panelId = computed(() => `${this.controlIdValue}-panel`);

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
    const labels = vals.map(v => opts.find(o => o.value === v)?.label ?? String(v));
    return labels.join(', ');
  });

  readonly filteredOptions = computed(() => {
    const term = this.filter().toLowerCase();
    const opts = this.options();
    if (!term) return opts;
    return opts.filter(o => o.label.toLowerCase().includes(term));
  });

  readonly groupedOptions = computed(() => {
    const groups: Record<string, SelectOption[]> = {};
    this.filteredOptions().forEach(opt => {
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
    this.open.update(v => !v);
    if (this.open()) {
      queueMicrotask(() => this.inputEl?.nativeElement?.focus());
    }
  }

  closePanel(): void {
    this.open.set(false);
    this.focusedIndex.set(-1);
    this.onTouched();
  }

  selectOption(opt: SelectOption): void {
    if (opt.disabled || this.isDisabled()) return;
    if (this.multiple()) {
      const current = this.internalValue() ?? [];
      const exists = current.some(v => v === opt.value);
      const next = exists ? current.filter(v => v !== opt.value) : [...current, opt.value];
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
    return (this.internalValue() ?? []).some(v => v === opt.value);
  }

  moveFocus(delta: number): void {
    const opts = this.filteredOptions();
    if (!opts.length) return;
    let idx = this.focusedIndex();
    idx = (idx + delta + opts.length) % opts.length;
    this.focusedIndex.set(idx);
    queueMicrotask(() => this.scrollIntoView(idx));
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
    this.focusedIndex.set(0);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (this.open() && !this.el.nativeElement.contains(event.target as Node)) {
      this.closePanel();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.open()) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.togglePanel();
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        this.commitFocused();
        break;
      }
      case 'Escape':
        this.closePanel();
        break;
    }
  }

  private scrollIntoView(idx: number): void {
    const panelEl = this.panel?.nativeElement;
    if (!panelEl) return;
    const item = panelEl.querySelectorAll('.ui-select-option')[idx] as HTMLElement | undefined;
    if (item) {
      const { offsetTop, offsetHeight } = item;
      const { scrollTop, clientHeight } = panelEl;
      if (offsetTop < scrollTop) {
        panelEl.scrollTop = offsetTop;
      } else if (offsetTop + offsetHeight > scrollTop + clientHeight) {
        panelEl.scrollTop = offsetTop + offsetHeight - clientHeight;
      }
    }
  }

  constructor(private readonly el: ElementRef<HTMLElement>) {}
}
