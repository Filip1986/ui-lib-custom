import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { Toast, ToastService } from 'ui-lib-custom/toast';
import type { ToastPosition, ToastSeverity, ToastVariant } from 'ui-lib-custom/toast';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Toast component.
 */
@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [
    Toast,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './toast-demo.component.html',
  styleUrl: './toast-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 10,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'group',
      type: 'string',
      default: "'default'",
      description: 'Message group linking this component to MessageService.add() calls.',
    },
    {
      name: 'position',
      type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'",
      default: "'top-right'",
      description: 'Screen position where toasts appear.',
    },
    {
      name: 'preventOpenDuplicates',
      type: 'boolean',
      default: 'false',
      description: 'Prevents showings toasts with the same id while one is already visible.',
    },
    {
      name: 'preventDuplicates',
      type: 'boolean',
      default: 'false',
      description: 'Prevents duplicates including ones that have already been removed.',
    },
    {
      name: 'breakpoints',
      type: 'Record<string, Record<string, string>>',
      default: '{}',
      description: 'Responsive overrides keyed by min-width.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'baseZIndex', type: 'number', default: '0', description: 'Base CSS z-index.' },
  ];

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

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Escape',
      action:
        'Dismisses the focused toast notification (when <code>[closable]="true"</code>) and returns focus to the previously focused element.',
    },
    {
      key: 'Tab / Shift+Tab',
      action: 'Moves focus between the notification and its close button.',
    },
    {
      key: 'Enter / Space',
      target: 'Close button',
      action: 'Dismisses the toast.',
    },
  ];

  public readonly apiContainerInputRows: ApiPropRow[] = [
    {
      name: 'position',
      type: 'ToastPosition',
      default: "'top-right'",
      description: 'Screen position of the toast container.',
    },
    {
      name: 'life',
      type: 'number',
      default: '3000',
      description: 'Default auto-dismiss duration (ms) for all messages.',
    },
    {
      name: 'variant',
      type: 'ToastVariant | null',
      default: 'null',
      description: 'Design variant. Falls back to ThemeConfigService global variant.',
    },
    {
      name: 'key',
      type: 'string | null',
      default: 'null',
      description: 'Only renders messages whose key matches this value.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class(es) applied to the host element.',
    },
  ];

  public readonly apiMessageRows: ApiPropRow[] = [
    {
      name: 'id',
      type: 'string',
      default: 'auto',
      description: 'Unique identifier — auto-generated if omitted.',
    },
    {
      name: 'key',
      type: 'string',
      description: 'Routes the message to the matching container key.',
    },
    {
      name: 'severity',
      type: 'ToastSeverity',
      default: "'info'",
      description: 'Controls colour palette and default icon.',
    },
    { name: 'summary', type: 'string', description: 'Bold headline of the notification.' },
    { name: 'detail', type: 'string', description: 'Body text of the notification.' },
    {
      name: 'life',
      type: 'number',
      default: 'container life',
      description: 'Per-message auto-dismiss duration (ms).',
    },
    {
      name: 'sticky',
      type: 'boolean',
      default: 'false',
      description: 'When true, the toast never auto-dismisses.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: 'When false, the close button is hidden.',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'severity default',
      description: 'Custom icon name overriding the severity default.',
    },
    { name: 'styleClass', type: 'string', description: 'Extra CSS class(es) on the item element.' },
  ];

  public readonly apiServiceRows: ApiPropRow[] = [
    {
      name: 'add',
      type: '(message: ToastMessage) => void',
      description: 'Enqueue a new toast notification.',
    },
    { name: 'remove', type: '(id: string) => void', description: 'Remove a toast by its ID.' },
    {
      name: 'clear',
      type: '(key?: string) => void',
      description: 'Clear all messages, or only those matching a key.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-toast-width', description: 'Width.' },
    { variable: '--uilib-toast-gap', description: 'Gap.' },
    { variable: '--uilib-toast-z-index', description: 'Z-index.' },
    { variable: '--uilib-toast-offset', description: 'Offset.' },
    { variable: '--uilib-toast-animation-duration', description: 'Animation Duration.' },
    { variable: '--uilib-toast-slide-x', description: 'Slide X.' },
    { variable: '--uilib-toast-slide-y', description: 'Slide Y.' },
    { variable: '--uilib-toast-item-padding', description: 'Item padding.' },
    { variable: '--uilib-toast-item-radius', description: 'Item border radius.' },
    { variable: '--uilib-toast-item-gap', description: 'Item gap.' },
    { variable: '--uilib-toast-item-border-width', description: 'Item Border width.' },
    { variable: '--uilib-toast-item-font-size', description: 'Item font size.' },
    { variable: '--uilib-toast-item-bg', description: 'Item background colour.' },
    { variable: '--uilib-toast-item-fg', description: 'Item Fg.' },
    { variable: '--uilib-toast-item-border-color', description: 'Item Border text colour.' },
    { variable: '--uilib-toast-item-icon-color', description: 'Item Icon text colour.' },
    { variable: '--uilib-toast-item-close-color', description: 'Item Close text colour.' },
    { variable: '--uilib-toast-item-shadow', description: 'Item box shadow.' },
  ];
}
