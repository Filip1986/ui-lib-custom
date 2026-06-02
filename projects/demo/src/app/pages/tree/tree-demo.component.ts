import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Tree } from 'ui-lib-custom/tree';
import { TreeNodeTemplateDirective } from 'ui-lib-custom/tree';
import type { TreeNode, TreeSelectionMode } from 'ui-lib-custom/tree';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Tree component.
 * Showcases: basic tree, single/multiple/checkbox selection, filter,
 * lazy-expand placeholder, icons, custom templates, and all three variants.
 */
@Component({
  selector: 'app-tree-demo',
  standalone: true,
  imports: [
    Tree,
    TreeNodeTemplateDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './tree-demo.component.html',
  styleUrl: './tree-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 8,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Tree } from 'ui-lib-custom/tree'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-tree', label: 'Basic Tree' },
    { id: 'single-selection', label: 'Single Selection' },
    { id: 'multiple-selection', label: 'Multiple Selection' },
    { id: 'checkbox-selection', label: 'Checkbox Selection' },
    { id: 'filter', label: 'Filter' },
    { id: 'custom-node-template', label: 'Custom Node Template' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    { name: 'value', type: 'TreeNode[]', default: '[]', description: 'Array of root tree nodes.' },
    {
      name: 'selectionMode',
      type: "'single' | 'multiple' | 'checkbox' | null",
      default: 'null',
      description: 'Node selection mode.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tree size.' },
    { name: 'filter', type: 'boolean', default: 'false', description: 'Shows a filter input.' },
    {
      name: 'filterBy',
      type: 'string',
      default: "'label'",
      description: 'Node property to filter on.',
    },
    {
      name: 'filterMode',
      type: "'lenient' | 'strict'",
      default: "'lenient'",
      description: 'Filter matching strategy.',
    },
    {
      name: 'filterPlaceholder',
      type: 'string',
      default: "'Search...'",
      description: 'Filter input placeholder.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "''",
      description: 'Accessible label for the tree.',
    },
    { name: 'styleClass', type: 'string', default: "''", description: 'Additional CSS class.' },
  ];

  // ─── File-system demo data ────────────────────────────────────────────────

  public readonly fileSystemNodes: TreeNode[] = [
    {
      key: '0',
      label: 'Documents',
      icon: 'pi pi-folder',
      expanded: true,
      children: [
        {
          key: '0-0',
          label: 'Work',
          icon: 'pi pi-folder',
          expanded: true,
          children: [
            { key: '0-0-0', label: 'Expenses.xlsx', icon: 'pi pi-file', leaf: true },
            { key: '0-0-1', label: 'Resume.docx', icon: 'pi pi-file', leaf: true },
          ],
        },
        {
          key: '0-1',
          label: 'Home',
          icon: 'pi pi-folder',
          children: [{ key: '0-1-0', label: 'Invoices.xlsx', icon: 'pi pi-file', leaf: true }],
        },
      ],
    },
    {
      key: '1',
      label: 'Pictures',
      icon: 'pi pi-folder',
      children: [
        { key: '1-0', label: 'barcelona.jpg', icon: 'pi pi-image', leaf: true },
        { key: '1-1', label: 'primeng.png', icon: 'pi pi-image', leaf: true },
        { key: '1-2', label: 'optimus.jpg', icon: 'pi pi-image', leaf: true },
      ],
    },
    {
      key: '2',
      label: 'Movies',
      icon: 'pi pi-folder',
      children: [
        {
          key: '2-0',
          label: 'Al Pacino',
          children: [
            { key: '2-0-0', label: 'Scarface.mkv', icon: 'pi pi-video', leaf: true },
            { key: '2-0-1', label: 'Serpico.avi', icon: 'pi pi-video', leaf: true },
          ],
        },
        {
          key: '2-1',
          label: 'Robert De Niro',
          children: [
            { key: '2-1-0', label: 'Goodfellas.avi', icon: 'pi pi-video', leaf: true },
            { key: '2-1-1', label: 'Untouchables.mkv', icon: 'pi pi-video', leaf: true },
          ],
        },
      ],
    },
  ];

  // ─── Selection state ──────────────────────────────────────────────────────

  public readonly singleSelection: WritableSignal<TreeNode | null> = signal<TreeNode | null>(null);

  public readonly multipleSelection: WritableSignal<TreeNode[]> = signal<TreeNode[]>([]);

  public readonly checkboxSelection: WritableSignal<TreeNode[]> = signal<TreeNode[]>([]);

  // ─── Country hierarchy (for filter demo) ─────────────────────────────────

  public readonly countryNodes: TreeNode[] = [
    {
      key: 'eu',
      label: 'Europe',
      expanded: true,
      children: [
        {
          key: 'eu-de',
          label: 'Germany',
          children: [
            { key: 'eu-de-ber', label: 'Berlin', leaf: true },
            { key: 'eu-de-muc', label: 'Munich', leaf: true },
          ],
        },
        {
          key: 'eu-fr',
          label: 'France',
          children: [
            { key: 'eu-fr-par', label: 'Paris', leaf: true },
            { key: 'eu-fr-lyo', label: 'Lyon', leaf: true },
          ],
        },
        {
          key: 'eu-ro',
          label: 'Romania',
          children: [
            { key: 'eu-ro-buc', label: 'Bucharest', leaf: true },
            { key: 'eu-ro-clu', label: 'Cluj-Napoca', leaf: true },
          ],
        },
      ],
    },
    {
      key: 'asia',
      label: 'Asia',
      children: [
        {
          key: 'asia-jp',
          label: 'Japan',
          children: [
            { key: 'asia-jp-tok', label: 'Tokyo', leaf: true },
            { key: 'asia-jp-osa', label: 'Osaka', leaf: true },
          ],
        },
        {
          key: 'asia-cn',
          label: 'China',
          children: [
            { key: 'asia-cn-bei', label: 'Beijing', leaf: true },
            { key: 'asia-cn-sha', label: 'Shanghai', leaf: true },
          ],
        },
      ],
    },
  ];

  // ─── Custom template data ─────────────────────────────────────────────────

  public readonly customTemplateNodes: TreeNode[] = [
    {
      key: 'fe',
      label: 'Frontend',
      type: 'department',
      expanded: true,
      children: [
        { key: 'fe-1', label: 'React', type: 'tech', leaf: true },
        { key: 'fe-2', label: 'Angular', type: 'tech', leaf: true },
        { key: 'fe-3', label: 'Vue', type: 'tech', leaf: true },
      ],
    },
    {
      key: 'be',
      label: 'Backend',
      type: 'department',
      expanded: true,
      children: [
        { key: 'be-1', label: 'Node.js', type: 'tech', leaf: true },
        { key: 'be-2', label: 'Django', type: 'tech', leaf: true },
        { key: 'be-3', label: 'Spring Boot', type: 'tech', leaf: true },
      ],
    },
  ];

  // ─── Variant demo ─────────────────────────────────────────────────────────

  public readonly variantNodes: TreeNode[] = [
    {
      key: 'v-root',
      label: 'Root Node',
      expanded: true,
      children: [
        {
          key: 'v-a',
          label: 'Branch A',
          expanded: true,
          children: [
            { key: 'v-a-1', label: 'Leaf A1', leaf: true },
            { key: 'v-a-2', label: 'Leaf A2', leaf: true },
          ],
        },
        { key: 'v-b', label: 'Branch B', leaf: true },
      ],
    },
  ];

  public readonly variantSelection: WritableSignal<TreeNode | null> = signal<TreeNode | null>(null);

  // ─── Helpers ──────────────────────────────────────────────────────────────

  public getSelectionLabel(
    selection: TreeNode | TreeNode[] | null,
    mode: TreeSelectionMode,
  ): string {
    if (!selection) {
      return 'None';
    }
    if (mode === 'single') {
      return (selection as TreeNode).label ?? '—';
    }
    const nodes: TreeNode[] = selection as TreeNode[];
    if (nodes.length === 0) {
      return 'None';
    }
    return nodes.map((n: TreeNode): string => n.label ?? '—').join(', ');
  }

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Tree container',
      attribute: 'role',
      value: '"tree"',
      notes: 'The root element uses the tree role.',
    },
    {
      element: 'Tree container',
      attribute: 'aria-label',
      value: 'string',
      notes: 'Set via <code>[ariaLabel]</code> to name the tree for assistive technologies.',
    },
    {
      element: 'Tree node',
      attribute: 'role',
      value: '"treeitem"',
      notes: 'Each node in the tree is a treeitem.',
    },
    {
      element: 'Tree node (expandable)',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Reflects the expanded/collapsed state of a parent node.',
    },
    {
      element: 'Tree node (selectable)',
      attribute: 'aria-selected',
      value: '"true" | "false"',
      notes: 'Reflects the selection state of a node.',
    },
    {
      element: 'Tree node group',
      attribute: 'role',
      value: '"group"',
      notes: 'Child node containers use the group role.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: '↓ / ↑', action: 'Move focus between visible tree nodes.' },
    { key: '→', action: 'Expand a collapsed node; move into first child if already expanded.' },
    {
      key: '←',
      action: 'Collapse an expanded node; move focus to the parent node if already collapsed.',
    },
    { key: 'Enter / Space', action: 'Select the focused node (respects selection mode).' },
    { key: 'Home / End', action: 'Move focus to the first or last visible node.' },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-tree-font-size', description: 'Font size.' },
    { variable: '--uilib-tree-line-height', description: 'Line height.' },
    { variable: '--uilib-tree-row-gap', description: 'Row gap.' },
    { variable: '--uilib-tree-node-padding-y', description: 'Node vertical padding.' },
    { variable: '--uilib-tree-node-padding-x', description: 'Node horizontal padding.' },
    { variable: '--uilib-tree-node-border-radius', description: 'Node Border border radius.' },
    { variable: '--uilib-tree-node-bg', description: 'Node background colour.' },
    { variable: '--uilib-tree-node-bg-hover', description: 'Node background colour (hover).' },
    { variable: '--uilib-tree-node-color', description: 'Node text colour.' },
    {
      variable: '--uilib-tree-node-bg-selected',
      description: 'Node background colour (selected).',
    },
    { variable: '--uilib-tree-node-color-selected', description: 'Node text colour (selected).' },
    { variable: '--uilib-tree-toggle-size', description: 'Toggle button size.' },
    { variable: '--uilib-tree-toggle-color', description: 'Toggle icon colour.' },
    { variable: '--uilib-tree-toggle-bg-hover', description: 'Toggle background colour (hover).' },
    { variable: '--uilib-tree-checkbox-size', description: 'Checkbox size.' },
    { variable: '--uilib-tree-checkbox-border', description: 'Checkbox border shorthand.' },
    { variable: '--uilib-tree-checkbox-bg', description: 'Checkbox background colour.' },
    {
      variable: '--uilib-tree-checkbox-bg-checked',
      description: 'Checkbox background colour (checked).',
    },
    {
      variable: '--uilib-tree-checkbox-border-checked',
      description: 'Checkbox border shorthand (checked).',
    },
    {
      variable: '--uilib-tree-checkbox-color-checked',
      description: 'Checkbox text colour (checked).',
    },
    { variable: '--uilib-tree-filter-border', description: 'Filter border shorthand.' },
    { variable: '--uilib-tree-filter-border-radius', description: 'Filter Border border radius.' },
    { variable: '--uilib-tree-filter-bg', description: 'Filter background colour.' },
    { variable: '--uilib-tree-filter-color', description: 'Filter text colour.' },
    { variable: '--uilib-tree-filter-padding', description: 'Filter padding.' },
    {
      variable: '--uilib-tree-filter-border-focus',
      description: 'Filter border shorthand (focus).',
    },
    { variable: '--uilib-tree-connector-color', description: 'Connector text colour.' },
    { variable: '--uilib-tree-connector-width', description: 'Connector width.' },
  ];
}
