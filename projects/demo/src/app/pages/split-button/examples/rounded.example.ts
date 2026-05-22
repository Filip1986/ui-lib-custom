import { Component } from '@angular/core';
import { SplitButtonComponent } from 'ui-lib-custom/split-button';
import type { SplitButtonItem, SplitButtonSeverity } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent],
  templateUrl: './rounded.example.html',
})
export class MyComponent {
  public readonly severity: SplitButtonSeverity = 'primary';
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}
