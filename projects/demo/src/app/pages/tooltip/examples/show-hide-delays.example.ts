import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  templateUrl: './show-hide-delays.example.html',
})
export class ShowHideDelaysTooltipExample {}
