import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  computed,
  forwardRef,
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
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { Tree } from 'ui-lib-custom/tree';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { TREE_SELECT_DEFAULTS, TREE_SELECT_ID_PREFIX } from './tree-select.constants';
import type {
  TreeNode,
  TreeNodeCollapseEvent,
  TreeNodeExpandEvent,
  TreeNodeSelectEvent,
  TreeSelectChangeEvent,
  TreeSelectHideEvent,
  TreeSelectSelectionMode,
  TreeSelectShowEvent,
  TreeSelectSize,
  TreeSelectVariant,
} from './tree-select.types';

export type {
  TreeNode,
  TreeNodeSelectEvent,
  TreeNodeExpandEvent,
  TreeNodeCollapseEvent,
  TreeSelectVariant,
  TreeSelectSize,
  TreeSelectSelectionMode,
  TreeSelectChangeEvent,
  TreeSelectShowEvent,
  TreeSelectHideEvent,
} from './tree-select.types';

export { TREE_SELECT_DEFAULTS } from './tree-select.constants';

let treeSelectIdCounter: number = 0;

/**
 * TreeSelect renders a hierarchical tree structure inside a dropdown panel,
 * allowing single, multiple, or checkbox-based selection.
 *
 * @example
 * ```html
 * <ui-lib-tree-select
 *   [nodes]="treeNodes"
 *   selectionMode="single"
 *   [(selection)]="selectedNode"
 *   placeholder="Choose a category"
 * />
 * ```
 */
