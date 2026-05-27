import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
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
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { TREE_CONTEXT } from './tree-context';
import type { TreeContext } from './tree-context';
import { TreeNodeTemplateDirective } from './tree-template-directives';
import { TreeNodeComponent } from './tree-node';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import type {
  TreeFilterMode,
  TreeNode,
  TreeNodeCollapseEvent,
  TreeNodeExpandEvent,
  TreeNodeSelectEvent,
  TreeSelectionMode,
  TreeSize,
  TreeVariant,
} from './tree.types';

/** Module-level counter for generating unique tree instance IDs. */
let nextTreeId: number = 0;

/**
 * Tree renders a hierarchical data structure with expand/collapse, three
 * selection modes (single, multiple, checkbox), optional filtering, and
 * full three-variant theming.
 *
 * @example
 * ```html
 * <ui-lib-tree [value]="nodes" selectionMode="single" [(selection)]="selected">
 *   <ng-template uiTreeNode let-node>
 *     <strong>{{ node.label }}</strong>
 *   </ng-template>
 * </ui-lib-tree>
 * ```
 */
@Component({
  selector: 'ui-lib-tree',
  standalone: true,
  imports: [TreeNodeComponent],
  templateUrl: './tree.html',
  styleUrl: './tree.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-tree',
    '[class]': 'hostClasses()',
    role: 'tree',
    '[attr.id]': 'hostElementId()',
    '[attr.aria-label]': 'hostAriaLabel()',
    '[attr.aria-multiselectable]': 'hostAriaMultiselectable()',
    '(keydown)': 'onKeydown($event)',
  },
  providers: [
    {
      provide: TREE_CONTEXT,
      useExisting: Tree,
    },
  ],
})
export class Tree implements TreeContext {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  /** Unique instance ID for this tree (aria-label binding, potential future aria-owns). */
  public readonly instanceId: string = `ui-lib-tree-${++nextTreeId}`;

  /** Reactive tick. Incremented after any tree mutation to force re-render. */
  private readonly tick: WritableSignal<number> = signal(0);

  /** Currently focused node key for roving-tabindex support. */
  private readonly focusedNodeKey: WritableSignal<string | null> = signal<string | null>(null);

  // ─── Inputs ────────────────────────────────────────────────────────────────

  /** Root-level nodes of the tree. */
  public readonly value: InputSignal<TreeNode[]> = input<TreeNode[]>([]);

  /** How nodes respond to click/checkbox interactions. */
  public readonly selectionMode: InputSignal<TreeSelectionMode> = input<TreeSelectionMode>(null);

  /** Design variant. Falls back to ThemeConfigService when `null`. */
  public readonly variant: InputSignal<TreeVariant | null> = input<TreeVariant | null>(null);

  /** Size of node rows. */
  public readonly size: InputSignal<TreeSize> = input<TreeSize>('md');

  /** When `true`, a filter input is rendered above the tree. */
  public readonly filter: InputSignal<boolean> = input<boolean>(false);

  /** Property on TreeNode to search when filtering. Default `'label'`. */
  public readonly filterBy: InputSignal<string> = input<string>('label');

  /**
   * Filter matching strategy.
   * `'lenient'` (default): a node is visible if it or any descendant matches.
   * `'strict'`: only exact-match nodes are visible.
   */
  public readonly filterMode: InputSignal<TreeFilterMode> = input<TreeFilterMode>('lenient');

  /** Placeholder text for the filter input. */
  public readonly filterPlaceholder: InputSignal<string> = input<string>('Search...');

  /** Extra CSS class applied to the host element. */
  public readonly styleClass: InputSignal<string> = input<string>('');

  /** Accessible label for the tree widget. Used as `aria-label` on the host. */
  public readonly ariaLabel: InputSignal<string> = input<string>('');

  /** Optional explicit host id. Falls back to the generated instance id. */
  public readonly hostId: InputSignal<string | null> = input<string | null>(null);

  // ─── Two-way binding ───────────────────────────────────────────────────────

  /** Currently selected node(s). Use `[(selection)]` for two-way binding. */
  public readonly selection: ModelSignal<TreeNode | TreeNode[] | null> = model<
    TreeNode | TreeNode[] | null
  >(null);

  // ─── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a node is selected. */
  public readonly nodeSelect: OutputEmitterRef<TreeNodeSelectEvent> = output<TreeNodeSelectEvent>();

