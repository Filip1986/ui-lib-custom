import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
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

/**
 * Demo page for the ConfirmDialog component.
 */
@Component({
  selector: 'app-confirm-dialog-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    ConfirmDialog,
    TitleCasePipe,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './confirm-dialog-demo.component.html',
  styleUrl: './confirm-dialog-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogDemoComponent {
  public readonly importCode: string =
    "import { ConfirmDialog, ConfirmationService } from 'ui-lib-custom/confirm-dialog'";
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
}
