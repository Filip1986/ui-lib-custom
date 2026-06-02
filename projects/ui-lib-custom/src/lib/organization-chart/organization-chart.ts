import type {
  InputSignal,
  ModelSignal,
  OutputEmitterRef,
  Signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import { ThemeConfigService } from 'ui-lib-custom/theme';

import type {
  OrganizationChartNode,
  OrganizationChartNodeExpandEvent,
  OrganizationChartNodeSelectEvent,
  OrganizationChartSelectionMode,
  OrganizationChartVariant,
} from './organization-chart.types';
import type { OrganizationChartContext } from './organization-chart-context';
import { ORGANIZATION_CHART_CONTEXT } from './organization-chart-context';
import { OrganizationChartNodeComponent } from './organization-chart-node';
import { OrgChartNodeTemplateDirective } from './organization-chart-template-directives';

/** Module-level counter for generating unique organization-chart instance IDs. */
let organizationChartIdCounter: number = 0;

/**
 * OrganizationChart renders an interactive hierarchical tree of nodes.
 * Supports single/multiple selection, collapsible subtrees, custom node
 * templates per node type, and three design variants.
 *
 * @example
 * ```html
 * <ui-lib-organization-chart [value]="nodes" selectionMode="single" [(selection)]="selected">
 *   <ng-template uiOrgChartNode let-node>
 *     <strong>{{ node.label }}</strong>
 *   </ng-template>
 * </ui-lib-organization-chart>
 * ```
 */
@Component({
  selector: 'ui-lib-organization-chart',
  standalone: true,
  imports: [OrganizationChartNodeComponent],
  templateUrl: './organization-chart.html',
  styleUrl: './organization-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ui-lib-organization-chart',
    '[class]': 'hostClasses()',
    '(keydown)': 'onKeydown($event)',
  },
  providers: [
    {
      provide: ORGANIZATION_CHART_CONTEXT,
      useExisting: OrganizationChart,
    },
  ],
})
export class OrganizationChart implements OrganizationChartContext {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);

  /** Reactive version counter. Incremented after any tree mutation to force re-renders. */
  private readonly _tick: WritableSignal<number> = signal(0);

  /** Unique instance ID for this organization chart. */
  public readonly instanceId: string = `ui-lib-organization-chart-${++organizationChartIdCounter}`;

  // ─── Inputs ────────────────────────────────────────────────────────────────

  /** Root-level nodes of the tree. */
  public readonly value: InputSignal<OrganizationChartNode[]> = input<OrganizationChartNode[]>([]);

  /** Defines how nodes respond to click interactions. */
  public readonly selectionMode: InputSignal<OrganizationChartSelectionMode> =
    input<OrganizationChartSelectionMode>(null);

  /** When `true`, nodes with children render an expand/collapse toggle button. */
  public readonly collapsible: InputSignal<boolean> = input<boolean>(false);

  /**
   * Design variant. Falls back to the global `ThemeConfigService` variant
   * when `null`.
   */
  public readonly variant: InputSignal<OrganizationChartVariant | null> =
    input<OrganizationChartVariant | null>(null);

  /** Extra CSS class applied to the host element. */
  public readonly styleClass: InputSignal<string | null> = input<string | null>(null);

  /** Accessible label for the tree. Applied to the root tree element. Defaults to i18n fallback. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  // ─── Two-way binding ───────────────────────────────────────────────────────

  /** Currently selected node(s). Use `[(selection)]` for two-way binding. */
  public readonly selection: ModelSignal<OrganizationChartNode | OrganizationChartNode[] | null> =
    model<OrganizationChartNode | OrganizationChartNode[] | null>(null);

  // ─── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when a node is selected. */
  public readonly nodeSelect: OutputEmitterRef<OrganizationChartNodeSelectEvent> =
    output<OrganizationChartNodeSelectEvent>();

  /** Emitted when a node is unselected. */
  public readonly nodeUnselect: OutputEmitterRef<OrganizationChartNodeSelectEvent> =
    output<OrganizationChartNodeSelectEvent>();

  /** Emitted when a node's subtree is expanded. */
  public readonly nodeExpand: OutputEmitterRef<OrganizationChartNodeExpandEvent> =
    output<OrganizationChartNodeExpandEvent>();

  /** Emitted when a node's subtree is collapsed. */
  public readonly nodeCollapse: OutputEmitterRef<OrganizationChartNodeExpandEvent> =
    output<OrganizationChartNodeExpandEvent>();

  // ─── Content children ──────────────────────────────────────────────────────

  private readonly nodeTemplateDirectives: Signal<ReadonlyArray<OrgChartNodeTemplateDirective>> =
    contentChildren(OrgChartNodeTemplateDirective);

  // ─── Derived signals ───────────────────────────────────────────────────────

  private readonly resolvedVariant: Signal<OrganizationChartVariant> =
    computed<OrganizationChartVariant>(
      (): OrganizationChartVariant =>
        (this.variant() ?? this.themeConfig.variant()) as OrganizationChartVariant,
    );

  /** Host class string applied via `[class]` binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string =>
    [`ui-lib-organization-chart--variant-${this.resolvedVariant()}`, this.styleClass()]
      .filter(Boolean)
      .join(' '),
  );

  /** Resolved accessible label — consumer value takes priority; falls back to i18n key. */
  public readonly resolvedAriaLabel: Signal<string> = computed<string>(
    (): string => this.ariaLabel() ?? this.i18n.translate('organization-chart.label'),
  );

  /** Map from node `type` → registered `TemplateRef`. */
  private readonly templateMap: Signal<
    ReadonlyMap<string, TemplateRef<{ $implicit: OrganizationChartNode }>>
  > = computed<ReadonlyMap<string, TemplateRef<{ $implicit: OrganizationChartNode }>>>(
    (): ReadonlyMap<string, TemplateRef<{ $implicit: OrganizationChartNode }>> => {
      const map: Map<string, TemplateRef<{ $implicit: OrganizationChartNode }>> = new Map<
        string,
        TemplateRef<{ $implicit: OrganizationChartNode }>
      >();
      for (const directive of this.nodeTemplateDirectives()) {
        map.set(directive.type(), directive.templateRef);
      }
      return map;
    },
  );

  // ─── OrganizationChartContext implementation ───────────────────────────────

  /**
   * Returns the `TemplateRef` registered for the node's `type`, the `'default'`
   * template if no specific type is registered, or `null`.
   */
  public getTemplateForNode(
    node: OrganizationChartNode,
  ): TemplateRef<{ $implicit: OrganizationChartNode }> | null {
    const map: ReadonlyMap<
      string,
      TemplateRef<{ $implicit: OrganizationChartNode }>
    > = this.templateMap();
    return map.get(node.type ?? 'default') ?? map.get('default') ?? null;
  }

  /**
   * Handles a node cell click. Updates `selection` and emits `nodeSelect` /
   * `nodeUnselect` based on the current `selectionMode`.
   */
  public handleNodeClick(event: MouseEvent, node: OrganizationChartNode): void {
    const mode: OrganizationChartSelectionMode = this.selectionMode();
    if (!mode || node.selectable === false) {
      return;
    }

    if (mode === 'single') {
      this.handleSingleSelection(event, node);
    } else {
      this.handleMultipleSelection(event, node);
    }
    this._tick.update((tick: number): number => tick + 1);
  }

  /**
   * Toggles the expand/collapse state of a node. Mutates `node.expanded`
   * directly (same pattern as PrimeNG for API familiarity) and increments the
   * reactive tick to force template re-evaluation.
   */
  public handleNodeToggle(event: MouseEvent, node: OrganizationChartNode): void {
    node.expanded = !node.expanded;

    if (node.expanded) {
      this.nodeExpand.emit({ originalEvent: event, node });
    } else {
      this.nodeCollapse.emit({ originalEvent: event, node });
    }

    this._tick.update((tick: number): number => tick + 1);
    this.cdr.markForCheck();
  }

  /**
   * Returns `true` when the given node is part of the current selection.
   * Reads `selection()` (a signal), so bindings automatically re-evaluate
   * when selection changes.
   */
  public isNodeSelected(node: OrganizationChartNode): boolean {
    const mode: OrganizationChartSelectionMode = this.selectionMode();
    const currentSelection: OrganizationChartNode | OrganizationChartNode[] | null =
      this.selection();

    if (!mode || !currentSelection) {
      return false;
    }

    if (mode === 'single') {
      return (currentSelection as OrganizationChartNode).key === node.key;
    }

    return (currentSelection as OrganizationChartNode[]).some(
      (selected: OrganizationChartNode): boolean => selected.key === node.key,
    );
  }

  /**
   * Returns `true` when the node's subtree should be rendered.
   * Reads `_tick()` so template bindings re-evaluate after `handleNodeToggle`
   * mutates `node.expanded`.
   */
  public isNodeExpanded(node: OrganizationChartNode): boolean {
    // Reading _tick() creates a signal dependency that forces re-evaluation
    // whenever a node is toggled.
    this._tick();
    return node.expanded !== false;
  }

  // ─── Keyboard navigation ──────────────────────────────────────────────────

  /** Handles WAI-ARIA tree keyboard navigation on the host element. */
  public onKeydown(event: KeyboardEvent): void {
    const key: string = event.key;
    const allItems: NodeListOf<HTMLElement> =
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>('[role="treeitem"]');
    const items: HTMLElement[] = Array.from(allItems);
    if (items.length === 0) {
      return;
    }
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
    } else if ((key === KEYBOARD_KEYS.Enter || key === KEYBOARD_KEYS.Space) && focusedIndex >= 0) {
      event.preventDefault();
      items[focusedIndex]?.click();
    } else if (key.length === 1 && /^[\p{L}\p{N}]$/u.test(key)) {
      this.focusItemByTypeAhead(key, items, focusedIndex);
    }
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private handleSingleSelection(event: MouseEvent, node: OrganizationChartNode): void {
    const currentSelection: OrganizationChartNode | OrganizationChartNode[] | null =
      this.selection();
    const isAlreadySelected: boolean =
      Boolean(currentSelection) && (currentSelection as OrganizationChartNode).key === node.key;

    if (isAlreadySelected) {
      this.selection.set(null);
      this.nodeUnselect.emit({ originalEvent: event, node });
    } else {
      this.selection.set(node);
      this.nodeSelect.emit({ originalEvent: event, node });
    }
  }

  private handleMultipleSelection(event: MouseEvent, node: OrganizationChartNode): void {
    const currentSelection: OrganizationChartNode[] = Array.isArray(this.selection())
      ? (this.selection() as OrganizationChartNode[])
      : [];

    const existingIndex: number = currentSelection.findIndex(
      (selected: OrganizationChartNode): boolean => selected.key === node.key,
    );

    if (existingIndex >= 0) {
      const updated: OrganizationChartNode[] = currentSelection.filter(
        (selected: OrganizationChartNode): boolean => selected.key !== node.key,
      );
      this.selection.set(updated);
      this.nodeUnselect.emit({ originalEvent: event, node });
    } else {
      this.selection.set([...currentSelection, node]);
      this.nodeSelect.emit({ originalEvent: event, node });
    }
  }

  private focusItemAtIndex(items: HTMLElement[], index: number): void {
    const clampedIndex: number = Math.max(0, Math.min(index, items.length - 1));
    items[clampedIndex]?.focus();
  }

  /**
   * ArrowRight handler.
   * If collapsed: expand current item.
   * If expanded: focus first child.
   * If leaf: no action.
   */
  private expandOrFocusChild(
    focused: HTMLElement,
    items: HTMLElement[],
    focusedIndex: number,
  ): void {
    const toggleButton: HTMLElement | null = focused.querySelector<HTMLElement>(
      '.uilib-org-chart-toggle-btn',
    );
    if (!toggleButton) {
      return;
    }

    const isExpanded: boolean = focused.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      this.focusItemAtIndex(items, focusedIndex + 1);
    } else {
      toggleButton.click();
    }
  }

  /**
   * ArrowLeft handler.
   * If expanded: collapse current item.
   * Else: focus parent.
   */
  private collapseOrFocusParent(focused: HTMLElement): void {
    const toggleButton: HTMLElement | null = focused.querySelector<HTMLElement>(
      '.uilib-org-chart-toggle-btn',
    );
    const isExpanded: boolean = focused.getAttribute('aria-expanded') === 'true';
    if (toggleButton && isExpanded) {
      toggleButton.click();
      return;
    }

    const parent: HTMLElement | null = this.findParentTreeItem(focused);
    parent?.focus();
  }

  private findParentTreeItem(focused: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = focused.parentElement;
    while (current) {
      if (current.getAttribute('role') === 'group') {
        const hostElement: HTMLElement | null = current.parentElement;
        return hostElement
          ? (hostElement.querySelector<HTMLElement>(':scope > [role="treeitem"]') ?? null)
          : null;
      }
      current = current.parentElement;
    }
    return null;
  }

  /** Type-ahead focus movement by first label character. */
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
      const labelElement: Element | null = item.querySelector('.uilib-org-chart-node-label');
      const source: Element = labelElement ?? item;
      const sourceText: unknown = source.textContent;
      const text: string = typeof sourceText === 'string' ? sourceText.trim().toLowerCase() : '';
      if (text.startsWith(lowerChar)) {
        item.focus();
        return;
      }
    }
  }
}
