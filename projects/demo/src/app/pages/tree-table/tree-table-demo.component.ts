import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { TreeTableComponent } from 'ui-lib-custom/tree-table';
import { TreeTableColumnComponent } from 'ui-lib-custom/tree-table';
import { TreeTableColumnBodyDirective } from 'ui-lib-custom/tree-table';
import type {
  TreeTableNode,
  TreeTableSelectionMode,
  TreeTableVariant,
} from 'ui-lib-custom/tree-table';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

/**
 * Demo page for the TreeTable component.
 * Showcases: basic table, expand/collapse, sorting, global filter,
 * single/multiple/checkbox selection, custom cell templates, all three variants.
 */
@Component({
  selector: 'app-tree-table-demo',
  standalone: true,
  imports: [
    TreeTableComponent,
    TreeTableColumnComponent,
    TreeTableColumnBodyDirective,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './tree-table-demo.component.html',
  styleUrl: './tree-table-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeTableDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { TreeTableComponent } from 'ui-lib-custom/tree-table'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'sorting', label: 'Sorting' },
    { id: 'global-filter', label: 'Global Filter' },
    { id: 'selection-modes', label: 'Selection Modes' },
    { id: 'custom-cell-templates', label: 'Custom Cell Templates' },
    { id: 'organisation-data', label: 'Organisation Data' },
    { id: 'sizes', label: 'Sizes' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  // ─── Active variant + size ────────────────────────────────────────────────

  public readonly activeVariant: WritableSignal<TreeTableVariant> =
    signal<TreeTableVariant>('material');

  // ─── Selection state ──────────────────────────────────────────────────────

  public readonly selectionMode: WritableSignal<TreeTableSelectionMode> =
    signal<TreeTableSelectionMode>('single');

  public singleSelection: TreeTableNode | null = null;
  public multipleSelection: TreeTableNode[] = [];
  public checkboxSelection: TreeTableNode[] = [];

  // ─── File system data ─────────────────────────────────────────────────────

  public readonly fileSystemNodes: TreeTableNode[] = [
    {
      key: '0',
      data: { name: 'Documents', size: '--', type: 'Folder', date: '2024-01-15' },
      expanded: true,
      children: [
        {
          key: '0-0',
          data: { name: 'Work', size: '--', type: 'Folder', date: '2024-01-15' },
          expanded: true,
          children: [
            {
              key: '0-0-0',
              data: {
                name: 'Expenses.xlsx',
                size: '36 KB',
                type: 'Spreadsheet',
                date: '2024-03-02',
              },
              leaf: true,
            },
            {
              key: '0-0-1',
              data: { name: 'Resume.docx', size: '125 KB', type: 'Document', date: '2024-04-10' },
              leaf: true,
            },
          ],
        },
        {
          key: '0-1',
          data: { name: 'Personal', size: '--', type: 'Folder', date: '2024-02-20' },
          children: [
            {
              key: '0-1-0',
              data: { name: 'Invoices.pdf', size: '48 KB', type: 'PDF', date: '2024-02-20' },
              leaf: true,
            },
          ],
        },
      ],
    },
    {
      key: '1',
      data: { name: 'Pictures', size: '--', type: 'Folder', date: '2023-11-01' },
      children: [
        {
          key: '1-0',
          data: { name: 'Photos 2023', size: '--', type: 'Folder', date: '2023-11-01' },
          children: [
            {
              key: '1-0-0',
              data: { name: 'barcelona.jpg', size: '1.2 MB', type: 'Image', date: '2023-09-14' },
              leaf: true,
            },
            {
              key: '1-0-1',
              data: { name: 'mountain.jpg', size: '2.4 MB', type: 'Image', date: '2023-07-22' },
              leaf: true,
            },
          ],
        },
      ],
    },
    {
      key: '2',
      data: { name: 'Downloads', size: '--', type: 'Folder', date: '2024-04-01' },
      children: [
        {
          key: '2-0',
          data: { name: 'setup.exe', size: '82 MB', type: 'Executable', date: '2024-04-01' },
          leaf: true,
        },
        {
          key: '2-1',
          data: { name: 'archive.zip', size: '450 MB', type: 'Archive', date: '2024-03-28' },
          leaf: true,
        },
      ],
    },
  ];

  // ─── Company org data (used for the variants demo) ────────────────────────

  public readonly orgNodes: TreeTableNode[] = [
    {
      key: 'root',
      data: { department: 'Engineering', headcount: 42, budget: '$2.1M', location: 'Remote' },
      expanded: true,
      children: [
        {
          key: 'fe',
          data: { department: 'Frontend', headcount: 14, budget: '$700K', location: 'Remote' },
          expanded: true,
          children: [
            {
              key: 'fe-1',
              data: { department: 'UI Team', headcount: 7, budget: '$350K', location: 'Berlin' },
              leaf: true,
            },
            {
              key: 'fe-2',
              data: {
                department: 'Design System',
                headcount: 7,
                budget: '$350K',
                location: 'London',
              },
              leaf: true,
            },
          ],
        },
        {
          key: 'be',
          data: { department: 'Backend', headcount: 18, budget: '$900K', location: 'Remote' },
          children: [
            {
              key: 'be-1',
              data: { department: 'API Team', headcount: 9, budget: '$450K', location: 'Lisbon' },
              leaf: true,
            },
            {
              key: 'be-2',
              data: { department: 'Platform', headcount: 9, budget: '$450K', location: 'Remote' },
              leaf: true,
            },
          ],
        },
        {
          key: 'qa',
          data: { department: 'QA', headcount: 10, budget: '$500K', location: 'Remote' },
          leaf: true,
        },
      ],
    },
  ];

  // ─── Variant buttons ──────────────────────────────────────────────────────

  public setVariant(variant: TreeTableVariant): void {
    this.activeVariant.set(variant);
  }

  public setSelectionMode(mode: TreeTableSelectionMode): void {
    this.selectionMode.set(mode);
    // Reset all selections when switching modes
    this.singleSelection = null;
    this.multipleSelection = [];
    this.checkboxSelection = [];
  }

  public getSelectionLabel(): string {
    const mode: TreeTableSelectionMode = this.selectionMode();
    if (mode === 'single') {
      return this.singleSelection
        ? String((this.singleSelection.data as Record<string, unknown>)['name'] ?? '')
        : 'None';
    }
    if (mode === 'multiple') {
      return this.multipleSelection.length > 0
        ? this.multipleSelection
            .map((node: TreeTableNode): string =>
              String((node.data as Record<string, unknown>)['name'] ?? '')
            )
            .join(', ')
        : 'None';
    }
    if (mode === 'checkbox') {
      return this.checkboxSelection.length > 0
        ? `${this.checkboxSelection.length} item(s) selected`
        : 'None';
    }
    return 'Selection disabled';
  }

  public getTypeIconClass(type: string): string {
    const iconMap: Record<string, string> = {
      Folder: 'pi pi-folder',
      PDF: 'pi pi-file-pdf',
      Spreadsheet: 'pi pi-file-excel',
      Document: 'pi pi-file-word',
      Image: 'pi pi-image',
      Executable: 'pi pi-cog',
      Archive: 'pi pi-file',
    };
    return iconMap[type] ?? 'pi pi-file';
  }
}
