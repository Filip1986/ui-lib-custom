import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type {
  TreeNode,
  TreeSelectSelectionMode,
  TreeSelectVariant,
} from 'ui-lib-custom/tree-select';
import {
  basicHtml,
  basicTs,
  multipleHtml,
  multipleTs,
  checkboxHtml,
  checkboxTs,
  filterHtml,
  filterTs,
  sizesHtml,
  sizesTs,
  variantsHtml,
  variantsTs,
  showClearHtml,
  showClearTs,
  disabledHtml,
  disabledTs,
  loadingHtml,
  loadingTs,
  ngModelHtml,
  ngModelTs,
  reactiveHtml,
  reactiveTs,
} from './snippets.generated';

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
    TreeSelect,
    DocCodeExampleComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './tree-select-demo.component.html',
  styleUrl: './tree-select-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly multipleHtml: string = multipleHtml;
  public readonly multipleTs: string = multipleTs;
  public readonly checkboxHtml: string = checkboxHtml;
  public readonly checkboxTs: string = checkboxTs;
  public readonly filterHtml: string = filterHtml;
  public readonly filterTs: string = filterTs;
  public readonly sizesHtml: string = sizesHtml;
  public readonly sizesTs: string = sizesTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly showClearHtml: string = showClearHtml;
  public readonly showClearTs: string = showClearTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly loadingHtml: string = loadingHtml;
  public readonly loadingTs: string = loadingTs;
  public readonly ngModelHtml: string = ngModelHtml;
  public readonly ngModelTs: string = ngModelTs;
  public readonly reactiveHtml: string = reactiveHtml;
  public readonly reactiveTs: string = reactiveTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'nodes',
      type: 'TreeNode[]',
      default: '[]',
      description: 'Root nodes of the selection tree.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
    { name: 'placeholder', type: 'string', default: "'Select'", description: 'Placeholder text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading state.' },
    { name: 'filter', type: 'boolean', default: 'false', description: 'Enables an inline filter.' },
    {
      name: 'filterPlaceholder',
      type: 'string',
      default: "'Search...'",
      description: 'Filter input placeholder.',
    },
    { name: 'showClear', type: 'boolean', default: 'false', description: 'Shows a clear button.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Marks as invalid.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Marks as required.' },
    {
      name: 'emptyMessage',
      type: 'string',
      default: "'No results'",
      description: 'Message shown when there are no nodes.',
    },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
    {
      name: 'ariaLabelledBy',
      type: 'string | null',
      default: 'null',
      description: 'Id of an external label.',
    },
  ];

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
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
    { id: 'api', label: 'API Reference' },
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

  public onSelectionChange(value: unknown): void {
    // Selection change logged via event binding in template
    void value;
  }

  /** Returns the snippet string for a given key (guaranteed non-undefined for templates). */

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Enter / Space', suffix: 'on trigger', action: 'Opens or closes the tree panel.' },
    { key: '↓ / ↑', suffix: 'in panel', action: 'Move focus between visible tree nodes.' },
    { key: '→', suffix: 'in panel', action: 'Expand a collapsed node.' },
    { key: '←', suffix: 'in panel', action: 'Collapse an expanded node or move to parent.' },
    { key: 'Enter / Space', suffix: 'on node', action: 'Select the focused node.' },
    { key: 'Escape', action: 'Closes the panel and returns focus to the trigger.' },
  ];
}
