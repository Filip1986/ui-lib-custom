import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { AutoFocus } from 'ui-lib-custom/auto-focus';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the AutoFocus directive.
 * Demonstrates basic usage, conditional focus, and the full input API.
 */
@Component({
  selector: 'app-auto-focus-demo',
  standalone: true,
  imports: [AutoFocus, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './auto-focus-demo.component.html',
  styleUrl: './auto-focus-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoFocusDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'conditional-focus', label: 'Conditional Focus' },
    { id: 'disable-autofocus', label: 'Disable Autofocus' },
    { id: 'api', label: 'API' },
  ];

  public readonly showConditional: WritableSignal<boolean> = signal<boolean>(false);
  public readonly enableFocus: WritableSignal<boolean> = signal<boolean>(true);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public toggleConditional(): void {
    this.showConditional.set(!this.showConditional());
  }

  public toggleFocus(): void {
    this.enableFocus.set(!this.enableFocus());
  }
}
