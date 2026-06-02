/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const basicHtml = `<ui-lib-button uiLibTooltip="Save the document">Save</ui-lib-button>
<ui-lib-button uiLibTooltip="Delete this item">Delete</ui-lib-button>
<ui-lib-button uiLibTooltip="Share with others">Share</ui-lib-button>`;

export const basicTs = `import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  templateUrl: './basic.example.html',
})
export class BasicTooltipExample {}`;

export const disabledHtml = `<ui-lib-button uiLibTooltip="You will never see this" [tooltipDisabled]="tooltipDisabled()">
  {{ tooltipDisabled() ? 'Tooltip disabled' : 'Tooltip enabled' }}
</ui-lib-button>
<ui-lib-button severity="secondary" (click)="tooltipDisabled.set(!tooltipDisabled())">
  Toggle disabled
</ui-lib-button>`;

export const disabledTs = `import { Component, signal } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  templateUrl: './disabled.example.html',
})
export class DisabledTooltipExample {
  readonly tooltipDisabled = signal(false);
}`;

export const focusEventHtml = `<input placeholder="Tab to this field" tooltipEvent="focus" uiLibTooltip="Enter your full name" />
<input placeholder="Hover or tab here" tooltipEvent="both" uiLibTooltip="Accepts hover and focus" />`;

export const focusEventTs = `import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';

@Component({
  standalone: true,
  imports: [Tooltip],
  templateUrl: './focus-event.example.html',
})
export class FocusEventTooltipExample {}`;

export const positionsHtml = `<ui-lib-button tooltipPosition="top" uiLibTooltip="Top tooltip">Top</ui-lib-button>
<ui-lib-button tooltipPosition="bottom" uiLibTooltip="Bottom tooltip">Bottom</ui-lib-button>
<ui-lib-button tooltipPosition="left" uiLibTooltip="Left tooltip">Left</ui-lib-button>
<ui-lib-button tooltipPosition="right" uiLibTooltip="Right tooltip">Right</ui-lib-button>`;

export const positionsTs = `import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  templateUrl: './positions.example.html',
})
export class PositionsTooltipExample {}`;

export const showHideDelaysHtml = `<ui-lib-button uiLibTooltip="Appears after 400 ms" [showDelay]="400">
  400 ms show delay
</ui-lib-button>
<ui-lib-button uiLibTooltip="Stays 600 ms after leaving" [hideDelay]="600">
  600 ms hide delay
</ui-lib-button>
<ui-lib-button uiLibTooltip="Both delays combined" [hideDelay]="400" [showDelay]="300">
  Show 300 ms / Hide 400 ms
</ui-lib-button>`;

export const showHideDelaysTs = `import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  templateUrl: './show-hide-delays.example.html',
})
export class ShowHideDelaysTooltipExample {}`;

export const variantsHtml = `<ui-lib-button
  tooltipPosition="bottom"
  tooltipVariant="material"
  uiLibTooltip="Material — elevated shadow, large radius"
>
  Material
</ui-lib-button>
<ui-lib-button
  tooltipPosition="bottom"
  tooltipVariant="bootstrap"
  uiLibTooltip="Bootstrap — dark background, tight radius"
>
  Bootstrap
</ui-lib-button>
<ui-lib-button
  tooltipPosition="bottom"
  tooltipVariant="minimal"
  uiLibTooltip="Minimal — uses page foreground colour"
>
  Minimal
</ui-lib-button>`;

export const variantsTs = `import { Component } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [Tooltip, Button],
  templateUrl: './variants.example.html',
})
export class VariantsTooltipExample {}`;
