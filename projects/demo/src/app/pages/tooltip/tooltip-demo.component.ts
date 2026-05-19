import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the Tooltip directive.
 */
@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [
    Tooltip,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './tooltip-demo.component.html',
  styleUrl: './tooltip-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Tooltip } from 'ui-lib-custom/tooltip'";
  public readonly snippetBasic: string = `<button uiLibTooltip="Save the document">Save</button>`;
  public readonly snippetBasicTs: string = `import { Component } from '@angular/core';\nimport { Tooltip } from 'ui-lib-custom/tooltip';\n\n@Component({\n  standalone: true,\n  imports: [Tooltip],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {}`;
  public readonly snippetPositions: string = `<button uiLibTooltip="Top tooltip" tooltipPosition="top">Top</button>\n<button uiLibTooltip="Bottom tooltip" tooltipPosition="bottom">Bottom</button>\n<button uiLibTooltip="Left tooltip" tooltipPosition="left">Left</button>\n<button uiLibTooltip="Right tooltip" tooltipPosition="right">Right</button>`;
  public readonly snippetPositionsTs: string = `import { Component } from '@angular/core';\nimport { Tooltip } from 'ui-lib-custom/tooltip';\n\n@Component({\n  standalone: true,\n  imports: [Tooltip],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {}`;
  public readonly snippetFocusEvent: string = `<input uiLibTooltip="Enter your full name" tooltipEvent="focus" />\n<input uiLibTooltip="Accepts hover and focus" tooltipEvent="both" />`;
  public readonly snippetFocusEventTs: string = `import { Component } from '@angular/core';\nimport { Tooltip } from 'ui-lib-custom/tooltip';\n\n@Component({\n  standalone: true,\n  imports: [Tooltip],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {}`;
  public readonly snippetShowHideDelays: string = `<button uiLibTooltip="Appears after 400 ms" [showDelay]="400">Hover</button>`;
  public readonly snippetShowHideDelaysTs: string = `import { Component } from '@angular/core';\nimport { Tooltip } from 'ui-lib-custom/tooltip';\n\n@Component({\n  standalone: true,\n  imports: [Tooltip],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {}`;
  public readonly snippetDisabled: string = `<button uiLibTooltip="Hidden" [tooltipDisabled]="isDisabled">Hover</button>`;
  public readonly snippetDisabledTs: string = `import { Component, signal } from '@angular/core';\nimport { Tooltip } from 'ui-lib-custom/tooltip';\n\n@Component({\n  standalone: true,\n  imports: [Tooltip],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {\n  readonly isDisabled = signal(false);\n}`;
  public readonly snippetVariants: string = `<button uiLibTooltip="Material tooltip" tooltipVariant="material">Material</button>`;
  public readonly snippetVariantsTs: string = `import { Component } from '@angular/core';\nimport { Tooltip } from 'ui-lib-custom/tooltip';\n\n@Component({\n  standalone: true,\n  imports: [Tooltip],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {}`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'positions', label: 'Positions' },
    { id: 'focus-event', label: 'Focus Event' },
    { id: 'show-hide-delays', label: 'Show & Hide Delays' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'variants', label: 'Variants' },
    { id: 'long-text', label: 'Long Text' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly tooltipDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'uiLibTooltip', type: 'string', default: "''", description: 'Tooltip text content.' },
    {
      name: 'tooltipPosition',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'top'",
      description: 'Preferred tooltip placement.',
    },
    {
      name: 'tooltipEvent',
      type: "'hover' | 'focus' | 'both'",
      default: "'hover'",
      description: 'Trigger event for the tooltip.',
    },
    { name: 'showDelay', type: 'number', default: '0', description: 'Delay in ms before showing.' },
    { name: 'hideDelay', type: 'number', default: '0', description: 'Delay in ms before hiding.' },
    {
      name: 'tooltipDisabled',
      type: 'boolean',
      default: 'false',
      description: 'Hides the tooltip entirely when true.',
    },
    {
      name: 'tooltipVariant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
  ];
}
