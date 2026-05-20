import { Component, signal } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  template: `
    <ui-lib-button uiLibTooltip="You will never see this" [tooltipDisabled]="tooltipDisabled()">
      {{ tooltipDisabled() ? 'Tooltip disabled' : 'Tooltip enabled' }}
    </ui-lib-button>
    <ui-lib-button severity="secondary" (click)="tooltipDisabled.set(!tooltipDisabled())">
      Toggle disabled
    </ui-lib-button>
  `,
})
export class DisabledTooltipExample {
  readonly tooltipDisabled = signal(false);
}
