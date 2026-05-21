import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Fieldset } from 'ui-lib-custom/fieldset';
import type { FieldsetVariant } from 'ui-lib-custom/fieldset';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import {
  basicHtml,
  basicTs,
  toggleableHtml,
  toggleableTs,
  preCollapsedHtml,
  preCollapsedTs,
  customLegendHtml,
  customLegendTs,
  variantsHtml,
  variantsTs,
} from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Fieldset component.
 */
@Component({
  selector: 'app-fieldset-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Fieldset,
    DocPageLayoutComponent,
    DocTocComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './fieldset-demo.component.html',
  styleUrl: './fieldset-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemoComponent {
  public readonly basicHtml: string = basicHtml;
  public readonly basicTs: string = basicTs;
  public readonly toggleableHtml: string = toggleableHtml;
  public readonly toggleableTs: string = toggleableTs;
  public readonly preCollapsedHtml: string = preCollapsedHtml;
  public readonly preCollapsedTs: string = preCollapsedTs;
  public readonly customLegendHtml: string = customLegendHtml;
  public readonly customLegendTs: string = customLegendTs;
  public readonly variantsHtml: string = variantsHtml;
  public readonly variantsTs: string = variantsTs;

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

  public readonly importCode: string = "import { Fieldset } from 'ui-lib-custom/fieldset'";

  public readonly snippetToggleEvent: string = `<ui-lib-fieldset\n  legend="Event Demo"\n  [toggleable]="true"\n  (toggled)="onToggle($event)"\n></ui-lib-fieldset>\n\n// component.ts\nonToggle(event: FieldsetToggleEvent): void {\n  console.log('collapsed:', event.collapsed);\n}`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'toggleable', label: 'Toggleable' },
    { id: 'pre-collapsed', label: 'Pre-collapsed' },
    { id: 'custom-legend', label: 'Custom Legend' },
    { id: 'variants', label: 'Variants' },
    { id: 'toggle-event', label: 'Toggle Event' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly isBasicCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isAdvancedCollapsed: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundToggleable: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundVariant: WritableSignal<FieldsetVariant> =
    signal<FieldsetVariant>('material');

  public readonly variants: FieldsetVariant[] = ['material', 'bootstrap', 'minimal'];

  public toggleBasic(): void {
    this.isBasicCollapsed.update((current: boolean): boolean => !current);
  }

  public setPlaygroundVariant(variant: FieldsetVariant): void {
    this.playgroundVariant.set(variant);
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Enter / Space',
      suffix: 'on legend toggle button',
      action: 'Toggles the panel open or closed (only when <code>[toggleable]="true"</code>).',
    },
    {
      key: 'Tab / Shift+Tab',
      action: 'Moves focus to or from the legend toggle button in the standard tab order.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-fieldset-border-color', description: 'Border colour.' },
    { variable: '--uilib-fieldset-border-radius', description: 'Border radius.' },
    { variable: '--uilib-fieldset-legend-bg', description: 'Legend background colour.' },
    { variable: '--uilib-fieldset-legend-color', description: 'Legend text colour.' },
    { variable: '--uilib-fieldset-legend-font-size', description: 'Legend Font size.' },
    { variable: '--uilib-fieldset-legend-font-weight', description: 'Legend font weight.' },
    { variable: '--uilib-fieldset-legend-padding', description: 'Legend padding.' },
    { variable: '--uilib-fieldset-content-padding', description: 'Content area padding.' },
    { variable: '--uilib-fieldset-toggle-color', description: 'Toggle icon colour.' },
    {
      variable: '--uilib-fieldset-toggle-hover-bg',
      description: 'Toggle hover background colour.',
    },
    { variable: '--uilib-fieldset-transition', description: 'Transition.' },
  ];
}
