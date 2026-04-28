import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import type {
  ElementRef,
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { LISTBOX_DEFAULTS, LISTBOX_OPTION_ID_SEPARATOR } from './listbox.constants';
import type {
  ListboxChangeEvent,
  ListboxFilterEvent,
  ListboxFilterMatchMode,
  ListboxFlatItem,
  ListboxGroupContext,
  ListboxGroupHeader,
  ListboxItemContext,
  ListboxOptionRow,
  ListboxSize,
  ListboxVariant,
} from './listbox.types';

export type {
  ListboxVariant,
  ListboxSize,
  ListboxFilterMatchMode,
  ListboxOption,
  ListboxOptionGroup,
  ListboxChangeEvent,
  ListboxFilterEvent,
  ListboxItemContext,
  ListboxGroupContext,
} from './listbox.types';
export {
  LISTBOX_DEFAULTS,
  LISTBOX_OPTION_ID_SEPARATOR,
  LISTBOX_ROLE,
  LISTBOX_OPTION_ROLE,
  LISTBOX_GROUP_ROLE,
} from './listbox.constants';

/** Monotonic counter for unique element IDs. */
let listboxIdCounter: number = 0;

/**
 * Listbox component — displays a scrollable list of options with single or
 * multiple selection, optional inline filtering, option groups, and full
 * keyboard navigation.
 *
 * Implements `ControlValueAccessor` for seamless `ngModel` and reactive-form
 * integration.
 *
 * @example
 * ```html
 * <ui-lib-listbox [options]="cities" [(ngModel)]="selectedCity" />
 * ```
 */
@Component({
  selector: 'ui-lib-listbox',
  standalone: true,
  imports: [NgTemplateOutlet, FormsModule],
  templateUrl: './listbox.component.html',
  styleUrl: './listbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof ListboxComponent => ListboxComponent),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
  },
})
export class ListboxComponent implements ControlValueAccessor {
  // ---------------------------------------------------------------------------
  // Inputs
  // ---------------------------------------------------------------------------

  /** Array of option objects to display in the list. */
  public readonly options: InputSignal<unknown[]> = input<unknown[]>([]);

  /** Field name used as the display label for each option. */
  public readonly optionLabel: InputSignal<string> = input<string>(LISTBOX_DEFAULTS.OptionLabel);

  /** Field name used to extract the value for each option. */
  public readonly optionValue: InputSignal<string> = input<string>(LISTBOX_DEFAULTS.OptionValue);

  /** Field name used to determine whether an option is disabled. */
  public readonly optionDisabled: InputSignal<string> = input<string>(
    LISTBOX_DEFAULTS.OptionDisabled
  );

  /** Field name used as the display label for each option group. */
  public readonly optionGroupLabel: InputSignal<string> = input<string>(
    LISTBOX_DEFAULTS.OptionGroupLabel
  );

  /** Field name that contains the children array inside each option group. */
  public readonly optionGroupChildren: InputSignal<string> = input<string>(
    LISTBOX_DEFAULTS.OptionGroupChildren
  );

  /** When true, the `options` array is treated as a list of groups. */
  public readonly group: InputSignal<boolean> = input<boolean>(false);

  /** When true, multiple options can be selected simultaneously. */
  public readonly multiple: InputSignal<boolean> = input<boolean>(false);

  /** When true, shows a filter input above the list. */
  public readonly filter: InputSignal<boolean> = input<boolean>(false);

  /** Field name to filter against. Defaults to `optionLabel`. */
  public readonly filterBy: InputSignal<string> = input<string>('');

  /** Matching strategy used for the filter. */
  public readonly filterMatchMode: InputSignal<ListboxFilterMatchMode> =
    input<ListboxFilterMatchMode>(LISTBOX_DEFAULTS.FilterMatchMode as ListboxFilterMatchMode);

  /** Placeholder text for the filter input. */
  public readonly filterPlaceholder: InputSignal<string> = input<string>(
    LISTBOX_DEFAULTS.FilterPlaceholder
  );

