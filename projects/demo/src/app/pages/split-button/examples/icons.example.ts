import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './icons.example.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [
    { label: 'Update', icon: 'pencil' },
    { label: 'Delete', icon: 'trash' },
  ];
}
