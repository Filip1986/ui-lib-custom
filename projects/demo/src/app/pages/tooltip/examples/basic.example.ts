import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  template: `
    <ui-lib-button uiLibTooltip="Save the document">Save</ui-lib-button>
    <ui-lib-button uiLibTooltip="Delete this item">Delete</ui-lib-button>
    <ui-lib-button uiLibTooltip="Share with others">Share</ui-lib-button>
  `,
})
export class BasicTooltipExample {}
