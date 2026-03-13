import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';

/**
 * Basic accordion example.
 */
@Component({
  selector: 'app-accordion-basic-example',
  standalone: true,
  imports: [Accordion, AccordionPanel],
  template: `
    <ui-lib-accordion variant="material">
      <ui-lib-accordion-panel header="Shipping">
        Standard (5-7 days), express (2-3 days), and overnight options.
      </ui-lib-accordion-panel>
      <ui-lib-accordion-panel header="Returns">
        Items can be returned within 30 days of purchase.
      </ui-lib-accordion-panel>
    </ui-lib-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionBasicExampleComponent {}
