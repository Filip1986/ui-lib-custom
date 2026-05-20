import { Component } from '@angular/core';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  templateUrl: './custom-icons.example.html',
})
export class MyComponent {}
