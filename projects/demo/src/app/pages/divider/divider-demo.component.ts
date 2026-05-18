import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Divider } from 'ui-lib-custom/divider';
import type {
  DividerAlign,
  DividerOrientation,
  DividerType,
  DividerVariant,
} from 'ui-lib-custom/divider';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Divider component.
 */
@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [Divider, Button, DocPageHeaderComponent, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './divider-demo.component.html',
  styleUrl: './divider-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {
  public readonly importCode: string = "import { Divider } from 'ui-lib-custom/divider'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'with-label', label: 'With Label' },
    { id: 'alignment', label: 'Alignment' },
    { id: 'line-types', label: 'Line Types' },
    { id: 'vertical', label: 'Vertical' },
    { id: 'vertical-alignment', label: 'Vertical Alignment' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly types: DividerType[] = ['solid', 'dashed', 'dotted'];
  public readonly variants: DividerVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly horizontalAligns: DividerAlign[] = ['left', 'center', 'right'];
  public readonly verticalAligns: DividerAlign[] = ['top', 'center', 'bottom'];

  public readonly playgroundOrientation: WritableSignal<DividerOrientation> =
    signal<DividerOrientation>('horizontal');
  public readonly playgroundType: WritableSignal<DividerType> = signal<DividerType>('solid');
  public readonly playgroundAlign: WritableSignal<DividerAlign | null> =
    signal<DividerAlign | null>(null);
  public readonly playgroundVariant: WritableSignal<DividerVariant> =
    signal<DividerVariant>('material');
  public readonly playgroundHasContent: WritableSignal<boolean> = signal<boolean>(true);

  public setOrientation(orientation: DividerOrientation): void {
    this.playgroundOrientation.set(orientation);
    this.playgroundAlign.set(null);
  }

  public setType(type: DividerType): void {
    this.playgroundType.set(type);
  }

  public setAlign(align: DividerAlign): void {
    this.playgroundAlign.set(align);
  }

  public setVariant(variant: DividerVariant): void {
    this.playgroundVariant.set(variant);
  }

  public toggleContent(): void {
    this.playgroundHasContent.set(!this.playgroundHasContent());
  }
}
