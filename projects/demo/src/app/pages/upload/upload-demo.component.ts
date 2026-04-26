import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { UploadComponent } from 'ui-lib-custom/upload';
import { UploadEmptyDirective, UploadFileDirective } from 'ui-lib-custom/upload';
import type {
  UploadHandlerEvent,
  UploadRemoveEvent,
  UploadSelectEvent,
  UploadVariant,
} from 'ui-lib-custom/upload';

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
  imports: [UploadComponent, UploadEmptyDirective, UploadFileDirective],
  templateUrl: './upload-demo.component.html',
  styleUrl: './upload-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UploadDemoComponent {
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
}
