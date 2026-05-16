import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Stepper } from 'ui-lib-custom/stepper';
import { StepperPanel } from 'ui-lib-custom/stepper';
import type { StepChangeEvent, StepperOrientation, StepperVariant } from 'ui-lib-custom/stepper';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Stepper component.
 */
@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [Stepper, StepperPanel, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './stepper-demo.component.html',
  styleUrl: './stepper-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'linear-mode', label: 'Linear Mode' },
    { id: 'vertical-orientation', label: 'Vertical Orientation' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  // Basic example
  public readonly basicStep: WritableSignal<number> = signal<number>(0);

  // Linear example
  public readonly linearStep: WritableSignal<number> = signal<number>(0);

  // Vertical example
  public readonly verticalStep: WritableSignal<number> = signal<number>(0);

  // Variants
  public readonly materialStep: WritableSignal<number> = signal<number>(0);
  public readonly bootstrapStep: WritableSignal<number> = signal<number>(0);
  public readonly minimalStep: WritableSignal<number> = signal<number>(0);

  // Playground
  public readonly playgroundStep: WritableSignal<number> = signal<number>(0);
  public readonly playgroundVariant: WritableSignal<StepperVariant> =
    signal<StepperVariant>('material');
  public readonly playgroundOrientation: WritableSignal<StepperOrientation> =
    signal<StepperOrientation>('horizontal');
  public readonly playgroundLinear: WritableSignal<boolean> = signal<boolean>(false);
  public readonly lastStepChange: WritableSignal<StepChangeEvent | null> =
    signal<StepChangeEvent | null>(null);

  public readonly variants: StepperVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly orientations: StepperOrientation[] = ['horizontal', 'vertical'];

  public setPlaygroundVariant(variant: StepperVariant): void {
    this.playgroundVariant.set(variant);
    this.playgroundStep.set(0);
  }

  public setPlaygroundOrientation(orientation: StepperOrientation): void {
    this.playgroundOrientation.set(orientation);
    this.playgroundStep.set(0);
  }

  public handleStepChange(event: StepChangeEvent): void {
    this.lastStepChange.set(event);
  }
}