@Component({
  selector: 'ui-lib-tree-select',
  standalone: true,
  imports: [Tree, FormsModule],
  templateUrl: './tree-select.component.html',
  styleUrl: './tree-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof TreeSelect => TreeSelect),
      multi: true,
    },
  ],
  host: {
    class: 'ui-lib-tree-select',
    '[class]': 'hostClasses()',
    role: 'combobox',
    '[attr.aria-expanded]': 'panelVisible() ? "true" : "false"',
    '[attr.aria-haspopup]': '"tree"',
    '[attr.aria-controls]': 'panelId',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-labelledby]': 'ariaLabelledBy() || null',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
    '(keydown)': 'onKeydown($event)',
  },
})
export class TreeSelect implements ControlValueAccessor {
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly elementRef: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);

  // ─── Instance ID ──────────────────────────────────────────────────────────

  private readonly instanceId: string = `${TREE_SELECT_ID_PREFIX}-${++treeSelectIdCounter}`;
  public readonly panelId: string = `${this.instanceId}-panel`;

  // ─── CVA state ────────────────────────────────────────────────────────────

  private cvaOnChange: (value: TreeNode | TreeNode[] | null) => void = (): void => {};
  private cvaOnTouched: () => void = (): void => {};
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);

  // ─── Inputs ────────────────────────────────────────────────────────────────

  /** Root-level tree nodes to display in the panel. */
  public readonly nodes: InputSignal<TreeNode[]> = input<TreeNode[]>([]);

  /** Controls how nodes respond to user interaction. */
  public readonly selectionMode: InputSignal<TreeSelectSelectionMode> =
    input<TreeSelectSelectionMode>('single');

  /** Design variant. Falls back to ThemeConfigService when `null`. */
  public readonly variant: InputSignal<TreeSelectVariant | null> = input<TreeSelectVariant | null>(
    null
  );

  /** Size of the trigger element. */
  public readonly size: InputSignal<TreeSelectSize> = input<TreeSelectSize>('md');

  /** Placeholder text shown when no node is selected. */
  public readonly placeholder: InputSignal<string> = input<string>(
    TREE_SELECT_DEFAULTS.placeholder
  );

  /** When `true`, the component is non-interactive. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, a loading spinner is shown and the component is non-interactive. */
  public readonly loading: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, a filter input is rendered inside the panel. */
  public readonly filter: InputSignal<boolean> = input<boolean>(false);

  /** Placeholder for the filter input inside the panel. */
  public readonly filterPlaceholder: InputSignal<string> = input<string>(
    TREE_SELECT_DEFAULTS.filterPlaceholder
  );

  /** When `true`, shows a clear button when a value is selected. */
  public readonly showClear: InputSignal<boolean> = input<boolean>(false);

  /** Extra CSS class applied to the host element. */
  public readonly styleClass: InputSignal<string> = input<string>('');

  /** ARIA label for the trigger. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);

  /** References an external element that labels this component. */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  /** When `true`, applies the invalid visual state and `aria-invalid`. */
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);

  /** When `true`, sets `aria-required`. */
  public readonly required: InputSignal<boolean> = input<boolean>(false);

  /** Message shown when the node list is empty. */
  public readonly emptyMessage: InputSignal<string> = input<string>(
    TREE_SELECT_DEFAULTS.emptyMessage
  );

  // ─── Two-way binding ───────────────────────────────────────────────────────

  /** Currently selected node(s). Use `[(selection)]` for two-way binding. */
  public readonly selection: ModelSignal<TreeNode | TreeNode[] | null> = model<
    TreeNode | TreeNode[] | null
  >(null);

  /** Controls panel visibility. Settable programmatically. */
  public readonly panelVisible: ModelSignal<boolean> = model<boolean>(false);

  // ─── Outputs ───────────────────────────────────────────────────────────────

  /** Emitted when the selection changes. */
  public readonly selectionChange: OutputEmitterRef<TreeSelectChangeEvent> =
    output<TreeSelectChangeEvent>();

  /** Emitted when the dropdown panel is shown. */
  public readonly show: OutputEmitterRef<TreeSelectShowEvent> = output<TreeSelectShowEvent>();

  /** Emitted when the dropdown panel is hidden. */
  public readonly hide: OutputEmitterRef<TreeSelectHideEvent> = output<TreeSelectHideEvent>();

  /** Emitted when a tree node is selected. */
  public readonly nodeSelect: OutputEmitterRef<TreeNodeSelectEvent> = output<TreeNodeSelectEvent>();

  /** Emitted when a tree node is unselected. */
  public readonly nodeUnselect: OutputEmitterRef<TreeNodeSelectEvent> =
    output<TreeNodeSelectEvent>();

  /** Emitted when a tree node is expanded. */
  public readonly nodeExpand: OutputEmitterRef<TreeNodeExpandEvent> = output<TreeNodeExpandEvent>();

  /** Emitted when a tree node is collapsed. */
  public readonly nodeCollapse: OutputEmitterRef<TreeNodeCollapseEvent> =
    output<TreeNodeCollapseEvent>();

  /** Emitted when the selection is cleared via the clear button. */
  public readonly cleared: OutputEmitterRef<void> = output<void>();

  // ─── Derived signals ───────────────────────────────────────────────────────

  private readonly resolvedVariant: Signal<TreeSelectVariant> = computed<TreeSelectVariant>(
    (): TreeSelectVariant => (this.variant() ?? this.themeConfig.variant()) as TreeSelectVariant
  );

  /** Host class string applied via `[class]` binding. */
  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      `ui-lib-tree-select--variant-${this.resolvedVariant()}`,
      `ui-lib-tree-select--size-${this.size()}`,
    ];
    if (this.panelVisible()) classes.push('ui-lib-tree-select--open');
    if (this.isDisabled()) classes.push('ui-lib-tree-select--disabled');
    if (this.loading()) classes.push('ui-lib-tree-select--loading');
    if (this.invalid()) classes.push('ui-lib-tree-select--invalid');
    if (this.hasValue()) classes.push('ui-lib-tree-select--has-value');
    if (this.styleClass()) classes.push(this.styleClass());
    return classes.join(' ');
  });

  /** `true` when the component should be non-interactive. */
  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled() || this.loading()
  );

  /** `true` when a node or nodes are currently selected. */
  public readonly hasValue: Signal<boolean> = computed<boolean>((): boolean => {
    const sel: TreeNode | TreeNode[] | null = this.selection();
    if (sel === null) return false;
    if (Array.isArray(sel)) return sel.length > 0;
    return true;
  });

  /**
   * Human-readable display label for the trigger area.
   * Single mode: selected node's label.
   * Multiple mode: comma-joined labels.
   * Checkbox mode: "N items selected" when multiple, else the single label.
   */
  public readonly displayLabel: Signal<string> = computed<string>((): string => {
    const sel: TreeNode | TreeNode[] | null = this.selection();
    if (sel === null) return '';

    if (Array.isArray(sel)) {
      if (sel.length === 0) return '';
      if (sel.length === 1) return sel[0]?.label ?? '';
      return `${sel.length} items selected`;
    }

    return (sel as TreeNode).label ?? '';
  });

  // ─── ControlValueAccessor ─────────────────────────────────────────────────

  public registerOnChange(fn: (value: TreeNode | TreeNode[] | null) => void): void {
    this.cvaOnChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.cvaOnTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  public writeValue(value: TreeNode | TreeNode[] | null): void {
    this.selection.set(value ?? null);
  }

  // ─── Panel control ─────────────────────────────────────────────────────────

  /** Opens the dropdown panel if the component is not disabled. */
  public openPanel(event?: Event): void {
    if (this.isDisabled()) return;
    this.panelVisible.set(true);
    if (event) {
      this.show.emit({ originalEvent: event });
    }
  }

  /** Closes the dropdown panel and marks the component as touched. */
  public closePanel(event?: Event | null): void {
    this.panelVisible.set(false);
    this.cvaOnTouched();
    this.hide.emit({ originalEvent: event ?? null });
  }

  /** Toggles the dropdown panel open/closed. */
  public togglePanel(event: Event): void {
    if (this.panelVisible()) {
      this.closePanel(event);
    } else {
      this.openPanel(event);
    }
  }

  // ─── Node selection callbacks ──────────────────────────────────────────────

  /** Called when the embedded Tree emits `nodeSelect`. */
  public handleNodeSelect(event: TreeNodeSelectEvent): void {
    this.nodeSelect.emit(event);

    if (this.selectionMode() === 'single') {
      // Close the panel on single selection
      this.closePanel(event.originalEvent);
    }

    this.cvaOnChange(this.selection());
    this.selectionChange.emit({ originalEvent: event.originalEvent, value: this.selection() });
  }

  /** Called when the embedded Tree emits `nodeUnselect`. */
  public handleNodeUnselect(event: TreeNodeSelectEvent): void {
    this.nodeUnselect.emit(event);
    this.cvaOnChange(this.selection());
    this.selectionChange.emit({ originalEvent: event.originalEvent, value: this.selection() });
  }

  /** Called when the embedded Tree emits `nodeExpand`. */
  public handleNodeExpand(event: TreeNodeExpandEvent): void {
    this.nodeExpand.emit(event);
  }

  /** Called when the embedded Tree emits `nodeCollapse`. */
  public handleNodeCollapse(event: TreeNodeCollapseEvent): void {
    this.nodeCollapse.emit(event);
  }

  // ─── Clear ─────────────────────────────────────────────────────────────────

  /** Clears the current selection and emits the cleared state. */
  public clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    if (this.isDisabled()) return;
    this.selection.set(null);
    this.cvaOnChange(null);
    this.selectionChange.emit({ originalEvent: event, value: null });
    this.cleared.emit();
  }

  // ─── Keyboard navigation ──────────────────────────────────────────────────

  /** Handles host-level keyboard events for WAI-ARIA combobox interaction. */
  public onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) return;

    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space:
        event.preventDefault();
        if (!this.panelVisible()) {
          this.openPanel(event);
        }
        break;
      case KEYBOARD_KEYS.Escape:
        if (this.panelVisible()) {
          event.preventDefault();
          this.closePanel(event);
          this.elementRef.nativeElement.focus();
        }
        break;
      case KEYBOARD_KEYS.Tab:
        if (this.panelVisible()) {
          this.closePanel(event);
        }
        break;
      default:
        break;
    }
  }

  // ─── Click outside ────────────────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (this.panelVisible() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closePanel(event);
    }
  }
}
