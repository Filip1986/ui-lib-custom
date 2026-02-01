import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Card, Stack, Inline, Grid, Container, Button } from 'ui-lib-custom';
import { FormsModule } from '@angular/forms';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [Stack, Inline, Grid, Container, Card, Button, FormsModule, DocPageLayoutComponent, DocDemoViewportComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutsComponent {
  readonly sections: DocSection[] = [
    { id: 'semantic-spacing', label: 'Semantic Spacing' },
    { id: 'stack', label: 'Stack' },
    { id: 'inline', label: 'Inline' },
    { id: 'grid', label: 'Grid' },
    { id: 'container', label: 'Container' },
    { id: 'composition', label: 'Composition' },
    { id: 'design-tokens', label: 'Design Tokens' },
    { id: 'themed-layouts', label: 'Themed Layouts' },
  ];

  @ViewChild('layoutsViewport') viewport?: DocDemoViewportComponent;

  get viewportPresets() {
    return this.viewport?.presets() ?? [];
  }

  viewportDisplayWidth() {
    return this.viewport?.displayWidth() ?? 0;
  }

  viewportDisplayHeight() {
    return this.viewport?.displayHeight() ?? 0;
  }

  viewportCustomWidth() {
    return this.viewport?.customWidth() ?? 0;
  }

  setViewportCustomWidth(value: number) {
    this.viewport?.setCustomWidth(value);
  }

  setViewportPreset(preset: { key: string; label: string; width: number; height: number }) {
    this.viewport?.setPreset(preset);
  }

  applyViewportCustom() {
    this.viewport?.setCustom();
  }

  rotateViewport() {
    this.viewport?.rotate();
  }

  setViewportDensity(value: 'default' | 'comfortable' | 'compact') {
    this.viewport?.setDensity(value);
  }
}
