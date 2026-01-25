import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewportPreviewComponent } from '../viewport-preview/viewport-preview.component';
import { Card } from 'ui-lib-custom';

@Component({
  selector: 'app-doc-demo-viewport',
  standalone: true,
  imports: [CommonModule, FormsModule, ViewportPreviewComponent, Card],
  templateUrl: './doc-demo-viewport.component.html',
  styleUrl: './doc-demo-viewport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocDemoViewportComponent {
  @ViewChild('preview') preview?: ViewportPreviewComponent;
}
