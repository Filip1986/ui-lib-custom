import type { Signal, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';

import { Button } from 'ui-lib-custom/button';
import { Tooltip } from 'ui-lib-custom/tooltip';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

import {
  basicHtml,
  basicTs,
  disabledHtml,
  disabledTs,
  focusEventHtml,
  focusEventTs,
  positionsHtml,
  positionsTs,
  showHideDelaysHtml,
  showHideDelaysTs,
  variantsHtml,
  variantsTs,
} from './snippets.generated';
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
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
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
  public readonly basicTs: string = basicTs;
  public readonly basicHtml: string = basicHtml;
  public readonly positionsTs: string = positionsTs;
  public readonly positionsHtml: string = positionsHtml;
  public readonly focusEventTs: string = focusEventTs;
  public readonly focusEventHtml: string = focusEventHtml;
  public readonly showHideDelaysTs: string = showHideDelaysTs;
  public readonly showHideDelaysHtml: string = showHideDelaysHtml;
  public readonly disabledTs: string = disabledTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly variantsTs: string = variantsTs;
  public readonly variantsHtml: string = variantsHtml;
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
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
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
  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'Moves focus to the host element; shows the tooltip when tooltipEvent is "focus" or "both".',
    },
    { key: 'Shift+Tab', action: 'Moves focus away; hides the tooltip.' },
    { key: 'Escape', action: 'Dismisses the tooltip immediately.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Tooltip popup',
      attribute: 'role="tooltip"',
      value: '—',
      notes: 'Identifies the floating content as a tooltip to assistive technologies.',
    },
    {
      element: 'Host element',
      attribute: 'aria-describedby',
      value: 'tooltip element ID',
      notes: 'Automatically set on the host element to link it to the tooltip popup when visible.',
    },
    {
      element: 'Tooltip popup',
      attribute: 'id',
      value: 'generated unique ID',
      notes: "Matches the host's <code>aria-describedby</code> value.",
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-tooltip-bg', description: 'Background colour.' },
    { variable: '--uilib-tooltip-color', description: 'Text colour.' },
    { variable: '--uilib-tooltip-border-radius', description: 'Border radius.' },
    { variable: '--uilib-tooltip-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-tooltip-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-tooltip-font-size', description: 'Font size.' },
    { variable: '--uilib-tooltip-max-width', description: 'Maximum width.' },
    { variable: '--uilib-tooltip-arrow-size', description: 'Arrow size.' },
    { variable: '--uilib-tooltip-z-index', description: 'Z-index.' },
    { variable: '--uilib-tooltip-shadow', description: 'Box shadow.' },
    { variable: '--uilib-tooltip-enter-duration', description: 'Enter animation duration.' },
    { variable: '--uilib-tooltip-enter-easing', description: 'Enter animation easing.' },
  ];
}
