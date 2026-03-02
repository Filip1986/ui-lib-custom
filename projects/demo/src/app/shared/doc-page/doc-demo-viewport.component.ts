import { Component, ChangeDetectionStrategy, input, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewportPreviewComponent } from '../viewport-preview/viewport-preview.component';

interface ViewportPreset {
  key: string;
  label: string;
  width: number;
  height: number;
}

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
  public readonly shadow = input<string | null>(null);
  public readonly autoHeight = input<boolean>(false);
  public readonly density = signal<'default' | 'comfortable' | 'compact'>('default');

  @ViewChild('preview') public preview?: ViewportPreviewComponent;

  public presets(): ViewportPreset[] {
    return this.preview?.presets ?? [];
  }

  public displayWidth(): number {
    return this.preview?.displayWidth() ?? 0;
  }

  public displayHeight(): number {
    return this.preview?.displayHeight() ?? 0;
  }

  public customWidth(): number {
    return this.preview?.customWidth() ?? 0;
  }

  public setCustomWidth(value: number): void {
    this.preview?.customWidth.set(value);
  }

  public setPreset(preset: ViewportPreset): void {
    this.preview?.setPreset(preset);
  }

  public setCustom(): void {
    this.preview?.setCustom();
  }

  public rotate(): void {
    this.preview?.rotate();
  }

  public densityValue(): 'default' | 'comfortable' | 'compact' {
    return this.density();
  }

  public setDensity(value: 'default' | 'comfortable' | 'compact'): void {
    this.density.set(value);
    if (value === 'default') {
      document.documentElement.removeAttribute('data-density');
    } else {
      document.documentElement.setAttribute('data-density', value);
    }
  }
}
