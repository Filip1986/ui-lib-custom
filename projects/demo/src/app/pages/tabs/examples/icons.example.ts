import { Component } from '@angular/core';
import { Tabs, Tab, TabLabel } from 'ui-lib-custom/tabs';
import { Icon } from 'ui-lib-custom/icon';

@Component({
  standalone: true,
  imports: [Tabs, Tab, TabLabel, Icon],
  templateUrl: './icons.example.html',
})
export class MyComponent {}
