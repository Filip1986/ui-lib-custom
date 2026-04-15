import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Upload component.
 */
@Component({
  selector: 'app-upload-demo',
  standalone: true,
  templateUrl: './upload-demo.component.html',
  styleUrl: './upload-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDemoComponent {}
