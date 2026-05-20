import { Component } from '@angular/core';
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
}
