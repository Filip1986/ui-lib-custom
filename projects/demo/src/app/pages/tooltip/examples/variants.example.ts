import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  template: `
    <ui-lib-button
      uiLibTooltip="Material — elevated shadow, large radius"
      tooltipVariant="material"
      tooltipPosition="bottom"
    >
      Material
    </ui-lib-button>
    <ui-lib-button
      uiLibTooltip="Bootstrap — dark background, tight radius"
      tooltipVariant="bootstrap"
      tooltipPosition="bottom"
    >
      Bootstrap
    </ui-lib-button>
    <ui-lib-button
      uiLibTooltip="Minimal — uses page foreground colour"
      tooltipVariant="minimal"
      tooltipPosition="bottom"
    >
      Minimal
    </ui-lib-button>
  `,
})
export class VariantsTooltipExample {}
