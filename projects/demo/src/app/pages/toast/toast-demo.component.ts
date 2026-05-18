import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { Toast, ToastService } from 'ui-lib-custom/toast';
import type { ToastPosition, ToastSeverity, ToastVariant } from 'ui-lib-custom/toast';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Toast component.
 */
@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [
    Toast,
    Button,
    CodeSnippet,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './toast-demo.component.html',
  styleUrl: './toast-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDemoComponent {
  private readonly toastService: ToastService = inject(ToastService);

  public readonly importCode: string = "import { Toast, ToastService } from 'ui-lib-custom/toast'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'severities', label: 'Severities' },
    { id: 'multiple-toasts', label: 'Multiple Toasts' },
    { id: 'sticky-non-closable', label: 'Sticky & Non-Closable' },
    { id: 'auto-dismiss-duration', label: 'Auto-dismiss Duration' },
    { id: 'position-variant', label: 'Position & Variant' },
    { id: 'keyed-containers', label: 'Keyed Containers' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  /** Currently selected position for interactive demos. */
  public readonly selectedPosition: WritableSignal<ToastPosition> =
    signal<ToastPosition>('top-right');

  /** Currently selected variant for interactive demos. */
  public readonly selectedVariant: WritableSignal<ToastVariant> = signal<ToastVariant>('bootstrap');

  /** Available positions for the position switcher. */
  public readonly positions: ToastPosition[] = [
    'top-right',
    'top-left',
    'top-center',
    'bottom-right',
    'bottom-left',
    'bottom-center',
  ];

  /** Available variants. */
  public readonly variants: ToastVariant[] = ['material', 'bootstrap', 'minimal'];

  public showSuccess(): void {
    this.toastService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'The operation completed successfully.',
      life: 4000,
    });
  }

  public showInfo(): void {
    this.toastService.add({
      severity: 'info',
      summary: 'Information',
      detail: 'Here is something you should know about.',
      life: 4000,
    });
  }

  public showWarn(): void {
    this.toastService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Please review this before proceeding.',
      life: 4000,
    });
  }

  public showError(): void {
    this.toastService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong. Please try again.',
      life: 4000,
    });
  }

  public showMultiple(): void {
    this.toastService.add({
      severity: 'success',
      summary: 'Upload complete',
      detail: 'report.pdf',
    });
    this.toastService.add({ severity: 'info', summary: 'Processing', detail: '3 files queued.' });
    this.toastService.add({
      severity: 'warn',
      summary: 'Low storage',
      detail: 'Only 2 GB remaining.',
    });
  }

  public showSticky(): void {
    this.toastService.add({
      severity: 'warn',
      summary: 'Sticky notification',
      detail: 'This toast will not auto-dismiss. Close it manually.',
      sticky: true,
    });
  }

  public showNonClosable(): void {
    this.toastService.add({
      severity: 'info',
      summary: 'Processing...',
      detail: 'This will dismiss automatically in 3 seconds.',
      closable: false,
      life: 3000,
    });
  }

  public showShortLife(): void {
    this.toastService.add({
      severity: 'success',
      summary: 'Quick',
      detail: 'Dismissed in 1.5 seconds.',
      life: 1500,
    });
  }

  public showLongLife(): void {
    this.toastService.add({
      severity: 'info',
      summary: 'Persistent',
      detail: 'Dismissed in 8 seconds.',
      life: 8000,
    });
  }

  public showKeyed(): void {
    this.toastService.add({
      key: 'secondary',
      severity: 'info',
      summary: 'Keyed toast',
      detail: 'This appears in the secondary container (bottom-left).',
      sticky: true,
    });
  }

  public clearAll(): void {
    this.toastService.clear();
  }

  public showPositioned(severity: ToastSeverity): void {
    this.toastService.add({
      severity,
      summary: severity.charAt(0).toUpperCase() + severity.slice(1),
      detail: `Showing at ${this.selectedPosition()} (${this.selectedVariant()}).`,
      life: 5000,
    });
  }
}
