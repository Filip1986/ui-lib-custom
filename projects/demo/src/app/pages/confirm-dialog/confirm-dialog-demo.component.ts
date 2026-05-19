import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { ConfirmDialog, ConfirmationService } from 'ui-lib-custom/confirm-dialog';
import type {
  ConfirmDialogButtonSeverity,
  ConfirmDialogVariant,
} from 'ui-lib-custom/confirm-dialog';
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
 * Demo page for the ConfirmDialog component.
 */
@Component({
  selector: 'app-confirm-dialog-demo',
  standalone: true,
  imports: [
    ConfirmDialog,
    TitleCasePipe,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './confirm-dialog-demo.component.html',
  styleUrl: './confirm-dialog-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogDemoComponent {
  public readonly importCode: string =
    "import { ConfirmDialog, ConfirmationService } from 'ui-lib-custom/confirm-dialog'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    apgPattern: {
      name: 'Alert and Message Dialogs',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/',
    },
    competitiveParity: 'pending',
  };
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'dismissable-backdrop', label: 'Dismissable Backdrop' },
    { id: 'non-closable', label: 'Non-Closable' },
    { id: 'with-icon', label: 'With Icon' },
    { id: 'danger-severity', label: 'Danger Severity' },
    { id: 'position', label: 'Top Position' },
    { id: 'programmatic', label: 'Programmatic' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'api', label: 'API Reference' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
  ];

  public readonly variants: ConfirmDialogVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly severities: ConfirmDialogButtonSeverity[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ];

  // Declarative demo
  public readonly basicVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly dismissableVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly noCloseVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly iconVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly dangerVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly positionVisible: WritableSignal<boolean> = signal<boolean>(false);

  // Variant dialogs — keyed by service
  public readonly variantDialogKey: WritableSignal<string> = signal<string>('');

  // Result log
  public readonly lastResult: WritableSignal<string> = signal<string>('—');

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'group',
      type: 'string',
      default: "'default'",
      description:
        'Message group — links this dialog to matching ConfirmationService.confirm() calls.',
    },
    {
      name: 'acceptLabel',
      type: 'string',
      default: "'Yes'",
      description: 'Label for the accept button.',
    },
    {
      name: 'rejectLabel',
      type: 'string',
      default: "'No'",
      description: 'Label for the reject button.',
    },
    {
      name: 'acceptIcon',
      type: 'string | null',
      default: 'null',
      description: 'Icon for the accept button.',
    },
    {
      name: 'rejectIcon',
      type: 'string | null',
      default: 'null',
      description: 'Icon for the reject button.',
    },
    {
      name: 'breakpoints',
      type: 'Record<string, string>',
      default: '{}',
      description: 'Responsive width breakpoints.',
    },
    {
      name: 'appendTo',
      type: "'body' | HTMLElement | string",
      default: "'body'",
      description: 'Target element for portal rendering.',
    },
    {
      name: 'ariaLabelledBy',
      type: 'string | null',
      default: 'null',
      description: 'Id of the heading element.',
    },
  ];

  public confirmBasic(): void {
    this.basicVisible.set(true);
  }

  public confirmDismissable(): void {
    this.dismissableVisible.set(true);
  }

  public confirmNoClose(): void {
    this.noCloseVisible.set(true);
  }

  public confirmWithIcon(): void {
    this.iconVisible.set(true);
  }

  public confirmDanger(): void {
    this.dangerVisible.set(true);
  }

  public confirmPosition(): void {
    this.positionVisible.set(true);
  }

  public onAccepted(label: string): void {
    this.lastResult.set(`✓ Accepted: ${label}`);
  }

  public onRejected(label: string): void {
    this.lastResult.set(`✗ Rejected: ${label}`);
  }

  // Service-driven demos
  public confirmViaService(): void {
    this.confirmationService.confirm({
      header: 'Service-Driven Confirm',
      message: 'This dialog was triggered programmatically via ConfirmationService.',
      icon: 'pi pi-question-circle',
      acceptLabel: 'Got it',
      rejectLabel: 'Cancel',
      accept: (): void => this.lastResult.set('✓ Accepted via service'),
      reject: (): void => this.lastResult.set('✗ Rejected via service'),
    });
  }

  public confirmDeleteViaService(): void {
    this.confirmationService.confirm({
      header: 'Delete Record',
      message: 'This will permanently remove the record and all associated data.',
      icon: 'pi pi-trash',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptSeverity: 'danger',
      rejectSeverity: 'secondary',
      accept: (): void => this.lastResult.set('✓ Record deleted'),
      reject: (): void => this.lastResult.set('✗ Delete cancelled'),
    });
  }

  public confirmVariant(variant: ConfirmDialogVariant): void {
    this.confirmationService.confirm({
      key: `variant-${variant}`,
      header: `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Variant`,
      message: `This is the ${variant} design variant of ConfirmDialog.`,
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      accept: (): void => this.lastResult.set(`✓ ${variant} confirmed`),
      reject: (): void => this.lastResult.set(`✗ ${variant} rejected`),
    });
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab / Shift+Tab',
      action: 'Cycles focus between the Accept and Reject buttons inside the dialog.',
    },
    {
      key: 'Enter / Space',
      action: 'Activates the focused button (Accept or Reject).',
    },
    {
      key: 'Escape',
      action:
        'Closes the dialog (treated as rejection) and returns focus to the triggering element.',
    },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'visible',
      type: 'boolean (model)',
      default: 'false',
      description: 'Two-way visibility binding.',
    },
    {
      name: 'key',
      type: 'string',
      default: "''",
      description: 'Targets service calls to this instance.',
    },
    { name: 'header', type: 'string', default: "'Confirmation'", description: 'Dialog title.' },
    {
      name: 'message',
      type: 'string',
      default: "'Are you sure…'",
      description: 'Confirmation message.',
    },
    {
      name: 'icon',
      type: 'string | null',
      default: 'null',
      description: 'CSS class for message icon.',
    },
    { name: 'acceptLabel', type: 'string', default: "'Yes'", description: 'Accept button label.' },
    { name: 'rejectLabel', type: 'string', default: "'No'", description: 'Reject button label.' },
    {
      name: 'acceptSeverity',
      type: 'ConfirmDialogButtonSeverity',
      default: "'primary'",
      description: 'Accept button colour scheme.',
    },
    {
      name: 'rejectSeverity',
      type: 'ConfirmDialogButtonSeverity',
      default: "'secondary'",
      description: 'Reject button colour scheme.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: 'Show/hide the × close button.',
    },
    {
      name: 'dismissableMask',
      type: 'boolean',
      default: 'false',
      description: 'Close on backdrop click.',
    },
    {
      name: 'blockScroll',
      type: 'boolean',
      default: 'true',
      description: 'Lock body scroll while open.',
    },
    {
      name: 'position',
      type: 'ConfirmDialogPosition',
      default: "'center'",
      description: 'Panel position on the viewport.',
    },
    {
      name: 'defaultFocus',
      type: 'ConfirmDialogDefaultFocus',
      default: "'accept'",
      description: 'Which button gets initial focus.',
    },
    {
      name: 'variant',
      type: 'ConfirmDialogVariant | null',
      default: 'null',
      description: 'Design variant override.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS classes on the host.',
    },
  ];

  public readonly apiOutputRows: ApiPropRow[] = [
    { name: 'accepted', type: 'void', description: 'Emitted when the user clicks Accept.' },
    {
      name: 'rejected',
      type: 'void',
      description: 'Emitted when the user clicks Reject or closes.',
    },
  ];
}
