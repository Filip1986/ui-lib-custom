import type { Signal, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import type {
  UploadHandlerEvent,
  UploadRemoveEvent,
  UploadSelectEvent,
  UploadVariant,
} from 'ui-lib-custom/upload';
import { UploadComponent } from 'ui-lib-custom/upload';
import { UploadEmptyDirective, UploadFileDirective } from 'ui-lib-custom/upload';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
interface UploadLogEntry {
  timestamp: string;
  message: string;
}

/**
 * Demo page for the Upload component.
 * Shows all variants, sizes, multi-file, validation, and custom-upload mode.
 */
@Component({
  selector: 'app-upload-demo',
  standalone: true,
  imports: [
    UploadComponent,
    UploadEmptyDirective,
    UploadFileDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
  ],
  templateUrl: './upload-demo.component.html',
  styleUrl: './upload-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UploadDemoComponent {
  public readonly importCode: string = "import { UploadComponent } from 'ui-lib-custom/upload'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);
  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'multiple-files', label: 'Multiple Files' },
    { id: 'image-only', label: 'Image Only' },
    { id: 'custom-upload-handler', label: 'Custom Upload Handler' },
    { id: 'auto-upload', label: 'Auto Upload' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'custom-file-template', label: 'Custom File Template' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'event-log', label: 'Event Log' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal'",
      default: "'material'",
      description: 'Design variant.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Upload widget size.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Allows multiple file selection.',
    },
    {
      name: 'accept',
      type: 'string',
      default: "''",
      description: 'Accepted file types (MIME or extension).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the upload widget.',
    },
    {
      name: 'auto',
      type: 'boolean',
      default: 'false',
      description: 'Uploads automatically on file selection.',
    },
    {
      name: 'maxFileSize',
      type: 'number | null',
      default: 'null',
      description: 'Maximum file size in bytes.',
    },
    {
      name: 'fileLimit',
      type: 'number | null',
      default: 'null',
      description: 'Maximum number of files allowed.',
    },
    {
      name: 'chooseLabel',
      type: 'string',
      default: "'Choose'",
      description: 'Label for the choose button.',
    },
    {
      name: 'uploadLabel',
      type: 'string',
      default: "'Upload'",
      description: 'Label for the upload button.',
    },
    {
      name: 'cancelLabel',
      type: 'string',
      default: "'Cancel'",
      description: 'Label for the cancel button.',
    },
    {
      name: 'showUploadButton',
      type: 'boolean',
      default: 'true',
      description: 'Shows the upload button.',
    },
    {
      name: 'showCancelButton',
      type: 'boolean',
      default: 'true',
      description: 'Shows the cancel button.',
    },
    {
      name: 'customUpload',
      type: 'boolean',
      default: 'false',
      description: 'Delegates upload to the uploadHandler output instead of auto-uploading.',
    },
    {
      name: 'emptyMessage',
      type: 'string',
      default: "'Drag and drop files here'",
      description: 'Message shown when no files are selected.',
    },
  ];

  public readonly activeVariant: WritableSignal<UploadVariant> = signal<UploadVariant>('material');
  public readonly eventLog: WritableSignal<UploadLogEntry[]> = signal<UploadLogEntry[]>([]);
  public readonly customUploadLog: WritableSignal<UploadLogEntry[]> = signal<UploadLogEntry[]>([]);

  public readonly variants: UploadVariant[] = ['material', 'bootstrap', 'minimal'];

  public setVariant(variant: UploadVariant): void {
    this.activeVariant.set(variant);
  }

  public onFileSelect(event: UploadSelectEvent): void {
    const fileNames: string = event.files.map((file: File): string => file.name).join(', ');
    this.appendLog(this.eventLog, `Selected ${event.files.length} file(s): ${fileNames}`);
  }

  public onFileRemove(event: UploadRemoveEvent): void {
    this.appendLog(this.eventLog, `Removed: ${event.file.name}`);
  }

  public onUploadClear(): void {
    this.appendLog(this.eventLog, 'Queue cleared');
  }

  public onCustomUpload(event: UploadHandlerEvent): void {
    const fileNames: string = event.files.map((file: File): string => file.name).join(', ');
    this.appendLog(this.customUploadLog, `Upload triggered for: ${fileNames}`);
    // Simulate async upload feedback
    setTimeout((): void => {
      this.appendLog(this.customUploadLog, `Upload complete`);
    }, 1200);
  }

  private appendLog(target: WritableSignal<UploadLogEntry[]>, message: string): void {
    const timestamp: string = new Date().toLocaleTimeString();
    target.update((entries: UploadLogEntry[]): UploadLogEntry[] => [
      { timestamp, message },
      ...entries.slice(0, 9),
    ]);
  }

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };
  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'Moves focus through Choose, Upload, Cancel, and per-file Remove buttons in DOM order.',
    },
    { key: 'Enter / Space', suffix: 'on Choose button', action: 'Opens the OS file picker.' },
    {
      key: 'Enter / Space',
      suffix: 'on Upload button',
      action: 'Emits <code>uploadHandler</code> (requires <code>[customUpload]="true"</code>).',
    },
    {
      key: 'Enter / Space',
      suffix: 'on Cancel button',
      action: 'Clears the file queue and emits <code>uploadClear</code>.',
    },
    {
      key: 'Enter / Space',
      suffix: 'on Remove button',
      action: 'Removes that file from the queue and emits <code>fileRemove</code>.',
    },
    {
      key: 'Enter / Space',
      suffix: 'on Dismiss button',
      action: 'Dismisses the validation message panel.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Toolbar div',
      attribute: 'role="toolbar"',
      value: '—',
      notes: 'Groups the action buttons.',
    },
    {
      element: 'Toolbar div',
      attribute: 'aria-label',
      value: '"Upload actions"',
      notes: 'Labels the toolbar for screen readers.',
    },
    {
      element: 'Choose button',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'When file limit is reached or <code>[disabled]="true"</code>.',
    },
    {
      element: 'Upload button',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'When queue is empty or <code>[disabled]="true"</code>.',
    },
    {
      element: 'Cancel button',
      attribute: 'aria-disabled',
      value: '"true"',
      notes: 'When queue is empty or <code>[disabled]="true"</code>.',
    },
    {
      element: 'Drop zone div',
      attribute: 'role="region"',
      value: '—',
      notes: 'Landmark for the file drop and content area.',
    },
    {
      element: 'Drop zone div',
      attribute: 'aria-label',
      value: '"File upload area"',
      notes: 'Labels the region for screen readers.',
    },
    {
      element: 'Drag-status div',
      attribute: 'aria-live="polite"',
      value: '—',
      notes: 'Announces drag-enter/leave to screen readers.',
    },
    {
      element: 'File list ul',
      attribute: 'aria-label',
      value: '"Files to upload"',
      notes: 'Labels the file queue.',
    },
    {
      element: 'Remove button',
      attribute: 'aria-label',
      value: '"Remove &lt;filename&gt;"',
      notes: 'e.g. <code>"Remove report.pdf"</code> — conveys which file is being removed.',
    },
    {
      element: 'Validation div',
      attribute: 'role="alert"',
      value: '—',
      notes: 'Immediately announces validation errors to assistive technology.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-upload-border-color', description: 'Border colour.' },
    { variable: '--uilib-upload-border', description: 'Border shorthand.' },
    { variable: '--uilib-upload-border-radius', description: 'Border radius.' },
    { variable: '--uilib-upload-bg', description: 'Background colour.' },
    { variable: '--uilib-upload-fg', description: 'Fg.' },
    { variable: '--uilib-upload-secondary-fg', description: 'Secondary Fg.' },
    { variable: '--uilib-upload-transition', description: 'Transition.' },
    { variable: '--uilib-upload-header-bg', description: 'Header background colour.' },
    { variable: '--uilib-upload-header-padding', description: 'Header padding.' },
    { variable: '--uilib-upload-toolbar-gap', description: 'Toolbar gap.' },
    { variable: '--uilib-upload-content-padding', description: 'Content area padding.' },
    { variable: '--uilib-upload-drop-zone-min-height', description: 'Drop Zone Min height.' },
    { variable: '--uilib-upload-drop-zone-border', description: 'Drop Zone border shorthand.' },
    { variable: '--uilib-upload-drop-zone-bg', description: 'Drop Zone background colour.' },
    {
      variable: '--uilib-upload-drop-zone-drag-border-color',
      description: 'Drop Zone Drag Border text colour.',
    },
    {
      variable: '--uilib-upload-drop-zone-drag-bg',
      description: 'Drop Zone Drag background colour.',
    },
    { variable: '--uilib-upload-empty-gap', description: 'Empty gap.' },
    { variable: '--uilib-upload-empty-icon-color', description: 'Empty Icon text colour.' },
    { variable: '--uilib-upload-empty-text-color', description: 'Empty Text text colour.' },
    { variable: '--uilib-upload-empty-hint-color', description: 'Empty Hint text colour.' },
    { variable: '--uilib-upload-empty-link-color', description: 'Empty Link text colour.' },
    { variable: '--uilib-upload-file-list-gap', description: 'File List gap.' },
    { variable: '--uilib-upload-file-item-padding', description: 'File Item padding.' },
    { variable: '--uilib-upload-file-item-bg', description: 'File Item background colour.' },
    { variable: '--uilib-upload-file-item-border', description: 'File Item border shorthand.' },
    { variable: '--uilib-upload-file-item-radius', description: 'File Item border radius.' },
    { variable: '--uilib-upload-file-item-gap', description: 'File Item gap.' },
    { variable: '--uilib-upload-file-icon-color', description: 'File Icon text colour.' },
    { variable: '--uilib-upload-file-name-color', description: 'File Name text colour.' },
    { variable: '--uilib-upload-file-size-color', description: 'File Size text colour.' },
    { variable: '--uilib-upload-file-remove-color', description: 'File Remove text colour.' },
    {
      variable: '--uilib-upload-file-remove-hover-color',
      description: 'File Remove Hover text colour.',
    },
    { variable: '--uilib-upload-file-preview-radius', description: 'File Preview border radius.' },
    { variable: '--uilib-upload-file-preview-size', description: 'File Preview size.' },
    { variable: '--uilib-upload-btn-padding', description: 'Btn padding.' },
    { variable: '--uilib-upload-btn-font-size', description: 'Btn Font size.' },
    { variable: '--uilib-upload-btn-font-weight', description: 'Btn font weight.' },
    { variable: '--uilib-upload-btn-radius', description: 'Btn border radius.' },
    { variable: '--uilib-upload-btn-gap', description: 'Btn gap.' },
    { variable: '--uilib-upload-btn-disabled-opacity', description: 'Btn Disabled opacity.' },
    { variable: '--uilib-upload-btn-choose-bg', description: 'Btn Choose background colour.' },
    { variable: '--uilib-upload-btn-choose-fg', description: 'Btn Choose Fg.' },
    {
      variable: '--uilib-upload-btn-choose-hover-bg',
      description: 'Btn Choose Hover background colour.',
    },
    { variable: '--uilib-upload-btn-upload-bg', description: 'Btn Upload background colour.' },
    { variable: '--uilib-upload-btn-upload-fg', description: 'Btn Upload Fg.' },
    {
      variable: '--uilib-upload-btn-upload-hover-bg',
      description: 'Btn Upload Hover background colour.',
    },
    { variable: '--uilib-upload-btn-cancel-bg', description: 'Btn Cancel background colour.' },
    { variable: '--uilib-upload-btn-cancel-fg', description: 'Btn Cancel Fg.' },
    {
      variable: '--uilib-upload-btn-cancel-hover-bg',
      description: 'Btn Cancel Hover background colour.',
    },
    { variable: '--uilib-upload-messages-bg', description: 'Messages background colour.' },
    { variable: '--uilib-upload-messages-border', description: 'Messages border shorthand.' },
    { variable: '--uilib-upload-messages-fg', description: 'Messages Fg.' },
    { variable: '--uilib-upload-messages-padding', description: 'Messages padding.' },
    { variable: '--uilib-upload-messages-radius', description: 'Messages border radius.' },
    { variable: '--uilib-upload-messages-close-color', description: 'Messages Close text colour.' },
  ];
}