  /** Emitted when a node is unselected. */
  public readonly nodeUnselect: OutputEmitterRef<TreeNodeSelectEvent> =
    output<TreeNodeSelectEvent>();

  /** Emitted when a node's subtree is expanded. */
  public readonly nodeExpand: OutputEmitterRef<TreeNodeExpandEvent> = output<TreeNodeExpandEvent>();

  /** Emitted when a node's subtree is collapsed. */
  public readonly nodeCollapse: OutputEmitterRef<TreeNodeCollapseEvent> =
    output<TreeNodeCollapseEvent>();

  // ─── Content children ──────────────────────────────────────────────────────

  private readonly nodeTemplateDirectives: Signal<ReadonlyArray<TreeNodeTemplateDirective>> =
    contentChildren(TreeNodeTemplateDirective);

  // ─── Internal state ────────────────────────────────────────────────────────

  /** Text entered into the filter input. */
  public readonly filterText: WritableSignal<string> = signal('');

  // ─── Derived signals ───────────────────────────────────────────────────────

  private readonly resolvedVariant: Signal<TreeVariant> = computed<TreeVariant>(
    (): TreeVariant => (this.variant() ?? this.themeConfig.variant()) as TreeVariant,
  );

  /** Host class string applied via `[class]` binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string =>
    [
      `ui-lib-tree--variant-${this.resolvedVariant()}`,
      `ui-lib-tree--size-${this.size()}`,
      this.styleClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  /** `aria-label` value for the host — `null` when the input is empty. */
  public readonly hostAriaLabel: Signal<string | null> = computed<string | null>(
    (): string | null => this.ariaLabel() || null,
  );

  /** Host `id` value — explicit `hostId` when provided, else the generated instance id. */
  public readonly hostElementId: Signal<string> = computed<string>((): string => {
    const providedHostId: string | null = this.hostId()?.trim() ?? null;
    return providedHostId || this.instanceId;
  });

  /** `aria-multiselectable` for the host — `true` in multiple/checkbox modes, otherwise `null`. */
  public readonly hostAriaMultiselectable: Signal<true | null> = computed<true | null>(
    (): true | null => {
      const mode: TreeSelectionMode = this.selectionMode();
      return mode === 'multiple' || mode === 'checkbox' ? true : null;
    },
  );

  /** Map from node `type` → registered TemplateRef. */
  private readonly templateMap: Signal<ReadonlyMap<string, TemplateRef<{ $implicit: TreeNode }>>> =
    computed<ReadonlyMap<string, TemplateRef<{ $implicit: TreeNode }>>>(
      (): ReadonlyMap<string, TemplateRef<{ $implicit: TreeNode }>> => {
        const map: Map<string, TemplateRef<{ $implicit: TreeNode }>> = new Map<
          string,
          TemplateRef<{ $implicit: TreeNode }>
        >();
        for (const directive of this.nodeTemplateDirectives()) {
          map.set(directive.type(), directive.templateRef);
        }
        return map;
      },
    );

  /**
   * Set of node keys that pass the active filter.
   * When filter is disabled or the text is empty, returns `null` (all visible).
   */
  private readonly filteredNodeKeys: Signal<Set<string> | null> = computed<Set<string> | null>(
    (): Set<string> | null => {
      if (!this.filter()) {
        return null;
      }
      const text: string = this.filterText().trim().toLowerCase();
      if (!text) {
        return null;
      }
      return this.computeFilteredKeys(this.value(), text, this.filterMode());
    },
  );

  // ─── TreeContext implementation ────────────────────────────────────────────

  /**
   * Returns the TemplateRef registered for the node's `type` key, the
   * `'default'` template if no specific type is registered, or `null`.
   */
  public getTemplateForNode(node: TreeNode): TemplateRef<{ $implicit: TreeNode }> | null {
    const map: ReadonlyMap<string, TemplateRef<{ $implicit: TreeNode }>> = this.templateMap();
    return map.get(node.type ?? 'default') ?? map.get('default') ?? null;
  }

  /** Returns `true` when the given node is part of the current selection. */
  public isNodeSelected(node: TreeNode): boolean {
    const mode: TreeSelectionMode = this.selectionMode();
    const currentSelection: TreeNode | TreeNode[] | null = this.selection();

    if (!mode || !currentSelection) {
      return false;
    }

    if (mode === 'single') {
      return (currentSelection as TreeNode).key === node.key;
    }

    // multiple or checkbox
    return (currentSelection as TreeNode[]).some(
      (selected: TreeNode): boolean => selected.key === node.key,
    );
  }

