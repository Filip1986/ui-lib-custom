import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Tree } from 'ui-lib-custom/tree';
import { TreeNodeTemplateDirective } from 'ui-lib-custom/tree';
import type { TreeNode, TreeSelectionMode } from 'ui-lib-custom/tree';

/**
 * Demo page for the Tree component.
 * Showcases: basic tree, single/multiple/checkbox selection, filter,
 * lazy-expand placeholder, icons, custom templates, and all three variants.
 */
@Component({
  selector: 'app-tree-demo',
  standalone: true,
  imports: [Tree, TreeNodeTemplateDirective],
  templateUrl: './tree-demo.component.html',
  styleUrl: './tree-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent {
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
    mode: TreeSelectionMode
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
}
