import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { ProgressSpinner } from 'ui-lib-custom/progress-spinner';
import { Button } from 'ui-lib-custom/button';
import type { ProgressSpinnerSize, ProgressSpinnerVariant } from 'ui-lib-custom/progress-spinner';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the ProgressSpinner component.
 */
@Component({
  selector: 'app-progress-spinner-demo',
  standalone: true,
  imports: [CodeSnippet, ProgressSpinner, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './progress-spinner-demo.component.html',
  styleUrl: './progress-spinner-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerDemoComponent {
  public readonly importCode: string =
    "import { ProgressSpinner } from 'ui-lib-custom/progress-spinner'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'variants', label: 'Variants' },
    { id: 'animation-duration', label: 'Animation Duration' },
    { id: 'stroke-width-fill', label: 'Stroke Width & Fill' },
    { id: 'loading-overlay', label: 'Loading Overlay Pattern' },
    { id: 'playground', label: 'Playground' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  // ---- Interactive controls -----------------------------------------------
  public readonly interactiveSize: WritableSignal<ProgressSpinnerSize> =
    signal<ProgressSpinnerSize>('md');

  public readonly interactiveVariant: WritableSignal<ProgressSpinnerVariant> =
    signal<ProgressSpinnerVariant>('material');

  public readonly interactiveDuration: WritableSignal<string> = signal<string>('2s');

  public readonly interactiveStrokeWidth: WritableSignal<string> = signal<string>('2');

  // ---- Helpers -------------------------------------------------------------
  public setSize(size: ProgressSpinnerSize): void {
    this.interactiveSize.set(size);
  }

  public setVariant(variant: ProgressSpinnerVariant): void {
    this.interactiveVariant.set(variant);
  }

  public setDuration(duration: string): void {
    this.interactiveDuration.set(duration);
  }

  public setStrokeWidth(width: string): void {
    this.interactiveStrokeWidth.set(width);
  }
}
