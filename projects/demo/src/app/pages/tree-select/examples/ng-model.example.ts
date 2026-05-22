import { Component } from '@angular/core';
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
}
