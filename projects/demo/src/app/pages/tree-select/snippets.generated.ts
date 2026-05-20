/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="single"
  placeholder="Select a file..."
  [(selection)]="selectedNode"
/>`;

export const basicTs = `import { Component, signal } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'documents', label: 'Documents', children: [
      { key: 'resume', label: 'Resume.docx' },
    ] },
  ];
  public readonly selectedNode = signal<TreeNode | null>(null);
}`;

export const checkboxHtml = `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="checkbox"
  placeholder="Select items..."
  [(selection)]="checkedNodes"
/>`;

export const checkboxTs = `import { Component, signal } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './checkbox.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'documents', label: 'Documents', children: [
      { key: 'resume', label: 'Resume.docx' },
    ] },
  ];
  public readonly checkedNodes = signal<TreeNode[]>([]);
}`;

export const disabledHtml = `<ui-lib-tree-select
  [nodes]="nodes"
  [disabled]="true"
  placeholder="Disabled"
/>`;

export const disabledTs = `import { Component } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [{ key: 'a', label: 'Item A' }];
}`;

export const filterHtml = `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="single"
  [filter]="true"
  filterPlaceholder="Search files..."
  placeholder="Select a file..."
  [(selection)]="selectedNode"
/>`;

export const filterTs = `import { Component, signal } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './filter.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'documents', label: 'Documents', children: [
      { key: 'resume', label: 'Resume.docx' },
    ] },
  ];
  public readonly selectedNode = signal<TreeNode | null>(null);
}`;

export const loadingHtml = `<ui-lib-tree-select
  [nodes]="nodes"
  [loading]="true"
  placeholder="Loading..."
/>`;

export const loadingTs = `import { Component } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './loading.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [];
}`;

export const multipleHtml = `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="multiple"
  placeholder="Select files..."
  [(selection)]="selectedNodes"
/>`;

export const multipleTs = `import { Component, signal } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './multiple.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'documents', label: 'Documents', children: [
      { key: 'resume', label: 'Resume.docx' },
    ] },
  ];
  public readonly selectedNodes = signal<TreeNode[]>([]);
}`;

export const ngModelHtml = `<ui-lib-tree-select
  [nodes]="nodes"
  [(ngModel)]="selectedNode"
  placeholder="Select a file..."
/>`;

export const ngModelTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect, FormsModule],
  templateUrl: './ng-model.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'a', label: 'Item A' },
  ];
  public selectedNode: TreeNode | null = null;
}`;

export const reactiveHtml = `<form [formGroup]="form">
  <ui-lib-tree-select
    [nodes]="nodes"
    formControlName="selectedNode"
    placeholder="Select a file..."
  />
</form>`;

export const reactiveTs = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect, ReactiveFormsModule],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'a', label: 'Item A' },
  ];
  public readonly form = new FormGroup({
    selectedNode: new FormControl<TreeNode | null>(null),
  });
}`;

export const showClearHtml = `<ui-lib-tree-select
  [nodes]="nodes"
  selectionMode="single"
  [showClear]="true"
  placeholder="Select a file..."
  [(selection)]="selectedNode"
/>`;

export const showClearTs = `import { Component, signal } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './show-clear.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'a', label: 'Item A' },
  ];
  public readonly selectedNode = signal<TreeNode | null>(null);
}`;

export const sizesHtml = `<ui-lib-tree-select [nodes]="nodes" size="sm" placeholder="Small" />
<ui-lib-tree-select [nodes]="nodes" size="md" placeholder="Medium" />
<ui-lib-tree-select [nodes]="nodes" size="lg" placeholder="Large" />`;

export const sizesTs = `import { Component } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'a', label: 'Item A' },
    { key: 'b', label: 'Item B' },
  ];
}`;

export const variantsHtml = `<ui-lib-tree-select [nodes]="nodes" variant="material" placeholder="Material" />
<ui-lib-tree-select [nodes]="nodes" variant="bootstrap" placeholder="Bootstrap" />
<ui-lib-tree-select [nodes]="nodes" variant="minimal" placeholder="Minimal" />`;

export const variantsTs = `import { Component } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [
    { key: 'a', label: 'Item A' },
    { key: 'b', label: 'Item B' },
  ];
}`;
