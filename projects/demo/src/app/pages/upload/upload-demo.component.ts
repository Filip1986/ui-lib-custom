import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Upload component.
 */
@Component({
  selector: 'app-upload-demo',
  standalone: true,
  template: `
    <section class="upload-demo" data-testid="upload-demo">
      <h1>Upload</h1>
      <p>Coming soon.</p>
    </section>
  `,
  styles: `
    .upload-demo {
      padding: 1.5rem;
    }

    .upload-demo h1 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: var(--uilib-page-fg);
    }

    .upload-demo p {
      margin: 0;
      color: var(--uilib-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDemoComponent {}
