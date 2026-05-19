import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';
import type { BottomSheetVariant } from 'ui-lib-custom/bottom-sheet';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the BottomSheet component.
 */
@Component({
  selector: 'app-bottom-sheet-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    DocCodeExampleComponent,
    BottomSheet,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './bottom-sheet-demo.component.html',
  styleUrl: './bottom-sheet-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetDemoComponent {
  public readonly importCode: string = "import { BottomSheet } from 'ui-lib-custom/bottom-sheet'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    apgPattern: {
      name: 'Dialog (Modal)',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
    },
    competitiveParity: 'pending',
  };
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-bottom-sheet-panel-bg',
      default: 'var(--uilib-surface, #fff)',
      description: 'Panel background colour.',
    },
    {
      variable: '--uilib-bottom-sheet-panel-shadow',
      default: 'elevation shadow',
      description: 'Box-shadow above the panel.',
    },
    {
      variable: '--uilib-bottom-sheet-border-radius',
      default: '16px',
      description: 'Top corner radius of the panel.',
    },
    {
      variable: '--uilib-bottom-sheet-backdrop-bg',
      default: 'rgba(0,0,0,.48)',
      description: 'Backdrop overlay colour.',
    },
    {
      variable: '--uilib-bottom-sheet-z-index',
      default: 'var(--uilib-z-overlay, 1000)',
      description: 'Stack order of the sheet.',
    },
    {
      variable: '--uilib-bottom-sheet-transition-duration',
      default: '0.32s',
      description:
        'Slide-in/out animation duration. Overridden to <code>0</code> under <code>prefers-reduced-motion</code>.',
    },
    {
      variable: '--uilib-bottom-sheet-transition-easing',
      default: 'cubic-bezier(0.32, 0.72, 0, 1)',
      description: 'Slide-in/out animation easing.',
    },
    {
      variable: '--uilib-bottom-sheet-padding',
      default: 'var(--uilib-spacing-5, 1.25rem)',
      description: 'Internal content padding.',
    },
    {
      variable: '--uilib-bottom-sheet-header-border',
      default: '1px solid …',
      description: 'Header bottom border.',
    },
    {
      variable: '--uilib-bottom-sheet-title-color',
      default: 'var(--uilib-color-text-primary)',
      description: 'Header title text colour.',
    },
    {
      variable: '--uilib-bottom-sheet-close-color',
      default: 'var(--uilib-color-text-secondary)',
      description: 'Close button icon colour.',
    },
  ];

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
    readonly basicTs: string;
    readonly withHeader: string;
    readonly withHeaderTs: string;
    readonly footerSlot: string;
    readonly footerSlotTs: string;
    readonly backdropDismiss: string;
    readonly backdropDismissTs: string;
    readonly variants: string;
    readonly variantsTs: string;
  } = {
    import: `import { BottomSheet } from 'ui-lib-custom/bottom-sheet';
import type { BottomSheetVariant } from 'ui-lib-custom/bottom-sheet';`,
    basic: `<ui-lib-button (click)="isOpen.set(true)">Open Sheet</ui-lib-button>

<ui-lib-bottom-sheet [(visible)]="isOpen">
  <p>Sheet content goes here.</p>
</ui-lib-bottom-sheet>`,
    basicTs: `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';

@Component({
  standalone: true,
  imports: [Button, BottomSheet],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);
}`,
    withHeader: `<ui-lib-bottom-sheet [(visible)]="isOpen" header="Share">
  <p>Choose where to share this item.</p>
</ui-lib-bottom-sheet>`,
    withHeaderTs: `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';

@Component({
  standalone: true,
  imports: [Button, BottomSheet],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);
}`,
    footerSlot: `<ui-lib-bottom-sheet [(visible)]="isOpen" header="Confirm action">
  <p>Are you sure you want to proceed?</p>
  <div bottomSheetFooter>
    <ui-lib-button appearance="outline" (click)="isOpen.set(false)">Cancel</ui-lib-button>
    <ui-lib-button (click)="confirm()">Confirm</ui-lib-button>
  </div>
</ui-lib-bottom-sheet>`,
    footerSlotTs: `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';

@Component({
  standalone: true,
  imports: [Button, BottomSheet],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);

  public confirm(): void {
    this.isOpen.set(false);
  }
}`,
    backdropDismiss: `<!-- backdrop click does NOT close the sheet -->
<ui-lib-bottom-sheet [(visible)]="isOpen" [closeOnBackdrop]="false">
  <p>Use the close button or Escape to dismiss.</p>
</ui-lib-bottom-sheet>`,
    backdropDismissTs: `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';

@Component({
  standalone: true,
  imports: [Button, BottomSheet],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);
}`,
    variants: `<ui-lib-bottom-sheet [(visible)]="isOpen" variant="material"  header="Material" />
<ui-lib-bottom-sheet [(visible)]="isOpen" variant="bootstrap" header="Bootstrap" />
<ui-lib-bottom-sheet [(visible)]="isOpen" variant="minimal"   header="Minimal" />`,
    variantsTs: `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { BottomSheet } from 'ui-lib-custom/bottom-sheet';

@Component({
  standalone: true,
  imports: [Button, BottomSheet],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);
}`,
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

  public readonly apiRows: ApiPropRow[] = [
    { name: 'header', type: 'string', default: "''", description: 'Sheet header text.' },
    { name: 'closable', type: 'boolean', default: 'true', description: 'Shows the close button.' },
    {
      name: 'closeOnBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Closes the sheet when the backdrop is tapped.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Closes the sheet on Escape key.',
    },
    {
      name: 'snapPoints',
      type: 'number[]',
      default: '[0.4, 0.9]',
      description: 'Fraction of viewport height at which the sheet can snap.',
    },
    {
      name: 'defaultSnapPoint',
      type: 'number',
      default: '0.4',
      description: 'Initial snap point fraction.',
    },
    {
      name: 'hasHandle',
      type: 'boolean',
      default: 'true',
      description: 'Shows the drag handle indicator.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'ariaLabel', type: 'string | null', default: 'null', description: 'Accessible label.' },
    {
      name: 'ariaLabelledBy',
      type: 'string | null',
      default: 'null',
      description: 'Id of an external label element.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Escape',
      action:
        'Closes the sheet (when <code>[closeOnEscape]="true"</code>) and returns focus to the previously focused element.',
    },
    {
      key: 'Tab',
      action:
        'Cycles focus forward through all focusable elements inside the panel. Wraps from last to first.',
    },
    {
      key: 'Shift+Tab',
      action: 'Cycles focus backward through all focusable elements. Wraps from first to last.',
    },
  ];

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'visible',
      type: 'boolean',
      default: 'false',
      description:
        'Controls open/close state. Two-way bindable via [(visible)]. A model() signal internally.',
    },
    {
      name: 'header',
      type: 'string',
      default: "''",
      description:
        'Optional header text. When set, renders a title bar with a close button and wires aria-labelledby.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Visual variant. Inherits from ThemeConfigService when null.',
    },
    {
      name: 'showBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the semi-transparent backdrop behind the panel.',
    },
    {
      name: 'closeOnBackdrop',
      type: 'boolean',
      default: 'true',
      description: 'Whether clicking the backdrop closes the sheet.',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      description: 'Whether pressing Escape closes the sheet.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS classes applied to the host element.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: '(shown)',
      type: 'OutputEmitterRef<void>',
      description: 'Emits after the sheet transitions to open.',
    },
    {
      name: '(hidden)',
      type: 'OutputEmitterRef<void>',
      description: 'Emits after the sheet transitions to closed.',
    },
  ];

  public readonly apiSlotRows: readonly ApiPropRow[] = [
    {
      name: 'default',
      type: 'slot',
      description: 'Main body content rendered inside a scrollable content area.',
    },
    {
      name: '[bottomSheetFooter]',
      type: 'slot',
      description: 'Sticky footer pinned to the bottom of the panel. Hidden when empty.',
    },
  ];
}
