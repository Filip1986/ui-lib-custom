<ui-lib-accordion
  expandMode="multiple"
  [expandedPanels]="expanded"
  (expandedChange)="expanded = handleChange($event)"
>
  <ui-lib-accordion-panel header="One" value="one" />
  <ui-lib-accordion-panel header="Two" value="two" />
</ui-lib-accordion>
