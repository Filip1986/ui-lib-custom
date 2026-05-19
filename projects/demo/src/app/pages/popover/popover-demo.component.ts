import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Popover } from 'ui-lib-custom/popover';
import type { PopoverVariant } from 'ui-lib-custom/popover';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';

/**
 * Demo page for the Popover component.
 */
@Component({
  selector: 'app-popover-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Popover,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocCodeExampleComponent,
  ],
  templateUrl: './popover-demo.component.html',
  styleUrl: './popover-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {
  public readonly importCode: string = "import { Popover } from 'ui-lib-custom/popover'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };
  public readonly snippetBasic: string = `<button #trigger (click)="op.toggle(trigger)">Toggle</button>\n\n<ui-lib-popover #op>\n  <p>Popover body content.</p>\n</ui-lib-popover>`;
  public readonly snippetBasicTs: string = `import { Component } from '@angular/core';\nimport { Popover } from 'ui-lib-custom/popover';\n\n@Component({\n  standalone: true,\n  imports: [Popover],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {}`;
  public readonly snippetHeaderClose: string = `<ui-lib-popover #op header="User Details" [showCloseButton]="true">\n  <!-- content -->\n</ui-lib-popover>`;
  public readonly snippetHeaderCloseTs: string = `import { Component } from '@angular/core';\nimport { Popover } from 'ui-lib-custom/popover';\n\n@Component({\n  standalone: true,\n  imports: [Popover],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {}`;
  public readonly snippetDeclarative: string = `<ui-lib-popover [(visible)]="isOpen">...</ui-lib-popover>`;
  public readonly snippetDeclarativeTs: string = `import { Component, signal } from '@angular/core';\nimport { Popover } from 'ui-lib-custom/popover';\n\n@Component({\n  standalone: true,\n  imports: [Popover],\n  templateUrl: './my.component.html',\n})\nexport class MyComponent {\n  readonly isOpen = signal(false);\n}`;
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
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
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

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Escape',
      action: 'Closes the popover and returns focus to the trigger element.',
    },
    {
      key: 'Tab / Shift+Tab',
      action: 'Cycles focus through focusable elements inside the popover panel.',
    },
    {
      key: 'Enter / Space',
      target: 'Close button',
      action: 'Closes the popover (when a close button is rendered).',
    },
  ];
}
