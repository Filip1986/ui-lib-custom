import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  template: `
    <ui-lib-button uiLibTooltip="Top tooltip" tooltipPosition="top">Top</ui-lib-button>
    <ui-lib-button uiLibTooltip="Bottom tooltip" tooltipPosition="bottom">Bottom</ui-lib-button>
    <ui-lib-button uiLibTooltip="Left tooltip" tooltipPosition="left">Left</ui-lib-button>
    <ui-lib-button uiLibTooltip="Right tooltip" tooltipPosition="right">Right</ui-lib-button>
  `,
})
export class PositionsTooltipExample {}
