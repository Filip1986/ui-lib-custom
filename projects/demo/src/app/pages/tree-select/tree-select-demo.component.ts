import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '@demo/shared/components/code-preview/code-preview.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type {
  TreeNode,
  TreeSelectSelectionMode,
  TreeSelectVariant,
} from 'ui-lib-custom/tree-select';

const SAMPLE_TREE_NODES: TreeNode[] = [
  {
    key: 'documents',
    label: 'Documents',
    icon: 'pi pi-folder',
    expanded: true,
    children: [
      {
        key: 'work',
        label: 'Work',
        icon: 'pi pi-folder',
        children: [
          { key: 'expenses', label: 'Expenses.xlsx', icon: 'pi pi-file' },
          { key: 'resume', label: 'Resume.docx', icon: 'pi pi-file' },
        ],
      },
      {
        key: 'personal',
        label: 'Personal',
        icon: 'pi pi-folder',
        children: [
          { key: 'notes', label: 'Notes.txt', icon: 'pi pi-file' },
          { key: 'photos', label: 'Vacation.jpg', icon: 'pi pi-image' },
        ],
      },
    ],
  },
  {
    key: 'downloads',
    label: 'Downloads',
    icon: 'pi pi-folder',
    children: [
      { key: 'installer', label: 'installer.exe', icon: 'pi pi-file' },
      { key: 'archive', label: 'archive.zip', icon: 'pi pi-file' },
    ],
  },
  {
    key: 'music',
    label: 'Music',
    icon: 'pi pi-folder',
    children: [
      { key: 'favorites', label: 'Favorites', icon: 'pi pi-folder' },
      { key: 'playlists', label: 'Playlists', icon: 'pi pi-folder' },
    ],
  },
];

/**
 * Demo page for the TreeSelect component.
 */
@Component({
  selector: 'app-tree-select-demo',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    CodePreviewComponent,
    TreeSelect,
  ],
  templateUrl: './tree-select-demo.component.html',
  styleUrl: './tree-select-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectDemoComponent {
  public readonly sections: DocSection[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'multiple', label: 'Multiple Selection' },
    { id: 'checkbox', label: 'Checkbox Selection' },
    { id: 'filter', label: 'Filter' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'show-clear', label: 'Show Clear' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'loading', label: 'Loading' },
    { id: 'ngModel', label: 'ngModel' },
    { id: 'reactive', label: 'Reactive Forms' },
  ];

  public readonly nodes: TreeNode[] = SAMPLE_TREE_NODES;

  // Basic single selection
  public readonly singleSelection: WritableSignal<TreeNode | null> = signal<TreeNode | null>(null);

  // Multiple selection
  public readonly multipleSelection: WritableSignal<TreeNode[]> = signal<TreeNode[]>([]);

  // Checkbox selection
  public readonly checkboxSelection: WritableSignal<TreeNode[]> = signal<TreeNode[]>([]);

  // Variants
  public readonly variantNodes: TreeNode[] = SAMPLE_TREE_NODES;
  public readonly variantSelections: Record<TreeSelectVariant, WritableSignal<TreeNode | null>> = {
    material: signal<TreeNode | null>(null),
    bootstrap: signal<TreeNode | null>(null),
    minimal: signal<TreeNode | null>(null),
  };

  // Sizes
  public readonly sizeSmSelection: WritableSignal<TreeNode | null> = signal<TreeNode | null>(null);
  public readonly sizeMdSelection: WritableSignal<TreeNode | null> = signal<TreeNode | null>(null);
  public readonly sizeLgSelection: WritableSignal<TreeNode | null> = signal<TreeNode | null>(null);

  // ngModel
  public ngModelValue: TreeNode | null = null;

  // Reactive Forms
  public readonly reactiveForm: FormGroup = new FormGroup({
    selectedNode: new FormControl<TreeNode | null>(null),
    multipleNodes: new FormControl<TreeNode[]>([]),
  });

  // Show clear
  public readonly clearableSelection: WritableSignal<TreeNode | null> = signal<TreeNode | null>(
    null
  );

  // Playground
  public readonly playgroundSelectionMode: WritableSignal<TreeSelectSelectionMode> =
    signal<TreeSelectSelectionMode>('single');
  public readonly playgroundVariant: WritableSignal<TreeSelectVariant> =
    signal<TreeSelectVariant>('material');
  public readonly playgroundSelection: WritableSignal<TreeNode | TreeNode[] | null> = signal<
    TreeNode | TreeNode[] | null
  >(null);

  public readonly snippets: Readonly<Record<string, string>> = {
    basic: `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="single"
  placeholder="Select a file..."
  [(selection)]="selectedNode"
/>`,
    multiple: `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="multiple"
  placeholder="Select files..."
  [(selection)]="selectedNodes"
/>`,
    checkbox: `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="checkbox"
  placeholder="Select items..."
  [(selection)]="checkedNodes"
/>`,
    filter: `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="single"
  [filter]="true"
  filterPlaceholder="Search files..."
  placeholder="Select a file..."
  [(selection)]="selectedNode"
/>`,
    sizes: `<ui-lib-tree-select [nodes]="nodes" size="sm" placeholder="Small" />
<ui-lib-tree-select [nodes]="nodes" size="md" placeholder="Medium" />
<ui-lib-tree-select [nodes]="nodes" size="lg" placeholder="Large" />`,
    variants: `<ui-lib-tree-select [nodes]="nodes" variant="material" placeholder="Material" />
<ui-lib-tree-select [nodes]="nodes" variant="bootstrap" placeholder="Bootstrap" />
<ui-lib-tree-select [nodes]="nodes" variant="minimal" placeholder="Minimal" />`,
    showClear: `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="single"
  [showClear]="true"
  placeholder="Select a file..."
  [(selection)]="selectedNode"
/>`,
    disabled: `<ui-lib-tree-select
  [nodes]="nodes"
  [disabled]="true"
  placeholder="Disabled"
/>`,
    loading: `<ui-lib-tree-select
  [nodes]="nodes"
  [loading]="true"
  placeholder="Loading..."
/>`,
    ngModel: `<ui-lib-tree-select
  [nodes]="nodes"
  [(ngModel)]="selectedNode"
  placeholder="Select a file..."
/>`,
    reactive: `<form [formGroup]="form">
  <ui-lib-tree-select
    [nodes]="nodes"
    formControlName="selectedNode"
    placeholder="Select a file..."
  />
</form>`,
  };

  public onSelectionChange(value: unknown): void {
    // Selection change logged via event binding in template
    void value;
  }

  /** Returns the snippet string for a given key (guaranteed non-undefined for templates). */
  public snippet(key: string): string {
    return this.snippets[key] ?? '';
  }
}
