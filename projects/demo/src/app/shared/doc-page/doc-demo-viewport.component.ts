import { Component, ChangeDetectionStrategy, input, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewportPreviewComponent } from '../viewport-preview/viewport-preview.component';

@Component({
  selector: 'app-doc-demo-viewport',
  standalone: true,
  imports: [CommonModule, FormsModule, ViewportPreviewComponent],
  templateUrl: './doc-demo-viewport.component.html',
  styleUrl: './doc-demo-viewport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'docDemoViewport',
})
export class DocDemoViewportComponent {
  shadow = input<string | null>(null);
  autoHeight = input<boolean>(false);
  density = signal<'default' | 'comfortable' | 'compact'>('default');

  @ViewChild('preview') preview?: ViewportPreviewComponent;

  presets() {
    return this.preview?.presets ?? [];
  }

  displayWidth() {
    return this.preview?.displayWidth() ?? 0;
  }

  displayHeight() {
    return this.preview?.displayHeight() ?? 0;
  }

  customWidth() {
    return this.preview?.customWidth() ?? 0;
  }

  setCustomWidth(value: number) {
    this.preview?.customWidth.set(value);
  }

  setPreset(preset: { key: string; label: string; width: number; height: number }) {
    this.preview?.setPreset(preset);
  }

  setCustom() {
    this.preview?.setCustom();
  }

  rotate() {
    this.preview?.rotate();
  }

  densityValue() {
    return this.density();
  }

  setDensity(value: 'default' | 'comfortable' | 'compact') {
    this.density.set(value);
    if (value === 'default') {
      document.documentElement.removeAttribute('data-density');
    } else {
      document.documentElement.setAttribute('data-density', value);
    }
  }
}
