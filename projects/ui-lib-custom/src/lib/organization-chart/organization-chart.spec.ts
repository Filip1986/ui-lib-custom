import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import type { WritableSignal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { OrganizationChart } from './organization-chart';
import { OrgChartNodeTemplateDirective } from './organization-chart-template-directives';
import type {
  OrganizationChartNode,
  OrganizationChartNodeExpandEvent,
  OrganizationChartNodeSelectEvent,
  OrganizationChartSelectionMode,
} from './organization-chart.types';

// ─── Test data ────────────────────────────────────────────────────────────────

const TREE_NODES: OrganizationChartNode[] = [
  {
    key: 'ceo',
    label: 'CEO',
    expanded: true,
    children: [
      {
        key: 'vp-eng',
        label: 'VP Engineering',
        expanded: true,
        children: [
          { key: 'dev1', label: 'Developer 1' },
          { key: 'dev2', label: 'Developer 2' },
        ],
      },
      {
        key: 'vp-sales',
        label: 'VP Sales',
        expanded: true,
        children: [{ key: 'sales1', label: 'Sales Rep 1' }],
      },
    ],
  },
];

// ─── Host component ───────────────────────────────────────────────────────────

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrganizationChart, OrgChartNodeTemplateDirective],
  template: `
    <ui-lib-organization-chart
      [value]="value()"
      [selectionMode]="selectionMode()"
      [collapsible]="collapsible()"
      [variant]="variant()"
      [(selection)]="selection"
      (nodeSelect)="onNodeSelect($event)"
      (nodeUnselect)="onNodeUnselect($event)"
      (nodeExpand)="onNodeExpand($event)"
      (nodeCollapse)="onNodeCollapse($event)"
    >
      @if (showTemplate()) {
        <ng-template uiOrgChartNode let-node>
          <span class="custom-label">custom:{{ node.label }}</span>
        </ng-template>
      }
    </ui-lib-organization-chart>
  `,
})
class TestHostComponent {
  public readonly value: WritableSignal<OrganizationChartNode[]> = signal(
    JSON.parse(JSON.stringify(TREE_NODES)) as OrganizationChartNode[]
  );
  public readonly selectionMode: WritableSignal<OrganizationChartSelectionMode> = signal(null);
  public readonly collapsible: WritableSignal<boolean> = signal(false);
  public readonly variant: WritableSignal<'material' | 'bootstrap' | 'minimal'> =
    signal('material');
  public readonly showTemplate: WritableSignal<boolean> = signal(false);
  public selection: OrganizationChartNode | OrganizationChartNode[] | null = null;
  public lastSelectEvent: OrganizationChartNodeSelectEvent | null = null;
  public lastUnselectEvent: OrganizationChartNodeSelectEvent | null = null;
  public lastExpandEvent: OrganizationChartNodeExpandEvent | null = null;
  public lastCollapseEvent: OrganizationChartNodeExpandEvent | null = null;

  public onNodeSelect(event: OrganizationChartNodeSelectEvent): void {
    this.lastSelectEvent = event;
  }
  public onNodeUnselect(event: OrganizationChartNodeSelectEvent): void {
    this.lastUnselectEvent = event;
  }
  public onNodeExpand(event: OrganizationChartNodeExpandEvent): void {
    this.lastExpandEvent = event;
  }
  public onNodeCollapse(event: OrganizationChartNodeExpandEvent): void {
    this.lastCollapseEvent = event;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function setup(): Promise<ComponentFixture<TestHostComponent>> {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();

  const fixture: ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

function getNodeCells(fixture: ComponentFixture<TestHostComponent>): HTMLElement[] {
  return Array.from(
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.uilib-org-chart-node-cell'
    )
  );
}

function getNodeCell(
  fixture: ComponentFixture<TestHostComponent>,
  label: string
): HTMLElement | null {
  const cells: HTMLElement[] = getNodeCells(fixture);
  return cells.find((cell: HTMLElement): boolean => cell.textContent.includes(label)) ?? null;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('OrganizationChart', (): void => {
  // ─── Rendering ──────────────────────────────────────────────────────────────

  describe('Rendering', (): void => {
    it('renders root nodes from value input', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      expect(getNodeCell(fixture, 'CEO')).toBeTruthy();
    });

    it('renders nested children recursively', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      expect(getNodeCell(fixture, 'VP Engineering')).toBeTruthy();
      expect(getNodeCell(fixture, 'Developer 1')).toBeTruthy();
      expect(getNodeCell(fixture, 'Developer 2')).toBeTruthy();
    });

    it('renders fallback label when no custom template provided', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const cell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      expect(cell?.querySelector('.uilib-org-chart-node-label')).toBeTruthy();
    });

    it('renders custom nodeTemplate when provided', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.showTemplate.set(true);
      fixture.detectChanges();
      await fixture.whenStable();
      const customLabels: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll('.custom-label');
      expect(customLabels.length).toBeGreaterThan(0);
      expect(customLabels[0]!.textContent).toContain('custom:');
    });

    it('applies variant host class', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-organization-chart'
      )!;
      expect(host.classList).toContain('ui-lib-organization-chart--variant-material');
    });

