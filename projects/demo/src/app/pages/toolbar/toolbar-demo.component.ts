import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { Toolbar } from 'ui-lib-custom/toolbar';
import type { ToolbarSize, ToolbarVariant } from 'ui-lib-custom/toolbar';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Toolbar component.
 */
@Component({
  selector: 'app-toolbar-demo',
  standalone: true,
  imports: [
    Toolbar,
    Button,
    CodeSnippet,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './toolbar-demo.component.html',
  styleUrl: './toolbar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarDemoComponent {
  public readonly importCode: string = "import { Toolbar } from 'ui-lib-custom/toolbar'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'start-only', label: 'Start Only' },
    { id: 'start-and-end', label: 'Start and End' },
    { id: 'all-three-slots', label: 'All Three Slots' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly variants: ToolbarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: ToolbarSize[] = ['sm', 'md', 'lg'];

  public readonly playgroundVariant: WritableSignal<ToolbarVariant> =
    signal<ToolbarVariant>('material');
  public readonly playgroundSize: WritableSignal<ToolbarSize> = signal<ToolbarSize>('md');

  public setVariant(variant: ToolbarVariant): void {
    this.playgroundVariant.set(variant);
  }

  public setSize(size: ToolbarSize): void {
    this.playgroundSize.set(size);
  }
}
