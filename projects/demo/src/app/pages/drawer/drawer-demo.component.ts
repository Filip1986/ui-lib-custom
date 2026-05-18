import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Drawer } from 'ui-lib-custom/drawer';
import type { DrawerPosition, DrawerVariant } from 'ui-lib-custom/drawer';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Drawer component.
 */
@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Drawer,
    TitleCasePipe,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './drawer-demo.component.html',
  styleUrl: './drawer-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerDemoComponent {
  public readonly importCode: string = "import { Drawer } from 'ui-lib-custom/drawer'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'positions', label: 'Positions' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'without-backdrop', label: 'Without Backdrop' },
    { id: 'with-footer', label: 'With Footer' },
    { id: 'full-screen', label: 'Full Screen' },
    { id: 'api-reference', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly basicOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly positionOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly currentPosition: WritableSignal<DrawerPosition> = signal<DrawerPosition>('right');
  public readonly variantOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly currentVariant: WritableSignal<DrawerVariant> = signal<DrawerVariant>('material');
  public readonly noBackdropOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly fullScreenOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly footerOpen: WritableSignal<boolean> = signal<boolean>(false);

  public openPosition(position: DrawerPosition): void {
    this.currentPosition.set(position);
    this.positionOpen.set(true);
  }

  public openVariant(variant: DrawerVariant): void {
    this.currentVariant.set(variant);
    this.variantOpen.set(true);
  }
}