    it('updates variant host class when variant input changes', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.variant.set('bootstrap');
      fixture.detectChanges();
      await fixture.whenStable();
      const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-organization-chart'
      )!;
      expect(host.classList).toContain('ui-lib-organization-chart--variant-bootstrap');
    });

    it('renders empty chart when value is empty', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.value.set([]);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(getNodeCells(fixture).length).toBe(0);
    });
  });

  // ─── ARIA ────────────────────────────────────────────────────────────────────

  describe('ARIA', (): void => {
    it('root element has role="tree"', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const host: HTMLElement = (fixture.nativeElement as HTMLElement).querySelector(
        'ui-lib-organization-chart'
      )!;
      expect(host.getAttribute('role')).toBe('tree');
    });

    it('node cells have role="treeitem"', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const treeItems: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll('[role="treeitem"]');
      expect(treeItems.length).toBeGreaterThan(0);
    });

    it('nodes with children have aria-expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      expect(ceoCell?.getAttribute('aria-expanded')).toBe('true');
    });

    it('leaf nodes do not have aria-expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const leafCell: HTMLElement | null = getNodeCell(fixture, 'Developer 1');
      expect(leafCell?.getAttribute('aria-expanded')).toBeNull();
    });

    it('nodes have aria-selected=null when selectionMode is null', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      expect(ceoCell?.getAttribute('aria-selected')).toBeNull();
    });

    it('nodes have aria-selected when selectionMode is single', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('single');
      fixture.detectChanges();
      await fixture.whenStable();
      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      expect(ceoCell?.getAttribute('aria-selected')).toBe('false');
    });
  });

  // ─── Expand / collapse ───────────────────────────────────────────────────────

  describe('Expand / Collapse', (): void => {
    it('children are visible when node.expanded is true', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      expect(getNodeCell(fixture, 'Developer 1')).toBeTruthy();
    });

    it('children are hidden when node.expanded is false', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const nodes: OrganizationChartNode[] = [
        {
          key: 'root',
          label: 'Root',
          expanded: false,
          children: [{ key: 'child', label: 'Hidden Child' }],
        },
      ];
      fixture.componentInstance.value.set(nodes);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(getNodeCell(fixture, 'Hidden Child')).toBeNull();
    });

    it('does not render toggle button when collapsible is false', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const toggleBtns: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll('.uilib-org-chart-toggle-btn');
      expect(toggleBtns.length).toBe(0);
    });

    it('renders toggle buttons when collapsible is true', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.collapsible.set(true);
      fixture.detectChanges();
      await fixture.whenStable();
      const toggleBtns: NodeListOf<HTMLElement> = (
        fixture.nativeElement as HTMLElement
      ).querySelectorAll('.uilib-org-chart-toggle-btn');
      expect(toggleBtns.length).toBeGreaterThan(0);
    });

    it('clicking toggle button collapses an expanded node', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.collapsible.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      // CEO toggle: click to collapse
      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      const toggleBtn: HTMLElement | null =
        ceoCell?.querySelector('.uilib-org-chart-toggle-btn') ?? null;
      toggleBtn?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(getNodeCell(fixture, 'VP Engineering')).toBeNull();
    });

    it('emits nodeCollapse when a node is collapsed', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.collapsible.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      const toggleBtn: HTMLElement | null =
        ceoCell?.querySelector('.uilib-org-chart-toggle-btn') ?? null;
      toggleBtn?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.lastCollapseEvent?.node.key).toBe('ceo');
    });

    it('emits nodeExpand when a collapsed node is expanded', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const nodes: OrganizationChartNode[] = [
        {
          key: 'root',
          label: 'Root',
          expanded: false,
          children: [{ key: 'child', label: 'Child' }],
        },
      ];
      fixture.componentInstance.value.set(nodes);
      fixture.componentInstance.collapsible.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const rootCell: HTMLElement | null = getNodeCell(fixture, 'Root');
      const toggleBtn: HTMLElement | null =
        rootCell?.querySelector('.uilib-org-chart-toggle-btn') ?? null;
      toggleBtn?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.lastExpandEvent?.node.key).toBe('root');
    });
  });

  // ─── Selection — null mode ──────────────────────────────────────────────────

  describe('Selection (null mode)', (): void => {
    it('clicking a node does nothing when selectionMode is null', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      ceoCell?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.selection).toBeNull();
      expect(fixture.componentInstance.lastSelectEvent).toBeNull();
    });

    it('node cells do not have selectable class when selectionMode is null', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      expect(ceoCell?.classList).not.toContain('uilib-org-chart-node-cell--selectable');
    });
  });

  // ─── Selection — single mode ────────────────────────────────────────────────

  describe('Selection (single mode)', (): void => {
    it('clicking a node selects it', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('single');
      fixture.detectChanges();
      await fixture.whenStable();

      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      ceoCell?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.lastSelectEvent?.node.key).toBe('ceo');
    });

    it('clicking a selected node deselects it', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('single');
      fixture.detectChanges();
      await fixture.whenStable();

      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      ceoCell?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      ceoCell?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.lastUnselectEvent?.node.key).toBe('ceo');
    });

    it('clicking a different node replaces selection', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('single');
      fixture.detectChanges();
      await fixture.whenStable();

      getNodeCell(fixture, 'CEO')?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      getNodeCell(fixture, 'VP Engineering')?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.lastSelectEvent?.node.key).toBe('vp-eng');
    });

    it('selected node gets selected CSS class', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('single');
      fixture.detectChanges();
      await fixture.whenStable();

      const ceoCell: HTMLElement | null = getNodeCell(fixture, 'CEO');
      ceoCell?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(ceoCell?.classList).toContain('uilib-org-chart-node-cell--selected');
    });
  });

  // ─── Selection — multiple mode ──────────────────────────────────────────────

  describe('Selection (multiple mode)', (): void => {
    it('clicking adds nodes to the selection array', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('multiple');
      fixture.detectChanges();
      await fixture.whenStable();

      getNodeCell(fixture, 'CEO')?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      getNodeCell(fixture, 'VP Engineering')?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.lastSelectEvent?.node.key).toBe('vp-eng');
    });

    it('clicking a selected node removes it from the selection array', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('multiple');
      fixture.detectChanges();
      await fixture.whenStable();

      getNodeCell(fixture, 'CEO')?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      getNodeCell(fixture, 'CEO')?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.lastUnselectEvent?.node.key).toBe('ceo');
    });
  });

  // ─── Non-selectable nodes ────────────────────────────────────────────────────

  describe('Non-selectable nodes', (): void => {
    it('nodes with selectable=false cannot be selected', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('single');
      fixture.componentInstance.value.set([
        { key: 'ns', label: 'Non-selectable', selectable: false },
      ]);
      fixture.detectChanges();
      await fixture.whenStable();

      getNodeCell(fixture, 'Non-selectable')?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.lastSelectEvent).toBeNull();
    });

    it('nodes with selectable=false do not get selectable CSS class', async (): Promise<void> => {
      const fixture: ComponentFixture<TestHostComponent> = await setup();
      fixture.componentInstance.selectionMode.set('single');
      fixture.componentInstance.value.set([
        { key: 'ns', label: 'Non-selectable', selectable: false },
      ]);
      fixture.detectChanges();
      await fixture.whenStable();

      const cell: HTMLElement | null = getNodeCell(fixture, 'Non-selectable');
      expect(cell?.classList).not.toContain('uilib-org-chart-node-cell--selectable');
    });
  });
});
