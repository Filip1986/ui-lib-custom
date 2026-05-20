import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  template: `
    <ui-lib-button uiLibTooltip="Appears after 400 ms" [showDelay]="400">
      400 ms show delay
    </ui-lib-button>
    <ui-lib-button uiLibTooltip="Stays 600 ms after leaving" [hideDelay]="600">
      600 ms hide delay
    </ui-lib-button>
    <ui-lib-button uiLibTooltip="Both delays combined" [showDelay]="300" [hideDelay]="400">
      Show 300 ms / Hide 400 ms
    </ui-lib-button>
  `,
})
export class ShowHideDelaysTooltipExample {}
