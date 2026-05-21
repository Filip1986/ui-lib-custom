import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { AutoFocus } from 'ui-lib-custom/auto-focus';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import {
  basicUsageHtml,
  basicUsageTs,
  conditionalHtml,
  conditionalTs,
  disabledHtml,
  disabledTs,
} from './snippets.generated';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
/**
 * Demo page for the AutoFocus directive.
 * Demonstrates basic usage, conditional focus, and the full input API.
 */
@Component({
  selector: 'app-auto-focus-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    AutoFocus,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocSectionComponent,
    DocApiReferenceComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
  ],
  templateUrl: './auto-focus-demo.component.html',
  styleUrl: './auto-focus-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoFocusDemoComponent {
  public readonly basicUsageHtml: string = basicUsageHtml;
  public readonly basicUsageTs: string = basicUsageTs;
  public readonly conditionalHtml: string = conditionalHtml;
  public readonly conditionalTs: string = conditionalTs;
  public readonly disabledHtml: string = disabledHtml;
  public readonly disabledTs: string = disabledTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 10,
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

  public readonly importCode: string = "import { AutoFocus } from 'ui-lib-custom/auto-focus'";

  public readonly snippetImport: string = `import { AutoFocus } from 'ui-lib-custom/auto-focus';`;
  public readonly snippetSelector: string = `[uiLibAutoFocus]`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'conditional-focus', label: 'Conditional Focus' },
    { id: 'disable-autofocus', label: 'Disable Autofocus' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly showConditional: WritableSignal<boolean> = signal<boolean>(false);
  public readonly enableFocus: WritableSignal<boolean> = signal<boolean>(true);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public toggleConditional(): void {
    this.showConditional.set(!this.showConditional());
  }

  public toggleFocus(): void {
    this.enableFocus.set(!this.enableFocus());
  }

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'When <code>true</code>, focus is skipped on mount.',
    },
    {
      name: 'selector',
      type: 'string | null',
      default: 'null',
      description: 'Optional child selector used as the focus target instead of the host.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host / focused element',
      attribute: '(none added)',
      value: '—',
      notes:
        'The directive is purely behavioural — it does not modify <code>role</code>, <code>tabindex</code>, or any <code>aria-*</code> attribute. Focus is set programmatically on mount via <code>element.focus()</code>.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'The focused element is already active on render, so users can immediately interact with it or Tab to the next element in the page order.',
    },
  ];
}
