import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Card, Stack, Inline, Grid, Container, Button } from 'ui-lib-custom';
import { FormsModule } from '@angular/forms';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    Stack,
    Inline,
    Grid,
    Container,
    Card,
    Button,
    FormsModule,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
  ],
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

  @ViewChildren(DocDemoViewportComponent) viewports?: QueryList<DocDemoViewportComponent>;

  private primaryViewport(): DocDemoViewportComponent | undefined {
    return this.viewports?.first;
  }

  get viewportPresets() {
    return this.primaryViewport()?.presets() ?? [];
  }

  viewportDisplayWidth() {
    return this.primaryViewport()?.displayWidth() ?? 0;
  }

  viewportDisplayHeight() {
    return this.primaryViewport()?.displayHeight() ?? 0;
  }

  viewportCustomWidth() {
    return this.primaryViewport()?.customWidth() ?? 0;
  }

  viewportDensity() {
    return this.primaryViewport()?.densityValue() ?? 'default';
  }

  private forEachViewport(fn: (vp: DocDemoViewportComponent) => void) {
    this.viewports?.forEach(fn);
  }

  setViewportCustomWidth(value: number) {
    this.forEachViewport((vp) => vp.setCustomWidth(value));
  }

  setViewportPreset(preset: { key: string; label: string; width: number; height: number }) {
    this.forEachViewport((vp) => vp.setPreset(preset));
  }

  applyViewportCustom() {
    this.forEachViewport((vp) => vp.setCustom());
  }

  rotateViewport() {
    this.forEachViewport((vp) => vp.rotate());
  }

  setViewportDensity(value: 'default' | 'comfortable' | 'compact') {
    this.forEachViewport((vp) => vp.setDensity(value));
  }
}
