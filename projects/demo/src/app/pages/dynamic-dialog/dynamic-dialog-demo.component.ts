import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import type { OnInit, Signal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import {
  DialogService,
  DynamicDialogRef,
  DYNAMIC_DIALOG_CONFIG,
} from 'ui-lib-custom/dynamic-dialog';
import type {
  DynamicDialogConfig,
  DynamicDialogVariant,
  DynamicDialogPosition,
} from 'ui-lib-custom/dynamic-dialog';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
// ---- Guest components rendered inside the dialog ----

/**
 * Simple guest component rendered inside a DynamicDialog by the demo.
 */
@Component({
  selector: 'app-simple-dialog-content',
  standalone: true,
  imports: [Button],
  template: `
    <p style="margin: 0 0 1.5rem">
      This content was loaded dynamically from <code>SimpleDialogContentComponent</code>. The dialog
      shell — header, close button, backdrop — is provided by <code>DialogService</code>.
    </p>
    <ui-lib-button type="button" severity="primary" (click)="close()">Got it</ui-lib-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDialogContentComponent {
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  public close(): void {
    this.ref.close();
  }
}

/** Data shape expected in config.data by DataDialogContentComponent. */
interface UserData {
  userId: number;
  name: string;
  role: string;
}

/**
 * Guest component demonstrating data injection via DYNAMIC_DIALOG_CONFIG.
 */
@Component({
  selector: 'app-data-dialog-content',
  standalone: true,
  imports: [Button],
  template: `
    <dl class="dialog-data-list">
      <dt>User ID</dt>
      <dd>{{ userId }}</dd>
      <dt>Name</dt>
      <dd>{{ name }}</dd>
      <dt>Role</dt>
      <dd>{{ role }}</dd>
    </dl>
    <div style="display:flex;gap:0.75rem;margin-top:1.5rem;justify-content:flex-end">
      <ui-lib-button type="button" severity="secondary" (click)="cancel()">Cancel</ui-lib-button>
      <ui-lib-button type="button" severity="primary" (click)="confirm()">Confirm</ui-lib-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDialogContentComponent implements OnInit {
  private readonly config: DynamicDialogConfig = inject(DYNAMIC_DIALOG_CONFIG);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  protected userId: number = 0;
  protected name: string = '';
  protected role: string = '';

  public ngOnInit(): void {
    const data: UserData | undefined = this.config.data as UserData | undefined;
    this.userId = data?.userId ?? 0;
    this.name = data?.name ?? '';
    this.role = data?.role ?? '';
  }

  public cancel(): void {
    this.ref.close(null);
  }

  public confirm(): void {
    this.ref.close({ confirmed: true, userId: this.userId });
  }
}

/**
 * Guest component with many paragraphs to demonstrate scrollable dialog height.
 */
@Component({
  selector: 'app-long-dialog-content',
  standalone: true,
  template: `
    @for (item of items; track item) {
      <p style="margin:0 0 0.75rem;line-height:1.6">{{ item }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongDialogContentComponent {
  protected readonly items: string[] = Array.from(
    { length: 12 },
    (_: unknown, index: number): string =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraph ${index + 1} of scrollable content.`,
  );
}

// ---- Demo page ----

/**
 * Demo page for the DynamicDialog component.
 */
@Component({
  selector: 'app-dynamic-dialog-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './dynamic-dialog-demo.component.html',
  styleUrl: './dynamic-dialog-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogDemoComponent {
  public readonly importCode: string =
    "import { DialogService } from 'ui-lib-custom/dynamic-dialog'";

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 8,
      comp: 8,
      theme: 8,
      dx: 8,
      docs: 8,
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
  public readonly snippetBasicOpen: string = `const ref = this.dialogService.open(MyComponent, {\n  header: 'Welcome',\n  width: '32rem',\n});`;
  public readonly snippetPassingData: string = `// Caller\nconst ref = this.dialogService.open(DataDialogContentComponent, {\n  header: 'User Details',\n  data: { userId: 42, name: 'Filip Luca' },\n});\nref.onClose.subscribe((result) => console.log(result));\n\n// Guest component\nconfig = inject(DYNAMIC_DIALOG_CONFIG);\nref    = inject(DynamicDialogRef);\n\nthis.userId = (this.config.data as any).userId;\nthis.ref.close({ confirmed: true });`;
  public readonly snippetScrollable: string = `this.dialogService.open(LongContentComponent, {\n  header: 'Scrollable',\n  width: '38rem',\n  height: '50vh',\n});`;
  public readonly snippetVariant: string = `this.dialogService.open(MyComponent, { variant: 'bootstrap' });`;
  public readonly snippetPosition: string = `this.dialogService.open(MyComponent, { position: 'top' });`;
  private readonly dialogService: DialogService = inject(DialogService);

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'passing-data', label: 'Passing Data' },
    { id: 'scrollable-content', label: 'Scrollable Content' },
    { id: 'design-variants', label: 'Design Variants' },
    { id: 'viewport-positions', label: 'Viewport Positions' },
    { id: 'configuration-options', label: 'Configuration Options' },
    { id: 'dynamic-dialog-config', label: 'DynamicDialogConfig' },
    { id: 'dynamic-dialog-ref', label: 'DynamicDialogRef' },
    { id: 'injection-tokens', label: 'Injection Tokens' },
    { id: 'api', label: 'API Reference' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-dynamic-dialog-min-width',
      description: 'Minimum width of the dialog panel.',
    },
    {
      variable: '--uilib-dynamic-dialog-max-width',
      description: 'Maximum width of the dialog panel.',
    },
    {
      variable: '--uilib-dynamic-dialog-max-height',
      description: 'Maximum height of the dialog panel.',
    },
    {
      variable: '--uilib-dynamic-dialog-offset',
      description: 'Viewport edge offset used when positioning the dialog.',
    },
    {
      variable: '--uilib-dynamic-dialog-bg',
      description: 'Dialog panel background colour (light mode).',
    },
    {
      variable: '--uilib-dynamic-dialog-bg-dark',
      description: 'Dialog panel background colour (dark mode).',
    },
    {
      variable: '--uilib-dynamic-dialog-radius',
      description: 'Border radius of the dialog panel.',
    },
    {
      variable: '--uilib-dynamic-dialog-radius-material',
      description: 'Border radius override for the material variant.',
    },
    {
      variable: '--uilib-dynamic-dialog-radius-bootstrap',
      description: 'Border radius override for the bootstrap variant.',
    },
    {
      variable: '--uilib-dynamic-dialog-radius-minimal',
      description: 'Border radius override for the minimal variant.',
    },
    { variable: '--uilib-dynamic-dialog-shadow', description: 'Box shadow of the dialog panel.' },
    {
      variable: '--uilib-dynamic-dialog-header-padding',
      description: 'Padding inside the dialog header.',
    },
    {
      variable: '--uilib-dynamic-dialog-header-border',
      description: 'Border between the header and content.',
    },
    {
      variable: '--uilib-dynamic-dialog-content-padding',
      description: 'Padding inside the dialog content area.',
    },
    {
      variable: '--uilib-dynamic-dialog-title-color',
      description: 'Colour of the dialog title text.',
    },
    {
      variable: '--uilib-dynamic-dialog-close-color',
      description: 'Icon colour of the close button.',
    },
    {
      variable: '--uilib-dynamic-dialog-close-hover-bg',
      description: 'Background of the close button on hover.',
    },
    {
      variable: '--uilib-dynamic-dialog-backdrop-bg',
      description: 'Background colour of the backdrop overlay.',
    },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: '(service)',
      type: 'DialogService',
      description:
        'Inject DialogService and call open() to programmatically render any component inside a dialog.',
    },
    {
      name: 'header',
      type: 'string',
      description: '(DynamicDialogConfig) Title shown in the dialog header.',
    },
    {
      name: 'data',
      type: 'unknown',
      description:
        '(DynamicDialogConfig) Arbitrary data passed to the embedded component via DynamicDialogRef.',
    },
    {
      name: 'modal',
      type: 'boolean',
      default: 'true',
      description: '(DynamicDialogConfig) Shows a backdrop overlay.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: '(DynamicDialogConfig) Shows the close button.',
    },
    {
      name: 'width',
      type: 'string',
      description: '(DynamicDialogConfig) CSS width of the dialog.',
    },
    {
      name: 'styleClass',
      type: 'string',
      description: '(DynamicDialogConfig) Additional CSS class applied to the dialog.',
    },
  ];

  protected lastResult: string = '';

  public openSimple(): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      header: 'Welcome',
      width: '32rem',
    });
  }

  public openWithData(): void {
    const ref: DynamicDialogRef = this.dialogService.open(DataDialogContentComponent, {
      header: 'User Details',
      width: '36rem',
      data: { userId: 42, name: 'Filip Luca', role: 'Admin' },
    });

    ref.onClose.subscribe((result: unknown): void => {
      const record: Record<string, unknown> = result as Record<string, unknown>;
      if (result && typeof result === 'object' && record['confirmed']) {
        this.lastResult = `Confirmed for user #${record['userId']}`;
      } else {
        this.lastResult = 'Cancelled';
      }
    });
  }

  public openScrollable(): void {
    this.dialogService.open(LongDialogContentComponent, {
      header: 'Scrollable Content',
      width: '38rem',
      height: '50vh',
    });
  }

  public openWithVariant(variant: DynamicDialogVariant): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      header: `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Variant`,
      width: '32rem',
      variant,
    });
  }

  public openWithPosition(position: DynamicDialogPosition): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      header: `Position: ${position}`,
      width: '28rem',
      position,
    });
  }

  public openDismissable(): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      header: 'Click Outside to Close',
      width: '32rem',
      dismissableMask: true,
    });
  }

  public openNoHeader(): void {
    this.dialogService.open(SimpleDialogContentComponent, {
      width: '32rem',
      closable: false,
    });
  }

  public readonly apiConfigRows: ApiPropRow[] = [
    { name: 'header', type: 'string', default: "''", description: 'Dialog title text.' },
    { name: 'width', type: 'string', description: 'CSS width of the panel.' },
    { name: 'height', type: 'string', description: 'CSS height of the panel.' },
    {
      name: 'modal',
      type: 'boolean',
      default: 'true',
      description: 'Show semi-transparent backdrop.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'true',
      description: 'Show × close button in header.',
    },
    {
      name: 'dismissableMask',
      type: 'boolean',
      default: 'false',
      description: 'Click backdrop to close.',
    },
    {
      name: 'blockScroll',
      type: 'boolean',
      default: 'true',
      description: 'Lock body scroll while open.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS class on host.',
    },
    {
      name: 'data',
      type: 'unknown',
      description: 'Passed to guest via <code>DYNAMIC_DIALOG_CONFIG</code>.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'inherited',
      description: 'Design variant override.',
    },
    {
      name: 'position',
      type: "'center' | 'top' | 'bottom' | 'left' | 'right'",
      default: "'center'",
      description: 'Viewport anchor position.',
    },
  ];

  public readonly apiRefRows: ApiPropRow[] = [
    {
      name: 'onClose',
      type: 'Observable<unknown>',
      description: 'Emits once when dialog closes (with optional data).',
    },
    {
      name: 'close(data?)',
      type: 'void',
      description: 'Close the dialog and pass optional return data.',
    },
  ];

  public readonly apiTokenRows: ApiPropRow[] = [
    {
      name: 'DYNAMIC_DIALOG_CONFIG',
      type: 'DynamicDialogConfig',
      description: 'Full config available to guest components via <code>inject()</code>.',
    },
    {
      name: 'DynamicDialogRef',
      type: 'DynamicDialogRef',
      description: 'Dialog handle available to guest components via <code>inject()</code>.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Dialog panel',
      attribute: 'role="dialog"',
      value: '—',
      notes: 'Applied to the modal surface so assistive technologies announce it as a dialog.',
    },
    {
      element: 'Dialog panel',
      attribute: 'aria-modal="true"',
      value: '—',
      notes: 'Tells screen readers the rest of the page is inert while the dialog is open.',
    },
    {
      element: 'Dialog panel',
      attribute: 'aria-labelledby',
      value: '—',
      notes: 'Points to the dialog header element when a <code>header</code> string is provided.',
    },
    {
      element: 'Dialog panel',
      attribute: 'tabindex="-1"',
      value: '—',
      notes: 'Receives programmatic focus on open so keyboard users are placed inside the dialog.',
    },
    {
      element: 'Host / backdrop',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes:
        'Applied to the page root while the dialog is open, hiding background content from screen readers.',
    },
    {
      element: 'Close button',
      attribute: 'aria-label="Close"',
      value: '—',
      notes: 'The built-in close button has an accessible label since it contains only an icon.',
    },
    {
      element: 'Close icon',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes:
        'Decorative — hidden from assistive technologies since the button already has an <code>aria-label</code>.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      action:
        'Cycles focus through all interactive elements inside the dialog (focus is trapped within the panel).',
    },
    {
      key: 'Shift + Tab',
      action: 'Cycles focus backwards through interactive elements inside the dialog.',
    },
    {
      key: 'Escape',
      action: 'Closes the dialog (unless <code>closeOnEscape: false</code> is set in config).',
    },
  ];
}
