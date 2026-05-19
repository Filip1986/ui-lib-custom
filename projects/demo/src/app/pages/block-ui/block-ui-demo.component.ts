import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { BlockUI } from 'ui-lib-custom/block-ui';
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

/**
 * Demo page for the BlockUI component.
 */
@Component({
  selector: 'app-block-ui-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    BlockUI,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
  ],
  templateUrl: './block-ui-demo.component.html',
  styleUrl: './block-ui-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockUiDemoComponent {
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

  public readonly importCode: string = "import { BlockUI } from 'ui-lib-custom/block-ui'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-block-ui-mask-bg',
      default: 'rgba(0,0,0,0.4)',
      description: 'Mask background colour (overridden per variant).',
    },
    {
      variable: '--uilib-block-ui-mask-bg-material',
      default: 'rgba(0,0,0,0.3)',
      description: 'Mask colour for the <code>material</code> variant.',
    },
    {
      variable: '--uilib-block-ui-mask-bg-bootstrap',
      default: 'rgba(0,0,0,0.5)',
      description: 'Mask colour for the <code>bootstrap</code> variant.',
    },
    {
      variable: '--uilib-block-ui-mask-bg-minimal',
      default: 'rgba(0,0,0,0.15)',
      description: 'Mask colour for the <code>minimal</code> variant.',
    },
    {
      variable: '--uilib-block-ui-transition-duration',
      default: '0.2s',
      description:
        'Fade duration; overridden to <code>0</code> under <code>prefers-reduced-motion</code>.',
    },
    {
      variable: '--uilib-block-ui-transition',
      default: 'opacity var(…) ease',
      description: 'Full transition shorthand.',
    },
    {
      variable: '--uilib-block-ui-z-index',
      default: 'var(--uilib-z-overlay, 100)',
      description: 'Z-index of the mask layer.',
    },
  ];

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'custom-mask', label: 'Custom Mask' },
    { id: 'variants', label: 'Variants' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
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
    readonly customMask: string;
    readonly variants: string;
  } = {
    import: `import { BlockUI } from 'ui-lib-custom/block-ui';`,
    basic: `<ui-lib-block-ui [(blocked)]="isBlocked">
  <!-- protected content -->
</ui-lib-block-ui>`,
    customMask: `<ui-lib-block-ui [(blocked)]="isBlocked">
  <!-- protected content -->
  <div blockTemplate class="my-spinner-content">
    <span class="spinner" role="img" aria-label="Loading"></span>
    Processing…
  </div>
</ui-lib-block-ui>`,
    variants: `<ui-lib-block-ui variant="material"  [(blocked)]="isBlocked">...</ui-lib-block-ui>
<ui-lib-block-ui variant="bootstrap" [(blocked)]="isBlocked">...</ui-lib-block-ui>
<ui-lib-block-ui variant="minimal"   [(blocked)]="isBlocked">...</ui-lib-block-ui>`,
  } as const;

  public readonly basicBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly spinnerBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly materialBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly bootstrapBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly minimalBlocked: WritableSignal<boolean> = signal<boolean>(false);

  public toggleBasic(): void {
    this.basicBlocked.update((value: boolean): boolean => !value);
  }

  public toggleSpinner(): void {
    this.spinnerBlocked.update((value: boolean): boolean => !value);
  }

  public toggleMaterial(): void {
    this.materialBlocked.update((value: boolean): boolean => !value);
  }

  public toggleBootstrap(): void {
    this.bootstrapBlocked.update((value: boolean): boolean => !value);
  }

  public toggleMinimal(): void {
    this.minimalBlocked.update((value: boolean): boolean => !value);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab / Shift+Tab',
      action:
        'Keyboard focus cannot enter the blocked content while <code>blocked = true</code> — the content wrapper receives <code>inert</code>, making all descendants non-focusable.',
    },
    {
      key: 'Any key',
      action:
        'No special handling on the mask overlay. All standard interactions remain available outside the blocked area.',
    },
  ];
}
