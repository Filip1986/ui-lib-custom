import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Inplace } from 'ui-lib-custom/inplace';
import type { InplaceVariant } from 'ui-lib-custom/inplace';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

import { DocSectionComponent } from '../../shared/doc-page/doc-section.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
/**
 * Demo page for the Inplace component.
 */
@Component({
  selector: 'app-inplace-demo',
  standalone: true,
  imports: [
    Inplace,
    Button,
    DocPageLayoutComponent,
    DocTocComponent,
    DocPageHeaderComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
    DocSectionComponent,

    DocCssVarsTableComponent,
  ],
  templateUrl: './inplace-demo.component.html',
  styleUrl: './inplace-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InplaceDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Inplace } from 'ui-lib-custom/inplace'";
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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'api', label: 'API' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'active',
      type: 'boolean',
      default: 'false',
      description: 'Controls whether the edit content is shown (two-way via [(active)]).',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: 'Shows a close button to revert to display mode.',
    },
    {
      name: 'preventClick',
      type: 'boolean',
      default: 'false',
      description: 'Disables toggling on click.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Component size.' },
  ];

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

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Enter / Space',
      suffix: 'on display content',
      action: 'Activates the inplace component, replacing display content with editing content.',
    },
    {
      key: 'Escape',
      suffix: 'when active',
      action: 'Deactivates the component and restores the display content (closable mode).',
    },
  ];

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'active',
      type: 'boolean',
      default: 'false',
      description: 'Two-way bindable; controls whether the editor is shown.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Prevents activation when set to true.',
    },
    {
      name: 'closable',
      type: 'boolean',
      default: 'false',
      description: 'Renders a close button inside the content slot.',
    },
    {
      name: 'closeIcon',
      type: 'string',
      default: "'pi pi-times'",
      description: 'CSS class for the close button icon.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Visual variant; falls back to global ThemeConfigService when null.',
    },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Extra CSS classes added to the host element.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: '(activated)',
      type: 'OutputEmitterRef<void>',
      description: 'Emitted when the component transitions to the active (editing) state.',
    },
    {
      name: '(deactivated)',
      type: 'OutputEmitterRef<void>',
      description: 'Emitted when the component transitions back to the display (inactive) state.',
    },
  ];

  public readonly apiSlotRows: readonly ApiPropRow[] = [
    {
      name: '[inplaceDisplay]',
      type: 'slot',
      description: 'Shown when the component is inactive. Click activates the editor.',
    },
    {
      name: '[inplaceContent]',
      type: 'slot',
      description:
        'Shown when the component is active. Any element or component can be projected here.',
    },
  ];
  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-inplace-display-cursor', description: 'Display cursor.' },
    { variable: '--uilib-inplace-display-padding', description: 'Display padding.' },
    {
      variable: '--uilib-inplace-display-border-radius',
      description: 'Display Border border radius.',
    },
    {
      variable: '--uilib-inplace-display-bg-hover',
      description: 'Display background colour (hover).',
    },
    { variable: '--uilib-inplace-display-transition', description: 'Display transition.' },
    { variable: '--uilib-inplace-display-border', description: 'Display border shorthand.' },
    {
      variable: '--uilib-inplace-display-border-hover',
      description: 'Display border shorthand (hover).',
    },
    { variable: '--uilib-inplace-content-gap', description: 'Content gap.' },
    { variable: '--uilib-inplace-close-button-size', description: 'Close Button size.' },
    { variable: '--uilib-inplace-close-button-bg', description: 'Close Button background colour.' },
    { variable: '--uilib-inplace-close-button-color', description: 'Close Button text colour.' },
    {
      variable: '--uilib-inplace-close-button-bg-hover',
      description: 'Close Button background colour (hover).',
    },
    {
      variable: '--uilib-inplace-close-button-border-radius',
      description: 'Close Button Border border radius.',
    },
    { variable: '--uilib-inplace-disabled-opacity', description: 'Disabled opacity.' },
  ];
}
