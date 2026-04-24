import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { Tree } from './tree';
import { TreeNodeTemplateDirective } from './tree-template-directives';
import type {
  TreeNode,
  TreeNodeCollapseEvent,
  TreeNodeExpandEvent,
  TreeNodeSelectEvent,
  TreeSelectionMode,
} from './tree.types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function queryEl<T extends HTMLElement>(fixture: ComponentFixture<unknown>, selector: string): T {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector) as T;
}

function queryAllEl<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ─── Test data ────────────────────────────────────────────────────────────────

function buildNodes(): TreeNode[] {
  return [
    {
      key: 'docs',
      label: 'Documents',
      icon: 'pi pi-folder',
      expanded: true,
      children: [
        {
          key: 'work',
          label: 'Work',
          expanded: true,
          children: [
            { key: 'file1', label: 'Expenses.xlsx', icon: 'pi pi-file', leaf: true },
            { key: 'file2', label: 'Resume.docx', icon: 'pi pi-file', leaf: true },
          ],
        },
        {
          key: 'home',
          label: 'Home',
          expanded: true,
          children: [{ key: 'file3', label: 'Invoices.xlsx', icon: 'pi pi-file', leaf: true }],
        },
      ],
    },
    {
      key: 'pics',
      label: 'Pictures',
      expanded: false,
      children: [{ key: 'pic1', label: 'barcelona.jpg', leaf: true }],
    },
    {
      key: 'movies',
      label: 'Movies',
      leaf: true,
    },
  ];
}

// ─── Host component ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tree, TreeNodeTemplateDirective],
  template: `
    <ui-lib-tree
      [value]="value()"
      [selectionMode]="selectionMode()"
      [variant]="variant()"
      [filter]="filter()"
      [filterMode]="filterMode()"
      [(selection)]="selection"
      (nodeSelect)="onNodeSelect($event)"
      (nodeUnselect)="onNodeUnselect($event)"
      (nodeExpand)="onNodeExpand($event)"
      (nodeCollapse)="onNodeCollapse($event)"
    >
      @if (showTemplate()) {
        <ng-template uiTreeNode let-node>
          <span class="custom-label">custom:{{ node.label }}</span>
        </ng-template>
      }
    </ui-lib-tree>
  `,
})
class TestHostComponent {
  public readonly value: WritableSignal<TreeNode[]> = signal(buildNodes());
  public readonly selectionMode: WritableSignal<TreeSelectionMode> = signal(null);
  public readonly variant: WritableSignal<'material' | 'bootstrap' | 'minimal'> =
    signal('material');
  public readonly filter: WritableSignal<boolean> = signal(false);
  public readonly filterMode: WritableSignal<'lenient' | 'strict'> = signal('lenient');
  public readonly showTemplate: WritableSignal<boolean> = signal(false);
  public readonly selection: WritableSignal<TreeNode | TreeNode[] | null> = signal(null);

  public selectEvents: TreeNodeSelectEvent[] = [];
  public unselectEvents: TreeNodeSelectEvent[] = [];
  public expandEvents: TreeNodeExpandEvent[] = [];
  public collapseEvents: TreeNodeCollapseEvent[] = [];

  public onNodeSelect(event: TreeNodeSelectEvent): void {
    this.selectEvents.push(event);
  }
  public onNodeUnselect(event: TreeNodeSelectEvent): void {
    this.unselectEvents.push(event);
  }
  public onNodeExpand(event: TreeNodeExpandEvent): void {
    this.expandEvents.push(event);
  }
  public onNodeCollapse(event: TreeNodeCollapseEvent): void {
    this.collapseEvents.push(event);
  }
}

// ─── Spec ─────────────────────────────────────────────────────────────────────

