import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';

import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import {
  alphanumHtml,
  alphaHtml,
  pintHtml,
  intHtml,
  numHtml,
  hexHtml,
  moneyHtml,
  emailHtml,
  customHtml,
  customTs,
  bypassHtml,
  bypassTs,
  alphanumTs,
  alphaTs,
  pintTs,
  intTs,
  numTs,
  hexTs,
  moneyTs,
  emailTs,
} from './snippets.generated';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
/**
 * Demo page for the KeyFilter directive, showing all built-in presets,
 * custom RegExp usage, and the bypass toggle.
 */
@Component({
  selector: 'app-key-filter-demo',
  standalone: true,
  imports: [
    Panel,
    FormsModule,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    DocDemoViewportComponent,
    KeyFilterDirective,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './key-filter-demo.component.html',
  styleUrl: './key-filter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFilterDemoComponent {
  public readonly alphanumHtml: string = alphanumHtml;
  public readonly alphanumTs: string = alphanumTs;
  public readonly alphaHtml: string = alphaHtml;
  public readonly alphaTs: string = alphaTs;
  public readonly pintHtml: string = pintHtml;
  public readonly pintTs: string = pintTs;
  public readonly intHtml: string = intHtml;
  public readonly intTs: string = intTs;
  public readonly numHtml: string = numHtml;
  public readonly numTs: string = numTs;
  public readonly hexHtml: string = hexHtml;
  public readonly hexTs: string = hexTs;
  public readonly moneyHtml: string = moneyHtml;
  public readonly moneyTs: string = moneyTs;
  public readonly emailHtml: string = emailHtml;
  public readonly emailTs: string = emailTs;
  public readonly customHtml: string = customHtml;
  public readonly customTs: string = customTs;
  public readonly bypassHtml: string = bypassHtml;
  public readonly bypassTs: string = bypassTs;

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly importCode: string =
    "import { KeyFilterDirective } from 'ui-lib-custom/key-filter'";

  public readonly sections: DocSection[] = [
    { id: 'alphanum', label: 'Alphanumeric' },
    { id: 'alpha', label: 'Alpha' },
    { id: 'pint', label: 'Positive Integer' },
    { id: 'int', label: 'Integer' },
    { id: 'num', label: 'Number' },
    { id: 'hex', label: 'Hexadecimal' },
    { id: 'money', label: 'Money' },
    { id: 'email', label: 'Email' },
    { id: 'custom', label: 'Custom RegExp' },
    { id: 'bypass', label: 'Bypass' },
  ];

  /** Custom vowel-only filter for the RegExp demo. */
  public readonly vowelPattern: RegExp = /[aeiouAEIOU]/;

  /** Controls the bypass demo toggle. */
  public bypassEnabled: boolean = false;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'uilibKeyFilter',
      type: 'KeyFilterPreset | RegExp',
      description: 'Preset name or a custom RegExp pattern. Required.',
      required: true,
    },
    {
      name: 'keyFilterBypass',
      type: 'boolean',
      default: 'false',
      description: 'When true, the filter is bypassed.',
    },
    {
      name: 'hintText',
      type: 'string | null',
      default: 'null',
      description: 'Screen-reader hint text.',
    },
  ];
}
