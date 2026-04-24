import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type {
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { TreeTableColumnComponent } from './tree-table-column.component';
import { TREE_TABLE_DEFAULTS } from './tree-table.constants';
import type {
  TreeTableFlatNode,
  TreeTableNode,
  TreeTableNodeCollapseEvent,
  TreeTableNodeExpandEvent,
  TreeTableNodeSelectEvent,
  TreeTableSelectionMode,
  TreeTableSize,
  TreeTableSortEvent,
  TreeTableSortOrder,
  TreeTableVariant,
} from './tree-table.types';

/**
 * TreeTable renders hierarchical data as an expandable table.
 * Each `TreeTableNode` maps to a row; its `data` object provides column values.
 * Columns are declared with `<ui-lib-tree-table-column>` child components.
 *
 * @example
 * ```html
 * <ui-lib-tree-table [value]="nodes" selectionMode="checkbox" [(selection)]="selected">
 *   <ui-lib-tree-table-column field="name"  header="Name"  [expander]="true" [sortable]="true" />
 *   <ui-lib-tree-table-column field="size"  header="Size"  [sortable]="true" />
 *   <ui-lib-tree-table-column field="type"  header="Type" />
 * </ui-lib-tree-table>
 * ```
 */
@Component({
  selector: 'ui-lib-tree-table',
  standalone: true,
  imports: [NgTemplateOutlet, TreeTableColumnComponent],
  templateUrl: './tree-table.component.html',
  styleUrl: './tree-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-tree-table',
    '[class]': 'hostClasses()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class TreeTableComponent {
  // ─── DI ────────────────────────────────────────────────────────────────────

  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  // ─── Reactive tick ─────────────────────────────────────────────────────────

  /** Incremented on any tree mutation to force flat-list recomputation. */
  private readonly tick: WritableSignal<number> = signal(0);

  // ─── Inputs ────────────────────────────────────────────────────────────────

  /** Root-level nodes to display. */
  public readonly value: InputSignal<TreeTableNode[]> = input<TreeTableNode[]>([]);

  /** Design variant. Falls back to `ThemeConfigService.variant()` when `null`. */
  public readonly variant: InputSignal<TreeTableVariant | null> = input<TreeTableVariant | null>(
    null
  );

  /** Row height / density. */
  public readonly size: InputSignal<TreeTableSize> = input<TreeTableSize>(
    TREE_TABLE_DEFAULTS.SIZE as TreeTableSize
  );

  /** How rows respond to click interactions. */
  public readonly selectionMode: InputSignal<TreeTableSelectionMode> =
    input<TreeTableSelectionMode>(null);

  /**
   * Field currently used for sorting.
   * Use `[(sortField)]` for two-way binding.
   */
  public readonly sortField: ModelSignal<string | null> = model<string | null>(null);

  /**
   * Current sort direction.
   * Use `[(sortOrder)]` for two-way binding.
   */
  public readonly sortOrder: ModelSignal<TreeTableSortOrder> = model<TreeTableSortOrder>(
    TREE_TABLE_DEFAULTS.SORT_ORDER as TreeTableSortOrder
  );

  /** When `true`, renders a global filter input above the table. */
  public readonly globalFilter: InputSignal<boolean> = input<boolean>(false);

  /** Placeholder for the global filter input. */
  public readonly globalFilterPlaceholder: InputSignal<string> = input<string>('Search...');

  /**
   * When `true`, the table body is scrollable and `scrollHeight` constrains it.
   */
  public readonly scrollable: InputSignal<boolean> = input<boolean>(false);

  /**
   * CSS height value for the scrollable body, e.g. `'400px'` or `'60vh'`.
   * Only applied when `scrollable` is `true`.
   */
  public readonly scrollHeight: InputSignal<string | null> = input<string | null>(null);

  /** Caption text rendered above the table. */
  public readonly caption: InputSignal<string> = input<string>('');

  /** Extra CSS class applied to the host element. */
  public readonly styleClass: InputSignal<string> = input<string>('');

  // ─── Two-way binding ───────────────────────────────────────────────────────

  /** Currently selected node(s). Use `[(selection)]` for two-way binding. */
  public readonly selection: ModelSignal<TreeTableNode | TreeTableNode[] | null> = model<
    TreeTableNode | TreeTableNode[] | null
  >(null);

  // ─── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a node row is expanded. */
  public readonly nodeExpand: OutputEmitterRef<TreeTableNodeExpandEvent> =
    output<TreeTableNodeExpandEvent>();

  /** Emitted when a node row is collapsed. */
  public readonly nodeCollapse: OutputEmitterRef<TreeTableNodeCollapseEvent> =
    output<TreeTableNodeCollapseEvent>();

  /** Emitted when a node is selected. */
  public readonly nodeSelect: OutputEmitterRef<TreeTableNodeSelectEvent> =
    output<TreeTableNodeSelectEvent>();

  /** Emitted when a node is unselected. */
  public readonly nodeUnselect: OutputEmitterRef<TreeTableNodeSelectEvent> =
    output<TreeTableNodeSelectEvent>();

  /** Emitted when the sort column or direction changes. */
  public readonly sortChange: OutputEmitterRef<TreeTableSortEvent> = output<TreeTableSortEvent>();

  // ─── Content children ──────────────────────────────────────────────────────

  /** Column definition components declared inside the tree-table. */
  public readonly columns: Signal<ReadonlyArray<TreeTableColumnComponent>> =
    contentChildren(TreeTableColumnComponent);

  // ─── Internal state ────────────────────────────────────────────────────────

  /** Text currently entered in the global filter input. */
  public readonly globalFilterText: WritableSignal<string> = signal('');

  // ─── Derived signals ───────────────────────────────────────────────────────

  private readonly resolvedVariant: Signal<TreeTableVariant> = computed<TreeTableVariant>(
    (): TreeTableVariant => (this.variant() ?? this.themeConfig.variant()) as TreeTableVariant
  );

  /** Host class string applied via `[class]` binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string =>
    [
      `ui-lib-tree-table--variant-${this.resolvedVariant()}`,
      `ui-lib-tree-table--size-${this.size()}`,
      this.scrollable() ? 'ui-lib-tree-table--scrollable' : '',
      this.styleClass(),
    ]
      .filter(Boolean)
      .join(' ')
  );

  /**
   * Index of the column that renders the expand toggle and depth indentation.
   * Defaults to `0` when no column has `expander="true"`.
   */
  public readonly expanderColumnIndex: Signal<number> = computed<number>((): number => {
    const columns: ReadonlyArray<TreeTableColumnComponent> = this.columns();
    const explicit: number = columns.findIndex((column: TreeTableColumnComponent): boolean =>
      column.expander()
    );
    return explicit >= 0 ? explicit : 0;
  });

  /** Whether any column has a non-empty footer. */
  public readonly hasFooter: Signal<boolean> = computed<boolean>((): boolean =>
    this.columns().some(
      (column: TreeTableColumnComponent): boolean =>
        Boolean(column.footer()) || column.footerTemplate() !== undefined
    )
  );

  /**
   * Flat, ordered list of visible nodes to render as `<tr>` rows.
   * Re-evaluated whenever the data, sort, filter, or expansion state changes.
   */
  public readonly flatVisibleNodes: Signal<TreeTableFlatNode[]> = computed<TreeTableFlatNode[]>(
    (): TreeTableFlatNode[] => {
      // Establish reactive dependency on tick so toggling expansion forces a recompute.
      this.tick();
      const result: TreeTableFlatNode[] = [];
      this.buildFlatList(this.value(), 0, result);
      return result;
    }
  );

  // ─── Public helpers used in template ──────────────────────────────────────

  /** Returns `true` when the node has expandable children. */
  public hasChildren(node: TreeTableNode): boolean {
    return !node.leaf && Boolean(node.children?.length);
  }

  /** Returns `true` when the node's subtree should be visible. */
  public isExpanded(node: TreeTableNode): boolean {
    return node.expanded !== false;
  }

  /** Resolves the display value for a cell given a node and field path. */
  public getCellValue(node: TreeTableNode, field: string): string {
    if (!field) {
      return '';
    }
    const data: Record<string, unknown> = node.data ?? {};
    const parts: string[] = field.split('.');
    let current: unknown = data;
    for (const part of parts) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return '';
      }
      current = (current as Record<string, unknown>)[part];
    }
    return current === null || current === undefined ? '' : String(current);
  }

  /** Returns `true` when the node is part of the current selection. */
  public isSelected(node: TreeTableNode): boolean {
    const mode: TreeTableSelectionMode = this.selectionMode();
    const currentSelection: TreeTableNode | TreeTableNode[] | null = this.selection();
    if (!mode || !currentSelection) {
      return false;
    }
    if (mode === 'single') {
      return (currentSelection as TreeTableNode).key === node.key;
    }
    return (currentSelection as TreeTableNode[]).some(
      (selected: TreeTableNode): boolean => selected.key === node.key
    );
  }

  /** Returns `true` when the node is partially selected (checkbox mode only). */
  public isPartiallySelected(node: TreeTableNode): boolean {
    this.tick();
    return node.partialSelected === true;
  }

  /**
   * Returns the sort icon class for a column header.
   * `'pi pi-sort'` — unsorted, `'pi pi-sort-up'` — asc, `'pi pi-sort-down'` — desc.
   */
  public getSortIconClass(field: string): string {
    if (this.sortField() !== field) {
      return 'pi pi-sort';
    }
    return this.sortOrder() === 1 ? 'pi pi-sort-up' : 'pi pi-sort-down';
  }

  // ─── Event handlers ────────────────────────────────────────────────────────

  /** Handles expand/collapse toggle button click. */
  public handleToggle(event: Event, node: TreeTableNode): void {
    event.stopPropagation();
    node.expanded = !node.expanded;
    if (node.expanded) {
      this.nodeExpand.emit({ originalEvent: event, node });
    } else {
      this.nodeCollapse.emit({ originalEvent: event, node });
    }
    this.tick.update((count: number): number => count + 1);
    this.cdr.markForCheck();
  }

  /** Handles a click on a row for single or multiple selection modes. */
  public handleRowClick(event: Event, node: TreeTableNode): void {
    const mode: TreeTableSelectionMode = this.selectionMode();
    if (!mode || mode === 'checkbox' || node.selectable === false) {
      return;
    }
    if (mode === 'single') {
      this.handleSingleSelection(event, node);
    } else {
      this.handleMultipleSelection(event, node);
    }
    this.tick.update((count: number): number => count + 1);
  }

  /** Handles checkbox toggle in `checkbox` selection mode. */
  public handleCheckboxToggle(event: Event, node: TreeTableNode): void {
    event.stopPropagation();
    const currentKeys: Set<string> = new Set<string>(
      (Array.isArray(this.selection()) ? (this.selection() as TreeTableNode[]) : []).map(
        (selected: TreeTableNode): string => selected.key
      )
    );

    const descendantKeys: string[] = this.getDescendantKeys(node);
    const wasSelected: boolean = currentKeys.has(node.key);

    if (wasSelected) {
      currentKeys.delete(node.key);
      for (const key of descendantKeys) {
        currentKeys.delete(key);
      }
    } else {
      currentKeys.add(node.key);
      for (const key of descendantKeys) {
        currentKeys.add(key);
      }
    }

    const allNodes: TreeTableNode[] = this.flattenNodes(this.value());
    const nodeMap: Map<string, TreeTableNode> = new Map<string, TreeTableNode>(
      allNodes.map((flatNode: TreeTableNode): [string, TreeTableNode] => [flatNode.key, flatNode])
    );
    const newSelection: TreeTableNode[] = Array.from(currentKeys)
      .map((key: string): TreeTableNode | undefined => nodeMap.get(key))
      .filter(
        (treeNode: TreeTableNode | undefined): treeNode is TreeTableNode => treeNode !== undefined
      );

    this.selection.set(newSelection);
    this.updatePartialStates(this.value(), currentKeys);
    this.tick.update((count: number): number => count + 1);
    this.cdr.markForCheck();

    if (!wasSelected) {
      this.nodeSelect.emit({ originalEvent: event, node });
    } else {
      this.nodeUnselect.emit({ originalEvent: event, node });
    }
  }

  /** Handles "select all" header checkbox in checkbox selection mode. */
  public handleSelectAll(event: Event): void {
    event.stopPropagation();
    const allNodes: TreeTableNode[] = this.flattenNodes(this.value());
    const allSelected: boolean = allNodes.every((treeNode: TreeTableNode): boolean =>
      this.isSelected(treeNode)
    );

    if (allSelected) {
      this.selection.set([]);
      this.updatePartialStates(this.value(), new Set<string>());
    } else {
      const allKeys: Set<string> = new Set<string>(
        allNodes.map((treeNode: TreeTableNode): string => treeNode.key)
      );
      this.selection.set(allNodes);
      this.updatePartialStates(this.value(), allKeys);
    }
    this.tick.update((count: number): number => count + 1);
    this.cdr.markForCheck();
  }

  /** Returns `true` when all visible nodes are selected (used for header checkbox state). */
  public isAllSelected(): boolean {
    const all: TreeTableNode[] = this.flattenNodes(this.value());
    return (
      all.length > 0 && all.every((treeNode: TreeTableNode): boolean => this.isSelected(treeNode))
    );
  }

  /** Returns `true` when some but not all nodes are selected. */
  public isSomeSelected(): boolean {
    const all: TreeTableNode[] = this.flattenNodes(this.value());
    const selectedCount: number = all.filter((treeNode: TreeTableNode): boolean =>
      this.isSelected(treeNode)
    ).length;
    return selectedCount > 0 && selectedCount < all.length;
  }

  /** Cycles sort state when a sortable column header is clicked. */
  public handleSort(field: string): void {
    if (this.sortField() !== field) {
      this.sortField.set(field);
      this.sortOrder.set(1);
    } else if (this.sortOrder() === 1) {
      this.sortOrder.set(-1);
    } else if (this.sortOrder() === -1) {
      this.sortField.set(null);
      this.sortOrder.set(0);
    } else {
      this.sortField.set(field);
      this.sortOrder.set(1);
    }
    this.sortChange.emit({ field, order: this.sortOrder() });
  }

  /** Updates the global filter text. */
  public onGlobalFilterInput(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.globalFilterText.set(input.value);
  }

  /** WAI-ARIA keyboard navigation on the host element. */
  public onKeydown(event: KeyboardEvent): void {
    const key: string = event.key;
    const rows: HTMLElement[] = Array.from(
      document.querySelectorAll<HTMLElement>('.ui-lib-tree-table tr[role="row"][tabindex="0"]')
    );
    const focusedIndex: number = rows.findIndex(
      (row: HTMLElement): boolean => row === document.activeElement
    );

    if (key === KEYBOARD_KEYS.ArrowDown) {
      event.preventDefault();
      this.focusRowAtIndex(rows, focusedIndex + 1);
    } else if (key === KEYBOARD_KEYS.ArrowUp) {
      event.preventDefault();
      this.focusRowAtIndex(rows, focusedIndex - 1);
    } else if (key === KEYBOARD_KEYS.Home) {
      event.preventDefault();
      this.focusRowAtIndex(rows, 0);
    } else if (key === KEYBOARD_KEYS.End) {
      event.preventDefault();
      this.focusRowAtIndex(rows, rows.length - 1);
    }
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  /**
   * Recursively builds the flat visible node list, applying global filter
   * and respecting expansion state. Sorts siblings when a sort is active.
   */
  private buildFlatList(nodes: TreeTableNode[], depth: number, result: TreeTableFlatNode[]): void {
    const filterText: string = this.globalFilterText().trim().toLowerCase();
    const sorted: TreeTableNode[] = this.applySortToNodes(nodes);

    for (const node of sorted) {
      if (filterText && !this.nodeOrDescendantMatchesFilter(node, filterText)) {
        continue;
      }
      result.push({ node, depth });
      if (!node.leaf && node.children?.length && this.isExpanded(node)) {
        this.buildFlatList(node.children, depth + 1, result);
      }
    }
  }

  /** Returns a sorted copy of nodes based on current `sortField` + `sortOrder`. */
  private applySortToNodes(nodes: TreeTableNode[]): TreeTableNode[] {
    const field: string | null = this.sortField();
    const order: TreeTableSortOrder = this.sortOrder();
    if (!field || order === 0) {
      return nodes;
    }
    return [...nodes].sort((nodeA: TreeTableNode, nodeB: TreeTableNode): number => {
      const valueA: string = this.getCellValue(nodeA, field);
      const valueB: string = this.getCellValue(nodeB, field);
      const comparison: number = valueA.localeCompare(valueB, undefined, { numeric: true });
      return order === -1 ? -comparison : comparison;
    });
  }

  /**
   * Returns `true` when the node's own data OR any descendant data
   * contains `filterText` in any field value.
   */
  private nodeOrDescendantMatchesFilter(node: TreeTableNode, filterText: string): boolean {
    if (this.nodeMatchesFilter(node, filterText)) {
      return true;
    }
    return (node.children ?? []).some((child: TreeTableNode): boolean =>
      this.nodeOrDescendantMatchesFilter(child, filterText)
    );
  }

  /** Returns `true` when any field in `node.data` contains `filterText`. */
  private nodeMatchesFilter(node: TreeTableNode, filterText: string): boolean {
    const data: Record<string, unknown> = node.data ?? {};
    return Object.values(data).some((value: unknown): boolean =>
      String(value ?? '')
        .toLowerCase()
        .includes(filterText)
    );
  }

  private handleSingleSelection(event: Event, node: TreeTableNode): void {
    const currentSelection: TreeTableNode | TreeTableNode[] | null = this.selection();
    const isAlreadySelected: boolean =
      Boolean(currentSelection) && (currentSelection as TreeTableNode).key === node.key;

    if (isAlreadySelected) {
      this.selection.set(null);
      this.nodeUnselect.emit({ originalEvent: event, node });
    } else {
      this.selection.set(node);
      this.nodeSelect.emit({ originalEvent: event, node });
    }
  }

  private handleMultipleSelection(event: Event, node: TreeTableNode): void {
    const currentSelection: TreeTableNode[] = Array.isArray(this.selection())
      ? (this.selection() as TreeTableNode[])
      : [];
    const existingIndex: number = currentSelection.findIndex(
      (selected: TreeTableNode): boolean => selected.key === node.key
    );

    if (existingIndex >= 0) {
      this.selection.set(
        currentSelection.filter((selected: TreeTableNode): boolean => selected.key !== node.key)
      );
      this.nodeUnselect.emit({ originalEvent: event, node });
    } else {
      this.selection.set([...currentSelection, node]);
      this.nodeSelect.emit({ originalEvent: event, node });
    }
  }

  /** Returns all descendant keys of a node (excluding the node itself). */
  private getDescendantKeys(node: TreeTableNode): string[] {
    const keys: string[] = [];
    const visit: (treeNode: TreeTableNode) => void = (treeNode: TreeTableNode): void => {
      for (const child of treeNode.children ?? []) {
        keys.push(child.key);
        visit(child);
      }
    };
    visit(node);
    return keys;
  }

  /** Returns a flat array of ALL nodes in the entire tree. */
  private flattenNodes(nodes: TreeTableNode[]): TreeTableNode[] {
    const result: TreeTableNode[] = [];
    const visit: (treeNode: TreeTableNode) => void = (treeNode: TreeTableNode): void => {
      result.push(treeNode);
      for (const child of treeNode.children ?? []) {
        visit(child);
      }
    };
    for (const node of nodes) {
      visit(node);
    }
    return result;
  }

  /** Recomputes `partialSelected` on every branch node. */
  private updatePartialStates(nodes: TreeTableNode[], selectedKeys: Set<string>): void {
    for (const node of nodes) {
      if (node.children?.length) {
        this.updatePartialStates(node.children, selectedKeys);
        const descendantKeys: string[] = this.getDescendantKeys(node);
        const checkedCount: number = descendantKeys.filter((key: string): boolean =>
          selectedKeys.has(key)
        ).length;
        node.partialSelected = checkedCount > 0 && checkedCount < descendantKeys.length;
      }
    }
  }

  private focusRowAtIndex(rows: HTMLElement[], index: number): void {
    const clampedIndex: number = Math.max(0, Math.min(index, rows.length - 1));
    rows[clampedIndex]?.focus();
  }
}