  /** Returns the generated DOM id for the given tree row. */
  public getTreeItemId(node: TreeNode): string {
    return `${this.hostElementId()}-item-${this.sanitizeNodeKey(node.key)}`;
  }

  /** Returns the node's tree level using 1-based indexing. */
  public getNodeLevel(node: TreeNode): number {
    const path: TreeNode[] | null = this.findVisibleNodePath(node.key);
    return path?.length ?? 1;
  }

  /** Returns the visible sibling count for the node's current group. */
  public getNodeSetSize(node: TreeNode): number {
    const visibleSiblings: TreeNode[] = this.getVisibleSiblings(node);
    return visibleSiblings.length || 1;
  }

  /** Returns the 1-based visible sibling position for the node's current group. */
  public getNodePosInSet(node: TreeNode): number {
    const visibleSiblings: TreeNode[] = this.getVisibleSiblings(node);
    const index: number = visibleSiblings.findIndex(
      (sibling: TreeNode): boolean => sibling.key === node.key,
    );
    return index >= 0 ? index + 1 : 1;
  }

  /** Returns the node's currently visible children. */
  public getVisibleChildren(node: TreeNode): TreeNode[] {
    return (node.children ?? []).filter((child: TreeNode): boolean => this.isNodeFiltered(child));
  }

  /** Returns the tabindex to apply to the node row. */
  public getNodeTabIndex(node: TreeNode): number {
    const focusedKey: string | null = this.focusedNodeKey();
    if (focusedKey !== null) {
      return focusedKey === node.key ? 0 : -1;
    }

    const firstVisibleNode: TreeNode | null = this.getVisibleFlatNodes()[0] ?? null;
    return firstVisibleNode?.key === node.key ? 0 : -1;
  }

  /** Marks the node as the current focus target. */
  public setFocusedNode(node: TreeNode): void {
    this.focusedNodeKey.set(node.key);
  }

  /**
   * Returns `true` when some but not all of the node's descendants are
   * selected (checkbox mode only).
   */
  public isNodePartiallySelected(node: TreeNode): boolean {
    // Reading tick() creates a dependency so the binding re-evaluates after toggles.
    this.tick();
    return node.partialSelected === true;
  }

  /**
   * Returns `true` when the node's subtree should be rendered.
   * Reads `tick()` to re-evaluate after `handleNodeToggle` mutates `node.expanded`.
   */
  public isNodeExpanded(node: TreeNode): boolean {
    this.tick();
    return node.expanded !== false;
  }

  /**
   * Returns `true` when the node passes the active filter, or when no filter
   * is active.
   */
  public isNodeFiltered(node: TreeNode): boolean {
    const keys: Set<string> | null = this.filteredNodeKeys();
    return keys === null || keys.has(node.key);
  }

  /**
   * Handles a click on the node's label row.
   * Delegates to single or multiple/checkbox selection logic.
   */
  public handleNodeClick(event: Event, node: TreeNode): void {
    const mode: TreeSelectionMode = this.selectionMode();
    if (!mode || node.selectable === false) {
      return;
    }

    if (mode === 'checkbox') {
      // In checkbox mode, label click does nothing — use the checkbox control.
      return;
    }

    if (mode === 'single') {
      this.handleSingleSelection(event, node);
    } else {
      this.handleMultipleSelection(event, node);
    }

    this.tick.update((count: number): number => count + 1);
  }

  /**
   * Toggles the expand/collapse state of a node.
   * Mutates `node.expanded` directly (same as PrimeNG for API familiarity)
   * and increments the tick to force template re-evaluation.
   */
  public handleNodeToggle(event: MouseEvent, node: TreeNode): void {
    node.expanded = !node.expanded;

    if (node.expanded) {
      this.nodeExpand.emit({ originalEvent: event, node });
    } else {
      this.nodeCollapse.emit({ originalEvent: event, node });
    }

    this.tick.update((count: number): number => count + 1);
    this.cdr.markForCheck();
  }

