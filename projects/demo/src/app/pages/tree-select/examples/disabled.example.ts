import { Component } from '@angular/core';
import { TreeSelect } from 'ui-lib-custom/tree-select';
import type { TreeNode } from 'ui-lib-custom/tree-select';

@Component({
  standalone: true,
  imports: [TreeSelect],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public readonly nodes: TreeNode[] = [{ key: 'a', label: 'Item A' }];
}
