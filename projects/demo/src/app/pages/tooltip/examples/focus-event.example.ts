import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';

@Component({
  standalone: true,
  imports: [Tooltip],
  template: `
    <input
      placeholder="Tab to this field"
      uiLibTooltip="Enter your full name"
      tooltipEvent="focus"
    />
    <input
      placeholder="Hover or tab here"
      uiLibTooltip="Accepts hover and focus"
      tooltipEvent="both"
    />
  `,
})
export class FocusEventTooltipExample {}
