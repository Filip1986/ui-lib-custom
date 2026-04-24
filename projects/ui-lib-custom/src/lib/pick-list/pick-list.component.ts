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
  ElementRef,
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import type {
  PickListEmptyContext,
  PickListFilterEvent,
  PickListFilterMatchMode,
  PickListMoveAllToSourceEvent,
  PickListMoveAllToTargetEvent,
  PickListMoveToSourceEvent,
  PickListMoveToTargetEvent,
  PickListReorderEvent,
  PickListSelectionChangeEvent,
  PickListSize,
  PickListVariant,
} from './pick-list.types';
import {
  PickListEmptyDirective,
  PickListItemDirective,
  PickListSourceHeaderDirective,
  PickListTargetHeaderDirective,
} from './pick-list-templates.directive';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { Icon } from 'ui-lib-custom/icon';
import { LiveAnnouncerService } from 'ui-lib-custom/a11y';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';

/** Monotonic counter for unique element IDs. */
let pickListIdCounter: number = 0;

/**
 * PickList component — transfers items between a source list and a target list.
 *
 * @example
 * ```html
 * <ui-lib-pick-list [(source)]="available" [(target)]="selected">
 *   <ng-template uiPickListItem let-item>{{ item.name }}</ng-template>
 * </ui-lib-pick-list>
 * ```
 */
