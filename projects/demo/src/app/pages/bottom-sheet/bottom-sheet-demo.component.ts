import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';
import type { BottomSheetVariant } from 'ui-lib-custom/bottom-sheet';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the BottomSheet component.
 */
@Component({
  selector: 'app-bottom-sheet-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    BottomSheet,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './bottom-sheet-demo.component.html',
  styleUrl: './bottom-sheet-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetDemoComponent {
  public readonly importCode: string = "import { BottomSheet } from 'ui-lib-custom/bottom-sheet'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'with-header', label: 'With Header' },
    { id: 'footer-slot', label: 'Footer Slot' },
    { id: 'backdrop-dismiss', label: 'Backdrop Dismiss' },
    { id: 'variants', label: 'Variants' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
        { id: 'api-slots', label: 'Content Slots' },
        { id: 'api-css', label: 'CSS Custom Properties' },
      ],
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly withHeader: string;
    readonly footerSlot: string;
    readonly backdropDismiss: string;
    readonly variants: string;
  } = {
    import: `import { BottomSheet } from 'ui-lib-custom/bottom-sheet';
import type { BottomSheetVariant } from 'ui-lib-custom/bottom-sheet';`,
    basic: `<ui-lib-button (click)="isOpen.set(true)">Open Sheet</ui-lib-button>

<ui-lib-bottom-sheet [(visible)]="isOpen">
  <p>Sheet content goes here.</p>
</ui-lib-bottom-sheet>`,
    withHeader: `<ui-lib-bottom-sheet [(visible)]="isOpen" header="Share">
  <p>Choose where to share this item.</p>
</ui-lib-bottom-sheet>`,
    footerSlot: `<ui-lib-bottom-sheet [(visible)]="isOpen" header="Confirm action">
  <p>Are you sure you want to proceed?</p>
  <div bottomSheetFooter>
    <ui-lib-button appearance="outline" (click)="isOpen.set(false)">Cancel</ui-lib-button>
    <ui-lib-button (click)="confirm()">Confirm</ui-lib-button>
  </div>
</ui-lib-bottom-sheet>`,
    backdropDismiss: `<!-- backdrop click does NOT close the sheet -->
<ui-lib-bottom-sheet [(visible)]="isOpen" [closeOnBackdrop]="false">
  <p>Use the close button or Escape to dismiss.</p>
</ui-lib-bottom-sheet>`,
    variants: `<ui-lib-bottom-sheet [(visible)]="isOpen" variant="material"  header="Material" />
<ui-lib-bottom-sheet [(visible)]="isOpen" variant="bootstrap" header="Bootstrap" />
<ui-lib-bottom-sheet [(visible)]="isOpen" variant="minimal"   header="Minimal" />`,
  } as const;

  public readonly variants: BottomSheetVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly basicOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly headerOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly footerOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly noBackdropOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly noEscapeOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly materialOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly bootstrapOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly minimalOpen: WritableSignal<boolean> = signal<boolean>(false);

  public openVariant(variant: BottomSheetVariant): void {
    if (variant === 'material') this.materialOpen.set(true);
    else if (variant === 'bootstrap') this.bootstrapOpen.set(true);
    else this.minimalOpen.set(true);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
