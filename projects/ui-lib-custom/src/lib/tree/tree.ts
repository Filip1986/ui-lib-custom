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
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  /** Reactive tick. Incremented after any tree mutation to force re-render. */
  private readonly tick: WritableSignal<number> = signal(0);

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
    (): TreeVariant => (this.variant() ?? this.themeConfig.variant()) as TreeVariant
  );

  /** Host class string applied via `[class]` binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string =>
    [
      `ui-lib-tree--variant-${this.resolvedVariant()}`,
      `ui-lib-tree--size-${this.size()}`,
      this.styleClass(),
    ]
      .filter(Boolean)
      .join(' ')
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
      }
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
    }
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
      (selected: TreeNode): boolean => selected.key === node.key
    );
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
        (selected: TreeNode): string => selected.key
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

    // Rebuild the selection array from the key set using a flattened node map.
    const allNodes: TreeNode[] = this.flattenNodes(this.value());
    const nodeMap: Map<string, TreeNode> = new Map<string, TreeNode>(
      allNodes.map((flatNode: TreeNode): [string, TreeNode] => [flatNode.key, flatNode])
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
      (item: HTMLElement): boolean => item === document.activeElement
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
        // Expand the focused node if collapsed — find matching node and toggle
        this.expandFocusedNode(focused);
      }
    } else if (key === KEYBOARD_KEYS.ArrowLeft && focusedIndex >= 0) {
      event.preventDefault();
      const focused: HTMLElement | undefined = items[focusedIndex];
      if (focused) {
        // Collapse the focused node if expanded
        this.collapseFocusedNode(focused);
      }
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
      (selected: TreeNode): boolean => selected.key === node.key
    );

    if (existingIndex >= 0) {
      const updated: TreeNode[] = currentSelection.filter(
        (selected: TreeNode): boolean => selected.key !== node.key
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
          selectedKeys.has(key)
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
        visit(child)
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

  private focusItemAtIndex(items: HTMLElement[], index: number): void {
    const clampedIndex: number = Math.max(0, Math.min(index, items.length - 1));
    items[clampedIndex]?.focus();
  }

  private expandFocusedNode(focused: HTMLElement): void {
    const toggleButton: HTMLElement | null =
      focused.querySelector<HTMLElement>('.uilib-tree-node-toggle');
    if (toggleButton && !toggleButton.classList.contains('uilib-tree-node-toggle--expanded')) {
      toggleButton.click();
    }
  }

  private collapseFocusedNode(focused: HTMLElement): void {
    const toggleButton: HTMLElement | null =
      focused.querySelector<HTMLElement>('.uilib-tree-node-toggle');
    if (toggleButton && toggleButton.classList.contains('uilib-tree-node-toggle--expanded')) {
      toggleButton.click();
    }
  }
}
