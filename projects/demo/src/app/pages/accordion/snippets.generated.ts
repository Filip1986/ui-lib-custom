/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const accordionExampleHtml = `<ui-lib-accordion variant="material">
  <ui-lib-accordion-panel header="Shipping">
    Standard (5-7 days), express (2-3 days), and overnight options.
  </ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Returns">
    Items can be returned within 30 days of purchase.
  </ui-lib-accordion-panel>
</ui-lib-accordion>`;

export const accordionExampleTs = `import { Component } from '@angular/core';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  templateUrl: './accordion-example.example.html',
})
export class MyComponent {}`;

export const basicHtml = `<ui-lib-accordion expandMode="single" variant="material">
  <ui-lib-accordion-panel header="Shipping" value="shipping">
    Standard (5-7 days), express (2-3 days), and overnight shipping.
  </ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Returns" value="returns">
    Items can be returned within 30 days of purchase.
  </ui-lib-accordion-panel>
</ui-lib-accordion>`;

export const basicTs = `import { Component } from '@angular/core';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  templateUrl: './basic.example.html',
})
export class MyComponent {}`;

export const controlledTs = `<ui-lib-accordion
  expandMode="multiple"
  [expandedPanels]="expanded"
  (expandedChange)="expanded = handleChange($event)"
>
  <ui-lib-accordion-panel header="One" value="one" />
  <ui-lib-accordion-panel header="Two" value="two" />
</ui-lib-accordion>`;

export const customHeaderHtml = `<ui-lib-accordion>
  <ui-lib-accordion-panel value="faq-1">
    <div accordionHeader class="header-row"><ui-lib-icon name="help-circle" /> FAQ Item</div>
    Content goes here.
  </ui-lib-accordion-panel>
</ui-lib-accordion>`;

export const customHeaderTs = `import { Component } from '@angular/core';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';
import { Icon } from 'ui-lib-custom/icon';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel, Icon],
  templateUrl: './custom-header.example.html',
})
export class MyComponent {}`;

export const customIconsHtml = `<ui-lib-accordion-panel collapseIcon="plus" expandIcon="minus" header="Using Plus/Minus" />`;

export const customIconsTs = `import { Component } from '@angular/core';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  templateUrl: './custom-icons.example.html',
})
export class MyComponent {}`;

export const iconPositionHtml = `<ui-lib-accordion-panel header="Icon at Start" iconPosition="start" />`;

export const iconPositionTs = `import { Component } from '@angular/core';
import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel],
  templateUrl: './icon-position.example.html',
})
export class MyComponent {}`;

export const toggleTemplateHtml = `<ui-lib-accordion-panel>
  <ng-template accordionToggleIcon let-expanded>
    <span class="custom-indicator" [class.active]="expanded">
      {{ expanded ? '−' : '+' }}
    </span>
  </ng-template>
  Content
</ui-lib-accordion-panel>`;

export const toggleTemplateTs = `import { Component } from '@angular/core';
import { Accordion, AccordionPanel, AccordionToggleIcon } from 'ui-lib-custom/accordion';

@Component({
  standalone: true,
  imports: [Accordion, AccordionPanel, AccordionToggleIcon],
  templateUrl: './toggle-template.example.html',
})
export class MyComponent {}`;
