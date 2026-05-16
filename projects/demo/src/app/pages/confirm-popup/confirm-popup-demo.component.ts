import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { ConfirmPopup, ConfirmPopupService } from 'ui-lib-custom/confirm-popup';
import type { ConfirmPopupButtonSeverity, ConfirmPopupVariant } from 'ui-lib-custom/confirm-popup';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the ConfirmPopup component.
 */
@Component({
  selector: 'app-confirm-popup-demo',
  standalone: true,
  imports: [ConfirmPopup, TitleCasePipe, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './confirm-popup-demo.component.html',
  styleUrl: './confirm-popup-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPopupDemoComponent {
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
}
