import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './severity.example.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'success';
  public readonly items: SplitButtonItem[] = [{ label: 'Update', icon: 'pencil' }];
}
