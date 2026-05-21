import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { Toolbar } from 'ui-lib-custom/toolbar';
import type { ToolbarSize, ToolbarVariant } from 'ui-lib-custom/toolbar';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Toolbar component.
 */
@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [
    Toolbar,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './toolbar-demo.component.html',
  styleUrl: './toolbar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Toolbar } from 'ui-lib-custom/toolbar'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'start-only', label: 'Start Only' },
    { id: 'start-and-end', label: 'Start and End' },
    { id: 'all-three-slots', label: 'All Three Slots' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Toolbar'",
      description: 'Accessible label for the toolbar region.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Toolbar size.' },
    {
      name: '(start slot)',
      type: 'ng-content[start]',
      description: 'Project content into the start (left) of the toolbar.',
    },
    {
      name: '(center slot)',
      type: 'ng-content[center]',
      description: 'Project content into the center of the toolbar.',
    },
    {
      name: '(end slot)',
      type: 'ng-content[end]',
      description: 'Project content into the end (right) of the toolbar.',
    },
  ];

  public readonly variants: ToolbarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: ToolbarSize[] = ['sm', 'md', 'lg'];

  public readonly playgroundVariant: WritableSignal<ToolbarVariant> =
    signal<ToolbarVariant>('material');
  public readonly playgroundSize: WritableSignal<ToolbarSize> = signal<ToolbarSize>('md');

  public setVariant(variant: ToolbarVariant): void {
    this.playgroundVariant.set(variant);
  }

  public setSize(size: ToolbarSize): void {
    this.playgroundSize.set(size);
  }

  public readonly inputRows: readonly ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant; inherits from ThemeConfigService when null.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Controls toolbar height and padding.',
    },
    {
      name: 'ariaLabel',
      type: 'string | null',
      default: 'null',
      description: 'Accessible label; recommended when multiple toolbars are on one page.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes added to the host element.',
    },
  ];

  public readonly slotRows: readonly ApiPropRow[] = [
    {
      name: '[uiToolbarStart]',
      type: '—',
      description: 'Content projected into the leading (left) group.',
    },
    {
      name: '[uiToolbarCenter]',
      type: '—',
      description: 'Content projected into the centered group.',
    },
    {
      name: '[uiToolbarEnd]',
      type: '—',
      description: 'Content projected into the trailing (right) group.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-toolbar-background', description: 'Background.' },
    { variable: '--uilib-toolbar-border-color', description: 'Border colour.' },
    { variable: '--uilib-toolbar-border-width', description: 'Border width.' },
    { variable: '--uilib-toolbar-border-radius', description: 'Border radius.' },
    { variable: '--uilib-toolbar-padding-x', description: 'Horizontal padding.' },
    { variable: '--uilib-toolbar-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-toolbar-min-height', description: 'Minimum height.' },
    { variable: '--uilib-toolbar-gap', description: 'Gap.' },
    { variable: '--uilib-toolbar-shadow', description: 'Box shadow.' },
    { variable: '--uilib-toolbar-font-family', description: 'Font family.' },
    { variable: '--uilib-toolbar-color', description: 'Text colour.' },
  ];
}
