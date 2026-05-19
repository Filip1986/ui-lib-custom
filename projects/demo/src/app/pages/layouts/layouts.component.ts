import { Component, ChangeDetectionStrategy, signal, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { FormsModule } from '@angular/forms';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import type { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { SemanticSpacingSectionComponent } from './semantic-spacing-section.component';
import { StackSectionComponent } from './stack-section.component';
import { InlineSectionComponent } from './inline-section.component';
import { GridSectionComponent } from './grid-section.component';
import { ContainerSectionComponent } from './container-section.component';
import { LayoutCompositionSectionComponent } from './composition-section.component';
import { DesignTokensSectionComponent } from './design-tokens-section.component';
import { ThemedLayoutsSectionComponent } from './themed-layouts-section.component';
import { LayoutExamplesSectionComponent } from './examples-section.component';
import { LayoutBasicExampleComponent } from '@demo/examples/layout-basic-example.component';

import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import { Panel } from 'ui-lib-custom/panel';
/**
 * Demo page aggregating layout primitives and sections.
 */
@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    Panel,
    Button,
    CodeSnippet,
    FormsModule,
    DocPageLayoutComponent,
    DocPageHeaderComponent,
    SemanticSpacingSectionComponent,
    StackSectionComponent,
    InlineSectionComponent,
    GridSectionComponent,
    ContainerSectionComponent,
    LayoutCompositionSectionComponent,
    DesignTokensSectionComponent,
    ThemedLayoutsSectionComponent,
    LayoutExamplesSectionComponent,
    LayoutBasicExampleComponent,
    DocTocComponent,
    DocCodeExampleComponent,
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutsComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly sections: DocSection[] = [
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

  private readonly viewportSet: Set<DocDemoViewportComponent> = new Set<DocDemoViewportComponent>();
  public readonly viewports: WritableSignal<DocDemoViewportComponent[]> = signal<
    DocDemoViewportComponent[]
  >([]);

  public readonly registerViewport: (viewport: DocDemoViewportComponent) => void = (
    viewport: DocDemoViewportComponent
  ): void => {
    if (!this.viewportSet.has(viewport)) {
      this.viewportSet.add(viewport);
      this.viewports.set([...this.viewportSet]);
    }
  };

  public readonly unregisterViewport: (viewport: DocDemoViewportComponent) => void = (
    viewport: DocDemoViewportComponent
  ): void => {
    if (this.viewportSet.delete(viewport)) {
      this.viewports.set([...this.viewportSet]);
    }
  };

  private primaryViewport(): DocDemoViewportComponent | undefined {
    return this.viewports()[0];
  }

  public get viewportPresets(): { key: string; label: string; width: number; height: number }[] {
    return this.primaryViewport()?.presets() ?? [];
  }

  public viewportDisplayWidth(): number {
    return this.primaryViewport()?.displayWidth() ?? 0;
  }

  public viewportDisplayHeight(): number {
    return this.primaryViewport()?.displayHeight() ?? 0;
  }

  public viewportCustomWidth(): number {
    return this.primaryViewport()?.customWidth() ?? 0;
  }

  public viewportDensity(): 'default' | 'comfortable' | 'compact' {
    return this.primaryViewport()?.densityValue() ?? 'default';
  }

  private forEachViewport(fn: (vp: DocDemoViewportComponent) => void): void {
    this.viewports().forEach(fn);
  }

  public setViewportCustomWidth(value: number): void {
    this.forEachViewport((vp: DocDemoViewportComponent): void => vp.setCustomWidth(value));
  }

  public setViewportPreset(preset: {
    key: string;
    label: string;
    width: number;
    height: number;
  }): void {
    this.forEachViewport((vp: DocDemoViewportComponent): void => vp.setPreset(preset));
  }

  public applyViewportCustom(): void {
    this.forEachViewport((vp: DocDemoViewportComponent): void => vp.setCustom());
  }

  public rotateViewport(): void {
    this.forEachViewport((vp: DocDemoViewportComponent): void => vp.rotate());
  }

  public setViewportDensity(value: 'default' | 'comfortable' | 'compact'): void {
    this.forEachViewport((vp: DocDemoViewportComponent): void => vp.setDensity(value));
  }

  public readonly layoutExample: string = `<ui-lib-stack [gap]="3">
  <ui-lib-card>Card A</ui-lib-card>
  <ui-lib-card>Card B</ui-lib-card>
</ui-lib-stack>`;

  public readonly layoutExampleTs: string = `import { Component } from '@angular/core';
import { Stack } from 'ui-lib-custom/stack';
import { Card } from 'ui-lib-custom/card';

@Component({
  standalone: true,
  imports: [Stack, Card],
  templateUrl: './my.component.html',
})
export class MyComponent {}`;
}
