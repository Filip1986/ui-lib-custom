import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { ConfirmPopup, ConfirmPopupService } from 'ui-lib-custom/confirm-popup';
import type { ConfirmPopupButtonSeverity, ConfirmPopupVariant } from 'ui-lib-custom/confirm-popup';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import { declarativeUsageHtml, declarativeUsageTs } from './snippets.generated';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the ConfirmPopup component.
 */
@Component({
  selector: 'app-confirm-popup-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    ConfirmPopup,
    TitleCasePipe,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './confirm-popup-demo.component.html',
  styleUrl: './confirm-popup-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPopupDemoComponent {
  public readonly declarativeUsageHtml: string = declarativeUsageHtml;
  public readonly declarativeUsageTs: string = declarativeUsageTs;

  public readonly importCode: string =
    "import { ConfirmPopup, ConfirmPopupService } from 'ui-lib-custom/confirm-popup'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 8,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };
  public readonly snippetBasicConfirm: string = `// component.ts\nthis.confirmPopupService.confirm({\n  target: event.currentTarget as HTMLElement,\n  message: 'Are you sure you want to proceed?',\n  accept: () => this.proceed(),\n});`;
  public readonly snippetIconConfirm: string = `this.confirmPopupService.confirm({\n  target: event.currentTarget as HTMLElement,\n  message: 'Are you sure you want to delete this file?',\n  icon: 'pi pi-exclamation-triangle',\n  acceptLabel: 'Delete',\n  rejectLabel: 'Keep',\n  acceptSeverity: 'danger',\n  accept: () => this.deleteFile(),\n});`;

  private readonly confirmPopupService: ConfirmPopupService = inject(ConfirmPopupService);

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'with-icon', label: 'With Icon & Custom Labels' },
    { id: 'button-severities', label: 'Button Severities' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'declarative-usage', label: 'Declarative Usage' },
    { id: 'result-log', label: 'Result Log' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly variants: ConfirmPopupVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly severities: ConfirmPopupButtonSeverity[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ];

  public readonly lastResult: WritableSignal<string> = signal<string>('—');
  public readonly declarativeVisible: WritableSignal<boolean> = signal<boolean>(false);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public confirmBasic(event: MouseEvent): void {
    this.confirmPopupService.confirm({
      target: event.currentTarget as HTMLElement,
      message: 'Are you sure you want to proceed?',
      accept: (): void => {
        this.lastResult.set('Accepted');
      },
      reject: (): void => {
        this.lastResult.set('Rejected');
      },
    });
  }

  public confirmWithIcon(event: MouseEvent): void {
    this.confirmPopupService.confirm({
      target: event.currentTarget as HTMLElement,
      message: 'Are you sure you want to delete this file?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Keep',
      acceptSeverity: 'danger',
      accept: (): void => {
        this.lastResult.set('File deleted');
      },
      reject: (): void => {
        this.lastResult.set('Deletion cancelled');
      },
    });
  }

  public confirmSeverity(event: MouseEvent, severity: ConfirmPopupButtonSeverity): void {
    this.confirmPopupService.confirm({
      target: event.currentTarget as HTMLElement,
      message: `Accept with ${severity} severity?`,
      acceptSeverity: severity,
      accept: (): void => {
        this.lastResult.set(`Accepted (${severity})`);
      },
      reject: (): void => {
        this.lastResult.set('Rejected');
      },
    });
  }

  public confirmVariant(event: MouseEvent, variant: ConfirmPopupVariant): void {
    this.confirmPopupService.confirm({
      key: variant,
      target: event.currentTarget as HTMLElement,
      message: `Confirm with ${variant} variant?`,
      accept: (): void => {
        this.lastResult.set(`Accepted (${variant})`);
      },
      reject: (): void => {
        this.lastResult.set('Rejected');
      },
    });
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab / Shift+Tab',
      action: 'Cycles focus between the Accept and Reject buttons inside the popup.',
    },
    {
      key: 'Enter / Space',
      action: 'Activates the focused button (Accept or Reject).',
    },
    {
      key: 'Escape',
      action:
        'Closes the popup (treated as rejection) and returns focus to the triggering element.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-confirm-popup-bg', description: 'Background colour.' },
    { variable: '--uilib-confirm-popup-border-radius', description: 'Border radius.' },
    { variable: '--uilib-confirm-popup-shadow', description: 'Box shadow.' },
    { variable: '--uilib-confirm-popup-border', description: 'Border shorthand.' },
    { variable: '--uilib-confirm-popup-z-index', description: 'Z-index.' },
    { variable: '--uilib-confirm-popup-width', description: 'Width.' },
    { variable: '--uilib-confirm-popup-content-padding', description: 'Content area padding.' },
    { variable: '--uilib-confirm-popup-icon-size', description: 'Icon size.' },
    { variable: '--uilib-confirm-popup-icon-color', description: 'Icon colour.' },
    { variable: '--uilib-confirm-popup-footer-padding', description: 'Footer padding.' },
    { variable: '--uilib-confirm-popup-footer-border-top', description: 'Footer Border Top.' },
    { variable: '--uilib-confirm-popup-footer-gap', description: 'Footer gap.' },
    { variable: '--uilib-confirm-popup-btn-padding', description: 'Btn padding.' },
    { variable: '--uilib-confirm-popup-btn-font-size', description: 'Btn Font size.' },
    { variable: '--uilib-confirm-popup-btn-font-weight', description: 'Btn font weight.' },
    { variable: '--uilib-confirm-popup-btn-radius', description: 'Btn border radius.' },
    { variable: '--uilib-confirm-popup-enter-duration', description: 'Enter animation duration.' },
    { variable: '--uilib-confirm-popup-enter-easing', description: 'Enter animation easing.' },
    { variable: '--uilib-confirm-popup-arrow-size', description: 'Arrow size.' },
  ];
}
