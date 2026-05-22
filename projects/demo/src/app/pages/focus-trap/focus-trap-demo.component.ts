import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { FocusTrapDirective } from 'ui-lib-custom/focus-trap';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
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
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocAriaTableComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './focus-trap-demo.component.html',
  styleUrl: './focus-trap-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusTrapDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { FocusTrapDirective } from 'ui-lib-custom/focus-trap'";
  public readonly snippetBasicUsage: string = `<div uiLibFocusTrap>\n  <input type="text" />\n  <button>Submit</button>\n</div>`;
  public readonly snippetBasicUsageTs: string = `import { Component } from '@angular/core';\nimport { FocusTrapDirective } from 'ui-lib-custom/focus-trap';\n\n@Component({\n  standalone: true,\n  imports: [FocusTrapDirective],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {}`;
  public readonly snippetToggleTrap: string = `<div [uiLibFocusTrap]="isActive">\n  <input type="text" />\n</div>`;
  public readonly snippetToggleTrapTs: string = `import { Component, signal } from '@angular/core';\nimport { FocusTrapDirective } from 'ui-lib-custom/focus-trap';\n\n@Component({\n  standalone: true,\n  imports: [FocusTrapDirective],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {\n  readonly isActive = signal(true);\n\n  toggleTrap(): void {\n    this.isActive.set(!this.isActive());\n  }\n}`;
  public readonly snippetModalPattern: string = `@if (isModalOpen) {\n  <div class="modal" role="dialog" aria-modal="true" [uiLibFocusTrap]="true">\n    <h2>Dialog title</h2>\n    <button (click)="closeModal()">Close</button>\n  </div>\n}`;
  public readonly snippetModalPatternTs: string = `import { Component, signal } from '@angular/core';\nimport { FocusTrapDirective } from 'ui-lib-custom/focus-trap';\n\n@Component({\n  standalone: true,\n  imports: [FocusTrapDirective],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {\n  readonly isModalOpen = signal(false);\n\n  openModal(): void { this.isModalOpen.set(true); }\n  closeModal(): void { this.isModalOpen.set(false); }\n}`;
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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'accessibility', label: 'Accessibility' },
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

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Trap container',
      attribute: 'tabindex',
      value: '"-1"',
      notes:
        'The container receives <code>tabindex="-1"</code> so it can be programmatically focused when activated.',
    },
    {
      element: 'Trapped element',
      attribute: 'aria-modal',
      value: '"true"',
      notes:
        'When used in a modal context, apply <code>aria-modal="true"</code> to tell assistive technologies that content outside is inert.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'Moves focus forward through focusable elements inside the trap. Wraps from last to first.',
    },
    {
      key: 'Shift+Tab',
      action: 'Moves focus backward. Wraps from first to last.',
    },
  ];

  public readonly apiRows: readonly ApiPropRow[] = [
    {
      name: 'uiLibFocusTrap',
      type: 'boolean',
      default: 'false',
      description: 'When true, keyboard focus is contained within the host element.',
    },
  ];
}
