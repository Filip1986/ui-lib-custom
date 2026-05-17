import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
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
  imports: [CodeSnippet, Fieldset, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './fieldset-demo.component.html',
  styleUrl: './fieldset-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetDemoComponent {
  public readonly importCode: string = "import { Fieldset } from 'ui-lib-custom/fieldset'";
  public readonly snippetBasic: string = `<ui-lib-fieldset legend="Personal Information">\n  <!-- content -->\n</ui-lib-fieldset>`;
  public readonly snippetToggleable: string = `<ui-lib-fieldset\n  legend="Advanced Options"\n  [toggleable]="true"\n  [(collapsed)]="isCollapsed"\n>\n  <!-- content -->\n</ui-lib-fieldset>`;
  public readonly snippetPreCollapsed: string = `<ui-lib-fieldset\n  legend="Hidden by Default"\n  [toggleable]="true"\n  [collapsed]="true"\n>\n  <p>Revealed on click</p>\n</ui-lib-fieldset>`;
  public readonly snippetCustomLegend: string = `<ui-lib-fieldset [toggleable]="true">\n  <span fieldsetLegend>\n    <i class="pi pi-user"></i> User <strong>Profile</strong>\n  </span>\n  <p>Body content</p>\n</ui-lib-fieldset>`;
  public readonly snippetVariants: string = `<ui-lib-fieldset variant="material" legend="Material" />\n<ui-lib-fieldset variant="bootstrap" legend="Bootstrap" />\n<ui-lib-fieldset variant="minimal" legend="Minimal" />`;
  public readonly snippetToggleEvent: string = `<ui-lib-fieldset\n  legend="Event Demo"\n  [toggleable]="true"\n  (toggled)="onToggle($event)"\n></ui-lib-fieldset>\n\n// component.ts\nonToggle(event: FieldsetToggleEvent): void {\n  console.log('collapsed:', event.collapsed);\n}`;
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
