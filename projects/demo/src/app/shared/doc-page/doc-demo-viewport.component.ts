import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportPreviewComponent } from '../viewport-preview/viewport-preview.component';

@Component({
  selector: 'app-doc-demo-viewport',
  standalone: true,
  imports: [CommonModule, ViewportPreviewComponent],
  templateUrl: './doc-demo-viewport.component.html',
  styleUrl: './doc-demo-viewport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocDemoViewportComponent {}
