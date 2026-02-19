import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Card, Button, Stack } from 'ui-lib-custom';
import { FormsModule } from '@angular/forms';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { LayoutSemanticSpacingSectionComponent } from './semantic-spacing-section.component';
import { LayoutStackSectionComponent } from './stack-section.component';
import { LayoutInlineSectionComponent } from './inline-section.component';
import { LayoutGridSectionComponent } from './grid-section.component';
import { LayoutContainerSectionComponent } from './container-section.component';
import { LayoutCompositionSectionComponent } from './composition-section.component';
import { LayoutDesignTokensSectionComponent } from './design-tokens-section.component';
import { LayoutThemedLayoutsSectionComponent } from './themed-layouts-section.component';
import { LayoutExamplesSectionComponent } from './examples-section.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    Card,
    Button,
    FormsModule,
    DocPageLayoutComponent,
    LayoutSemanticSpacingSectionComponent,
    LayoutStackSectionComponent,
    LayoutInlineSectionComponent,
    LayoutGridSectionComponent,
    LayoutContainerSectionComponent,
    LayoutCompositionSectionComponent,
    LayoutDesignTokensSectionComponent,
    LayoutThemedLayoutsSectionComponent,
    LayoutExamplesSectionComponent,
    CodePreviewComponent,
    Stack,
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
    { id: 'examples', label: 'Examples' },
  ];

  private readonly viewportSet = new Set<DocDemoViewportComponent>();
  readonly viewports = signal<DocDemoViewportComponent[]>([]);

  readonly registerViewport = (viewport: DocDemoViewportComponent): void => {
    if (!this.viewportSet.has(viewport)) {
      this.viewportSet.add(viewport);
      this.viewports.set([...this.viewportSet]);
    }
  };

  readonly unregisterViewport = (viewport: DocDemoViewportComponent): void => {
    if (this.viewportSet.delete(viewport)) {
      this.viewports.set([...this.viewportSet]);
    }
  };

  private primaryViewport(): DocDemoViewportComponent | undefined {
    return this.viewports()[0];
  }

  get viewportPresets(): { key: string; label: string; width: number; height: number }[] {
    return this.primaryViewport()?.presets() ?? [];
  }

  viewportDisplayWidth(): number {
    return this.primaryViewport()?.displayWidth() ?? 0;
  }

  viewportDisplayHeight(): number {
    return this.primaryViewport()?.displayHeight() ?? 0;
  }

  viewportCustomWidth(): number {
    return this.primaryViewport()?.customWidth() ?? 0;
  }

  viewportDensity(): 'default' | 'comfortable' | 'compact' {
    return this.primaryViewport()?.densityValue() ?? 'default';
  }

  private forEachViewport(fn: (vp: DocDemoViewportComponent) => void): void {
    this.viewports().forEach(fn);
  }

  setViewportCustomWidth(value: number): void {
    this.forEachViewport((vp: DocDemoViewportComponent) => vp.setCustomWidth(value));
  }

  setViewportPreset(preset: { key: string; label: string; width: number; height: number }): void {
    this.forEachViewport((vp: DocDemoViewportComponent) => vp.setPreset(preset));
  }

  applyViewportCustom(): void {
    this.forEachViewport((vp: DocDemoViewportComponent) => vp.setCustom());
  }

  rotateViewport(): void {
    this.forEachViewport((vp: DocDemoViewportComponent) => vp.rotate());
  }

  setViewportDensity(value: 'default' | 'comfortable' | 'compact'): void {
    this.forEachViewport((vp: DocDemoViewportComponent) => vp.setDensity(value));
  }

  readonly layoutExample = `<ui-lib-stack [gap]="3">
  <ui-lib-card>Card A</ui-lib-card>
  <ui-lib-card>Card B</ui-lib-card>
</ui-lib-stack>`;
}