  /** Two-way binding for the current filter query string. */
  public readonly filterValue: ModelSignal<string> = model<string>('');

  /** Message shown when the options array is empty. */
  public readonly emptyMessage: InputSignal<string> = input<string>(LISTBOX_DEFAULTS.EmptyMessage);

  /** Message shown when the filter produces no matches. */
  public readonly emptyFilterMessage: InputSignal<string> = input<string>(
    LISTBOX_DEFAULTS.EmptyFilterMessage
  );

  /** CSS height for the scrollable options container. */
  public readonly scrollHeight: InputSignal<string> = input<string>(LISTBOX_DEFAULTS.ScrollHeight);

  /** When true, disables all interaction. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** When true, prevents value changes but does not grey out the component. */
  public readonly readonly: InputSignal<boolean> = input<boolean>(false);

  /**
   * When true and `multiple` is enabled, shows a "Toggle all" checkbox in the
   * header to select or deselect every enabled option at once.
   */
  public readonly showToggleAll: InputSignal<boolean> = input<boolean>(false);

  /** When true and `multiple` is enabled, renders a checkbox beside each item. */
  public readonly checkbox: InputSignal<boolean> = input<boolean>(false);

  /** When true, alternating rows receive a subtle background tint. */
  public readonly striped: InputSignal<boolean> = input<boolean>(false);

  /** Visual design variant. Falls back to the global ThemeConfigService variant. */
  public readonly variant: InputSignal<ListboxVariant | null> = input<ListboxVariant | null>(null);

  /** Size token controlling padding and font size. */
  public readonly size: InputSignal<ListboxSize> = input<ListboxSize>('md');

  /** Accessible label for the listbox element. */
  public readonly ariaLabel: InputSignal<string> = input<string>('');

  /** ID of an external element that labels this listbox. */
  public readonly ariaLabelledBy: InputSignal<string> = input<string>('');

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Emitted when the selected value(s) change. */
  public readonly selectionChange: OutputEmitterRef<ListboxChangeEvent> =
    output<ListboxChangeEvent>();

  /** Emitted when the filter query changes. */
  public readonly filterChange: OutputEmitterRef<ListboxFilterEvent> = output<ListboxFilterEvent>();

  // ---------------------------------------------------------------------------
  // Content children (custom templates)
  // ---------------------------------------------------------------------------

  /** Custom template for each option row. Receives `ListboxItemContext`. */
  @ContentChild('itemTemplate')
  public itemTemplate?: TemplateRef<ListboxItemContext>;

  /** Custom template for group header rows. Receives `ListboxGroupContext`. */
  @ContentChild('groupTemplate')
  public groupTemplate?: TemplateRef<ListboxGroupContext>;

  /** Custom template shown when the list is empty. */
  @ContentChild('emptyTemplate')
  public emptyTemplate?: TemplateRef<void>;

  /** Custom template shown when the filter yields no matches. */
  @ContentChild('emptyFilterTemplate')
  public emptyFilterTemplate?: TemplateRef<void>;

  // ---------------------------------------------------------------------------
  // View children
  // ---------------------------------------------------------------------------

  private readonly filterInputRef: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('filterInput');

  private readonly listRef: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('listElement');

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  private readonly componentId: string = `ui-lib-listbox-${++listboxIdCounter}`;

  /** Value managed by CVA. Stored as an array for uniform internal handling. */
  public readonly internalValue: WritableSignal<unknown[]> = signal<unknown[]>([]);

  /** Whether the component is disabled via CVA `setDisabledState`. */
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  /** Zero-based index of the currently keyboard-focused option row. */
  public readonly focusedOptionIndex: WritableSignal<number> = signal<number>(-1);

  /** Whether the list container itself is focused. */
  public readonly listFocused: WritableSignal<boolean> = signal<boolean>(false);

  private onChange: (value: unknown) => void = (): void => {};
  private onTouched: () => void = (): void => {};

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  // ---------------------------------------------------------------------------
  // Derived / computed
  // ---------------------------------------------------------------------------

