import { Component, signal } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  templateUrl: './disabled.example.html',
})
export class DisabledTooltipExample {
  readonly tooltipDisabled = signal(false);
}
