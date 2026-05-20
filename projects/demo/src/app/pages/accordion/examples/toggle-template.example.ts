import { Component } from '@angular/core';
import { Accordion, AccordionPanel, AccordionToggleIcon } from 'ui-lib-custom/accordion';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel, AccordionToggleIcon],
  templateUrl: './toggle-template.example.html',
})
export class MyComponent {}
