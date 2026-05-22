import { Component } from '@angular/core';
import { SplitButtonComponent, SplitButtonContentDirective } from 'ui-lib-custom/split-button';
import { Icon } from 'ui-lib-custom/icon';
import type { SplitButtonItem } from 'ui-lib-custom/split-button';

@Component({
  standalone: true,
  imports: [SplitButtonComponent, SplitButtonContentDirective, Icon],
  templateUrl: './template.example.html',
})
export class MyComponent {
  public readonly items: SplitButtonItem[] = [{ label: 'Update' }];
}
