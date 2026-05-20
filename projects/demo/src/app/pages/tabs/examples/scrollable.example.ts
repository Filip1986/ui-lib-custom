import { Component } from '@angular/core';
import { Tabs, Tab } from 'ui-lib-custom/tabs';

@Component({
  standalone: true,
  imports: [Tabs, Tab],
  templateUrl: './scrollable.example.html',
})
export class MyComponent {}
