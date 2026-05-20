import { Component, signal } from '@angular/core';
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
}
