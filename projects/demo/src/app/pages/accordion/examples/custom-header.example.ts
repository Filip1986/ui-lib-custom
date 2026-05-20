import { Component } from '@angular/core';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';
import { Icon } from 'ui-lib-custom/icon';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel, Icon],
  templateUrl: './custom-header.example.html',
})
export class MyComponent {}
