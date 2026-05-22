import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Fieldset } from 'ui-lib-custom/fieldset';
import type { FieldsetVariant } from 'ui-lib-custom/fieldset';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
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

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
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
    DocAriaTableComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
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

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'legend',
      type: 'string',
      default: "''",
      description: 'Text label rendered in the legend header.',
    },
    {
      name: 'toggleable',
      type: 'boolean',
      default: 'false',
      description: 'Enables collapse/expand on legend click.',
    },
    {
      name: 'collapsed',
      type: 'boolean',
      default: 'false',
      description: 'Current collapsed state. Supports <code>[(collapsed)]</code> two-way binding.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Visual variant. Falls back to global theme when null.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes on the host element.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: '(toggled)',
      type: 'FieldsetToggleEvent',
      description:
        'Emitted when the panel collapses or expands. Carries <code>{ collapsed: boolean }</code>.',
    },
  ];

  public readonly apiProjectionRows: readonly ApiPropRow[] = [
    {
      name: '[fieldsetLegend]',
      type: 'ng-content',
      description: 'Custom HTML for the legend / header area.',
    },
    { name: 'default', type: 'ng-content', description: 'Body content rendered inside the panel.' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Fieldset',
      attribute: 'role',
      value: '"group"',
      notes: 'The fieldset container acts as a landmark group of related controls.',
    },
    {
      element: 'Fieldset',
      attribute: 'aria-labelledby',
      value: 'legend-id',
      notes: 'References the legend element to provide an accessible group label.',
    },
    {
      element: 'Toggle button (collapsible)',
      attribute: 'aria-expanded',
      value: '"true" | "false"',
      notes: 'Set on the legend button when the fieldset is collapsible.',
    },
    {
      element: 'Toggle button (collapsible)',
      attribute: 'aria-controls',
      value: 'content-id',
      notes: 'Points to the collapsible content panel.',
    },
  ];

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
