import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KeyFilterDirective } from 'ui-lib-custom/key-filter';
import { Panel } from 'ui-lib-custom/panel';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
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
  alphaHtml,
  alphanumHtml,
  alphanumTs,
  alphaTs,
  bypassHtml,
  bypassTs,
  customHtml,
  customTs,
  emailHtml,
  emailTs,
  hexHtml,
  hexTs,
  intHtml,
  intTs,
  moneyHtml,
  moneyTs,
  numHtml,
  numTs,
  pintHtml,
  pintTs,
} from './snippets.generated';
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
    DocAriaTableComponent,
    DocKeyboardNavComponent,
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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'accessibility', label: 'Accessibility' },
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

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host input',
      attribute: '(none added)',
      value: '—',
      notes:
        'The directive intercepts <code>keydown</code> events and calls <code>preventDefault()</code> on disallowed keys. It does not modify <code>role</code>, <code>aria-*</code>, or other attributes.',
    },
    {
      element: 'Host input',
      attribute: 'aria-describedby',
      value: '—',
      notes:
        'When <code>[hintText]</code> is provided, a visually-hidden hint element is rendered and linked via <code>aria-describedby</code> so screen readers announce the allowed character set.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Allowed key', action: 'The character is inserted into the input normally.' },
    {
      key: 'Disallowed key',
      action: 'The <code>keydown</code> event is prevented; nothing is inserted.',
    },
    {
      key: 'Ctrl / Meta + key',
      action:
        'Modifier combinations (copy, paste, undo, etc.) are always allowed regardless of the filter pattern.',
    },
    {
      key: 'Backspace / Delete / Arrow keys / Tab',
      action: 'Navigation and editing keys are always allowed so users are never trapped.',
    },
  ];
}
