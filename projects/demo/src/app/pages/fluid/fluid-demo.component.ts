import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Fluid, FluidDirective } from 'ui-lib-custom/fluid';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';

/**
 * Demo page for the Fluid component and FluidDirective.
 * Demonstrates how ui-lib-fluid stretches form controls to full width.
 */
@Component({
  selector: 'app-fluid-demo',
  standalone: true,
  imports: [
    Fluid,
    FluidDirective,
    Button,
    DocPageLayoutComponent,
    DocTocComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
  ],
  templateUrl: './fluid-demo.component.html',
  styleUrl: './fluid-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FluidDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 8,
      dx: 9,
      docs: 8,
      polish: 9,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { Fluid, FluidDirective } from 'ui-lib-custom/fluid'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'using-the-component', label: 'Using the Component' },
    { id: 'using-the-directive', label: 'Using the Directive' },
    { id: 'conditional-fluid', label: 'Conditional Fluid' },
    { id: 'attribute-shorthand', label: 'Attribute Shorthand' },
    { id: 'api-reference', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly isFluid: WritableSignal<boolean> = signal<boolean>(true);
  public readonly name: WritableSignal<string> = signal<string>('');
  public readonly email: WritableSignal<string> = signal<string>('');

  public toggleFluid(): void {
    this.isFluid.set(!this.isFluid());
  }

  public onNameChange(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }

  public onEmailChange(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }
}
