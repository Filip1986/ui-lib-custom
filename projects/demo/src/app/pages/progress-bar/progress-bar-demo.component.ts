import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { ProgressBar } from 'ui-lib-custom/progress-bar';
import type { ProgressBarVariant } from 'ui-lib-custom/progress-bar';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the ProgressBar component.
 */
@Component({
  selector: 'app-progress-bar-demo',
  standalone: true,
  imports: [CodeSnippet, ProgressBar, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './progress-bar-demo.component.html',
  styleUrl: './progress-bar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarDemoComponent {
  public readonly importCode: string = "import { ProgressBar } from 'ui-lib-custom/progress-bar'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'no-label', label: 'No label' },
    { id: 'custom-label', label: 'Custom label' },
    { id: 'indeterminate', label: 'Indeterminate' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'custom-colour', label: 'Custom colour' },
    { id: 'dynamic-value', label: 'Dynamic value' },
    { id: 'api', label: 'API' },
  ];

  public readonly basicValue: WritableSignal<number> = signal<number>(75);
  public readonly dynamicValue: WritableSignal<number> = signal<number>(0);

  public readonly variants: ProgressBarVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public increment(): void {
    const current: number = this.dynamicValue();
    this.dynamicValue.set(Math.min(current + 10, 100));
  }

  public reset(): void {
    this.dynamicValue.set(0);
  }
}