  /**
   * Handles checkbox interaction. Cascades the check state down to all
   * descendants and updates partial-selection flags up the ancestor chain.
   */
  public handleCheckboxToggle(event: Event, node: TreeNode): void {
    const currentKeys: Set<string> = new Set(
      (Array.isArray(this.selection()) ? (this.selection() as TreeNode[]) : []).map(
        (selected: TreeNode): string => selected.key,
      ),
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

    // Rebuild the selection array from the key set using a flattened node map.
    const allNodes: TreeNode[] = this.flattenNodes(this.value());
    const nodeMap: Map<string, TreeNode> = new Map<string, TreeNode>(
      allNodes.map((flatNode: TreeNode): [string, TreeNode] => [flatNode.key, flatNode]),
    );
    const newSelection: TreeNode[] = Array.from(currentKeys)
      .map((key: string): TreeNode | undefined => nodeMap.get(key))
      .filter((treeNode: TreeNode | undefined): treeNode is TreeNode => treeNode !== undefined);

    this.selection.set(newSelection);

    // Recompute partial-selection flags on the mutated tree.
    this.updatePartialStates(this.value(), currentKeys);

    this.tick.update((count: number): number => count + 1);
    this.cdr.markForCheck();

    if (!wasSelected) {
      this.nodeSelect.emit({ originalEvent: event, node });
    } else {
      this.nodeUnselect.emit({ originalEvent: event, node });
    }
  }

  // ─── Keyboard navigation ──────────────────────────────────────────────────

  /** Handles WAI-ARIA tree keyboard navigation on the host element. */
  public onKeydown(event: KeyboardEvent): void {
    const key: string = event.key;
    const allItems: NodeListOf<HTMLElement> =
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>('[role="treeitem"]');
    const items: HTMLElement[] = Array.from(allItems);
    const focusedIndex: number = items.findIndex(
      (item: HTMLElement): boolean => item === document.activeElement,
    );

    if (key === KEYBOARD_KEYS.ArrowDown) {
      event.preventDefault();
      this.focusItemAtIndex(items, focusedIndex + 1);
    } else if (key === KEYBOARD_KEYS.ArrowUp) {
      event.preventDefault();
      this.focusItemAtIndex(items, focusedIndex - 1);
    } else if (key === KEYBOARD_KEYS.Home) {
      event.preventDefault();
      this.focusItemAtIndex(items, 0);
    } else if (key === KEYBOARD_KEYS.End) {
      event.preventDefault();
      this.focusItemAtIndex(items, items.length - 1);
    } else if (key === KEYBOARD_KEYS.ArrowRight && focusedIndex >= 0) {
      event.preventDefault();
      const focused: HTMLElement | undefined = items[focusedIndex];
      if (focused) {
        this.expandOrFocusChild(focused, items, focusedIndex);
      }
    } else if (key === KEYBOARD_KEYS.ArrowLeft && focusedIndex >= 0) {
      event.preventDefault();
      const focused: HTMLElement | undefined = items[focusedIndex];
      if (focused) {
        this.collapseOrFocusParent(focused);
      }
    } else if (key.length === 1 && /^[a-zA-Z0-9]$/.test(key)) {
      this.focusItemByTypeAhead(key, items, focusedIndex);
    }
  }

  // ─── Filter ───────────────────────────────────────────────────────────────

  /** Updates the filter text signal in response to input events. */
  public onFilterInput(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.filterText.set(input.value);
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private handleSingleSelection(event: Event, node: TreeNode): void {
    const currentSelection: TreeNode | TreeNode[] | null = this.selection();
    const isAlreadySelected: boolean =
      Boolean(currentSelection) && (currentSelection as TreeNode).key === node.key;

    if (isAlreadySelected) {
      this.selection.set(null);
      this.nodeUnselect.emit({ originalEvent: event, node });
    } else {
      this.selection.set(node);
      this.nodeSelect.emit({ originalEvent: event, node });
    }
  }

  private handleMultipleSelection(event: Event, node: TreeNode): void {
    const currentSelection: TreeNode[] = Array.isArray(this.selection())
      ? (this.selection() as TreeNode[])
      : [];

    const existingIndex: number = currentSelection.findIndex(
      (selected: TreeNode): boolean => selected.key === node.key,
    );

    if (existingIndex >= 0) {
      const updated: TreeNode[] = currentSelection.filter(
        (selected: TreeNode): boolean => selected.key !== node.key,
      );
      this.selection.set(updated);
      this.nodeUnselect.emit({ originalEvent: event, node });
    } else {
      this.selection.set([...currentSelection, node]);
      this.nodeSelect.emit({ originalEvent: event, node });
    }
  }

  /**
   * Returns keys of all descendants (recursively) of a given node, excluding
   * the node itself.
   */
  private getDescendantKeys(node: TreeNode): string[] {
    const keys: string[] = [];
    const visit: (treeNode: TreeNode) => void = (treeNode: TreeNode): void => {
      for (const child of treeNode.children ?? []) {
        keys.push(child.key);
        visit(child);
      }
    };
    visit(node);
    return keys;
  }

  /** Returns a flat list of all nodes in the tree. */
  private flattenNodes(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = [];
    const visit: (treeNode: TreeNode) => void = (treeNode: TreeNode): void => {
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

  /**
   * Recursively updates `partialSelected` on all branch nodes to reflect the
   * current `selectedKeys` set.
   */
  private updatePartialStates(nodes: TreeNode[], selectedKeys: Set<string>): void {
    for (const node of nodes) {
      if (node.children?.length) {
        this.updatePartialStates(node.children, selectedKeys);
        const descendantKeys: string[] = this.getDescendantKeys(node);
        const checkedCount: number = descendantKeys.filter((key: string): boolean =>
          selectedKeys.has(key),
        ).length;
        node.partialSelected = checkedCount > 0 && checkedCount < descendantKeys.length;
      }
    }
  }

  /**
   * Computes which node keys are visible given `filterText` and `filterMode`.
   * Lenient: a node is visible if it or any descendant label matches.
   * Strict: a node is visible only if its own label matches.
   */
  private computeFilteredKeys(nodes: TreeNode[], text: string, mode: TreeFilterMode): Set<string> {
    const keys: Set<string> = new Set<string>();
    const filterProperty: string = this.filterBy();

    const matchesFilter: (treeNode: TreeNode) => boolean = (treeNode: TreeNode): boolean => {
      const raw: unknown = (treeNode as unknown as Record<string, unknown>)[filterProperty];
      const value: string = typeof raw === 'string' ? raw.toLowerCase() : '';
      return value.includes(text);
    };

    const visit: (treeNode: TreeNode) => boolean = (treeNode: TreeNode): boolean => {
      const selfMatches: boolean = matchesFilter(treeNode);
      const childrenVisible: boolean = (treeNode.children ?? []).some((child: TreeNode): boolean =>
        visit(child),
      );

      const visible: boolean = mode === 'lenient' ? selfMatches || childrenVisible : selfMatches;

      if (visible) {
        keys.add(treeNode.key);
      }
      return visible;
    };

    for (const rootNode of nodes) {
      visit(rootNode);
    }
    return keys;
  }

  /** Returns the visible root-level nodes in DOM order. */
  private getVisibleRootNodes(): TreeNode[] {
    return this.value().filter((node: TreeNode): boolean => this.isNodeFiltered(node));
  }

  /** Returns the visible siblings for the given node. */
  private getVisibleSiblings(node: TreeNode): TreeNode[] {
    const path: TreeNode[] | null = this.findVisibleNodePath(node.key);
    if (!path) {
      return this.getVisibleRootNodes();
    }

    const parentNode: TreeNode | undefined = path[path.length - 2];
    return parentNode ? this.getVisibleChildren(parentNode) : this.getVisibleRootNodes();
  }

  /** Returns the visible node path from root to the target key, or `null` when missing. */
  private findVisibleNodePath(targetKey: string): TreeNode[] | null {
    const visit: (nodes: TreeNode[], ancestors: TreeNode[]) => TreeNode[] | null = (
      nodes: TreeNode[],
      ancestors: TreeNode[],
    ): TreeNode[] | null => {
      for (const node of nodes) {
        if (!this.isNodeFiltered(node)) {
          continue;
        }

        const currentPath: TreeNode[] = [...ancestors, node];
        if (node.key === targetKey) {
          return currentPath;
        }

        const childPath: TreeNode[] | null = visit(this.getVisibleChildren(node), currentPath);
        if (childPath) {
          return childPath;
        }
      }

      return null;
    };

    return visit(this.getVisibleRootNodes(), []);
  }

  /** Returns the currently visible nodes in flattened DOM order. */
  private getVisibleFlatNodes(): TreeNode[] {
    const flattenedNodes: TreeNode[] = [];
    const visit: (nodes: TreeNode[]) => void = (nodes: TreeNode[]): void => {
      for (const node of nodes) {
        if (!this.isNodeFiltered(node)) {
          continue;
        }

        flattenedNodes.push(node);
        if (this.isNodeExpanded(node)) {
          visit(this.getVisibleChildren(node));
        }
      }
    };

    visit(this.getVisibleRootNodes());
    return flattenedNodes;
  }

  /** Normalizes a TreeNode key so it is safe to embed in an HTML id attribute. */
  private sanitizeNodeKey(key: string): string {
    return key.replace(/[^A-Za-z0-9_:-]+/g, '-');
  }

  private focusItemAtIndex(items: HTMLElement[], index: number): void {
    const clampedIndex: number = Math.max(0, Math.min(index, items.length - 1));
    items[clampedIndex]?.focus();
  }

  /**
   * ArrowRight handler.
   * If the item is expanded: move focus to the first child (next item in flat order).
   * If the item is collapsed: expand it (focus stays on current item).
   * If the item is a leaf: no action.
   */
  private expandOrFocusChild(
    focused: HTMLElement,
    items: HTMLElement[],
    focusedIndex: number,
  ): void {
    const toggleButton: HTMLElement | null =
      focused.querySelector<HTMLElement>('.uilib-tree-node-toggle');
    if (!toggleButton) {
      // Leaf node: no action
      return;
    }
    if (toggleButton.classList.contains('uilib-tree-node-toggle--expanded')) {
      // Already expanded: focus first child (next item in flattened order)
      this.focusItemAtIndex(items, focusedIndex + 1);
    } else {
      // Collapsed: expand it; focus stays on this item
      toggleButton.click();
    }
  }

  /**
   * ArrowLeft handler.
   * If the item is expanded: collapse it (focus stays on current item).
   * If the item is collapsed or a leaf: move focus to the parent treeitem.
   */
  private collapseOrFocusParent(focused: HTMLElement): void {
    const toggleButton: HTMLElement | null =
      focused.querySelector<HTMLElement>('.uilib-tree-node-toggle');
    const isExpanded: boolean =
      toggleButton?.classList.contains('uilib-tree-node-toggle--expanded') ?? false;

    if (toggleButton && isExpanded) {
      // Expanded: collapse it
      toggleButton.click();
    } else {
      // Leaf or collapsed: move focus to the nearest ancestor treeitem
      const parent: HTMLElement | null = this.findParentTreeItem(focused);
      if (parent) {
        parent.focus();
      }
    }
  }

  /**
   * Traverses DOM ancestors to find the nearest parent element with `role="treeitem"`.
   * Because tree items and their child groups are siblings inside the component host
   * (not nested), we locate the nearest ancestor `[role="group"]` and then look for
   * the `[role="treeitem"]` that is a direct child of the same parent element.
   */
  private findParentTreeItem(focused: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = focused.parentElement;
    while (current) {
      if (current.getAttribute('role') === 'group') {
        // The parent treeitem is a direct child of the same host element as this group
        const hostEl: HTMLElement | null = current.parentElement;
        return hostEl
          ? (hostEl.querySelector<HTMLElement>(':scope > [role="treeitem"]') ?? null)
          : null;
      }
      current = current.parentElement;
    }
    return null;
  }

  /**
   * Type-ahead navigation.
   * On a printable alphanumeric key press, moves focus to the next visible treeitem
   * whose label starts with that character (case-insensitive, wraps around).
   */
  private focusItemByTypeAhead(char: string, items: HTMLElement[], focusedIndex: number): void {
    if (items.length === 0) {
      return;
    }
    const lowerChar: string = char.toLowerCase();
    const start: number = focusedIndex >= 0 ? focusedIndex + 1 : 0;
    for (let offset: number = 0; offset < items.length; offset++) {
      const index: number = (start + offset) % items.length;
      const item: HTMLElement | undefined = items[index];
      if (!item) {
        continue;
      }
      const labelEl: Element | null = item.querySelector('.uilib-tree-node-label');
      const source: Element = labelEl ?? item;
      const text: string = source.textContent.trim().toLowerCase();
      if (text.startsWith(lowerChar)) {
        item.focus();
        return;
      }
    }
  }
}