describe('Tree', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', (): void => {
    it('should create the component', (): void => {
      const tree: HTMLElement | null = queryEl(fixture, 'ui-lib-tree');
      expect(tree).toBeTruthy();
    });

    it('should render root-level nodes', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      // docs (expanded), work (expanded), Expenses, Resume, Home, Invoices, pics(collapsed), movies
      expect(rows.length).toBeGreaterThanOrEqual(3);
    });

    it('should render node labels', (): void => {
      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      const texts: string[] = labels.map((l: HTMLElement): string => l.textContent.trim());
      expect(texts).toContain('Documents');
      expect(texts).toContain('Work');
      expect(texts).toContain('Pictures');
    });

    it('should not render children of collapsed nodes', (): void => {
      // Pictures is collapsed — barcelona.jpg should not be visible
      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      const texts: string[] = labels.map((l: HTMLElement): string => l.textContent.trim());
      expect(texts).not.toContain('barcelona.jpg');
    });

    it('should render toggle buttons for branch nodes', (): void => {
      const toggles: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-toggle');
      expect(toggles.length).toBeGreaterThan(0);
    });

    it('should render leaf spacers for leaf nodes', (): void => {
      const spacers: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-leaf-spacer');
      expect(spacers.length).toBeGreaterThan(0);
    });

    it('should show empty message when value is empty', (): void => {
      host.value.set([]);
      fixture.detectChanges();
      const empty: HTMLElement | null = queryEl(fixture, '.uilib-tree-empty-message');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('No items');
    });
  });

  // ─── Variant classes ───────────────────────────────────────────────────────

  describe('variant', (): void => {
    it('should apply material variant class by default', (): void => {
      const tree: HTMLElement = queryEl(fixture, 'ui-lib-tree');
      expect(tree.classList).toContain('ui-lib-tree--variant-material');
    });

    it('should apply bootstrap variant class', (): void => {
      host.variant.set('bootstrap');
      fixture.detectChanges();
      const tree: HTMLElement = queryEl(fixture, 'ui-lib-tree');
      expect(tree.classList).toContain('ui-lib-tree--variant-bootstrap');
    });

    it('should apply minimal variant class', (): void => {
      host.variant.set('minimal');
      fixture.detectChanges();
      const tree: HTMLElement = queryEl(fixture, 'ui-lib-tree');
      expect(tree.classList).toContain('ui-lib-tree--variant-minimal');
    });
  });

  // ─── Expand / collapse ─────────────────────────────────────────────────────

  describe('expand/collapse', (): void => {
    it('should expand a collapsed node on toggle click', (): void => {
      // Pictures is collapsed; find its toggle
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const picsRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Pictures')
      );
      expect(picsRow).toBeTruthy();

      const toggle: HTMLElement | null =
        picsRow?.querySelector<HTMLElement>('.uilib-tree-node-toggle') ?? null;
      expect(toggle).toBeTruthy();
      toggle?.click();
      fixture.detectChanges();

      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      const texts: string[] = labels.map((l: HTMLElement): string => l.textContent.trim());
      expect(texts).toContain('barcelona.jpg');
    });

    it('should emit nodeExpand when expanding', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const picsRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Pictures')
      );
      const toggle: HTMLElement | null =
        picsRow?.querySelector<HTMLElement>('.uilib-tree-node-toggle') ?? null;
      toggle?.click();
      fixture.detectChanges();

      expect(host.expandEvents.length).toBe(1);
      expect(host.expandEvents[0].node.key).toBe('pics');
    });

    it('should collapse an expanded node on toggle click', (): void => {
      // Documents is expanded — collapse it
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const docsRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Documents')
      );
      const toggle: HTMLElement | null =
        docsRow?.querySelector<HTMLElement>('.uilib-tree-node-toggle') ?? null;
      toggle?.click();
      fixture.detectChanges();

      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      const texts: string[] = labels.map((l: HTMLElement): string => l.textContent.trim());
      expect(texts).not.toContain('Work');
    });

    it('should emit nodeCollapse when collapsing', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const docsRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Documents')
      );
      const toggle: HTMLElement | null =
        docsRow?.querySelector<HTMLElement>('.uilib-tree-node-toggle') ?? null;
      toggle?.click();
      fixture.detectChanges();

      expect(host.collapseEvents.length).toBe(1);
      expect(host.collapseEvents[0].node.key).toBe('docs');
    });
  });

  // ─── Single selection ──────────────────────────────────────────────────────

  describe('single selection', (): void => {
    beforeEach((): void => {
      host.selectionMode.set('single');
      fixture.detectChanges();
    });

    it('should select a node on click', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const workRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Work')
      );
      workRow?.click();
      fixture.detectChanges();

      expect(host.selectEvents.length).toBe(1);
      expect(host.selectEvents[0].node.key).toBe('work');
    });

    it('should apply selected class to clicked node', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const workRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Work')
      );
      workRow?.click();
      fixture.detectChanges();

      expect(workRow?.classList).toContain('uilib-tree-node-row--selected');
    });

    it('should deselect when clicking the same node again', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const workRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Work')
      );
      workRow?.click();
      fixture.detectChanges();
      workRow?.click();
      fixture.detectChanges();

      expect(host.unselectEvents.length).toBe(1);
      const selectionValue: TreeNode | TreeNode[] | null = host.selection();
      expect(selectionValue).toBeNull();
    });

    it('should replace selection when clicking another node', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const workRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Work')
      );
      const homeRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Home')
      );
      workRow?.click();
      fixture.detectChanges();
      homeRow?.click();
      fixture.detectChanges();

      expect(host.selectEvents.length).toBe(2);
      const selectionValue: TreeNode | TreeNode[] | null = host.selection();
      expect((selectionValue as TreeNode).key).toBe('home');
    });

    it('should not select a node with selectable=false', (): void => {
      host.value.set([{ key: 'locked', label: 'Locked', selectable: false }]);
      fixture.detectChanges();

      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      rows[0]?.click();
      fixture.detectChanges();

      expect(host.selectEvents.length).toBe(0);
    });
  });

  // ─── Multiple selection ────────────────────────────────────────────────────

  describe('multiple selection', (): void => {
    beforeEach((): void => {
      host.selectionMode.set('multiple');
      fixture.detectChanges();
    });

    it('should add nodes to selection on click', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const workRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Work')
      );
      const homeRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Home')
      );
      workRow?.click();
      fixture.detectChanges();
      homeRow?.click();
      fixture.detectChanges();

      const selectionValue: TreeNode | TreeNode[] | null = host.selection();
      expect(Array.isArray(selectionValue)).toBe(true);
      expect((selectionValue as TreeNode[]).length).toBe(2);
    });

    it('should deselect node on second click', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const workRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Work')
      );
      workRow?.click();
      fixture.detectChanges();
      workRow?.click();
      fixture.detectChanges();

      const selectionValue: TreeNode | TreeNode[] | null = host.selection();
      expect(Array.isArray(selectionValue)).toBe(true);
      expect((selectionValue as TreeNode[]).length).toBe(0);
    });
  });

  // ─── Checkbox selection ────────────────────────────────────────────────────

  describe('checkbox selection', (): void => {
    beforeEach((): void => {
      host.selectionMode.set('checkbox');
      fixture.detectChanges();
    });

    it('should render checkboxes in checkbox mode', (): void => {
      const checkboxes: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should check a leaf node on checkbox click', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const expensesRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Expenses')
      );
      const checkbox: HTMLElement | null =
        expensesRow?.querySelector<HTMLElement>('.uilib-tree-node-checkbox') ?? null;
      checkbox?.click();
      fixture.detectChanges();

      const selectionValue: TreeNode | TreeNode[] | null = host.selection();
      const keys: string[] = (selectionValue as TreeNode[]).map((n: TreeNode): string => n.key);
      expect(keys).toContain('file1');
    });

    it('should cascade check to all descendants when checking a branch', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const workRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Work')
      );
      const checkbox: HTMLElement | null =
        workRow?.querySelector<HTMLElement>('.uilib-tree-node-checkbox') ?? null;
      checkbox?.click();
      fixture.detectChanges();

      const selectionValue: TreeNode | TreeNode[] | null = host.selection();
      const keys: string[] = (selectionValue as TreeNode[]).map((n: TreeNode): string => n.key);
      expect(keys).toContain('work');
      expect(keys).toContain('file1');
      expect(keys).toContain('file2');
    });

    it('should cascade uncheck when unchecking a branch', (): void => {
      // First check, then uncheck
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const workRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Work')
      );
      const checkbox: HTMLElement | null =
        workRow?.querySelector<HTMLElement>('.uilib-tree-node-checkbox') ?? null;
      checkbox?.click();
      fixture.detectChanges();
      checkbox?.click();
      fixture.detectChanges();

      const selectionValue: TreeNode | TreeNode[] | null = host.selection();
      const keys: string[] = (selectionValue as TreeNode[]).map((n: TreeNode): string => n.key);
      expect(keys).not.toContain('work');
      expect(keys).not.toContain('file1');
      expect(keys).not.toContain('file2');
    });

    it('should emit nodeSelect on checkbox check', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      const expensesRow: HTMLElement | undefined = rows.find((r: HTMLElement): boolean =>
        r.textContent.includes('Expenses')
      );
      const checkbox: HTMLElement | null =
        expensesRow?.querySelector<HTMLElement>('.uilib-tree-node-checkbox') ?? null;
      checkbox?.click();
      fixture.detectChanges();

      expect(host.selectEvents.length).toBe(1);
      expect(host.selectEvents[0].node.key).toBe('file1');
    });
  });

  // ─── Filter ────────────────────────────────────────────────────────────────

  describe('filter', (): void => {
    beforeEach((): void => {
      host.filter.set(true);
      fixture.detectChanges();
    });

    it('should render filter input when filter=true', (): void => {
      const input: HTMLElement | null = queryEl(fixture, '.uilib-tree-filter-input');
      expect(input).toBeTruthy();
    });

    it('should not render filter input when filter=false', (): void => {
      host.filter.set(false);
      fixture.detectChanges();
      const input: HTMLElement | null = queryEl(fixture, '.uilib-tree-filter-input');
      expect(input).toBeNull();
    });

    it('should filter nodes (lenient mode) on text input', (): void => {
      const input: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.uilib-tree-filter-input'
      );
      input.value = 'Resume';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      const texts: string[] = labels.map((l: HTMLElement): string => l.textContent.trim());
      // In lenient mode, Resume.docx is visible, and its ancestors (Work, Documents) too
      expect(texts).toContain('Resume.docx');
      expect(texts).toContain('Work');
      expect(texts).toContain('Documents');
      // Expenses should be hidden (no match)
      expect(texts).not.toContain('Expenses.xlsx');
    });

    it('should show all nodes when filter is cleared', (): void => {
      const input: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.uilib-tree-filter-input'
      );
      input.value = 'Resume';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      const texts: string[] = labels.map((l: HTMLElement): string => l.textContent.trim());
      expect(texts).toContain('Work');
      expect(texts).toContain('Documents');
    });

    it('should hide ancestor nodes in strict mode', (): void => {
      // In strict mode a node is visible only if IT ITSELF matches the filter.
      // "barcelona" matches the leaf 'barcelona.jpg' (key 'pic1') but NOT its
      // parent 'Pictures' (key 'pics'). Since the root 'pics' is excluded from
      // filteredNodeKeys, neither Pictures nor its children are rendered.
      // Contrast with lenient mode: 'Pictures' would be visible there because
      // a descendant matches.
      host.filterMode.set('strict');
      fixture.detectChanges();

      const input: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.uilib-tree-filter-input'
      );
      input.value = 'barcelona';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      const texts: string[] = labels.map((l: HTMLElement): string => l.textContent.trim());
      // 'Pictures' root does not match 'barcelona' → filtered out in strict mode
      expect(texts).not.toContain('Pictures');
      // 'barcelona.jpg' cannot render because its root ancestor is hidden
      expect(texts).not.toContain('barcelona.jpg');
    });

    it('should show root-level match in strict mode', (): void => {
      // A root node whose own label matches IS visible in strict mode.
      host.filterMode.set('strict');
      fixture.detectChanges();

      const input: HTMLInputElement = queryEl<HTMLInputElement>(
        fixture,
        '.uilib-tree-filter-input'
      );
      input.value = 'Movies';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      const texts: string[] = labels.map((l: HTMLElement): string => l.textContent.trim());
      expect(texts).toContain('Movies');
      // Documents root does not match 'Movies'
      expect(texts).not.toContain('Documents');
    });
  });

  // ─── Custom template ───────────────────────────────────────────────────────

  describe('custom template', (): void => {
    it('should render custom template when provided', (): void => {
      host.showTemplate.set(true);
      fixture.detectChanges();

      const customLabels: HTMLElement[] = queryAllEl(fixture, '.custom-label');
      expect(customLabels.length).toBeGreaterThan(0);
      expect(customLabels[0].textContent).toContain('custom:');
    });

    it('should fall back to default label when no template is provided', (): void => {
      host.showTemplate.set(false);
      fixture.detectChanges();

      const labels: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-label');
      expect(labels.length).toBeGreaterThan(0);
    });
  });

  // ─── ARIA ──────────────────────────────────────────────────────────────────

  describe('accessibility', (): void => {
    it('should have role="tree" on the host', (): void => {
      const tree: HTMLElement = queryEl(fixture, 'ui-lib-tree');
      expect(tree.getAttribute('role')).toBe('tree');
    });

    it('should have role="treeitem" on node rows', (): void => {
      const rows: HTMLElement[] = queryAllEl(fixture, '[role="treeitem"]');
      expect(rows.length).toBeGreaterThan(0);
    });

    it('should set aria-expanded on branch rows', (): void => {
      const docsRow: HTMLElement | null = queryEl(
        fixture,
        '[role="treeitem"][aria-expanded="true"]'
      );
      expect(docsRow).toBeTruthy();
    });

    it('should set aria-selected in single mode', (): void => {
      host.selectionMode.set('single');
      fixture.detectChanges();

      const rows: HTMLElement[] = queryAllEl(fixture, '.uilib-tree-node-row');
      rows[0]?.click();
      fixture.detectChanges();

      const selected: HTMLElement | null = queryEl(fixture, '[aria-selected="true"]');
      expect(selected).toBeTruthy();
    });
  });
});
