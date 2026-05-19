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
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

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
    DocApiReferenceComponent,
  ],
  templateUrl: './confirm-popup-demo.component.html',
  styleUrl: './confirm-popup-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPopupDemoComponent {
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
  public readonly snippetDeclarativeUsage: string = `<ui-lib-confirm-popup\n  key="declarative"\n  [(visible)]="visible"\n  message="Proceed with this action?"\n  acceptLabel="Yes, proceed"\n  rejectLabel="Cancel"\n  (accepted)="onAccepted()"\n  (rejected)="onRejected()"\n/>`;
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
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
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

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'visible',
      type: 'model<boolean>',
      default: 'false',
      description: 'Two-way visibility binding.',
    },
    {
      name: 'key',
      type: 'string',
      default: "''",
      description: 'Key for targeting a specific popup instance.',
    },
    {
      name: 'message',
      type: 'string',
      default: "'Are you sure…'",
      description: 'Confirmation message text.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'Icon CSS class before the message.',
    },
    { name: 'acceptLabel', type: 'string', default: "'Yes'", description: 'Accept button label.' },
    { name: 'rejectLabel', type: 'string', default: "'No'", description: 'Reject button label.' },
    {
      name: 'acceptSeverity',
      type: 'ConfirmPopupButtonSeverity',
      default: "'primary'",
      description: 'Accept button colour severity.',
    },
    {
      name: 'rejectSeverity',
      type: 'ConfirmPopupButtonSeverity',
      default: "'secondary'",
      description: 'Reject button colour severity.',
    },
    {
      name: 'defaultFocus',
      type: 'ConfirmPopupDefaultFocus',
      default: "'accept'",
      description: 'Button focused on open.',
    },
    {
      name: 'variant',
      type: 'ConfirmPopupVariant | null',
      default: 'null',
      description: 'Design variant (inherits from theme when null).',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS classes on host.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    { name: 'accepted', type: 'void', description: 'Emitted when accept button is clicked.' },
    {
      name: 'rejected',
      type: 'void',
      description: 'Emitted when reject / overlay / Escape is triggered.',
    },
  ];

  public readonly apiServiceRows: ApiPropRow[] = [
    {
      name: 'confirm',
      type: '(config: ConfirmPopupConfig) => void',
      description: 'Show popup anchored to target.',
    },
    { name: 'close', type: '(key?: string) => void', description: 'Programmatically close popup.' },
    {
      name: 'confirmation',
      type: 'Signal<ConfirmPopupConfig | null>',
      description: 'Current config signal.',
    },
  ];
}
