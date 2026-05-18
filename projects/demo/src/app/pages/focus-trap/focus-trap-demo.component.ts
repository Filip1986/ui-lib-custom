import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { FocusTrapDirective } from 'ui-lib-custom/focus-trap';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';

/**
 * Demo page for the FocusTrap directive.
 * Demonstrates basic usage, conditional activation, and the modal overlay pattern.
 */
@Component({
  selector: 'app-focus-trap-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    FocusTrapDirective,
    Button,
    DocPageLayoutComponent,
    DocTocComponent,
    DocPageHeaderComponent,
  ],
  templateUrl: './focus-trap-demo.component.html',
  styleUrl: './focus-trap-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusTrapDemoComponent {
  public readonly importCode: string =
    "import { FocusTrapDirective } from 'ui-lib-custom/focus-trap'";
  public readonly snippetBasicUsage: string = `<div uiLibFocusTrap>\n  <input type="text" />\n  <button>Submit</button>\n</div>`;
  public readonly snippetToggleTrap: string = `<div [uiLibFocusTrap]="isActive">\n  <input type="text" />\n</div>`;
  public readonly snippetModalPattern: string = `@if (isModalOpen) {\n  <div class="modal" role="dialog" aria-modal="true" [uiLibFocusTrap]="true">\n    <h2>Dialog title</h2>\n    <button (click)="closeModal()">Close</button>\n  </div>\n}`;
  public readonly snippetImport: string = `import { FocusTrapDirective } from 'ui-lib-custom/focus-trap';`;
  public readonly snippetSelector: string = `[uiLibFocusTrap]`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'toggle-trap', label: 'Toggle Trap' },
    { id: 'modal-overlay-pattern', label: 'Modal Overlay Pattern' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly isModalOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isTrapEnabled: WritableSignal<boolean> = signal<boolean>(true);
  public readonly formName: WritableSignal<string> = signal<string>('');
  public readonly formEmail: WritableSignal<string> = signal<string>('');

  public openModal(): void {
    this.isModalOpen.set(true);
  }

  public closeModal(): void {
    this.isModalOpen.set(false);
  }

  public toggleTrap(): void {
    this.isTrapEnabled.set(!this.isTrapEnabled());
  }

  public onFormNameChange(event: Event): void {
    this.formName.set((event.target as HTMLInputElement).value);
  }

  public onFormEmailChange(event: Event): void {
    this.formEmail.set((event.target as HTMLInputElement).value);
  }
}
