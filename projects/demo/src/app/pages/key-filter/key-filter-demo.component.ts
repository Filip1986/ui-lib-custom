import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { Panel } from 'ui-lib-custom/panel';
type KeyFilterDemoSnippetKey =
  | 'alphanum'
  | 'alpha'
  | 'pint'
  | 'int'
  | 'num'
  | 'hex'
  | 'money'
  | 'email'
  | 'custom'
  | 'bypass';

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
    CodeSnippet,
    KeyFilterDirective,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './key-filter-demo.component.html',
  styleUrl: './key-filter-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFilterDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'uilibKeyFilter',
      type: 'KeyFilterPreset | RegExp',
      description: 'Preset name or custom regex controlling which keys are accepted.',
    },
    {
      name: 'keyFilterBypass',
      type: 'boolean',
      default: 'false',
      description: 'Disables filtering when true.',
    },
    {
      name: 'hintText',
      type: 'string | null',
      default: 'null',
      description: 'Screen reader hint describing allowed characters.',
    },
    {
      name: 'pattern',
      type: 'KeyFilterPreset | null',
      default: 'null',
      description: 'Named preset alias (alternative to the main input).',
    },
    {
      name: 'regex',
      type: 'RegExp | null',
      default: 'null',
      description: 'Custom regex alias (alternative to the main input).',
    },
  ];

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
    { id: 'api', label: 'API Reference' },
  ];

  public readonly snippets: Record<KeyFilterDemoSnippetKey, string> = {
    alphanum:
      '<input [uilibKeyFilter]="\'alphanum\'" hintText="Letters and numbers only" placeholder="Enter account ID" />',
    alpha: '<input [uilibKeyFilter]="\'alpha\'" placeholder="Letters only" />',
    pint: '<input [uilibKeyFilter]="\'pint\'" placeholder="Positive integers only" />',
    int: '<input [uilibKeyFilter]="\'int\'" placeholder="Integers (with minus sign)" />',
    num: '<input [uilibKeyFilter]="\'num\'" placeholder="Numbers (decimal, minus)" />',
    hex: '<input [uilibKeyFilter]="\'hex\'" placeholder="Hex digits (0-9, a-f)" />',
    money: '<input [uilibKeyFilter]="\'money\'" placeholder="Money (digits, - . ,)" />',
    email: '<input [uilibKeyFilter]="\'email\'" placeholder="Email characters" />',
    custom: '<input [uilibKeyFilter]="vowelPattern" placeholder="Vowels only (a e i o u)" />',
    bypass: [
      '<input',
      '  [uilibKeyFilter]="\'pint\'"',
      '  [keyFilterBypass]="bypassEnabled"',
      '  placeholder="Positive integers (bypass toggleable)"',
      '/>',
    ].join('\n'),
  };

  /** Custom vowel-only filter for the RegExp demo. */
  public readonly vowelPattern: RegExp = /[aeiouAEIOU]/;

  /** Controls the bypass demo toggle. */
  public bypassEnabled: boolean = false;

  public snippet(key: KeyFilterDemoSnippetKey): string {
    return this.snippets[key];
  }
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
}
