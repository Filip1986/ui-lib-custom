import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { UploadComponent } from 'ui-lib-custom/upload';
import { Button } from 'ui-lib-custom/button';
import { UploadEmptyDirective, UploadFileDirective } from 'ui-lib-custom/upload';
import type {
  UploadHandlerEvent,
  UploadRemoveEvent,
  UploadSelectEvent,
  UploadVariant,
} from 'ui-lib-custom/upload';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

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
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
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
}
