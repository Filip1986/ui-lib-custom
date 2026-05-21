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
}
