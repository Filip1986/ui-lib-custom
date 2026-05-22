import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Fluid, FluidDirective } from 'ui-lib-custom/fluid';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
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
    DocApiReferenceComponent,
    DocSectionComponent,
    DocAriaTableComponent,
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
    { id: 'api', label: 'API Reference' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Fluid host / wrapper',
      attribute: '(none)',
      value: '—',
      notes:
        'The <code>ui-lib-fluid</code> component and <code>[uiLibFluid]</code> directive add no ARIA attributes — they only apply a CSS class. Accessibility is the responsibility of the wrapped form controls.',
    },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: '(structural)',
      type: 'directive',
      description:
        'Apply [uilibFluid] to any element to make its child form controls expand to full width.',
    },
  ];

  public readonly isFluid: WritableSignal<boolean> = signal<boolean>(true);
  public readonly name: WritableSignal<string> = signal<string>('');
  public readonly email: WritableSignal<string> = signal<string>('');

  public readonly fluidComponentRows: ApiPropRow[] = [
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes appended to the host element.',
    },
  ];

  public readonly fluidDirectiveRows: ApiPropRow[] = [
    {
      name: 'uiLibFluid',
      type: 'boolean',
      default: 'true',
      description:
        'When <code>true</code> the <code>ui-lib-fluid</code> class is applied to the host. Supports attribute-only usage (<code>&lt;div uiLibFluid&gt;</code>).',
    },
  ];

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