@Component({
  selector: 'ui-lib-pick-list',
  standalone: true,
  imports: [NgTemplateOutlet, Icon],
  templateUrl: './pick-list.component.html',
  styleUrl: './pick-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class PickListComponent {
  // ---------------------------------------------------------------------------
  // DI
  // ---------------------------------------------------------------------------

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly liveAnnouncer: LiveAnnouncerService = inject(LiveAnnouncerService);
  private readonly platformId: object = inject(PLATFORM_ID);

  /** Reference to the source listbox `<ul>` for roving-tabindex focus management. */
  private readonly sourceListEl: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('sourceListEl');

  /** Reference to the target listbox `<ul>` for roving-tabindex focus management. */
  private readonly targetListEl: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('targetListEl');

  // ---------------------------------------------------------------------------
  // Two-way model inputs
  // ---------------------------------------------------------------------------

  /** The source list of items. Mutations emit a new array reference. */
  public source: ModelSignal<unknown[]> = model<unknown[]>([]);

  /** The target list of items. Mutations emit a new array reference. */
  public target: ModelSignal<unknown[]> = model<unknown[]>([]);

  /** The currently selected items in the source list. */
  public sourceSelection: ModelSignal<unknown[]> = model<unknown[]>([]);

  /** The currently selected items in the target list. */
  public targetSelection: ModelSignal<unknown[]> = model<unknown[]>([]);

  // ---------------------------------------------------------------------------
  // Standard inputs
  // ---------------------------------------------------------------------------

  /** Caption rendered above the source list. */
  public readonly sourceHeader: InputSignal<string | null> = input<string | null>(null);

  /** Caption rendered above the target list. */
  public readonly targetHeader: InputSignal<string | null> = input<string | null>(null);

  /**
   * Dot-notation property path used to filter items (e.g. `'name'` or `'address.city'`).
   * When `null`, filter inputs are not rendered.
   */
  public readonly filterBy: InputSignal<string | null> = input<string | null>(null);

  /** Strategy used when matching the filter query against item fields. */
  public readonly filterMatchMode: InputSignal<PickListFilterMatchMode> =
    input<PickListFilterMatchMode>('contains');

  /** BCP 47 locale tag used for locale-sensitive string comparisons during filtering. */
  public readonly filterLocale: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );

  /** Placeholder text shown inside the source list filter input. */
  public readonly sourceFilterPlaceholder: InputSignal<string> = input<string>('Filter');

  /** Placeholder text shown inside the target list filter input. */
  public readonly targetFilterPlaceholder: InputSignal<string> = input<string>('Filter');

  /** When `true`, shows reorder controls for the source list. */
  public readonly showSourceControls: InputSignal<boolean> = input<boolean>(true);

  /** When `true`, shows reorder controls for the target list. */
  public readonly showTargetControls: InputSignal<boolean> = input<boolean>(true);

  /** When `true`, all interaction is disabled. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, Ctrl/Meta must be held to toggle multi-select. */
  public readonly metaKeySelection: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, alternating rows are rendered with a background tint. */
  public readonly stripedRows: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, items can be reordered and transferred by dragging and dropping. */
  public readonly dragDrop: InputSignal<boolean> = input<boolean>(false);

  /**
   * Theme variant override. When `null`, the variant is inherited from `ThemeConfigService`.
   */
  public readonly variant: InputSignal<PickListVariant | null> = input<PickListVariant | null>(
    null
  );

  /** Component size token. */
  public readonly size: InputSignal<PickListSize> = input<PickListSize>('md');

  /**
   * Property key used to identify items for selection equality and `@for` tracking.
   * When `null`, item object identity is used.
   */
  public readonly trackBy: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the source listbox element. */
  public readonly sourceAriaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the target listbox element. */
  public readonly targetAriaLabel: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the "Move all to target" button. */
  public readonly moveAllToTargetAriaLabel: InputSignal<string> =
    input<string>('Move all to target');

  /** Accessible label for the "Move selected to target" button. */
  public readonly moveToTargetAriaLabel: InputSignal<string> =
    input<string>('Move selected to target');

  /** Accessible label for the "Move selected to source" button. */
  public readonly moveToSourceAriaLabel: InputSignal<string> =
    input<string>('Move selected to source');

  /** Accessible label for the "Move all to source" button. */
  public readonly moveAllToSourceAriaLabel: InputSignal<string> =
    input<string>('Move all to source');

  /** Accessible label for the source "Move to top" reorder button. */
  public readonly sourceMoveTopAriaLabel: InputSignal<string> = input<string>('Move to top');

  /** Accessible label for the source "Move up" reorder button. */
  public readonly sourceMoveUpAriaLabel: InputSignal<string> = input<string>('Move up');

  /** Accessible label for the source "Move down" reorder button. */
  public readonly sourceMoveDownAriaLabel: InputSignal<string> = input<string>('Move down');

  /** Accessible label for the source "Move to bottom" reorder button. */
  public readonly sourceMoveBottomAriaLabel: InputSignal<string> = input<string>('Move to bottom');

  /** Accessible label for the target "Move to top" reorder button. */
  public readonly targetMoveTopAriaLabel: InputSignal<string> = input<string>('Move to top');

  /** Accessible label for the target "Move up" reorder button. */
  public readonly targetMoveUpAriaLabel: InputSignal<string> = input<string>('Move up');

  /** Accessible label for the target "Move down" reorder button. */
  public readonly targetMoveDownAriaLabel: InputSignal<string> = input<string>('Move down');

  /** Accessible label for the target "Move to bottom" reorder button. */
  public readonly targetMoveBottomAriaLabel: InputSignal<string> = input<string>('Move to bottom');

  /** Additional CSS class applied to the root element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  // ---------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------

  /** Emitted when selected source items are moved to the target list. */
  public readonly movedToTarget: OutputEmitterRef<PickListMoveToTargetEvent> =
    output<PickListMoveToTargetEvent>();

  /** Emitted when all source items are moved to the target list. */
  public readonly movedAllToTarget: OutputEmitterRef<PickListMoveAllToTargetEvent> =
    output<PickListMoveAllToTargetEvent>();

  /** Emitted when selected target items are moved to the source list. */
  public readonly movedToSource: OutputEmitterRef<PickListMoveToSourceEvent> =
    output<PickListMoveToSourceEvent>();

  /** Emitted when all target items are moved to the source list. */
  public readonly movedAllToSource: OutputEmitterRef<PickListMoveAllToSourceEvent> =
    output<PickListMoveAllToSourceEvent>();

  /** Emitted when the source selection changes. */
  public readonly sourceSelectionChanged: OutputEmitterRef<PickListSelectionChangeEvent> =
    output<PickListSelectionChangeEvent>();

  /** Emitted when the target selection changes. */
  public readonly targetSelectionChanged: OutputEmitterRef<PickListSelectionChangeEvent> =
    output<PickListSelectionChangeEvent>();

  /** Emitted when the source filter query changes. */
  public readonly sourceFiltered: OutputEmitterRef<PickListFilterEvent> =
    output<PickListFilterEvent>();

  /** Emitted when the target filter query changes. */
  public readonly targetFiltered: OutputEmitterRef<PickListFilterEvent> =
    output<PickListFilterEvent>();

  /** Emitted after a reorder operation within the source or target list. */
  public readonly reordered: OutputEmitterRef<PickListReorderEvent> =
    output<PickListReorderEvent>();

  // ---------------------------------------------------------------------------
  // Template directive queries
  // ---------------------------------------------------------------------------

  /** Custom item row template shared by both lists. Context: `PickListItemContext<T>`. */
  public readonly itemTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    PickListItemDirective,
    { read: TemplateRef }
  );

  /** Custom header template for the source list. */
  public readonly sourceHeaderTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    PickListSourceHeaderDirective,
    { read: TemplateRef }
  );

  /** Custom header template for the target list. */
  public readonly targetHeaderTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    PickListTargetHeaderDirective,
    { read: TemplateRef }
  );

  /** Custom empty-state template shared by both lists. Context: `PickListEmptyContext`. */
  public readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    PickListEmptyDirective,
    { read: TemplateRef }
  );

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  /** Unique element-ID prefix for this instance. */
  public readonly componentId: string = `ui-lib-pick-list-${++pickListIdCounter}`;

  /** Current text entered in the source filter input. */
  public readonly sourceFilterQuery: WritableSignal<string> = signal<string>('');

  /** Current text entered in the target filter input. */
  public readonly targetFilterQuery: WritableSignal<string> = signal<string>('');

  /**
   * Index within `displaySourceItems()` of the currently keyboard-focused source item.
   * `-1` when no item is focused.
   */
  public readonly sourceFocusedIndex: WritableSignal<number> = signal<number>(-1);

  /**
   * Index within `displayTargetItems()` of the currently keyboard-focused target item.
   * `-1` when no item is focused.
   */
  public readonly targetFocusedIndex: WritableSignal<number> = signal<number>(-1);

  /** Index of the last clicked source item, for Shift+Click range selection. */
  private sourceLastClickedIndex: number = -1;

  /** Index of the last clicked target item, for Shift+Click range selection. */
  private targetLastClickedIndex: number = -1;

  // ---------------------------------------------------------------------------
  // Drag & drop state
  // ---------------------------------------------------------------------------

  /** Which list the current drag originated from. */
  public readonly dragOriginList: WritableSignal<'source' | 'target' | null> = signal<
    'source' | 'target' | null
  >(null);

  /** Index within the origin list's `value` array of the item being dragged. */
  public readonly draggedValueIndex: WritableSignal<number | null> = signal<number | null>(null);

  /** Which list is currently being dragged over. */
  public readonly dragOverList: WritableSignal<'source' | 'target' | null> = signal<
    'source' | 'target' | null
  >(null);

  /** Display index within the drag-over list of the item currently being hovered. */
  public readonly dragOverIndex: WritableSignal<number | null> = signal<number | null>(null);

  /** Whether the drop indicator appears above (`'before'`) or below (`'after'`) the hovered item. */
  public readonly dragPosition: WritableSignal<'before' | 'after' | null> = signal<
    'before' | 'after' | null
  >(null);

  // ---------------------------------------------------------------------------
  // Computed view state
  // ---------------------------------------------------------------------------

  /** Resolved theme variant (falls back to ThemeConfigService). */
  public readonly resolvedVariant: Signal<PickListVariant> = computed<PickListVariant>(
    (): PickListVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** CSS class string applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      'ui-lib-pick-list',
      `ui-lib-pick-list--${this.resolvedVariant()}`,
      `ui-lib-pick-list--${this.size()}`,
    ];
    if (this.disabled()) classes.push('ui-lib-pick-list--disabled');
    if (this.stripedRows()) classes.push('ui-lib-pick-list--striped');
    if (this.dragDrop()) classes.push('ui-lib-pick-list--dragdrop');
    const extra: string | null = this.styleClass();
    if (extra) classes.push(extra);
    return classes.join(' ');
  });

  /** Source items after applying the active source filter. */
  public readonly displaySourceItems: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    const filterPath: string | null = this.filterBy();
    const query: string = this.sourceFilterQuery().trim();
    if (!filterPath || query === '') {
      return this.source();
    }
    return this.source().filter((item: unknown): boolean =>
      this.matchesFilter(item, this.sourceFilterQuery())
    );
  });

  /** Target items after applying the active target filter. */
  public readonly displayTargetItems: Signal<unknown[]> = computed<unknown[]>((): unknown[] => {
    const filterPath: string | null = this.filterBy();
    const query: string = this.targetFilterQuery().trim();
    if (!filterPath || query === '') {
      return this.target();
    }
    return this.target().filter((item: unknown): boolean =>
      this.matchesFilter(item, this.targetFilterQuery())
    );
  });

  /** `true` when the source list is empty because the filter matched nothing. */
  public readonly isSourceEmptyDueToFilter: Signal<boolean> = computed<boolean>(
    (): boolean => this.source().length > 0 && this.displaySourceItems().length === 0
  );

  /** `true` when the target list is empty because the filter matched nothing. */
  public readonly isTargetEmptyDueToFilter: Signal<boolean> = computed<boolean>(
    (): boolean => this.target().length > 0 && this.displayTargetItems().length === 0
  );

  /** `true` when no source items are selected or the component is disabled. */
  public readonly isMoveToTargetDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.sourceSelection().length === 0
  );

  /** `true` when no target items are selected or the component is disabled. */
  public readonly isMoveToSourceDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.targetSelection().length === 0
  );

  /** `true` when the source list is empty or the component is disabled. */
  public readonly isMoveAllToTargetDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.source().length === 0
  );

  /** `true` when the target list is empty or the component is disabled. */
  public readonly isMoveAllToSourceDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.target().length === 0
  );

  /** `true` when all selected source items are already at the top. */
  public readonly isSourceMoveUpDisabled: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.disabled() || this.sourceSelection().length === 0) return true;
    const items: unknown[] = this.source();
    return this.sourceSelection().every(
      (item: unknown): boolean => this.indexOf(item, items) === 0
    );
  });

  /** `true` when all selected source items are already at the bottom. */
  public readonly isSourceMoveDownDisabled: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.disabled() || this.sourceSelection().length === 0) return true;
    const items: unknown[] = this.source();
    const lastIndex: number = items.length - 1;
    return this.sourceSelection().every(
      (item: unknown): boolean => this.indexOf(item, items) === lastIndex
    );
  });

  /** `true` when all selected target items are already at the top. */
  public readonly isTargetMoveUpDisabled: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.disabled() || this.targetSelection().length === 0) return true;
    const items: unknown[] = this.target();
    return this.targetSelection().every(
      (item: unknown): boolean => this.indexOf(item, items) === 0
    );
  });

  /** `true` when all selected target items are already at the bottom. */
  public readonly isTargetMoveDownDisabled: Signal<boolean> = computed<boolean>((): boolean => {
    if (this.disabled() || this.targetSelection().length === 0) return true;
    const items: unknown[] = this.target();
    const lastIndex: number = items.length - 1;
    return this.targetSelection().every(
      (item: unknown): boolean => this.indexOf(item, items) === lastIndex
    );
  });

  /** Template context for the source empty-state template. */
  public readonly sourceEmptyContext: Signal<PickListEmptyContext> = computed<PickListEmptyContext>(
    (): PickListEmptyContext => ({ filter: this.isSourceEmptyDueToFilter() })
  );

  /** Template context for the target empty-state template. */
  public readonly targetEmptyContext: Signal<PickListEmptyContext> = computed<PickListEmptyContext>(
    (): PickListEmptyContext => ({ filter: this.isTargetEmptyDueToFilter() })
  );

  // ---------------------------------------------------------------------------
  // Public item-identity helpers (used in template)
  // ---------------------------------------------------------------------------

  /**
   * Returns `true` when `item` is present in the source selection.
   */
  public isSourceSelected(item: unknown): boolean {
    return this.isInSelection(item, this.sourceSelection());
  }

  /**
   * Returns `true` when `item` is present in the target selection.
   */
  public isTargetSelected(item: unknown): boolean {
    return this.isInSelection(item, this.targetSelection());
  }

  /**
   * Returns a human-readable label for `item`.
   * Uses `trackBy` property when set, otherwise falls back to `String(item)`.
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
   */
  public trackByFn(_index: number, item: unknown): unknown {
    const key: string | null = this.trackBy();
    return key ? this.resolveKey(item, key) : item;
  }

  /**
   * Returns the HTML `id` attribute for a given list item.
   */
  public itemId(list: 'source' | 'target', displayIndex: number): string {
    return `${this.componentId}-${list}-item-${displayIndex}`;
  }

  // ---------------------------------------------------------------------------
  // Transfer operations
  // ---------------------------------------------------------------------------

  /**
   * Moves the currently selected source items to the end of the target list.
   */
  public moveToTarget(): void {
    if (this.isMoveToTargetDisabled()) return;
    const selected: unknown[] = this.sourceSelection();
    const newSource: unknown[] = this.source().filter(
      (item: unknown): boolean => !this.isInSelection(item, selected)
    );
    const newTarget: unknown[] = [...this.target(), ...selected];
    this.source.set(newSource);
    this.target.set(newTarget);
    this.sourceSelection.set([]);
    this.movedToTarget.emit({ items: selected });
    void this.liveAnnouncer.announce(
      `${selected.length} item${selected.length !== 1 ? 's' : ''} moved to target.`
    );
  }

  /**
   * Moves all source items to the end of the target list.
   */
  public moveAllToTarget(): void {
    if (this.isMoveAllToTargetDisabled()) return;
    const movedItems: unknown[] = [...this.source()];
    this.source.set([]);
    this.target.set([...this.target(), ...movedItems]);
    this.sourceSelection.set([]);
    this.movedAllToTarget.emit({ items: movedItems });
    void this.liveAnnouncer.announce(
      `${movedItems.length} item${movedItems.length !== 1 ? 's' : ''} moved to target.`
    );
  }

  /**
   * Moves the currently selected target items to the end of the source list.
   */
  public moveToSource(): void {
    if (this.isMoveToSourceDisabled()) return;
    const selected: unknown[] = this.targetSelection();
    const newTarget: unknown[] = this.target().filter(
      (item: unknown): boolean => !this.isInSelection(item, selected)
    );
    this.target.set(newTarget);
    this.source.set([...this.source(), ...selected]);
    this.targetSelection.set([]);
    this.movedToSource.emit({ items: selected });
    void this.liveAnnouncer.announce(
      `${selected.length} item${selected.length !== 1 ? 's' : ''} moved to source.`
    );
  }

  /**
   * Moves all target items to the end of the source list.
   */
  public moveAllToSource(): void {
    if (this.isMoveAllToSourceDisabled()) return;
    const movedItems: unknown[] = [...this.target()];
    this.target.set([]);
    this.source.set([...this.source(), ...movedItems]);
    this.targetSelection.set([]);
    this.movedAllToSource.emit({ items: movedItems });
    void this.liveAnnouncer.announce(
      `${movedItems.length} item${movedItems.length !== 1 ? 's' : ''} moved to source.`
    );
  }

  // ---------------------------------------------------------------------------
  // Source reorder operations
  // ---------------------------------------------------------------------------

  /** Moves selected source items up by one position. */
  public moveSourceUp(): void {
    if (this.isSourceMoveUpDisabled()) return;
    const previousIndex: number = this.findFirstSelectedIndex(
      this.source(),
      this.sourceSelection()
    );
    const result: unknown[] = this.performMoveUp(this.source(), this.sourceSelection());
    this.source.set(result);
    this.reordered.emit({
      list: 'source',
      items: result,
      previousIndex,
      currentIndex: Math.max(0, previousIndex - 1),
    });
  }

  /** Moves selected source items down by one position. */
  public moveSourceDown(): void {
    if (this.isSourceMoveDownDisabled()) return;
    const previousIndex: number = this.findFirstSelectedIndex(
      this.source(),
      this.sourceSelection()
    );
    const result: unknown[] = this.performMoveDown(this.source(), this.sourceSelection());
    this.source.set(result);
    this.reordered.emit({
      list: 'source',
      items: result,
      previousIndex,
      currentIndex: Math.min(result.length - 1, previousIndex + 1),
    });
  }

  /** Moves selected source items to the top of the source list. */
  public moveSourceTop(): void {
    if (this.isSourceMoveUpDisabled()) return;
    const previousIndex: number = this.findFirstSelectedIndex(
      this.source(),
      this.sourceSelection()
    );
    const result: unknown[] = this.performMoveTop(this.source(), this.sourceSelection());
    this.source.set(result);
    this.reordered.emit({ list: 'source', items: result, previousIndex, currentIndex: 0 });
  }

  /** Moves selected source items to the bottom of the source list. */
  public moveSourceBottom(): void {
    if (this.isSourceMoveDownDisabled()) return;
    const previousIndex: number = this.findFirstSelectedIndex(
      this.source(),
      this.sourceSelection()
    );
    const result: unknown[] = this.performMoveBottom(this.source(), this.sourceSelection());
    this.source.set(result);
    this.reordered.emit({
      list: 'source',
      items: result,
      previousIndex,
      currentIndex: result.length - 1,
    });
  }

  // ---------------------------------------------------------------------------
  // Target reorder operations
  // ---------------------------------------------------------------------------

  /** Moves selected target items up by one position. */
  public moveTargetUp(): void {
    if (this.isTargetMoveUpDisabled()) return;
    const previousIndex: number = this.findFirstSelectedIndex(
      this.target(),
      this.targetSelection()
    );
    const result: unknown[] = this.performMoveUp(this.target(), this.targetSelection());
    this.target.set(result);
    this.reordered.emit({
      list: 'target',
      items: result,
      previousIndex,
      currentIndex: Math.max(0, previousIndex - 1),
    });
  }

  /** Moves selected target items down by one position. */
  public moveTargetDown(): void {
    if (this.isTargetMoveDownDisabled()) return;
    const previousIndex: number = this.findFirstSelectedIndex(
      this.target(),
      this.targetSelection()
    );
    const result: unknown[] = this.performMoveDown(this.target(), this.targetSelection());
    this.target.set(result);
    this.reordered.emit({
      list: 'target',
      items: result,
      previousIndex,
      currentIndex: Math.min(result.length - 1, previousIndex + 1),
    });
  }

  /** Moves selected target items to the top of the target list. */
  public moveTargetTop(): void {
    if (this.isTargetMoveUpDisabled()) return;
    const previousIndex: number = this.findFirstSelectedIndex(
      this.target(),
      this.targetSelection()
    );
    const result: unknown[] = this.performMoveTop(this.target(), this.targetSelection());
    this.target.set(result);
    this.reordered.emit({ list: 'target', items: result, previousIndex, currentIndex: 0 });
  }

  /** Moves selected target items to the bottom of the target list. */
  public moveTargetBottom(): void {
    if (this.isTargetMoveDownDisabled()) return;
    const previousIndex: number = this.findFirstSelectedIndex(
      this.target(),
      this.targetSelection()
    );
    const result: unknown[] = this.performMoveBottom(this.target(), this.targetSelection());
    this.target.set(result);
    this.reordered.emit({
      list: 'target',
      items: result,
      previousIndex,
      currentIndex: result.length - 1,
    });
  }

  // ---------------------------------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------------------------------

  /**
   * Moves keyboard focus to `displayIndex` within the given list.
   * Updates the focused-index signal and calls `.focus()` on the DOM element.
   * SSR-safe — only accesses the DOM inside `isPlatformBrowser`.
   */
  public focusItem(list: 'source' | 'target', displayIndex: number): void {
    const items: unknown[] =
      list === 'source' ? this.displaySourceItems() : this.displayTargetItems();
    const count: number = items.length;
    if (count === 0) return;
    const clamped: number = Math.max(0, Math.min(displayIndex, count - 1));
    if (list === 'source') {
      this.sourceFocusedIndex.set(clamped);
    } else {
      this.targetFocusedIndex.set(clamped);
    }

    if (!isPlatformBrowser(this.platformId)) return;
    const listEl: HTMLElement | undefined =
      list === 'source' ? this.sourceListEl()?.nativeElement : this.targetListEl()?.nativeElement;
    if (!listEl) return;
    const element: HTMLElement | null = listEl.querySelector<HTMLElement>(
      `#${this.itemId(list, clamped)}`
    );
    element?.focus();
  }

  /** Handles `keydown` events on the source listbox. */
  public onSourceListKeydown(event: KeyboardEvent): void {
    this.handleListKeydown(event, 'source');
  }

  /** Handles `keydown` events on the target listbox. */
  public onTargetListKeydown(event: KeyboardEvent): void {
    this.handleListKeydown(event, 'target');
  }

  /** Handles focus on a source list item. */
  public onSourceItemFocus(_event: FocusEvent, displayIndex: number): void {
    this.sourceFocusedIndex.set(displayIndex);
  }

  /** Handles focus on a target list item. */
  public onTargetItemFocus(_event: FocusEvent, displayIndex: number): void {
    this.targetFocusedIndex.set(displayIndex);
  }

  // ---------------------------------------------------------------------------
  // Selection
  // ---------------------------------------------------------------------------

  /** Handles a click on a source list item. */
  public onSourceItemClick(event: MouseEvent, item: unknown, index: number): void {
    if (this.disabled()) return;
    const newSelection: unknown[] = this.computeNewSelection(
      event,
      item,
      index,
      this.sourceSelection(),
      this.displaySourceItems(),
      this.sourceLastClickedIndex
    );
    this.sourceLastClickedIndex = index;
    this.sourceSelection.set(newSelection);
    this.sourceSelectionChanged.emit({ originalEvent: event, value: newSelection });
  }

  /** Handles a click on a target list item. */
  public onTargetItemClick(event: MouseEvent, item: unknown, index: number): void {
    if (this.disabled()) return;
    const newSelection: unknown[] = this.computeNewSelection(
      event,
      item,
      index,
      this.targetSelection(),
      this.displayTargetItems(),
      this.targetLastClickedIndex
    );
    this.targetLastClickedIndex = index;
    this.targetSelection.set(newSelection);
    this.targetSelectionChanged.emit({ originalEvent: event, value: newSelection });
  }

  // ---------------------------------------------------------------------------
  // Filter
  // ---------------------------------------------------------------------------

  /** Handles input events on the source filter field. */
  public onSourceFilterInput(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.sourceFilterQuery.set(inputElement.value);
    this.sourceFiltered.emit({
      query: inputElement.value,
      filteredItems: this.displaySourceItems(),
    });
  }

  /** Handles input events on the target filter field. */
  public onTargetFilterInput(event: Event): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.targetFilterQuery.set(inputElement.value);
    this.targetFiltered.emit({
      query: inputElement.value,
      filteredItems: this.displayTargetItems(),
    });
  }

  /**
   * Returns `true` when `item` satisfies the given `query` and the configured match mode.
   * Comparison is always case-insensitive via `toLocaleLowerCase`.
   */
  public matchesFilter(item: unknown, query: string): boolean {
    const filterPath: string | null = this.filterBy();
    if (!filterPath) return true;
    const locale: string | undefined = this.filterLocale();
    const normalizedQuery: string = query.trim().toLocaleLowerCase(locale);
    if (normalizedQuery === '') return true;
    const value: string = this.resolveProperty(item, filterPath);
    switch (this.filterMatchMode()) {
      case 'startsWith':
        return value.startsWith(normalizedQuery);
      case 'endsWith':
        return value.endsWith(normalizedQuery);
      case 'equals':
        return value === normalizedQuery;
      case 'contains':
      default:
        return value.includes(normalizedQuery);
    }
  }

  /**
   * Resolves a dot-notation property path on `item` to a trimmed lowercase string.
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

  // ---------------------------------------------------------------------------
  // Drag & drop
  // ---------------------------------------------------------------------------

  /**
   * Maps a display-list index to the corresponding index in the list's full value array.
   */
  public getValueIndex(list: 'source' | 'target', displayIndex: number): number {
    const displayed: unknown[] =
      list === 'source' ? this.displaySourceItems() : this.displayTargetItems();
    const all: unknown[] = list === 'source' ? this.source() : this.target();
    return this.indexOf(displayed[displayIndex], all);
  }

  /** Handles `dragstart` on a list item. */
  public onDragStart(event: DragEvent, list: 'source' | 'target', displayIndex: number): void {
    if (!this.dragDrop() || this.disabled()) return;
    const valueIndex: number = this.getValueIndex(list, displayIndex);
    this.dragOriginList.set(list);
    this.draggedValueIndex.set(valueIndex);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      // Required for Firefox to initiate the drag
      event.dataTransfer.setData('text/plain', `${list}:${valueIndex}`);
    }
    const items: unknown[] = list === 'source' ? this.source() : this.target();
    const label: string = this.resolveItemLabel(items[valueIndex]);
    void this.liveAnnouncer.announce(
      `Grabbed ${label}. Position ${valueIndex + 1} of ${items.length}.`
    );
  }

  /** Handles `dragover` on a list item. */
  public onDragOver(event: DragEvent, list: 'source' | 'target', displayIndex: number): void {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';

    if (!isPlatformBrowser(this.platformId)) return;
    const target: HTMLElement = event.currentTarget as HTMLElement;
    const rect: DOMRect = target.getBoundingClientRect();
    const position: 'before' | 'after' =
      event.clientY < rect.top + rect.height / 2 ? 'before' : 'after';

    this.dragOverList.set(list);
    this.dragOverIndex.set(displayIndex);
    this.dragPosition.set(position);
  }

  /** Handles `dragleave` on the list `<ul>` element. */
  public onListDragLeave(event: DragEvent, list: 'source' | 'target'): void {
    const target: HTMLElement = event.currentTarget as HTMLElement;
    const related: Node | null = event.relatedTarget as Node | null;
    if (!target.contains(related) && this.dragOverList() === list) {
      this.dragOverList.set(null);
      this.dragOverIndex.set(null);
      this.dragPosition.set(null);
    }
  }

  /** Handles `drop` on a list item. */
  public onDrop(event: DragEvent, dropList: 'source' | 'target', dropDisplayIndex: number): void {
    event.preventDefault();
    const originList: 'source' | 'target' | null = this.dragOriginList();
    const originValueIndex: number | null = this.draggedValueIndex();

    if (originList === null || originValueIndex === null) {
      this.clearDragState();
      return;
    }

    if (originList === dropList) {
      this.performIntraListDrop(originList, originValueIndex, dropDisplayIndex);
    } else {
      this.performInterListDrop(originList, originValueIndex, dropList, dropDisplayIndex);
    }

    this.clearDragState();
  }

  /** Handles `dragend` on a dragged item. */
  public onDragEnd(_event: DragEvent): void {
    this.clearDragState();
  }

  // ---------------------------------------------------------------------------
  // Private: keyboard handler
  // ---------------------------------------------------------------------------

  private handleListKeydown(event: KeyboardEvent, list: 'source' | 'target'): void {
    if (this.disabled()) return;

    const isAlt: boolean = event.altKey;
    const isCtrl: boolean = event.ctrlKey || event.metaKey;
    const key: string = event.key;
    const items: unknown[] =
      list === 'source' ? this.displaySourceItems() : this.displayTargetItems();
    const count: number = items.length;
    const current: number =
      list === 'source' ? this.sourceFocusedIndex() : this.targetFocusedIndex();

    const selection: ModelSignal<unknown[]> =
      list === 'source' ? this.sourceSelection : this.targetSelection;
    const selectionChangedEmitter: OutputEmitterRef<PickListSelectionChangeEvent> =
      list === 'source' ? this.sourceSelectionChanged : this.targetSelectionChanged;

    switch (key) {
      case KEYBOARD_KEYS.ArrowDown: {
        event.preventDefault();
        if (isAlt || isCtrl) {
          if (list === 'source') {
            this.moveSourceDown();
          } else {
            this.moveTargetDown();
          }
        } else if (count > 0) {
          this.focusItem(list, current < count - 1 ? current + 1 : 0);
        }
        break;
      }

      case KEYBOARD_KEYS.ArrowUp: {
        event.preventDefault();
        if (isAlt || isCtrl) {
          if (list === 'source') {
            this.moveSourceUp();
          } else {
            this.moveTargetUp();
          }
        } else if (count > 0) {
          this.focusItem(list, current > 0 ? current - 1 : count - 1);
        }
        break;
      }

      case KEYBOARD_KEYS.Home: {
        event.preventDefault();
        if ((isAlt || isCtrl) && list === 'source') {
          this.moveSourceTop();
          this.focusItem('source', 0);
        } else if ((isAlt || isCtrl) && list === 'target') {
          this.moveTargetTop();
          this.focusItem('target', 0);
        } else if (count > 0) {
          this.focusItem(list, 0);
        }
        break;
      }

      case KEYBOARD_KEYS.End: {
        event.preventDefault();
        if ((isAlt || isCtrl) && list === 'source') {
          this.moveSourceBottom();
          this.focusItem('source', count - 1);
        } else if ((isAlt || isCtrl) && list === 'target') {
          this.moveTargetBottom();
          this.focusItem('target', count - 1);
        } else if (count > 0) {
          this.focusItem(list, count - 1);
        }
        break;
      }

      case KEYBOARD_KEYS.ArrowRight: {
        if (isCtrl && list === 'source') {
          event.preventDefault();
          this.moveToTarget();
        }
        break;
      }

      case KEYBOARD_KEYS.ArrowLeft: {
        if (isCtrl && list === 'target') {
          event.preventDefault();
          this.moveToSource();
        }
        break;
      }

      case KEYBOARD_KEYS.Space:
      case KEYBOARD_KEYS.Enter: {
        event.preventDefault();
        if (count > 0 && current >= 0 && current < count) {
          const item: unknown = items[current];
          const syntheticEvent: MouseEvent = new MouseEvent('click', {
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            shiftKey: event.shiftKey,
          });
          if (list === 'source') {
            this.onSourceItemClick(syntheticEvent, item, current);
          } else {
            this.onTargetItemClick(syntheticEvent, item, current);
          }
        }
        break;
      }

      default: {
        if ((event.ctrlKey || event.metaKey) && key === 'a' && count > 0) {
          event.preventDefault();
          const newSelection: unknown[] = [...items];
          selection.set(newSelection);
          selectionChangedEmitter.emit({ originalEvent: event, value: newSelection });
        } else if (key === KEYBOARD_KEYS.Escape) {
          selection.set([]);
          selectionChangedEmitter.emit({ originalEvent: event, value: [] });
        }
        break;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Private: selection helpers
  // ---------------------------------------------------------------------------

  private computeNewSelection(
    event: MouseEvent,
    item: unknown,
    index: number,
    currentSelection: unknown[],
    displayItems: unknown[],
    lastClickedIndex: number
  ): unknown[] {
    if (this.metaKeySelection()) {
      const isMetaHeld: boolean = event.ctrlKey || event.metaKey;
      const isShiftHeld: boolean = event.shiftKey;
      if (isShiftHeld && lastClickedIndex !== -1) {
        return this.buildRangeSelection(lastClickedIndex, index, currentSelection, displayItems);
      }
      if (isMetaHeld) {
        return this.toggleItemInSelection(item, currentSelection);
      }
      return [item];
    }
    return this.toggleItemInSelection(item, currentSelection);
  }

  private buildRangeSelection(
    fromIndex: number,
    toIndex: number,
    existingSelection: unknown[],
    items: unknown[]
  ): unknown[] {
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

  private toggleItemInSelection(item: unknown, currentSelection: unknown[]): unknown[] {
    const key: string | null = this.trackBy();
    const exists: boolean = key
      ? currentSelection.some(
          (selected: unknown): boolean =>
            this.resolveKey(selected, key) === this.resolveKey(item, key)
        )
      : currentSelection.includes(item);
    if (exists) {
      return key
        ? currentSelection.filter(
            (selected: unknown): boolean =>
              this.resolveKey(selected, key) !== this.resolveKey(item, key)
          )
        : currentSelection.filter((selected: unknown): boolean => selected !== item);
    }
    return [...currentSelection, item];
  }

  private isInSelection(item: unknown, selection: unknown[]): boolean {
    const key: string | null = this.trackBy();
    return selection.some((selectedItem: unknown): boolean =>
      key
        ? this.resolveKey(selectedItem, key) === this.resolveKey(item, key)
        : selectedItem === item
    );
  }

  // ---------------------------------------------------------------------------
  // Private: reorder helpers
  // ---------------------------------------------------------------------------

  private performMoveUp(items: unknown[], selection: unknown[]): unknown[] {
    const result: unknown[] = [...items];
    const selectionSet: Set<number> = this.buildSelectionSet(selection, result);
    for (let index: number = 0; index < result.length; index++) {
      if (selectionSet.has(index) && index !== 0 && !selectionSet.has(index - 1)) {
        const temp: unknown = result[index - 1];
        result[index - 1] = result[index];
        result[index] = temp;
      }
    }
    return result;
  }

  private performMoveDown(items: unknown[], selection: unknown[]): unknown[] {
    const result: unknown[] = [...items];
    const selectionSet: Set<number> = this.buildSelectionSet(selection, result);
    for (let index: number = result.length - 1; index >= 0; index--) {
      if (selectionSet.has(index) && index !== result.length - 1 && !selectionSet.has(index + 1)) {
        const temp: unknown = result[index + 1];
        result[index + 1] = result[index];
        result[index] = temp;
      }
    }
    return result;
  }

  private performMoveTop(items: unknown[], selection: unknown[]): unknown[] {
    const selectionSet: Set<number> = this.buildSelectionSet(selection, items);
    const selectedItems: unknown[] = items.filter((_item: unknown, index: number): boolean =>
      selectionSet.has(index)
    );
    const remaining: unknown[] = items.filter(
      (_item: unknown, index: number): boolean => !selectionSet.has(index)
    );
    return [...selectedItems, ...remaining];
  }

  private performMoveBottom(items: unknown[], selection: unknown[]): unknown[] {
    const selectionSet: Set<number> = this.buildSelectionSet(selection, items);
    const selectedItems: unknown[] = items.filter((_item: unknown, index: number): boolean =>
      selectionSet.has(index)
    );
    const remaining: unknown[] = items.filter(
      (_item: unknown, index: number): boolean => !selectionSet.has(index)
    );
    return [...remaining, ...selectedItems];
  }

  private findFirstSelectedIndex(items: unknown[], selection: unknown[]): number {
    const selectionSet: Set<number> = this.buildSelectionSet(selection, items);
    for (let index: number = 0; index < items.length; index++) {
      if (selectionSet.has(index)) return index;
    }
    return 0;
  }

  private buildSelectionSet(selection: unknown[], items: unknown[]): Set<number> {
    const set: Set<number> = new Set<number>();
    for (const selectedItem of selection) {
      const index: number = this.indexOf(selectedItem, items);
      if (index !== -1) set.add(index);
    }
    return set;
  }

  // ---------------------------------------------------------------------------
  // Private: drag-drop helpers
  // ---------------------------------------------------------------------------

  private performIntraListDrop(
    list: 'source' | 'target',
    sourceValueIndex: number,
    dropDisplayIndex: number
  ): void {
    const listModel: ModelSignal<unknown[]> = list === 'source' ? this.source : this.target;
    const targetValueIndex: number = this.getValueIndex(list, dropDisplayIndex);
    const position: 'before' | 'after' | null = this.dragPosition();
    let effectiveTargetIndex: number =
      position === 'after' ? targetValueIndex + 1 : targetValueIndex;
    if (sourceValueIndex < effectiveTargetIndex) {
      effectiveTargetIndex -= 1;
    }
    if (sourceValueIndex === effectiveTargetIndex) return;

    const items: unknown[] = [...listModel()];
    const [moved] = items.splice(sourceValueIndex, 1);
    items.splice(effectiveTargetIndex, 0, moved);
    listModel.set(items);

    this.reordered.emit({
      list,
      items,
      previousIndex: sourceValueIndex,
      currentIndex: effectiveTargetIndex,
    });

    const label: string = this.resolveItemLabel(moved);
    void this.liveAnnouncer.announce(
      `Moved ${label} to position ${effectiveTargetIndex + 1} of ${items.length}.`
    );
  }

  private performInterListDrop(
    originList: 'source' | 'target',
    originValueIndex: number,
    dropList: 'source' | 'target',
    dropDisplayIndex: number
  ): void {
    const originModel: ModelSignal<unknown[]> = originList === 'source' ? this.source : this.target;
    const dropModel: ModelSignal<unknown[]> = dropList === 'source' ? this.source : this.target;

    const originItems: unknown[] = [...originModel()];
    const [moved] = originItems.splice(originValueIndex, 1);

    const dropItems: unknown[] = [...dropModel()];
    const dropDisplayItems: unknown[] =
      dropList === 'source' ? this.displaySourceItems() : this.displayTargetItems();
    const targetValueIndex: number = this.indexOf(dropDisplayItems[dropDisplayIndex], dropModel());
    const position: 'before' | 'after' | null = this.dragPosition();
    const insertIndex: number =
      targetValueIndex === -1
        ? dropItems.length
        : position === 'after'
          ? targetValueIndex + 1
          : targetValueIndex;

    dropItems.splice(insertIndex, 0, moved);
    originModel.set(originItems);
    dropModel.set(dropItems);

    // Remove transferred item from the origin list's selection
    const originSelection: ModelSignal<unknown[]> =
      originList === 'source' ? this.sourceSelection : this.targetSelection;
    originSelection.set(originSelection().filter((item: unknown): boolean => item !== moved));

    if (dropList === 'target') {
      this.movedToTarget.emit({ items: [moved] });
    } else {
      this.movedToSource.emit({ items: [moved] });
    }

    const label: string = this.resolveItemLabel(moved);
    void this.liveAnnouncer.announce(`Moved ${label} to ${dropList} list.`);
  }

  private clearDragState(): void {
    this.dragOriginList.set(null);
    this.draggedValueIndex.set(null);
    this.dragOverList.set(null);
    this.dragOverIndex.set(null);
    this.dragPosition.set(null);
  }

  // ---------------------------------------------------------------------------
  // Private: common helpers
  // ---------------------------------------------------------------------------

  private resolveKey(item: unknown, key: string): unknown {
    return key.split('.').reduce((current: unknown, segment: string): unknown => {
      if (current !== null && current !== undefined && typeof current === 'object') {
        return (current as Record<string, unknown>)[segment];
      }
      return undefined;
    }, item);
  }

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
}
