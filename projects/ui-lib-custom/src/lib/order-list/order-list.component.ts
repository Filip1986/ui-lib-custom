import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  PLATFORM_ID,
  signal,
  TemplateRef,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import type {
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
  ElementRef,
} from '@angular/core';
import type {
  OrderListControlsPosition,
  OrderListDragDropEvent,
  OrderListEmptyContext,
  OrderListFilterEvent,
  OrderListFilterMatchMode,
  OrderListReorderEvent,
  OrderListSelectionChangeEvent,
  OrderListSize,
  OrderListVariant,
} from './order-list.types';
import {
  OrderListEmptyDirective,
  OrderListFilterDirective,
  OrderListHeaderDirective,
  OrderListItemDirective,
} from './order-list-templates.directive';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { Icon } from 'ui-lib-custom/icon';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';

/** Monotonic counter for unique element IDs. */
let orderListIdCounter: number = 0;

/**
 * OrderList component — manages and reorders a collection of items.
 *
 * @example
 * ```html
 * <ui-lib-order-list [value]="items" [(selection)]="selected">
 *   <ng-template uiOrderListItem let-item>{{ item.label }}</ng-template>
 * </ui-lib-order-list>
 * ```
 */
@Component({
  selector: 'ui-lib-order-list',
  standalone: true,
  imports: [NgTemplateOutlet, Icon],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class OrderListComponent {
  // ---------------------------------------------------------------------------
  // DI
  // ---------------------------------------------------------------------------

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
  private readonly platformId: object = inject(PLATFORM_ID);

  /** Reference to the listbox `<ul>` element — used for roving-tabindex focus management. */
  private readonly listboxEl: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('listboxEl');

  // ---------------------------------------------------------------------------
  // Two-way model inputs
  // ---------------------------------------------------------------------------

  /** The ordered list of items. Mutations are emitted as a new array reference. */
  public value: ModelSignal<unknown[]> = model<unknown[]>([]);

  /** The currently selected items. */
  public selection: ModelSignal<unknown[]> = model<unknown[]>([]);

  // ---------------------------------------------------------------------------
  // Standard inputs
  // ---------------------------------------------------------------------------

  /** Optional caption rendered above the list. */
  public readonly header: InputSignal<string | null> = input<string | null>(null);

  /**
   * Dot-notation property path to filter items against (e.g. `'name'` or `'address.city'`).
   * When `null`, the filter input is not rendered.
   */
  public readonly filterBy: InputSignal<string | null> = input<string | null>(null);

  /** Placeholder text shown inside the filter input. */
  public readonly filterPlaceholder: InputSignal<string> = input<string>('Filter');

  /** Strategy used when matching filter query against item fields. */
  public readonly filterMatchMode: InputSignal<OrderListFilterMatchMode> =
    input<OrderListFilterMatchMode>('contains');

  /** BCP 47 locale tag used for locale-sensitive string comparisons during filtering. */
  public readonly filterLocale: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** When `true`, items can be reordered by dragging and dropping. */
  public readonly dragDrop: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, all interaction is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, Ctrl/Meta must be held to toggle multi-select. */
  public readonly metaKeySelection: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, alternating rows are rendered with a background tint. */
  public readonly stripedRows: InputSignal<boolean> = input<boolean>(false);

  /** Position of the reorder control buttons relative to the list. */
  public readonly controlsPosition: InputSignal<OrderListControlsPosition> =
    input<OrderListControlsPosition>('left');

  /**
   * Theme variant override. When `null`, the variant is inherited from
   * `ThemeConfigService`.
   */
  public readonly variant: InputSignal<OrderListVariant | null> = input<OrderListVariant | null>(
    null
  );

  /** Component size token. */
  public readonly size: InputSignal<OrderListSize> = input<OrderListSize>('md');

  /**
   * Property key used to identify items for selection equality and `@for` tracking.
   * When `null`, item object identity is used.
   */
  public readonly trackBy: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the listbox element. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** One or more element IDs that label the listbox element. */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the "Move to top" button. */
  public readonly moveTopAriaLabel: InputSignal<string> = input<string>('Move to top');

  /** Accessible label for the "Move up" button. */
  public readonly moveUpAriaLabel: InputSignal<string> = input<string>('Move up');

  /** Accessible label for the "Move down" button. */
  public readonly moveDownAriaLabel: InputSignal<string> = input<string>('Move down');

  /** Accessible label for the "Move to bottom" button. */
  public readonly moveBottomAriaLabel: InputSignal<string> = input<string>('Move to bottom');

  /** Additional CSS class applied to the root element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Emitted after any reorder operation (button or drag-and-drop). */
  public readonly reordered: OutputEmitterRef<OrderListReorderEvent> =
    output<OrderListReorderEvent>();

  /** Emitted when the selection array changes. */
  public readonly selectionChanged: OutputEmitterRef<OrderListSelectionChangeEvent> =
    output<OrderListSelectionChangeEvent>();

  /** Emitted when the filter query changes. */
  public readonly filtered: OutputEmitterRef<OrderListFilterEvent> = output<OrderListFilterEvent>();

  /** Emitted specifically after a drag-and-drop reorder. */
  public readonly dragDropped: OutputEmitterRef<OrderListDragDropEvent> =
    output<OrderListDragDropEvent>();

  // ---------------------------------------------------------------------------
  // Template directive queries
  // ---------------------------------------------------------------------------

  /** Custom item row template. Context: `OrderListItemContext<T>`. */
  public readonly itemTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    OrderListItemDirective,
    { read: TemplateRef }
  );

  /** Custom header template. */
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    OrderListHeaderDirective,
    { read: TemplateRef }
  );

  /** Custom empty-state template. Context: `OrderListEmptyContext`. */
  public readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    OrderListEmptyDirective,
    { read: TemplateRef }
  );

  /** Custom filter area template. */
  public readonly filterTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    OrderListFilterDirective,
    { read: TemplateRef }
  );

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  /** Unique element-ID prefix for this instance. */
  public readonly componentId: string = `ui-lib-order-list-${++orderListIdCounter}`;

  /** Index of the last item the user explicitly clicked, for Shift+Click range select. */
  private lastClickedIndex: number = -1;

  /**
   * Index within `displayItems()` of the currently keyboard-focused list item.
   * `-1` when no item is focused.
   */
  public readonly focusedIndex: WritableSignal<number> = signal<number>(-1);

  // ---------------------------------------------------------------------------
  // Drag & drop state
  // ---------------------------------------------------------------------------

  /**
   * Index within `value()` of the item currently being dragged.
   * `null` when no drag is in progress.
   */
  public readonly draggedIndex: WritableSignal<number | null> = signal<number | null>(null);

  /**
   * Index within `displayItems()` of the item currently being dragged over.
   * `null` when not hovering over any item.
   */
  public readonly dragOverIndex: WritableSignal<number | null> = signal<number | null>(null);

  /**
   * Whether the drop indicator should appear above (`'before'`) or below (`'after'`) the hovered item.
   * `null` when no drag is in progress.
   */
  public readonly dragPosition: WritableSignal<'before' | 'after' | null> = signal<
    'before' | 'after' | null
  >(null);

  /** Current text entered in the filter input. */
  public readonly filterQuery: WritableSignal<string> = signal<string>('');

  // ---------------------------------------------------------------------------
  // Computed view state
  // ---------------------------------------------------------------------------

  /** Resolved theme variant (falls back to ThemeConfigService). */
  public readonly resolvedVariant: Signal<OrderListVariant> = computed<OrderListVariant>(
    (): OrderListVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** CSS class string applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-order-list',
      `ui-lib-order-list--${this.resolvedVariant()}`,
      `ui-lib-order-list--${this.size()}`,
      `ui-lib-order-list--controls-${this.controlsPosition()}`,
    ];
    if (this.disabled()) classes.push('ui-lib-order-list--disabled');
    if (this.stripedRows()) classes.push('ui-lib-order-list--striped');
    if (this.dragDrop()) classes.push('ui-lib-order-list--dragdrop');
    const extra: string | null = this.styleClass();
    if (extra) classes.push(extra);
    return classes.join(' ');
  });

  /**
   * Items currently visible in the list after applying the active filter.
   * When `filterBy` is null or `filterQuery` is empty, returns the full `value()` array.
   * The underlying `value()` array is never mutated by filtering.
   */
  public readonly displayItems: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    const filterPath: string | null = this.filterBy();
    const query: string = this.filterQuery().trim();
    if (!filterPath || query === '') {
      return this.value();
    }
    return this.value().filter((item: unknown): boolean => this.matchesFilter(item));
  });

  /**
   * `true` when the list is empty because the active filter matched nothing
   * (i.e. `value()` has items but `displayItems()` is empty).
   */
  public readonly isEmptyDueToFilter: Signal<boolean> = computed<boolean>(
    (): boolean => this.value().length > 0 && this.displayItems().length === 0
  );

  /** `true` when no reorder operation is possible (nothing selected, or disabled). */
  public readonly isMoveDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.selection().length === 0
  );

  /** `true` when all selected items are already at the top — moveUp/moveTop are no-ops. */
  public readonly isMoveUpDisabled: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.isMoveDisabled()) return true;
    const items: unknown[] = this.value();
    const sel: unknown[] = this.selection();
    return sel.every((selectedItem: unknown): boolean => this.indexOf(selectedItem, items) === 0);
  });

  /** `true` when all selected items are already at the bottom — moveDown/moveBottom are no-ops. */
  public readonly isMoveDownDisabled: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.isMoveDisabled()) return true;
    const items: unknown[] = this.value();
    const sel: unknown[] = this.selection();
    const lastIndex: number = items.length - 1;
    return sel.every(
      (selectedItem: unknown): boolean => this.indexOf(selectedItem, items) === lastIndex
    );
  });

  /** Template context for the empty-state template. */
  public readonly emptyContext: Signal<OrderListEmptyContext> = computed<OrderListEmptyContext>(
    (): OrderListEmptyContext => ({ filter: this.isEmptyDueToFilter() })
  );

  // ---------------------------------------------------------------------------
  // Public item-identity helpers (used in template)
  // ---------------------------------------------------------------------------

  /**
   * Returns `true` when `item` is present in the current selection.
   * Uses the `trackBy` property key when set, otherwise object identity.
   */
  public isSelected(item: unknown): boolean {
    const key: string | null = this.trackBy();
    return this.selection().some((selectedItem: unknown): boolean =>
      key
        ? this.resolveKey(selectedItem, key) === this.resolveKey(item, key)
        : selectedItem === item
    );
  }

  /**
   * Returns a human-readable label for `item`.
   * If `trackBy` is set, resolves that property; otherwise falls back to `String(item)`.
   */
  public resolveItemLabel(item: unknown): string {
    const key: string | null = this.trackBy();
    if (key) {
      const resolved: unknown = this.resolveKey(item, key);
      return resolved !== undefined && resolved !== null ? String(resolved) : '';
    }
    return String(item);
  }

  /**
   * `@for` tracking function exposed to the template.
   * Uses the `trackBy` property when available, otherwise the item itself.
   */
  public trackByFn(_index: number, item: unknown): unknown {
    const key: string | null = this.trackBy();
    if (!key) {
      return item;
    }
    const resolved: unknown = this.resolveKey(item, key);
    return resolved !== undefined ? resolved : _index;
  }

  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------

  /**
   * Returns the HTML `id` attribute for a given display-list index.
   * Used to set `id` on `<li>` elements and for focus targeting.
   */
  public itemId(displayIndex: number): string {
    return `${this.componentId}-item-${displayIndex}`;
  }

  /**
   * Moves keyboard focus to `displayIndex` within the visible list.
   * Updates `focusedIndex` signal and calls `.focus()` on the corresponding DOM element.
   * SSR-safe — only accesses the DOM inside `isPlatformBrowser`.
   */
  public focusItem(displayIndex: number): void {
    const count: number = this.displayItems().length;
    if (count === 0) return;
    const clamped: number = Math.max(0, Math.min(displayIndex, count - 1));
    this.focusedIndex.set(clamped);

    if (!isPlatformBrowser(this.platformId)) return;
    const listbox: HTMLElement | undefined = this.listboxEl()?.nativeElement;
    if (!listbox) return;
    const id: string = this.itemId(clamped);
    const el: HTMLElement | null = listbox.querySelector<HTMLElement>(`#${id}`);
    el?.focus();
  }

  /**
   * Handles `keydown` events on the listbox `<ul>` element.
   *
   * Navigation:
   * - `ArrowDown` / `ArrowUp`: move focus to next/previous item.
   * - `Home` / `End`: focus first/last item.
   *
   * Selection:
   * - `Space` / `Enter`: toggle selection of focused item.
   * - `Ctrl+A` / `Meta+A`: select all visible items.
   * - `Escape`: clear selection.
   *
   * Reorder shortcuts (require one or more items to be selected):
   * - `Alt+ArrowUp` or `Ctrl+ArrowUp`: move selected items up.
   * - `Alt+ArrowDown` or `Ctrl+ArrowDown`: move selected items down.
   * - `Alt+Home` or `Ctrl+Home`: move selected items to top.
   * - `Alt+End` or `Ctrl+End`: move selected items to bottom.
   */
  public onListKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const isAlt: boolean = event.altKey;
    const isCtrl: boolean = event.ctrlKey || event.metaKey;
    const key: string = event.key;
    const items: unknown[] = this.displayItems();
    const count: number = items.length;
    if (count === 0) return;

    const current: number = this.focusedIndex();

    switch (key) {
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        if (isAlt || isCtrl) {
          // Reorder: move selected items down
          this.moveDown();
          this.followSelectionAfterReorder();
        } else {
          this.focusItem(current < count - 1 ? current + 1 : 0);
        }
        break;
      }

      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        if (isAlt || isCtrl) {
          // Reorder: move selected items up
          this.moveUp();
          this.followSelectionAfterReorder();
        } else {
          this.focusItem(current > 0 ? current - 1 : count - 1);
        }
        break;
      }

      case KEYBOARD_KEYS.Home: {
        event.preventDefault();
        if (isAlt || isCtrl) {
          // Reorder: move selected items to top
          this.moveTop();
          this.focusItem(0);
        } else {
          this.focusItem(0);
        }
        break;
      }

      case KEYBOARD_KEYS.End: {
        event.preventDefault();
        if (isAlt || isCtrl) {
          // Reorder: move selected items to bottom
          this.moveBottom();
          this.focusItem(count - 1);
        } else {
          this.focusItem(count - 1);
        }
        break;
      }

      case KEYBOARD_KEYS.Space:
      case KEYBOARD_KEYS.Enter: {
        event.preventDefault();
        if (current >= 0 && current < count) {
          const item: unknown = items[current];
          const syntheticEvent: MouseEvent = new MouseEvent('click', {
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            shiftKey: event.shiftKey,
          });
          this.onItemClick(syntheticEvent, item, current);
        }
        break;
      }

      default: {
        // Ctrl+A / Meta+A — select all visible items
        if ((event.ctrlKey || event.metaKey) && key === 'a') {
          event.preventDefault();
          const newSelection: unknown[] = [...items];
          this.selection.set(newSelection);
          this.selectionChanged.emit({ originalEvent: event, value: newSelection });
        } else if (key === KEYBOARD_KEYS.Escape) {
          this.selection.set([]);
          this.selectionChanged.emit({ originalEvent: event, value: [] });
        }
        break;
      }
    }
  }

  /**
   * Handles focus on a list item — updates `focusedIndex` to the hovered item's index.
   * Enables correct `focusedIndex` state when the user Tabs into the list or
   * clicks an item (which also fires focus).
   */
  public onItemFocus(_event: FocusEvent, displayIndex: number): void {
    this.focusedIndex.set(displayIndex);
  }

  /**
   * After a keyboard-triggered reorder, moves the focused index to follow the
   * first selected item's new position in `displayItems()`.
   */
  private followSelectionAfterReorder(): void {
    const sel: unknown[] = this.selection();
    if (sel.length === 0) return;
    const firstSelected: unknown = sel[0];
    const newDisplayIndex: number = this.displayItems().findIndex(
      (item: unknown): boolean => item === firstSelected
    );
    if (newDisplayIndex !== -1) {
      this.focusItem(newDisplayIndex);
    }
    // Announce new position
    const label: string = this.resolveItemLabel(firstSelected);
    const position: number = this.getValueIndex(newDisplayIndex) + 1;
    const total: number = this.value().length;
    void this.liveAnnouncer.announce(`${label} moved to position ${position} of ${total}.`);
  }

  // ---------------------------------------------------------------------------
  // Drag & drop event handlers
  // ---------------------------------------------------------------------------

  /**
   * Maps a display-list index to the corresponding index in the full `value()` array.
   * Needed when `filterBy` is active and display indices differ from value indices.
   */
  public getValueIndex(displayIndex: number): number {
    const displayed: unknown[] = this.displayItems();
    const all: unknown[] = this.value();
    const item: unknown = displayed[displayIndex];
    return this.indexOf(item, all);
  }

  /**
   * Handles `dragstart` on a list item.
   * Records the dragged item index and initialises the DataTransfer object.
   *
   * Note: touch-device support (polyfill) is deferred to v2 — native HTML5 DnD
   * has limited mobile browser support.
   */
  public onDragStart(event: DragEvent, displayIndex: number): void {
    if (!this.dragDrop() || this.disabled()) return;
    const valueIndex: number = this.getValueIndex(displayIndex);
    this.draggedIndex.set(valueIndex);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      // Required for Firefox to initiate the drag
      event.dataTransfer.setData('text/plain', String(valueIndex));
    }
    const label: string = this.resolveItemLabel(this.value()[valueIndex]);
    const position: number = valueIndex + 1;
    const total: number = this.value().length;
    void this.liveAnnouncer.announce(`Grabbed ${label}. Current position ${position} of ${total}.`);
  }

  /**
   * Handles `dragover` on a list item.
   * Determines whether the cursor is in the top or bottom half of the target element
   * and updates `dragOverIndex` and `dragPosition` accordingly.
   */
  public onDragOver(event: DragEvent, displayIndex: number): void {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';

    if (!isPlatformBrowser(this.platformId)) return;

    const target: HTMLElement = event.currentTarget as HTMLElement;

    const rect: DOMRect = target.getBoundingClientRect();
    const midY: number = rect.top + rect.height / 2;
    const position: 'before' | 'after' = event.clientY < midY ? 'before' : 'after';

    this.dragOverIndex.set(displayIndex);
    this.dragPosition.set(position);
  }

  /**
   * Handles `dragleave` on the list.
   * Clears the drag-over visual state when the cursor leaves the list area.
   */
  public onDragLeave(event: DragEvent): void {
    // Only clear when leaving the list element itself (not a child)
    const target: HTMLElement = event.currentTarget as HTMLElement;
    const related: Node | null = event.relatedTarget as Node | null;
    if (!target.contains(related)) {
      this.dragOverIndex.set(null);
      this.dragPosition.set(null);
    }
  }

  /**
   * Handles `drop` on a list item.
   * Computes the effective target index, rebuilds the `value()` array immutably,
   * updates the model, and emits both `dragDropped` and `reordered` outputs.
   */
  public onDrop(event: DragEvent, dropDisplayIndex: number): void {
    event.preventDefault();
    const sourceValueIndex: number | null = this.draggedIndex();
    if (sourceValueIndex === null) {
      this.clearDragState();
      return;
    }

    const targetValueIndex: number = this.getValueIndex(dropDisplayIndex);
    const position: 'before' | 'after' | null = this.dragPosition();

    // Effective insertion index: 'after' means insert after the target
    let effectiveTargetIndex: number =
      position === 'after' ? targetValueIndex + 1 : targetValueIndex;

    // Adjust for the removal of the source item when it was before the target
    if (sourceValueIndex < effectiveTargetIndex) {
      effectiveTargetIndex -= 1;
    }

    if (sourceValueIndex === effectiveTargetIndex) {
      this.clearDragState();
      return;
    }

    const items: unknown[] = [...this.value()];
    const [moved] = items.splice(sourceValueIndex, 1);
    items.splice(effectiveTargetIndex, 0, moved);

    const label: string = this.resolveItemLabel(moved);
    const oldPosition: number = sourceValueIndex + 1;
    const newPosition: number = effectiveTargetIndex + 1;

    this.value.set(items);
    this.dragDropped.emit({
      previousIndex: sourceValueIndex,
      currentIndex: effectiveTargetIndex,
      items,
    });
    this.reordered.emit({
      items,
      previousIndex: sourceValueIndex,
      currentIndex: effectiveTargetIndex,
    });

    void this.liveAnnouncer.announce(
      `Moved ${label} from position ${oldPosition} to position ${newPosition}.`
    );
    this.clearDragState();
  }

  /**
   * Handles `dragend` on a dragged item.
   * Clears all drag state — covers cases where the drop target is outside the list
   * (e.g., user presses Escape or drops onto a non-droppable area).
   */
  public onDragEnd(_event: DragEvent): void {
    this.clearDragState();
  }

  /** Resets all drag state signals to their initial values. */
  private clearDragState(): void {
    this.draggedIndex.set(null);
    this.dragOverIndex.set(null);
    this.dragPosition.set(null);
  }

  // ---------------------------------------------------------------------------
  // Filter
  // ---------------------------------------------------------------------------

  /**
   * Handles input events on the filter text field.
   * Updates `filterQuery` and emits `filtered` with the matching items.
   *
   * Note: No debounce in v1 — OrderList datasets are typically small.
   * For very large lists, callers can debounce via a wrapping component; a
   * built-in debounce option is planned for v2.
   */
  public onFilterInput(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.filterQuery.set(input.value);
    this.filtered.emit({
      originalEvent: event,
      query: input.value,
      filteredItems: this.displayItems(),
    });
  }

  /**
   * Resolves a dot-notation property path on `item` to a trimmed lowercase string
   * suitable for filter comparison. Returns `''` when the path is unresolvable.
   *
   * @example `resolveProperty({ user: { name: 'Alice' } }, 'user.name')` → `'alice'`
   */
  public resolveProperty(item: unknown, path: string): string {
    const locale: string | undefined = this.filterLocale();
    const resolved: unknown = path
      .split('.')
      .reduce((current: unknown, segment: string): unknown => {
        if (current !== null && current !== undefined && typeof current === 'object') {
          return (current as Record<string, unknown>)[segment];
        }
        return undefined;
      }, item);
    if (resolved === null || resolved === undefined) return '';
    return String(resolved).toLocaleLowerCase(locale);
  }

  /**
   * Returns `true` when `item` satisfies the active filter query and match mode.
   * Comparison is always case-insensitive via `toLocaleLowerCase`.
   */
  public matchesFilter(item: unknown): boolean {
    const filterPath: string | null = this.filterBy();
    if (!filterPath) return true;
    const locale: string | undefined = this.filterLocale();
    const query: string = this.filterQuery().trim().toLocaleLowerCase(locale);
    if (query === '') return true;
    const value: string = this.resolveProperty(item, filterPath);
    switch (this.filterMatchMode()) {
      case 'startsWith':
        return value.startsWith(query);
      case 'endsWith':
        return value.endsWith(query);
      case 'equals':
        return value === query;
      case 'contains':
      default:
        return value.includes(query);
    }
  }

  // ---------------------------------------------------------------------------
  // Selection
  // ---------------------------------------------------------------------------

  /**
   * Handles a click on a list item, updating the selection model according to
   * `metaKeySelection` and standard multi-select conventions.
   */
  public onItemClick(event: MouseEvent, item: unknown, index: number): void {
    if (this.disabled()) return;

    const currentSelection: unknown[] = this.selection();
    let newSelection: unknown[];

    if (this.metaKeySelection()) {
      const isMetaHeld: boolean = event.ctrlKey || event.metaKey;
      const isShiftHeld: boolean = event.shiftKey;

      if (isShiftHeld && this.lastClickedIndex !== -1) {
        newSelection = this.buildRangeSelection(this.lastClickedIndex, index, currentSelection);
      } else if (isMetaHeld) {
        newSelection = this.toggleItemInSelection(item, currentSelection);
      } else {
        newSelection = [item];
      }
    } else {
      // Toggle mode: clicking toggles individual item without clearing others
      newSelection = this.toggleItemInSelection(item, currentSelection);
    }

    this.lastClickedIndex = index;
    this.selection.set(newSelection);
    this.selectionChanged.emit({ originalEvent: event, value: newSelection });
  }

  // ---------------------------------------------------------------------------
  // Reorder operations
  // ---------------------------------------------------------------------------

  /** Moves each selected item up by one position. */
  public moveUp(): void {
    if (this.isMoveUpDisabled()) return;
    const items: unknown[] = [...this.value()];
    const sel: unknown[] = this.selection();
    const selSet: Set<number> = this.buildSelectionSet(sel, items);

    let firstPreviousIndex: number = -1;
    let firstCurrentIndex: number = -1;

    for (let index: number = 0; index < items.length; index++) {
      if (selSet.has(index) && index !== 0 && !selSet.has(index - 1)) {
        const temp: unknown = items[index - 1];
        items[index - 1] = items[index];
        items[index] = temp;
        if (firstPreviousIndex === -1) {
          firstPreviousIndex = index;
          firstCurrentIndex = index - 1;
        }
      }
    }

    this.value.set(items);
    this.reordered.emit({
      items,
      previousIndex: firstPreviousIndex !== -1 ? firstPreviousIndex : 0,
      currentIndex: firstCurrentIndex !== -1 ? firstCurrentIndex : 0,
    });
  }

  /** Moves each selected item down by one position. */
  public moveDown(): void {
    if (this.isMoveDownDisabled()) return;
    const items: unknown[] = [...this.value()];
    const sel: unknown[] = this.selection();
    const selSet: Set<number> = this.buildSelectionSet(sel, items);

    let firstPreviousIndex: number = -1;
    let firstCurrentIndex: number = -1;

    for (let index: number = items.length - 1; index >= 0; index--) {
      if (selSet.has(index) && index !== items.length - 1 && !selSet.has(index + 1)) {
        const temp: unknown = items[index + 1];
        items[index + 1] = items[index];
        items[index] = temp;
        if (firstPreviousIndex === -1) {
          firstPreviousIndex = index;
          firstCurrentIndex = index + 1;
        }
      }
    }

    this.value.set(items);
    this.reordered.emit({
      items,
      previousIndex: firstPreviousIndex !== -1 ? firstPreviousIndex : items.length - 1,
      currentIndex: firstCurrentIndex !== -1 ? firstCurrentIndex : items.length - 1,
    });
  }

  /** Moves all selected items to the beginning of the list, preserving their relative order. */
  public moveTop(): void {
    if (this.isMoveUpDisabled()) return;
    const items: unknown[] = this.value();
    const sel: unknown[] = this.selection();
    const selSet: Set<number> = this.buildSelectionSet(sel, items);

    const selectedItems: unknown[] = items.filter((_item: unknown, index: number): boolean =>
      selSet.has(index)
    );
    const remaining: unknown[] = items.filter(
      (_item: unknown, index: number): boolean => !selSet.has(index)
    );
    const newItems: unknown[] = [...selectedItems, ...remaining];
    const firstPreviousIndex: number = items.findIndex((_item: unknown, index: number): boolean =>
      selSet.has(index)
    );

    this.value.set(newItems);
    this.reordered.emit({ items: newItems, previousIndex: firstPreviousIndex, currentIndex: 0 });
  }

  /** Moves all selected items to the end of the list, preserving their relative order. */
  public moveBottom(): void {
    if (this.isMoveDownDisabled()) return;
    const items: unknown[] = this.value();
    const sel: unknown[] = this.selection();
    const selSet: Set<number> = this.buildSelectionSet(sel, items);

    const selectedItems: unknown[] = items.filter((_item: unknown, index: number): boolean =>
      selSet.has(index)
    );
    const remaining: unknown[] = items.filter(
      (_item: unknown, index: number): boolean => !selSet.has(index)
    );
    const newItems: unknown[] = [...remaining, ...selectedItems];
    const firstPreviousIndex: number = items.findIndex((_item: unknown, index: number): boolean =>
      selSet.has(index)
    );

    this.value.set(newItems);
    this.reordered.emit({
      items: newItems,
      previousIndex: firstPreviousIndex,
      currentIndex: remaining.length,
    });
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /**
   * Resolves a dot-notation property path against `item`.
   */
  private resolveKey(item: unknown, key: string): unknown {
    return key.split('.').reduce((current: unknown, segment: string): unknown => {
      if (current !== null && current !== undefined && typeof current === 'object') {
        return (current as Record<string, unknown>)[segment];
      }
      return undefined;
    }, item);
  }

  /**
   * Returns the index of `item` in `items` using `trackBy` property or identity.
   */
  private indexOf(item: unknown, items: unknown[]): number {
    const key: string | null = this.trackBy();
    if (key) {
      const itemKey: unknown = this.resolveKey(item, key);
      return items.findIndex(
        (candidate: unknown): boolean => this.resolveKey(candidate, key) === itemKey
      );
    }
    return items.indexOf(item);
  }

  /**
   * Returns a new selection array with `item` toggled.
   */
  private toggleItemInSelection(item: unknown, currentSelection: unknown[]): unknown[] {
    const key: string | null = this.trackBy();
    const exists: boolean = key
      ? currentSelection.some(
          (s: unknown): boolean => this.resolveKey(s, key) === this.resolveKey(item, key)
        )
      : currentSelection.includes(item);

    if (exists) {
      return key
        ? currentSelection.filter(
            (s: unknown): boolean => this.resolveKey(s, key) !== this.resolveKey(item, key)
          )
        : currentSelection.filter((s: unknown): boolean => s !== item);
    }
    return [...currentSelection, item];
  }

  /**
   * Returns a range selection between `fromIndex` and `toIndex`, merged with existing selection.
   */
  private buildRangeSelection(
    fromIndex: number,
    toIndex: number,
    existingSelection: unknown[]
  ): unknown[] {
    const items: unknown[] = this.value();
    const start: number = Math.min(fromIndex, toIndex);
    const end: number = Math.max(fromIndex, toIndex);
    const rangeItems: unknown[] = items.slice(start, end + 1);

    const merged: unknown[] = [...existingSelection];
    for (const rangeItem of rangeItems) {
      if (!merged.includes(rangeItem)) {
        merged.push(rangeItem);
      }
    }
    return merged;
  }

  /**
   * Builds a `Set` of indices for the currently selected items within `items`.
   */
  private buildSelectionSet(sel: unknown[], items: unknown[]): Set<number> {
    const set: Set<number> = new Set<number>();
    for (const selectedItem of sel) {
      const index: number = this.indexOf(selectedItem, items);
      if (index !== -1) {
        set.add(index);
      }
    }
    return set;
  }
}
