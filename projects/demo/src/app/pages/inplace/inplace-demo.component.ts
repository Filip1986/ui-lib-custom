import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Inplace } from 'ui-lib-custom/inplace';
import type { InplaceVariant } from 'ui-lib-custom/inplace';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Inplace component.
 */
@Component({
  selector: 'app-inplace-demo',
  standalone: true,
  imports: [Inplace, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './inplace-demo.component.html',
  styleUrl: './inplace-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InplaceDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'closable', label: 'Closable' },
    { id: 'rich-content', label: 'Rich Content' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'variants', label: 'Variants' },
    { id: 'events', label: 'Events' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly variants: InplaceVariant[] = ['material', 'bootstrap', 'minimal'];

  // Basic demo
  public readonly basicActive: WritableSignal<boolean> = signal<boolean>(false);
  public readonly basicText: WritableSignal<string> = signal<string>('Click to edit this text');

  // Closable demo
  public readonly closableActive: WritableSignal<boolean> = signal<boolean>(false);
  public closableText: string = 'PrimeNG 19.0.0';

  // Image demo
  public readonly imageActive: WritableSignal<boolean> = signal<boolean>(false);

  // Disabled demo
  public readonly disabledText: string = 'This field is read-only';

  // Variants demo
  public readonly variantActives: WritableSignal<Record<InplaceVariant, boolean>> = signal<
    Record<InplaceVariant, boolean>
  >({
    material: false,
    bootstrap: false,
    minimal: false,
  });

  // Event log
  public readonly eventLog: WritableSignal<string[]> = signal<string[]>([]);

  public onActivated(label: string): void {
    this.eventLog.update((log: string[]): string[] => [`${label} activated`, ...log].slice(0, 5));
  }

  public onDeactivated(label: string): void {
    this.eventLog.update((log: string[]): string[] => [`${label} deactivated`, ...log].slice(0, 5));
  }

  public setVariantActive(variant: InplaceVariant, value: boolean): void {
    this.variantActives.update(
      (current: Record<InplaceVariant, boolean>): Record<InplaceVariant, boolean> => ({
        ...current,
        [variant]: value,
      })
    );
  }

  public clearLog(): void {
    this.eventLog.set([]);
  }
}
