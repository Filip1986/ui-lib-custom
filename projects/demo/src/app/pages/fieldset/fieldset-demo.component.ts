import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Fieldset } from 'ui-lib-custom/fieldset';
import type { FieldsetVariant } from 'ui-lib-custom/fieldset';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Fieldset component.
 */
@Component({
  selector: 'app-fieldset-demo',
  standalone: true,
  imports: [Fieldset, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './fieldset-demo.component.html',
  styleUrl: './fieldset-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'toggleable', label: 'Toggleable' },
    { id: 'pre-collapsed', label: 'Pre-collapsed' },
    { id: 'custom-legend', label: 'Custom Legend' },
    { id: 'variants', label: 'Variants' },
    { id: 'toggle-event', label: 'Toggle Event' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly isBasicCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isAdvancedCollapsed: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundToggleable: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundVariant: WritableSignal<FieldsetVariant> =
    signal<FieldsetVariant>('material');

  public readonly variants: FieldsetVariant[] = ['material', 'bootstrap', 'minimal'];

  public toggleBasic(): void {
    this.isBasicCollapsed.update((current: boolean): boolean => !current);
  }

  public setPlaygroundVariant(variant: FieldsetVariant): void {
    this.playgroundVariant.set(variant);
  }
}
