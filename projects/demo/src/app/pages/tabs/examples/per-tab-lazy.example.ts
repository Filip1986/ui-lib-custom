import { Component } from '@angular/core';
import { Tabs, Tab, TabContent } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab, TabContent],
  templateUrl: './per-tab-lazy.example.html',
})
export class MyComponent {}
