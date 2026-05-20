import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [
    { label: 'Update', icon: 'pencil' },
    { label: 'Delete', icon: 'trash' },
  ];

  public onPrimaryAction(): void {
    // primary action handler
  }
}
