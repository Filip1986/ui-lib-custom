import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewportPreviewComponent } from '../viewport-preview/viewport-preview.component';
import { Card, Button } from 'ui-lib-custom';

@Component({
  selector: 'app-doc-demo-viewport',
  standalone: true,
  imports: [CommonModule, FormsModule, ViewportPreviewComponent, Card, Button],
  templateUrl: './doc-demo-viewport.component.html',
  styleUrl: './doc-demo-viewport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocDemoViewportComponent {
  shadow = input<string | null>(null);
  density = signal<'default' | 'comfortable' | 'compact'>('default');

  setDensity(value: 'default' | 'comfortable' | 'compact') {
    this.density.set(value);
    if (value === 'default') {
      document.documentElement.removeAttribute('data-density');
    } else {
      document.documentElement.setAttribute('data-density', value);
    }
  }
}
