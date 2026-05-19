import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the Tooltip directive.
 */
@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Tooltip,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
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
  public readonly snippetPositions: string = `<button uiLibTooltip="Top tooltip" tooltipPosition="top">Top</button>\n<button uiLibTooltip="Bottom tooltip" tooltipPosition="bottom">Bottom</button>\n<button uiLibTooltip="Left tooltip" tooltipPosition="left">Left</button>\n<button uiLibTooltip="Right tooltip" tooltipPosition="right">Right</button>`;
  public readonly snippetFocusEvent: string = `<input uiLibTooltip="Enter your full name" tooltipEvent="focus" />\n<input uiLibTooltip="Accepts hover and focus" tooltipEvent="both" />`;
  public readonly snippetShowHideDelays: string = `<button uiLibTooltip="Appears after 400 ms" [showDelay]="400">Hover</button>`;
  public readonly snippetDisabled: string = `<button uiLibTooltip="Hidden" [tooltipDisabled]="isDisabled">Hover</button>`;
  public readonly snippetVariants: string = `<button uiLibTooltip="Material tooltip" tooltipVariant="material">Material</button>`;
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

  public readonly apiRows: readonly ApiPropRow[] = [
    { name: 'uiLibTooltip', type: 'string', default: "''", description: 'The tooltip label text.' },
    {
      name: 'tooltipPosition',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'top'",
      description: 'Preferred position. Flips automatically when space is lacking.',
    },
    {
      name: 'tooltipEvent',
      type: "'hover' | 'focus' | 'both'",
      default: "'hover'",
      description: 'Which host events trigger the tooltip.',
    },
    {
      name: 'showDelay',
      type: 'number',
      default: '0',
      description: 'Milliseconds to wait before showing.',
    },
    {
      name: 'hideDelay',
      type: 'number',
      default: '0',
      description: 'Milliseconds to wait before hiding.',
    },
    {
      name: 'tooltipDisabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevent the tooltip from showing.',
    },
    {
      name: 'tooltipVariant',
      type: 'TooltipVariant | null',
      default: 'null',
      description: 'Design variant. Falls back to <code>ThemeConfigService</code>.',
    },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly tooltipDisabled: WritableSignal<boolean> = signal<boolean>(false);
}