  /** Whether the component should be non-interactive. */
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  /** Resolved variant, falling back to the global theme service setting. */
  public readonly effectiveVariant: Signal<ListboxVariant> = computed<ListboxVariant>(
    (): ListboxVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-listbox',
      `ui-lib-listbox--${this.effectiveVariant()}`,
      `ui-lib-listbox--size-${this.size()}`,
    ];
    if (this.isDisabled()) classes.push('ui-lib-listbox--disabled');
    if (this.readonly()) classes.push('ui-lib-listbox--readonly');
    if (this.striped()) classes.push('ui-lib-listbox--striped');
    if (this.multiple()) classes.push('ui-lib-listbox--multiple');
    if (this.listFocused()) classes.push('ui-lib-listbox--focused');
    return classes.join(' ');
  });

  /** Unique ID for the internal listbox element. */
  public readonly listboxElementId: Signal<string> = computed<string>(
    (): string => `${this.componentId}-list`
  );

  /** ID for the focused option, used for `aria-activedescendant`. */
  public readonly activeDescendantId: Signal<string | null> = computed<string | null>(
    (): string | null => {
      const index: number = this.focusedOptionIndex();
      if (index < 0) return null;
      return `${this.componentId}${LISTBOX_OPTION_ID_SEPARATOR}${index}`;
    }
  );

  /**
   * Flat list of items to render (group headers interleaved with option rows).
   * Recomputed whenever `options` or `filterValue` changes.
   */
  public readonly flatItems: Signal<ListboxFlatItem[]> = computed<ListboxFlatItem[]>(
    (): ListboxFlatItem[] => {
      const rawOptions: unknown[] = this.options();
      const query: string = this.filterValue().trim().toLowerCase();
      const matchMode: ListboxFilterMatchMode = this.filterMatchMode();
      const labelField: string = this.optionLabel();
      const valueField: string = this.optionValue();
      const disabledField: string = this.optionDisabled();
      const filterField: string = this.filterBy() || labelField;

      const matchesFilter: (fieldValue: string) => boolean = (fieldValue: string): boolean => {
        if (!query) return true;
        const normalized: string = fieldValue.toLowerCase();
        switch (matchMode) {
          case 'startsWith':
            return normalized.startsWith(query);
          case 'endsWith':
            return normalized.endsWith(query);
          case 'equals':
            return normalized === query;
          case 'contains':
            return normalized.includes(query);
        }
      };

      const items: ListboxFlatItem[] = [];
      let optionIndex: number = 0;

      if (this.group()) {
        const groupChildrenField: string = this.optionGroupChildren();
        const groupLabelField: string = this.optionGroupLabel();

        for (const group of rawOptions) {
          const groupRecord: Record<string, unknown> = group as Record<string, unknown>;
          const children: unknown[] =
            (groupRecord[groupChildrenField] as unknown[] | undefined) ?? [];
          const matchingChildren: ListboxFlatItem[] = [];

          for (const child of children) {
            const childRecord: Record<string, unknown> = child as Record<string, unknown>;
            const label: string = String(childRecord[labelField] ?? '');
            const filterTarget: string = String(childRecord[filterField] ?? label);

            if (!matchesFilter(filterTarget)) continue;

            matchingChildren.push({
              type: 'option',
              label,
              value: childRecord[valueField] ?? child,
              disabled: Boolean(childRecord[disabledField]),
              optionIndex: optionIndex++,
            } satisfies ListboxOptionRow);
          }

          if (matchingChildren.length > 0) {
            items.push({
              type: 'group',
              label: String(groupRecord[groupLabelField] ?? ''),
            } satisfies ListboxGroupHeader);
            items.push(...matchingChildren);
          }
        }
      } else {
        for (const option of rawOptions) {
          const record: Record<string, unknown> = option as Record<string, unknown>;
          const label: string = String(record[labelField] ?? '');
          const filterTarget: string = String(record[filterField] ?? label);

          if (!matchesFilter(filterTarget)) continue;

          items.push({
            type: 'option',
            label,
            value: record[valueField] ?? option,
            disabled: Boolean(record[disabledField]),
            optionIndex: optionIndex++,
          } satisfies ListboxOptionRow);
        }
      }

      return items;
    }
  );

  /** Only the option rows from `flatItems` — used for keyboard navigation. */
  public readonly optionRows: Signal<ListboxOptionRow[]> = computed<ListboxOptionRow[]>(
    (): ListboxOptionRow[] =>
      this.flatItems().filter(
        (item: ListboxFlatItem): item is ListboxOptionRow => item.type === 'option'
      )
  );

  /** Whether the list has no renderable option rows (after filtering). */
  public readonly isEmpty: Signal<boolean> = computed<boolean>(
    (): boolean => this.optionRows().length === 0
  );

  /** Whether a filter query is currently active. */
  public readonly isFiltered: Signal<boolean> = computed<boolean>(
    (): boolean => this.filterValue().trim().length > 0
  );

  /** The current value as a Set for O(1) lookup in templates. */
  public readonly selectedSet: Signal<Set<unknown>> = computed<Set<unknown>>(
    (): Set<unknown> => new Set<unknown>(this.internalValue())
  );

  /**
   * Whether all non-disabled options are currently selected.
   * Used for the toggle-all checkbox state.
   */
  public readonly allSelected: Signal<boolean> = computed<boolean>((): boolean => {
    const enabledRows: ListboxOptionRow[] = this.optionRows().filter(
      (row: ListboxOptionRow): boolean => !row.disabled
    );
    if (enabledRows.length === 0) return false;
    const selected: Set<unknown> = this.selectedSet();
    return enabledRows.every((row: ListboxOptionRow): boolean => selected.has(row.value));
  });

  // ---------------------------------------------------------------------------
  // ControlValueAccessor
  // ---------------------------------------------------------------------------

  /** @inheritdoc */
  public writeValue(value: unknown): void {
    if (this.multiple()) {
      this.internalValue.set(
        Array.isArray(value) ? value : value === null || value === undefined ? [] : [value]
      );
    } else {
      this.internalValue.set(value === null || value === undefined ? [] : [value]);
    }
  }

  /** @inheritdoc */
  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  /** @inheritdoc */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** @inheritdoc */
  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  // ---------------------------------------------------------------------------
  // Public helpers (used in template)
  // ---------------------------------------------------------------------------

  /**
   * Returns true when the given option value is currently selected.
   */
  public isSelected(value: unknown): boolean {
    return this.selectedSet().has(value);
  }

  /**
   * Returns a stable element ID for the given option row index.
   * Used for `aria-activedescendant` and `id` on option elements.
   */
  public optionId(optionIndex: number): string {
    return `${this.componentId}${LISTBOX_OPTION_ID_SEPARATOR}${optionIndex}`;
  }

  // ---------------------------------------------------------------------------
  // Selection handlers
  // ---------------------------------------------------------------------------

  /**
   * Handles a click or keyboard activation on an option row.
   */
  public selectOption(event: Event, row: ListboxOptionRow): void {
    if (this.isDisabled() || this.readonly() || row.disabled) return;

    let newValue: unknown;

    if (this.multiple()) {
      const current: unknown[] = this.internalValue();
      const alreadySelected: boolean = current.includes(row.value);
      newValue = alreadySelected
        ? current.filter((v: unknown): boolean => v !== row.value)
        : [...current, row.value];
    } else {
      const isSameValue: boolean =
        this.internalValue().length === 1 && this.internalValue()[0] === row.value;
      newValue = isSameValue ? null : row.value;
    }

    this.updateValue(newValue, event);
    this.focusedOptionIndex.set(row.optionIndex);
  }

  /**
   * Handles the "toggle all" checkbox in multiple mode.
   */
  public toggleAll(event: Event): void {
    if (this.isDisabled() || this.readonly() || !this.multiple()) return;

    const enabledRows: ListboxOptionRow[] = this.optionRows().filter(
      (row: ListboxOptionRow): boolean => !row.disabled
    );

    const newValue: unknown[] = this.allSelected()
      ? []
      : enabledRows.map((row: ListboxOptionRow): unknown => row.value);

    this.updateValue(newValue, event);
  }

  // ---------------------------------------------------------------------------
  // Filter handler
  // ---------------------------------------------------------------------------

  /**
   * Called on every keystroke in the filter input.
   */
  public onFilterInput(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    const query: string = inputElement.value;
    this.filterValue.set(query);
    this.focusedOptionIndex.set(-1);
    this.filterChange.emit({ originalEvent: event, filter: query });
  }

  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------

  /**
   * Handles keydown events on the list element.
   */
  public onListKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    switch (event.key) {
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        this.moveFocus(1);
        break;
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        this.moveFocus(-1);
        break;
      case KEYBOARD_KEYS.Home:
        event.preventDefault();
        this.focusFirst();
        break;
      case KEYBOARD_KEYS.End:
        event.preventDefault();
        this.focusLast();
        break;
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        this.activateFocused(event);
        break;
      default:
        break;
    }
  }

  /**
   * Tracks focus on the list element for ARIA `aria-activedescendant` and
   * host class `.ui-lib-listbox--focused`.
   */
  public onListFocus(): void {
    this.listFocused.set(true);
    if (this.focusedOptionIndex() < 0) {
      this.focusFirst();
    }
  }

  /**
   * Clears focus tracking when the list loses focus.
   */
  public onListBlur(): void {
    this.listFocused.set(false);
    this.onTouched();
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private updateValue(value: unknown, event: Event): void {
    this.internalValue.set(
      Array.isArray(value) ? value : value === null || value === undefined ? [] : [value]
    );
    this.onChange(value);
    this.selectionChange.emit({ originalEvent: event, value });
  }

  private moveFocus(direction: 1 | -1): void {
    const rows: ListboxOptionRow[] = this.optionRows();
    if (rows.length === 0) return;

    const current: number = this.focusedOptionIndex();
    let next: number = current + direction;

    // Clamp to bounds and skip disabled options
    while (next >= 0 && next < rows.length && rows[next]!.disabled) {
      next += direction;
    }

    if (next < 0 || next >= rows.length) return;
    this.focusedOptionIndex.set(next);
    this.scrollOptionIntoView(next);
  }

  private focusFirst(): void {
    const rows: ListboxOptionRow[] = this.optionRows();
    const firstEnabled: number = rows.findIndex((row: ListboxOptionRow): boolean => !row.disabled);
    if (firstEnabled >= 0) {
      this.focusedOptionIndex.set(firstEnabled);
      this.scrollOptionIntoView(firstEnabled);
    }
  }

  private focusLast(): void {
    const rows: ListboxOptionRow[] = this.optionRows();
    let lastEnabled: number = -1;
    for (let i: number = rows.length - 1; i >= 0; i--) {
      if (!rows[i]!.disabled) {
        lastEnabled = i;
        break;
      }
    }
    if (lastEnabled >= 0) {
      this.focusedOptionIndex.set(lastEnabled);
      this.scrollOptionIntoView(lastEnabled);
    }
  }

  private activateFocused(event: KeyboardEvent): void {
    const index: number = this.focusedOptionIndex();
    if (index < 0) return;
    const row: ListboxOptionRow | undefined = this.optionRows()[index];
    if (row) this.selectOption(event, row);
  }

  private scrollOptionIntoView(optionIndex: number): void {
    const listElement: ElementRef<HTMLElement> | undefined = this.listRef();
    if (!listElement) return;
    const optionElement: HTMLElement | null = listElement.nativeElement.querySelector<HTMLElement>(
      `[id="${this.optionId(optionIndex)}"]`
    );
    optionElement?.scrollIntoView({ block: 'nearest' });
  }
}
