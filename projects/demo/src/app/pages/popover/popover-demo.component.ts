import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';
import type { PopoverVariant } from 'ui-lib-custom/popover';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Popover component.
 */
@Component({
  selector: 'app-popover-demo',
  standalone: true,
  imports: [CodeSnippet, Popover, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './popover-demo.component.html',
  styleUrl: './popover-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {
  public readonly importCode: string = "import { Popover } from 'ui-lib-custom/popover'";
  public readonly snippetBasic: string = `<button #trigger (click)="op.toggle(trigger)">Toggle</button>\n\n<ui-lib-popover #op>\n  <p>Popover body content.</p>\n</ui-lib-popover>`;
  public readonly snippetHeaderClose: string = `<ui-lib-popover #op header="User Details" [showCloseButton]="true">\n  <!-- content -->\n</ui-lib-popover>`;
  public readonly snippetDeclarative: string = `<ui-lib-popover [(visible)]="isOpen">...</ui-lib-popover>`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'header-close-button', label: 'Header & Close Button' },
    { id: 'rich-content', label: 'Rich Content' },
    { id: 'variants', label: 'Variants' },
    { id: 'non-dismissable', label: 'Non-dismissable' },
    { id: 'events', label: 'Events' },
    { id: 'declarative', label: 'Declarative' },
    { id: 'api', label: 'API' },
  ];

  public readonly variants: PopoverVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly lastEvent: WritableSignal<string> = signal<string>('—');
  public readonly declarativeVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly selectedVariant: WritableSignal<PopoverVariant> =
    signal<PopoverVariant>('material');

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public onShown(): void {
    this.lastEvent.set('shown');
  }

  public onHidden(): void {
    this.lastEvent.set('hidden');
  }
}
